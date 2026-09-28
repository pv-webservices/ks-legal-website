export type ServiceGroup = "expertise" | "services";

export type ServiceImage =
  | "consultation"
  | "library"
  | "justice"
  | "pillars"
  | "insightProperty"
  | "insightWomen"
  | "insightDispute"
  | "teamCourt";

export interface Offering {
  title: string;
  text: string;
}

export interface LegalService {
  slug: string;
  group: ServiceGroup;
  /** Short label used in menus and cards. */
  title: string;
  /** Page H1 and SEO title, e.g. "Divorce Lawyer in Hyderabad". */
  heading: string;
  icon: string;
  image: ServiceImage;
  /** One line for cards and meta descriptions. */
  summary: string;
  intro: string[];
  offerings: Offering[];
  documents: string[];
  faqs: [question: string, answer: string][];
}
