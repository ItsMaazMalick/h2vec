"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Users } from "lucide-react";
import { outreachEvents, programs } from "@/data/outreach";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatDate } from "@/lib/utils";

export function OutreachHighlights() {
  const upcoming = outreachEvents.filter((e) => e.status === "upcoming").slice(0, 3);

  return (
    <section className="py-20 border-t border-border bg-background">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* Upcoming Events */}
          <div>
            <SectionHeader align="left" eyebrow="Community" title="Upcoming Events"
              description="Workshops, hackathons, and seminars across Pakistan." className="mb-10" />

            <div className="flex flex-col gap-3">
              {upcoming.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="bg-surface border border-border rounded-xl p-5 flex gap-4 hover:border-accent transition-colors"
                >
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-semibold text-accent uppercase">
                      {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                    </span>
                    <span className="text-lg font-bold text-accent leading-none">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="accent" size="sm">{event.type}</Badge>
                    </div>
                    <h3 className="font-medium text-foreground text-sm leading-snug mb-1.5 line-clamp-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.city}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{event.registered}/{event.capacity}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href="/outreach" className="mt-6 inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
              All events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Programs */}
          <div>
            <SectionHeader align="left" eyebrow="Initiatives" title="Programs & Impact"
              description="Long-running initiatives building Pakistan's ML community." className="mb-10" />

            <div className="flex flex-col gap-3">
              {programs.map((program, i) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="bg-surface border border-border rounded-xl p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center shrink-0 text-lg">
                      {program.icon === "award" ? "🏆" : program.icon === "graduation-cap" ? "🎓" : program.icon === "database" ? "🗄️" : "👥"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground text-sm">{program.title}</h3>
                        {program.active && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                      </div>
                      <p className="text-xs text-muted-fg leading-relaxed line-clamp-2 mb-1.5">
                        {program.description}
                      </p>
                      <p className="text-xs text-teal font-medium">{program.impact}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
