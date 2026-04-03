"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Database,
  FileText,
  Sparkles,
  Globe,
  HardDrive,
  Users,
  Shield,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { datasets } from "@/data/datasets";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";

// Domain icon mapping
const domainIcons: Record<string, { icon: typeof Database; color: string }> = {
  NLP: { icon: Globe, color: "violet" },
  "Computer Vision": { icon: Database, color: "cyan" },
  Audio: { icon: Database, color: "amber" },
  Tabular: { icon: HardDrive, color: "emerald" },
  Finance: { icon: TrendingUp, color: "violet" },
  Healthcare: { icon: Users, color: "rose" },
  Agriculture: { icon: Database, color: "emerald" },
  Multimodal: { icon: Sparkles, color: "violet" },
};

// License badge mapping
const licenseBadges: Record<
  string,
  { bg: string; text: string; border: string; icon: typeof Shield }
> = {
  "CC BY 4.0": {
    bg: "bg-cyan-500/10",
    text: "text-cyan-300",
    border: "border-cyan-500/20",
    icon: Shield,
  },
  "CC BY-SA 4.0": {
    bg: "bg-blue-500/10",
    text: "text-blue-300",
    border: "border-blue-500/20",
    icon: Shield,
  },
  "Apache 2.0": {
    bg: "bg-emerald-500/10",
    text: "text-emerald-300",
    border: "border-emerald-500/20",
    icon: Shield,
  },
  MIT: {
    bg: "bg-violet-500/10",
    text: "text-violet-300",
    border: "border-violet-500/20",
    icon: Shield,
  },
  Custom: {
    bg: "bg-amber-500/10",
    text: "text-amber-300",
    border: "border-amber-500/20",
    icon: Shield,
  },
};

export function FeaturedDatasets() {
  const featured = datasets.filter((d) => d.featured).slice(0, 4);

  return (
    <section className="py-24 border-t border-white/5 bg-background relative overflow-hidden">
      {/* Background glow */}
      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-violet-500/5 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="w-full max-w-7xl mx-auto px-6 relative">
        <div className="flex items-end justify-between mb-14">
          <SectionHeader
            align="left"
            eyebrow="Core Resource"
            title="Featured Datasets"
            description="High-quality, Pakistan-centric datasets curated for research and development."
          />
          <Link
            href="/datasets"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-muted-fg hover:text-violet-300 transition-all group shrink-0"
          >
            View all{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {featured.map((dataset, i) => {
            const domainInfo = domainIcons[dataset.domain] || {
              icon: Database,
              color: "violet",
            };
            const DomainIcon = domainInfo.icon;
            const licenseInfo =
              licenseBadges[dataset.license] || licenseBadges["CC BY 4.0"];
            const LicenseIcon = licenseInfo.icon;

            return (
              <motion.div
                key={dataset.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  href={`/datasets/${dataset.slug}`}
                  className="group relative block h-full bg-surface/40 backdrop-blur-sm border border-white/10 rounded-3xl p-7 hover:border-violet-500/50 transition-all duration-700 hover:-translate-y-2 hover:shadow-3xl hover:shadow-violet-500/15 overflow-hidden"
                >
                  {/* Persistent gradient glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10 transition-all duration-700" />
                  {/* Corner glow */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl" />

                  <div className="relative">
                    {/* Top row: Icon + Domain badge + License badge */}
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex items-center justify-center group-hover:from-violet-500/30 group-hover:to-purple-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl shadow-violet-500/10">
                          <DomainIcon
                            className="w-7 h-7 text-violet-400"
                            strokeWidth={2}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold">
                            <Database className="w-3 h-3" />
                            {dataset.domain}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${licenseInfo.bg} ${licenseInfo.text} border ${licenseInfo.border} text-xs font-semibold`}
                          >
                            <LicenseIcon className="w-3 h-3" />
                            {dataset.license}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-xl text-foreground leading-snug mb-3 group-hover:text-violet-300 transition-colors">
                      {dataset.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-fg leading-relaxed line-clamp-2 mb-5">
                      {dataset.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {dataset.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border border-white/10 bg-white/5 text-muted-fg"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom stats */}
                    <div className="flex items-center justify-between pt-5 border-t border-white/5">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-xs">
                          <FileText className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="font-medium text-foreground">
                            {dataset.sizeLabel}
                          </span>
                        </span>
                        <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-xs">
                          <Download className="w-3.5 h-3.5 text-violet-400" />
                          <span className="font-medium text-foreground">
                            {dataset.downloads.toLocaleString()}
                          </span>
                        </span>
                      </div>
                      <span className="text-xs font-medium text-muted">
                        v{dataset.version}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
