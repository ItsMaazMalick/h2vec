import Link from "next/link";
import { Database, GitBranch, X, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

const footerLinks = {
  Platform: [
    { label: "Datasets", href: "/datasets" },
    { label: "Research", href: "/research" },
    { label: "Outreach", href: "/outreach" },
    { label: "Members", href: "/members" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Dataset Guidelines", href: "#" },
    { label: "Contribute", href: "#" },
  ],
  Community: [
    { label: "GitHub", href: siteConfig.socials.github },
    { label: "Newsletter", href: "#" },
    { label: "Events", href: "/outreach" },
    { label: "Discord", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Use", href: "#" },
    { label: "Data Licensing", href: "#" },
    { label: "Contact", href: "#" },
  ],
};

const socials = [
  { icon: GitBranch, href: siteConfig.socials.github, label: "GitHub" },
  { icon: X, href: siteConfig.socials.twitter, label: "X / Twitter" },
  { icon: Mail, href: `mailto:${siteConfig.socials.email}`, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 py-16 relative">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Database className="w-4 h-4 text-white" />
              </div>
              <span className="text-foreground font-bold text-lg tracking-tight">
                H2Vec
              </span>
            </Link>
            <p className="text-sm text-muted-fg leading-relaxed max-w-65">
              Building Pakistan&apos;s open ML data infrastructure — one dataset
              at a time.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-fg hover:text-violet-300 hover:bg-violet-500/10 border border-border/50 hover:border-violet-500/30 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-4">
                {group}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-fg hover:text-violet-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} H2Vec. Advancing ML in Pakistan.
          </p>
          <a
            href={siteConfig.socials.github}
            className="text-xs text-muted-fg hover:text-violet-300 transition-colors"
          >
            Open Source · View on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
