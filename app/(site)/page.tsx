"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Globe, Calendar, Crown } from "lucide-react";

/* ─── Variants d'animation ─────────────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

const fadeLine = {
  hidden: { scaleX: 0 },
  visible: (delay = 0) => ({
    scaleX: 1,
    transition: { duration: 1.2, ease: EASE, delay },
  }),
};

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-background text-foreground overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      >
        {/* Grain de fond */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "200px",
          }}
        />

        {/* Lumière ambiante subtile */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12"
        >
          {/* Label */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="flex items-center gap-3 mb-16 md:mb-20"
          >
            <motion.span
              variants={fadeLine}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="block h-px w-8 bg-white/30 origin-left"
            />
            <span className="text-white/40 text-xs tracking-[0.25em] uppercase font-medium">
              Réseau exclusif
            </span>
          </motion.div>

          {/* Titre principal — décalage asymétrique */}
          <div className="space-y-2 md:space-y-4">
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-white"
              style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
            >
              One Life.
            </motion.h1>
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.35}
              className="text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-white md:pl-[8vw]"
              style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
            >
              Thousand Dreams.
            </motion.h1>
          </div>

          {/* Sous-titre */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="mt-10 md:mt-14 text-white/50 text-base md:text-lg leading-relaxed max-w-md md:ml-auto"
          >
            Zanvore réunit ceux qui refusent l'ordinaire. Un réseau fondé sur
            l'excellence, la vision et l'art de vivre sans compromis.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.65}
            className="mt-12 md:mt-16 flex items-center gap-6"
          >
            <Link
              href="/candidature"
              className="group flex items-center gap-3 bg-white text-black text-sm font-medium px-7 py-3.5 rounded-[8px] hover:bg-white/90 transition-colors duration-500"
            >
              Déposer ma candidature
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-500"
              />
            </Link>
            <a
              href="#vision"
              className="text-white/40 hover:text-white/70 text-sm transition-colors duration-300"
            >
              Découvrir
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── VISION ───────────────────────────────────────────────────────── */}
      <section id="vision" className="py-32 md:py-48 px-6 md:px-12 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
            className="flex items-center gap-3 mb-16"
          >
            <Sparkles size={14} className="text-foreground/30" />
            <span className="text-foreground/40 text-xs tracking-[0.25em] uppercase">Vision</span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={0.1}
            >
              <h2
                className="text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground"
                style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
              >
                L'excellence n'est pas un statut. C'est un choix quotidien.
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={0.25}
              className="space-y-6 pt-2 md:pt-6"
            >
              <p className="text-foreground/60 text-base leading-relaxed">
                Zanvore est un espace fermé, fondé sur la co-optation et la sélection. Chaque
                membre est choisi pour ce qu'il construit, ce qu'il transmet, et la façon dont
                il envisage son héritage.
              </p>
              <p className="text-foreground/60 text-base leading-relaxed">
                Ici, pas de performance artificielle. Juste des individus qui vivent pleinement,
                décident librement, et créent quelque chose qui durera.
              </p>

              <motion.div
                variants={fadeLine}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.4}
                className="h-px bg-foreground/10 origin-left mt-8"
              />

              <div className="grid grid-cols-2 gap-6 pt-2">
                <Stat value="100%" label="Sélection sur dossier" />
                <Stat value="Privé" label="Réseau fermé & confidentiel" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DREAM ARCHITECT TEASER ───────────────────────────────────────── */}
      <section
        id="dream-architect"
        className="py-32 md:py-48 px-6 md:px-12 bg-black text-white overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
            className="flex items-center gap-3 mb-16"
          >
            <Globe size={14} className="text-white/30" />
            <span className="text-white/40 text-xs tracking-[0.25em] uppercase">Dream Architect</span>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0.1}
            className="max-w-3xl"
          >
            <h2
              className="text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] mb-10"
              style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
            >
              Votre vision mérite un architecte.
            </h2>
            <p className="text-white/50 text-base md:text-lg leading-relaxed mb-12">
              Dream Architect est l'outil de co-construction exclusif de Zanvore. Il vous aide
              à formaliser vos ambitions, identifier vos leviers, et tracer la voie vers un
              héritage qui vous ressemble.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0.3}
            className="grid md:grid-cols-3 gap-px bg-white/10"
          >
            {[
              { title: "Clarté", desc: "Définissez ce qui compte vraiment pour vous." },
              { title: "Stratégie", desc: "Construisez un plan d'action cohérent avec vos valeurs." },
              { title: "Héritage", desc: "Pensez à ce que vous laissez derrière vous." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.1 * i}
                className="bg-black p-8 md:p-10 space-y-3"
              >
                <span className="text-white/20 text-xs tracking-widest uppercase">
                  0{i + 1}
                </span>
                <h3
                  className="text-white text-xl font-medium"
                  style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
                >
                  {item.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.4}
            className="mt-10 text-white/30 text-sm"
          >
            Disponible aux membres — bientôt
          </motion.p>
        </div>
      </section>

      {/* ── ÉVÉNEMENTS ───────────────────────────────────────────────────── */}
      <section id="evenements" className="py-32 md:py-48 px-6 md:px-12 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
            className="flex items-center gap-3 mb-16"
          >
            <Calendar size={14} className="text-foreground/30" />
            <span className="text-foreground/40 text-xs tracking-[0.25em] uppercase">Événements</span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={0.1}
            >
              <h2
                className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
              >
                Des rencontres qui changent la trajectoire.
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={0.25}
              className="space-y-8"
            >
              {[
                { lieu: "Paris", type: "Dîner privé", date: "Sur invitation" },
                { lieu: "Genève", type: "Conférence fermée", date: "Sur invitation" },
                { lieu: "Dubai", type: "Retraite annuelle", date: "Sur invitation" },
              ].map((evt, i) => (
                <motion.div
                  key={evt.lieu}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.1 * i}
                  className="flex items-center justify-between py-5 border-b border-foreground/8"
                >
                  <div>
                    <p className="font-medium text-foreground">{evt.lieu}</p>
                    <p className="text-foreground/50 text-sm mt-0.5">{evt.type}</p>
                  </div>
                  <span className="text-foreground/30 text-xs tracking-wider uppercase">
                    {evt.date}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── LEGACY ───────────────────────────────────────────────────────── */}
      <section className="py-32 md:py-48 px-6 md:px-12 bg-accent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
            className="flex items-center gap-3 mb-16"
          >
            <Crown size={14} className="text-foreground/30" />
            <span className="text-foreground/40 text-xs tracking-[0.25em] uppercase">Legacy</span>
          </motion.div>

          <motion.blockquote
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0.1}
            className="max-w-3xl"
          >
            <p
              className="text-[clamp(1.5rem,4vw,3rem)] font-medium leading-[1.2] tracking-[-0.02em] text-foreground"
              style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
            >
              "Ce que vous construisez aujourd'hui est l'héritage de demain. Zanvore est
              l'espace où cette construction devient collective."
            </p>
          </motion.blockquote>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
      <section className="py-40 md:py-56 px-6 md:px-12 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
            className="text-white/40 text-xs tracking-[0.25em] uppercase mb-10"
          >
            Zanvore
          </motion.p>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0.1}
            className="text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.03em] mb-12"
            style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
          >
            Prêt à vivre autrement ?
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0.2}
            className="text-white/50 text-base leading-relaxed mb-14 max-w-md mx-auto"
          >
            Les candidatures sont ouvertes à ceux qui savent ce qu'ils veulent laisser derrière eux.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0.3}
          >
            <Link
              href="/candidature"
              className="group inline-flex items-center gap-3 bg-white text-black text-sm font-medium px-8 py-4 rounded-[8px] hover:bg-white/90 transition-colors duration-500"
            >
              Déposer ma candidature
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-500"
              />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

/* ─── Sous-composants ──────────────────────────────────────────────────── */
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="space-y-1">
      <p
        className="text-2xl font-semibold text-foreground tracking-tight"
        style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
      >
        {value}
      </p>
      <p className="text-foreground/40 text-xs leading-snug">{label}</p>
    </div>
  );
}
