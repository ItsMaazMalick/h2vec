"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Database,
  GitBranch,
  Users,
  Building2,
  Download,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const statIcons = [
  { icon: Database, color: "from-violet-500 to-purple-600" },
  { icon: Users, color: "from-cyan-400 to-blue-500" },
  { icon: Building2, color: "from-amber-400 to-orange-500" },
  { icon: Download, color: "from-emerald-400 to-teal-500" },
];

export function Hero() {
  return (
    <section className="relative min-h-svh flex items-center overflow-hidden bg-background">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary violet glow - top center */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full blur-[120px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)",
          }}
        />
        {/* Cyan glow - top right */}
        <div
          className="absolute top-20 right-0 w-[600px] h-[500px] rounded-full blur-[100px] pointer-events-none opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
          }}
        />
        {/* Purple glow - bottom left */}
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full blur-[100px] pointer-events-none opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)",
          }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 relative pt-32 pb-28">
        <div className="max-w-4xl">
          {/* Eyebrow badge with glow */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/5 backdrop-blur-xl text-xs font-medium text-violet-300 mb-8 shadow-lg shadow-violet-500/10"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
            Pakistan&apos;s Open ML Ecosystem
          </motion.div>

          {/* Headline with vibrant gradient */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-foreground text-balance"
          >
            Building Pakistan&apos;s{" "}
            <span className="bg-linear-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
              ML Data
            </span>
            <br />
            Infrastructure
          </motion.h1>

          {/* Subheading */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 text-lg md:text-xl text-muted-fg max-w-2xl leading-relaxed"
          >
            H2Vec centralizes open datasets, research publications, and
            community tools to accelerate machine learning across Pakistan —
            from Karachi to Gilgit.
          </motion.p>

          {/* CTAs with enhanced effects */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/datasets"
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-linear-to-r from-violet-600 to-purple-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-purple-500 transition-all duration-300 shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-400 to-purple-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
              <Database className="w-4 h-4 relative" />
              <span className="relative">Explore Datasets</span>
            </Link>
            <Link
              href="/outreach"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border/50 bg-surface/30 backdrop-blur-sm text-foreground text-sm font-medium hover:border-violet-500/50 hover:bg-violet-500/5 transition-all duration-300 hover:-translate-y-0.5"
            >
              Join Community
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Meta row */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-14 flex flex-wrap items-center gap-6 text-sm text-muted"
          >
            <span className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-violet-400" />
              Open Source
            </span>
            <span className="w-px h-4 bg-border" />
            <span className="flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              240+ Datasets
            </span>
            <span className="w-px h-4 bg-border" />
            <span>CC-Licensed for Research</span>
          </motion.div>
        </div>

        {/* Stats strip with glassmorphism */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl"
        >
          {[
            { value: "240+", label: "Datasets" },
            { value: "580+", label: "Researchers" },
            { value: "38", label: "Institutions" },
            { value: "1.2M+", label: "Downloads" },
          ].map((stat, i) => {
            const Icon = statIcons[i].icon;
            const gradient = statIcons[i].color;
            return (
              <div
                key={stat.label}
                className="group relative rounded-2xl p-6 bg-surface/50 backdrop-blur-xl border border-border/50 overflow-hidden hover:border-violet-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/10"
              >
                {/* Animated gradient glow on hover */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`}
                />

                {/* Icon badge with gradient and glow */}
                <div className="relative mb-4">
                  <div
                    className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-linear-to-br ${gradient} shadow-lg`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  {/* Icon glow */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${gradient} rounded-xl blur-lg opacity-40`}
                  />
                </div>

                {/* Value */}
                <div className="text-3xl font-bold text-foreground tracking-tight">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-xs font-semibold text-muted-fg mt-2 uppercase tracking-wider">
                  {stat.label}
                </div>

                {/* Bottom gradient line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
