"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Database, GitBranch } from "lucide-react";

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function Hero() {
  return (
    <section className="relative min-h-svh flex items-center overflow-hidden bg-background">
      {/* Dot-grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, #2D3748 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Indigo glow */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)" }}
      />
      {/* Teal glow */}
      <div
        aria-hidden
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(45,212,191,0.07) 0%, transparent 70%)" }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 relative pt-28 pb-24">
        <div className="max-w-4xl">

          {/* Eyebrow */}
          <motion.div
            custom={0} initial="hidden" animate="visible" variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface text-xs font-medium text-muted-fg mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            Pakistan&apos;s Open ML Ecosystem
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1} initial="hidden" animate="visible" variants={fadeUp}
            className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.08] text-foreground text-balance"
          >
            Building Pakistan&apos;s{" "}
            <span
              className="bg-linear-to-r from-accent via-indigo-400 to-teal bg-clip-text text-transparent"
            >
              ML Data
            </span>
            <br />Infrastructure
          </motion.h1>

          {/* Subheading */}
          <motion.p
            custom={2} initial="hidden" animate="visible" variants={fadeUp}
            className="mt-6 text-lg md:text-xl text-muted-fg max-w-2xl leading-relaxed"
          >
            H2Vec centralizes open datasets, research publications, and community
            tools to accelerate machine learning across Pakistan — from Karachi to Gilgit.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3} initial="hidden" animate="visible" variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/datasets"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors"
            >
              <Database className="w-4 h-4" />
              Explore Datasets
            </Link>
            <Link
              href="/outreach"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground text-sm font-medium hover:border-muted hover:bg-white/5 transition-colors"
            >
              Join Community
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Meta row */}
          <motion.div
            custom={4} initial="hidden" animate="visible" variants={fadeUp}
            className="mt-14 flex flex-wrap items-center gap-6 text-sm text-muted"
          >
            <span className="flex items-center gap-2"><GitBranch className="w-4 h-4" />Open Source</span>
            <span className="w-px h-4 bg-border" />
            <span className="flex items-center gap-2"><Database className="w-4 h-4" />240+ Datasets</span>
            <span className="w-px h-4 bg-border" />
            <span>CC-Licensed for Research</span>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          custom={5} initial="hidden" animate="visible" variants={fadeUp}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl"
        >
          {[
            { value: "240+",  label: "Datasets" },
            { value: "580+",  label: "Researchers" },
            { value: "38",    label: "Institutions" },
            { value: "1.2M+", label: "Downloads" },
          ].map((stat) => (
            <div key={stat.label} className="bg-surface border border-border rounded-xl p-4">
              <div className="text-2xl font-semibold text-foreground tracking-tight">{stat.value}</div>
              <div className="text-xs text-muted-fg mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
