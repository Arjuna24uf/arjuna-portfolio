# Arjuna Rauf Surya Putra — 3D Web Portfolio

Modern Roman / Dark Marble & Crimson 3D interactive portfolio built with **React + Vite + Three.js (`@react-three/fiber` & `@react-three/drei`) + Framer Motion + Lenis**.

## ✨ Sections
1. **Hero** — Interactive 3D Roman marble statue (`patung.glb`) + orbiting 3D ruby crystals + crimson ember particles + portrait cutout + `Inspect 3D Statue` mode toggle.
2. **01. About Me** — Editorial bio, 3D-tilt info cards, and animated stats counter (`40.6K` YouTube subs, `1M+` TikTok likes, `23.4K` TikTok followers, `3` live web projects).
3. **02. Experience & Education** — Vertical timeline (`AkhibroGYM`, `Content Creator`, `Rotibo`, `Bless CCTV`) + Academic foundation (`Universitas Pamulang`, `SMK KI Hajar Dewantoro`).
4. **03. Featured Projects** — Category filter (`All`, `Web App`, `Website`, `Content`), spotlight case study for **CoachArjuna PT Management System**, cards for **Informatics Study Club**, **X-Fitness**, **A4A-AI**, **@arjuna.r_01**, and interactive project detail modal.
5. **04. Skills & Arsenal** — Interactive orbital core + transparent skill breakdown (`Using in Projects`, `Currently Learning`, `Content & Media`, `Human Skills`).
6. **05. Contact** — Roman crimson temple backdrop, quick WhatsApp/Email cards, and interactive contact form (WhatsApp pre-filled message by default, or direct email via `WEB3FORMS_KEY`).

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 🛠️ Customizing Content
All text, links, experiences, projects, and skills are centralized in:
- `src/data.js`

To enable direct email delivery from the Contact form (optional):
1. Create a free access key at [web3forms.com](https://web3forms.com) using `arjunarauf05@gmail.com`.
2. Paste the key into `WEB3FORMS_KEY` in `src/data.js`.
*(When left empty, the form automatically opens WhatsApp with the visitor's formatted message).*
