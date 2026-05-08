"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface FormData {
  // Étape 1
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  pays: string;
  age: string;
  // Étape 2
  profession: string;
  entreprise: string;
  realisations: string;
  parcours: string;
  // Étape 3
  valeurs: string;
  vision_legacy: string;
  pourquoi_zanvore: string;
  // Étape 4
  domaine_patrimoine: string;
  motivations: string;
  referent: string;
}

const INITIAL: FormData = {
  prenom: "", nom: "", email: "", telephone: "", pays: "", age: "",
  profession: "", entreprise: "", realisations: "", parcours: "",
  valeurs: "", vision_legacy: "", pourquoi_zanvore: "",
  domaine_patrimoine: "", motivations: "", referent: "",
};

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const STEPS = [
  "Informations personnelles",
  "Réalisations & parcours",
  "Valeurs & vision",
  "Patrimoine & motivations",
];

/* ─── Composant principal ────────────────────────────────────────────────── */
export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setData((prev) => ({ ...prev, [field]: e.target.value }));

  const next = () => { setDirection(1); setStep((s) => s + 1); };
  const prev = () => { setDirection(-1); setStep((s) => s - 1); };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: envoyer à l'API / base de données
    console.log("Candidature soumise :", data);
    setSubmitted(true);
  };

  if (submitted) return <SuccessScreen />;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Barre de progression */}
      <ProgressBar step={step} total={STEPS.length} />

      {/* Label étape */}
      <div className="flex items-center gap-3 mb-10">
        <span className="text-foreground/30 text-xs tracking-[0.2em] uppercase">
          {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
        </span>
        <span className="w-px h-3 bg-foreground/20" />
        <span className="text-foreground/50 text-xs tracking-wide">{STEPS[step]}</span>
      </div>

      {/* Contenu de l'étape */}
      <form onSubmit={submit}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {step === 0 && <Step1 data={data} set={set} />}
            {step === 1 && <Step2 data={data} set={set} />}
            {step === 2 && <Step3 data={data} set={set} />}
            {step === 3 && <Step4 data={data} set={set} />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-14">
          {step > 0 ? (
            <button
              type="button"
              onClick={prev}
              className="flex items-center gap-2 text-foreground/40 hover:text-foreground text-sm transition-colors duration-300"
            >
              <ArrowLeft size={15} />
              Retour
            </button>
          ) : (
            <span />
          )}

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="group flex items-center gap-3 bg-black text-white text-sm font-medium px-7 py-3 rounded-[8px] hover:bg-black/80 transition-colors duration-300"
            >
              Continuer
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          ) : (
            <button
              type="submit"
              className="group flex items-center gap-3 bg-black text-white text-sm font-medium px-7 py-3 rounded-[8px] hover:bg-black/80 transition-colors duration-300"
            >
              Soumettre ma candidature
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

/* ─── Barre de progression ──────────────────────────────────────────────── */
function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex gap-1.5 mb-14">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className="h-px flex-1 bg-foreground/10 overflow-hidden rounded-full"
        >
          <motion.div
            className="h-full bg-foreground"
            initial={false}
            animate={{ scaleX: i <= step ? 1 : 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Champ réutilisable ────────────────────────────────────────────────── */
function Field({
  label, required, children,
}: {
  label: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-foreground/70 text-sm font-normal">
        {label} {required && <span className="text-foreground/30">*</span>}
      </Label>
      {children}
    </div>
  );
}

const inputClass =
  "bg-transparent border-0 border-b border-foreground/15 rounded-none px-0 py-2 text-sm text-foreground placeholder:text-foreground/25 focus-visible:ring-0 focus-visible:border-foreground/50 transition-colors duration-300";

/* ─── Étape 1 ───────────────────────────────────────────────────────────── */
function Step1({ data, set }: { data: FormData; set: (f: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }) {
  return (
    <div className="space-y-8">
      <StepTitle>Qui êtes-vous ?</StepTitle>
      <div className="grid grid-cols-2 gap-6">
        <Field label="Prénom" required>
          <Input value={data.prenom} onChange={set("prenom")} placeholder="Jean" className={inputClass} required />
        </Field>
        <Field label="Nom" required>
          <Input value={data.nom} onChange={set("nom")} placeholder="Dumont" className={inputClass} required />
        </Field>
      </div>
      <Field label="Email" required>
        <Input type="email" value={data.email} onChange={set("email")} placeholder="jean@exemple.com" className={inputClass} required />
      </Field>
      <div className="grid grid-cols-2 gap-6">
        <Field label="Téléphone">
          <Input value={data.telephone} onChange={set("telephone")} placeholder="+33 6 00 00 00 00" className={inputClass} />
        </Field>
        <Field label="Pays de résidence" required>
          <Input value={data.pays} onChange={set("pays")} placeholder="France" className={inputClass} required />
        </Field>
      </div>
      <Field label="Âge">
        <Input type="number" value={data.age} onChange={set("age")} placeholder="38" min={18} max={99} className={inputClass} />
      </Field>
    </div>
  );
}

/* ─── Étape 2 ───────────────────────────────────────────────────────────── */
function Step2({ data, set }: { data: FormData; set: (f: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }) {
  return (
    <div className="space-y-8">
      <StepTitle>Votre parcours</StepTitle>
      <div className="grid grid-cols-2 gap-6">
        <Field label="Profession" required>
          <Input value={data.profession} onChange={set("profession")} placeholder="Fondateur / CEO" className={inputClass} required />
        </Field>
        <Field label="Entreprise / Organisation">
          <Input value={data.entreprise} onChange={set("entreprise")} placeholder="Nom de votre structure" className={inputClass} />
        </Field>
      </div>
      <Field label="Vos principales réalisations" required>
        <Textarea
          value={data.realisations}
          onChange={set("realisations")}
          placeholder="Ce dont vous êtes le plus fier — projets, impacts, créations…"
          rows={4}
          className={`${inputClass} resize-none`}
          required
        />
      </Field>
      <Field label="Votre parcours en quelques lignes" required>
        <Textarea
          value={data.parcours}
          onChange={set("parcours")}
          placeholder="D'où venez-vous ? Qu'est-ce qui vous a amené là où vous êtes ?"
          rows={4}
          className={`${inputClass} resize-none`}
          required
        />
      </Field>
    </div>
  );
}

/* ─── Étape 3 ───────────────────────────────────────────────────────────── */
function Step3({ data, set }: { data: FormData; set: (f: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }) {
  return (
    <div className="space-y-8">
      <StepTitle>Ce qui vous guide</StepTitle>
      <Field label="Vos valeurs fondamentales" required>
        <Textarea
          value={data.valeurs}
          onChange={set("valeurs")}
          placeholder="Quels principes guident vos décisions au quotidien ?"
          rows={4}
          className={`${inputClass} resize-none`}
          required
        />
      </Field>
      <Field label="Votre vision de l'héritage" required>
        <Textarea
          value={data.vision_legacy}
          onChange={set("vision_legacy")}
          placeholder="Ce que vous souhaitez laisser derrière vous — à votre famille, à votre secteur, au monde…"
          rows={4}
          className={`${inputClass} resize-none`}
          required
        />
      </Field>
      <Field label="Pourquoi Zanvore ?" required>
        <Textarea
          value={data.pourquoi_zanvore}
          onChange={set("pourquoi_zanvore")}
          placeholder="Qu'est-ce qui vous attire dans ce réseau ? Qu'espérez-vous y trouver ?"
          rows={3}
          className={`${inputClass} resize-none`}
          required
        />
      </Field>
    </div>
  );
}

/* ─── Étape 4 ───────────────────────────────────────────────────────────── */
function Step4({ data, set }: { data: FormData; set: (f: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }) {
  return (
    <div className="space-y-8">
      <StepTitle>Votre univers</StepTitle>
      <Field label="Domaine patrimonial (optionnel)">
        <Input
          value={data.domaine_patrimoine}
          onChange={set("domaine_patrimoine")}
          placeholder="Immobilier, art, finance, entreprise familiale…"
          className={inputClass}
        />
      </Field>
      <Field label="Vos motivations profondes" required>
        <Textarea
          value={data.motivations}
          onChange={set("motivations")}
          placeholder="Qu'est-ce qui vous motive à vous lever chaque matin ? Quelle est votre ambition ultime ?"
          rows={5}
          className={`${inputClass} resize-none`}
          required
        />
      </Field>
      <Field label="Référent Zanvore (optionnel)">
        <Input
          value={data.referent}
          onChange={set("referent")}
          placeholder="Nom du membre qui vous recommande, si vous en avez un"
          className={inputClass}
        />
      </Field>
    </div>
  );
}

/* ─── Titre d'étape ─────────────────────────────────────────────────────── */
function StepTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-foreground mb-2"
      style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
    >
      {children}
    </h2>
  );
}

/* ─── Écran de succès ───────────────────────────────────────────────────── */
function SuccessScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="w-full max-w-2xl mx-auto text-center py-16 space-y-8"
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-foreground/15">
        <Check size={22} className="text-foreground" />
      </div>
      <div className="space-y-3">
        <h2
          className="text-3xl md:text-4xl font-semibold tracking-[-0.02em]"
          style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
        >
          Candidature reçue.
        </h2>
        <p className="text-foreground/50 text-base leading-relaxed max-w-sm mx-auto">
          Notre équipe étudie chaque dossier avec attention. Vous recevrez une réponse
          sous 15 jours à l'adresse indiquée.
        </p>
      </div>
    </motion.div>
  );
}
