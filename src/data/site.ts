export const contact = {
  email: "legal@kslegalconsultants.com",
  phones: ["7660000787"],
  address:
    "BMR Heights, Plot No. 8, Flat No. 601, Srinivasa Colony, Hydernagar, KPHB, Hyderabad - 500 090, Telangana, India.",
  map: "https://maps.app.goo.gl/ue3PXyF6MceSrHSg7",
};
export const siteName = "KS Legal Consultants";
/**
 * FormSubmit (https://formsubmit.co) delivers enquiries to the firm's inbox.
 * The first live submission sends an activation email to this address, which
 * must be confirmed once. After activation, FormSubmit offers a random alias;
 * set PUBLIC_FORM_ENDPOINT to https://formsubmit.co/<alias> to hide the email.
 */
export const formEndpoint =
  import.meta.env.PUBLIC_FORM_ENDPOINT || `https://formsubmit.co/${contact.email}`;
// Supplied brief/editorial claims. Confirm current accuracy before publication.
export const practices = [
  {
    slug: "civil-litigation",
    title: "Civil Litigation",
    icon: "landmark",
    short: "Property, contracts, recovery, injunctions",
    description:
      "Thoughtful representation in civil disputes, with your interests at the centre.",
    matters: [
      "Contractual disputes",
      "Money recovery and cheque dishonour recovery",
      "Injunctions and civil remedies",
      "Civil appeals",
    ],
    detail:
      "A civil dispute can affect your finances, property and peace of mind. We begin with the documents, the chronology and your objectives to identify a practical way forward.",
  },
  {
    slug: "criminal-law",
    title: "Criminal Law",
    icon: "gavel",
    short: "Bail, trial and criminal defence",
    description:
      "Considered advice and diligent representation when it matters most.",
    matters: [
      "Bail and anticipatory bail advice",
      "Cheque bounce complaints (Section 138, NI Act)",
      "Cyber crime complaints",
      "Criminal complaints",
      "Trial representation",
      "Appeals and related proceedings",
    ],
    detail:
      "Criminal proceedings require prompt, careful attention. We help you understand the allegations, organise relevant records and discuss the available procedural options.",
  },
  {
    slug: "family-matrimonial",
    title: "Family & Matrimonial",
    icon: "users",
    short: "Divorce, domestic violence, child custody",
    description:
      "Sensitive guidance through family matters and life’s important transitions.",
    matters: [
      "Divorce (mutual consent and contested)",
      "Domestic violence matters",
      "Matrimonial disputes",
      "Maintenance-related matters",
      "Child custody matters",
      "Family settlements",
    ],
    detail:
      "Family matters are deeply personal. Our approach combines clear legal advice with sensitivity to the relationships and long-term interests involved.",
  },
  {
    slug: "property-real-estate",
    title: "Property & Real Estate",
    icon: "home",
    short: "Title verification, disputes, RERA matters",
    description:
      "Clarity and confidence for your property decisions and disputes.",
    matters: [
      "Property title verification",
      "Sale deed and agreement review",
      "Encumbrance checks",
      "Property disputes and due diligence",
      "RERA-related advice where applicable",
    ],
    detail:
      "A property decision deserves more than a quick document check. We examine the available title records, agreements and identified risks in the context of the proposed transaction.",
  },
  {
    slug: "consumer-protection",
    title: "Consumer Protection",
    icon: "shield",
    short: "Consumer rights, service disputes",
    description:
      "A clear voice for consumers facing unfair practices and service disputes.",
    matters: [
      "Defective goods",
      "Deficiency in services",
      "Consumer complaints before district and state commissions",
      "Purchase and service documentation",
    ],
    detail:
      "When a purchase or service falls short, organised records can make a difference. We review the transaction, communications and remedy sought to advise on appropriate next steps.",
  },
  {
    slug: "corporate-advisory",
    title: "Corporate Advisory",
    icon: "building",
    short: "Business advisory, compliance, legal structuring",
    description:
      "Practical legal insight for businesses, decisions and lasting partnerships.",
    matters: [
      "Business agreements",
      "Commercial dispute advice",
      "Legal risk review",
      "Ongoing advisory support",
    ],
    detail:
      "Sound legal advice supports considered business decisions. We work with businesses to clarify contractual obligations and identify legal issues before they become larger disputes.",
  },
  {
    slug: "documentation-agreements",
    title: "Documentation & Agreements",
    icon: "file",
    short: "Drafting, vetting and legal documentation",
    description:
      "Carefully drafted documents that bring clarity to your commitments.",
    matters: [
      "Agreement drafting",
      "Document review",
      "Legal notices",
      "Transaction documentation",
    ],
    detail:
      "Clear documentation helps everyone understand their rights and responsibilities. We review the purpose of an agreement, its key terms and the practical implications of the commitments it creates.",
  },
  {
    slug: "women-senior-citizen-support",
    title: "Women & Senior Citizen Support",
    icon: "heart",
    short: "Legal aid and dedicated support services",
    description:
      "Empathetic legal support with dignity, understanding and care.",
    matters: [
      "Legal awareness and guidance",
      "Domestic violence-related matters",
      "Senior citizen concerns",
      "Property and family disputes",
    ],
    detail:
      "Access to legal guidance should feel approachable. We listen carefully and help women and senior citizens understand their situation and explore relevant support and legal options.",
  },
];
export const values = [
  [
    "scale",
    "Integrity",
    "Unwavering commitment to ethics and the rule of law.",
  ],
  [
    "target",
    "Strategic Advice",
    "Practical, solution-oriented and well-researched guidance.",
  ],
  [
    "file",
    "Transparent Process",
    "Clear communication, so you understand every stage.",
  ],
  [
    "heart",
    "Compassionate Representation",
    "Sensitive to your concerns, focused on your best interests.",
  ],
];
export const stats = [
  { icon: "cap", value: 13, suffix: "+", label: "Years Experience", note: "In law, governance and development" },
  { icon: "file", value: 200, suffix: "+", label: "Cases Handled", note: "Civil, criminal, corporate & more" },
  { icon: "users", value: 0, suffix: "", label: "Client-Focused", note: "Personalised and practical solutions" },
  { icon: "landmark", value: 0, suffix: "", label: "High Court Matters", note: "Experienced in A.P. & Telangana High Courts" },
];
export const highlights = [
  ["gavel", "Civil, Criminal, Family & Corporate Matters", "Wide-ranging litigation experience"],
  ["users", "Legal Aid for Women & Senior Citizens", "Free legal support and compassionate guidance"],
  ["book", "Policy & Governance Experience", "Worked with UNICEF, SCCL and Government of India"],
  ["trophy", "Recognised Advocate", "Young Researcher Award (InSc) & national and international recognition"],
];
export const process = [
  {
    icon: "lock",
    title: "Confidential Consultation",
    text: "Share your concern in a private conversation. We listen carefully, note deadlines and understand what matters most to you.",
  },
  {
    icon: "clipboard",
    title: "Case Assessment & Strategy",
    text: "We review the documents, the chronology and the applicable law, then explain your options and a realistic plan of action.",
  },
  {
    icon: "gavel",
    title: "Strong Legal Representation",
    text: "Careful drafting, thorough preparation and principled advocacy before courts, commissions and authorities.",
  },
  {
    icon: "badge",
    title: "Resolution & Support",
    text: "We keep you informed at every stage and continue to guide you through settlement, compliance or the next step.",
  },
];
export const faqs = [
  [
    "How do I book a consultation with KS Legal Consultants?",
    "Call +91 7660000787, message us on WhatsApp, or use the consultation form on this website. We will contact you to confirm a suitable date and time.",
  ],
  [
    "Which courts and forums do you appear before?",
    "Our team handles matters before courts in Hyderabad and represents clients before the High Courts of Telangana and Andhra Pradesh, as well as consumer commissions and other authorities where relevant.",
  ],
  [
    "What types of cases do you handle?",
    "Civil litigation, criminal law (including bail and cheque bounce matters), family and matrimonial disputes, property and RERA matters, consumer protection, corporate advisory and legal documentation.",
  ],
  [
    "Can you help with bail or an urgent criminal matter?",
    "Yes. Criminal matters need prompt attention. Please call us directly so we can understand the situation and advise you on the available procedural options without delay.",
  ],
  [
    "Do you handle divorce, maintenance and child custody matters?",
    "Yes. We advise on mutual-consent and contested divorce, maintenance, domestic violence protection and child custody, with sensitivity to the family relationships involved.",
  ],
  [
    "What documents should I bring to my first meeting?",
    "Bring any notices, agreements, title documents, correspondence, FIR or complaint copies and a short timeline of events. Please contact us before sharing sensitive documents electronically.",
  ],
  [
    "Is legal aid available for women and senior citizens?",
    "Our founder has a long-standing commitment to supporting underprivileged women and senior citizens. Contact us to discuss your situation and the support that may be available.",
  ],
  [
    "Does a website enquiry make you my advocate?",
    "No. An enquiry does not create an advocate–client relationship. An engagement begins only after we have discussed your matter, checked for conflicts and agreed the scope and fees.",
  ],
];
export const articles = [
  {
    slug: "property-due-diligence",
    title: "The House of Dreams, or the Beginning of Disaster?",
    category: "Property Law",
    excerpt:
      "A story every property buyer must read before signing. Learn why title verification, encumbrance checks and legal due diligence are essential.",
    image: "insightProperty",
    time: "3 min read",
  },
  {
    slug: "legal-aid-for-women",
    title: "Legal Aid for Women: Know Your Rights",
    category: "Legal Rights",
    excerpt:
      "Understanding the legal protections available for women facing domestic violence, discrimination and abuse — and how to take the first step.",
    image: "insightWomen",
    time: "3 min read",
  },
  {
    slug: "dispute-resolution",
    title: "Dispute Resolution: A Practical Guide",
    category: "Guide",
    excerpt:
      "How mediation, negotiation and legal remedies can help resolve disputes effectively and save time and costs.",
    image: "insightDispute",
    time: "3 min read",
  },
];
export const team = [
  {
    name: "Siri Swathi Katragadda",
    role: "Advocate & Founder",
    image: "founder",
    bio: "Over 13 years across litigation, governance and sustainable development, with a commitment to legal aid for women and senior citizens.",
  },
  {
    name: "Mirza Rasool Baig",
    role: "Partner",
    image: "partner",
    bio: "Partner at KS Legal Consultants, bringing focused preparation and courtroom experience to the firm's litigation practice.",
  },
];
export const whatsapp = "917660000787";
