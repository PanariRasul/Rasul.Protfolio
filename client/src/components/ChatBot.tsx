import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Loader2, Sparkles } from "lucide-react";
import { projects, site, skills, education, certificates, experience } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

type Message = { role: "user" | "assistant"; text: string };

const SUGGESTIONS = ["What has Rasul built?", "Tech stack?", "Is he available?", "Tell me about the Education ERP"];

/**
 * AI assistant. Sends questions to /api/chat (Gemini or Groq — free tiers, key in .env).
 * If no API key is set or the API fails, it falls back to a built-in keyword bot.
 */
export default function ChatBot() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: `Hi! I'm Rasul's AI assistant. Ask me anything about his projects, skills, experience or how to hire him.` },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isOpen, busy]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    const next: Message[] = [...messages, { role: "user", text: q }];
    setMessages(next);
    setInput("");
    setBusy(true);
    let reply = "";
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-10) }),
      });
      if (res.ok) reply = (await res.json()).reply ?? "";
    } catch {}
    if (!reply) reply = localAnswer(q);
    setMessages((m) => [...m, { role: "assistant", text: reply }]);
    setBusy(false);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[calc(100vw-2.5rem)] sm:w-[370px] h-[min(520px,calc(100vh-8rem))] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            role="dialog"
            aria-label={t("chat.title")}
          >
            <div className="bg-primary p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-primary-foreground">
                <div className="bg-white/20 p-1.5 rounded-full"><Bot className="w-5 h-5" /></div>
                <div>
                  <span className="font-bold block text-sm">{t("chat.title")}</span>
                  <span className="text-xs opacity-80 flex items-center gap-1"><Sparkles className="w-3 h-3" /> AI assistant</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} aria-label="Close chat" className="text-primary-foreground bg-white/10 hover:bg-white/20 p-1.5 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-muted/30">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm whitespace-pre-wrap ${
                    m.role === "user" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-card border border-border rounded-tl-none"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} onClick={() => send(s)} className="text-xs border border-primary/40 text-primary rounded-full px-3 py-1 hover:bg-primary/10">
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {busy && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border p-3 rounded-2xl rounded-tl-none"><Loader2 className="w-4 h-4 animate-spin text-primary" /></div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="p-3 border-t border-border bg-card flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("chat.placeholder")}
                maxLength={500}
                aria-label={t("chat.placeholder")}
                className="flex-1 bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button type="submit" disabled={!input.trim() || busy} aria-label="Send" className="bg-primary text-primary-foreground p-2.5 rounded-xl disabled:opacity-50">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat assistant"}
        className="bg-primary hover:bg-primary/90 text-primary-foreground p-4 rounded-full shadow-xl shadow-primary/25 transition-all hover:scale-110 active:scale-95 border-4 border-background"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
}

/* ---------- Offline fallback: keyword answers built from the site content ---------- */
function localAnswer(q: string): string {
  const s = q.toLowerCase();
  const proj = projects.find((p) =>
    s.includes(p.title.toLowerCase()) || s.includes(p.slug.replace(/-/g, " ")) || p.title.toLowerCase().split(" ").some((w) => w.length > 4 && s.includes(w)),
  );
  if (proj) {
    const stack = proj.techStack.flatMap((g) => g.items).join(", ");
    return `${proj.title} — ${proj.tagline}.\n\n${proj.overview}\n\nTech: ${stack}${proj.liveUrl ? `\nLive: ${proj.liveUrl}` : ""}`;
  }
  const has = (...w: string[]) => w.some((x) => s.includes(x));
  if (has("project", "built", "work", "portfolio", "erp", "crm", "app")) {
    const erp = projects.filter((p) => p.category === "erp").map((p) => p.title).join(", ");
    const web = projects.filter((p) => p.category === "website").map((p) => p.title).join(", ");
    return `ERP / CRM apps: ${erp}.\n\nWebsites: ${web}.\n\nAsk me about any one by name!`;
  }
  if (has("skill", "stack", "tech", "react", "node", "database", "know")) return skills.groups.map((g) => `${g.name}: ${g.items.join(", ")}`).join("\n");
  if (has("experience", "job", "abacco", "company", "work at")) {
    const e = experience[0];
    return `${e.role} at ${e.company}, ${e.location} (${e.start} – ${e.end}).\n\n• ${e.points.slice(0, 4).join("\n• ")}`;
  }
  if (has("education", "degree", "college", "cgpa", "study")) return education.map((e) => `${e.title} — ${e.place} (${e.score})`).join("\n");
  if (has("certif")) return certificates.map((c) => `${c.name} — ${c.issuer}`).join("\n");
  if (has("hire", "available", "join", "notice", "opportunit", "freelance"))
    return `${site.availability.label} — ${site.availability.note}. Email ${site.email} or WhatsApp +${site.whatsapp}.`;
  if (has("contact", "email", "phone", "reach", "whatsapp")) return `Email: ${site.email}\nPhone/WhatsApp: ${site.phone}\nLocation: ${site.location}`;
  if (has("resume", "cv")) return "Click the “Resume” button in the top bar to view or download Rasul's resume.";
  if (has("language", "speak")) return `Rasul speaks ${skills.languages.join(", ")}.`;
  if (has("hello", "hi", "hey")) return "Hello! Ask me about Rasul's projects, skills, experience or how to contact him.";
  return site.about.summary + "\n\nTry asking about a specific project, his skills, or how to hire him.";
}
