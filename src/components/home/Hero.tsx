"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Database, GitBranch } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  return (
    <section className="relative min-h-[92svh] flex items-center overflow-hidden">
      {/* Ambient background */}
      <div
        aria-hidden
        className="absolute inset-0 grid-dots opacity-30 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[var(--accent)] opacity-[0.06] rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[var(--teal)] opacity-[0.04] rounded-full blur-3xl pointer-events-none"
      />

      <div className="container-page relative pt-24 pb-20">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            // variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs font-medium text-[var(--muted-fg)] mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] animate-pulse" />
            Pakistan&apos;s Open ML Ecosystem
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            // variants={fadeUp}
            className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-balance leading-[1.1]"
          >
            Building Pakistan&apos;s{" "}
            <span className="gradient-text-accent">ML Data</span>
            <br />
            Infrastructure
          </motion.h1>

          {/* Sub */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            // variants={fadeUp}
            className="mt-6 text-lg md:text-xl text-[var(--muted-fg)] max-w-2xl leading-relaxed text-balance"
          >
            H2Vec centralizes open datasets, research publications, and
            community tools to accelerate machine learning across Pakistan —
            from Karachi to Gilgit.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            // variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/datasets"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition-colors duration-150 text-sm"
            >
              <Database className="w-4 h-4" />
              Explore Datasets
            </Link>
            <Link
              href="/outreach"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--foreground)] font-medium hover:bg-[var(--surface)] hover:border-[var(--muted)] transition-colors duration-150 text-sm"
            >
              Join Community
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            // variants={fadeUp}
            className="mt-14 flex flex-wrap items-center gap-6 text-sm text-[var(--muted)]"
          >
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4" />
              <span>Open Source</span>
            </div>
            <div className="w-px h-4 bg-[var(--border)]" />
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span>240+ Datasets</span>
            </div>
            <div className="w-px h-4 bg-[var(--border)]" />
            <span>CC-Licensed for Research</span>
          </motion.div>
        </div>

        {/* Floating Stats Cards */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          // variants={fadeUp}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl"
        >
          {[
            { value: "240+", label: "Datasets" },
            { value: "580+", label: "Researchers" },
            { value: "38", label: "Institutions" },
            { value: "1.2M+", label: "Downloads" },
          ].map((stat) => (
            <div key={stat.label} className="card-base p-4 rounded-xl">
              <div className="text-2xl font-semibold text-[var(--foreground)] tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-[var(--muted-fg)] mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
