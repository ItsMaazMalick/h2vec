import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, Database, FileText, Calendar, User, Building, GitBranch, Info, Scale } from "lucide-react";
import { datasets } from "@/data/datasets";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

interface Props { params: Promise<{ slug: string }> }

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
  NLP: "accent", "Computer Vision": "teal", Audio: "teal",
  Tabular: "muted", Finance: "muted", Healthcare: "accent", Agriculture: "teal",
};

export default async function DatasetDetailPage({ params }: Props) {
  const { slug } = await params;
  const dataset = datasets.find((d) => d.slug === slug);
  if (!dataset) notFound();

  const related = datasets.filter((d) => d.id !== dataset.id && d.domain === dataset.domain).slice(0, 3);

  const meta = [
    { icon: FileText,  label: "Size",        value: dataset.sizeLabel },
    { icon: Database,  label: "Records",     value: dataset.recordsLabel },
    { icon: Scale,     label: "License",     value: dataset.license },
    { icon: GitBranch, label: "Version",     value: `v${dataset.version}` },
    { icon: Building,  label: "Institution", value: dataset.institution },
    { icon: Calendar,  label: "Published",   value: formatDate(dataset.publishedAt) },
    { icon: Calendar,  label: "Updated",     value: formatDate(dataset.updatedAt) },
    { icon: Download,  label: "Downloads",   value: dataset.downloads.toLocaleString() },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="w-full max-w-7xl mx-auto px-6 py-12">

        {/* Back */}
        <Link href="/datasets"
          className="inline-flex items-center gap-2 text-sm text-muted-fg hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> All datasets
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Main ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Hero card */}
            <div className="bg-surface border border-border rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Database className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant={domainBadge[dataset.domain] ?? "muted"}>{dataset.domain}</Badge>
                    {dataset.featured && <Badge variant="teal" size="sm">Featured</Badge>}
                    <Badge variant="muted" size="sm">v{dataset.version}</Badge>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                    {dataset.name}
                  </h1>
                </div>
              </div>

              <p className="text-muted-fg leading-relaxed mb-6">{dataset.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {dataset.tags.map((tag) => (
                  <Badge key={tag} variant="outline">#{tag}</Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-6 border-t border-border-subtle">
                <Button size="lg" className="gap-2">
                  <Download className="w-4 h-4" /> Download Dataset
                </Button>
                <Button variant="secondary" size="lg">Request Access</Button>
              </div>
            </div>

            {/* Format + Source */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-surface border border-border rounded-xl p-5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">File Formats</h3>
                <div className="flex flex-wrap gap-2">
                  {dataset.format.map((f) => <Badge key={f} variant="accent">{f}</Badge>)}
                </div>
              </div>
              <div className="bg-surface border border-border rounded-xl p-5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">Data Source</h3>
                <p className="text-sm text-foreground">{dataset.source}</p>
              </div>
            </div>

            {/* Authors */}
            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">Authors</h3>
              <div className="flex flex-wrap gap-2">
                {dataset.authors.map((author) => (
                  <div key={author}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-raised border border-border">
                    <User className="w-3.5 h-3.5 text-muted" />
                    <span className="text-sm text-foreground">{author}</span>
                  </div>
                ))}
              </div>
              {dataset.doi && (
                <div className="mt-4 pt-4 border-t border-border-subtle flex items-center gap-2 text-xs text-muted">
                  <Info className="w-3.5 h-3.5" />
                  DOI: <code className="text-accent-fg bg-accent/10 px-1.5 py-0.5 rounded">{dataset.doi}</code>
                </div>
              )}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div>
            <div className="bg-surface border border-border rounded-xl p-5 sticky top-24">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">Metadata</h3>
              <div className="divide-y divide-border-subtle">
                {meta.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3 py-3">
                    <Icon className="w-4 h-4 text-muted mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs text-muted mb-0.5">{label}</div>
                      <div className="text-sm font-medium text-foreground">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-14 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold text-foreground mb-6">Related Datasets</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((d) => (
                <Link key={d.id} href={`/datasets/${d.slug}`}
                  className="group bg-surface border border-border rounded-xl p-5 hover:border-accent transition-colors block">
                  <Badge variant={domainBadge[d.domain] ?? "muted"} size="sm" className="mb-3">{d.domain}</Badge>
                  <h4 className="text-sm font-medium text-foreground leading-snug mb-2 group-hover:text-accent-fg transition-colors">
                    {d.name}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-muted mt-3">
                    <span>{d.sizeLabel}</span>
                    <span className="flex items-center gap-1"><Download className="w-3 h-3" />{d.downloads.toLocaleString()}</span>
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
