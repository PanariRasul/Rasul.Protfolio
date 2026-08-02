import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Loader2 } from "lucide-react";

type Message = {
  type: "bot" | "user";
  text: string;
};

// Knowledge base for the bot — sourced from Rasul's resume
const knowledgeBase = {
  summary:
    "Rasul Panari is a results-driven Full Stack Web Developer with expertise in the MERN stack, specializing in scalable web applications and custom CRM solutions. He's proficient in React.js, Node.js, TypeScript, PostgreSQL, and MongoDB, with a proven track record building enterprise applications, email management platforms, and CRM systems focused on performance.",
  projects:
    "Rasul has architected 4+ full-stack projects and 5+ static websites, including Bounce Cure (email validation & campaign management), The Motor Desk (automotive service CRM), and the Abacco Internal CRM Suite (Lead CRM, Sales CRM, and Domain CRM). Ask me about any one of these by name for details!",
  bouncecure:
    "Bounce Cure (bouncecure.com) is a real-time email validation and campaign management platform built with React.js, Node.js, Express.js, and MongoDB. It reduced bounce rates by 60% for marketing campaigns, includes an analytics dashboard for open rates/CTR/conversions, integrates a CRM with automated follow-ups and segmentation, and handles 100K+ email validations daily with sub-second response times.",
  motordesk:
    "The Motor Desk (themotordesk.com) is a comprehensive automotive service CRM managing car, bike, and washing services. Built with React.js, Node.js, Express.js, and MongoDB, it handles 500+ daily appointments, real-time scheduling with payment processing and invoicing, SMS notifications, and a customer loyalty program that increased retention by 35%.",
  leadcrm:
    "Lead CRM is part of the Abacco Internal CRM Suite. It automates lead assignment with a drag-and-drop pipeline, increasing conversion rates by 25%. Built with React.js, Node.js, PostgreSQL, Prisma ORM, and TypeScript.",
  salescrm:
    "Sales CRM, also part of Abacco's Internal CRM Suite, includes forecasting tools and dashboards managing a $2M+ annual sales pipeline, with RBAC and RESTful APIs supporting 50+ concurrent users.",
  domaincrm:
    "Domain CRM automates renewal tracking for 1000+ domains with DNS management and billing integration — another module in the Abacco Internal CRM Suite.",
  clientsites:
    "Rasul also delivered SEO-optimized, mobile-responsive client websites (95+ PageSpeed scores, lazy loading, code splitting) for Abacco Technology, Procure Marketing, Shine Nest Services, and Data Snap Solutions using React Vite and Node.js.",
  experience:
    "Rasul is currently a Full Stack Web Developer / Web Architect at Abacco Technology in Bengaluru, Karnataka (June 2024 – Present). He architected full-stack apps using MERN with TypeScript, PostgreSQL, MongoDB, and Prisma ORM; designed 3 custom CRM solutions improving operational efficiency by 40%; built 7+ production-ready websites with 95+ PageSpeed scores; and led code reviews for a 5-member dev team.",
  skills:
    "Frontend: HTML5, CSS3, JavaScript (ES6+), React.js, Bootstrap, Styled Components. Backend: Node.js, Express.js, Python, Java. Databases: MongoDB, PostgreSQL, MySQL, Oracle SQL. Tools: Git, VS Code, Postman, Render, Cloudflare, Prisma ORM, TypeScript, Figma, Adobe XD.",
  education:
    "Rasul holds a Bachelor of Engineering in Computer Science (CGPA 7.6/10) from Government Engineering College, Talakal (VTU Belagavi). He completed his Pre-University Course (PCMB) at New Composite PU College, Raibag with 74%, and his SSLC at GS Kante High School, Nasalapur with 88.96% in 2018.",
  certifications:
    "Rasul is a certified MERN Full Stack Web Developer (Dev Town & Tap Academy) and a certified Java Full Stack Developer (Tap Academy).",
  languages:
    "Rasul speaks Kannada, Hindi, English, Marathi, and Urdu.",
  contact:
    "You can reach Rasul at panarirasul@gmail.com or call him at 7204986825. He's based in Bengaluru, Karnataka, India.",
  company: "Rasul works at Abacco Technology as a Web Architect and Full Stack Developer.",
  hire: "Rasul is open to new opportunities! You can contact him directly via email (panarirasul@gmail.com) or phone (7204986825) to discuss potential collaborations.",
  resume: "You can download Rasul's full resume from the navigation bar (top right) or the hero section of this website."
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: "bot", text: "Hi there! I'm Rasul's virtual assistant. Ask me about his projects (Bounce Cure, Motor Desk, CRM Suite), experience, skills, education, certifications, or contact info!" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setMessages(prev => [...prev, { type: "user", text: userText }]);
    setInputValue("");
    setIsTyping(true);

    // Process response
    setTimeout(() => {
      const lowerText = userText.toLowerCase();
      let reply = "I'm not sure about that specifically, but you can ask me about Rasul's projects, skills, experience, education, certifications, or how to contact him!";

      if (lowerText.includes("bounce") || lowerText.includes("email valid")) {
        reply = knowledgeBase.bouncecure;
      } else if (lowerText.includes("motor desk") || lowerText.includes("motordesk") || lowerText.includes("garage") || lowerText.includes("automotive")) {
        reply = knowledgeBase.motordesk;
      } else if (lowerText.includes("lead crm") || lowerText.includes("lead management")) {
        reply = knowledgeBase.leadcrm;
      } else if (lowerText.includes("sales crm") || lowerText.includes("sales pipeline") || lowerText.includes("forecast")) {
        reply = knowledgeBase.salescrm;
      } else if (lowerText.includes("domain crm") || lowerText.includes("domain")) {
        reply = knowledgeBase.domaincrm;
      } else if (lowerText.includes("client website") || lowerText.includes("procure") || lowerText.includes("shine nest") || lowerText.includes("data snap")) {
        reply = knowledgeBase.clientsites;
      } else if (lowerText.includes("project") || lowerText.includes("work") || lowerText.includes("built") || lowerText.includes("portfolio")) {
        reply = knowledgeBase.projects;
      } else if (lowerText.includes("education") || lowerText.includes("degree") || lowerText.includes("college") || lowerText.includes("cgpa") || lowerText.includes("university") || lowerText.includes("sslc") || lowerText.includes("puc")) {
        reply = knowledgeBase.education;
      } else if (lowerText.includes("certif")) {
        reply = knowledgeBase.certifications;
      } else if (lowerText.includes("language") || lowerText.includes("speak")) {
        reply = knowledgeBase.languages;
      } else if (lowerText.includes("experience") || lowerText.includes("job") || lowerText.includes("company") || lowerText.includes("abacco") || lowerText.includes("architect")) {
        reply = knowledgeBase.experience;
      } else if (lowerText.includes("skill") || lowerText.includes("stack") || lowerText.includes("tech") || lowerText.includes("react") || lowerText.includes("node") || lowerText.includes("database") || lowerText.includes("tool")) {
        reply = knowledgeBase.skills;
      } else if (lowerText.includes("contact") || lowerText.includes("email") || lowerText.includes("phone") || lowerText.includes("reach") || lowerText.includes("location") || lowerText.includes("bengaluru") || lowerText.includes("based")) {
        reply = knowledgeBase.contact;
      } else if (lowerText.includes("hire") || lowerText.includes("available") || lowerText.includes("freelance") || lowerText.includes("opportunit")) {
        reply = knowledgeBase.hire;
      } else if (lowerText.includes("resume") || lowerText.includes("cv")) {
        reply = knowledgeBase.resume;
      } else if (lowerText.includes("who") && (lowerText.includes("rasul") || lowerText.includes("you"))) {
        reply = knowledgeBase.summary;
      } else if (lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("hey")) {
        reply = "Hello! How can I help you learn more about Rasul today? Try asking about his projects, skills, education, or experience.";
      }

      setMessages(prev => [...prev, { type: "bot", text: reply }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="mb-4 w-[350px] h-[500px] bg-card border border-border/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10"
            >
              {/* Header */}
              <div className="bg-primary p-4 flex items-center justify-between shadow-lg z-10">
                <div className="flex items-center gap-3 text-primary-foreground">
                  <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold block text-sm">Rasul's Assistant</span>
                    <span className="text-xs opacity-80 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      Online
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors bg-white/10 hover:bg-white/20 p-1.5 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-muted/30 scroll-smooth">
                {messages.map((msg, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={idx}
                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-sm shadow-sm ${
                        msg.type === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none"
                          : "bg-card text-card-foreground border border-border rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-card border border-border p-3 rounded-2xl rounded-tl-none shadow-sm">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSend} className="p-3 border-t border-border bg-card">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about projects, education, skills..."
                    className="flex-1 bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground p-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground p-4 rounded-full shadow-xl shadow-primary/25 transition-all hover:scale-110 active:scale-95 border-4 border-background"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
      </div>
    </>
  );
}