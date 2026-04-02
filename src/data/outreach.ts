export type EventType = "Workshop" | "Hackathon" | "Seminar" | "Bootcamp" | "Conference";
export type EventStatus = "upcoming" | "ongoing" | "past";
export type ProgramType = "Education" | "Research Grant" | "Mentorship" | "Community";

export interface OutreachEvent {
  id: string;
  title: string;
  type: EventType;
  status: EventStatus;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  city: string;
  capacity: number;
  registered: number;
  tags: string[];
  registrationOpen: boolean;
}

export interface Program {
  id: string;
  title: string;
  type: ProgramType;
  description: string;
  impact: string;
  beneficiaries: number;
  cities: string[];
  active: boolean;
  icon: string;
}

export const outreachEvents: OutreachEvent[] = [
  {
    id: "ev-001",
    title: "H2Vec National ML Hackathon 2025",
    type: "Hackathon",
    status: "upcoming",
    description:
      "Pakistan's largest ML hackathon — 48 hours, 200+ participants, 6 open problem tracks using H2Vec datasets. Prizes of PKR 1.5M. Open to students and professionals nationwide.",
    date: "2025-03-15",
    endDate: "2025-03-17",
    location: "NUST H-12 Campus",
    city: "Islamabad",
    capacity: 200,
    registered: 162,
    tags: ["hackathon", "competition", "datasets", "prize"],
    registrationOpen: true,
  },
  {
    id: "ev-002",
    title: "Urdu NLP Winter School",
    type: "Bootcamp",
    status: "upcoming",
    description:
      "5-day intensive bootcamp covering Urdu text processing, transformer fine-tuning, and speech recognition. Taught by H2Vec researchers and international collaborators. 40 seats only.",
    date: "2025-02-10",
    endDate: "2025-02-14",
    location: "LUMS",
    city: "Lahore",
    capacity: 40,
    registered: 38,
    tags: ["nlp", "urdu", "bootcamp", "hands-on"],
    registrationOpen: true,
  },
  {
    id: "ev-003",
    title: "AI for Agriculture Workshop — Multan",
    type: "Workshop",
    status: "upcoming",
    description:
      "Practical workshop for agricultural researchers and students on using computer vision for crop disease detection. Includes field data collection session.",
    date: "2025-01-25",
    location: "BZU Multan",
    city: "Multan",
    capacity: 80,
    registered: 71,
    tags: ["agriculture", "computer-vision", "workshop"],
    registrationOpen: true,
  },
  {
    id: "ev-004",
    title: "H2Vec Research Symposium 2024",
    type: "Conference",
    status: "past",
    description:
      "Annual gathering of H2Vec researchers, collaborators, and partners. 24 paper presentations, 3 keynotes, and dataset release announcements.",
    date: "2024-11-20",
    endDate: "2024-11-21",
    location: "Aga Khan University",
    city: "Karachi",
    capacity: 300,
    registered: 287,
    tags: ["research", "conference", "networking"],
    registrationOpen: false,
  },
  {
    id: "ev-005",
    title: "ML Fundamentals — Peshawar Roadshow",
    type: "Seminar",
    status: "past",
    description:
      "Free day-long seminar introducing ML concepts and H2Vec datasets to students at UET Peshawar. 140+ attendees.",
    date: "2024-10-12",
    location: "UET Peshawar",
    city: "Peshawar",
    capacity: 150,
    registered: 143,
    tags: ["beginners", "free", "seminar"],
    registrationOpen: false,
  },
  {
    id: "ev-006",
    title: "Healthcare AI Data Sprint",
    type: "Workshop",
    status: "past",
    description:
      "Annotation sprint for chest X-ray and retinal imaging datasets. 80 medical professionals and ML researchers collaborated on quality labeling.",
    date: "2024-09-05",
    endDate: "2024-09-06",
    location: "Aga Khan Hospital",
    city: "Karachi",
    capacity: 100,
    registered: 84,
    tags: ["healthcare", "annotation", "medical-ai"],
    registrationOpen: false,
  },
];

export const programs: Program[] = [
  {
    id: "pr-001",
    title: "H2Vec Research Grant",
    type: "Research Grant",
    description:
      "Seed funding (PKR 200K–500K) for Pakistani researchers building ML datasets and tools for under-resourced languages and domains. 20 grants awarded in 2024.",
    impact: "20 datasets funded, 38 researchers supported",
    beneficiaries: 38,
    cities: ["Islamabad", "Lahore", "Karachi", "Peshawar", "Quetta"],
    active: true,
    icon: "award",
  },
  {
    id: "pr-002",
    title: "ML School Visits",
    type: "Education",
    description:
      "H2Vec researchers visit schools and colleges in underserved areas to introduce students to AI and data science. Includes hands-on activities and career guidance.",
    impact: "40+ events across 15 cities",
    beneficiaries: 3200,
    cities: ["Lahore", "Faisalabad", "Multan", "Hyderabad", "Peshawar", "Quetta", "Gilgit"],
    active: true,
    icon: "graduation-cap",
  },
  {
    id: "pr-003",
    title: "Open Data Initiative",
    type: "Community",
    description:
      "Coordinating with government, NGOs, and private sector to digitize and open-source data critical for Pakistan-specific ML research. All datasets CC-licensed.",
    impact: "240+ datasets released",
    beneficiaries: 12000,
    cities: ["All provinces"],
    active: true,
    icon: "database",
  },
  {
    id: "pr-004",
    title: "Research Mentorship Program",
    type: "Mentorship",
    description:
      "1:1 mentorship pairing senior H2Vec researchers with graduate students pursuing ML-related theses at Pakistani universities. 6-month cohorts.",
    impact: "85 students mentored, 12 publications co-authored",
    beneficiaries: 85,
    cities: ["Islamabad", "Lahore", "Karachi"],
    active: true,
    icon: "users",
  },
];
