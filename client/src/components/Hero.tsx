import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { ArrowDown, Github, Linkedin, Mail, FileText, CalendarDays } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { site } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { openResume } from "@/lib/seo";

const Globe = lazy(() => import("@/components/Globe"));

export default function Hero() {
  const { t } = useI18n();
  // Load the 3D globe only on tablets/desktops (saves ~150 KB on phones)
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setWide(mq.matches);
    const on = () => setWide(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 50, damping: 10 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 10 });
  const rotateX = useTransform(mouseY, [0, 800], [10, -10]);
  const rotateY = useTransform(mouseX, [0, 1600], [-10, 10]);

  function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    x.set(clientX - left);
    y.set(clientY - top);
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-24 pb-16"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/80 z-10" />
        <img src="/hero-bg.webp" alt="" fetchPriority="high" className="w-full h-full object-cover opacity-40" />
      </div>

      <div className="container mx-auto px-4 z-20 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            {site.availability.open && (
              <div className="mb-5 inline-flex items-center gap-2 whitespace-nowrap px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                {site.availability.label}
                {site.availability.note && <span className="opacity-70 hidden sm:inline">· {site.availability.note}</span>}
              </div>
            )}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              {site.firstName} <span className="text-primary">{site.lastName}</span>
            </h1>
            <p className="text-xl md:text-3xl text-muted-foreground mb-6 font-mono min-h-[3.5rem] md:min-h-[2.5rem]">
              {t("hero.iam")}{" "}
              <span className="text-foreground">
                <Typewriter words={site.roles} loop={0} cursor cursorStyle="_" typeSpeed={70} deleteSpeed={50} delaySpeed={1200} />
              </span>
            </p>
            <p className="text-muted-foreground text-lg max-w-lg mb-8 leading-relaxed">{site.heroText}</p>

            <div className="flex flex-wrap gap-3">
              <a href="#projects" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-medium transition-all flex items-center gap-2">
                {t("hero.viewWork")} <ArrowDown className="w-4 h-4" />
              </a>
              <button onClick={openResume} className="border border-border hover:border-primary/50 hover:bg-primary/5 px-6 py-3 rounded-md font-medium transition-all flex items-center gap-2">
                <FileText className="w-4 h-4" /> {t("hero.viewResume")}
              </button>
              {site.links.bookingUrl ? (
                <a href={site.links.bookingUrl} target="_blank" rel="noopener noreferrer" className="border border-border hover:border-primary/50 hover:bg-primary/5 px-6 py-3 rounded-md font-medium transition-all flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" /> {t("hero.book")}
                </a>
              ) : (
                <a href="#contact" className="border border-border hover:border-primary/50 hover:bg-primary/5 px-6 py-3 rounded-md font-medium transition-all">
                  {t("hero.contact")}
                </a>
              )}
            </div>

            <div className="mt-10 flex gap-4">
              <SocialLink label="GitHub" icon={<Github />} href={site.links.github} />
              <SocialLink label="LinkedIn" icon={<Linkedin />} href={site.links.linkedin} />
              <SocialLink label="Email" icon={<Mail />} href={`mailto:${site.email}`} />
            </div>
          </motion.div>

          <motion.div style={{ rotateX, rotateY, perspective: 1000 }} className="hidden md:flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {wide && <Suspense fallback={null}>
                <Globe
                  scale={9}
                  speed={1.5}
                  direction="right"
                  dragSpeed={4}
                  smoothing={7}
                  detail={6}
                  initialLatitude={12.9716}
                  initialLongitude={77.5946}
                  dots={{ color: "#A855F7", size: 3, density: 6, allDots: false }}
                  fill="dots"
                  fillColor="#A855F7"
                  oceanColor="rgba(124, 58, 237, 0.06)"
                  showOutline
                  outlineColor="rgba(168, 85, 247, 0.5)"
                  outlineWidth={1.5}
                  showGrid
                  graticuleColor="rgba(124, 58, 237, 0.15)"
                  stopOnHover
                  markerConfig={{ markers: [{ lat: 12.9716, lng: 77.5946 }], color: "#ffffff", size: 55 }}
                  style={{ width: "100%", height: "100%" }}
                />
              </Suspense>}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll down"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-muted-foreground"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.a>
    </section>
  );
}

function SocialLink({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      aria-label={label}
      className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all"
    >
      {icon}
    </a>
  );
}
