export type ResearchCategory =
  | "NLP"
  | "Computer Vision"
  | "Machine Learning"
  | "Healthcare AI"
  | "Climate"
  | "Agriculture"
  | "Ethics & Society"
  | "Foundation Models";

export interface ResearchPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: ResearchCategory;
  tags: string[];
  author: {
    name: string;
    role: string;
    institution: string;
    avatar: string;
  };
  publishedAt: string;
  readTimeMinutes: number;
  featured: boolean;
  coverImage?: string;
}

export const researchPosts: ResearchPost[] = [
  {
    id: "rp-001",
    slug: "urdu-llm-benchmarking-2024",
    title: "Benchmarking Large Language Models on Urdu: Where Do We Stand?",
    excerpt:
      "We evaluate 12 leading LLMs — including GPT-4o, Claude 3, Llama 3, and Mistral — across 8 Urdu NLP tasks. The results reveal stark performance gaps and highlight the urgent need for Urdu-native training corpora.",
    content: `
## Introduction

The past two years have seen unprecedented growth in large language model (LLM) capabilities for high-resource languages. Yet for Urdu — spoken by over 230 million people worldwide — the picture remains fragmented. This study presents the first systematic benchmark of 12 frontier LLMs across 8 standardized Urdu NLP tasks.

## Methodology

We evaluate models on:
- **Sentiment Analysis** — using our Urdu Sentiment Corpus v2
- **Named Entity Recognition** — on WikiANN-UR
- **Machine Translation** — Urdu ↔ English (FLORES-200)
- **Question Answering** — UrduQA benchmark
- **Text Summarization** — News summary generation
- **Hate Speech Detection** — Social media corpus
- **POS Tagging** — CRULP annotated corpus
- **Dialect Identification** — Regional variety classification

## Key Findings

GPT-4o leads across all tasks but shows a **23-point F1 drop** compared to its English performance on NER. Open-source models like Llama 3 70B perform competitively on classification tasks but struggle with generation quality.

Notably, models fine-tuned on multilingual data without explicit Urdu representation exhibit **script confusion** — generating outputs that mix Devanagari characters into Nastaliq text at a rate of 4-7%.

## Recommendations

1. Release Urdu instruction-tuning datasets at scale (>1M examples)
2. Evaluate tokenization efficiency — current models use 3-4× more tokens per Urdu word
3. Establish a continuous evaluation harness (we release H2Vec-UrduEval alongside this paper)

## Conclusion

Urdu remains a critically under-served language in the LLM era. Our benchmark establishes a rigorous baseline and we invite the community to contribute to H2Vec-UrduEval.
    `.trim(),
    category: "NLP",
    tags: ["llm", "urdu", "benchmarking", "evaluation", "low-resource"],
    author: {
      name: "Dr. Ayesha Tariq",
      role: "NLP Research Lead",
      institution: "LUMS",
      avatar: "",
    },
    publishedAt: "2024-12-05",
    readTimeMinutes: 12,
    featured: true,
  },
  {
    id: "rp-002",
    slug: "crop-disease-detection-transformer",
    title: "Vision Transformers for Real-Time Crop Disease Detection in Pakistan",
    excerpt:
      "We fine-tune a DeiT-S transformer on our Pakistan Crop Disease Vision dataset and achieve 94.7% mAP. We discuss deployment on edge hardware for use in remote agricultural districts with intermittent connectivity.",
    content: `
## Background

Agricultural productivity in Pakistan is severely hampered by crop diseases, causing estimated losses of PKR 200–300 billion annually. Early and accurate disease identification is the cornerstone of effective mitigation.

## Dataset & Model

We leverage the **Pakistan Crop Disease Vision** dataset — 34K field images spanning wheat, rice, cotton, and sugarcane across 6 provinces. Our architecture builds on DeiT-S with a hierarchical multi-label classification head.

## Training Protocol

- Pre-trained on ImageNet-21K
- Fine-tuned for 50 epochs with CosineAnnealingLR
- Data augmentation: random crop, color jitter, grid distortion, Mixup
- Mixed precision (bfloat16)

## Results

| Model         | mAP@0.5 | Latency (ms) | Parameters |
|---------------|---------|--------------|------------|
| YOLOv8-L      | 91.2%   | 18ms         | 43M        |
| EfficientDet  | 89.4%   | 24ms         | 52M        |
| DeiT-S (ours) | 94.7%   | 22ms         | 22M        |

## Edge Deployment

We quantize the model to INT8 using OpenVINO and achieve <30ms inference on a Raspberry Pi 4, enabling deployment in villages with limited infrastructure.

## Conclusion

Vision transformers offer a compelling accuracy-efficiency tradeoff for agricultural AI in resource-constrained settings.
    `.trim(),
    category: "Agriculture",
    tags: ["vision-transformer", "object-detection", "agriculture", "edge-ai"],
    author: {
      name: "Zara Khan",
      role: "Computer Vision Researcher",
      institution: "NARC",
      avatar: "",
    },
    publishedAt: "2024-11-18",
    readTimeMinutes: 9,
    featured: true,
  },
  {
    id: "rp-003",
    slug: "federated-learning-health-pakistan",
    title: "Federated Learning Across Pakistani Hospitals: A Privacy-First Approach to Medical AI",
    excerpt:
      "We deploy a federated learning framework across 8 hospitals to train tuberculosis detection models without sharing raw patient data. Our approach achieves performance within 2.1% of centralized training.",
    content: `
## Motivation

Healthcare AI in Pakistan faces a fundamental tension: patient data is valuable for training but legally and ethically restricted from centralized collection. Federated learning (FL) offers a path forward.

## System Design

We implement a cross-silo FL setup with 8 hospital nodes using Flower (flwr). Each node runs local training on its DICOM chest X-ray data, sharing only model gradients with a central aggregator hosted on H2Vec infrastructure.

## Privacy Guarantees

- Differential Privacy (ε = 1.0) applied at the gradient level
- Secure aggregation via Paillier homomorphic encryption
- No raw patient images leave hospital premises

## Results

After 40 communication rounds, our federated model achieves **AUC 0.947** on TB detection, compared to **AUC 0.963** for centralized training — a gap of only 1.6 points while preserving patient privacy.

## Lessons Learned

Network heterogeneity across hospitals required adaptive compression. We found that SCAFFOLD gradient correction significantly reduced client drift in non-IID settings.

## Impact

This framework is now being evaluated for scale-up to 30 hospitals under the National Health AI Initiative.
    `.trim(),
    category: "Healthcare AI",
    tags: ["federated-learning", "privacy", "healthcare", "tuberculosis"],
    author: {
      name: "Dr. Sana Mirza",
      role: "Healthcare AI Lead",
      institution: "Aga Khan University",
      avatar: "",
    },
    publishedAt: "2024-10-30",
    readTimeMinutes: 11,
    featured: true,
  },
  {
    id: "rp-004",
    slug: "pakistan-climate-forecasting-deep-learning",
    title: "Deep Learning for Monsoon Rainfall Forecasting in Pakistan",
    excerpt:
      "Using 40 years of ERA5 reanalysis data combined with station observations, we train a hybrid ConvLSTM-Transformer model that outperforms WRF by 18% in 10-day accumulated rainfall prediction.",
    content: `
## Introduction

Pakistan faces increasing climate volatility — the 2022 floods alone caused $30B in damages. Improved rainfall prediction is critical for disaster preparedness.

## Data

We combine ERA5 reanalysis (1981–2024) with observations from 350 PMD weather stations. Input features include pressure levels (850, 500, 250 hPa), sea surface temperatures, and NDVI from MODIS.

## Architecture

Our hybrid model fuses ConvLSTM for spatial-temporal pattern extraction with a Transformer encoder for long-range atmospheric teleconnection modeling. Output is probabilistic — predicting rainfall distributions rather than point estimates.

## Results

On 10-day lead prediction, our model achieves a CRPSS of 0.42 against WRF (0.24), representing an 18-point improvement in probabilistic skill score.

## Operational Deployment

We are piloting this model with PMD for real-time seasonal forecasting during the 2025 pre-monsoon season.
    `.trim(),
    category: "Climate",
    tags: ["climate", "forecasting", "convlstm", "transformer", "pakistan"],
    author: {
      name: "Dr. Hassan Mehmood",
      role: "Climate Informatics",
      institution: "NUST",
      avatar: "",
    },
    publishedAt: "2024-10-01",
    readTimeMinutes: 8,
    featured: false,
  },
  {
    id: "rp-005",
    slug: "balochi-speech-recognition-zero-shot",
    title: "Zero-Shot Speech Recognition for Balochi Using Massively Multilingual Models",
    excerpt:
      "We evaluate Whisper-large-v3 and MMS on Balochi — a severely under-resourced language — in zero-shot and few-shot settings. We also release the first curated Balochi evaluation set of 4 hours.",
    content: `
## Background

Balochi is spoken by approximately 10 million people in Pakistan and Iran, yet has virtually no representation in modern ASR systems. This work represents the first rigorous evaluation of foundation models on Balochi speech.

## Evaluation Setup

We crowdsourced 4 hours of Balochi speech from native speakers across 3 dialects (Rakhshani, Sarawani, Southern). Speakers recorded domain-diverse sentences covering daily conversation, news-style reading, and storytelling.

## Zero-Shot Results

Whisper-large-v3 achieves 54.2% WER in zero-shot (language code: "bal"). MMS performs slightly worse at 61.8% WER. While unusable for production, these baselines confirm the models capture some phonological structure.

## Few-Shot Fine-Tuning

With only 2 hours of fine-tuning data, WER drops to 28.4% — a 47% relative reduction. This demonstrates the strong transferability of multilingual representations even for extremely low-resource languages.

## Contribution

We release BalSpeech-Eval (4 hours, 3 dialects) through H2Vec and invite further contributions.
    `.trim(),
    category: "NLP",
    tags: ["asr", "balochi", "zero-shot", "whisper", "low-resource"],
    author: {
      name: "Nasreen Baloch",
      role: "Linguistics & NLP",
      institution: "University of Balochistan",
      avatar: "",
    },
    publishedAt: "2024-09-15",
    readTimeMinutes: 7,
    featured: false,
  },
  {
    id: "rp-006",
    slug: "bias-gender-urdu-language-models",
    title: "Gender Bias in Urdu Language Models: Measurement, Origins, and Mitigation",
    excerpt:
      "We audit 6 Urdu LLMs for gender bias using a newly constructed evaluation suite. All models exhibit significant bias, which we trace to skewed web data. We propose debiasing strategies that reduce bias by 38% with negligible performance loss.",
    content: `
## Introduction

Bias in language models is well-documented for English. For Urdu — with its gendered grammar and distinct socio-cultural context — bias manifests differently and requires specialized evaluation.

## Bias Evaluation Suite

We construct UrduBias-Eval with 3,200 sentence pairs testing occupational, role, and social biases using a contrastive methodology adapted for Urdu grammar rules.

## Key Findings

All 6 evaluated models show significant bias (Stereotype Score > 60%) for traditionally male-dominated professions. Interestingly, Urdu-specific grammar rules amplify bias compared to English counterparts.

## Mitigation

We apply Iterative Nullspace Projection (INLP) at representation level and counterfactual data augmentation at fine-tuning level, achieving a 38% reduction in stereotype score while maintaining ≤1.2% performance drop on downstream tasks.

## Conclusion

Building fair Pakistani AI systems requires culturally-grounded bias evaluation infrastructure. We release UrduBias-Eval under CC BY 4.0.
    `.trim(),
    category: "Ethics & Society",
    tags: ["bias", "fairness", "urdu", "gender", "ethics"],
    author: {
      name: "Amal Hussain",
      role: "AI Ethics Researcher",
      institution: "IBA Karachi",
      avatar: "",
    },
    publishedAt: "2024-08-20",
    readTimeMinutes: 10,
    featured: false,
  },
];

export const researchCategories: ResearchCategory[] = [
  "NLP",
  "Computer Vision",
  "Machine Learning",
  "Healthcare AI",
  "Climate",
  "Agriculture",
  "Ethics & Society",
  "Foundation Models",
];
