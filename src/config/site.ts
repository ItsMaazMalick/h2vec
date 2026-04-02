export const siteConfig = {
  name: "H2Vec",
  tagline: "Pakistan's ML Data Infrastructure",
  description:
    "H2Vec is Pakistan's centralized machine learning ecosystem — providing open datasets, research publications, community outreach, and tools to accelerate AI development.",
  url: "https://h2vec.pk",
  ogImage: "/og.png",

  nav: [
    { label: "Home",      href: "/" },
    { label: "Research",  href: "/research" },
    { label: "Datasets",  href: "/datasets" },
    { label: "Outreach",  href: "/outreach" },
    { label: "Members",   href: "/members" },
  ],

  socials: {
    github:   "https://github.com/h2vec",
    twitter:  "https://twitter.com/h2vec",
    linkedin: "https://linkedin.com/company/h2vec",
    email:    "hello@h2vec.pk",
  },

  stats: [
    { value: "240+",  label: "Datasets",       sub: "Across 12 domains" },
    { value: "580+",  label: "Researchers",    sub: "Nationwide network" },
    { value: "38",    label: "Institutions",   sub: "Partnered" },
    { value: "1.2M+", label: "Downloads",      sub: "Dataset pulls" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
