export const contact = {
  email: "legal@kslegalconsultants.com",
  phones: ["7660000787"],
  address:
    "BMR Heights, Plot No. 8, Flat No. 601, Srinivasa Colony, Hydernagar, KPHB, Hyderabad - 500 090, Telangana, India.",
  map: "https://maps.app.goo.gl/ue3PXyF6MceSrHSg7",
  operatingAreas: ["Hyderabad", "Amaravati (Vijayawada)", "Delhi", "Bangalore"],
};
export const siteName = "KS Legal Consultants";
/** Enquiry forms post here; see netlify/functions/contact.mts for delivery settings. */
export const formEndpoint = "/api/contact";
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
  { icon: "heart", value: 0, suffix: "", label: "Free Legal Aid", note: "For senior citizens & those below the poverty line" },
  { icon: "users", value: 0, suffix: "", label: "Client-Focused", note: "Personalised and practical solutions" },
  { icon: "landmark", value: 0, suffix: "", label: "Supreme Court & High Court Matters", note: "Supreme Court and A.P. & Telangana High Courts" },
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
export const coreTeam = [
  {
    name: "Adv. Mirza Rasool Baig",
    text: "Providing visionary leadership and strategic direction, Adv. Mirza brings extensive legal expertise to steer complex matters and ensure meticulous representation for our clients.",
  },
  {
    name: "Adv. Rishi Malhotra",
    text: "Serving as Senior Counsel of the Supreme Court, Adv. Malhotra brings profound appellate experience, exceptional courtroom advocacy, and authoritative legal insight to high-stakes litigation.",
  },
  {
    name: "Adv. Ansuya",
    text: "Practicing before the Supreme Court, Adv. Ansuya contributes sharp legal acumen, rigorous research, and dedicated advocacy to complex constitutional and civil matters.",
  },
  { name: "Umesh Chandra PVG", text: "" },
];
export const team = [
  {
    name: "Mirza Rasool Baig",
    role: "Partner",
    image: "mirza",
    credentials: "M.Com., LL.B. (Spl.)",
    bio: [
      "Mirza Rasool Baig, Advocate, holds an M.Com., LL.B. (Spl.). He brings over two decades of professional experience, with extensive exposure to both corporate and legal practice. He holds an LL.B. (Spl.) from Gulbarga University, obtained in 2000.",
      "His practice encompasses Civil, Criminal, Constitutional, Consumer, Family, Cheque Bounce, Land & Property Disputes, and related litigation. He regularly handles legal drafting, research, client counselling, and court proceedings before District Courts, Family Courts, Consumer Forums and High Courts. He has handled corporate agreements, healthcare-related legal matters, consumer disputes, compliance, and legal advisory work for a healthcare network with 50+ branches across India. He combines litigation experience with strong corporate and commercial understanding to provide practical, strategic and client-focused legal solutions.",
    ],
  },
  {
    name: "Vaddapalli Hemanth Kumar",
    role: "Partner",
    image: "hemanth",
    credentials: "B.A., LL.B., LL.M. (Business & Corporate Laws)",
    bio: [
      "Vaddapalli Hemanth Kumar, Advocate, holds a B.A., LL.B. and LL.M. in Business & Corporate Laws. He began his legal practice at the Visakhapatnam District Court in 2020, handling matters relating to Civil, Criminal, Alternative Dispute Resolution, Economic Offences, and Personal Laws.",
      "Since 2022, he has been practicing before the High Court of Andhra Pradesh and the Telangana High Court, with experience in Civil, Criminal, Company, Service, Revenue, Excise, Social Welfare, Municipal and Panchayat matters. He is committed to providing strategic, practical and effective legal representation, with a focus on professional integrity, thorough preparation and client-oriented legal solutions.",
    ],
  },
  {
    name: "Durga",
    role: "Associate Advocate",
    image: "durga",
    credentials: "LL.B., MBA (HR & Marketing)",
    bio: [
      "Advocate Durga is an Associate Advocate with a strong foundation in legal documentation and court procedures. She holds an LL.B. along with an MBA in HR & Marketing. She has valuable experience with the Judicial Department, District Court, Visakhapatnam.",
      "Her experience includes handling legal documents, judgments, orders and confidential court records. She brings strong attention to detail, accuracy, communication and organizational skills. She assists the firm in legal research, drafting, case preparation and court-related coordination.",
    ],
  },
  {
    name: "Kalikar Manjunath",
    role: "Associate Advocate",
    image: "manjunath",
    credentials: "LL.B., Karnataka State Law University",
    bio: [
      "Kalikar Manjunath is a dedicated Advocate who completed his LL.B. from Karnataka State Law University. He was enrolled as an Advocate in 2021 and has been actively practicing since then. His practice covers Civil, Criminal, Family, Consumer, and Land Acquisition matters.",
      "He represents clients with a focus on careful legal analysis, effective advocacy, and practical solutions. He is committed to understanding each client’s concerns and providing professional and client-focused legal assistance. With continuous experience in diverse areas of law, he strives to uphold integrity, diligence, and justice in his legal practice.",
    ],
  },
  {
    name: "Rampraveen Reddy Guda",
    role: "Associate Advocate",
    image: "rampraveen",
    credentials: "B.Tech., LL.B.",
    bio: [
      "Rampraveen Reddy Guda is a dedicated legal professional holding an integrated background in technology and law with a B.Tech and an LL.B. With two years of practical experience, he brings a modern, analytical perspective to the firm.",
      "Currently working closely with senior counsels, Rampraveen is actively involved in supporting the legal team across various matters, combining technical fluency with foundational legal research and case preparation. Eager to learn and deeply committed to professional growth, he plays a key collaborative role in ensuring efficient handling of day-to-day legal operations and client deliverables.",
    ],
  },
];
export const whatsapp = "917660000787";
