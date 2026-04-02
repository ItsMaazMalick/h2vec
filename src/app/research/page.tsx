"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, User, ArrowRight, Filter } from "lucide-react";
import { researchPosts, researchCategories } from "@/data/research";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { ResearchCategory } from "@/data/research";

export default function ResearchPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ResearchCategory | "All">("All");

  const filtered = useMemo(() => {
    return researchPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.includes(q)) ||
        post.author.name.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="container-page pt-28 pb-12">
          <SectionHeader
            align="left"
            eyebrow="Research"
            title="Publications & Insights"
            description="Technical research, dataset papers, and deep-dives from the H2Vec research community."
          />

          {/* Search + Filter Row */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
              <input
                type="text"
                placeholder="Search publications..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--surface-raised)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("All")}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
                activeCategory === "All"
                  ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--muted-fg)] hover:border-[var(--muted)] hover:text-[var(--foreground)]"
              )}
            >
              All
            </button>
            {researchCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
                  activeCategory === cat
                    ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                    : "border-[var(--border)] text-[var(--muted-fg)] hover:border-[var(--muted)] hover:text-[var(--foreground)]"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container-page py-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[var(--muted-fg)]">
            {filtered.length} publication{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 text-[var(--muted-fg)]"
            >
              <Search className="w-10 h-10 mx-auto mb-4 opacity-30" />
              <p className="font-medium text-[var(--foreground)]">No results found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
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
                    className="group block card-base card-hover p-6 h-full rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="accent">{post.category}</Badge>
                      {post.featured && (
                        <Badge variant="teal" size="sm">Featured</Badge>
                      )}
                    </div>

                    <h2 className="font-semibold text-[var(--foreground)] leading-snug mb-3 group-hover:text-[var(--accent-fg)] transition-colors line-clamp-3">
                      {post.title}
                    </h2>

                    <p className="text-sm text-[var(--muted-fg)] leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" size="sm">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                        <User className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[120px]">{post.author.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTimeMinutes}m
                        </span>
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
