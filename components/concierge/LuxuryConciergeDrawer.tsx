"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Lock } from "lucide-react";

const DAILY_LIMIT = 15;
const STORAGE_KEY = "zanvore_concierge_usage";

interface Message {
  id: string;
  role: "user" | "concierge";
  content: string;
  timestamp: Date;
}

interface UsageData {
  date: string;
  count: number;
}

function getUsage(): UsageData {
  if (typeof window === "undefined") return { date: "", count: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const today = new Date().toISOString().split("T")[0];
    if (!raw) return { date: today, count: 0 };
    const data = JSON.parse(raw) as UsageData;
    return data.date === today ? data : { date: today, count: 0 };
  } catch {
    return { date: new Date().toISOString().split("T")[0], count: 0 };
  }
}

function incrementUsage(): number {
  const usage = getUsage();
  const updated = { ...usage, count: usage.count + 1 };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated.count;
}

function hoursUntilMidnight(): number {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  return Math.ceil((midnight.getTime() - now.getTime()) / (1000 * 60 * 60));
}

export default function LuxuryConciergeDrawer() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgCount, setMsgCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
    setMsgCount(getUsage().count);
  }, []);

  useEffect(() => {
    if (open) {
      setMsgCount(getUsage().count);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading || msgCount >= DAILY_LIMIT) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const newCount = incrementUsage();
    setMsgCount(newCount);

    try {
      const history = messages.map((m) => ({
        role: m.role === "concierge" ? "assistant" : "user",
        content: m.content,
      }));
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();
      const reply: Message = {
        id: crypto.randomUUID(),
        role: "concierge",
        content: data.reply ?? "…",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, reply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "concierge",
          content: "Une interruption momentanée. Permettez-moi de revenir à vous dans un instant.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, msgCount, messages]);

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const limitReached = msgCount >= DAILY_LIMIT;
  const remaining = Math.max(0, DAILY_LIMIT - msgCount);

  if (!mounted) return null;

  return (
    <>
      {/* Trigger */}
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-7 right-7 z-40 w-12 h-12 rounded-full bg-[#0A0A0A] border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
        aria-label="Concierge IA"
      >
        <span className="text-base leading-none select-none">⟡</span>
      </motion.button>

      {/* Overlay + Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-white border-l border-[#E5E5E5] z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E5E5] shrink-0">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[#0A0A0A] text-base leading-none">⟡</span>
                    <h2
                      className="text-[#0A0A0A] text-sm font-semibold tracking-wide"
                      style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
                    >
                      Concierge IA
                    </h2>
                  </div>
                  <p className="text-[#A3A3A3] text-[11px] pl-6">Votre assistant luxe personnel</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${
                    limitReached
                      ? "text-red-500/70 border-red-200 bg-red-50"
                      : msgCount >= 12
                      ? "text-[#737373] border-[#E5E5E5]"
                      : "text-[#A3A3A3] border-[#E5E5E5]"
                  }`}>
                    {msgCount}/{DAILY_LIMIT}
                  </span>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-[8px] text-[#A3A3A3] hover:text-[#0A0A0A] hover:bg-[#F5F5F5] transition-colors"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5">
                {messages.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center justify-center h-full gap-5 text-center"
                  >
                    <span className="text-5xl text-[#E5E5E5] select-none">⟡</span>
                    <div className="flex flex-col gap-2">
                      <p
                        className="text-[#0A0A0A] text-sm font-medium"
                        style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
                      >
                        Bienvenue
                      </p>
                      <p className="text-[#A3A3A3] text-xs max-w-[240px] leading-relaxed">
                        Je suis votre concierge privé. Recommandations, mises en relation, conseils lifestyle — je suis à votre disposition.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 w-full max-w-[280px]">
                      {[
                        "Recommande-moi une montre de collection",
                        "Trouve-moi un événement luxe à Paris",
                        "Quelles maisons recrutent en ce moment ?",
                      ].map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => { setInput(suggestion); inputRef.current?.focus(); }}
                          className="text-left text-xs text-[#737373] bg-[#F5F5F5] hover:bg-[#EBEBEB] rounded-[8px] px-4 py-2.5 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className={`flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}
                    >
                      {msg.role === "concierge" && (
                        <span className="text-[#A3A3A3] text-[10px] tracking-widest uppercase pl-1">
                          Concierge
                        </span>
                      )}
                      <div
                        className={`max-w-[85%] rounded-[12px] px-4 py-3 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-[#0A0A0A] text-white rounded-tr-[4px]"
                            : "bg-[#F5F5F5] text-[#0A0A0A] rounded-tl-[4px]"
                        }`}
                        style={{
                          fontFamily:
                            msg.role === "concierge"
                              ? "var(--font-satoshi), var(--font-inter), system-ui"
                              : undefined,
                        }}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start"
                  >
                    <div className="bg-[#F5F5F5] rounded-[12px] rounded-tl-[4px] px-4 py-3">
                      <div className="flex gap-1.5 items-center h-4">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="w-1 h-1 rounded-full bg-[#A3A3A3]"
                            animate={{ opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Footer */}
              <div className="px-6 py-5 border-t border-[#E5E5E5] shrink-0">
                {limitReached ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-3 items-center text-center py-2"
                  >
                    <div className="w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center">
                      <Lock size={13} className="text-[#737373]" />
                    </div>
                    <p className="text-[#737373] text-xs leading-relaxed max-w-xs">
                      Limite quotidienne atteinte.
                      <br />
                      Votre concierge sera de nouveau disponible dans {hoursUntilMidnight()}h.
                    </p>
                    <button className="mt-1 text-[11px] text-[#0A0A0A] border border-[#0A0A0A] rounded-full px-5 py-1.5 hover:bg-[#0A0A0A] hover:text-white transition-colors duration-300">
                      Passer à Zanvore Premium →
                    </button>
                  </motion.div>
                ) : (
                  <div className="flex items-end gap-3">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKey}
                      placeholder="Posez votre question…"
                      rows={2}
                      disabled={loading}
                      className="flex-1 bg-[#F5F5F5] border border-transparent text-[#0A0A0A] text-sm rounded-[10px] px-4 py-3 outline-none focus:bg-white focus:border-[#E5E5E5] placeholder:text-[#A3A3A3] transition-all resize-none leading-relaxed disabled:opacity-50"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim() || loading}
                      className="p-3 rounded-[10px] bg-[#0A0A0A] text-white hover:bg-[#262626] transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                )}
                {!limitReached && remaining <= 4 && (
                  <p className="text-[10px] text-[#A3A3A3] mt-2 text-center">
                    {remaining} message{remaining > 1 ? "s" : ""} restant{remaining > 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
