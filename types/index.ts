export type CandidatureStatus = "en_revue" | "accepte" | "refuse";

export interface Candidature {
  id: string;
  created_at: string;
  status: CandidatureStatus;

  // Étape 1 — Informations personnelles
  prenom: string;
  nom: string;
  email: string;
  telephone?: string;
  pays: string;
  age?: number;

  // Étape 2 — Réalisations & parcours
  profession: string;
  entreprise?: string;
  realisations: string;
  parcours: string;

  // Étape 3 — Valeurs & vision legacy
  valeurs: string;
  vision_legacy: string;
  pourquoi_zanvore: string;

  // Étape 4 — Patrimoine & motivations
  domaine_patrimoine?: string;
  motivations: string;
  referent?: string;
}
