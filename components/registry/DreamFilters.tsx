"use client";

import { DREAM_CATEGORIES, DREAM_STATUSES, MADNESS_LEVELS } from "@/types/dreams";
import type { DreamFilters } from "@/types/dreams";

interface DreamFiltersProps {
  filters: DreamFilters;
  onChange: (filters: DreamFilters) => void;
  total: number;
  filtered: number;
}

export default function DreamFilters({ filters, onChange, total, filtered }: DreamFiltersProps) {
  function set<K extends keyof DreamFilters>(key: K, value: DreamFilters[K]) {
    onChange({ ...filters, [key]: value });
  }

  const hasActive =
    filters.category !== "all" ||
    filters.madnessLevel !== "all" ||
    filters.status !== "all";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2 items-center">
        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) => set("category", e.target.value as DreamFilters["category"])}
          className="bg-[#111111] border border-white/10 text-white/60 text-xs rounded-[8px] px-3 py-2 outline-none focus:border-white/30 transition-colors cursor-pointer appearance-none pr-6"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23ffffff40' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
        >
          <option value="all">Toutes les catégories</option>
          {DREAM_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Madness */}
        <select
          value={filters.madnessLevel}
          onChange={(e) => set("madnessLevel", e.target.value as DreamFilters["madnessLevel"])}
          className="bg-[#111111] border border-white/10 text-white/60 text-xs rounded-[8px] px-3 py-2 outline-none focus:border-white/30 transition-colors cursor-pointer appearance-none pr-6"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23ffffff40' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
        >
          <option value="all">Tous les niveaux</option>
          {MADNESS_LEVELS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        {/* Status */}
        <select
          value={filters.status}
          onChange={(e) => set("status", e.target.value as DreamFilters["status"])}
          className="bg-[#111111] border border-white/10 text-white/60 text-xs rounded-[8px] px-3 py-2 outline-none focus:border-white/30 transition-colors cursor-pointer appearance-none pr-6"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23ffffff40' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
        >
          <option value="all">Tous les statuts</option>
          {DREAM_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* Reset */}
        {hasActive && (
          <button
            onClick={() => onChange({ category: "all", madnessLevel: "all", status: "all" })}
            className="text-xs text-white/30 hover:text-white/60 transition-colors underline underline-offset-2"
          >
            Réinitialiser
          </button>
        )}
      </div>

      {/* Counter */}
      <p className="text-xs text-white/25">
        {hasActive ? (
          <>{filtered} rêve{filtered > 1 ? "s" : ""} sur {total}</>
        ) : (
          <>{total} rêve{total > 1 ? "s" : ""} au total</>
        )}
      </p>
    </div>
  );
}
