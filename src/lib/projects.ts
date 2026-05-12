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
    slug: "portfolio-site",
    year: 2026,
    role: "Designer & Developer",
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Vercel"],
    liveUrl: "https://mustafaaksu.dev",
    repoUrl: "https://github.com/aksumustafa1625/mustafaaksu-portfolio",
    featured: true,
    translations: {
      en: {
        title: "Personal portfolio",
        tagline: "The site you're looking at. Built from scratch as a sandbox for new ideas.",
        problem:
          "I wanted a portfolio that felt like a product, not a template — bilingual, fast, and easy to extend with new case studies.",
        approach:
          "Next.js 16 App Router with the new proxy-based i18n, Tailwind v4 with custom variants for dark mode, shadcn/ui primitives, and Framer Motion for restrained animation.",
        outcome:
          "Sub-second loads, perfect Lighthouse scores, and a content model where adding a new project is just one TypeScript object.",
      },
      de: {
        title: "Persönliches Portfolio",
        tagline:
          "Die Seite, die du gerade siehst. Von Grund auf als Spielwiese für neue Ideen gebaut.",
        problem:
          "Ich wollte ein Portfolio, das sich wie ein Produkt anfühlt, nicht wie eine Vorlage — zweisprachig, schnell und leicht um neue Fallstudien erweiterbar.",
        approach:
          "Next.js 16 App Router mit dem neuen Proxy-basierten i18n, Tailwind v4 mit Custom-Variants für Dark Mode, shadcn/ui-Primitives und Framer Motion für zurückhaltende Animation.",
        outcome:
          "Ladezeiten unter einer Sekunde, perfekte Lighthouse-Werte und ein Content-Modell, bei dem ein neues Projekt nur ein TypeScript-Objekt ist.",
      },
    },
  },
  {
    slug: "project-placeholder-1",
    year: 2025,
    role: "Full-stack Engineer",
    tech: ["TypeScript", "Node.js", "PostgreSQL"],
    translations: {
      en: {
        title: "Replace me — Project #1",
        tagline: "A one-line description of what this project does.",
        problem: "Describe the problem this project solved.",
        approach: "Describe the technical approach and key decisions.",
        outcome: "Describe the measurable outcome or what you learned.",
      },
      de: {
        title: "Ersetz mich — Projekt #1",
        tagline: "Eine einzeilige Beschreibung, was dieses Projekt macht.",
        problem: "Beschreibe das Problem, das dieses Projekt gelöst hat.",
        approach: "Beschreibe den technischen Ansatz und wichtige Entscheidungen.",
        outcome: "Beschreibe das messbare Ergebnis oder was du gelernt hast.",
      },
    },
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
