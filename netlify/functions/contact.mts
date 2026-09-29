/**
 * Enquiry form handler (Netlify Function, served at /api/contact).
 *
 * Sends each enquiry through the firm's own mailbox (GoDaddy SMTP by default), so the
 * email comes from @kslegalconsultants.com, shows the visitor's name as the sender and
 * "Reply" goes straight to the visitor. Configure these in Netlify → Site configuration →
 * Environment variables (never commit them):
 *   SMTP_HOST (smtpout.secureserver.net) · SMTP_PORT (465) · SMTP_USER · SMTP_PASS
 *   MAIL_TO (defaults to legal@kslegalconsultants.com) · MAIL_FROM (defaults to SMTP_USER)
 */
import nodemailer, { type Transporter } from "nodemailer";

export const config = { path: "/api/contact" };

const DEFAULT_TO = "legal@kslegalconsultants.com";
const SITE_NAME = "KS Legal Website";
/** Submissions faster than this after page load are treated as bots. */
const MIN_FILL_MS = 3000;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const ALLOWED_ORIGIN = /^https:\/\/((www\.)?kslegalconsultants\.com|[a-z0-9-]+--[a-z0-9-]+\.netlify\.app|[a-z0-9-]+\.netlify\.app)$|^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;
const SPAM_WORDS = ["casino", "viagra", "seo services", "backlinks", "guest post"];

const LABELS: Record<string, string> = {
  form: "Form",
  name: "Name",
  email: "Email",
  phone: "Mobile",
  subject: "Subject",
  contact_method: "Preferred contact",
  practice_area: "Practice area",
  preferred_date: "Preferred date",
  preferred_time: "Preferred time",
  message: "Message",
  page: "Sent from page",
};
const MAX_LENGTH: Record<string, number> = {
  form: 60, name: 100, email: 180, phone: 20, subject: 150, contact_method: 40,
  practice_area: 100, preferred_date: 20, preferred_time: 60, message: 3000, page: 300,
};

export type Enquiry = Record<keyof typeof LABELS, string>;
export interface MailMessage {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}
export interface Deps {
  send: (message: MailMessage) => Promise<void>;
  env: Record<string, string | undefined>;
  now?: () => number;
}

class ClientError extends Error {}

const recent = new Map<string, number[]>();
function isRateLimited(ip: string, now: number): boolean {
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.set(ip, [...hits, now]);
  return hits.length >= RATE_LIMIT.max;
}

const clean = (value: unknown, max: number) =>
  String(value ?? "").replace(/\r\n?/g, "\n").trim().slice(0, max);
/** Header-safe text: no line breaks, quotes or angle brackets. */
const headerSafe = (value: string) => value.replace(/[\r\n"<>]/g, " ").replace(/\s+/g, " ").trim();
const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function readBody(req: Request): Promise<Record<string, unknown>> {
  const type = req.headers.get("content-type") ?? "";
  if (type.includes("application/json")) return (await req.json()) as Record<string, unknown>;
  return Object.fromEntries(await req.formData());
}

export function validate(body: Record<string, unknown>): Enquiry {
  const data = Object.fromEntries(
    Object.keys(LABELS).map((key) => [key, clean(body[key], MAX_LENGTH[key])]),
  ) as Enquiry;
  const digits = data.phone.replace(/\D/g, "");
  if (data.name.length < 2) throw new ClientError("Please enter your full name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) throw new ClientError("Please enter a valid email address.");
  if (digits.length < 10 || digits.length > 15) throw new ClientError("Please enter a valid phone number with 10–15 digits.");
  if (data.message.length < 10) throw new ClientError("Please enter a message of at least 10 characters.");
  if (!body.consent) throw new ClientError("Please agree to be contacted before sending.");
  return data;
}

export function buildMessage(data: Enquiry, env: Deps["env"], submittedAt: Date): MailMessage {
  const fromAddress = env.MAIL_FROM || env.SMTP_USER!;
  const name = headerSafe(data.name);
  const topic = data.subject || data.practice_area || "General enquiry";
  const flagged = SPAM_WORDS.some((word) => `${data.subject} ${data.message}`.toLowerCase().includes(word));
  const rows = Object.entries(LABELS).filter(([key]) => data[key]);
  const when = submittedAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });

  const text = [
    `New ${data.form || "website enquiry"} from ${data.name}`,
    "",
    ...rows.map(([key, label]) => `${label}: ${data[key]}`),
    "",
    `Submitted: ${when} IST`,
    `Reply to this email to respond directly to ${data.name}.`,
  ].join("\n");

  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f6f3ec;font-family:Arial,sans-serif;color:#0b1f33">
<table role="presentation" width="100%" style="max-width:640px;margin:auto;background:#fff;border-radius:8px;border-top:4px solid #b8892f;border-collapse:collapse">
<tr><td style="padding:24px 28px 8px"><h1 style="margin:0;font-size:20px">New ${escapeHtml(data.form || "website enquiry")}</h1>
<p style="margin:6px 0 0;color:#5b6573;font-size:14px">From ${escapeHtml(data.name)} via kslegalconsultants.com · ${escapeHtml(when)} IST</p></td></tr>
<tr><td style="padding:16px 28px"><table role="presentation" width="100%" style="border-collapse:collapse;font-size:14px">
${rows
  .map(
    ([key, label]) =>
      `<tr><th align="left" valign="top" style="padding:10px 12px;border-bottom:1px solid #eee;width:34%;color:#5b6573;font-weight:600">${label}</th><td style="padding:10px 12px;border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(data[key])}</td></tr>`,
  )
  .join("\n")}
</table></td></tr>
<tr><td style="padding:8px 28px 24px;font-size:13px;color:#5b6573">Reply to this email to respond directly to ${escapeHtml(data.name)}.</td></tr>
</table></body></html>`;

  return {
    from: `"${name} via ${SITE_NAME}" <${fromAddress}>`,
    to: env.MAIL_TO || DEFAULT_TO,
    replyTo: `"${name}" <${headerSafe(data.email)}>`,
    subject: headerSafe(`${flagged ? "[Possible spam] " : ""}New enquiry from ${data.name}: ${topic}`),
    text,
    html,
  };
}

export async function handleEnquiry(req: Request, deps: Deps): Promise<Response> {
  const now = deps.now?.() ?? Date.now();
  const wantsJson = (req.headers.get("accept") ?? "").includes("application/json");
  const reply = (status: number, ok: boolean, message: string) =>
    wantsJson
      ? Response.json({ ok, message }, { status })
      : ok
        ? new Response(null, { status: 303, headers: { Location: "/thank-you/" } })
        : new Response(
            `<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><title>Enquiry not sent</title><p>${escapeHtml(message)}</p><p><a href="javascript:history.back()">Go back to the form</a> or call +91 7660000787.</p>`,
            { status, headers: { "Content-Type": "text/html; charset=utf-8" } },
          );

  if (req.method !== "POST") return reply(405, false, "Method not allowed.");
  const origin = req.headers.get("origin");
  if (origin && !ALLOWED_ORIGIN.test(origin)) return reply(403, false, "Forbidden.");
  const ip = req.headers.get("x-nf-client-connection-ip") ?? req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip, now)) return reply(429, false, "Too many enquiries in a short time. Please try again later or call us.");

  try {
    const body = await readBody(req);
    // Honeypot filled or submitted impossibly fast: pretend success so bots learn nothing.
    if (clean(body.company_website, 200)) return reply(200, true, "Thank you.");
    const loadedAt = Number(body._ts);
    if (loadedAt && now - loadedAt < MIN_FILL_MS) return reply(200, true, "Thank you.");

    const data = validate(body);
    if (!deps.env.SMTP_HOST || !deps.env.SMTP_USER || !deps.env.SMTP_PASS) {
      console.error("contact: SMTP_HOST, SMTP_USER and SMTP_PASS must be set in Netlify environment variables");
      return reply(500, false, "Our enquiry form is temporarily unavailable.");
    }
    await deps.send(buildMessage(data, deps.env, new Date(now)));
    return reply(200, true, "Your enquiry has been sent.");
  } catch (error) {
    if (error instanceof ClientError) return reply(400, false, error.message);
    console.error("contact: failed to send enquiry", error);
    return reply(502, false, "We could not send your enquiry right now.");
  }
}

let transport: Transporter | undefined;
async function sendWithSmtp(message: MailMessage): Promise<void> {
  const port = Number(process.env.SMTP_PORT || 465);
  transport ??= nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  });
  await transport.sendMail(message);
}

export default (req: Request) => handleEnquiry(req, { send: sendWithSmtp, env: process.env });
