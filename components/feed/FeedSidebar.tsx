import Link from "next/link";
import { MapPin, Briefcase } from "lucide-react";

export default function FeedSidebar() {
  return (
    <div className="flex flex-col gap-3 sticky top-20">
      {/* Profil résumé */}
      <div className="bg-white rounded-[12px] border border-[#E5E5E5] overflow-hidden">
        <div className="h-14 bg-gradient-to-r from-[#0A0A0A] to-[#262626]" />
        <div className="px-4 pb-4">
          <div className="w-14 h-14 rounded-full bg-[#0A0A0A] border-2 border-white -mt-7 flex items-center justify-center text-white text-base font-semibold">
            Z
          </div>
          <Link
            href="/profile/moi"
            className="block mt-2 text-sm font-semibold text-[#0A0A0A] hover:underline"
            style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
          >
            Votre Profil
          </Link>
          <div className="flex items-center gap-1.5 mt-1">
            <Briefcase size={11} className="text-[#A3A3A3]" />
            <p className="text-[11px] text-[#737373]">Professionnel du Luxe</p>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <MapPin size={11} className="text-[#A3A3A3]" />
            <p className="text-[11px] text-[#737373]">Paris, France</p>
          </div>
        </div>

        <div className="border-t border-[#F5F5F5] px-4 py-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#737373]">Vues du profil</span>
            <span className="text-[#0A0A0A] font-semibold">—</span>
          </div>
          <div className="flex items-center justify-between text-[11px] mt-1">
            <span className="text-[#737373]">Connexions</span>
            <span className="text-[#0A0A0A] font-semibold">—</span>
          </div>
        </div>
      </div>

      {/* Navigation secondaire */}
      <div className="bg-white rounded-[12px] border border-[#E5E5E5] p-3">
        {[
          { href: "/network", label: "Mon réseau" },
          { href: "/events", label: "Événements" },
          { href: "/careers", label: "Carrières Luxe" },
          { href: "/circles", label: "Mes cercles" },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center px-2 py-2 rounded-[8px] text-sm text-[#737373] hover:bg-[#F5F5F5] hover:text-[#0A0A0A] transition-colors"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
