"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Users,
  Sparkles,
  Calendar,
  TrendingUp,
  Clock,
  Target,
  Award,
} from "lucide-react";
import { outreachEvents, programs } from "@/data/outreach";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";

// Event type icon mapping
const eventTypeIcons: Record<
  string,
  { icon: typeof Calendar; gradient: string }
> = {
  Workshop: { icon: Calendar, gradient: "from-violet-500 to-purple-600" },
  Hackathon: { icon: Target, gradient: "from-cyan-500 to-blue-600" },
  Seminar: { icon: Users, gradient: "from-amber-500 to-orange-600" },
  Bootcamp: { icon: Sparkles, gradient: "from-emerald-500 to-teal-600" },
  Conference: { icon: Award, gradient: "from-rose-500 to-pink-600" },
};

// Program type icon mapping
const programTypeIcons: Record<
  string,
  { icon: typeof Target; gradient: string }
> = {
  Education: { icon: Calendar, gradient: "from-cyan-500 to-blue-600" },
  "Research Grant": { icon: Award, gradient: "from-violet-500 to-purple-600" },
  Mentorship: { icon: Users, gradient: "from-emerald-500 to-teal-600" },
  Community: { icon: Sparkles, gradient: "from-amber-500 to-orange-600" },
};

export function OutreachHighlights() {
  const upcoming = outreachEvents
    .filter((e) => e.status === "upcoming")
    .slice(0, 3);

  return (
    <section className="py-24 border-t border-white/5 bg-background relative overflow-hidden">
      {/* Background glow */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute bottom-0 left-0 w-[700px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="w-full max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Upcoming Events */}
          <div>
            <SectionHeader
              align="left"
              eyebrow="Community"
              title="Upcoming Events"
              description="Workshops, hackathons, and seminars across Pakistan."
              className="mb-10"
            />

            <div className="flex flex-col gap-5">
              {upcoming.map((event, i) => {
                const typeInfo =
                  eventTypeIcons[event.type] || eventTypeIcons.Workshop;
                const TypeIcon = typeInfo.icon;

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="group relative bg-surface/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-violet-500/50 transition-all duration-700 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10"
                  >
                    {/* Persistent gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent transition-opacity rounded-2xl" />

                    <div className="relative flex gap-5">
                      {/* Date badge */}
                      <div className="shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex flex-col items-center justify-center text-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl shadow-violet-500/10">
                        <span className="text-[10px] font-semibold text-violet-300 uppercase">
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "short",
                          })}
                        </span>
                        <span className="text-2xl font-bold text-violet-400 leading-none">
                          {new Date(event.date).getDate()}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Event type badge */}
                        <div className="mb-2">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r ${typeInfo.gradient} text-white text-xs font-semibold shadow-lg`}
                          >
                            <TypeIcon className="w-3 h-3" />
                            {event.type}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-semibold text-foreground text-sm leading-snug mb-2 line-clamp-2 group-hover:text-violet-300 transition-colors">
                          {event.title}
                        </h3>

                        {/* Location + Capacity */}
                        <div className="flex items-center gap-4 text-xs text-muted">
                          <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5">
                            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                            {event.city}
                          </span>
                          <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5">
                            <Users className="w-3.5 h-3.5 text-violet-400" />
                            {event.registered}/{event.capacity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <Link
              href="/outreach"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300 transition-all group"
            >
              All events{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

            <div className="flex flex-col gap-5">
              {programs.map((program, i) => {
                const typeInfo =
                  programTypeIcons[program.type] || programTypeIcons.Community;
                const TypeIcon = typeInfo.icon;

                return (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="group relative bg-surface/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-700 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10"
                  >
                    {/* Persistent gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent transition-opacity rounded-2xl" />

                    <div className="relative flex items-start gap-5">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 text-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl shadow-cyan-500/10">
                        {program.icon === "award"
                          ? "🏆"
                          : program.icon === "graduation-cap"
                            ? "🎓"
                            : program.icon === "database"
                              ? "🗄️"
                              : "👥"}
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Program type badge + Active indicator */}
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r ${typeInfo.gradient} text-white text-xs font-semibold shadow-lg`}
                          >
                            <TypeIcon className="w-3 h-3" />
                            {program.type}
                          </span>
                          {program.active && (
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50 animate-pulse" />
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="font-semibold text-foreground text-sm group-hover:text-cyan-300 transition-colors mb-2">
                          {program.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-muted-fg leading-relaxed line-clamp-2 mb-2">
                          {program.description}
                        </p>

                        {/* Impact */}
                        <p className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
                          <TrendingUp className="w-3 h-3" />
                          {program.impact}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
