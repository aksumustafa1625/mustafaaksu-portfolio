import type { Locale } from "@/lib/i18n";

export const now: {
  lastUpdated: string;
  items: Record<Locale, string[]>;
} = {
  lastUpdated: "2026-05-12",
  items: {
    en: [
      "Building the SAP S/4HANA ↔ Salesforce integration for TechnoStore — Product Master sync, Order Acknowledgment on activation, and a retry pattern in MuleSoft Anypoint. Currently mid-sprint (May 10–24).",
      "Next up after SAP: a DATEV integration — the DACH-standard bookkeeping system used across virtually every German Mittelstand company. Wiring it to Salesforce will close the back-office loop on TechnoStore.",
      "Deepening the case studies on mustafaaksu.dev with architecture write-ups, integration grids, and Notion links recruiters can dive into.",
      "Open to Salesforce Developer roles in the EU and DACH region.",
    ],
    de: [
      "Baue gerade die SAP-S/4HANA-↔-Salesforce-Integration für TechnoStore — Product-Master-Sync, Order Acknowledgment bei Aktivierung und ein Retry-Pattern in MuleSoft Anypoint. Mitten im Sprint (10.–24. Mai).",
      "Als Nächstes nach SAP: eine DATEV-Integration — das DACH-Standardsystem für Buchhaltung, das in nahezu jedem deutschen Mittelstandsbetrieb läuft. Die Anbindung an Salesforce schließt die Back-Office-Schleife bei TechnoStore.",
      "Vertiefe parallel die Fallstudien auf mustafaaksu.dev — mit Architektur-Notizen, Integrations-Grids und Notion-Links, in die Recruiter eintauchen können.",
      "Offen für Salesforce-Entwicklerrollen in der EU und DACH-Region.",
    ],
  },
};
