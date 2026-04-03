"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  LayoutGrid,
  List,
  Download,
  Database,
  FileText,
  HardDrive,
  Sparkles,
  TrendingUp,
  Shield,
  Globe,
} from "lucide-react";
import { datasets, datasetDomains } from "@/data/datasets";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import type { DatasetDomain } from "@/data/datasets";

const domainBadge: Record<string, "accent" | "teal" | "muted"> = {
  NLP: "accent",
  "Computer Vision": "teal",
  Audio: "teal",
  Tabular: "muted",
  Finance: "accent",
  Healthcare: "accent",
  Agriculture: "teal",
  Multimodal: "accent",
};

// Domain icon mapping
const domainIcons: Record<string, { icon: typeof Database; gradient: string }> =
  {
    NLP: { icon: Globe, gradient: "from-violet-500 to-purple-600" },
    "Computer Vision": {
      icon: Database,
      gradient: "from-cyan-500 to-blue-600",
    },
    Audio: { icon: Database, gradient: "from-amber-500 to-orange-600" },
    Tabular: { icon: HardDrive, gradient: "from-emerald-500 to-teal-600" },
    Finance: { icon: TrendingUp, gradient: "from-violet-500 to-fuchsia-600" },
    Healthcare: { icon: Database, gradient: "from-rose-500 to-pink-600" },
    Agriculture: { icon: Database, gradient: "from-emerald-500 to-green-600" },
    Multimodal: { icon: Sparkles, gradient: "from-violet-500 to-purple-600" },
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

export default function DatasetsPage() {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState<DatasetDomain | "All">("All");
  const [view, setView] = useState<"grid" | "table">("grid");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return datasets.filter((d) => {
      const matchesDomain = domain === "All" || d.domain === domain;
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.tags.some((t) => t.includes(q)) ||
        d.institution.toLowerCase().includes(q);
      return matchesDomain && matchesQuery;
    });
  }, [query, domain]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-violet-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="border-b border-white/5 bg-surface/40 backdrop-blur-sm relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
        <div className="w-full max-w-7xl mx-auto px-6 pt-28 pb-12 relative">
          <SectionHeader
            align="left"
            eyebrow="Open Data"
            title="Dataset Repository"
            description="Curated, CC-licensed ML datasets for Pakistani research contexts."
          />

          {/* Stats */}
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-fg">
            {[
              { label: "Total Datasets", value: datasets.length },
              { label: "Domains", value: datasetDomains.length },
              { label: "Total Downloads", value: "44K+" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/5"
              >
                <span className="font-bold text-violet-300">{s.value}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Search + view toggle */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search datasets, tags, institutions…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-raised border border-white/10 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>
            <div className="flex items-center gap-1 bg-surface-raised border border-white/10 rounded-xl p-1.5 self-start">
              {(["grid", "table"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  aria-label={`${v} view`}
                  className={cn(
                    "p-2.5 rounded-lg transition-all",
                    view === v
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                      : "text-muted hover:text-foreground hover:bg-white/5",
                  )}
                >
                  {v === "grid" ? (
                    <LayoutGrid className="w-4 h-4" />
                  ) : (
                    <List className="w-4 h-4" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Domain filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            {(["All", ...datasetDomains] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDomain(d as DatasetDomain | "All")}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                  domain === d
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white border-transparent shadow-lg"
                    : "border-white/10 text-muted-fg hover:border-violet-500/30 hover:text-foreground",
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-7xl mx-auto px-6 py-10 relative">
        <p className="text-sm text-muted-fg mb-6">
          {filtered.length} dataset{filtered.length !== 1 ? "s" : ""}
        </p>

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <Database className="w-10 h-10 mx-auto mb-4 text-muted opacity-40" />
              <p className="font-medium text-foreground">No datasets found</p>
              <p className="text-sm mt-1 text-muted-fg">
                Try adjusting your search or filters
              </p>
            </motion.div>
          ) : view === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((dataset, i) => {
                const domainInfo =
                  domainIcons[dataset.domain] || domainIcons.NLP;
                const DomainIcon = domainInfo.icon;
                const licenseInfo =
                  licenseBadges[dataset.license] || licenseBadges["CC BY 4.0"];
                const LicenseIcon = licenseInfo.icon;

                return (
                  <motion.div
                    key={dataset.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={`/datasets/${dataset.slug}`}
                      className="group relative block h-full bg-surface/40 backdrop-blur-sm border border-white/10 rounded-3xl p-7 hover:border-violet-500/50 transition-all duration-700 hover:-translate-y-2 hover:shadow-3xl hover:shadow-violet-500/15 overflow-hidden"
                    >
                      {/* Persistent gradient glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10" />
                      {/* Corner glow */}
                      <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl" />

                      <div className="relative">
                        {/* Top row: Icon + Domain badge + License badge */}
                        <div className="flex items-start justify-between gap-3 mb-5">
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${domainInfo.gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl`}
                            >
                              <DomainIcon
                                className="w-7 h-7 text-white"
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
                        <h2 className="font-bold text-xl text-foreground leading-snug mb-3 group-hover:text-violet-300 transition-colors">
                          {dataset.name}
                        </h2>

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
                          <div className="flex items-center gap-3">
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
            </motion.div>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-white/10 overflow-hidden bg-surface/40 backdrop-blur-sm"
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5">
                    {[
                      "Dataset",
                      "Domain",
                      "Size",
                      "Records",
                      "Format",
                      "License",
                      "Downloads",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-5 py-4 text-xs font-semibold text-muted-fg uppercase tracking-wider whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((dataset, i) => (
                    <motion.tr
                      key={dataset.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                    >
                      <td className="px-5 py-4">
                        <Link
                          href={`/datasets/${dataset.slug}`}
                          className="font-semibold text-foreground group-hover:text-violet-300 transition-colors whitespace-nowrap"
                        >
                          {dataset.name}
                        </Link>
                        <div className="text-xs text-muted mt-0.5">
                          {dataset.institution}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <Badge variant={domainBadge[dataset.domain] ?? "muted"}>
                          {dataset.domain}
                        </Badge>
                      </td>
                      <td className="px-5 py-4 text-muted-fg whitespace-nowrap font-medium">
                        {dataset.sizeLabel}
                      </td>
                      <td className="px-5 py-4 text-muted-fg whitespace-nowrap font-medium">
                        {dataset.recordsLabel}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-1.5 flex-wrap">
                          {dataset.format.slice(0, 2).map((f) => (
                            <Badge key={f} variant="accent" size="sm">
                              {f}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-muted-fg whitespace-nowrap">
                        {dataset.license}
                      </td>
                      <td className="px-5 py-4 text-muted-fg whitespace-nowrap">
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-medium">
                          <Download className="w-3.5 h-3.5 text-violet-400" />
                          {dataset.downloads.toLocaleString()}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
