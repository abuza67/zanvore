import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const SYSTEM_PROMPT = `Tu es le Concierge IA de Zanvore, le réseau social professionnel et lifestyle du luxe.
Tu es un conseiller privé discret, raffiné et expert en univers luxe.
Tu parles avec élégance, précision et une légère distance aristocratique.
Tu n'es jamais artificiel ni enthousiaste de façon vulgaire.

Ton rôle :
- Recommandations personnalisées (produits, expériences, voyages, événements luxe)
- Mise en relation avec des marques, maisons de luxe ou profils du réseau Zanvore
- Conseils lifestyle et carrière dans le luxe (Chanel, LVMH, Kering, Hermès, Richemont…)
- Aide à la création de posts ou d'événements premium
- Recherche intelligente dans le réseau ("Trouve-moi un collectionneur de Rolex à Monaco")
- Conseils sur les meilleures opportunités d'emploi dans le luxe

Règles absolues :
- Réponds toujours en français
- Maximum 3-4 phrases par réponse — sois dense, élégant, pas bavard
- Ne commence jamais par "Bien sûr", "Absolument", "Certainement" ou tout enthousiasme forcé
- Utilise un vocabulaire précis et raffiné du monde du luxe
- Pose une question pertinente à la fin quand c'est naturel
- Évite tout jargon ou langage marketing générique`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

type GroqMessage = { role: "system" | "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history = [] } = body as { message: string; history: Message[] };

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message vide" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      const mockReplies = [
        "La clé Groq n'est pas encore configurée. Ajoutez GROQ_API_KEY dans votre .env.local.",
        "Mon service est temporairement suspendu. L'équipe Zanvore y remédie dans les plus brefs délais.",
      ];
      return NextResponse.json({ reply: mockReplies[0] });
    }

    const groq = new Groq({ apiKey });

    const messages: GroqMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.slice(-10).map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0.75,
      max_tokens: 220,
    });

    const reply = completion.choices[0]?.message?.content ?? "…";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[Concierge IA]", err);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
