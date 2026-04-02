"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

const partners = [
  { name: "LUMS", category: "University" },
  { name: "NUST", category: "University" },
  { name: "IBA Karachi", category: "University" },
  { name: "COMSATS", category: "University" },
  { name: "UET Lahore", category: "University" },
  { name: "PARC", category: "Government" },
  { name: "SUPARCO", category: "Government" },
  { name: "PITB", category: "Government" },
  { name: "Aga Khan University", category: "Healthcare" },
  { name: "NHSRC", category: "Healthcare" },
  { name: "i2i Ventures", category: "Industry" },
  { name: "Arbisoft", category: "Industry" },
];

export function Partners() {
  return (
    <section className="section-padding bg-[var(--surface)] border-t border-[var(--border)]">
      <div className="container-page">
        <SectionHeader
          eyebrow="Trusted By"
          title="Partners & Collaborators"
          description="Working with Pakistan's leading universities, government agencies, and institutions."
          className="mb-14"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3"
        >
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className="card-base rounded-xl p-4 flex flex-col items-center justify-center text-center gap-1.5 hover:border-[var(--muted)] transition-colors cursor-default"
            >
              <div className="w-8 h-8 rounded-md bg-[var(--surface-raised)] flex items-center justify-center text-sm font-bold text-[var(--accent)]">
                {partner.name.slice(0, 2)}
              </div>
              <span className="text-xs font-medium text-[var(--foreground)] leading-tight">
                {partner.name}
              </span>
              <span className="text-[10px] text-[var(--muted)] leading-none">
                {partner.category}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
