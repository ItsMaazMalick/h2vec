"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  User,
  Sparkles,
  Calendar,
  BookOpen,
  Tag,
  Building,
} from "lucide-react";
import { researchPosts } from "@/data/research";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatDate } from "@/lib/utils";

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

export function LatestResearch() {
  const featured = researchPosts.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-24 bg-surface/40 border-t border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/2 right-0 w-[700px] h-[500px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="w-full max-w-7xl mx-auto px-6 relative">
        <div className="flex items-end justify-between mb-14">
          <SectionHeader
            align="left"
            eyebrow="Research & Insights"
            title="Latest from the Lab"
            description="Peer-reviewed findings and technical deep-dives from H2Vec researchers."
          />
          <Link
            href="/research"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-muted-fg hover:text-violet-300 transition-all group shrink-0"
          >
            All publications{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((post, i) => {
            const catInfo =
              categoryIcons[post.category] || categoryIcons["Machine Learning"];
            const CatIcon = catInfo.icon;

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  href={`/research/${post.slug}`}
                  className="group relative flex flex-col h-full bg-surface/40 backdrop-blur-sm border border-white/10 rounded-3xl p-7 hover:border-violet-500/50 transition-all duration-700 hover:-translate-y-2 hover:shadow-3xl hover:shadow-violet-500/15 overflow-hidden"
                >
                  {/* Persistent gradient glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 transition-opacity duration-700" />
                  {/* Corner glow */}
                  <div className="absolute -top-16 -right-16 w-32 h-32 bg-violet-500/15 rounded-full blur-3xl" />

                  <div className="relative">
                    {/* Top: Category badge + Tags */}
                    <div className="mb-5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r ${catInfo.gradient} text-white text-xs font-semibold shadow-lg`}
                      >
                        <CatIcon className="w-3 h-3" />
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-lg text-foreground leading-snug mb-3 group-hover:text-violet-300 transition-colors line-clamp-3">
                      {post.title}
                    </h3>

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
        </div>
      </div>
    </section>
  );
}
