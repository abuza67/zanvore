"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Trash2, CheckSquare, Square } from "lucide-react";
import {
  DREAM_CATEGORIES,
  DREAM_STATUSES,
  MADNESS_LEVELS,
  Dream,
  DreamInsert,
  Milestone,
} from "@/types/dreams";

interface AddDreamModalProps {
  open: boolean;
  editDream?: Dream | null;
  onClose: () => void;
  onSave: (data: DreamInsert) => void;
}

const empty: DreamInsert = {
  title: "",
  description: "",
  main_category: "Exploration & Voyages",
  secondary_categories: [],
  madness_level: "Simple",
  status: "À faire",
  milestones: [],
  desired_deadline: "",
};

export default function AddDreamModal({ open, editDream, onClose, onSave }: AddDreamModalProps) {
  const [form, setForm] = useState<DreamInsert>(empty);
  const [newMilestone, setNewMilestone] = useState("");
  const [newMilestoneDeadline, setNewMilestoneDeadline] = useState("");

  useEffect(() => {
    if (editDream) {
      setForm({
        title: editDream.title,
        description: editDream.description ?? "",
        main_category: editDream.main_category,
        secondary_categories: editDream.secondary_categories ?? [],
        madness_level: editDream.madness_level,
        status: editDream.status,
        milestones: editDream.milestones ?? [],
        desired_deadline: editDream.desired_deadline ?? "",
      });
    } else {
      setForm(empty);
    }
    setNewMilestone("");
    setNewMilestoneDeadline("");
  }, [editDream, open]);

  function set<K extends keyof DreamInsert>(key: K, value: DreamInsert[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function addMilestone() {
    if (!newMilestone.trim()) return;
    const m: Milestone = {
      id: crypto.randomUUID(),
      title: newMilestone.trim(),
      done: false,
      ...(newMilestoneDeadline ? { deadline: newMilestoneDeadline } : {}),
    };
    set("milestones", [...(form.milestones ?? []), m]);
    setNewMilestone("");
    setNewMilestoneDeadline("");
  }

  function toggleMilestone(id: string) {
    set(
      "milestones",
      (form.milestones ?? []).map((m) => (m.id === id ? { ...m, done: !m.done } : m))
    );
  }

  function removeMilestone(id: string) {
    set("milestones", (form.milestones ?? []).filter((m) => m.id !== id));
  }

  function toggleSecondary(cat: string) {
    const current = form.secondary_categories ?? [];
    const isSelected = current.includes(cat as never);
    set(
      "secondary_categories",
      isSelected ? current.filter((c) => c !== cat) : [...current, cat as never]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave(form);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-[#0d0d0d] border border-white/10 rounded-[16px] w-full max-w-xl max-h-[90vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/8">
                <h2
                  className="text-white text-lg font-medium"
                  style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
                >
                  {editDream ? "Modifier le rêve" : "Nouveau rêve"}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-md text-white/40 hover:text-white/70 hover:bg-white/8 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-5">
                {/* Titre */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/40 uppercase tracking-wide">
                    Titre <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => set("title", e.target.value)}
                    placeholder="Quel est ce rêve ?"
                    required
                    className="bg-[#111111] border border-white/10 text-white text-sm rounded-[8px] px-4 py-3 outline-none focus:border-white/30 placeholder:text-white/20 transition-colors"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/40 uppercase tracking-wide">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="Décris ce rêve…"
                    rows={3}
                    className="bg-[#111111] border border-white/10 text-white text-sm rounded-[8px] px-4 py-3 outline-none focus:border-white/30 placeholder:text-white/20 transition-colors resize-none"
                  />
                </div>

                {/* Catégorie principale */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/40 uppercase tracking-wide">
                    Catégorie principale <span className="text-[#D4AF37]">*</span>
                  </label>
                  <select
                    value={form.main_category}
                    onChange={(e) => set("main_category", e.target.value as DreamInsert["main_category"])}
                    className="bg-[#111111] border border-white/10 text-white text-sm rounded-[8px] px-4 py-3 outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer"
                  >
                    {DREAM_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Catégories secondaires */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-white/40 uppercase tracking-wide">
                    Catégories secondaires
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {DREAM_CATEGORIES.filter((c) => c !== form.main_category).map((cat) => {
                      const selected = (form.secondary_categories ?? []).includes(cat as never);
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => toggleSecondary(cat)}
                          className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors duration-200 ${
                            selected
                              ? "border-[#D4AF37]/60 text-[#D4AF37] bg-[#D4AF37]/8"
                              : "border-white/10 text-white/30 hover:border-white/20 hover:text-white/50"
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Niveau de folie + Statut */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-white/40 uppercase tracking-wide">Niveau de folie</label>
                    <select
                      value={form.madness_level}
                      onChange={(e) => set("madness_level", e.target.value as DreamInsert["madness_level"])}
                      className="bg-[#111111] border border-white/10 text-white text-sm rounded-[8px] px-3 py-2.5 outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer"
                    >
                      {MADNESS_LEVELS.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-white/40 uppercase tracking-wide">Statut</label>
                    <select
                      value={form.status}
                      onChange={(e) => set("status", e.target.value as DreamInsert["status"])}
                      className="bg-[#111111] border border-white/10 text-white text-sm rounded-[8px] px-3 py-2.5 outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer"
                    >
                      {DREAM_STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date limite */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/40 uppercase tracking-wide">Objectif de date</label>
                  <input
                    type="date"
                    value={form.desired_deadline}
                    onChange={(e) => set("desired_deadline", e.target.value)}
                    className="bg-[#111111] border border-white/10 text-white/60 text-sm rounded-[8px] px-4 py-3 outline-none focus:border-white/30 transition-colors [color-scheme:dark]"
                  />
                </div>

                {/* Milestones */}
                <div className="flex flex-col gap-3">
                  <label className="text-xs text-white/40 uppercase tracking-wide">Étapes (milestones)</label>

                  {(form.milestones ?? []).length > 0 && (
                    <ul className="flex flex-col gap-1.5">
                      {(form.milestones ?? []).map((m) => (
                        <li key={m.id} className="flex items-center gap-2 group/m">
                          <button
                            type="button"
                            onClick={() => toggleMilestone(m.id)}
                            className="text-white/30 hover:text-[#D4AF37] transition-colors shrink-0"
                          >
                            {m.done ? <CheckSquare size={14} className="text-emerald-400" /> : <Square size={14} />}
                          </button>
                          <span className={`text-sm flex-1 ${m.done ? "line-through text-white/25" : "text-white/60"}`}>
                            {m.title}
                          </span>
                          {m.deadline && (
                            <span className="text-[10px] text-white/25">{m.deadline}</span>
                          )}
                          <button
                            type="button"
                            onClick={() => removeMilestone(m.id)}
                            className="opacity-0 group-hover/m:opacity-100 text-white/25 hover:text-red-400 transition-all"
                          >
                            <Trash2 size={12} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Add milestone */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMilestone}
                      onChange={(e) => setNewMilestone(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addMilestone())}
                      placeholder="Nouvelle étape…"
                      className="flex-1 bg-[#111111] border border-white/8 text-white text-sm rounded-[8px] px-3 py-2 outline-none focus:border-white/20 placeholder:text-white/15 transition-colors"
                    />
                    <input
                      type="date"
                      value={newMilestoneDeadline}
                      onChange={(e) => setNewMilestoneDeadline(e.target.value)}
                      className="w-36 bg-[#111111] border border-white/8 text-white/40 text-sm rounded-[8px] px-3 py-2 outline-none focus:border-white/20 transition-colors [color-scheme:dark]"
                    />
                    <button
                      type="button"
                      onClick={addMilestone}
                      className="p-2 rounded-[8px] bg-white/8 text-white/40 hover:text-white/70 hover:bg-white/12 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2 border-t border-white/8">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 rounded-[8px] border border-white/10 text-white/50 text-sm hover:border-white/20 hover:text-white/70 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-[8px] bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
                  >
                    {editDream ? "Enregistrer" : "Créer le rêve"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
