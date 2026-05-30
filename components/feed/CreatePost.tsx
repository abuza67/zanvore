"use client";

import { useState } from "react";
import { Image, Calendar, Briefcase } from "lucide-react";

export default function CreatePost() {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="bg-white rounded-[12px] border border-[#E5E5E5] p-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#0A0A0A] flex items-center justify-center text-white text-xs font-semibold shrink-0">
          Z
        </div>
        <button
          onClick={() => setFocused(true)}
          className="flex-1 bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#A3A3A3] text-sm text-left rounded-full px-4 py-2.5 transition-colors duration-200"
        >
          Partagez une actualité, une réflexion…
        </button>
      </div>

      {focused && (
        <div className="mt-3">
          <textarea
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Partagez une actualité, une réflexion…"
            rows={3}
            className="w-full bg-transparent text-[#0A0A0A] text-sm leading-relaxed outline-none resize-none placeholder:text-[#A3A3A3]"
          />
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F5F5F5]">
            <div className="flex items-center gap-1">
              <QuickAction icon={<Image size={16} />} label="Photo" />
              <QuickAction icon={<Calendar size={16} />} label="Événement" />
              <QuickAction icon={<Briefcase size={16} />} label="Offre" />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setFocused(false); setValue(""); }}
                className="text-xs text-[#737373] px-4 py-1.5 rounded-full hover:bg-[#F5F5F5] transition-colors"
              >
                Annuler
              </button>
              <button
                disabled={!value.trim()}
                className="text-xs bg-[#0A0A0A] text-white px-4 py-1.5 rounded-full hover:bg-[#262626] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Publier
              </button>
            </div>
          </div>
        </div>
      )}

      {!focused && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#F5F5F5]">
          <QuickAction icon={<Image size={16} />} label="Photo" />
          <QuickAction icon={<Calendar size={16} />} label="Événement" />
          <QuickAction icon={<Briefcase size={16} />} label="Offre d'emploi" />
        </div>
      )}
    </div>
  );
}

function QuickAction({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-1.5 px-3 py-2 rounded-[8px] text-xs text-[#737373] font-medium hover:bg-[#F5F5F5] hover:text-[#0A0A0A] transition-colors">
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
