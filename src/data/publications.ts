import type { ImageMetadata } from "astro";
import ibaPoster from "../assets/events/iba-denmark-1.jpeg";
import supremeCourt from "../assets/people/founder-supreme-court.jpeg";
import femhonour from "../assets/editorial/femhonour-feature.jpeg";
import propertyColumn from "../assets/editorial/property-awareness-column.jpeg";
import highCourtTeam from "../assets/firm/legal-team-high-court.webp";

export const IBA_BROCHURE = "/documents/iba-denmark-event.pdf";

export interface PublicationLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface Publication {
  id: string;
  image: ImageMetadata;
  alt: string;
  /** CSS object-position for cropped card thumbnails. */
  pos?: string;
  source: string;
  title: string;
  date: string;
  summary: string;
  body: string[];
  links: PublicationLink[];
}

/** Recognition & publications, shown as cards on the homepage and in full on /insights/. */
export const publications: Publication[] = [
  {
    id: "iba-copenhagen-2026",
    image: ibaPoster,
    alt: "Advocate Siri Swathi Katragadda at the IBA Annual Conference 2026, Copenhagen, Denmark",
    pos: "70% 30%",
    source: "International Bar Association · Copenhagen",
    title: "IBA Annual Conference 2026 — Copenhagen, Denmark",
    date: "October 2026",
    summary:
      "Delegate at the International Bar Association Annual Conference, representing Viswa Samudra Group.",
    body: [
      "In October 2026, Advocate Siri Swathi Katragadda attended the International Bar Association (IBA) Annual Conference in Copenhagen as part of a delegation of advocates from South India, representing Viswa Samudra Group.",
      "The programme brought together legal practitioners, arbitration experts, members of the judiciary and thought leaders from across the world. Sessions covered international arbitration and dispute resolution, technology and AI in legal practice, disclosure and ethical standards, and cross-border transactions and regulatory compliance.",
      "The Embassy of India in Copenhagen also hosted a special engagement for visiting Indian legal professionals, focused on the India–Denmark Green Strategic Partnership and the India–EU Free Trade Agreement, followed by a reception at Asia House.",
    ],
    links: [
      { label: "Read about the engagement", href: "/about/#iba-copenhagen-2026" },
      { label: "View event brochure (PDF)", href: IBA_BROCHURE, external: true },
    ],
  },
  {
    id: "supreme-court",
    image: supremeCourt,
    alt: "Advocate Siri Swathi Katragadda outside the Supreme Court of India",
    pos: "50% 30%",
    source: "Adv. Siri Swathi Katragadda",
    title: "Appearing before the Supreme Court of India",
    date: "Professional practice",
    summary: "Appearances before the Supreme Court and several High Courts.",
    body: [
      "Over more than 13 years of practice, Advocate Siri Swathi Katragadda has handled 200+ matters across civil, corporate, criminal and family law, and has appeared before the Supreme Court of India and several High Courts.",
      "Her practice combines litigation experience with a background in governance, policy and research, bringing both legal detail and its human impact into focus.",
    ],
    links: [{ label: "About the firm", href: "/about/#about-founder" }],
  },
  {
    id: "femhonour-2025",
    image: femhonour,
    alt: "Femhonour September 2025, page 19: awards and interview",
    source: "Femhonour · September 2025 · p.19",
    title: "Awards, achievements & interview",
    date: "September 2025",
    summary: "Featured as “Super Woman – Most Inspiring Advocate”.",
    body: [
      "Her legal and development work was featured in Femhonour magazine (September 2025, page 19) as “Super Woman – Most Inspiring Advocate”, with an interview on her practice and her commitment to legal aid for women and senior citizens.",
      "She is also a recipient of the Young Researcher Award (InSc) for her research on governance, water conservation and health policy.",
    ],
    links: [{ label: "About the firm", href: "/about/#about-founder" }],
  },
  {
    id: "house-of-dreams-column",
    image: propertyColumn,
    alt: "Newspaper column by Katragadda Siri Swathi: The House of Dreams, or the Beginning of Disaster?",
    pos: "4% 50%",
    source: "Legal awareness column by the founder",
    title: "The House of Dreams, or the Beginning of Disaster?",
    date: "Legal awareness column",
    summary: "A widely shared column on verifying a property before you buy.",
    body: [
      "This legal-awareness column describes buyers who paid first and verified later, and what it cost them. It encourages every property buyer to pause and check title, encumbrances and approvals before signing.",
      "The full article on our Insights page sets out the documents to begin with and the questions worth taking to your advocate.",
    ],
    links: [{ label: "Read the article", href: "/insights/property-due-diligence/" }],
  },
  {
    id: "ap-high-court",
    image: highCourtTeam,
    alt: "KS Legal team at the Andhra Pradesh High Court",
    pos: "40% 30%",
    source: "K.S. Legal Team",
    title: "Success at the A.P. High Court",
    date: "Firm outcome",
    summary: "A significant matter won before the Andhra Pradesh High Court.",
    body: [
      "Our legal team successfully represented a client in a significant matter before the Andhra Pradesh High Court, reflecting careful preparation and a strategic approach.",
      "Past outcomes do not guarantee similar results. Every matter depends on its own facts.",
    ],
    links: [{ label: "Explore our success stories", href: "/success-stories/" }],
  },
];
