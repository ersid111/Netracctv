"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Shield } from "lucide-react";
import { CHATBOT_RESPONSES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  time: Date;
}

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(CHATBOT_RESPONSES)) {
    if (lower.includes(key)) return response;
  }
  return CHATBOT_RESPONSES.default;
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      text: "Hello! 👋 I'm NETRA's security assistant. How can I help you today?",
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", text: input, time: new Date() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        text: getResponse(userMsg.text),
        time: new Date(),
      };
      setMessages((m) => [...m, botMsg]);
      setTyping(false);
    }, 1000 + Math.random() * 500);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-80 sm:w-96 bg-navy border border-white/10 rounded-2xl shadow-premium overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-brand-blue/10 border-b border-white/10 px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center">
                <Shield className="w-5 h-5 text-brand-blue" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">NETRA Assistant</p>
                <p className="text-emerald-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  Online · Instant replies
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn("flex gap-2", msg.role === "user" && "flex-row-reverse")}
                >
                  {msg.role === "bot" && (
                    <div className="w-7 h-7 rounded-full bg-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-brand-blue" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                      msg.role === "bot"
                        ? "bg-white/5 text-white/80 rounded-tl-sm"
                        : "bg-brand-blue text-white rounded-tr-sm"
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-brand-blue/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-brand-blue" />
                  </div>
                  <div className="bg-white/5 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/10 p-3 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Type your question..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-blue"
              />
              <button
                onClick={send}
                disabled={!input.trim()}
                className="w-9 h-9 rounded-xl bg-brand-blue flex items-center justify-center hover:bg-brand-blue-dark transition-colors disabled:opacity-40"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="px-3 pb-2 text-xs text-center text-white/20">
              Quick questions? Call us: {process.env.NEXT_PUBLIC_COMPANY_PHONE || "+91 98765 43210"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 bg-brand-blue rounded-full shadow-glow flex items-center justify-center hover:bg-brand-blue-dark transition-all ml-auto"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <X className="w-5 h-5 text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <MessageCircle className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
