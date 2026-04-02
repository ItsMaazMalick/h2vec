"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin, Users } from "lucide-react";
import { outreachEvents, programs } from "@/data/outreach";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function OutreachHighlights() {
  const upcoming = outreachEvents
    .filter((e) => e.status === "upcoming")
    .slice(0, 3);

  return (
    <section className="section-padding border-t border-[var(--border)]">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Events */}
          <div>
            <SectionHeader
              align="left"
              eyebrow="Community"
              title="Upcoming Events"
              description="Workshops, hackathons, and seminars across Pakistan."
              className="mb-10"
            />

            <div className="flex flex-col gap-4">
              {upcoming.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="card-base card-hover p-5 rounded-xl flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--accent-subtle)] flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-semibold text-[var(--accent)]">
                      {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                    </span>
                    <span className="text-lg font-bold text-[var(--accent)] leading-none">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="accent" size="sm">{event.type}</Badge>
                    </div>
                    <h3 className="font-medium text-[var(--foreground)] text-sm leading-snug mb-1.5 line-clamp-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.city}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {event.registered}/{event.capacity}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/outreach"
              className="mt-6 inline-flex items-center gap-1.5 text-sm text-[var(--accent)] hover:underline"
            >
              All events
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Programs */}
          <div>
            <SectionHeader
              align="left"
              eyebrow="Initiatives"
              title="Programs & Impact"
              description="Long-running initiatives building Pakistan's ML community."
              className="mb-10"
            />

            <div className="flex flex-col gap-3">
              {programs.map((program, i) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="card-base p-5 rounded-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--teal-subtle)] flex items-center justify-center flex-shrink-0">
                      <span className="text-[var(--teal)] text-lg">
                        {program.icon === "award" ? "🏆" : program.icon === "graduation-cap" ? "🎓" : program.icon === "database" ? "🗄️" : "👥"}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-[var(--foreground)] text-sm">{program.title}</h3>
                        {program.active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        )}
                      </div>
                      <p className="text-xs text-[var(--muted-fg)] leading-relaxed mb-2 line-clamp-2">
                        {program.description}
                      </p>
                      <p className="text-xs text-[var(--teal)] font-medium">{program.impact}</p>
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
