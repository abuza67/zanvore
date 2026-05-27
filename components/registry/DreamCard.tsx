"use client";

import { motion } from "framer-motion";
import { Dream, MadnessLevel, DreamStatus } from "@/types/dreams";
import { CheckCircle2, Circle, Clock, Flame, Sparkles, Star, Trash2, Pencil } from "lucide-react";

interface DreamCardProps {
  dream: Dream;
  onEdit: (dream: Dream) => void;
  onDelete: (id: string) => void;
}

const madnessConfig: Record<MadnessLevel, { label: string; color: string; icon: React.ReactNode }> = {
  Simple: {
    label: "Simple",
    color: "text-white/50 border-white/20",
    icon: <Star size={11} />,
  },
  Ambitieux: {
    label: "Ambitieux",
    color: "text-[#D4AF37] border-[#D4AF37]/40",
    icon: <Flame size={11} />,
  },
  Fou: {
    label: "Fou",
    color: "text-[#D4AF37] border-[#D4AF37]",
    icon: <Sparkles size={11} />,
  },
};

const statusConfig: Record<DreamStatus, { label: string; dot: string }> = {
  "À faire": { label: "À faire", dot: "bg-white/30" },
  "En cours": { label: "En cours", dot: "bg-[#D4AF37]" },
  "Réalisé": { label: "Réalisé", dot: "bg-emerald-400" },
  "En pause": { label: "En pause", dot: "bg-white/20" },
};

export default function DreamCard({ dream, onEdit, onDelete }: DreamCardProps) {
  const madness = madnessConfig[dream.madness_level];
  const status = statusConfig[dream.status];
  const milestones = dream.milestones ?? [];
  const doneMilestones = milestones.filter((m) => m.done).length;
  const progress = milestones.length > 0 ? (doneMilestones / milestones.length) * 100 : null;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-[#111111] border border-white/8 rounded-[12px] p-6 flex flex-col gap-4 hover:border-white/16 transition-colors duration-500"
    >
      {/* Actions */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => onEdit(dream)}
          className="p-1.5 rounded-md text-white/40 hover:text-white/80 hover:bg-white/8 transition-colors"
          aria-label="Modifier"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(dream.id)}
          className="p-1.5 rounded-md text-white/40 hover:text-red-400 hover:bg-white/8 transition-colors"
          aria-label="Supprimer"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-2 pr-12">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Status dot */}
          <span className="flex items-center gap-1.5 text-white/40 text-xs">
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>

          {/* Madness badge */}
          <span className={`flex items-center gap-1 text-[10px] font-medium border rounded-full px-2 py-0.5 ${madness.color}`}>
            {madness.icon}
            {madness.label}
          </span>
        </div>

        <h3
          className="text-white text-base font-medium leading-snug"
          style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
        >
          {dream.title}
        </h3>

        {dream.description && (
          <p className="text-white/40 text-sm leading-relaxed line-clamp-2">
            {dream.description}
          </p>
        )}
      </div>

      {/* Category */}
      <div className="text-[11px] text-white/30 tracking-wide uppercase">
        {dream.main_category}
      </div>

      {/* Progress milestones */}
      {progress !== null && (
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-white/30">
              {doneMilestones}/{milestones.length} étapes
            </span>
            <span className="text-[11px] text-white/30">{Math.round(progress)}%</span>
          </div>
          <div className="h-px bg-white/8 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#D4AF37] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      )}

      {/* Milestones preview */}
      {milestones.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {milestones.slice(0, 3).map((m) => (
            <li key={m.id} className="flex items-center gap-2 text-xs text-white/50">
              {m.done
                ? <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                : <Circle size={12} className="text-white/20 shrink-0" />}
              <span className={m.done ? "line-through text-white/25" : ""}>{m.title}</span>
              {m.deadline && (
                <span className="ml-auto flex items-center gap-1 text-white/25 text-[10px]">
                  <Clock size={9} /> {m.deadline}
                </span>
              )}
            </li>
          ))}
          {milestones.length > 3 && (
            <li className="text-[11px] text-white/25 pl-5">
              +{milestones.length - 3} autres étapes
            </li>
          )}
        </ul>
      )}

      {/* Deadline */}
      {dream.desired_deadline && (
        <div className="flex items-center gap-1.5 text-[11px] text-white/30">
          <Clock size={11} />
          Objectif : {dream.desired_deadline}
        </div>
      )}
    </motion.article>
  );
}
