"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Database } from "lucide-react";
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

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border"
            : "bg-background/70 backdrop-blur-sm"
        )}
      >
        <nav className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center transition-transform group-hover:scale-105">
              <Database className="w-4 h-4 text-white" />
            </div>
            <span className="text-foreground font-semibold text-lg tracking-tight">H2Vec</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {siteConfig.nav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "px-3.5 py-2 rounded-md text-sm font-medium transition-colors",
                      active
                        ? "text-foreground bg-white/10"
                        : "text-muted-fg hover:text-foreground hover:bg-white/5"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/datasets" className="text-sm text-muted-fg hover:text-foreground transition-colors">
              Explore Data
            </Link>
            <Link
              href="/outreach"
              className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors"
            >
              Join / Contribute
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-md text-muted-fg hover:text-foreground hover:bg-white/5 transition-colors"
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
            className="fixed left-0 right-0 top-16 z-40 bg-background border-b border-border md:hidden"
          >
            <div className="w-full max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {siteConfig.nav.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      active
                        ? "text-foreground bg-white/10"
                        : "text-muted-fg hover:text-foreground hover:bg-white/5"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-3 mt-2 border-t border-border">
                <Link
                  href="/outreach"
                  className="block w-full text-center px-4 py-3 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors"
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
