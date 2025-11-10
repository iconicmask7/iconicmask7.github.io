# Suraj S Pillai — Personal Portfolio (Website)



This repository contains the source for my personal portfolio website — a modern, responsive, and slightly-stylized single-page site built with **Vite + React + TypeScript**, styled with **Tailwind CSS** and **shadcn-ui**. The site showcases my resume, featured projects, and a contact form (Formspree integration). The copy and structure are optimized for recruiters and ATS parsing while still looking polished for human visitors.

---

## Quick summary (what this repo contains)

* **Homepage / Resume** — Clean, ATS-friendly resume section pulled from my updated resume (Flutter Developer — Suraj S Pillai).
* **Projects** — Showcases real projects (E-commerce with Django API, Tourism app, Meals app, Farmers Fresh Zone, Expense tracker, Music player, Quiz, Todo).
* **Contact** — Animated contact form (Formspree endpoint) + Quick Connect cards (email, phone, LinkedIn, GitHub).
* **Design** — Single-column, accessible, responsive layout with subtle accent color and share/meta tags for social previews.
* **Tech stack**: Vite, React, TypeScript, Tailwind CSS, shadcn-ui, Framer Motion, lucide-react.

---

## Key Resume & Profile Highlights (engineered from resume)

* **Name / Role:** Suraj S Pillai — Flutter Developer / Mobile App Engineer
* **Experience:** 2+ years in mobile/full SDLC; production apps shipped to Play Store; backend integration with **Django REST APIs** and Firebase.
* **Core skills:** Flutter, Dart, Riverpod, GetX, Provider, Django, Firebase, REST API, CI/CD, Git.
* **Contact:** [surajspillai57@gmail.com](mailto:surajspillai57@gmail.com) • +91 9567846357 • linkedin.com/in/suraj-s-pillai-vk187 • github.com/iconicmask7

---

## Run locally (development)

Make sure you have Node.js (recommended via nvm) and npm/yarn/pnpm installed.

```bash
# 1. Clone repo
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# open http://localhost:5173 (or as printed in console)
```

---

## Environment / Formspree (contact form)

The contact form submits to Formspree. Use an environment variable to keep the endpoint configurable.

1. Create `.env.local` in the project root:

```
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/<your endpoint>
```

2. In the code, the fetch uses `import.meta.env.VITE_FORMSPREE_ENDPOINT` (Vite env prefix). Example:

```ts
const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
fetch(endpoint, { method: "POST", headers: {...}, body: JSON.stringify({...}) });
```

> Note: After the first incoming message you must confirm the form in Formspree (check the signup email / spam folder) so future submissions are delivered to your inbox.

---

## Build & Deploy

### Build

```bash
npm run build
# production files output to: dist/
```

### Deploy options (pick one)

* **GitHub Pages**

  * Add `"homepage": "https://<username>.github.io/<repo>"` to `package.json` (if needed).
  * Use a static deploy action, or push `dist/` to `gh-pages` branch using `gh-pages` or a GitHub Action.

* **Netlify**

  * Drag & drop `dist/` in Netlify, or connect repo and set build command `npm run build` and publish directory `dist/`.

* **Vercel**

  * Connect repo to Vercel — set build command `npm run build` and output directory `dist/`.

* **Lovable**

  * Use Lovable’s “Share → Publish” for a one-click publish from the Lovable interface.

---

## Recommended SEO / Social preview (meta)

Add these meta tags to `index.html` (replace placeholders):

```html
<meta property="og:title" content="Suraj S Pillai — Flutter Developer" />
<meta property="og:description" content="Flutter Developer building high-performance cross-platform apps. Explore projects, resume, and contact." />
<meta property="og:image" content="https://yourdomain.com/preview.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="description" content="Suraj S Pillai • Flutter Developer — E-commerce, Tourism, Meals apps with Django & Firebase integration. Contact for collaboration." />
```

A clear subject line helps avoid spam in Formspree emails:

```html
<input type="hidden" name="_subject" value="New Message from Suraj S Pillai Portfolio" />
```

---

## Accessibility & ATS best practices included

* Single-column layout (preferred by ATS)
* Plain-text resume download (`resume.pdf`) included
* Semantic HTML: `<header>`, `<section>`, `<main>`, `<footer>`
* High contrast and keyboard-focus styles
* Structured headings (H1/H2/H3) for scannability

---

## Files of interest

* `index.html` / `src/App.tsx` — main site structure & routing
* `src/components/Contact.tsx` — contact form + Quick Connect (Formspree integrated)
* `src/styles/` — Tailwind + global CSS
* `public/resume.pdf` — ATS-optimized resume PDF
* `README.md` — you are here

---

## Contributing

If you find typos or want to improve content:

1. Fork → create a branch
2. Make edits (resume copy, project descriptions, or UI/UX tweaks)
3. Submit a PR — I'll review and merge

If you want me to automatically sync resume updates (FlowCV → repo), we can add a small workflow or a script to convert your FlowCV export into `public/resume.pdf` and update it automatically.

---

## Contact & hiring

* **Email:** [surajspillai57@gmail.com](mailto:surajspillai57@gmail.com)
* **LinkedIn:** [https://linkedin.com/in/suraj-s-pillai-vk187](https://linkedin.com/in/suraj-s-pillai-vk187)
* **GitHub:** [https://github.com/iconicmask7](https://github.com/iconicmask7)

---

## License

This repository is open-source for portfolio/demo purposes. Use and adapt freely — please give credit if reused.

---

If you want, I can:

* Add a **Deploy → GitHub Actions** workflow that builds and publishes on every push to `main`.
* Generate a **social preview image** (`preview.png`) matching your resume style (blue accent, name, and headline).
* Create a **thank-you page** and wire `_redirect` for Formspree submissions.

Which of those should I add next?
