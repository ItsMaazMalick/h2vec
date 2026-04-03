"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Building2, GraduationCap, Landmark, Briefcase } from "lucide-react";

// Category icon mapping
const categoryIcons: Record<
  string,
  { icon: typeof Building2; gradient: string }
> = {
  University: {
    icon: GraduationCap,
    gradient: "from-violet-500 to-purple-600",
  },
  Government: { icon: Landmark, gradient: "from-cyan-500 to-blue-600" },
  Healthcare: { icon: Building2, gradient: "from-rose-500 to-pink-600" },
  Industry: { icon: Briefcase, gradient: "from-amber-500 to-orange-600" },
};

const partners = [
  { name: "LUMS", category: "University" },
  { name: "NUST", category: "University" },
  { name: "IBA Karachi", category: "University" },
  { name: "COMSATS", category: "University" },
  { name: "UET Lahore", category: "University" },
  { name: "PARC", category: "Government" },
  { name: "SUPARCO", category: "Government" },
  { name: "PITB", category: "Government" },
  { name: "Aga Khan Univ.", category: "Healthcare" },
  { name: "NHSRC", category: "Healthcare" },
  { name: "i2i Ventures", category: "Industry" },
  { name: "Arbisoft", category: "Industry" },
];

export function Partners() {
  return (
    <section className="py-24 bg-surface/40 border-t border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-violet-500/5 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="w-full max-w-7xl mx-auto px-6 relative">
        <SectionHeader
          eyebrow="Trusted By"
          title="Partners & Collaborators"
          description="Working with Pakistan's leading universities, government agencies, and institutions."
          className="mb-14"
        />

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5">
          {partners.map((partner, i) => {
            const catInfo =
              categoryIcons[partner.category] || categoryIcons.University;
            const CatIcon = catInfo.icon;

            return (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="group relative bg-surface/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 hover:border-violet-500/50 transition-all duration-700 hover:-translate-y-2 hover:shadow-xl hover:shadow-violet-500/10 cursor-default overflow-hidden"
              >
                {/* Persistent gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5 transition-opacity" />

                <div className="relative">
                  {/* Icon with gradient */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${catInfo.gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl`}
                  >
                    <CatIcon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  {/* Icon glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${catInfo.gradient} rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity`}
                  />
                </div>

                {/* Name */}
                <span className="text-xs font-semibold text-foreground leading-tight group-hover:text-violet-300 transition-colors">
                  {partner.name}
                </span>

                {/* Category badge */}
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gradient-to-r ${catInfo.gradient} text-white text-[9px] font-semibold shadow-lg`}
                >
                  {partner.category}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
