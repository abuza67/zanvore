"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Briefcase, Calendar, Bell, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/feed", label: "Fil", icon: Home },
  { href: "/network", label: "Réseau", icon: Users },
  { href: "/events", label: "Événements", icon: Calendar },
  { href: "/careers", label: "Carrières", icon: Briefcase },
];

export default function AppNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-14 flex items-center gap-4">
          {/* Logo */}
          <Link href="/feed" className="shrink-0 mr-2">
            <span
              className="text-black text-lg font-semibold tracking-[0.12em] uppercase"
              style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
            >
              Zanvore
            </span>
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-xs">
            <div className="relative w-full">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]" />
              <input
                type="text"
                placeholder="Rechercher…"
                className="w-full bg-[#F5F5F5] text-sm text-[#0A0A0A] placeholder:text-[#A3A3A3] rounded-[8px] pl-9 pr-4 py-2 outline-none focus:bg-white focus:ring-1 focus:ring-black/10 transition-all"
              />
            </div>
          </div>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-1 ml-2">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-[8px] text-xs font-medium transition-colors duration-200 ${
                    active
                      ? "text-black"
                      : "text-[#737373] hover:text-black hover:bg-[#F5F5F5]"
                  }`}
                >
                  <Icon size={18} strokeWidth={active ? 2 : 1.5} />
                  <span>{label}</span>
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-black rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex-1" />

          {/* Actions desktop */}
          <div className="hidden md:flex items-center gap-2">
            <button className="relative p-2 rounded-[8px] text-[#737373] hover:text-black hover:bg-[#F5F5F5] transition-colors">
              <Bell size={18} strokeWidth={1.5} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-black rounded-full" />
            </button>
            <Link
              href="/profile/moi"
              className="w-8 h-8 rounded-full bg-[#0A0A0A] flex items-center justify-center text-white text-xs font-medium shrink-0"
            >
              Z
            </Link>
          </div>

          {/* Burger mobile */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-[8px] text-[#737373] hover:text-black hover:bg-[#F5F5F5] transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-14 left-0 right-0 z-40 bg-white border-b border-[#E5E5E5] md:hidden"
          >
            <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navItems.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-[8px] text-sm font-medium transition-colors ${
                      active ? "bg-[#F5F5F5] text-black" : "text-[#737373] hover:bg-[#F5F5F5] hover:text-black"
                    }`}
                  >
                    <Icon size={18} strokeWidth={1.5} />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
