import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Database,
  FileText,
  Calendar,
  User,
  Building,
  GitBranch,
  Info,
  Scale,
  ExternalLink,
  Sparkles,
  Zap,
} from "lucide-react";
import { datasets } from "@/data/datasets";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return datasets.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = datasets.find((x) => x.slug === slug);
  if (!d) return {};
  return { title: d.name, description: d.description };
}

const domainBadge: Record<string, "accent" | "teal" | "muted"> = {
  NLP: "accent",
  "Computer Vision": "teal",
  Audio: "teal",
  Tabular: "muted",
  Finance: "accent",
  Healthcare: "accent",
  Agriculture: "teal",
  Multimodal: "accent",
};

export default async function DatasetDetailPage({ params }: Props) {
  const { slug } = await params;
  const dataset = datasets.find((d) => d.slug === slug);
  if (!dataset) notFound();

  const related = datasets
    .filter((d) => d.id !== dataset.id && d.domain === dataset.domain)
    .slice(0, 3);

  const meta = [
    { icon: FileText, label: "Size", value: dataset.sizeLabel },
    { icon: Database, label: "Records", value: dataset.recordsLabel },
    { icon: Scale, label: "License", value: dataset.license },
    { icon: GitBranch, label: "Version", value: `v${dataset.version}` },
    { icon: Building, label: "Institution", value: dataset.institution },
    {
      icon: Calendar,
      label: "Published",
      value: formatDate(dataset.publishedAt),
    },
    { icon: Calendar, label: "Updated", value: formatDate(dataset.updatedAt) },
    {
      icon: Download,
      label: "Downloads",
      value: dataset.downloads.toLocaleString(),
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-violet-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 py-12 relative">
        {/* Back */}
        <Link
          href="/datasets"
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted-fg hover:text-violet-300 transition-all mb-10"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>All datasets</span>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Main ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero card */}
            <div className="relative bg-surface/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden hover:border-violet-500/30 transition-all duration-500">
              {/* Persistent gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5" />
              {/* Corner glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl" />

              <div className="relative">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex items-center justify-center shrink-0 shadow-xl shadow-violet-500/10">
                    <Database
                      className="w-8 h-8 text-violet-400"
                      strokeWidth={2}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
                      <Badge variant={domainBadge[dataset.domain] ?? "muted"}>
                        {dataset.domain}
                      </Badge>
                      {dataset.featured && (
                        <Badge variant="teal" size="sm">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      <Badge variant="muted" size="sm">
                        v{dataset.version}
                      </Badge>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                      {dataset.name}
                    </h1>
                  </div>
                </div>

                <p className="text-muted-fg leading-relaxed mb-6 text-base">
                  {dataset.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-7">
                  {dataset.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5">
                  <Link
                    href="#"
                    className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-semibold transition-all duration-500 hover:-translate-y-0.5 overflow-hidden shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <Download className="w-4 h-4 relative transition-transform group-hover:scale-110" />
                    <span className="relative">Download Dataset</span>
                  </Link>
                  <Link
                    href="#"
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground text-sm font-medium hover:border-violet-500/40 hover:bg-violet-500/5 transition-all duration-500 hover:-translate-y-0.5"
                  >
                    <ExternalLink className="w-4 h-4 text-violet-400" />
                    Request Access
                  </Link>
                </div>
              </div>
            </div>

            {/* Format + Source */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="relative bg-surface/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-violet-500/40 transition-all duration-500 group">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent rounded-2xl" />
                <div className="relative">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-fg mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-violet-400" />
                    File Formats
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {dataset.format.map((f) => (
                      <Badge key={f} variant="accent">
                        {f}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative bg-surface/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-500 group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl" />
                <div className="relative">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-fg mb-4 flex items-center gap-2">
                    <Database className="w-4 h-4 text-cyan-400" />
                    Data Source
                  </h3>
                  <p className="text-sm text-foreground font-medium">
                    {dataset.source}
                  </p>
                </div>
              </div>
            </div>

            {/* Authors */}
            <div className="relative bg-surface/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-violet-500/40 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 rounded-2xl" />
              <div className="relative">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-fg mb-5 flex items-center gap-2">
                  <User className="w-4 h-4 text-violet-400" />
                  Authors & Contributors
                </h3>
                <div className="flex flex-wrap gap-3">
                  {dataset.authors.map((author) => (
                    <div
                      key={author}
                      className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-violet-400" />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {author}
                      </span>
                    </div>
                  ))}
                </div>
                {dataset.doi && (
                  <div className="mt-5 pt-5 border-t border-white/5 flex items-center gap-2 text-xs text-muted">
                    <Info className="w-4 h-4 text-violet-400" />
                    DOI:{" "}
                    <code className="text-violet-300 bg-violet-500/10 border border-violet-500/20 px-2 py-1 rounded-md font-mono">
                      {dataset.doi}
                    </code>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div>
            <div className="bg-surface/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sticky top-24">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-fg mb-5 flex items-center gap-2">
                <Zap className="w-4 h-4 text-violet-400" />
                Dataset Metadata
              </h3>
              <div className="divide-y divide-white/5">
                {meta.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 py-3.5 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 group-hover:bg-violet-500/20 transition-colors">
                      <Icon className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-1">
                        {label}
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick stats */}
              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                    <div className="text-lg font-bold text-violet-300">
                      {dataset.recordsLabel}
                    </div>
                    <div className="text-[10px] text-muted uppercase tracking-wider mt-1">
                      Records
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                    <div className="text-lg font-bold text-cyan-300">
                      {dataset.sizeLabel}
                    </div>
                    <div className="text-[10px] text-muted uppercase tracking-wider mt-1">
                      Size
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-white/5">
            <h3 className="text-xl font-bold text-foreground mb-7 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-violet-400" />
              Related Datasets
            </h3>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((d) => (
                <Link
                  key={d.id}
                  href={`/datasets/${d.slug}`}
                  className="group relative bg-surface/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-violet-500/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10 block overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5" />
                  <div className="relative">
                    <Badge
                      variant={domainBadge[d.domain] ?? "muted"}
                      size="sm"
                      className="mb-4"
                    >
                      {d.domain}
                    </Badge>
                    <h4 className="text-sm font-semibold text-foreground leading-snug mb-3 group-hover:text-violet-300 transition-colors line-clamp-2">
                      {d.name}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-muted mt-4 pt-4 border-t border-white/5">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-cyan-400" />
                        {d.sizeLabel}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Download className="w-3.5 h-3.5 text-violet-400" />
                        {d.downloads.toLocaleString()}
                      </span>
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
