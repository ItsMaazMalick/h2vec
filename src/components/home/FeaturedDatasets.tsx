"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, Database, FileText } from "lucide-react";
import { datasets } from "@/data/datasets";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";

const domainColor: Record<string, "accent" | "teal" | "muted"> = {
  NLP: "accent",
  "Computer Vision": "teal",
  Audio: "teal",
  Tabular: "muted",
  Finance: "muted",
  Healthcare: "accent",
};

export function FeaturedDatasets() {
  const featured = datasets.filter((d) => d.featured).slice(0, 4);

  return (
    <section className="section-padding border-t border-[var(--border)]">
      <div className="container-page">
        <div className="flex items-end justify-between mb-12">
          <SectionHeader
            align="left"
            eyebrow="Core Resource"
            title="Featured Datasets"
            description="High-quality, Pakistan-centric datasets curated for research and development."
          />
          <Link
            href="/datasets"
            className="hidden md:inline-flex items-center gap-1.5 text-sm text-[var(--muted-fg)] hover:text-[var(--foreground)] transition-colors"
          >
            View all datasets
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {featured.map((dataset, i) => (
            <motion.div
              key={dataset.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link
                href={`/datasets/${dataset.slug}`}
                className="group block card-base card-hover p-6 h-full rounded-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent-subtle)] flex items-center justify-center">
                    <Database className="w-5 h-5 text-[var(--accent)]" />
                  </div>
                  <Badge variant={domainColor[dataset.domain] ?? "muted"}>
                    {dataset.domain}
                  </Badge>
                </div>

                <h3 className="font-semibold text-[var(--foreground)] leading-snug mb-2 group-hover:text-[var(--accent-fg)] transition-colors">
                  {dataset.name}
                </h3>
                <p className="text-sm text-[var(--muted-fg)] leading-relaxed line-clamp-2 mb-4">
                  {dataset.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {dataset.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                  <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      {dataset.sizeLabel}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" />
                      {dataset.downloads.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-xs text-[var(--muted)]">{dataset.license}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 md:hidden text-center">
          <Link
            href="/datasets"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--accent)] hover:underline"
          >
            View all datasets
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
