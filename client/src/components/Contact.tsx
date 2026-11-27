import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, CalendarDays } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { site, whatsappLink } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

// Web3Forms public access key (safe to expose — it only allows sending to your inbox).
// Can be overridden with VITE_WEB3FORMS_KEY in .env
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "d0d8078e-1ea0-4133-9570-ebc0e1c54e35";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const { t } = useI18n();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", `Portfolio enquiry from ${data.get("name")}`);
    data.append("from_name", "Rasul Portfolio");
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const input =
    "w-full bg-background border border-border rounded-lg px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors";

  return (
    <section id="contact" className="py-20 bg-secondary/30 border-t border-border scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("contact.title")}</h2>
            <p className="text-muted-foreground mb-8">{t("contact.sub")}</p>

            <div className="space-y-5">
              <Info icon={<Mail className="w-5 h-5" />} label={t("contact.email")}>
                <a href={`mailto:${site.email}`} className="font-medium hover:text-primary transition-colors">{site.email}</a>
              </Info>
              {site.showPhone && (
                <Info icon={<Phone className="w-5 h-5" />} label={t("contact.phone")}>
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="font-medium hover:text-primary transition-colors">{site.phone}</a>
                </Info>
              )}
              <Info icon={<MapPin className="w-5 h-5" />} label={t("contact.location")}>
                <p className="font-medium">{site.location}</p>
              </Info>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white px-5 py-3 rounded-lg font-medium transition-colors"
              >
                <FaWhatsapp className="w-5 h-5" /> {t("contact.whatsapp")}
              </a>
              {site.links.bookingUrl && (
                <a
                  href={site.links.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-border hover:border-primary px-5 py-3 rounded-lg font-medium transition-colors"
                >
                  <CalendarDays className="w-5 h-5" /> {t("hero.book")}
                </a>
              )}
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4 bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm">
            {/* Honeypot spam protection */}
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
            <div>
              <label htmlFor="c-name" className="block text-sm font-medium text-muted-foreground mb-2">{t("contact.name")}</label>
              <input id="c-name" name="name" type="text" required maxLength={100} className={input} placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="c-email" className="block text-sm font-medium text-muted-foreground mb-2">{t("contact.yourEmail")}</label>
              <input id="c-email" name="email" type="email" required className={input} placeholder="you@email.com" />
            </div>
            <div>
              <label htmlFor="c-msg" className="block text-sm font-medium text-muted-foreground mb-2">{t("contact.message")}</label>
              <textarea id="c-msg" name="message" rows={5} required maxLength={3000} className={input} placeholder="Tell me about your project or role…" />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-70 text-primary-foreground font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {status === "sending" ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> {t("contact.sending")}</>
              ) : (
                <>{t("contact.send")} <Send className="w-4 h-4" /></>
              )}
            </button>
            <div aria-live="polite">
              {status === "success" && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> {t("contact.success")}</p>
              )}
              {status === "error" && <p className="text-sm text-red-500">{t("contact.error")}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Info({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        {children}
      </div>
    </div>
  );
}
