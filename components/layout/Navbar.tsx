"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-black/95 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group">
            <span
              className="text-white text-xl font-semibold tracking-[0.15em] uppercase"
              style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
            >
              Zanvore
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/#vision">Vision</NavLink>
            <NavLink href="/#dream-architect">Dream Architect</NavLink>
            <NavLink href="/#evenements">Événements</NavLink>
          </nav>

          {/* CTA desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/candidature"
              className="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-[8px] hover:bg-white/90 transition-colors duration-300"
            >
              Candidature
            </Link>
          </div>

          {/* Burger mobile */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden text-white p-2 rounded-[8px] hover:bg-white/10 transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-10 md:hidden"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-6 text-white/60 hover:text-white transition-colors"
              aria-label="Fermer"
            >
              <X size={24} />
            </button>

            <MobileNavLink href="/#vision" onClick={() => setMenuOpen(false)}>
              Vision
            </MobileNavLink>
            <MobileNavLink href="/#dream-architect" onClick={() => setMenuOpen(false)}>
              Dream Architect
            </MobileNavLink>
            <MobileNavLink href="/#evenements" onClick={() => setMenuOpen(false)}>
              Événements
            </MobileNavLink>

            <Link
              href="/candidature"
              onClick={() => setMenuOpen(false)}
              className="mt-4 bg-white text-black text-base font-medium px-8 py-3 rounded-[8px] hover:bg-white/90 transition-colors"
            >
              Candidature
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-white/60 hover:text-white text-sm font-medium tracking-wide transition-colors duration-300"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-white/70 hover:text-white text-3xl font-light tracking-wider transition-colors duration-300"
      style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
    >
      {children}
    </Link>
  );
}
