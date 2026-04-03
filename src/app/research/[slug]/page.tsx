import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Building,
  Sparkles,
  BookOpen,
  User,
  Zap,
  ArrowRight,
} from "lucide-react";
import { researchPosts } from "@/data/research";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return researchPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = researchPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function ResearchDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = researchPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = researchPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background pt-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-violet-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto px-6 py-12 relative">
        {/* Back */}
        <Link
          href="/research"
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted-fg hover:text-violet-300 transition-all mb-10"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>All publications</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <Badge variant="accent">{post.category}</Badge>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" size="sm">
                #{tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6 text-balance">
            {post.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-fg leading-relaxed mb-10">
            {post.excerpt}
          </p>

          {/* Author card */}
          <div className="relative bg-surface/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-5 hover:border-violet-500/30 transition-all duration-500">
            {/* Persistent gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent rounded-2xl" />

            <div className="relative flex items-center gap-4 grow">
              <div className="relative">
                <Avatar name={post.author.name} size="lg" />
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 blur-md -z-10" />
              </div>
              <div className="grow">
                <p className="font-semibold text-foreground text-base">
                  {post.author.name}
                </p>
                <p className="text-sm text-violet-300 font-medium">
                  {post.author.role}
                </p>
                <p className="flex items-center gap-1.5 mt-1 text-xs text-muted">
                  <Building className="w-3.5 h-3.5 text-cyan-400" />
                  {post.author.institution}
                </p>
              </div>
            </div>
            <div className="relative flex flex-col sm:items-end gap-2.5 text-xs shrink-0">
              <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5">
                <Calendar className="w-3.5 h-3.5 text-violet-400" />
                <span className="font-medium text-foreground">
                  {formatDate(post.publishedAt)}
                </span>
              </span>
              <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-medium text-foreground">
                  {post.readTimeMinutes} min read
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Divider with gradient */}
        <div className="relative mb-10 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

        {/* Article body — premium line-by-line renderer */}
        <article className="space-y-1">
          {post.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="text-2xl font-bold text-foreground mt-12 mb-5 tracking-tight flex items-center gap-3"
                >
                  <span className="w-1 h-8 rounded-full bg-gradient-to-b from-violet-500 to-purple-500" />
                  {line.slice(3)}
                </h2>
              );
            }
            if (/^[-*] /.test(line)) {
              return (
                <li
                  key={i}
                  className="text-muted-fg leading-relaxed ml-6 list-disc mb-2 flex items-start gap-2"
                >
                  <span>{line.slice(2)}</span>
                </li>
              );
            }
            if (/^\d+\. /.test(line)) {
              return (
                <li
                  key={i}
                  className="text-muted-fg leading-relaxed ml-6 list-decimal mb-2"
                >
                  {line.replace(/^\d+\. /, "")}
                </li>
              );
            }
            if (line.startsWith("|")) {
              return (
                <div
                  key={i}
                  className="overflow-x-auto my-8 rounded-2xl border border-white/10 bg-surface/40 backdrop-blur-sm"
                >
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-white/5 bg-white/5">
                        {line
                          .split("|")
                          .filter(Boolean)
                          .map((cell, j) => (
                            <td
                              key={j}
                              className="px-5 py-3.5 text-foreground font-medium whitespace-nowrap"
                            >
                              {cell.trim()}
                            </td>
                          ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            }
            if (line.trim() === "") return <div key={i} className="h-4" />;
            return (
              <p
                key={i}
                className="text-muted-fg leading-relaxed text-base mb-3"
              >
                {line}
              </p>
            );
          })}
        </article>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20 pt-10 border-t border-white/5">
            <h3 className="text-xl font-bold text-foreground mb-7 flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-violet-400" />
              Related Publications
            </h3>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/research/${r.slug}`}
                  className="group relative bg-surface/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-violet-500/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10 block overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5" />
                  <div className="relative">
                    <Badge variant="accent" size="sm" className="mb-4">
                      {r.category}
                    </Badge>
                    <h4 className="text-sm font-semibold text-foreground leading-snug line-clamp-3 group-hover:text-violet-300 transition-colors mb-4">
                      {r.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-muted mt-4 pt-4 border-t border-white/5">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-violet-400" />
                        {r.readTimeMinutes}m read
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-violet-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
