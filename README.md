# mustafaaksu.dev — Personal Portfolio

Source code for [mustafaaksu.dev](https://mustafaaksu.dev), the personal portfolio of Mustafa Aksu.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 with custom dark-mode variant
- **UI:** Hand-built primitives in `shadcn/ui` style + Framer Motion + Lucide
- **i18n:** English + German via `app/[lang]` + proxy-based locale detection
- **Hosting:** Vercel
- **Domain:** GoDaddy → Vercel

## Local development

```bash
npm install
npm run dev    # http://localhost:3000 → redirects to /en
```

Available scripts:

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Lint with the Next.js ESLint config |

## Project structure

```
src/
  app/
    [lang]/                  # locale-scoped routes (en, de)
      page.tsx               # /
      about/                 # /about
      projects/
        page.tsx             # /projects
        [slug]/page.tsx      # /projects/:slug
      skills/                # /skills
      contact/               # /contact
      layout.tsx             # root layout (header, footer, metadata)
      not-found.tsx          # localized 404
      opengraph-image.tsx    # dynamic OG image per locale
      dictionaries.ts        # server-only translation loader
      dictionaries/          # en.json, de.json
    page.tsx                 # / → redirect to default locale
    sitemap.ts               # sitemap.xml (all locales × all pages)
    robots.ts                # robots.txt
    globals.css              # Tailwind + theme tokens
  components/                # Header, Footer, ThemeToggle, etc.
  lib/
    i18n.ts                  # locale constants (client-safe)
    projects.ts              # project case studies
    skills.ts                # skills by category
    site.ts                  # site metadata (email, socials)
  proxy.ts                   # locale detection + redirect
```

## Adding a new project

1. Open `src/lib/projects.ts`.
2. Append a `Project` object with translations for `en` and `de`.
3. The list, detail page, sitemap, and home featured grid update automatically.

## Adding a new language

1. Add the locale to `src/lib/i18n.ts` (`locales`, `localeLabels`).
2. Create `src/app/[lang]/dictionaries/<locale>.json` mirroring `en.json`.
3. Add the loader entry in `src/app/[lang]/dictionaries.ts`.
4. Add the translation to every `Project` in `src/lib/projects.ts`.

## Deployment

The `main` branch deploys automatically to Vercel. The custom domain `mustafaaksu.dev` is configured in the Vercel dashboard and points to:

- A record (`@`): `76.76.21.21`
- CNAME (`www`): `cname.vercel-dns.com`

## License

© Mustafa Aksu. All rights reserved.
