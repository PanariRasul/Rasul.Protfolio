import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * UI language toggle (English / हिन्दी / ಕನ್ನಡ).
 * Translates navigation, headings, buttons and labels.
 * Project and blog content stays in English (edited from /admin).
 */
export type Lang = "en" | "hi" | "kn";
export const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "hi", label: "हि" },
  { code: "kn", label: "ಕ" },
];

const en = {
  "nav.home": "Home",
  "nav.about": "About",
  "nav.services": "Services",
  "nav.skills": "Skills",
  "nav.experience": "Experience",
  "nav.projects": "Projects",
  "nav.blog": "Blog",
  "nav.contact": "Contact",
  "nav.education": "Education",
  "nav.resume": "Resume",
  "hero.iam": "I am a",
  "hero.viewWork": "View Work",
  "hero.contact": "Contact Me",
  "hero.viewResume": "View Resume",
  "hero.book": "Book a Call",
  "about.title": "About Me",
  "achievements.title": "Highlights",
  "services.title": "What I Can Build For You",
  "services.sub": "From idea to deployed product — web apps, business software and websites.",
  "skills.title": "Skills",
  "skills.languages": "Languages I speak",
  "experience.title": "Experience",
  "projects.title": "Projects",
  "projects.sub": "ERP, CRM, POS and business apps plus client websites I've built. Open any project for the full case study.",
  "projects.all": "All",
  "projects.erp": "ERP / CRM Apps",
  "projects.websites": "Websites",
  "projects.knowMore": "Know More",
  "projects.live": "Live",
  "projects.private": "Private",
  "projects.liveSite": "Visit Live Site",
  "projects.viewCode": "View Code",
  "projects.restricted": "Internal tool — not public",
  "projects.back": "Back to Projects",
  "projects.prev": "Previous Project",
  "projects.next": "Next Project",
  "projects.overview": "Overview",
  "projects.problem": "The Problem",
  "projects.solution": "My Solution",
  "projects.result": "The Result",
  "projects.features": "Key Features",
  "projects.contribution": "My Role & Contribution",
  "projects.challenges": "Challenges & How I Solved Them",
  "projects.tech": "Tech Stack",
  "projects.gallery": "Screenshots",
  "projects.role": "Role",
  "projects.timeline": "Timeline",
  "projects.category": "Category",
  "github.title": "GitHub Activity",
  "github.sub": "Contributions over the last year",
  "learning.title": "Currently Learning",
  "education.title": "Education",
  "certs.title": "Certifications",
  "certs.view": "View certificate",
  "certs.showAll": "Show all",
  "certs.showLess": "Show less",
  "certs.allDrive": "View all on Google Drive",
  "blog.title": "Blog & Notes",
  "blog.sub": "Short write-ups on how I build things.",
  "blog.read": "Read",
  "blog.all": "All posts",
  "contact.title": "Let's Work Together",
  "contact.sub": "Have a project or a role in mind? Send a message, WhatsApp me, or book a call.",
  "contact.email": "Email",
  "contact.phone": "Phone",
  "contact.location": "Location",
  "contact.name": "Name",
  "contact.yourEmail": "Email",
  "contact.message": "Message",
  "contact.send": "Send Message",
  "contact.sending": "Sending…",
  "contact.success": "Thanks! Your message has been sent. I'll reply soon.",
  "contact.error": "Something went wrong. Please email me directly.",
  "contact.whatsapp": "Chat on WhatsApp",
  "footer.updated": "Last updated",
  "footer.visitors": "visitors",
  "footer.rights": "All rights reserved.",
  "cmd.placeholder": "Type a command or search…",
  "cmd.hint": "Quick jump",
  "notfound.title": "Page not found",
  "notfound.text": "This page wandered off. Let's get you back.",
  "notfound.home": "Back to Home",
  "chat.title": "Ask about Rasul",
  "chat.placeholder": "Ask about projects, skills…",
  "resume.download": "Download",
};
type Dict = typeof en;
type Key = keyof Dict;

const hi: Partial<Dict> = {
  "nav.home": "होम", "nav.about": "परिचय", "nav.services": "सेवाएँ", "nav.skills": "कौशल",
  "nav.experience": "अनुभव", "nav.projects": "प्रोजेक्ट्स", "nav.blog": "ब्लॉग", "nav.contact": "संपर्क",
  "nav.education": "शिक्षा", "nav.resume": "रिज़्यूमे",
  "hero.iam": "मैं हूँ", "hero.viewWork": "मेरा काम देखें", "hero.contact": "संपर्क करें",
  "hero.viewResume": "रिज़्यूमे देखें", "hero.book": "कॉल बुक करें",
  "about.title": "मेरे बारे में", "achievements.title": "मुख्य उपलब्धियाँ",
  "services.title": "मैं आपके लिए क्या बना सकता हूँ", "services.sub": "आइडिया से लाइव प्रोडक्ट तक — वेब ऐप, बिज़नेस सॉफ़्टवेयर और वेबसाइट।",
  "skills.title": "कौशल", "skills.languages": "मेरी भाषाएँ", "experience.title": "अनुभव",
  "projects.title": "प्रोजेक्ट्स", "projects.sub": "मेरे बनाए ERP, CRM, POS ऐप और क्लाइंट वेबसाइट। पूरी जानकारी के लिए कोई भी प्रोजेक्ट खोलें।",
  "projects.all": "सभी", "projects.erp": "ERP / CRM ऐप", "projects.websites": "वेबसाइट",
  "projects.knowMore": "और जानें", "projects.live": "लाइव", "projects.private": "निजी",
  "projects.liveSite": "लाइव साइट देखें", "projects.viewCode": "कोड देखें", "projects.restricted": "आंतरिक टूल — सार्वजनिक नहीं",
  "projects.back": "प्रोजेक्ट्स पर वापस", "projects.prev": "पिछला प्रोजेक्ट", "projects.next": "अगला प्रोजेक्ट",
  "projects.overview": "सारांश", "projects.problem": "समस्या", "projects.solution": "मेरा समाधान", "projects.result": "परिणाम",
  "projects.features": "मुख्य फ़ीचर्स", "projects.contribution": "मेरी भूमिका और योगदान",
  "projects.challenges": "चुनौतियाँ और समाधान", "projects.tech": "टेक स्टैक", "projects.gallery": "स्क्रीनशॉट",
  "projects.role": "भूमिका", "projects.timeline": "समय", "projects.category": "श्रेणी",
  "github.title": "GitHub गतिविधि", "github.sub": "पिछले एक साल का योगदान",
  "learning.title": "अभी सीख रहा हूँ", "education.title": "शिक्षा", "certs.title": "प्रमाणपत्र", "certs.view": "प्रमाणपत्र देखें", "certs.showAll": "सभी देखें", "certs.showLess": "कम दिखाएँ", "certs.allDrive": "Google Drive पर सभी देखें",
  "blog.title": "ब्लॉग और नोट्स", "blog.sub": "मैं चीज़ें कैसे बनाता हूँ, इस पर छोटे लेख।", "blog.read": "पढ़ें", "blog.all": "सभी पोस्ट",
  "contact.title": "साथ मिलकर काम करें", "contact.sub": "कोई प्रोजेक्ट या नौकरी है? मैसेज भेजें, WhatsApp करें या कॉल बुक करें।",
  "contact.email": "ईमेल", "contact.phone": "फ़ोन", "contact.location": "स्थान", "contact.name": "नाम",
  "contact.yourEmail": "ईमेल", "contact.message": "संदेश", "contact.send": "संदेश भेजें", "contact.sending": "भेजा जा रहा है…",
  "contact.success": "धन्यवाद! आपका संदेश भेज दिया गया है।", "contact.error": "कुछ गलत हुआ। कृपया सीधे ईमेल करें।",
  "contact.whatsapp": "WhatsApp पर चैट करें",
  "footer.updated": "अंतिम अपडेट", "footer.visitors": "विज़िटर", "footer.rights": "सर्वाधिकार सुरक्षित।",
  "cmd.placeholder": "खोजें या कमांड लिखें…", "cmd.hint": "जल्दी जाएँ",
  "notfound.title": "पेज नहीं मिला", "notfound.text": "यह पेज मौजूद नहीं है। चलिए वापस चलते हैं।", "notfound.home": "होम पर जाएँ",
  "chat.title": "रसूल के बारे में पूछें", "chat.placeholder": "प्रोजेक्ट, स्किल्स के बारे में पूछें…", "resume.download": "डाउनलोड",
};

const kn: Partial<Dict> = {
  "nav.home": "ಮುಖಪುಟ", "nav.about": "ಪರಿಚಯ", "nav.services": "ಸೇವೆಗಳು", "nav.skills": "ಕೌಶಲ್ಯಗಳು",
  "nav.experience": "ಅನುಭವ", "nav.projects": "ಪ್ರಾಜೆಕ್ಟ್‌ಗಳು", "nav.blog": "ಬ್ಲಾಗ್", "nav.contact": "ಸಂಪರ್ಕ",
  "nav.education": "ಶಿಕ್ಷಣ", "nav.resume": "ರೆಸ್ಯೂಮ್",
  "hero.iam": "ನಾನು", "hero.viewWork": "ನನ್ನ ಕೆಲಸ ನೋಡಿ", "hero.contact": "ಸಂಪರ್ಕಿಸಿ",
  "hero.viewResume": "ರೆಸ್ಯೂಮ್ ನೋಡಿ", "hero.book": "ಕಾಲ್ ಬುಕ್ ಮಾಡಿ",
  "about.title": "ನನ್ನ ಬಗ್ಗೆ", "achievements.title": "ಮುಖ್ಯಾಂಶಗಳು",
  "services.title": "ನಾನು ನಿಮಗಾಗಿ ಏನು ನಿರ್ಮಿಸಬಲ್ಲೆ", "services.sub": "ಐಡಿಯಾದಿಂದ ಲೈವ್ ಪ್ರಾಡಕ್ಟ್‌ವರೆಗೆ — ವೆಬ್ ಆ್ಯಪ್, ಬಿಸಿನೆಸ್ ಸಾಫ್ಟ್‌ವೇರ್ ಮತ್ತು ವೆಬ್‌ಸೈಟ್.",
  "skills.title": "ಕೌಶಲ್ಯಗಳು", "skills.languages": "ನಾನು ಮಾತನಾಡುವ ಭಾಷೆಗಳು", "experience.title": "ಅನುಭವ",
  "projects.title": "ಪ್ರಾಜೆಕ್ಟ್‌ಗಳು", "projects.sub": "ನಾನು ನಿರ್ಮಿಸಿದ ERP, CRM, POS ಆ್ಯಪ್‌ಗಳು ಮತ್ತು ಕ್ಲೈಂಟ್ ವೆಬ್‌ಸೈಟ್‌ಗಳು. ಪೂರ್ಣ ವಿವರಕ್ಕೆ ಯಾವುದೇ ಪ್ರಾಜೆಕ್ಟ್ ತೆರೆಯಿರಿ.",
  "projects.all": "ಎಲ್ಲಾ", "projects.erp": "ERP / CRM ಆ್ಯಪ್‌ಗಳು", "projects.websites": "ವೆಬ್‌ಸೈಟ್‌ಗಳು",
  "projects.knowMore": "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ", "projects.live": "ಲೈವ್", "projects.private": "ಖಾಸಗಿ",
  "projects.liveSite": "ಲೈವ್ ಸೈಟ್ ನೋಡಿ", "projects.viewCode": "ಕೋಡ್ ನೋಡಿ", "projects.restricted": "ಆಂತರಿಕ ಟೂಲ್ — ಸಾರ್ವಜನಿಕವಲ್ಲ",
  "projects.back": "ಪ್ರಾಜೆಕ್ಟ್‌ಗಳಿಗೆ ಹಿಂತಿರುಗಿ", "projects.prev": "ಹಿಂದಿನ ಪ್ರಾಜೆಕ್ಟ್", "projects.next": "ಮುಂದಿನ ಪ್ರಾಜೆಕ್ಟ್",
  "projects.overview": "ಅವಲೋಕನ", "projects.problem": "ಸಮಸ್ಯೆ", "projects.solution": "ನನ್ನ ಪರಿಹಾರ", "projects.result": "ಫಲಿತಾಂಶ",
  "projects.features": "ಮುಖ್ಯ ವೈಶಿಷ್ಟ್ಯಗಳು", "projects.contribution": "ನನ್ನ ಪಾತ್ರ ಮತ್ತು ಕೊಡುಗೆ",
  "projects.challenges": "ಸವಾಲುಗಳು ಮತ್ತು ಪರಿಹಾರಗಳು", "projects.tech": "ಟೆಕ್ ಸ್ಟ್ಯಾಕ್", "projects.gallery": "ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ಗಳು",
  "projects.role": "ಪಾತ್ರ", "projects.timeline": "ಅವಧಿ", "projects.category": "ವರ್ಗ",
  "github.title": "GitHub ಚಟುವಟಿಕೆ", "github.sub": "ಕಳೆದ ಒಂದು ವರ್ಷದ ಕೊಡುಗೆಗಳು",
  "learning.title": "ಈಗ ಕಲಿಯುತ್ತಿರುವುದು", "education.title": "ಶಿಕ್ಷಣ", "certs.title": "ಪ್ರಮಾಣಪತ್ರಗಳು", "certs.view": "ಪ್ರಮಾಣಪತ್ರ ನೋಡಿ", "certs.showAll": "ಎಲ್ಲಾ ನೋಡಿ", "certs.showLess": "ಕಡಿಮೆ ತೋರಿಸಿ", "certs.allDrive": "Google Drive ನಲ್ಲಿ ಎಲ್ಲಾ ನೋಡಿ",
  "blog.title": "ಬ್ಲಾಗ್ ಮತ್ತು ಟಿಪ್ಪಣಿಗಳು", "blog.sub": "ನಾನು ಹೇಗೆ ನಿರ್ಮಿಸುತ್ತೇನೆ ಎಂಬುದರ ಕಿರು ಲೇಖನಗಳು.", "blog.read": "ಓದಿ", "blog.all": "ಎಲ್ಲಾ ಪೋಸ್ಟ್‌ಗಳು",
  "contact.title": "ಜೊತೆಯಾಗಿ ಕೆಲಸ ಮಾಡೋಣ", "contact.sub": "ಪ್ರಾಜೆಕ್ಟ್ ಅಥವಾ ಉದ್ಯೋಗ ಇದೆಯೇ? ಸಂದೇಶ ಕಳುಹಿಸಿ, WhatsApp ಮಾಡಿ ಅಥವಾ ಕಾಲ್ ಬುಕ್ ಮಾಡಿ.",
  "contact.email": "ಇಮೇಲ್", "contact.phone": "ಫೋನ್", "contact.location": "ಸ್ಥಳ", "contact.name": "ಹೆಸರು",
  "contact.yourEmail": "ಇಮೇಲ್", "contact.message": "ಸಂದೇಶ", "contact.send": "ಸಂದೇಶ ಕಳುಹಿಸಿ", "contact.sending": "ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ…",
  "contact.success": "ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಸಂದೇಶ ಕಳುಹಿಸಲಾಗಿದೆ.", "contact.error": "ಏನೋ ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ನೇರವಾಗಿ ಇಮೇಲ್ ಮಾಡಿ.",
  "contact.whatsapp": "WhatsApp ನಲ್ಲಿ ಚಾಟ್ ಮಾಡಿ",
  "footer.updated": "ಕೊನೆಯ ಅಪ್‌ಡೇಟ್", "footer.visitors": "ಭೇಟಿದಾರರು", "footer.rights": "ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
  "cmd.placeholder": "ಹುಡುಕಿ ಅಥವಾ ಕಮಾಂಡ್ ಟೈಪ್ ಮಾಡಿ…", "cmd.hint": "ತ್ವರಿತ ಜಂಪ್",
  "notfound.title": "ಪುಟ ಸಿಗಲಿಲ್ಲ", "notfound.text": "ಈ ಪುಟ ಅಸ್ತಿತ್ವದಲ್ಲಿಲ್ಲ. ಹಿಂತಿರುಗೋಣ.", "notfound.home": "ಮುಖಪುಟಕ್ಕೆ ಹೋಗಿ",
  "chat.title": "ರಸೂಲ್ ಬಗ್ಗೆ ಕೇಳಿ", "chat.placeholder": "ಪ್ರಾಜೆಕ್ಟ್, ಕೌಶಲ್ಯಗಳ ಬಗ್ಗೆ ಕೇಳಿ…", "resume.download": "ಡೌನ್‌ಲೋಡ್",
};

const dicts: Record<Lang, Partial<Dict>> = { en, hi, kn };

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: Key) => string;
}
const I18nContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => en[k] });

function initialLang(): Lang {
  try {
    const s = localStorage.getItem("lang");
    if (s === "en" || s === "hi" || s === "kn") return s;
  } catch {}
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  useEffect(() => {
    try { localStorage.setItem("lang", lang); } catch {}
    document.documentElement.lang = lang;
  }, [lang]);
  const t = (k: Key) => dicts[lang][k] ?? en[k];
  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);