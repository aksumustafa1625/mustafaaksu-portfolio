import type { Locale } from "@/lib/i18n";

export const now: {
  lastUpdated: string;
  items: Record<Locale, string[]>;
} = {
  lastUpdated: "2026-05-12",
  items: {
    en: [
      "Preparing for the Salesforce Platform Developer II certification.",
      "Building and iterating on this portfolio site with Next.js 16 and Tailwind v4.",
      "Exploring Lightning Web Components performance patterns and reactive state.",
      "Open to Salesforce Developer roles in the EU and DACH region.",
    ],
    de: [
      "Bereite mich auf das Salesforce Platform Developer II-Zertifikat vor.",
      "Baue und iteriere an dieser Portfolio-Seite mit Next.js 16 und Tailwind v4.",
      "Erkunde Performance-Patterns und reaktive State-Verwaltung in Lightning Web Components.",
      "Offen für Salesforce-Entwicklerrollen in der EU und DACH-Region.",
    ],
  },
};
