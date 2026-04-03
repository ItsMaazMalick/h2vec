"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Clock,
  User,
  BookOpen,
  Sparkles,
  Calendar,
  Tag,
  Building,
} from "lucide-react";
import { researchPosts, researchCategories } from "@/data/research";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { ResearchCategory } from "@/data/research";

// Category icon mapping
const categoryIcons: Record<
  string,
  { icon: typeof BookOpen; gradient: string }
> = {
  NLP: { icon: BookOpen, gradient: "from-violet-500 to-purple-600" },
  "Computer Vision": { icon: BookOpen, gradient: "from-cyan-500 to-blue-600" },
  "Machine Learning": {
    icon: Sparkles,
    gradient: "from-amber-500 to-orange-600",
  },
  "Healthcare AI": { icon: User, gradient: "from-rose-500 to-pink-600" },
  Climate: { icon: BookOpen, gradient: "from-emerald-500 to-teal-600" },
  Agriculture: { icon: BookOpen, gradient: "from-emerald-500 to-green-600" },
  "Ethics & Society": {
    icon: User,
    gradient: "from-violet-500 to-fuchsia-600",
  },
  "Foundation Models": {
    icon: Sparkles,
    gradient: "from-violet-500 to-purple-600",
  },
};

export default function ResearchPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    ResearchCategory | "All"
  >("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return researchPosts.filter((p) => {
      const matchesCat =
        activeCategory === "All" || p.category === activeCategory;
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-violet-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Page header */}
      <div className="border-b border-white/5 bg-surface/40 backdrop-blur-sm relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
        <div className="w-full max-w-7xl mx-auto px-6 pt-28 pb-12 relative">
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
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-raised border border-white/10 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-violet-500/50 transition-colors"
            />
          </div>

          {/* Category pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {(["All", ...researchCategories] as const).map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory(cat as ResearchCategory | "All")
                }
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                  activeCategory === cat
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white border-transparent shadow-lg"
                    : "border-white/10 text-muted-fg hover:border-violet-500/30 hover:text-foreground",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="w-full max-w-7xl mx-auto px-6 py-12 relative">
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
              <p className="text-sm mt-1 text-muted-fg">
                Try adjusting your search or filters
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((post, i) => {
                const catInfo =
                  categoryIcons[post.category] ||
                  categoryIcons["Machine Learning"];
                const CatIcon = catInfo.icon;

                return (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={`/research/${post.slug}`}
                      className="group relative flex flex-col h-full bg-surface/40 backdrop-blur-sm border border-white/10 rounded-3xl p-7 hover:border-violet-500/50 transition-all duration-700 hover:-translate-y-2 hover:shadow-3xl hover:shadow-violet-500/15 overflow-hidden"
                    >
                      {/* Persistent gradient glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10" />
                      {/* Corner glow */}
                      <div className="absolute -top-16 -right-16 w-32 h-32 bg-violet-500/15 rounded-full blur-3xl" />

                      <div className="relative">
                        {/* Top: Category badge + Featured badge */}
                        <div className="flex items-start justify-between gap-2 mb-5">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r ${catInfo.gradient} text-white text-xs font-semibold shadow-lg`}
                          >
                            <CatIcon className="w-3 h-3" />
                            {post.category}
                          </span>
                          {post.featured && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                              <Sparkles className="w-3 h-3" />
                              Featured
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h2 className="font-bold text-lg text-foreground leading-snug mb-3 group-hover:text-violet-300 transition-colors line-clamp-3">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-sm text-muted-fg leading-relaxed line-clamp-3 mb-6 grow">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium border border-white/10 bg-white/5 text-muted-fg"
                            >
                              <Tag className="w-2.5 h-2.5" />
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Bottom: Author + Metadata */}
                        <div className="pt-5 border-t border-white/5 flex flex-col gap-3">
                          {/* Author */}
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex items-center justify-center">
                              <User className="w-4 h-4 text-violet-400" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-foreground truncate">
                                {post.author.name}
                              </p>
                              <p className="text-[10px] text-muted flex items-center gap-1">
                                <Building className="w-2.5 h-2.5 text-cyan-400" />
                                {post.author.institution}
                              </p>
                            </div>
                          </div>

                          {/* Metadata pills */}
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-medium text-muted-fg">
                              <Calendar className="w-3 h-3 text-violet-400" />
                              {formatDate(post.publishedAt)}
                            </span>
                            <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-medium text-muted-fg">
                              <Clock className="w-3 h-3 text-cyan-400" />
                              {post.readTimeMinutes}m read
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
