import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Building } from "lucide-react";
import { researchPosts } from "@/data/research";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

interface Props { params: Promise<{ slug: string }> }

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
    <div className="min-h-screen bg-background pt-20">
      <div className="w-full max-w-4xl mx-auto px-6 py-12">

        {/* Back */}
        <Link
          href="/research"
          className="inline-flex items-center gap-2 text-sm text-muted-fg hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> All publications
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <Badge variant="accent">{post.category}</Badge>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" size="sm">#{tag}</Badge>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-snug mb-6 text-balance">
            {post.title}
          </h1>
          <p className="text-lg text-muted-fg leading-relaxed mb-8">{post.excerpt}</p>

          {/* Author card */}
          <div className="bg-surface border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <Avatar name={post.author.name} size="lg" />
            <div className="grow">
              <p className="font-semibold text-foreground">{post.author.name}</p>
              <p className="text-sm text-muted-fg">{post.author.role}</p>
              <p className="flex items-center gap-1.5 mt-1 text-xs text-muted">
                <Building className="w-3.5 h-3.5" />{post.author.institution}
              </p>
            </div>
            <div className="flex flex-col sm:items-end gap-2 text-xs text-muted shrink-0">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(post.publishedAt)}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTimeMinutes} min read</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border mb-10" />

        {/* Article body — simple line-by-line renderer */}
        <article className="space-y-1">
          {post.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
              return (
                <h2 key={i} className="text-2xl font-semibold text-foreground mt-10 mb-4 tracking-tight">
                  {line.slice(3)}
                </h2>
              );
            }
            if (/^[-*] /.test(line)) {
              return (
                <li key={i} className="text-muted-fg leading-relaxed ml-5 list-disc mb-1">
                  {line.slice(2)}
                </li>
              );
            }
            if (/^\d+\. /.test(line)) {
              return (
                <li key={i} className="text-muted-fg leading-relaxed ml-5 list-decimal mb-1">
                  {line.replace(/^\d+\. /, "")}
                </li>
              );
            }
            if (line.startsWith("|")) {
              return (
                <div key={i} className="overflow-x-auto my-6 rounded-lg border border-border">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-border bg-surface-raised">
                        {line.split("|").filter(Boolean).map((cell, j) => (
                          <td key={j} className="px-4 py-2.5 text-foreground font-medium whitespace-nowrap">
                            {cell.trim()}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            }
            if (line.trim() === "") return <div key={i} className="h-3" />;
            return (
              <p key={i} className="text-muted-fg leading-relaxed">{line}</p>
            );
          })}
        </article>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold text-foreground mb-6">Related Publications</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/research/${r.slug}`}
                  className="group bg-surface border border-border rounded-xl p-4 hover:border-accent transition-colors block"
                >
                  <Badge variant="accent" size="sm" className="mb-3">{r.category}</Badge>
                  <h4 className="text-sm font-medium text-foreground leading-snug line-clamp-3 group-hover:text-accent-fg transition-colors">
                    {r.title}
                  </h4>
                  <span className="flex items-center gap-1 mt-3 text-xs text-muted">
                    <Clock className="w-3 h-3" />{r.readTimeMinutes}m read
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
