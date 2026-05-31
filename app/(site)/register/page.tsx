"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, Building2, ArrowRight, Check } from "lucide-react";
import { signUp } from "@/lib/auth-client";

type AccountType = "personal" | "company" | null;
type Step = "type" | "form";

export default function RegisterPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<AccountType>(null);
  const [step, setStep] = useState<Step>("type");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    companyName: "",
    industry: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleTypeSelect(type: AccountType) {
    setAccountType(type);
  }

  function handleContinue() {
    if (accountType) setStep("form");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const name =
      accountType === "company"
        ? form.companyName
        : `${form.firstName} ${form.lastName}`.trim();

    const { error } = await signUp.email({
      email: form.email,
      password: form.password,
      name,
    });

    if (error) {
      setError(error.message ?? "Une erreur est survenue.");
      setLoading(false);
      return;
    }

    router.push("/feed");
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-[#E5E5E5] px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-[#0A0A0A] text-base font-semibold tracking-[0.12em] uppercase"
          style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
        >
          Zanvore
        </Link>
        <Link href="/login" className="text-sm text-[#737373] hover:text-[#0A0A0A] transition-colors">
          Déjà membre ?{" "}
          <span className="text-[#0A0A0A] font-medium">Se connecter</span>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            {step === "type" ? (
              <motion.div
                key="type"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-center mb-10">
                  <h1
                    className="text-3xl font-semibold text-[#0A0A0A] tracking-tight"
                    style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
                  >
                    Rejoindre Zanvore
                  </h1>
                  <p className="text-[#737373] text-sm mt-2">
                    Choisissez le type de compte qui vous correspond
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <TypeCard
                    type="personal"
                    selected={accountType === "personal"}
                    onClick={() => handleTypeSelect("personal")}
                    icon={<User size={28} strokeWidth={1.5} />}
                    title="Particulier"
                    description="Passionné de luxe, professionnel du secteur, collectionneur, HNWI"
                  />
                  <TypeCard
                    type="company"
                    selected={accountType === "company"}
                    onClick={() => handleTypeSelect("company")}
                    icon={<Building2 size={28} strokeWidth={1.5} />}
                    title="Entreprise Luxe"
                    description="Maison de couture, hôtel, galerie, marque premium, groupe de luxe"
                  />
                </div>

                <button
                  onClick={handleContinue}
                  disabled={!accountType}
                  className="w-full bg-[#0A0A0A] text-white text-sm font-medium py-3.5 rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#262626] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Continuer <ArrowRight size={15} />
                </button>

                <p className="text-center text-xs text-[#A3A3A3] mt-6 leading-relaxed">
                  En rejoignant Zanvore, vous acceptez nos{" "}
                  <Link href="/terms" className="text-[#737373] hover:text-[#0A0A0A] underline">
                    Conditions d'utilisation
                  </Link>{" "}
                  et notre{" "}
                  <Link href="/privacy" className="text-[#737373] hover:text-[#0A0A0A] underline">
                    Politique de confidentialité
                  </Link>
                  .
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <button
                    onClick={() => setStep("type")}
                    className="text-sm text-[#A3A3A3] hover:text-[#0A0A0A] transition-colors"
                  >
                    ←
                  </button>
                  <div>
                    <h1
                      className="text-2xl font-semibold text-[#0A0A0A] tracking-tight"
                      style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
                    >
                      {accountType === "company" ? "Compte Entreprise" : "Votre profil"}
                    </h1>
                    <p className="text-[#A3A3A3] text-xs mt-0.5">
                      {accountType === "company" ? "Entreprise Luxe" : "Particulier"} · Zanvore
                    </p>
                  </div>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  {accountType === "company" ? (
                    <>
                      <FormField
                        label="Nom de l'entreprise"
                        value={form.companyName}
                        onChange={(v) => setForm((f) => ({ ...f, companyName: v }))}
                        placeholder="Maison Chanel, Hôtel du Palais…"
                      />
                      <FormField
                        label="Secteur"
                        value={form.industry}
                        onChange={(v) => setForm((f) => ({ ...f, industry: v }))}
                        placeholder="Haute Couture, Hôtellerie, Joaillerie…"
                      />
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <FormField
                        label="Prénom"
                        value={form.firstName}
                        onChange={(v) => setForm((f) => ({ ...f, firstName: v }))}
                        placeholder="Élise"
                      />
                      <FormField
                        label="Nom"
                        value={form.lastName}
                        onChange={(v) => setForm((f) => ({ ...f, lastName: v }))}
                        placeholder="Moreau"
                      />
                    </div>
                  )}

                  <FormField
                    label="Adresse e-mail"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                    placeholder="vous@example.com"
                  />
                  <FormField
                    label="Mot de passe"
                    type="password"
                    value={form.password}
                    onChange={(v) => setForm((f) => ({ ...f, password: v }))}
                    placeholder="8 caractères minimum"
                  />

                  {error && (
                    <p className="text-red-500 text-xs">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full bg-[#0A0A0A] text-white text-sm font-medium py-3.5 rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#262626] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Création…" : "Créer mon compte"}
                    {!loading && <ArrowRight size={15} />}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function TypeCard({
  selected,
  onClick,
  icon,
  title,
  description,
}: {
  type: AccountType;
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-start gap-3 p-5 rounded-[12px] border-2 text-left transition-all duration-200 ${
        selected
          ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
          : "border-[#E5E5E5] bg-white text-[#0A0A0A] hover:border-[#A3A3A3]"
      }`}
    >
      {selected && (
        <span className="absolute top-3 right-3 w-5 h-5 bg-white rounded-full flex items-center justify-center">
          <Check size={11} className="text-[#0A0A0A]" />
        </span>
      )}
      <span className={selected ? "text-white" : "text-[#0A0A0A]"}>{icon}</span>
      <div>
        <p
          className="text-sm font-semibold"
          style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
        >
          {title}
        </p>
        <p className={`text-xs mt-1 leading-relaxed ${selected ? "text-white/60" : "text-[#737373]"}`}>
          {description}
        </p>
      </div>
    </button>
  );
}

function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[#0A0A0A]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        className="bg-[#F5F5F5] border border-transparent text-[#0A0A0A] text-sm rounded-[10px] px-4 py-3 outline-none focus:bg-white focus:border-[#E5E5E5] placeholder:text-[#A3A3A3] transition-all"
      />
    </div>
  );
}
