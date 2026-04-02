"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, LayoutGrid, List, Download, Database } from "lucide-react";
import { datasets, datasetDomains } from "@/data/datasets";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import type { DatasetDomain } from "@/data/datasets";

const domainBadge: Record<string, "accent" | "teal" | "muted"> = {
  NLP: "accent", "Computer Vision": "teal", Audio: "teal",
  Tabular: "muted", Finance: "muted", Healthcare: "accent", Agriculture: "teal",
};

export default function DatasetsPage() {
  const [query, setQuery]           = useState("");
  const [domain, setDomain]         = useState<DatasetDomain | "All">("All");
  const [view, setView]             = useState<"grid" | "table">("grid");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return datasets.filter((d) => {
      const matchesDomain = domain === "All" || d.domain === domain;
      const matchesQuery  =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.tags.some((t) => t.includes(q)) ||
        d.institution.toLowerCase().includes(q);
      return matchesDomain && matchesQuery;
    });
  }, [query, domain]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-surface">
        <div className="w-full max-w-7xl mx-auto px-6 pt-28 pb-12">
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
              { label: "Domains",        value: datasetDomains.length },
              { label: "Total Downloads",value: "44K+" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="font-semibold text-foreground">{s.value}</span>
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
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-raised border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div className="flex items-center gap-1 bg-surface-raised border border-border rounded-lg p-1 self-start">
              {(["grid", "table"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  aria-label={`${v} view`}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    view === v ? "bg-accent text-white" : "text-muted hover:text-foreground"
                  )}
                >
                  {v === "grid" ? <LayoutGrid className="w-4 h-4" /> : <List className="w-4 h-4" />}
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
                  "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                  domain === d
                    ? "bg-accent text-white border-accent"
                    : "border-border text-muted-fg hover:border-muted hover:text-foreground"
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-7xl mx-auto px-6 py-10">
        <p className="text-sm text-muted-fg mb-6">
          {filtered.length} dataset{filtered.length !== 1 ? "s" : ""}
        </p>

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-24">
              <Database className="w-10 h-10 mx-auto mb-4 text-muted opacity-40" />
              <p className="font-medium text-foreground">No datasets found</p>
              <p className="text-sm mt-1 text-muted-fg">Try adjusting your search or filters</p>
            </motion.div>

          ) : view === "grid" ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((dataset, i) => (
                <motion.div key={dataset.id}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}>
                  <Link
                    href={`/datasets/${dataset.slug}`}
                    className="group flex flex-col h-full bg-surface border border-border rounded-xl p-6 hover:border-accent transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Database className="w-5 h-5 text-accent" />
                      </div>
                      <Badge variant={domainBadge[dataset.domain] ?? "muted"}>{dataset.domain}</Badge>
                    </div>

                    <h2 className="font-semibold text-foreground leading-snug mb-2 group-hover:text-accent-fg transition-colors">
                      {dataset.name}
                    </h2>
                    <p className="text-sm text-muted-fg leading-relaxed line-clamp-2 mb-4 grow">
                      {dataset.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {dataset.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-border-subtle grid grid-cols-3 gap-2 text-xs text-muted">
                      <div><div className="font-medium text-foreground">{dataset.sizeLabel}</div><div>Size</div></div>
                      <div><div className="font-medium text-foreground">{dataset.recordsLabel}</div><div>Records</div></div>
                      <div><div className="font-medium text-foreground">{dataset.downloads.toLocaleString()}</div><div>Downloads</div></div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

          ) : (
            <motion.div key="table" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} className="rounded-xl border border-border overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    {["Dataset", "Domain", "Size", "Records", "Format", "License", "Downloads"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((dataset, i) => (
                    <motion.tr key={dataset.id}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-border-subtle hover:bg-surface transition-colors group">
                      <td className="px-4 py-4">
                        <Link href={`/datasets/${dataset.slug}`}
                          className="font-medium text-foreground group-hover:text-accent transition-colors whitespace-nowrap">
                          {dataset.name}
                        </Link>
                        <div className="text-xs text-muted mt-0.5">{dataset.institution}</div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant={domainBadge[dataset.domain] ?? "muted"}>{dataset.domain}</Badge>
                      </td>
                      <td className="px-4 py-4 text-muted-fg whitespace-nowrap">{dataset.sizeLabel}</td>
                      <td className="px-4 py-4 text-muted-fg whitespace-nowrap">{dataset.recordsLabel}</td>
                      <td className="px-4 py-4">
                        <div className="flex gap-1 flex-wrap">
                          {dataset.format.slice(0, 2).map((f) => <Badge key={f} variant="outline" size="sm">{f}</Badge>)}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-muted-fg whitespace-nowrap">{dataset.license}</td>
                      <td className="px-4 py-4 text-muted-fg whitespace-nowrap">
                        <span className="flex items-center gap-1.5">
                          <Download className="w-3.5 h-3.5" />{dataset.downloads.toLocaleString()}
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
