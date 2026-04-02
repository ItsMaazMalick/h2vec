import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, Building, Tag } from "lucide-react";
import { researchPosts } from "@/data/research";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return researchPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = researchPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function ResearchDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = researchPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = researchPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-20">
      <div className="container-page py-12 max-w-4xl">
        {/* Back */}
        <Link
          href="/research"
          className="inline-flex items-center gap-2 text-sm text-[var(--muted-fg)] hover:text-[var(--foreground)] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          All publications
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <Badge variant="accent">{post.category}</Badge>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" size="sm">#{tag}</Badge>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--foreground)] leading-snug mb-6 text-balance">
            {post.title}
          </h1>

          <p className="text-lg text-[var(--muted-fg)] leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Author card */}
          <div className="card-base rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <Avatar name={post.author.name} size="lg" />
            <div className="flex-1">
              <p className="font-semibold text-[var(--foreground)]">{post.author.name}</p>
              <p className="text-sm text-[var(--muted-fg)]">{post.author.role}</p>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-[var(--muted)]">
                <Building className="w-3.5 h-3.5" />
                {post.author.institution}
              </div>
            </div>
            <div className="flex flex-col sm:items-end gap-2 text-xs text-[var(--muted)]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.publishedAt)}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTimeMinutes} min read
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--border)] mb-10" />

        {/* Content */}
        <article className="prose-h2:text-[var(--foreground)] prose-h2:font-semibold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4">
          {post.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="text-2xl font-semibold text-[var(--foreground)] mt-10 mb-4 tracking-tight"
                >
                  {line.replace("## ", "")}
                </h2>
              );
            }
            if (line.startsWith("- ")) {
              return (
                <li
                  key={i}
                  className="text-[var(--muted-fg)] leading-relaxed ml-4 list-disc mb-1.5"
                >
                  {line.replace("- ", "")}
                </li>
              );
            }
            if (line.startsWith("|")) {
              return (
                <div
                  key={i}
                  className="overflow-x-auto my-6 rounded-lg border border-[var(--border)]"
                >
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-[var(--border)] bg-[var(--surface-raised)]">
                        {line
                          .split("|")
                          .filter(Boolean)
                          .map((cell, j) => (
                            <td
                              key={j}
                              className="px-4 py-2.5 text-[var(--foreground)] font-medium whitespace-nowrap"
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
            if (line.startsWith("1. ") || /^\d+\. /.test(line)) {
              return (
                <li
                  key={i}
                  className="text-[var(--muted-fg)] leading-relaxed ml-4 list-decimal mb-1.5"
                >
                  {line.replace(/^\d+\. /, "")}
                </li>
              );
            }
            if (line.trim() === "") {
              return <div key={i} className="h-4" />;
            }
            return (
              <p key={i} className="text-[var(--muted-fg)] leading-relaxed">
                {line}
              </p>
            );
          })}
        </article>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16 pt-8 border-t border-[var(--border)]">
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-6">
              Related Publications
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/research/${r.slug}`}
                  className="group card-base card-hover p-4 rounded-xl block"
                >
                  <Badge variant="accent" size="sm" className="mb-3">
                    {r.category}
                  </Badge>
                  <h4 className="text-sm font-medium text-[var(--foreground)] leading-snug line-clamp-3 group-hover:text-[var(--accent-fg)] transition-colors">
                    {r.title}
                  </h4>
                  <div className="flex items-center gap-1 mt-3 text-xs text-[var(--muted)]">
                    <Clock className="w-3 h-3" />
                    {r.readTimeMinutes}m read
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
