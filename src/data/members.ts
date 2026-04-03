export type MemberRole =
  | "Founder"
  | "Co-Founder"
  | "Research Lead"
  | "Engineering Lead"
  | "Data Lead"
  | "Community Lead"
  | "Research Scientist"
  | "Engineer"
  | "Collaborator";

export interface Member {
  id: string;
  name: string;
  role: MemberRole;
  title: string;
  institution: string;
  bio: string;
  expertise: string[];
  github?: string;
  linkedin?: string;
  scholar?: string;
  avatar: string;
  type: "founder" | "core" | "collaborator";
}

export const members: Member[] = [
  // {
  //   id: "m-001",
  //   name: "Dr. Imran Raza",
  //   role: "Founder",
  //   title: "Executive Director",
  //   institution: "LUMS",
  //   bio: "Dr. Imran Raza leads H2Vec's strategic direction and research vision. With 15 years in ML research and policy, he previously built AI infrastructure at PITB and GSMA.",
  //   expertise: ["NLP", "AI Policy", "Research Infrastructure"],
  //   github: "imranraza",
  //   linkedin: "imranraza",
  //   scholar: "imranraza",
  //   avatar: "",
  //   type: "founder",
  // },
  {
    id: "m-002",
    name: "Basit Ismail",
    role: "Co-Founder",
    title: "NLP Research Lead",
    institution: "Allama Iqbal Open University (AIOU)",
    bio: "Basit Ismail is an NLP researcher and academic affiliated with Allama Iqbal Open University (AIOU). His work focuses on natural language processing, machine learning, and developing computational resources for low-resource languages, particularly in the South Asian context. At H2Vec, he leads research initiatives aimed at building scalable language technologies and advancing Urdu and regional NLP capabilities.",
    expertise: [
      "Natural Language Processing",
      "Machine Learning",
      "Low-Resource Languages",
      "Urdu NLP",
    ],
    github: "basitismail",
    linkedin: "basitismail",
    scholar: "basitismail",
    avatar: "",
    type: "founder",
  },
  {
    id: "m-003",
    name: "Shahid Ismail",
    role: "Co-Founder",
    title: "Engineering Lead",
    institution: "H2Vec",
    bio: "Former SWE at Google Brain. Leads H2Vec's engineering team — building data infrastructure, dataset APIs, and the core platform that enables researchers nationwide.",
    expertise: ["MLOps", "Data Engineering", "Platform Engineering"],
    github: "shahidismail",
    linkedin: "shahidismail",
    avatar: "",
    type: "founder",
  },
  // {
  //   id: "m-004",
  //   name: "Zara Khan",
  //   role: "Research Lead",
  //   title: "Computer Vision Research Lead",
  //   institution: "NARC",
  //   bio: "Computer vision researcher focused on agricultural and environmental AI. Leads the Crop Disease Vision and Remote Sensing dataset initiatives.",
  //   expertise: ["Computer Vision", "Agriculture AI", "Remote Sensing"],
  //   github: "zarakhan",
  //   linkedin: "zarakhan",
  //   scholar: "zarakhan",
  //   avatar: "",
  //   type: "core",
  // },
  // {
  //   id: "m-005",
  //   name: "Dr. Sana Mirza",
  //   role: "Research Lead",
  //   title: "Healthcare AI Research Lead",
  //   institution: "Aga Khan University",
  //   bio: "Radiologist turned AI researcher. Directs H2Vec's healthcare AI portfolio, overseeing federated learning deployments across 8+ hospitals.",
  //   expertise: ["Medical Imaging", "Federated Learning", "Clinical AI"],
  //   github: "sanamirza",
  //   linkedin: "sanamirza",
  //   scholar: "sanamirza",
  //   avatar: "",
  //   type: "core",
  // },
  // {
  //   id: "m-006",
  //   name: "Bilal Hassan",
  //   role: "Engineer",
  //   title: "Senior ML Engineer",
  //   institution: "H2Vec",
  //   bio: "Builds and maintains H2Vec's model training infrastructure. Expert in distributed training, dataset versioning, and open-source tooling for the Pakistani ML community.",
  //   expertise: ["PyTorch", "Distributed Training", "DevOps"],
  //   github: "bilalhassan",
  //   linkedin: "bilalhassan",
  //   avatar: "",
  //   type: "core",
  // },
  // {
  //   id: "m-007",
  //   name: "Nadia Qureshi",
  //   role: "Data Lead",
  //   title: "Data & Partnerships Lead",
  //   institution: "H2Vec",
  //   bio: "Manages H2Vec's dataset acquisition partnerships with government agencies, NGOs, and academic institutions. Ensures data quality and licensing compliance.",
  //   expertise: ["Data Governance", "Partnerships", "Open Data"],
  //   linkedin: "nadiaqureshi",
  //   avatar: "",
  //   type: "core",
  // },
  // {
  //   id: "m-008",
  //   name: "Amal Hussain",
  //   role: "Research Scientist",
  //   title: "AI Ethics Researcher",
  //   institution: "IBA Karachi",
  //   bio: "PhD candidate studying bias, fairness, and accountability in AI systems with a focus on South Asian languages and social contexts.",
  //   expertise: ["AI Ethics", "Fairness", "Bias Mitigation"],
  //   github: "amalhussain",
  //   linkedin: "amalhussain",
  //   scholar: "amalhussain",
  //   avatar: "",
  //   type: "core",
  // },
  {
    id: "m-009",
    name: "Dr. Usman Akram",
    role: "Collaborator",
    title: "Professor of CS",
    institution: "NUST",
    bio: "Collaborates on climate informatics and time-series forecasting projects. Supervises H2Vec-affiliated PhD students at NUST.",
    expertise: ["Time Series", "Climate AI", "Deep Learning"],
    scholar: "usmanakram",
    linkedin: "usmanakram",
    avatar: "",
    type: "collaborator",
  },
  // {
  //   id: "m-010",
  //   name: "Dr. Naveed Ahmad",
  //   role: "Collaborator",
  //   title: "Assistant Professor",
  //   institution: "UET Peshawar",
  //   bio: "Leads Pashto and other Paktunkhwa language speech recognition research. Contributor to the Pashto ASR Corpus.",
  //   expertise: ["Speech Recognition", "Pashto NLP", "Audio Processing"],
  //   scholar: "naveedahmad",
  //   github: "naveedahmad",
  //   avatar: "",
  //   type: "collaborator",
  // },
  // {
  //   id: "m-011",
  //   name: "Nasreen Baloch",
  //   role: "Collaborator",
  //   title: "Linguistics Researcher",
  //   institution: "University of Balochistan",
  //   bio: "Expert in Balochi linguistics and language documentation. Driving force behind Balochi NLP resources at H2Vec.",
  //   expertise: ["Linguistics", "Balochi", "ASR"],
  //   linkedin: "nasreenbaloch",
  //   avatar: "",
  //   type: "collaborator",
  // },
  // {
  //   id: "m-012",
  //   name: "Saqib Mehmood",
  //   role: "Community Lead",
  //   title: "Community & Outreach Lead",
  //   institution: "H2Vec",
  //   bio: "Organizes H2Vec workshops, hackathons, and school programs. Has run 40+ outreach events across 15 cities in Pakistan.",
  //   expertise: ["Community Building", "Education", "Event Management"],
  //   linkedin: "saqibmehmood",
  //   github: "saqibmehmood",
  //   avatar: "",
  //   type: "core",
  // },
];
