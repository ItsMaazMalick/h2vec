"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  LayoutGrid,
  List,
  Download,
  FileText,
  Database,
  Filter,
} from "lucide-react";
import { datasets, datasetDomains } from "@/data/datasets";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import type { DatasetDomain } from "@/data/datasets";

type ViewMode = "grid" | "table";

const domainBadge: Record<string, "accent" | "teal" | "muted"> = {
  NLP: "accent",
  "Computer Vision": "teal",
  Audio: "teal",
  Tabular: "muted",
  Finance: "muted",
  Healthcare: "accent",
  Agriculture: "teal",
  Multimodal: "muted",
};

export default function DatasetsPage() {
  const [query, setQuery] = useState("");
  const [activeDomain, setActiveDomain] = useState<DatasetDomain | "All">("All");
  const [view, setView] = useState<ViewMode>("grid");

  const filtered = useMemo(() => {
    return datasets.filter((d) => {
      const matchesDomain = activeDomain === "All" || d.domain === activeDomain;
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.tags.some((t) => t.includes(q)) ||
        d.institution.toLowerCase().includes(q);
      return matchesDomain && matchesQuery;
    });
  }, [query, activeDomain]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="container-page pt-28 pb-12">
          <SectionHeader
            align="left"
            eyebrow="Open Data"
            title="Dataset Repository"
            description="Curated, CC-licensed machine learning datasets built for Pakistani research contexts — from Urdu NLP to agricultural AI."
          />

          {/* Stats Bar */}
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-[var(--muted-fg)]">
            {[
              { label: "Total Datasets", value: datasets.length },
              { label: "Domains", value: datasetDomains.length },
              { label: "Total Downloads", value: "44K+" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="font-semibold text-[var(--foreground)]">{s.value}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Search + View Toggle */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
              <input
                type="text"
                placeholder="Search datasets, domains, tags..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--surface-raised)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>
            <div className="flex items-center gap-1 bg-[var(--surface-raised)] rounded-lg border border-[var(--border)] p-1 self-start">
              <button
                onClick={() => setView("grid")}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  view === "grid"
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                )}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView("table")}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  view === "table"
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                )}
                aria-label="Table view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Domain Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveDomain("All")}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
                activeDomain === "All"
                  ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--muted-fg)] hover:border-[var(--muted)] hover:text-[var(--foreground)]"
              )}
            >
              All Domains
            </button>
            {datasetDomains.map((domain) => (
              <button
                key={domain}
                onClick={() => setActiveDomain(domain)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
                  activeDomain === domain
                    ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                    : "border-[var(--border)] text-[var(--muted-fg)] hover:border-[var(--muted)] hover:text-[var(--foreground)]"
                )}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-page py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[var(--muted-fg)]">
            {filtered.length} dataset{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 text-[var(--muted-fg)]"
            >
              <Database className="w-10 h-10 mx-auto mb-4 opacity-30" />
              <p className="font-medium text-[var(--foreground)]">No datasets found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </motion.div>
          ) : view === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filtered.map((dataset, i) => (
                <motion.div
                  key={dataset.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  <Link
                    href={`/datasets/${dataset.slug}`}
                    className="group block card-base card-hover p-6 h-full rounded-xl"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[var(--accent-subtle)] flex items-center justify-center">
                        <Database className="w-5 h-5 text-[var(--accent)]" />
                      </div>
                      <Badge variant={domainBadge[dataset.domain] ?? "muted"}>
                        {dataset.domain}
                      </Badge>
                    </div>

                    <h2 className="font-semibold text-[var(--foreground)] leading-snug mb-2 group-hover:text-[var(--accent-fg)] transition-colors">
                      {dataset.name}
                    </h2>
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

                    <div className="pt-4 border-t border-[var(--border-subtle)] grid grid-cols-3 gap-2 text-xs text-[var(--muted)]">
                      <div>
                        <div className="font-medium text-[var(--foreground)]">{dataset.sizeLabel}</div>
                        <div>Size</div>
                      </div>
                      <div>
                        <div className="font-medium text-[var(--foreground)]">{dataset.recordsLabel}</div>
                        <div>Records</div>
                      </div>
                      <div>
                        <div className="font-medium text-[var(--foreground)]">
                          {dataset.downloads.toLocaleString()}
                        </div>
                        <div>Downloads</div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="overflow-x-auto rounded-xl border border-[var(--border)]"
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--surface)]">
                    {["Dataset", "Domain", "Size", "Records", "Format", "License", "Downloads"].map(
                      (h) => (
                        <th
                          key={h}
                          className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted)] uppercase tracking-wider whitespace-nowrap"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((dataset, i) => (
                    <motion.tr
                      key={dataset.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-[var(--border-subtle)] hover:bg-[var(--surface)] transition-colors group"
                    >
                      <td className="px-4 py-4">
                        <Link
                          href={`/datasets/${dataset.slug}`}
                          className="font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors whitespace-nowrap"
                        >
                          {dataset.name}
                        </Link>
                        <div className="text-xs text-[var(--muted)] mt-0.5">
                          {dataset.institution}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant={domainBadge[dataset.domain] ?? "muted"}>
                          {dataset.domain}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-[var(--muted-fg)] whitespace-nowrap">
                        {dataset.sizeLabel}
                      </td>
                      <td className="px-4 py-4 text-[var(--muted-fg)] whitespace-nowrap">
                        {dataset.recordsLabel}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex gap-1 flex-wrap">
                          {dataset.format.slice(0, 2).map((f) => (
                            <Badge key={f} variant="outline" size="sm">
                              {f}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-[var(--muted-fg)] whitespace-nowrap">
                        {dataset.license}
                      </td>
                      <td className="px-4 py-4 text-[var(--muted-fg)] whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Download className="w-3.5 h-3.5" />
                          {dataset.downloads.toLocaleString()}
                        </div>
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
