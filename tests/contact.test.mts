import { test } from "node:test";
import assert from "node:assert/strict";
import nodemailer from "nodemailer";
import { handleEnquiry, type MailMessage } from "../netlify/functions/contact.mts";

const env = { SMTP_HOST: "smtp.test", SMTP_USER: "legal@kslegalconsultants.com", SMTP_PASS: "x" };
const NOW = 1_800_000_000_000;
const valid = {
  form: "website enquiry",
  name: "Test Visitor",
  email: "visitor@example.com",
  phone: "+91 90000 00000",
  subject: "Property question",
  message: "I would like advice about a property title.",
  consent: "yes",
  page: "https://kslegalconsultants.com/contact/",
  _ts: String(NOW - 10_000),
};
let ipCounter = 0;
const post = (body: Record<string, unknown>, headers: Record<string, string> = {}) =>
  new Request("https://kslegalconsultants.com/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: "https://kslegalconsultants.com",
      "x-nf-client-connection-ip": `10.0.0.${++ipCounter}`,
      ...headers,
    },
    body: JSON.stringify(body),
  });
const run = async (req: Request, envOverride = env) => {
  const sent: MailMessage[] = [];
  const res = await handleEnquiry(req, { env: envOverride, now: () => NOW, send: async (m) => void sent.push(m) });
  return { res, sent, body: res.headers.get("content-type")?.includes("json") ? await res.json() : null };
};

test("sends a valid enquiry from the firm's domain with the visitor as sender name and reply-to", async () => {
  const { res, sent, body } = await run(post(valid));
  assert.equal(res.status, 200);
  assert.equal(body.ok, true);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].from, '"Test Visitor via KS Legal Website" <legal@kslegalconsultants.com>');
  assert.equal(sent[0].replyTo, '"Test Visitor" <visitor@example.com>');
  assert.equal(sent[0].to, "legal@kslegalconsultants.com");
  assert.equal(sent[0].subject, "New enquiry from Test Visitor: Property question");
  assert.doesNotMatch(sent[0].html + sent[0].text, /formsubmit/i);
});

test("rejects invalid input with a readable message and sends nothing", async () => {
  const { res, sent, body } = await run(post({ ...valid, phone: "123" }));
  assert.equal(res.status, 400);
  assert.match(body.message, /phone/);
  assert.equal(sent.length, 0);
});

test("requires consent", async () => {
  const { res } = await run(post({ ...valid, consent: "" }));
  assert.equal(res.status, 400);
});

test("silently drops honeypot and too-fast submissions", async () => {
  for (const extra of [{ company_website: "http://spam.example" }, { _ts: String(NOW - 500) }]) {
    const { res, sent } = await run(post({ ...valid, ...extra }));
    assert.equal(res.status, 200);
    assert.equal(sent.length, 0);
  }
});

test("blocks foreign origins", async () => {
  const { res, sent } = await run(post(valid, { Origin: "https://evil.example" }));
  assert.equal(res.status, 403);
  assert.equal(sent.length, 0);
});

test("escapes HTML and strips header injection", async () => {
  const { sent } = await run(post({ ...valid, name: 'Eve"\r\nBcc: x@y.z', message: "<script>alert(1)</script> hello there" }));
  assert.doesNotMatch(sent[0].from, /[\r\n]/);
  assert.doesNotMatch(sent[0].html, /<script>/);
});

test("rate limits repeated submissions from one IP", async () => {
  const headers = { "x-nf-client-connection-ip": "10.9.9.9" };
  const statuses = [];
  for (let i = 0; i < 6; i++) statuses.push((await run(post(valid, headers))).res.status);
  assert.deepEqual(statuses, [200, 200, 200, 200, 200, 429]);
});

test("reports a configuration error when SMTP settings are missing", async () => {
  const { res, sent } = await run(post(valid), { SMTP_HOST: "", SMTP_USER: "", SMTP_PASS: "" });
  assert.equal(res.status, 500);
  assert.equal(sent.length, 0);
});

test("reports delivery failure as 502", async () => {
  const res = await handleEnquiry(post(valid), { env, now: () => NOW, send: async () => { throw new Error("smtp down"); } });
  assert.equal(res.status, 502);
});

test("no-JavaScript form posts redirect to the thank-you page", async () => {
  const form = new URLSearchParams({ ...valid, _ts: "" });
  const req = new Request("https://kslegalconsultants.com/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", "x-nf-client-connection-ip": "10.8.8.8" },
    body: form,
  });
  const { res } = await run(req);
  assert.equal(res.status, 303);
  assert.equal(res.headers.get("location"), "/thank-you/");
});

test("produces well-formed email headers when rendered by nodemailer", async () => {
  const { sent } = await run(post(valid));
  const info = await nodemailer.createTransport({ streamTransport: true, buffer: true }).sendMail(sent[0]);
  const headers = info.message.toString().split(/\r?\n\r?\n/)[0];
  const lines = headers.split(/\r?\n/).map((line) => line.replace(/"/g, ""));
  assert.ok(lines.includes("From: Test Visitor via KS Legal Website <legal@kslegalconsultants.com>"));
  assert.ok(lines.includes("Reply-To: Test Visitor <visitor@example.com>"));
  assert.ok(lines.includes("To: legal@kslegalconsultants.com"));
  assert.ok(lines.includes("Subject: New enquiry from Test Visitor: Property question"));
});
