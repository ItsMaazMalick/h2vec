"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, User } from "lucide-react";
import { researchPosts, researchCategories } from "@/data/research";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { ResearchCategory } from "@/data/research";

export default function ResearchPage() {
  const [query, setQuery]                   = useState("");
  const [activeCategory, setActiveCategory] = useState<ResearchCategory | "All">("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return researchPosts.filter((p) => {
      const matchesCat   = activeCategory === "All" || p.category === activeCategory;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q)) ||
        p.author.name.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="border-b border-border bg-surface">
        <div className="w-full max-w-7xl mx-auto px-6 pt-28 pb-12">
          <SectionHeader
            align="left"
            eyebrow="Research"
            title="Publications & Insights"
            description="Technical research, dataset papers, and deep-dives from the H2Vec research community."
          />

          {/* Search */}
          <div className="mt-8 relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search publications…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-raised border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Category pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {(["All", ...researchCategories] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as ResearchCategory | "All")}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                  activeCategory === cat
                    ? "bg-accent text-white border-accent"
                    : "border-border text-muted-fg hover:border-muted hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="w-full max-w-7xl mx-auto px-6 py-12">
        <p className="text-sm text-muted-fg mb-6">
          {filtered.length} publication{filtered.length !== 1 ? "s" : ""}
        </p>

        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <Search className="w-10 h-10 mx-auto mb-4 text-muted opacity-40" />
              <p className="font-medium text-foreground">No results found</p>
              <p className="text-sm mt-1 text-muted-fg">Try adjusting your search or filters</p>
            </motion.div>
          ) : (
            <motion.div key="grid" className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={`/research/${post.slug}`}
                    className="group flex flex-col h-full bg-surface border border-border rounded-xl p-6 hover:border-accent transition-colors"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="accent">{post.category}</Badge>
                      {post.featured && <Badge variant="teal" size="sm">Featured</Badge>}
                    </div>

                    <h2 className="font-semibold text-foreground leading-snug mb-3 group-hover:text-accent-fg transition-colors line-clamp-3">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-fg leading-relaxed line-clamp-3 mb-4 grow">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" size="sm">#{tag}</Badge>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs text-muted max-w-30 truncate">
                        <User className="w-3.5 h-3.5 shrink-0" />{post.author.name}
                      </span>
                      <div className="flex items-center gap-3 text-xs text-muted shrink-0">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTimeMinutes}m</span>
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
