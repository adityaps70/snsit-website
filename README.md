# Sea N Shore IT — snsit.co.in

Portfolio and services website for **Sea N Shore IT Solutions LLP**, built with Next.js 15,
Tailwind CSS v4, Framer Motion and components from [Magic UI](https://github.com/magicuidesign/magicui).

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Deploy to Hostinger (snsit.co.in)

```bash
npm run build      # writes the finished static site to ./out
```

1. hPanel > Websites > snsit.co.in > File Manager > `public_html`
2. Delete the old `index.html` and `assets` folder there.
3. Upload **everything inside `out/`** (keep the folder structure, including `_next/`).
4. Visit https://snsit.co.in

It also deploys as-is on Vercel or Netlify (framework preset: Next.js).

## Edit content

| Path | What it is |
| --- | --- |
| `components/site/content.ts` | All copy: projects, client logos, services, FAQ, contact details |
| `components/site/*.tsx` | Page sections (hero, work, services, about, process, FAQ, contact, footer) |
| `components/site/motion.tsx` | Framer Motion helpers: Reveal, Stagger, Magnetic, Tilt, Float |
| `components/magicui/*.tsx` | Magic UI components (copied in, so you own the code) |
| `app/globals.css` | Colour tokens, fonts, animation keyframes |
| `public/assets/` | Logos, project screenshots, social share image |

Project screenshots live in `public/assets/work/` — replace a file with the same name to update it.
The contact form opens WhatsApp (+91 82990 44462) with the visitor's message filled in.
