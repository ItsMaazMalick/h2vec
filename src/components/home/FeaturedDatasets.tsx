"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, Database, FileText } from "lucide-react";
import { datasets } from "@/data/datasets";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";

const domainBadge: Record<string, "accent" | "teal" | "muted"> = {
  NLP: "accent", "Computer Vision": "teal", Audio: "teal",
  Tabular: "muted", Finance: "muted", Healthcare: "accent",
};

export function FeaturedDatasets() {
  const featured = datasets.filter((d) => d.featured).slice(0, 4);

  return (
    <section className="py-20 border-t border-border bg-background">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <SectionHeader
            align="left"
            eyebrow="Core Resource"
            title="Featured Datasets"
            description="High-quality, Pakistan-centric datasets curated for research and development."
          />
          <Link href="/datasets" className="hidden md:inline-flex items-center gap-1.5 text-sm text-muted-fg hover:text-foreground transition-colors shrink-0">
            View all <ArrowRight className="w-4 h-4" />
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
                className="group block h-full bg-surface border border-border rounded-xl p-6 hover:border-accent transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Database className="w-5 h-5 text-accent" />
                  </div>
                  <Badge variant={domainBadge[dataset.domain] ?? "muted"}>{dataset.domain}</Badge>
                </div>

                <h3 className="font-semibold text-foreground leading-snug mb-2 group-hover:text-accent-fg transition-colors">
                  {dataset.name}
                </h3>
                <p className="text-sm text-muted-fg leading-relaxed line-clamp-2 mb-4">
                  {dataset.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {dataset.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                  <div className="flex items-center gap-4 text-xs text-muted">
                    <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" />{dataset.sizeLabel}</span>
                    <span className="flex items-center gap-1"><Download className="w-3.5 h-3.5" />{dataset.downloads.toLocaleString()}</span>
                  </div>
                  <span className="text-xs text-muted">{dataset.license}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
