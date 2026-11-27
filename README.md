# Rasul Panari — Portfolio

React + Vite + Tailwind frontend, small Express server, hosted on Render.
All content (projects, resume, experience, skills…) lives in **JSON files** and is edited from an **admin panel at `/admin`** — no database.

---

## 🚀 Run locally

```bash
npm install
cp .env.example .env      # optional, fill in keys
npm run dev               # http://localhost:5000
```

Production build: `npm run build` then `npm start`.

## ☁️ Render settings

| Setting | Value |
|---|---|
| Build command | `npm install && npm run build` |
| Start command | `npm start` |
| Environment | add the variables from `.env.example` |
| Health check path | `/api/health` |

### Keep the server awake (UptimeRobot)
1. Sign up at https://uptimerobot.com → **Add New Monitor**
2. Type **HTTP(s)**, URL `https://YOUR-SITE.onrender.com/api/health`
3. Interval **5 minutes** → Save

`/api/health` returns `{ "status": "ok", "uptime": … }`.

---

## ✏️ Admin panel (add projects, upload resume — no code)

**One-time setup (5 min):**
1. GitHub → Settings → Developer settings → **OAuth Apps → New OAuth App**
   - Homepage URL: `https://YOUR-SITE.onrender.com`
   - Authorization callback URL: `https://YOUR-SITE.onrender.com/api/callback`
2. Copy the **Client ID** and generate a **Client Secret**.
3. In Render → Environment add `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` → redeploy.
4. Make sure Render **Auto-Deploy** is ON (Settings → Build & Deploy).
5. Open `https://YOUR-SITE.onrender.com/admin` → **Login with GitHub**.
   Log in with the GitHub account that owns / can push to `PanariRasul/Rasul.Protfolio`.
   (If you rename the repo or branch, update `client/public/admin/config.yml` → `repo:` / `branch:`.)

**Daily use:**
- **Projects → New Project** → fill the form, drag in screenshots → **Publish**
- **Site settings → Profile, hero, resume & links** → upload new resume PDF → **Publish**
- Also editable: experience, skills, services, education, certificates, blog posts, availability badge, booking link, "currently learning", highlights.

Each Publish commits to GitHub → Render rebuilds → live in ~1–2 minutes.

---

## 🤖 AI chatbot
Add **one** free key in Render → Environment:
- `GEMINI_API_KEY` — https://aistudio.google.com/apikey (used first), or
- `GROQ_API_KEY` — https://console.groq.com/keys

The bot answers only from your site content (projects, skills, experience…). With no key it automatically falls back to a built-in keyword bot, so it never breaks. The key stays on the server (never sent to the browser). Rate-limited to 15 messages/minute per visitor.

## 📬 Contact form
Uses **Web3Forms** with your access key → messages arrive at `panarirasul@gmail.com`. Includes a honeypot spam trap.

---

## 🖼️ Replacing the placeholder images
All project screenshots are placeholders in `client/public/uploads/projects/<slug>-1.svg, -2.svg, -3.svg`.
**Easiest:** `/admin` → open the project → *Screenshots* → remove placeholders, upload real images (first image = cover).
Use **.webp or .jpg, ~1600 px wide, under 300 KB** for fast loading.
Certificates: `/admin` → Site settings → Certificates.

---

## ✅ What changed

**Fixes**
- Contact form now actually sends (Web3Forms) with loading / success / error states
- GitHub & LinkedIn links work everywhere
- Job start date unified to **June 2025** (from your resume); counts unified (9+ apps, 6+ websites, 1+ yrs)
- Light mode fixed across all sections (no more hard-coded white/grey text)
- Link-preview image (`og-image.png`) created + per-page titles/descriptions (also server-side, so WhatsApp/LinkedIn previews of project links show the right title)
- Chatbot no longer gives wrong directions; resume opens from navbar, hero, Ctrl+K
- Images: 1–1.6 MB PNGs → ~30 KB WebP; logos optimised
- Fluid cursor only on desktop with mouse (off on phones / reduced-motion); 3D globe only loads on tablet/desktop
- Pinch-zoom re-enabled; keyboard focus outlines; aria-labels on icon buttons
- Removed unused code & ~120 packages (database, login, 3D-hero, Replit plugin, duplicate logos)
- Server: gzip compression, long-cache for built assets, security headers, trust proxy for Render

**New**
- Project pages: always-visible **Know More** button, screenshot gallery + lightbox, Problem → Solution → Result, my role & contribution, challenges & solutions, Live / Code buttons, Next / Previous project, project filter (All / ERP-CRM / Websites)
- All 15 projects from your list (9 ERP/CRM + 6 websites)
- Services, grouped Skills, Highlights row, Currently Learning, GitHub activity graph, Certificates with images, Blog (`/blog`)
- WhatsApp floating button + WhatsApp in contact; optional booking link (Calendly/Cal.com — add it in /admin)
- Command palette (**Ctrl / ⌘ + K**), language toggle (English / हिन्दी / ಕನ್ನಡ for menus & headings), custom 404, loading screen, scroll progress bar, back-to-top, resume viewer, footer "last updated" + visitor counter
- AI chatbot (Gemini / Groq) with offline fallback
- Admin panel (Decap CMS) at `/admin`
- `/api/health`, `/sitemap.xml`, `/robots.txt`, JSON-LD structured data, optional Google Analytics (`VITE_GA_ID`)

---

## ⚠️ Please review
- **Bounce Cure & Motor Desk database:** your notes say PostgreSQL, your resume says MongoDB. The site follows your notes (PostgreSQL) — fix whichever is wrong.
- **Challenges, problem/solution text and highlights** on project pages were written by me from your descriptions and resume — check they match what you actually did. No made-up numbers were used.
- **Blog posts** are short drafts — edit or replace them in /admin.
- **Currently Learning** (Next.js, Docker, AWS) is a placeholder — change in /admin.
- **Timelines** are set to "2025 — Present" for all projects.
- **Visitor counter** uses the free counterapi.dev service; it hides itself if the service is down.
- Language toggle translates menus, headings and buttons; project text stays English.

## 📁 Where things are
```
client/src/content/          ← all editable content (JSON)
  site.json                  profile, hero, links, resume path, about, highlights, learning
  projects/*.json            one file per project
  blog/*.json                blog posts
  experience|education|skills|services|certificates.json
client/public/uploads/       ← images + resume.pdf (admin uploads go here)
client/public/admin/         ← admin panel (config.yml = form fields)
client/src/components/       ← UI sections
client/src/lib/i18n.tsx      ← EN / HI / KN translations
server/routes.ts             ← /api/health, /api/chat, admin login, sitemap
```
