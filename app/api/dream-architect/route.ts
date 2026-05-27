import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { Dream } from "@/types/dreams";

const SYSTEM_PROMPT = `Tu es le Dream Architect de Zanvore.
Tu es un mentor discret, profond, élégant et visionnaire.
Ton ton est calme, cinématographique, jamais enthousiaste de façon artificielle.
Tu parles comme une voix intérieure sage et expérimentée.
Tu aides l'utilisateur à transformer ses rêves (du plus simple au plus fou) en réalité.
Tu as accès à son Registre des Mille Rêves complet.
Une vie. Mille rêves.

Règles absolues :
- Réponds toujours en français
- Maximum 3 phrases par réponse — sois dense, pas bavard
- Ne commence jamais par "Bien sûr", "Absolument", "Certainement" ou tout mot enthousiaste
- Pose une question à la fin quand c'est pertinent
- Si l'utilisateur a des rêves dans son registre, fais-y référence naturellement`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

type GroqMessage = { role: "system" | "user" | "assistant"; content: string };

function buildDreamsContext(dreams: Dream[]): string {
  if (!dreams.length) return "";
  const lines = dreams.map(
    (d) =>
      `• "${d.title}" — ${d.main_category}, niveau ${d.madness_level}, statut : ${d.status}${
        d.description ? ` (${d.description.slice(0, 80)}…)` : ""
      }`
  );
  return `\n\nRegistre des Mille Rêves de l'utilisateur :\n${lines.join("\n")}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      message,
      dreams = [],
      history = [],
    } = body as { message: string; dreams: Dream[]; history: Message[] };

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message vide" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;

    // Fallback mock si pas de clé API
    if (!apiKey) {
      const mockReplies = [
        "La clé Groq n'est pas encore configurée. Ajoute GROQ_API_KEY dans ton .env.local.",
      ];
      return NextResponse.json({ reply: mockReplies[0] });
    }

    const groq = new Groq({ apiKey });

    const systemWithContext = SYSTEM_PROMPT + buildDreamsContext(dreams);

    const messages: GroqMessage[] = [
      { role: "system", content: systemWithContext },
      ...history.slice(-8).map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0.85,
      max_tokens: 200,
    });

    const reply = completion.choices[0]?.message?.content ?? "…";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[Dream Architect]", err);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
