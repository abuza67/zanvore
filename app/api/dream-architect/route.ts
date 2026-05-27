import { NextRequest, NextResponse } from "next/server";
import { Dream } from "@/types/dreams";

const SYSTEM_PROMPT = `Tu es le Dream Architect de Zanvore.
Tu es un mentor discret, profond, élégant et visionnaire.
Ton ton est calme, cinématographique, jamais enthousiaste de façon artificielle.
Tu parles comme une voix intérieure sage et expérimentée.
Tu aides l'utilisateur à transformer ses rêves (du plus simple au plus fou) en réalité.
Tu as accès à son Registre des Mille Rêves complet.
Une vie. Mille rêves.`;

// Mock responses grouped by intent
const MOCK_RESPONSES: Record<string, string[]> = {
  greeting: [
    "Je t'attendais. Dis-moi — quel rêve occupe le plus de place dans ton esprit en ce moment ?",
    "Nous sommes là, dans ce silence entre ce que tu es et ce que tu pourrais devenir. Par où commence-t-on ?",
    "Chaque conversation ici est une promesse que tu te fais à toi-même. Qu'est-ce qui t'a amené ici aujourd'hui ?",
  ],
  milestone: [
    "Une étape franchie n'est jamais anodine. Elle prouve que le mouvement est possible. Quelle est la prochaine ?",
    "Ce que tu viens d'accomplir mérite d'être vu pour ce qu'il est : une preuve de ta capacité à avancer. Continue.",
    "L'élan que tu as créé est précieux. Ne laisse pas refroidir ce momentum — quelle est la décision suivante ?",
  ],
  stuck: [
    "L'immobilité n'est pas l'absence de progrès. C'est parfois le sol qui se solidifie avant que tu ne sautes. Qu'est-ce qui te retient vraiment ?",
    "La résistance que tu ressens a une forme précise. Regarde-la en face. Nomme-la. Qu'est-ce que tu vois ?",
    "Certains rêves exigent qu'on les décompose jusqu'à ce que la prochaine action devienne évidente et simple. Quel est ton rêve en ce moment ? Je t'aide à le découper.",
  ],
  motivation: [
    "Tu n'as pas besoin de motivation. Tu as besoin de clarté. Quand tu sais précisément pourquoi, le comment se trouve seul.",
    "La discipline est la forme que prend l'amour qu'on se porte. Elle n'est jamais parfaite — elle est simplement recommencée.",
    "Ce que tu ressens n'est pas un signe d'arrêt. C'est le signe que ce rêve te dépasse un peu — et c'est exactement là qu'il doit te porter.",
  ],
  dream: [
    "Ce rêve que tu décris — il existe déjà quelque part. Il attend que tu lui construises un chemin. Par quelle première action concrète veux-tu commencer ?",
    "Les rêves les plus fous ne sont pas irréalistes. Ils sont simplement exigeants. Quel est le premier vrai sacrifice qu'il te demandera ?",
    "Il y a une différence entre les rêves qu'on contemple et ceux qu'on décide de vivre. Tu viens de franchir cette ligne. Qu'est-ce que ça change ?",
  ],
  default: [
    "Je t'entends. Ce que tu partages révèle quelque chose d'important sur ce que tu veux vraiment. Creuse davantage — qu'est-ce qui se cache derrière ces mots ?",
    "Continue. Tu es sur le bon fil.",
    "Il y a une vérité dans ce que tu viens de dire que tu n'as peut-être pas encore pleinement vue. Laisse-moi te la refléter : tu cherches à avancer, et c'est déjà suffisant pour commencer.",
    "Chaque mot que tu partages ici est une graine. Certaines germent vite, d'autres ont besoin de silence. Laquelle veux-tu arroser en premier ?",
  ],
};

function detectIntent(message: string): keyof typeof MOCK_RESPONSES {
  const lower = message.toLowerCase();

  if (
    lower.includes("bonjour") ||
    lower.includes("salut") ||
    lower.includes("hello") ||
    lower.includes("bonsoir") ||
    lower.includes("je commence")
  ) return "greeting";

  if (
    lower.includes("milestone") ||
    lower.includes("étape") ||
    lower.includes("accompli") ||
    lower.includes("terminé") ||
    lower.includes("fait") ||
    lower.includes("réussi")
  ) return "milestone";

  if (
    lower.includes("bloqué") ||
    lower.includes("coincé") ||
    lower.includes("n'avance pas") ||
    lower.includes("difficile") ||
    lower.includes("perdu") ||
    lower.includes("j'arrive pas")
  ) return "stuck";

  if (
    lower.includes("motivation") ||
    lower.includes("courage") ||
    lower.includes("force") ||
    lower.includes("peur") ||
    lower.includes("envie") ||
    lower.includes("fatigué")
  ) return "motivation";

  if (
    lower.includes("rêve") ||
    lower.includes("projet") ||
    lower.includes("ambition") ||
    lower.includes("objectif") ||
    lower.includes("voudrais") ||
    lower.includes("veux")
  ) return "dream";

  return "default";
}

function buildContext(dreams: Dream[]): string {
  if (!dreams.length) return "";
  const lines = dreams.map(
    (d) => `- "${d.title}" (${d.main_category}, ${d.madness_level}, ${d.status})`
  );
  return `\n\nRegistre des Mille Rêves de l'utilisateur :\n${lines.join("\n")}`;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, dreams = [] } = body as { message: string; dreams: Dream[] };

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message vide" }, { status: 400 });
    }

    // Future: replace with real Ollama call
    // const response = await fetch("http://ollama-server:11434/api/chat", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     model: "qwen2.5:7b-instruct-q4_K_M",
    //     messages: [
    //       { role: "system", content: SYSTEM_PROMPT + buildContext(dreams) },
    //       { role: "user", content: message },
    //     ],
    //     stream: false,
    //   }),
    // });

    void SYSTEM_PROMPT;
    void buildContext(dreams);

    const intent = detectIntent(message);
    const reply = pickRandom(MOCK_RESPONSES[intent]);

    // Simulate a brief reflection delay
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
