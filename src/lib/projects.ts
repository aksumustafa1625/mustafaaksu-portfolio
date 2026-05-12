import type { Locale } from "@/lib/i18n";

export type Project = {
  slug: string;
  year: number;
  role: string;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  translations: Record<
    Locale,
    {
      title: string;
      tagline: string;
      problem: string;
      approach: string;
      outcome: string;
    }
  >;
};

export const projects: Project[] = [
  {
    slug: "technostore-salesforce-org",
    year: 2025,
    role: "Salesforce Developer",
    tech: [
      "Apex",
      "Lightning Web Components",
      "Flow Builder",
      "SOQL",
      "Named Credentials",
      "Notion API",
    ],
    featured: true,
    translations: {
      en: {
        title: "TechnoStore — Salesforce org and Notion publishing flow",
        tagline:
          "Internal Salesforce org with a STAR-format documentation pipeline that publishes interview prep entries to Notion.",
        problem:
          "The team needed a single source of truth in Salesforce for structured interview-prep entries, but also wanted them readable and shareable outside the org via Notion.",
        approach:
          "Built a custom object with STAR-format fields, an Apex service that calls the Notion API using Named Credentials and a hierarchical custom setting for the integration token and parent page id, and a Flow-triggered publish action.",
        outcome:
          "Authors edit entries inside Salesforce; published entries appear automatically as child pages under a Notion parent page, fully formatted. Re-publishing updates the existing page.",
      },
      de: {
        title: "TechnoStore — Salesforce-Org und Notion-Publishing-Flow",
        tagline:
          "Interne Salesforce-Org mit einer STAR-formatierten Dokumentationspipeline, die Interview-Prep-Einträge in Notion veröffentlicht.",
        problem:
          "Das Team brauchte eine zentrale Wahrheitsquelle in Salesforce für strukturierte Interview-Prep-Einträge, wollte sie aber auch außerhalb der Org über Notion lesbar und teilbar haben.",
        approach:
          "Custom Object mit STAR-Feldern, Apex-Service der die Notion-API über Named Credentials und ein hierarchisches Custom Setting für Token und Parent-Page-ID aufruft, plus eine Flow-getriggerte Publish-Action.",
        outcome:
          "Autoren bearbeiten Einträge in Salesforce; veröffentlichte Einträge erscheinen automatisch als Child-Pages unter einer Notion-Parent-Page, vollständig formatiert. Re-Publishing aktualisiert die bestehende Seite.",
      },
    },
  },
  {
    slug: "portfolio-site",
    year: 2026,
    role: "Designer & Developer",
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Framer Motion",
      "Vercel",
    ],
    liveUrl: "https://mustafaaksu.dev",
    repoUrl: "https://github.com/aksumustafa1625/mustafaaksu-portfolio",
    featured: true,
    translations: {
      en: {
        title: "Personal portfolio (this site)",
        tagline:
          "The site you're looking at. Built from scratch as a sandbox for new ideas and a vitrine for Salesforce work.",
        problem:
          "I wanted a portfolio that felt like a product, not a template — bilingual, fast, and easy to extend with new case studies as my Salesforce experience grows.",
        approach:
          "Next.js 16 App Router with the new proxy-based i18n, Tailwind v4 with custom variants for dark mode, shadcn/ui-style hand-built primitives, and Framer Motion for restrained animation.",
        outcome:
          "Sub-second loads, perfect Lighthouse scores, and a content model where adding a new project or certification is just one TypeScript object.",
      },
      de: {
        title: "Persönliches Portfolio (diese Seite)",
        tagline:
          "Die Seite, die du gerade siehst. Von Grund auf als Spielwiese für neue Ideen und als Vitrine für Salesforce-Arbeit gebaut.",
        problem:
          "Ich wollte ein Portfolio, das sich wie ein Produkt anfühlt, nicht wie eine Vorlage — zweisprachig, schnell und leicht um neue Fallstudien erweiterbar, während meine Salesforce-Erfahrung wächst.",
        approach:
          "Next.js 16 App Router mit dem neuen Proxy-basierten i18n, Tailwind v4 mit Custom-Variants für Dark Mode, von Hand gebaute Primitives im shadcn/ui-Stil und Framer Motion für zurückhaltende Animation.",
        outcome:
          "Ladezeiten unter einer Sekunde, perfekte Lighthouse-Werte und ein Content-Modell, bei dem ein neues Projekt oder Zertifikat nur ein TypeScript-Objekt ist.",
      },
    },
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
