import bounceImg from "@assets/generated_images/email_campaign_dashboard_visualization..png";
import garageImg from "@assets/generated_images/automotive_workshop_digital_interface..png";
import hrImg from "@assets/generated_images/hr_management_network_concept..png";
import abstractImg from "@assets/generated_images/abstract_dark_technology_background_with_glowing_nodes_and_data_streams..png";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  desc: string;
  img: string;
  tags: string[];
  link: string;
  private: boolean;
  role: string;
  timeline: string;
  overview: string;
  features: string[];
  techStack: { label: string; items: string[] }[];
  impact: { value: string; label: string }[];
}

export const projects: Project[] = [
  {
    slug: "bounce-cure",
    title: "Bounce Cure",
    tagline: "Email Validation & Campaign Management Platform",
    desc: "Email campaign and mail validation platform with integrated CRM features. Helps businesses maintain healthy email lists and improve deliverability.",
    img: bounceImg,
    tags: ["React", "Node.js", "PostgreSQL", "CRM"],
    link: "https://www.bouncecure.com",
    private: false,
    role: "Full Stack Developer",
    timeline: "2024 — Present",
    overview:
      "Bounce Cure is a real-time email validation and campaign management SaaS built to help marketing teams keep their mailing lists clean and their deliverability high. The platform validates addresses at scale, tracks engagement, and automates follow-up sequences based on subscriber behavior.",
    features: [
      "Real-time email validation engine reducing bounce rates by 60% for marketing campaigns",
      "Analytics dashboard with open rates, click-through rate (CTR) tracking, and conversion metrics visualization",
      "CRM integration with automated follow-ups, customer segmentation, and campaign scheduling",
      "Optimized database queries handling 100K+ email validations daily with sub-second response times",
      "RESTful API for third-party integrations and bulk validation workflows",
    ],
    techStack: [
      { label: "Frontend", items: ["React.js", "Styled Components", "Chart visualizations"] },
      { label: "Backend", items: ["Node.js", "Express.js", "REST API"] },
      { label: "Database", items: ["MongoDB"] },
    ],
    impact: [
      { value: "60%", label: "Lower Bounce Rate" },
      { value: "100K+", label: "Daily Validations" },
      { value: "<1s", label: "Response Time" },
    ],
  },
  {
    slug: "motor-desk",
    title: "The Motor Desk",
    tagline: "Automotive Service CRM",
    desc: "Comprehensive Auto Garage CRM managing Cars, Bikes, and Washing services. Streamlines booking, inventory, and customer management.",
    img: garageImg,
    tags: ["Full Stack", "CRM", "Dashboard", "Automation"],
    link: "https://themotordesk.com",
    private: false,
    role: "Full Stack Developer",
    timeline: "2024 — Present",
    overview:
      "The Motor Desk is a comprehensive CRM built for automotive service businesses, managing car, bike, and washing service appointments end-to-end — from booking and scheduling through invoicing and customer retention.",
    features: [
      "Comprehensive CRM managing 500+ daily service appointments across car, bike, and washing services",
      "Real-time scheduling with integrated payment processing, invoice generation, and SMS notifications",
      "Customer loyalty program with automated service reminders, increasing retention by 35%",
      "Admin dashboard with revenue analytics, vendor performance tracking, and inventory management",
    ],
    techStack: [
      { label: "Frontend", items: ["React.js", "Responsive Dashboard UI"] },
      { label: "Backend", items: ["Node.js", "Express.js"] },
      { label: "Database", items: ["MongoDB"] },
    ],
    impact: [
      { value: "500+", label: "Daily Appointments" },
      { value: "35%", label: "Retention Increase" },
      { value: "3", label: "Service Lines" },
    ],
  },
  {
    slug: "lead-crm",
    title: "Lead CRM",
    tagline: "Sales Pipeline & Lead Management",
    desc: "Employee leads management system designed to track interactions, follow-ups, and conversion rates for sales teams.",
    img: hrImg,
    tags: ["Internal Tool", "Analytics", "Management"],
    link: "#",
    private: true,
    role: "Web Architect",
    timeline: "2024 — Present",
    overview:
      "Part of the Abacco Internal CRM Suite, Lead CRM automates lead assignment across the sales team with a drag-and-drop pipeline, giving managers visibility into every stage of the conversion funnel.",
    features: [
      "Automated lead assignment with a drag-and-drop pipeline, increasing conversion rates by 25%",
      "Interaction and follow-up tracking per lead with activity timelines",
      "Role-Based Access Control (RBAC) so reps only see their assigned leads",
      "Real-time WebSocket notifications for new leads and status changes",
    ],
    techStack: [
      { label: "Frontend", items: ["React.js", "TypeScript"] },
      { label: "Backend", items: ["Node.js", "Express.js", "WebSockets"] },
      { label: "Database", items: ["PostgreSQL", "Prisma ORM"] },
    ],
    impact: [
      { value: "25%", label: "Higher Conversion" },
      { value: "50+", label: "Concurrent Users" },
    ],
  },
  {
    slug: "sales-crm",
    title: "Sales CRM",
    tagline: "Forecasting & Pipeline Analytics",
    desc: "Enterprise sales CRM with forecasting tools and dashboards managing a multi-million dollar annual sales pipeline.",
    img: abstractImg,
    tags: ["Forecasting", "Dashboards", "Enterprise"],
    link: "#",
    private: true,
    role: "Web Architect",
    timeline: "2024 — Present",
    overview:
      "The Sales CRM module of the Abacco Internal CRM Suite gives leadership real-time forecasting and pipeline dashboards to manage a $2M+ annual sales pipeline with confidence.",
    features: [
      "Forecasting tools and dashboards managing $2M+ annual sales pipeline",
      "Custom reporting by rep, region, and deal stage",
      "RESTful APIs supporting 50+ concurrent users across the sales org",
      "RBAC-secured views for managers vs. individual contributors",
    ],
    techStack: [
      { label: "Frontend", items: ["React.js", "TypeScript"] },
      { label: "Backend", items: ["Node.js", "Express.js"] },
      { label: "Database", items: ["PostgreSQL", "Prisma ORM"] },
    ],
    impact: [
      { value: "$2M+", label: "Pipeline Managed" },
      { value: "50+", label: "Concurrent Users" },
    ],
  },
  {
    slug: "domain-crm",
    title: "Domain CRM",
    tagline: "Domain Portfolio & Renewal Management",
    desc: "Specialized CRM for managing domain portfolios, expiration dates, and client ownership details.",
    img: abstractImg,
    tags: ["Domain", "Management", "Alerts"],
    link: "#",
    private: true,
    role: "Web Architect",
    timeline: "2024 — Present",
    overview:
      "Domain CRM tracks over 1000 domains for Abacco and its clients, automating renewal alerts, DNS management, and billing so nothing expires unnoticed.",
    features: [
      "Automated renewal tracking for 1000+ domains",
      "DNS management integration and billing automation",
      "Expiration alerts via email/SMS ahead of renewal deadlines",
      "Ownership and client-mapping records for multi-tenant management",
    ],
    techStack: [
      { label: "Frontend", items: ["React.js", "TypeScript"] },
      { label: "Backend", items: ["Node.js", "Express.js"] },
      { label: "Database", items: ["PostgreSQL", "Prisma ORM"] },
    ],
    impact: [
      { value: "1000+", label: "Domains Tracked" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
