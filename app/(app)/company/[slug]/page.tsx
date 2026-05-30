import { Metadata } from "next";
import Link from "next/link";
import { MapPin, Globe, Users, Briefcase, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Entreprise — Zanvore",
};

const MOCK_JOBS = [
  { id: "j1", title: "Responsable Boutique", location: "Paris, France", type: "CDI" },
  { id: "j2", title: "Chef de Produit Senior", location: "Milan, Italie", type: "CDI" },
  { id: "j3", title: "Consultant Expérience Client", location: "Dubai, EAU", type: "Freelance" },
];

const MOCK_EVENTS = [
  { id: "e1", title: "Défilé Haute Couture Été 2026", date: "12 juin 2026", location: "Paris" },
  { id: "e2", title: "Atelier Savoir-Faire Exclusif", date: "28 juin 2026", location: "Grasse" },
];

const MOCK_POSTS = [
  {
    id: "p1",
    content: "Notre Maison célèbre 130 ans de création. Rejoignez-nous pour un voyage dans notre histoire.",
    time: "2j",
    likes: 3412,
  },
  {
    id: "p2",
    content: "Nouvelle collection Printemps disponible en aperçu exclusif pour les membres Zanvore.",
    time: "5j",
    likes: 1876,
  },
];

export default function CompanyPage({ params }: { params: { slug: string } }) {
  const companyName = params.slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
      {/* Header entreprise */}
      <div className="bg-white rounded-[12px] border border-[#E5E5E5] overflow-hidden mb-4">
        <div className="h-32 bg-gradient-to-r from-[#0A0A0A] via-[#1a1a1a] to-[#262626]" />
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div className="w-20 h-20 rounded-[12px] bg-white border border-[#E5E5E5] flex items-center justify-center text-[#0A0A0A] text-2xl font-semibold shadow-sm">
              {companyName.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex items-center gap-2">
              <button className="text-xs text-[#0A0A0A] border border-[#0A0A0A] rounded-full px-4 py-2 hover:bg-[#F5F5F5] transition-colors">
                Message
              </button>
              <button className="bg-[#0A0A0A] text-white text-xs font-medium px-5 py-2 rounded-full hover:bg-[#262626] transition-colors">
                + Suivre
              </button>
            </div>
          </div>

          <h1
            className="text-2xl font-semibold text-[#0A0A0A]"
            style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
          >
            {companyName}
          </h1>
          <p className="text-[#737373] text-sm mt-1">Maison de Luxe · Paris, France</p>

          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-[#737373]">
            <span className="flex items-center gap-1"><MapPin size={12} /> Paris, France</span>
            <span className="flex items-center gap-1"><Globe size={12} /> {params.slug}.com</span>
            <span className="flex items-center gap-1"><Users size={12} /> 12 400 abonnés</span>
            <span className="flex items-center gap-1"><Briefcase size={12} /> 3 offres actives</span>
          </div>

          <p className="text-[#0A0A0A] text-sm leading-relaxed mt-4 max-w-2xl">
            Maison fondée en 1895, reconnue mondialement pour l&apos;excellence de ses créations et son savoir-faire artisanal transmis de génération en génération. Présents dans 48 pays.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-4">
        {/* Colonne principale */}
        <div className="flex flex-col gap-4">
          {/* Publications */}
          <div className="bg-white rounded-[12px] border border-[#E5E5E5] p-6">
            <h2
              className="text-sm font-semibold text-[#0A0A0A] mb-4"
              style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
            >
              Publications
            </h2>
            <div className="flex flex-col gap-3">
              {MOCK_POSTS.map((post) => (
                <div key={post.id} className="p-3 rounded-[8px] bg-[#F5F5F5]">
                  <p className="text-sm text-[#0A0A0A] leading-relaxed">{post.content}</p>
                  <div className="flex items-center gap-3 mt-2 text-[11px] text-[#A3A3A3]">
                    <span>{post.time}</span>
                    <span>·</span>
                    <span>{post.likes.toLocaleString("fr")} réactions</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Événements */}
          <div className="bg-white rounded-[12px] border border-[#E5E5E5] p-6">
            <h2
              className="text-sm font-semibold text-[#0A0A0A] mb-4"
              style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
            >
              Événements
            </h2>
            <div className="flex flex-col gap-3">
              {MOCK_EVENTS.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="flex items-start gap-3 p-3 rounded-[8px] hover:bg-[#F5F5F5] transition-colors"
                >
                  <div className="w-10 h-10 rounded-[8px] bg-[#0A0A0A] flex items-center justify-center shrink-0">
                    <Calendar size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0A0A0A]">{event.title}</p>
                    <p className="text-xs text-[#737373] mt-0.5">{event.date} · {event.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-3">
          {/* Offres d'emploi */}
          <div className="bg-white rounded-[12px] border border-[#E5E5E5] p-4">
            <h3
              className="text-xs font-semibold text-[#0A0A0A] uppercase tracking-wide mb-3"
              style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
            >
              Offres d'emploi
            </h3>
            <div className="flex flex-col gap-3">
              {MOCK_JOBS.map((job) => (
                <Link
                  key={job.id}
                  href={`/careers/${job.id}`}
                  className="block group"
                >
                  <p className="text-xs font-medium text-[#0A0A0A] group-hover:underline">{job.title}</p>
                  <p className="text-[11px] text-[#A3A3A3] mt-0.5">{job.location} · {job.type}</p>
                </Link>
              ))}
            </div>
            <Link
              href="/careers"
              className="block text-center text-xs text-[#737373] mt-3 pt-3 border-t border-[#F5F5F5] hover:text-[#0A0A0A] transition-colors"
            >
              Voir toutes les offres →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
