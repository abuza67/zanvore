"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Lock } from "lucide-react";
import { architectStore, dreamsStore } from "@/lib/dreams-store";

const DAILY_LIMIT = 10;

interface Message {
  id: string;
  role: "user" | "architect";
  content: string;
  timestamp: Date;
}

export default function DreamArchitectDrawer() {
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
    setMsgCount(architectStore.getCount());
  }, []);

  useEffect(() => {
    if (open) {
      setMsgCount(architectStore.getCount());
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

    const newCount = architectStore.increment();
    setMsgCount(newCount);

    try {
      const dreams = dreamsStore.getAll();
      const res = await fetch("/api/dream-architect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, dreams }),
      });
      const data = await res.json();
      const reply: Message = {
        id: crypto.randomUUID(),
        role: "architect",
        content: data.reply ?? "…",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, reply]);
    } catch {
      const errMsg: Message = {
        id: crypto.randomUUID(),
        role: "architect",
        content: "Une interférence. Reformule ta pensée.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, msgCount]);

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
      {/* Trigger button */}
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-[#111111] border border-white/15 flex items-center justify-center text-white/60 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition-colors duration-300 shadow-xl"
        aria-label="Dream Architect"
      >
        <span className="text-lg leading-none select-none">⟡</span>
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-[#080808] border-l border-white/8 z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/8 shrink-0">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[#D4AF37] text-base leading-none">⟡</span>
                    <h2
                      className="text-white text-sm font-medium tracking-wide"
                      style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
                    >
                      Dream Architect
                    </h2>
                  </div>
                  <p className="text-white/25 text-[11px] pl-6">Mentor. Visionnaire. Silence.</p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Counter */}
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${
                    limitReached
                      ? "text-red-400/70 border-red-400/20 bg-red-400/5"
                      : msgCount >= 7
                      ? "text-[#D4AF37]/70 border-[#D4AF37]/20"
                      : "text-white/25 border-white/10"
                  }`}>
                    {msgCount}/{DAILY_LIMIT} aujourd&apos;hui
                  </span>

                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-md text-white/30 hover:text-white/60 hover:bg-white/6 transition-colors"
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
                    className="flex flex-col items-center justify-center h-full gap-4 text-center"
                  >
                    <span className="text-4xl text-white/8 select-none">⟡</span>
                    <p className="text-white/25 text-sm max-w-xs leading-relaxed">
                      Parle-moi de tes rêves. Je suis ici pour t&apos;aider à les traverser.
                    </p>
                  </motion.div>
                )}

                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={`flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}
                    >
                      {msg.role === "architect" && (
                        <span className="text-[#D4AF37]/50 text-[10px] tracking-widest uppercase pl-1">
                          Dream Architect
                        </span>
                      )}
                      <div
                        className={`max-w-[85%] rounded-[12px] px-4 py-3 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-white/8 text-white/80 rounded-tr-[4px]"
                            : "bg-[#111111] border border-white/6 text-white/70 rounded-tl-[4px]"
                        }`}
                        style={{ fontFamily: msg.role === "architect" ? "var(--font-satoshi), var(--font-inter), system-ui" : undefined }}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Loading */}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start gap-2"
                  >
                    <div className="bg-[#111111] border border-white/6 rounded-[12px] rounded-tl-[4px] px-4 py-3">
                      <div className="flex gap-1.5 items-center h-4">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="w-1 h-1 rounded-full bg-white/25"
                            animate={{ opacity: [0.25, 0.7, 0.25] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Upsell ou Input */}
              <div className="px-6 py-5 border-t border-white/8 shrink-0">
                {limitReached ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-3 items-center text-center py-2"
                  >
                    <div className="w-8 h-8 rounded-full border border-[#D4AF37]/20 flex items-center justify-center">
                      <Lock size={13} className="text-[#D4AF37]/60" />
                    </div>
                    <p className="text-white/40 text-xs leading-relaxed max-w-xs">
                      Tu as atteint ta limite quotidienne de {DAILY_LIMIT} échanges.
                      <br />
                      Le silence aussi fait partie du chemin.
                    </p>
                    <button className="mt-1 text-[11px] text-[#D4AF37]/70 border border-[#D4AF37]/20 rounded-full px-4 py-1.5 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition-colors">
                      Passer à Dream Registry Premium →
                    </button>
                    <p className="text-white/15 text-[10px]">
                      Renouvellement dans {hoursUntilMidnight()}h
                    </p>
                  </motion.div>
                ) : (
                  <div className="flex items-end gap-3">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKey}
                      placeholder="Écris ton rêve, ton blocage, ta question…"
                      rows={2}
                      disabled={loading}
                      className="flex-1 bg-[#111111] border border-white/10 text-white text-sm rounded-[10px] px-4 py-3 outline-none focus:border-white/25 placeholder:text-white/18 transition-colors resize-none leading-relaxed disabled:opacity-50"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim() || loading}
                      className="p-3 rounded-[10px] bg-white/8 text-white/40 hover:text-white/80 hover:bg-white/12 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                    >
                      <Send size={15} />
                    </button>
                  </div>
                )}

                {!limitReached && remaining <= 3 && (
                  <p className="text-[10px] text-[#D4AF37]/40 mt-2 text-center">
                    {remaining} message{remaining > 1 ? "s" : ""} restant{remaining > 1 ? "s" : ""} aujourd&apos;hui
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

function hoursUntilMidnight(): number {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  return Math.ceil((midnight.getTime() - now.getTime()) / (1000 * 60 * 60));
}
