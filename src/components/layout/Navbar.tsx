"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Database, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-background/80 backdrop-blur-2xl border-b border-border/50 shadow-2xl shadow-black/30"
            : "bg-background/60 backdrop-blur-xl border-b border-transparent",
        )}
      >
        <nav className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group flex-shrink-0"
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50">
                <Database className="w-4 h-4 text-white" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
            </div>
            <span className="text-foreground font-bold text-lg tracking-tight">
              H2Vec
            </span>
          </Link>

          {/* Desktop links - Premium pill navigation */}
          <ul className="hidden md:flex items-center gap-1.5 p-1.5 rounded-2xl bg-surface/30 backdrop-blur-sm border border-border/30">
            {siteConfig.nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                      active
                        ? "text-foreground bg-violet-500/15 shadow-lg shadow-violet-500/10"
                        : "text-muted-fg hover:text-foreground hover:bg-white/5",
                    )}
                  >
                    {active && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-xl bg-violet-500/10"
                        transition={{
                          type: "spring",
                          duration: 0.5,
                          bounce: 0.2,
                        }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA - Premium buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/datasets"
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-muted-fg hover:text-violet-300 bg-surface/30 backdrop-blur-sm border border-border/30 hover:border-violet-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Explore Data</span>
            </Link>
            <Link
              href="/outreach"
              className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5"
            >
              <span>Join / Contribute</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-xl text-muted-fg hover:text-foreground hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed left-0 right-0 top-16 z-40 bg-background/95 backdrop-blur-2xl border-b border-border/50 md:hidden"
          >
            <div className="w-full max-w-7xl mx-auto px-6 py-4 flex flex-col gap-2">
              {siteConfig.nav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      active
                        ? "text-foreground bg-violet-500/15"
                        : "text-muted-fg hover:text-foreground hover:bg-white/5",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-4 mt-2 border-t border-border/50 flex flex-col gap-2">
                <Link
                  href="/datasets"
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-muted-fg bg-surface/50 border border-border/50"
                >
                  <Database className="w-4 h-4" />
                  Explore Data
                </Link>
                <Link
                  href="/outreach"
                  className="block w-full text-center px-4 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/25"
                >
                  Join / Contribute
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
