"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Mot de passe incorrect.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="w-full max-w-sm space-y-10"
      >
        {/* Logo */}
        <div className="space-y-2">
          <p className="text-white/30 text-xs tracking-[0.25em] uppercase">Zanvore</p>
          <h1
            className="text-3xl font-semibold text-white tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
          >
            Accès admin
          </h1>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-white/40 text-xs tracking-wide">Mot de passe</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-transparent border-0 border-b border-white/15 rounded-none px-0 py-2 text-sm text-white placeholder:text-white/20 focus-visible:ring-0 focus-visible:border-white/40 transition-colors pr-8"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-xs"
              >
                {error}
              </motion.p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group w-full flex items-center justify-center gap-3 bg-white text-black text-sm font-medium py-3 rounded-[8px] hover:bg-white/90 transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? "Connexion…" : "Accéder au back-office"}
            {!loading && (
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
