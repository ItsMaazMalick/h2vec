import Link from "next/link";
import { Database, GitBranchPlus, X, Mail, GitBranch } from "lucide-react";
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

const socialIcons = [
  { icon: GitBranch, href: siteConfig.socials.github, label: "GitHub" },
  { icon: X, href: siteConfig.socials.twitter, label: "Twitter" },
  // { icon: Linkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${siteConfig.socials.email}`, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="container-page py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                <Database className="w-4 h-4 text-white" />
              </div>
              <span className="text-[var(--foreground)] font-semibold text-lg tracking-tight">
                H2Vec
              </span>
            </Link>
            <p className="text-sm text-[var(--muted-fg)] leading-relaxed max-w-[260px]">
              Building Pakistan's open ML data infrastructure — one dataset at a
              time.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-md flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-raised)] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-widest mb-4">
                {group}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--muted-fg)] hover:text-[var(--foreground)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} H2Vec. Advancing ML in Pakistan.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
            <span>Open Source</span>
            <span>·</span>
            <a
              href={siteConfig.socials.github}
              className="hover:text-[var(--foreground)] transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
