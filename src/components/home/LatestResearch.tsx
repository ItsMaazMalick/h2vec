"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User } from "lucide-react";
import { researchPosts } from "@/data/research";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatDate } from "@/lib/utils";

export function LatestResearch() {
  const featured = researchPosts.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-20 bg-surface border-t border-border">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <SectionHeader
            align="left"
            eyebrow="Research & Insights"
            title="Latest from the Lab"
            description="Peer-reviewed findings and technical deep-dives from H2Vec researchers."
          />
          <Link href="/research" className="hidden md:inline-flex items-center gap-1.5 text-sm text-muted-fg hover:text-foreground transition-colors shrink-0">
            All publications <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {featured.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Link
                href={`/research/${post.slug}`}
                className="group flex flex-col h-full bg-background border border-border rounded-xl p-6 hover:border-accent transition-colors"
              >
                <div className="mb-4">
                  <Badge variant="accent">{post.category}</Badge>
                </div>

                <h3 className="font-semibold text-foreground leading-snug mb-3 group-hover:text-accent-fg transition-colors line-clamp-3">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-fg leading-relaxed line-clamp-3 mb-6 grow">
                  {post.excerpt}
                </p>

                <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-muted">
                    <User className="w-3.5 h-3.5" />{post.author.name.split(" ").pop()}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTimeMinutes}m</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
