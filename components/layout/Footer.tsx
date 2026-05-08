import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white/50 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-3">
            <span
              className="block text-white text-lg font-semibold tracking-[0.15em] uppercase"
              style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
            >
              Zanvore
            </span>
            <p className="text-sm leading-relaxed max-w-xs">
              One Life. Thousand Dreams.
            </p>
          </div>

          {/* Liens */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-3 text-sm">
            <Link href="/#vision" className="hover:text-white transition-colors">
              Vision
            </Link>
            <Link href="/candidature" className="hover:text-white transition-colors">
              Candidature
            </Link>
            <Link href="/#dream-architect" className="hover:text-white transition-colors">
              Dream Architect
            </Link>
            <Link href="/#evenements" className="hover:text-white transition-colors">
              Événements
            </Link>
          </div>
        </div>

        <Separator className="bg-white/10 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {year} Zanvore. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              Confidentialité
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
