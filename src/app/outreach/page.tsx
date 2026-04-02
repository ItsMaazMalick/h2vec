"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Send,
  ChevronRight,
} from "lucide-react";
import { outreachEvents, programs } from "@/data/outreach";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { EventStatus } from "@/data/outreach";

type FormStep = 1 | 2 | 3;

const eventStatusVariant: Record<EventStatus, "success" | "accent" | "muted"> = {
  upcoming: "success",
  ongoing:  "accent",
  past:     "muted",
};

export default function OutreachPage() {
  const [activeStatus, setActiveStatus] = useState<EventStatus | "All">("All");
  const [formStep, setFormStep] = useState<FormStep>(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", institution: "", role: "", city: "", interest: "",
  });
  const [formLoading, setFormLoading] = useState(false);

  const filteredEvents =
    activeStatus === "All"
      ? outreachEvents
      : outreachEvents.filter((e) => e.status === activeStatus);

  function handleInput(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
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
    <div className="min-h-screen">
      {/* Hero */}
      <div className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="page-container pt-28 pb-14">
          <SectionHeader
            align="left"
            eyebrow="Community"
            title="Outreach & Events"
            description="Workshops, hackathons, school visits, and community programs driving AI education across Pakistan."
          />
        </div>
      </div>

      {/* Programs */}
      <section className="section-py">
        <div className="page-container">
          <SectionHeader
            eyebrow="Initiatives"
            title="Active Programs"
            description="Long-running programs with measurable community impact."
            className="mb-12"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {programs.map((program, i) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="card-static rounded-xl p-6"
              >
                <div className="text-3xl mb-4">
                  {program.icon === "award" ? "🏆" : program.icon === "graduation-cap" ? "🎓" : program.icon === "database" ? "🗄️" : "👥"}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-[var(--foreground)] text-sm leading-snug">
                    {program.title}
                  </h3>
                  {program.active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-[var(--muted-fg)] leading-relaxed mb-4">
                  {program.description}
                </p>
                <div className="pt-4 border-t border-[var(--border-subtle)]">
                  <p className="text-xs font-semibold text-[var(--teal)]">{program.impact}</p>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-[var(--muted)]">
                    <Users className="w-3 h-3" />
                    <span>{program.beneficiaries.toLocaleString()} beneficiaries</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="section-py bg-[var(--surface)] border-t border-[var(--border)]">
        <div className="page-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <SectionHeader
              align="left"
              eyebrow="Events"
              title="Workshops & Programs"
            />
            {/* Filter tabs */}
            <div className="flex items-center gap-1 bg-[var(--surface-raised)] rounded-lg border border-[var(--border)] p-1 self-start">
              {(["All", "upcoming", "past"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-medium transition-colors capitalize",
                    activeStatus === status
                      ? "bg-[var(--accent)] text-white"
                      : "text-[var(--muted-fg)] hover:text-[var(--foreground)]"
                  )}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className={cn(
                    "card-static rounded-xl p-6 flex flex-col",
                    event.status === "past" && "opacity-70"
                  )}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="accent" size="sm">{event.type}</Badge>
                    <Badge variant={eventStatusVariant[event.status]} size="sm">
                      {event.status}
                    </Badge>
                  </div>

                  <h3 className="font-semibold text-[var(--foreground)] leading-snug mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-[var(--muted-fg)] leading-relaxed line-clamp-3 mb-4 flex-1">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                      <CalendarDays className="w-3.5 h-3.5" />
                      <span>{formatDate(event.date)}{event.endDate ? ` – ${formatDate(event.endDate)}` : ""}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{event.location}, {event.city}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                        <Users className="w-3.5 h-3.5" />
                        <span>{event.registered}/{event.capacity} registered</span>
                      </div>
                      {event.registrationOpen && (
                        <button
                          onClick={() => document.getElementById("register-form")?.scrollIntoView({ behavior: "smooth" })}
                          className="text-xs font-medium text-[var(--accent)] hover:underline"
                        >
                          Register
                        </button>
                      )}
                    </div>
                    {/* Capacity bar */}
                    <div className="h-1 rounded-full bg-[var(--surface-raised)] overflow-hidden">
                      <div
                        className="h-full bg-[var(--accent)] rounded-full"
                        style={{ width: `${Math.min((event.registered / event.capacity) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Registration Form */}
      <section id="register-form" className="section-py border-t border-[var(--border)]">
        <div className="page-container">
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              eyebrow="Join Outreach"
              title="Register Your Interest"
              description="Tell us about yourself and we'll match you with the most relevant events, workshops, and programs."
              className="mb-10"
            />

            <div className="card-static rounded-2xl p-8">
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                    Registration received!
                  </h3>
                  <p className="text-[var(--muted-fg)] text-sm">
                    We&apos;ll reach out to you within 48 hours with relevant opportunities.
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
                            "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors",
                            formStep >= step
                              ? "bg-[var(--accent)] text-white"
                              : "bg-[var(--surface-raised)] text-[var(--muted)]"
                          )}
                        >
                          {step}
                        </div>
                        {step < 3 && (
                          <div
                            className={cn(
                              "w-12 h-px transition-colors",
                              formStep > step ? "bg-[var(--accent)]" : "bg-[var(--border)]"
                            )}
                          />
                        )}
                      </div>
                    ))}
                    <span className="ml-3 text-xs text-[var(--muted)]">
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
                          <label className="block text-xs font-medium text-[var(--muted-fg)] mb-1.5">
                            Full Name *
                          </label>
                          <input
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInput}
                            placeholder="Dr. Jane Doe"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--surface-raised)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[var(--muted-fg)] mb-1.5">
                            Email Address *
                          </label>
                          <input
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInput}
                            placeholder="jane@university.edu.pk"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--surface-raised)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
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
                          <label className="block text-xs font-medium text-[var(--muted-fg)] mb-1.5">
                            Institution / Organization
                          </label>
                          <input
                            name="institution"
                            value={formData.institution}
                            onChange={handleInput}
                            placeholder="LUMS / Google / Independent"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--surface-raised)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[var(--muted-fg)] mb-1.5">
                            Role
                          </label>
                          <select
                            name="role"
                            value={formData.role}
                            onChange={handleInput}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--surface-raised)] border border-[var(--border)] text-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)] transition-colors"
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
                        <label className="block text-xs font-medium text-[var(--muted-fg)] mb-1.5">
                          City
                        </label>
                        <input
                          name="city"
                          value={formData.city}
                          onChange={handleInput}
                          placeholder="Karachi, Lahore, Islamabad..."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--surface-raised)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button type="button" variant="secondary" onClick={() => setFormStep(1)} className="flex-1">
                          Back
                        </Button>
                        <Button type="button" onClick={() => setFormStep(3)} className="flex-1 gap-2">
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
                        <label className="block text-xs font-medium text-[var(--muted-fg)] mb-1.5">
                          Area of Interest
                        </label>
                        <textarea
                          name="interest"
                          value={formData.interest}
                          onChange={handleInput}
                          rows={4}
                          placeholder="Tell us about your ML interests, what you're working on, or how you'd like to contribute..."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--surface-raised)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button type="button" variant="secondary" onClick={() => setFormStep(2)} className="flex-1">
                          Back
                        </Button>
                        <Button type="submit" loading={formLoading} className="flex-1 gap-2">
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
      </section>
    </div>
  );
}
