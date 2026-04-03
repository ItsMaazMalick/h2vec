"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  GitBranch,
  BookOpen,
  ExternalLink,
  Sparkles,
  Crown,
  Users,
  Network,
  MapPin,
} from "lucide-react";
import { members } from "@/data/members";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Member } from "@/data/members";

// Expertise color mapping
const expertiseColors: Record<
  string,
  "violet" | "cyan" | "amber" | "emerald" | "rose"
> = {
  "Natural Language Processing": "violet",
  "Machine Learning": "cyan",
  "Low-Resource Languages": "amber",
  "Urdu NLP": "violet",
  MLOps: "emerald",
  "Data Engineering": "cyan",
  "Platform Engineering": "emerald",
  "Time Series": "amber",
  "Climate AI": "emerald",
  "Deep Learning": "rose",
};

function ExpertiseBadge({ skill }: { skill: string }) {
  const color = expertiseColors[skill] || "violet";
  const variants = {
    violet:
      "bg-violet-500/10 text-violet-300 border-violet-500/20 hover:bg-violet-500/20",
    cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20 hover:bg-cyan-500/20",
    amber:
      "bg-amber-500/10 text-amber-300 border-amber-500/20 hover:bg-amber-500/20",
    emerald:
      "bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20",
    rose: "bg-rose-500/10 text-rose-300 border-rose-500/20 hover:bg-rose-500/20",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border transition-all duration-300 ${variants[color]}`}
    >
      {skill}
    </span>
  );
}

function MemberCard({ member, i }: { member: Member; i: number }) {
  const typeBadges = {
    founder: (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
        <Crown className="w-3 h-3" />
        Founder
      </span>
    ),
    core: (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold">
        <Users className="w-3 h-3" />
        Core Team
      </span>
    ),
    collaborator: (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
        <Network className="w-3 h-3" />
        Collaborator
      </span>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08, duration: 0.5 }}
      className="group relative bg-surface/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-violet-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-violet-500/10 overflow-hidden"
    >
      {/* Persistent gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5 transition-opacity duration-500" />
      {/* Corner glow */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-violet-500/15 rounded-full blur-3xl" />

      <div className="relative">
        <div className="flex items-start gap-4 mb-5">
          <div className="relative shrink-0">
            <Avatar name={member.name} size="lg" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-bold text-foreground leading-snug group-hover:text-violet-300 transition-colors line-clamp-2">
                {member.name}
              </h3>
              <div className="shrink-0 ml-2">{typeBadges[member.type]}</div>
            </div>
            <p className="text-sm text-violet-300 font-medium">{member.role}</p>
            <p className="flex items-center gap-1.5 text-xs text-muted mt-1">
              <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="truncate">{member.institution}</span>
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-fg leading-relaxed line-clamp-3 mb-5">
          {member.bio}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {member.expertise.map((skill) => (
            <ExpertiseBadge key={skill} skill={skill} />
          ))}
        </div>

        <div className="flex items-center gap-2 pt-5 border-t border-white/5">
          {member.github && (
            <a
              href={`https://github.com/${member.github}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} GitHub`}
              className="p-2.5 rounded-lg text-muted-fg hover:text-violet-300 hover:bg-violet-500/10 border border-transparent hover:border-violet-500/30 transition-all"
            >
              <GitBranch className="w-4 h-4" />
            </a>
          )}
          {member.scholar && (
            <a
              href={`https://scholar.google.com/citations?user=${member.scholar}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} Google Scholar`}
              className="p-2.5 rounded-lg text-muted-fg hover:text-cyan-300 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30 transition-all"
            >
              <BookOpen className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const founders = members.filter((m) => m.type === "founder");
const core = members.filter((m) => m.type === "core");
const collaborators = members.filter((m) => m.type === "collaborator");

export default function MembersPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-violet-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero */}
      <div className="border-b border-white/5 bg-surface/40 backdrop-blur-sm relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
        <div className="page-container pt-28 pb-14 relative">
          <SectionHeader
            align="left"
            eyebrow="The Team"
            title="Who We Are"
            description="Researchers, engineers, and community builders working to build Pakistan's ML data infrastructure — openly and collaboratively."
          />
        </div>
      </div>

      {/* Mission */}
      <section className="section-py relative">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold tracking-widest uppercase text-violet-400 mb-5 flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Our Mission
            </p>
            <blockquote className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-snug text-balance mb-6">
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
      <section className="section-py bg-surface/40 border-t border-white/5 relative">
        <div className="page-container relative">
          <SectionHeader
            align="left"
            eyebrow="Leadership"
            title="Founders"
            className="mb-10"
          />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {founders.map((member, i) => (
              <MemberCard key={member.id} member={member} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section className="section-py border-t border-white/5 relative">
        <div className="page-container relative">
          <SectionHeader
            align="left"
            eyebrow="Core Team"
            title="Research & Engineering"
            className="mb-10"
          />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {core.map((member, i) => (
              <MemberCard key={member.id} member={member} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Collaborators */}
      <section className="section-py bg-surface/40 border-t border-white/5 relative">
        <div className="page-container relative">
          <SectionHeader
            align="left"
            eyebrow="Network"
            title="Collaborators"
            description="Academic and institutional partners contributing research and expertise."
            className="mb-10"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collaborators.map((member, i) => (
              <MemberCard key={member.id} member={member} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="section-py border-t border-white/5 relative">
        <div className="page-container relative">
          <div className="relative bg-surface/40 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-14 text-center max-w-2xl mx-auto overflow-hidden hover:border-violet-500/30 transition-all duration-500">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl" />

            <div className="relative">
              <p className="text-xs font-semibold tracking-widest uppercase text-violet-400 mb-4 flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Open Positions
              </p>
              <h2 className="text-3xl font-bold text-foreground tracking-tight mb-4 text-balance">
                Join the H2Vec Team
              </h2>
              <p className="text-muted-fg leading-relaxed mb-8">
                We&apos;re always looking for researchers, engineers, and
                community builders passionate about advancing ML in Pakistan.
                All positions are open to remote contributors.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/outreach"
                  className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium text-sm transition-all duration-500 hover:-translate-y-0.5 overflow-hidden shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="relative">Get Involved</span>
                  <ExternalLink className="w-4 h-4 relative" />
                </Link>
                <a
                  href={`mailto:hello@h2vec.pk`}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground font-medium text-sm hover:border-violet-500/40 hover:bg-violet-500/5 transition-all duration-500 hover:-translate-y-0.5"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
