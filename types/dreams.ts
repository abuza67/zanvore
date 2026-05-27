export type MadnessLevel = "Simple" | "Ambitieux" | "Fou";

export type DreamStatus = "À faire" | "En cours" | "Réalisé" | "En pause";

export type DreamCategory =
  | "Exploration & Voyages"
  | "Vie & Équilibre"
  | "Empire & Réalisations"
  | "Création & Expression"
  | "Connexion & Relations"
  | "Aventure & Défis"
  | "Bien-être & Vitalité"
  | "Spiritualité & Conscience"
  | "Famille & Héritage Personnel"
  | "Expériences Sensorielles"
  | "Apprentissage & Transformation"
  | "Impact & Contribution";

export const DREAM_CATEGORIES: DreamCategory[] = [
  "Exploration & Voyages",
  "Vie & Équilibre",
  "Empire & Réalisations",
  "Création & Expression",
  "Connexion & Relations",
  "Aventure & Défis",
  "Bien-être & Vitalité",
  "Spiritualité & Conscience",
  "Famille & Héritage Personnel",
  "Expériences Sensorielles",
  "Apprentissage & Transformation",
  "Impact & Contribution",
];

export const MADNESS_LEVELS: MadnessLevel[] = ["Simple", "Ambitieux", "Fou"];

export const DREAM_STATUSES: DreamStatus[] = [
  "À faire",
  "En cours",
  "Réalisé",
  "En pause",
];

export interface Milestone {
  id: string;
  title: string;
  done: boolean;
  deadline?: string;
}

export interface Dream {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  main_category: DreamCategory;
  secondary_categories?: DreamCategory[];
  madness_level: MadnessLevel;
  status: DreamStatus;
  milestones?: Milestone[];
  desired_deadline?: string;
  created_at: string;
  updated_at: string;
}

export type DreamInsert = Omit<Dream, "id" | "user_id" | "created_at" | "updated_at">;

export interface DreamFilters {
  category: DreamCategory | "all";
  madnessLevel: MadnessLevel | "all";
  status: DreamStatus | "all";
}
