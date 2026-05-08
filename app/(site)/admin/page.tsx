"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Clock, ChevronDown, ChevronUp, LogOut } from "lucide-react";
import { CandidatureStatus } from "@/types";

/* ─── Données de simulation ─────────────────────────────────────────────── */
interface CandidatureMock {
  id: string;
  created_at: string;
  status: CandidatureStatus;
  prenom: string;
  nom: string;
  email: string;
  pays: string;
  profession: string;
  entreprise: string;
  realisations: string;
  parcours: string;
  valeurs: string;
  vision_legacy: string;
  pourquoi_zanvore: string;
  motivations: string;
  referent?: string;
}

const MOCK_DATA: CandidatureMock[] = [
  {
    id: "1",
    created_at: "2026-05-01",
    status: "en_revue",
    prenom: "Alexandre",
    nom: "Moreau",
    email: "alexandre.moreau@exemple.com",
    pays: "France",
    profession: "Fondateur & CEO",
    entreprise: "Moreau Capital",
    realisations: "Fondé 3 entreprises dans l'asset management, levé 40M€, mentor au sein de Station F.",
    parcours: "HEC Paris, 10 ans en banque d'affaires, puis entrepreneuriat depuis 2018.",
    valeurs: "Intégrité, excellence discrète, impact durable.",
    vision_legacy: "Créer un fonds familial qui financera l'éducation d'enfants défavorisés sur 3 générations.",
    pourquoi_zanvore: "Je cherche un réseau qui va au-delà du networking de surface.",
    motivations: "Construire quelque chose qui dure bien au-delà de moi.",
    referent: "Sophie Lemaire",
  },
  {
    id: "2",
    created_at: "2026-05-03",
    status: "en_revue",
    prenom: "Camille",
    nom: "Fontaine",
    email: "c.fontaine@exemple.com",
    pays: "Suisse",
    profession: "Architecte",
    entreprise: "Fontaine Studio",
    realisations: "Prix Pritzker 2024 (nominée), projets à Dubaï, Singapour et Paris.",
    parcours: "EPFL, Zaha Hadid Architects London, studio propre depuis 2020.",
    valeurs: "Beauté, fonctionnalité, responsabilité environnementale.",
    vision_legacy: "Laisser des bâtiments qui racontent une histoire dans 100 ans.",
    pourquoi_zanvore: "Rencontrer des personnes qui pensent à l'échelle de générations.",
    motivations: "Créer des espaces qui transforment la façon dont les gens vivent.",
  },
  {
    id: "3",
    created_at: "2026-05-05",
    status: "accepte",
    prenom: "Ibrahim",
    nom: "Al-Rashid",
    email: "ibrahim@exemple.com",
    pays: "Émirats Arabes Unis",
    profession: "Investisseur",
    entreprise: "Al-Rashid Group",
    realisations: "Portfolio immobilier de 2Md$ à travers 6 pays, philanthrophie active.",
    parcours: "LSE, Goldman Sachs Dubai, family office depuis 2015.",
    valeurs: "Vision long terme, discrétion, générosité.",
    vision_legacy: "Un fonds dédié à l'art contemporain arabe accessible à tous.",
    pourquoi_zanvore: "Un espace de confiance avec des pairs qui comprennent la durée.",
    motivations: "Transmettre une richesse culturelle autant que financière.",
    referent: "Jean-Paul Duval",
  },
  {
    id: "4",
    created_at: "2026-05-07",
    status: "refuse",
    prenom: "Thomas",
    nom: "Bernard",
    email: "thomas.b@exemple.com",
    pays: "Belgique",
    profession: "Consultant",
    entreprise: "TBConsulting",
    realisations: "10 ans de conseil en stratégie pour des PME.",
    parcours: "Solvay Business School, consultant indépendant.",
    valeurs: "Pragmatisme, efficacité.",
    vision_legacy: "Réussir ma retraite confortablement.",
    pourquoi_zanvore: "Développer mon réseau professionnel.",
    motivations: "Augmenter mon chiffre d'affaires.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── Page Admin ────────────────────────────────────────────────────────── */
export default function AdminPage() {
  const [candidatures, setCandidatures] = useState<CandidatureMock[]>(MOCK_DATA);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<CandidatureStatus | "tous">("tous");

  const updateStatus = (id: string, status: CandidatureStatus) => {
    setCandidatures((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  const filtered = filter === "tous"
    ? candidatures
    : candidatures.filter((c) => c.status === filter);

  const counts = {
    tous: candidatures.length,
    en_revue: candidatures.filter((c) => c.status === "en_revue").length,
    accepte: candidatures.filter((c) => c.status === "accepte").length,
    refuse: candidatures.filter((c) => c.status === "refuse").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="pt-36 pb-10 px-6 md:px-12 border-b border-foreground/8">
        <div className="max-w-5xl mx-auto flex items-end justify-between">
          <div className="space-y-2">
            <span className="text-foreground/30 text-xs tracking-[0.25em] uppercase">
              Back-office
            </span>
            <h1
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
            >
              Candidatures
            </h1>
          </div>
          <button className="flex items-center gap-2 text-foreground/30 hover:text-foreground text-sm transition-colors duration-300">
            <LogOut size={14} />
            Déconnexion
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard label="Total" value={counts.tous} />
          <StatCard label="En revue" value={counts.en_revue} color="amber" />
          <StatCard label="Acceptés" value={counts.accepte} color="green" />
          <StatCard label="Refusés" value={counts.refuse} color="red" />
        </div>

        {/* Filtres */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {(["tous", "en_revue", "accepte", "refuse"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-[6px] text-xs font-medium tracking-wide transition-colors duration-300 ${
                filter === f
                  ? "bg-foreground text-background"
                  : "bg-foreground/5 text-foreground/50 hover:text-foreground"
              }`}
            >
              {f === "tous" ? "Tous" : f === "en_revue" ? "En revue" : f === "accepte" ? "Acceptés" : "Refusés"}
            </button>
          ))}
        </div>

        {/* Tableau */}
        <div className="space-y-px">
          <AnimatePresence>
            {filtered.map((c) => (
              <CandidatureRow
                key={c.id}
                candidature={c}
                isExpanded={expanded === c.id}
                onToggle={() => setExpanded(expanded === c.id ? null : c.id)}
                onAccept={() => updateStatus(c.id, "accepte")}
                onRefuse={() => updateStatus(c.id, "refuse")}
                onReview={() => updateStatus(c.id, "en_revue")}
              />
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="text-foreground/30 text-sm py-12 text-center">
              Aucune candidature dans cette catégorie.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Ligne candidature ─────────────────────────────────────────────────── */
function CandidatureRow({
  candidature: c,
  isExpanded,
  onToggle,
  onAccept,
  onRefuse,
  onReview,
}: {
  candidature: CandidatureMock;
  isExpanded: boolean;
  onToggle: () => void;
  onAccept: () => void;
  onRefuse: () => void;
  onReview: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="border border-foreground/8 rounded-[8px] overflow-hidden"
    >
      {/* Ligne principale */}
      <div
        className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer hover:bg-foreground/[0.02] transition-colors duration-300"
        onClick={onToggle}
      >
        <div className="flex items-center gap-4 min-w-0">
          <StatusBadge status={c.status} />
          <div className="min-w-0">
            <p className="font-medium text-sm text-foreground truncate">
              {c.prenom} {c.nom}
            </p>
            <p className="text-foreground/40 text-xs truncate">
              {c.profession}{c.entreprise ? ` · ${c.entreprise}` : ""} · {c.pays}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-foreground/30 text-xs hidden md:block">{c.created_at}</span>
          {isExpanded ? (
            <ChevronUp size={14} className="text-foreground/30" />
          ) : (
            <ChevronDown size={14} className="text-foreground/30" />
          )}
        </div>
      </div>

      {/* Détail expandé */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 pt-2 border-t border-foreground/8 space-y-6">
              {/* Contact */}
              <div className="flex gap-6 text-xs text-foreground/50">
                <span>{c.email}</span>
                <span>{c.pays}</span>
                {c.referent && <span>Référent : {c.referent}</span>}
              </div>

              {/* Champs */}
              <div className="grid md:grid-cols-2 gap-6">
                <DetailField label="Réalisations" value={c.realisations} />
                <DetailField label="Parcours" value={c.parcours} />
                <DetailField label="Valeurs" value={c.valeurs} />
                <DetailField label="Vision legacy" value={c.vision_legacy} />
                <DetailField label="Pourquoi Zanvore" value={c.pourquoi_zanvore} />
                <DetailField label="Motivations" value={c.motivations} />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                {c.status !== "accepte" && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onAccept(); }}
                    className="flex items-center gap-2 bg-black text-white text-xs font-medium px-4 py-2 rounded-[6px] hover:bg-black/80 transition-colors duration-300"
                  >
                    <Check size={13} />
                    Accepter
                  </button>
                )}
                {c.status !== "refuse" && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onRefuse(); }}
                    className="flex items-center gap-2 border border-foreground/15 text-foreground/60 text-xs font-medium px-4 py-2 rounded-[6px] hover:border-foreground/40 hover:text-foreground transition-colors duration-300"
                  >
                    <X size={13} />
                    Refuser
                  </button>
                )}
                {c.status !== "en_revue" && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onReview(); }}
                    className="flex items-center gap-2 border border-foreground/15 text-foreground/40 text-xs px-4 py-2 rounded-[6px] hover:text-foreground/70 transition-colors duration-300"
                  >
                    <Clock size={13} />
                    Remettre en revue
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Sous-composants ───────────────────────────────────────────────────── */
function StatusBadge({ status }: { status: CandidatureStatus }) {
  const config = {
    en_revue: { label: "En revue", className: "bg-amber-50 text-amber-700 border-amber-200" },
    accepte:  { label: "Accepté",  className: "bg-green-50 text-green-700 border-green-200" },
    refuse:   { label: "Refusé",   className: "bg-red-50 text-red-600 border-red-200" },
  };
  const { label, className } = config[status];
  return (
    <span className={`shrink-0 text-[10px] font-medium px-2.5 py-1 rounded-full border tracking-wide ${className}`}>
      {label}
    </span>
  );
}

function StatCard({
  label, value, color,
}: {
  label: string; value: number; color?: "amber" | "green" | "red";
}) {
  const colors = {
    amber: "text-amber-600",
    green: "text-green-600",
    red: "text-red-500",
  };
  return (
    <div className="border border-foreground/8 rounded-[8px] px-5 py-4 space-y-1">
      <p className="text-foreground/40 text-xs">{label}</p>
      <p className={`text-2xl font-semibold tracking-tight ${color ? colors[color] : "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-foreground/30 text-xs uppercase tracking-wider">{label}</p>
      <p className="text-foreground/70 text-sm leading-relaxed">{value}</p>
    </div>
  );
}
