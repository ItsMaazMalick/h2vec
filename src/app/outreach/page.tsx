"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Users,
  CheckCircle,
  Send,
  ChevronRight,
  Calendar,
  Target,
  Award,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { outreachEvents, programs } from "@/data/outreach";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { EventStatus } from "@/data/outreach";

type FormStep = 1 | 2 | 3;

const eventStatusVariant: Record<EventStatus, "success" | "accent" | "muted"> =
  {
    upcoming: "success",
    ongoing: "accent",
    past: "muted",
  };

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

export default function OutreachPage() {
  const [activeStatus, setActiveStatus] = useState<EventStatus | "All">("All");
  const [formStep, setFormStep] = useState<FormStep>(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    role: "",
    city: "",
    interest: "",
  });
  const [formLoading, setFormLoading] = useState(false);

  const filteredEvents =
    activeStatus === "All"
      ? outreachEvents
      : outreachEvents.filter((e) => e.status === activeStatus);

  function handleInput(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setFormLoading(false);
    setFormSubmitted(true);
  }

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
            eyebrow="Community"
            title="Outreach & Events"
            description="Workshops, hackathons, school visits, and community programs driving AI education across Pakistan."
          />
        </div>
      </div>

      {/* Programs */}
      <section className="section-py relative">
        <div className="page-container relative">
          <SectionHeader
            eyebrow="Initiatives"
            title="Active Programs"
            description="Long-running programs with measurable community impact."
            className="mb-12"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, i) => {
              const typeInfo =
                programTypeIcons[program.type] || programTypeIcons.Community;
              const TypeIcon = typeInfo.icon;

              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group relative bg-surface/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-700 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10 overflow-hidden"
                >
                  {/* Persistent gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent" />

                  <div className="relative">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 flex items-center justify-center text-xl mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl shadow-cyan-500/10">
                      {program.icon === "award"
                        ? "🏆"
                        : program.icon === "graduation-cap"
                          ? "🎓"
                          : program.icon === "database"
                            ? "🗄️"
                            : "👥"}
                    </div>

                    {/* Program type badge + Active indicator */}
                    <div className="flex items-center gap-2 mb-3">
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
                    <h3 className="font-semibold text-foreground text-sm leading-snug mb-2 group-hover:text-cyan-300 transition-colors">
                      {program.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-muted-fg leading-relaxed mb-4">
                      {program.description}
                    </p>

                    {/* Impact + Beneficiaries */}
                    <div className="pt-5 border-t border-white/5 space-y-3">
                      <p className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
                        <TrendingUp className="w-3 h-3" />
                        {program.impact}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted">
                        <Users className="w-3.5 h-3.5 text-violet-400" />
                        <span>
                          {program.beneficiaries.toLocaleString()} beneficiaries
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="section-py bg-surface/40 border-t border-white/5 relative">
        <div className="page-container relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <SectionHeader
              align="left"
              eyebrow="Events"
              title="Workshops & Programs"
            />
            {/* Filter tabs */}
            <div className="flex items-center gap-1 bg-surface-raised border border-white/10 rounded-xl p-1.5 self-start">
              {(["All", "upcoming", "past"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-xs font-medium transition-all capitalize",
                    activeStatus === status
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                      : "text-muted-fg hover:text-foreground hover:bg-white/5",
                  )}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, i) => {
                const typeInfo =
                  eventTypeIcons[event.type] || eventTypeIcons.Workshop;
                const TypeIcon = typeInfo.icon;

                return (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className={cn(
                      "group relative bg-surface/40 backdrop-blur-sm border border-white/10 rounded-3xl p-7 hover:border-violet-500/50 transition-all duration-700 hover:-translate-y-2 hover:shadow-3xl hover:shadow-violet-500/15 overflow-hidden",
                      event.status === "past" && "opacity-60",
                    )}
                  >
                    {/* Persistent gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent" />
                    {/* Corner glow */}
                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-violet-500/15 rounded-full blur-3xl" />

                    <div className="relative">
                      {/* Top: Event type + Status badges */}
                      <div className="flex items-start justify-between gap-2 mb-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r ${typeInfo.gradient} text-white text-xs font-semibold shadow-lg`}
                        >
                          <TypeIcon className="w-3 h-3" />
                          {event.type}
                        </span>
                        <Badge
                          variant={eventStatusVariant[event.status]}
                          size="sm"
                        >
                          {event.status}
                        </Badge>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-xl text-foreground leading-snug mb-3 group-hover:text-violet-300 transition-colors">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-fg leading-relaxed line-clamp-3 mb-5">
                        {event.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {event.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border border-white/10 bg-white/5 text-muted-fg"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Event details */}
                      <div className="pt-5 border-t border-white/5 space-y-3">
                        <div className="flex items-center gap-2 text-xs text-muted">
                          <CalendarDays className="w-3.5 h-3.5 text-violet-400" />
                          <span className="font-medium text-foreground">
                            {formatDate(event.date)}
                            {event.endDate
                              ? ` – ${formatDate(event.endDate)}`
                              : ""}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="font-medium text-foreground">
                            {event.location}, {event.city}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-muted">
                            <Users className="w-3.5 h-3.5 text-violet-400" />
                            <span className="font-medium text-foreground">
                              {event.registered}/{event.capacity} registered
                            </span>
                          </div>
                          {event.registrationOpen && (
                            <button
                              onClick={() =>
                                document
                                  .getElementById("register-form")
                                  ?.scrollIntoView({ behavior: "smooth" })
                              }
                              className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                            >
                              Register →
                            </button>
                          )}
                        </div>
                        {/* Capacity bar */}
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500"
                            style={{
                              width: `${Math.min((event.registered / event.capacity) * 100, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Registration Form */}
      <section
        id="register-form"
        className="section-py border-t border-white/5 relative"
      >
        <div className="page-container relative">
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              eyebrow="Join Outreach"
              title="Register Your Interest"
              description="Tell us about yourself and we'll match you with the most relevant events, workshops, and programs."
              className="mb-10"
            />

            <div className="relative bg-surface/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden hover:border-violet-500/30 transition-all duration-500">
              {/* Persistent gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5" />
              {/* Corner glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl" />

              <div className="relative">
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Registration received!
                    </h3>
                    <p className="text-muted-fg text-sm">
                      We&apos;ll reach out to you within 48 hours with relevant
                      opportunities.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Step indicator */}
                    <div className="flex items-center gap-2 mb-6">
                      {([1, 2, 3] as FormStep[]).map((step) => (
                        <div key={step} className="flex items-center gap-2">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all",
                              formStep >= step
                                ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                                : "bg-white/5 border border-white/10 text-muted",
                            )}
                          >
                            {step}
                          </div>
                          {step < 3 && (
                            <div
                              className={cn(
                                "w-12 h-0.5 transition-all",
                                formStep > step
                                  ? "bg-gradient-to-r from-violet-600 to-purple-600"
                                  : "bg-white/10",
                              )}
                            />
                          )}
                        </div>
                      ))}
                      <span className="ml-3 text-xs text-muted-fg font-medium">
                        Step {formStep} of 3
                      </span>
                    </div>

                    {formStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                      >
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-muted-fg mb-1.5">
                              Full Name *
                            </label>
                            <input
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleInput}
                              placeholder="Dr. Jane Doe"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-white/10 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-violet-500/50 transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-muted-fg mb-1.5">
                              Email Address *
                            </label>
                            <input
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleInput}
                              placeholder="jane@university.edu.pk"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-white/10 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-violet-500/50 transition-colors"
                            />
                          </div>
                        </div>
                        <Button
                          type="button"
                          onClick={() => setFormStep(2)}
                          disabled={!formData.name || !formData.email}
                          className="w-full gap-2"
                        >
                          Continue
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    )}

                    {formStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                      >
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-muted-fg mb-1.5">
                              Institution / Organization
                            </label>
                            <input
                              name="institution"
                              value={formData.institution}
                              onChange={handleInput}
                              placeholder="LUMS / Google / Independent"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-white/10 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-violet-500/50 transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-muted-fg mb-1.5">
                              Role
                            </label>
                            <select
                              name="role"
                              value={formData.role}
                              onChange={handleInput}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-white/10 text-sm text-foreground focus:outline-none focus:border-violet-500/50 transition-colors"
                            >
                              <option value="">Select role</option>
                              <option>Undergraduate Student</option>
                              <option>Graduate Student</option>
                              <option>Researcher / Faculty</option>
                              <option>Industry Professional</option>
                              <option>Independent</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-muted-fg mb-1.5">
                            City
                          </label>
                          <input
                            name="city"
                            value={formData.city}
                            onChange={handleInput}
                            placeholder="Karachi, Lahore, Islamabad..."
                            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-white/10 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-violet-500/50 transition-colors"
                          />
                        </div>
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setFormStep(1)}
                            className="flex-1"
                          >
                            Back
                          </Button>
                          <Button
                            type="button"
                            onClick={() => setFormStep(3)}
                            className="flex-1 gap-2"
                          >
                            Continue
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {formStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-xs font-medium text-muted-fg mb-1.5">
                            Area of Interest
                          </label>
                          <textarea
                            name="interest"
                            value={formData.interest}
                            onChange={handleInput}
                            rows={4}
                            placeholder="Tell us about your ML interests, what you're working on, or how you'd like to contribute..."
                            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-white/10 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-violet-500/50 transition-colors resize-none"
                          />
                        </div>
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setFormStep(2)}
                            className="flex-1"
                          >
                            Back
                          </Button>
                          <Button
                            type="submit"
                            loading={formLoading}
                            className="flex-1 gap-2"
                          >
                            <Send className="w-4 h-4" />
                            Submit
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
