import { Metadata } from "next";
import FeedSidebar from "@/components/feed/FeedSidebar";
import PostCard from "@/components/feed/PostCard";
import CreatePost from "@/components/feed/CreatePost";
import SuggestedSidebar from "@/components/feed/SuggestedSidebar";

export const metadata: Metadata = {
  title: "Fil d'actualité — Zanvore",
};

const MOCK_POSTS = [
  {
    id: "1",
    author: {
      name: "Maison Chanel",
      handle: "chanel-official",
      type: "company" as const,
      tagline: "Maison de Couture · Paris",
      initials: "CH",
    },
    content:
      "Notre Collection Haute Couture Automne-Hiver 2026 sera dévoilée en avant-première exclusive aux membres Zanvore le 12 juin, au Grand Palais Éphémère. Une invitation au voyage dans l'intemporel.",
    image: null,
    likes: 1284,
    comments: 47,
    shares: 93,
    time: "1h",
    tags: ["HauteCouture", "Chanel"],
  },
  {
    id: "2",
    author: {
      name: "Élise Moreau",
      handle: "elise-moreau",
      type: "user" as const,
      tagline: "Directrice Artistique · LVMH",
      initials: "EM",
    },
    content:
      "Trois jours au Salon du Meuble de Milan. Ce qui m'a frappée cette année : le retour du marbre brut, de l'or mat et des formes organiques asymétriques. Le luxe se réinvente dans l'imperfection maîtrisée.",
    image: null,
    likes: 432,
    comments: 28,
    shares: 14,
    time: "3h",
    tags: ["Design", "Luxe", "Milan"],
  },
  {
    id: "3",
    author: {
      name: "Hôtel du Cap-Eden-Roc",
      handle: "cap-eden-roc",
      type: "company" as const,
      tagline: "Palace · Antibes, Côte d'Azur",
      initials: "CE",
    },
    content:
      "Cet été, nous inaugurons Le Pavillon Privé — six suites exclusives avec accès direct à la mer et service de conciergerie 24h. Disponibilités limitées pour la saison 2026.",
    image: null,
    likes: 2107,
    comments: 89,
    shares: 241,
    time: "5h",
    tags: ["Hospitalité", "CôteDAzur", "Exclusif"],
  },
  {
    id: "4",
    author: {
      name: "Maxime Leclerc",
      handle: "maxime-leclerc",
      type: "user" as const,
      tagline: "Horloger indépendant · Genève",
      initials: "ML",
    },
    content:
      "Après dix-huit mois de travail, ma première pièce solo est terminée. Un tourbillon ultra-plat en titane grade 5, cadran en émail grand feu. Tirage unique. Les collectionneurs intéressés peuvent me contacter en direct.",
    image: null,
    likes: 891,
    comments: 63,
    shares: 37,
    time: "8h",
    tags: ["Horlogerie", "Manufacture", "Collection"],
  },
  {
    id: "5",
    author: {
      name: "Kering",
      handle: "kering",
      type: "company" as const,
      tagline: "Groupe de Luxe · Paris",
      initials: "KR",
    },
    content:
      "Nous recherchons un(e) Directeur(trice) de la Stratégie Digitale pour accompagner la transformation de nos Maisons. Poste basé à Paris, niveau Groupe. Candidatures via la section Carrières Zanvore.",
    image: null,
    likes: 654,
    comments: 112,
    shares: 205,
    time: "12h",
    tags: ["Carrières", "Kering", "Luxe"],
  },
];

export default function FeedPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[240px_1fr_260px] gap-5">
        {/* Sidebar gauche */}
        <aside className="hidden md:block">
          <FeedSidebar />
        </aside>

        {/* Feed principal */}
        <div className="flex flex-col gap-3">
          <CreatePost />
          {MOCK_POSTS.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Sidebar droite */}
        <aside className="hidden lg:block">
          <SuggestedSidebar />
        </aside>
      </div>
    </div>
  );
}
