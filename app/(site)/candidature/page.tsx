import { Metadata } from "next";
import MultiStepForm from "@/components/candidature/MultiStepForm";

export const metadata: Metadata = {
  title: "Candidature — Zanvore",
  description: "Déposez votre candidature pour rejoindre le réseau Zanvore.",
};

export default function CandidaturePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header page */}
      <div className="pt-36 pb-20 px-6 md:px-12 border-b border-foreground/8">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="text-foreground/30 text-xs tracking-[0.25em] uppercase">
            Candidature
          </span>
          <h1
            className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05]"
            style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
          >
            Rejoindre Zanvore.
          </h1>
          <p className="text-foreground/50 text-base leading-relaxed max-w-md">
            Chaque dossier est examiné individuellement. Soyez précis, authentique —
            c'est ce qui fait la différence.
          </p>
        </div>
      </div>

      {/* Formulaire */}
      <div className="px-6 md:px-12 py-20">
        <MultiStepForm />
      </div>
    </div>
  );
}
