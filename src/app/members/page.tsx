"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GitBranch, BookOpen, ExternalLink } from "lucide-react";
import { members } from "@/data/members";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Member } from "@/data/members";

function MemberCard({ member, i }: { member: Member; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.07, duration: 0.4 }}
      className="card-static rounded-xl p-6 flex flex-col"
    >
      <div className="flex items-start gap-4 mb-4">
        <Avatar name={member.name} size="lg" />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground leading-tight truncate">
            {member.name}
          </h3>
          <p className="text-sm text-accent-fg mt-0.5 truncate">
            {member.role}
          </p>
          <p className="text-xs text-muted mt-0.5 truncate">
            {member.institution}
          </p>
        </div>
      </div>

      <p className="text-sm text-muted-fg leading-relaxed line-clamp-3 mb-4">
        {member.bio}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {member.expertise.map((skill) => (
          <Badge key={skill} variant="muted" size="sm">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-border-subtle flex items-center gap-2">
        {member.github && (
          <a
            href={`https://github.com/${member.github}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} GitHub`}
            className="p-1.5 rounded-md text-muted hover:text-foreground hover:bg-surface-raised transition-colors"
          >
            <GitBranch className="w-4 h-4" />
          </a>
        )}
        {/* {member.linkedin && (
          <a
            href={`https://linkedin.com/in/${member.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} LinkedIn`}
            className="p-1.5 rounded-md text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-raised)] transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        )} */}
        {member.scholar && (
          <a
            href={`https://scholar.google.com/citations?user=${member.scholar}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} Google Scholar`}
            className="p-1.5 rounded-md text-muted hover:text-foreground hover:bg-surface-raised transition-colors"
          >
            <BookOpen className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

const founders = members.filter((m) => m.type === "founder");
const core = members.filter((m) => m.type === "core");
const collaborators = members.filter((m) => m.type === "collaborator");

export default function MembersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="border-b border-border bg-surface">
        <div className="page-container pt-28 pb-14">
          <SectionHeader
            align="left"
            eyebrow="The Team"
            title="Who We Are"
            description="Researchers, engineers, and community builders working to build Pakistan's ML data infrastructure — openly and collaboratively."
          />
        </div>
      </div>

      {/* Mission */}
      <section className="section-py">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
              Our Mission
            </p>
            <blockquote className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight leading-snug text-balance mb-6">
              &quot;To democratize machine learning in Pakistan by providing the
              data infrastructure, research tools, and community support that
              researchers need.&quot;
            </blockquote>
            <p className="text-muted-fg leading-relaxed">
              H2Vec was founded in 2022 by researchers frustrated with the lack
              of quality, open datasets for Pakistani languages and domains.
              Today, we are a distributed team of 50+ researchers, engineers,
              and educators working across 8 cities.
            </p>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="section-py bg-surface border-t border-border">
        <div className="page-container">
          <SectionHeader
            align="left"
            eyebrow="Leadership"
            title="Founders"
            className="mb-10"
          />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {founders.map((member, i) => (
              <MemberCard key={member.id} member={member} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section className="section-py border-t border-border">
        <div className="page-container">
          <SectionHeader
            align="left"
            eyebrow="Core Team"
            title="Research & Engineering"
            className="mb-10"
          />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {core.map((member, i) => (
              <MemberCard key={member.id} member={member} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Collaborators */}
      <section className="section-py bg-surface border-t border-border">
        <div className="page-container">
          <SectionHeader
            align="left"
            eyebrow="Network"
            title="Collaborators"
            description="Academic and institutional partners contributing research and expertise."
            className="mb-10"
          />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {collaborators.map((member, i) => (
              <MemberCard key={member.id} member={member} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="section-py border-t border-border">
        <div className="page-container">
          <div className="card-static rounded-2xl p-10 md:p-14 text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
              Open Positions
            </p>
            <h2 className="text-3xl font-semibold text-foreground tracking-tight mb-4 text-balance">
              Join the H2Vec Team
            </h2>
            <p className="text-muted-fg leading-relaxed mb-8">
              We&apos;re always looking for researchers, engineers, and
              community builders passionate about advancing ML in Pakistan. All
              positions are open to remote contributors.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/outreach"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors"
              >
                Get Involved
                <ExternalLink className="w-4 h-4" />
              </Link>
              <a
                href={`mailto:hello@h2vec.pk`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-surface hover:border-muted transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
