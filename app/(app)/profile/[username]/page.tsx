import { Metadata } from "next";
import Link from "next/link";
import { MapPin, Briefcase, Globe, Users, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Profil — Zanvore",
};

const MOCK_EXPERIENCE = [
  { company: "Dior", role: "Directrice de Collection", period: "2022 – présent", logo: "DI" },
  { company: "Chanel", role: "Chef de Projet Luxe", period: "2018 – 2022", logo: "CH" },
  { company: "LVMH", role: "Analyste Stratégie", period: "2015 – 2018", logo: "LV" },
];

const MOCK_POSTS = [
  {
    id: "p1",
    content: "Retour sur la Fashion Week — les tendances qui redéfinissent le luxe accessible.",
    time: "3j",
    likes: 218,
  },
  {
    id: "p2",
    content: "Publié : mon analyse sur l'évolution du consommateur de luxe post-2025.",
    time: "1sem",
    likes: 543,
  },
];

export default function ProfilePage({ params }: { params: { username: string } }) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-5">
        {/* Colonne principale */}
        <div className="flex flex-col gap-4">
          {/* Carte identité */}
          <div className="bg-white rounded-[12px] border border-[#E5E5E5] overflow-hidden">
            <div className="h-28 bg-gradient-to-r from-[#0A0A0A] to-[#262626]" />
            <div className="px-6 pb-5">
              <div className="flex items-end justify-between -mt-9 mb-4">
                <div className="w-20 h-20 rounded-full bg-[#0A0A0A] border-4 border-white flex items-center justify-center text-white text-2xl font-semibold">
                  {params.username.charAt(0).toUpperCase()}
                </div>
                <button className="bg-[#0A0A0A] text-white text-xs font-medium px-5 py-2 rounded-full hover:bg-[#262626] transition-colors">
                  Se connecter
                </button>
              </div>

              <h1
                className="text-xl font-semibold text-[#0A0A0A]"
                style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
              >
                {params.username}
              </h1>
              <p className="text-[#737373] text-sm mt-1">Professionnel du Luxe · Zanvore</p>

              <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-[#737373]">
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> Paris, France
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase size={12} /> Secteur Luxe
                </span>
                <span className="flex items-center gap-1">
                  <Users size={12} /> 487 connexions
                </span>
              </div>

              <p className="text-[#0A0A0A] text-sm leading-relaxed mt-4 max-w-xl">
                Professionnelle du luxe avec 10 ans d&apos;expérience entre Paris, Milan et Tokyo. Passionnée par l&apos;innovation et la préservation du savoir-faire artisanal.
              </p>
            </div>
          </div>

          {/* Expérience */}
          <div className="bg-white rounded-[12px] border border-[#E5E5E5] p-6">
            <h2
              className="text-sm font-semibold text-[#0A0A0A] mb-4"
              style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
            >
              Expérience
            </h2>
            <div className="flex flex-col gap-4">
              {MOCK_EXPERIENCE.map((exp) => (
                <div key={exp.company} className="flex items-start gap-3">
                  <Link href={`/company/${exp.company.toLowerCase()}`}>
                    <div className="w-10 h-10 rounded-[8px] bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center text-[#0A0A0A] text-xs font-semibold shrink-0">
                      {exp.logo}
                    </div>
                  </Link>
                  <div>
                    <p className="text-sm font-medium text-[#0A0A0A]">{exp.role}</p>
                    <Link href={`/company/${exp.company.toLowerCase()}`} className="text-xs text-[#737373] hover:underline flex items-center gap-1 mt-0.5">
                      <Building2 size={11} /> {exp.company}
                    </Link>
                    <p className="text-[11px] text-[#A3A3A3] mt-0.5">{exp.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Publications */}
          <div className="bg-white rounded-[12px] border border-[#E5E5E5] p-6">
            <h2
              className="text-sm font-semibold text-[#0A0A0A] mb-4"
              style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
            >
              Publications récentes
            </h2>
            <div className="flex flex-col gap-3">
              {MOCK_POSTS.map((post) => (
                <div key={post.id} className="p-3 rounded-[8px] bg-[#F5F5F5]">
                  <p className="text-sm text-[#0A0A0A] leading-relaxed">{post.content}</p>
                  <div className="flex items-center gap-3 mt-2 text-[11px] text-[#A3A3A3]">
                    <span>{post.time}</span>
                    <span>·</span>
                    <span>{post.likes} réactions</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar droite */}
        <div className="flex flex-col gap-3">
          <div className="bg-white rounded-[12px] border border-[#E5E5E5] p-4">
            <h3 className="text-xs font-semibold text-[#0A0A0A] uppercase tracking-wide mb-3"
              style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}>
              Informations
            </h3>
            <div className="flex flex-col gap-2 text-xs text-[#737373]">
              <span className="flex items-center gap-2">
                <Globe size={12} /> zanvore.com/@{params.username}
              </span>
              <span className="flex items-center gap-2">
                <Users size={12} /> Membre depuis 2025
              </span>
            </div>
          </div>

          <div className="bg-white rounded-[12px] border border-[#E5E5E5] p-4">
            <h3 className="text-xs font-semibold text-[#0A0A0A] uppercase tracking-wide mb-3"
              style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}>
              Cercles
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {["Collectionneurs", "Horlogerie Fine", "Art & Galeries"].map((c) => (
                <span key={c} className="text-[11px] text-[#737373] bg-[#F5F5F5] rounded-full px-3 py-1">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
