export type DatasetDomain =
  | "NLP"
  | "Computer Vision"
  | "Audio"
  | "Tabular"
  | "Multimodal"
  | "Healthcare"
  | "Agriculture"
  | "Finance";

export type DatasetLicense = "MIT" | "CC BY 4.0" | "CC BY-SA 4.0" | "Apache 2.0" | "Custom";

export interface Dataset {
  id: string;
  slug: string;
  name: string;
  description: string;
  domain: DatasetDomain;
  tags: string[];
  size: number; // bytes
  sizeLabel: string;
  records: number;
  recordsLabel: string;
  format: string[];
  source: string;
  license: DatasetLicense;
  version: string;
  authors: string[];
  institution: string;
  publishedAt: string;
  updatedAt: string;
  downloads: number;
  featured: boolean;
  doi?: string;
  language?: string;
}

export const datasets: Dataset[] = [
  {
    id: "ds-001",
    slug: "urdu-sentiment-corpus-v2",
    name: "Urdu Sentiment Corpus v2",
    description:
      "A large-scale Urdu sentiment analysis corpus with 120K annotated tweets spanning political discourse, e-commerce reviews, and general social media. Includes dialectal variations from Punjab, Sindh, KPK, and Balochistan.",
    domain: "NLP",
    tags: ["urdu", "sentiment", "social-media", "multilingual"],
    size: 248_000_000,
    sizeLabel: "248 MB",
    records: 120_000,
    recordsLabel: "120K",
    format: ["JSON", "CSV"],
    source: "Twitter API + Crowd Annotation",
    license: "CC BY 4.0",
    version: "2.1.0",
    authors: ["Dr. Ayesha Tariq", "Bilal Hassan"],
    institution: "LUMS",
    publishedAt: "2024-03-15",
    updatedAt: "2024-11-02",
    downloads: 8430,
    featured: true,
    doi: "10.5281/h2vec.001",
    language: "Urdu",
  },
  {
    id: "ds-002",
    slug: "pak-crop-disease-vision",
    name: "Pakistan Crop Disease Vision",
    description:
      "34K high-resolution field images of major Pakistani crops (wheat, rice, sugarcane, cotton) labeled with 28 disease categories. Captured across 6 provinces under varying seasonal conditions.",
    domain: "Computer Vision",
    tags: ["agriculture", "disease-detection", "object-detection", "classification"],
    size: 12_800_000_000,
    sizeLabel: "12.8 GB",
    records: 34_000,
    recordsLabel: "34K",
    format: ["PNG", "YOLO", "COCO JSON"],
    source: "PARC + Field Surveys",
    license: "CC BY-SA 4.0",
    version: "1.3.0",
    authors: ["Zara Khan", "Ahmad Raza", "Dr. Faheem Akhtar"],
    institution: "NARC / PARC",
    publishedAt: "2024-01-08",
    updatedAt: "2024-09-20",
    downloads: 6210,
    featured: true,
  },
  {
    id: "ds-003",
    slug: "pashto-asr-corpus",
    name: "Pashto ASR Corpus",
    description:
      "1,200 hours of transcribed Pashto speech covering broadcast news, conversational speech, and religious lectures. One of the largest publicly available Pashto speech datasets.",
    domain: "Audio",
    tags: ["pashto", "asr", "speech", "low-resource"],
    size: 86_000_000_000,
    sizeLabel: "86 GB",
    records: 1_200,
    recordsLabel: "1200 hrs",
    format: ["WAV", "FLAC", "TextGrid"],
    source: "PTV, RFE/RL + Community",
    license: "CC BY 4.0",
    version: "1.0.0",
    authors: ["Dr. Naveed Ahmad"],
    institution: "UET Peshawar",
    publishedAt: "2023-11-20",
    updatedAt: "2024-06-15",
    downloads: 3840,
    featured: true,
    language: "Pashto",
  },
  {
    id: "ds-004",
    slug: "pk-fintech-transactions",
    name: "PK FinTech Transactions",
    description:
      "Anonymized mobile banking and fintech transaction records (2021–2024) from Pakistani users. Contains 2.4M transactions with fraud labels, merchant categories, and geo-tagged regions.",
    domain: "Finance",
    tags: ["fintech", "fraud-detection", "tabular", "anonymized"],
    size: 1_200_000_000,
    sizeLabel: "1.2 GB",
    records: 2_400_000,
    recordsLabel: "2.4M",
    format: ["CSV", "Parquet"],
    source: "Synthetic + Partner Banks",
    license: "Custom",
    version: "3.0.0",
    authors: ["H2Vec Research Team"],
    institution: "H2Vec",
    publishedAt: "2024-06-01",
    updatedAt: "2024-12-10",
    downloads: 4120,
    featured: true,
  },
  {
    id: "ds-005",
    slug: "pak-chest-xray-tb",
    name: "Pakistan Chest X-Ray (TB)",
    description:
      "52K chest X-ray images from public hospitals annotated for tuberculosis and 6 co-morbidities. Collected from 14 tertiary care hospitals across Pakistan with radiologist-verified labels.",
    domain: "Healthcare",
    tags: ["radiology", "tuberculosis", "classification", "segmentation"],
    size: 28_000_000_000,
    sizeLabel: "28 GB",
    records: 52_000,
    recordsLabel: "52K",
    format: ["DICOM", "PNG", "JSON"],
    source: "NHSRC + Partner Hospitals",
    license: "CC BY-SA 4.0",
    version: "2.0.0",
    authors: ["Dr. Sana Mirza", "Dr. Usman Malik"],
    institution: "Aga Khan University",
    publishedAt: "2023-08-14",
    updatedAt: "2024-08-30",
    downloads: 9870,
    featured: false,
  },
  {
    id: "ds-006",
    slug: "sindhi-text-corpus",
    name: "Sindhi Text Corpus",
    description:
      "Comprehensive Sindhi language corpus with 80M tokens sourced from newspapers, literature, government documents, and web content. Includes POS tags and named entity annotations.",
    domain: "NLP",
    tags: ["sindhi", "corpus", "ner", "pos-tagging", "low-resource"],
    size: 460_000_000,
    sizeLabel: "460 MB",
    records: 80_000_000,
    recordsLabel: "80M tokens",
    format: ["TXT", "CoNLL", "JSON"],
    source: "Web Scraping + Archives",
    license: "Apache 2.0",
    version: "1.1.0",
    authors: ["Mumtaz Ali Memon", "Dr. Imdad Talpur"],
    institution: "QUEST Nawabshah",
    publishedAt: "2024-02-22",
    updatedAt: "2024-10-05",
    downloads: 2760,
    featured: false,
    language: "Sindhi",
  },
  {
    id: "ds-007",
    slug: "urdu-ocr-printed-dataset",
    name: "Urdu OCR Printed Dataset",
    description:
      "190K image-text pairs from printed Urdu documents including books, newspapers (Jang, Dawn Urdu), and official documents. Covers Naskh and Nastaliq scripts.",
    domain: "Computer Vision",
    tags: ["ocr", "urdu", "document-understanding", "nastaliq"],
    size: 6_200_000_000,
    sizeLabel: "6.2 GB",
    records: 190_000,
    recordsLabel: "190K",
    format: ["PNG", "XML", "JSON"],
    source: "Digitized Archives",
    license: "CC BY 4.0",
    version: "2.0.0",
    authors: ["Dr. Faisal Shafait", "Waqas Anwar"],
    institution: "NUST",
    publishedAt: "2023-07-18",
    updatedAt: "2024-07-22",
    downloads: 5330,
    featured: false,
    language: "Urdu",
  },
  {
    id: "ds-008",
    slug: "pak-air-quality-timeseries",
    name: "Pakistan Air Quality Time Series",
    description:
      "Hourly AQI, PM2.5, PM10, NO₂, and SO₂ readings from 86 monitoring stations across 22 Pakistani cities (2018–2024). Weather metadata and satellite-derived variables included.",
    domain: "Tabular",
    tags: ["environment", "time-series", "forecasting", "climate"],
    size: 890_000_000,
    sizeLabel: "890 MB",
    records: 6_200_000,
    recordsLabel: "6.2M",
    format: ["CSV", "Parquet", "NetCDF"],
    source: "EPA Pakistan + Satellite",
    license: "CC BY 4.0",
    version: "1.4.0",
    authors: ["Nadia Qureshi", "Dr. Hassan Mehmood"],
    institution: "NUST / SUPARCO",
    publishedAt: "2024-04-10",
    updatedAt: "2024-12-01",
    downloads: 3970,
    featured: false,
  },
];

export const datasetDomains: DatasetDomain[] = [
  "NLP",
  "Computer Vision",
  "Audio",
  "Tabular",
  "Healthcare",
  "Agriculture",
  "Finance",
  "Multimodal",
];
