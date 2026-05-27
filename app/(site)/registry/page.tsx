"use client";

import { useEffect, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { dreamsStore } from "@/lib/dreams-store";
import { Dream, DreamFilters, DreamInsert } from "@/types/dreams";
import DreamCard from "@/components/registry/DreamCard";
import DreamFiltersBar from "@/components/registry/DreamFilters";
import AddDreamModal from "@/components/registry/AddDreamModal";

const DEFAULT_FILTERS: DreamFilters = {
  category: "all",
  madnessLevel: "all",
  status: "all",
};

export default function RegistryPage() {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [filters, setFilters] = useState<DreamFilters>(DEFAULT_FILTERS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editDream, setEditDream] = useState<Dream | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDreams(dreamsStore.getAll());
    setMounted(true);
  }, []);

  function refresh() {
    setDreams(dreamsStore.getAll());
  }

  function handleSave(data: DreamInsert) {
    if (editDream) {
      dreamsStore.update(editDream.id, data);
    } else {
      dreamsStore.create(data);
    }
    refresh();
    setModalOpen(false);
    setEditDream(null);
  }

  function handleEdit(dream: Dream) {
    setEditDream(dream);
    setModalOpen(true);
  }

  function handleDelete(id: string) {
    dreamsStore.delete(id);
    refresh();
  }

  function openAdd() {
    setEditDream(null);
    setModalOpen(true);
  }

  const filtered = useMemo(() => {
    return dreams.filter((d) => {
      if (filters.category !== "all" && d.main_category !== filters.category) return false;
      if (filters.madnessLevel !== "all" && d.madness_level !== filters.madnessLevel) return false;
      if (filters.status !== "all" && d.status !== filters.status) return false;
      return true;
    });
  }, [dreams, filters]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2"
        >
          <p className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase">
            Registre des Mille Rêves
          </p>
          <h1
            className="text-white text-3xl md:text-4xl font-medium"
            style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui", letterSpacing: "-0.02em" }}
          >
            Vos rêves
          </h1>
          <p className="text-white/40 text-sm max-w-md">
            Une vie. Mille rêves. Organisez, tracez, réalisez chacun d&apos;eux.
          </p>
        </motion.div>

        {/* Filters */}
        {dreams.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <DreamFiltersBar
              filters={filters}
              onChange={setFilters}
              total={dreams.length}
              filtered={filtered.length}
            />
          </motion.div>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((dream) => (
                <DreamCard
                  key={dream.id}
                  dream={dream}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : dreams.length === 0 ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-4 py-32 text-center"
          >
            <div className="w-16 h-16 rounded-full border border-white/8 flex items-center justify-center">
              <span className="text-2xl opacity-30">✦</span>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-white/50 text-sm">Aucun rêve encore listé.</p>
              <p className="text-white/25 text-xs">Commencez par en ajouter un.</p>
            </div>
          </motion.div>
        ) : (
          /* No match */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center text-white/30 text-sm"
          >
            Aucun rêve ne correspond à ces filtres.
          </motion.div>
        )}
      </div>

      {/* FAB */}
      <motion.button
        onClick={openAdd}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-8 flex items-center gap-2.5 bg-white text-black text-sm font-medium pl-4 pr-5 py-3.5 rounded-full shadow-2xl hover:bg-white/95 transition-colors z-40"
      >
        <Plus size={16} />
        Nouveau rêve
      </motion.button>

      {/* Modal */}
      <AddDreamModal
        open={modalOpen}
        editDream={editDream}
        onClose={() => { setModalOpen(false); setEditDream(null); }}
        onSave={handleSave}
      />
    </div>
  );
}
