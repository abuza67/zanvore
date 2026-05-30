import Link from "next/link";
import { Building2, User } from "lucide-react";

const SUGGESTED_PROFILES = [
  {
    name: "Hermès International",
    sub: "Maison de Luxe · Paris",
    handle: "hermes-intl",
    type: "company" as const,
    initials: "HI",
  },
  {
    name: "Sophie Marchand",
    sub: "Brand Manager · Dior",
    handle: "sophie-marchand",
    type: "user" as const,
    initials: "SM",
  },
  {
    name: "Bvlgari",
    sub: "Haute Joaillerie · Rome",
    handle: "bvlgari",
    type: "company" as const,
    initials: "BV",
  },
  {
    name: "Antoine Vidal",
    sub: "Sommelier · Hôtel Plaza Athénée",
    handle: "antoine-vidal",
    type: "user" as const,
    initials: "AV",
  },
];

const TRENDING_TAGS = [
  { tag: "HauteCouture", count: "2,4k" },
  { tag: "LuxeResponsable", count: "1,1k" },
  { tag: "Horlogerie", count: "987" },
  { tag: "CarrièresLuxe", count: "743" },
  { tag: "ArtDeVivre", count: "621" },
];

export default function SuggestedSidebar() {
  return (
    <div className="flex flex-col gap-3 sticky top-20">
      {/* Profils suggérés */}
      <div className="bg-white rounded-[12px] border border-[#E5E5E5] p-4">
        <h3
          className="text-xs font-semibold text-[#0A0A0A] tracking-wide uppercase mb-3"
          style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
        >
          Suggestions
        </h3>
        <div className="flex flex-col gap-3">
          {SUGGESTED_PROFILES.map((p) => (
            <div key={p.handle} className="flex items-center gap-2.5">
              <Link href={p.type === "company" ? `/company/${p.handle}` : `/profile/${p.handle}`}>
                <div className="w-8 h-8 rounded-full bg-[#0A0A0A] flex items-center justify-center text-white text-[10px] font-semibold shrink-0">
                  {p.initials}
                </div>
              </Link>
              <div className="flex-1 min-w-0">
                <Link
                  href={p.type === "company" ? `/company/${p.handle}` : `/profile/${p.handle}`}
                  className="flex items-center gap-1"
                >
                  <span className="text-xs font-medium text-[#0A0A0A] hover:underline truncate">
                    {p.name}
                  </span>
                  {p.type === "company" ? (
                    <Building2 size={10} className="text-[#A3A3A3] shrink-0" />
                  ) : (
                    <User size={10} className="text-[#A3A3A3] shrink-0" />
                  )}
                </Link>
                <p className="text-[10px] text-[#A3A3A3] truncate">{p.sub}</p>
              </div>
              <button className="text-[10px] text-[#0A0A0A] border border-[#0A0A0A] rounded-full px-2.5 py-0.5 hover:bg-[#0A0A0A] hover:text-white transition-colors shrink-0">
                +
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tendances */}
      <div className="bg-white rounded-[12px] border border-[#E5E5E5] p-4">
        <h3
          className="text-xs font-semibold text-[#0A0A0A] tracking-wide uppercase mb-3"
          style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
        >
          Tendances
        </h3>
        <div className="flex flex-col gap-2">
          {TRENDING_TAGS.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/explore?tag=${tag}`}
              className="flex items-center justify-between group"
            >
              <span className="text-xs text-[#737373] group-hover:text-[#0A0A0A] transition-colors">
                #{tag}
              </span>
              <span className="text-[10px] text-[#A3A3A3]">{count}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
