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
    slug: "technostore-revenue-cloud",
    year: 2025,
    role: "Salesforce Developer / Solution Architect",
    tech: [
      "Apex",
      "Revenue Lifecycle Management",
      "Contract Lifecycle Management",
      "Industries CPQ",
      "MuleSoft Anypoint",
      "Platform Events",
      "Named Credentials",
      "Stripe",
      "DocuSign",
    ],
    featured: true,
    translations: {
      en: {
        title: "TechnoStore — Quote-to-Cash on Salesforce Revenue Cloud",
        tagline:
          "End-to-end Quote-to-Cash demo for a B2B electronics supplier in the DACH market — RLM + CLM + Industries CPQ orchestrated with MuleSoft across seven external systems.",
        problem:
          "DACH enterprise Salesforce roles (T-Systems, Allianz, Mercedes-Benz.io, BMW Group IT) consistently ask for the same mix: Revenue Cloud on the Salesforce side plus real MuleSoft + payment + logistics + e-signature integration on the orchestration side. Most portfolio projects show one or the other, not both.",
        approach:
          "Built a coherent 12-minute Quote-to-Cash narrative for a fictional B2B supplier: account-context-aware catalog → bundle configuration → quote with 19% VAT → order activation that fans out to JIRA, Slack #warehouse via Platform Event, DocuSign, and Stripe via MuleSoft. Stripe webhook (HMAC-verified) flips the order to Paid, triggers shipping via Sendcloud/DHL, and tracks the contract back to Signed. Apex follows the Kevin O'Hara trigger-framework pattern across a six-package SFDX layout. Architecture is documented as arc42 + 50 STAR-format entries published to Notion via a custom Apex service.",
        outcome:
          "A repeatable demo of seven external systems integrating with Salesforce in real time, suitable for both portfolio interviews and customer-facing solution conversations. 100% Apex test coverage, full OpenAPI 3.0 specs for inbound webhooks, and a Copado migration plan documented for production scaling.",
      },
      de: {
        title: "TechnoStore — Quote-to-Cash auf Salesforce Revenue Cloud",
        tagline:
          "Ende-zu-Ende Quote-to-Cash-Demo für einen B2B-Elektronikhändler im DACH-Markt — RLM + CLM + Industries CPQ, orchestriert mit MuleSoft über sieben externe Systeme.",
        problem:
          "DACH-Enterprise-Salesforce-Rollen (T-Systems, Allianz, Mercedes-Benz.io, BMW Group IT) verlangen konsequent denselben Mix: Revenue Cloud auf Salesforce-Seite plus echte MuleSoft- + Payment- + Logistik- + E-Signature-Integration auf der Orchestrierungsseite. Die meisten Portfolio-Projekte zeigen eines von beiden, nicht beides.",
        approach:
          "Eine zusammenhängende 12-Minuten-Quote-to-Cash-Story für einen fiktiven B2B-Lieferanten: Account-kontextbezogener Katalog → Bundle-Konfiguration → Angebot mit 19 % USt. → Auftragsaktivierung, die zu JIRA, Slack #warehouse via Platform Event, DocuSign und Stripe via MuleSoft ausfächert. Stripe-Webhook (HMAC-verifiziert) setzt den Auftrag auf Bezahlt, triggert Versand via Sendcloud/DHL und führt den Vertrag zurück zu Signiert. Apex folgt dem Kevin-O'Hara-Trigger-Framework-Pattern in einem Sechs-Paket-SFDX-Layout. Architektur dokumentiert als arc42 + 50 STAR-Einträge, programmatisch via Apex nach Notion publiziert.",
        outcome:
          "Eine wiederholbare Demo von sieben externen Systemen, die in Echtzeit mit Salesforce integrieren — geeignet sowohl für Portfolio-Interviews als auch für kundennahe Lösungsgespräche. 100 % Apex-Testabdeckung, vollständige OpenAPI-3.0-Specs für eingehende Webhooks und ein dokumentierter Copado-Migrationsplan für den Produktionsbetrieb.",
      },
    },
  },
  {
    slug: "voltstream-mobility",
    year: 2025,
    role: "Salesforce Developer",
    tech: [
      "Apex",
      "Custom Objects",
      "Trigger Framework",
      "SOQL",
      "Lightning App Builder",
      "Reports & Dashboards",
    ],
    featured: true,
    translations: {
      en: {
        title: "VoltStream Mobility — Channel-partner attribution for EV charging sales",
        tagline:
          "B2B EV charging CRM where one field on an Opportunity auto-links the deal to the right channel partner via Apex. Built around the German e-mobility hiring market (EnBW, Ionity, Allego, Mercedes-Benz Mobility).",
        problem:
          "Channel-partner attribution is a real workflow gap on most B2B Salesforce orgs: sales reps enter Opportunities manually and forget to credit the reseller that sourced the deal, so revenue-by-partner reports go dark. Manual lookup is slow and error-prone, and German e-mobility companies sell through electrical contractors, auto dealers, hotel chains, and parking operators — each tracked as a separate channel.",
        approach:
          "Custom Reseller__c object with Company_Email__c as an indexed unique external ID. Sales rep enters the reseller email on the Opportunity; an after-insert/after-update Apex trigger (Kevin O'Hara framework, four-layer pattern: trigger → handler → service → matcher) does a case-insensitive SOQL lookup against active resellers and populates the lookup field. Lookup relationship chosen over master-detail so revenue data outlives partner churn. Permission set scoped to the Sales profile.",
        outcome:
          "80 of 80 Apex tests passing with 100% coverage including bulk, edge, and negative cases. Reseller-attributed revenue dashboards work out of the box. Reusable pattern transferable to any channel-driven B2B org in DACH. Next phase: extend the schema with Salesforce CPQ for hardware-bundle pricing.",
      },
      de: {
        title: "VoltStream Mobility — Channel-Partner-Attribution für E-Mobility-Vertrieb",
        tagline:
          "B2B-CRM für EV-Ladelösungen, bei dem ein Feld an der Opportunity den Deal via Apex automatisch dem richtigen Channel-Partner zuordnet. Gebaut für den deutschen E-Mobility-Stellenmarkt (EnBW, Ionity, Allego, Mercedes-Benz Mobility).",
        problem:
          "Channel-Partner-Attribution ist eine echte Workflow-Lücke in vielen B2B-Salesforce-Orgs: Reps erfassen Opportunities manuell und vergessen, den Reseller zu kreditieren, der den Deal gebracht hat — Revenue-by-Partner-Reports laufen ins Leere. Manuelle Lookups sind langsam und fehleranfällig, und deutsche E-Mobility-Firmen verkaufen über Elektrofachbetriebe, Autohäuser, Hotelketten und Parkplatzbetreiber — jeder als eigener Kanal.",
        approach:
          "Custom Object Reseller__c mit Company_Email__c als indizierte, eindeutige External ID. Rep trägt die Reseller-E-Mail in die Opportunity ein; ein after-insert/after-update Apex-Trigger (Kevin-O'Hara-Framework, vierschichtiges Pattern: Trigger → Handler → Service → Matcher) macht ein case-insensitive SOQL-Lookup auf aktive Reseller und befüllt das Lookup-Feld. Lookup statt Master-Detail gewählt, damit Revenue-Daten Partnerwechsel überleben. Permission Set auf das Sales-Profil zugeschnitten.",
        outcome:
          "80 von 80 Apex-Tests grün mit 100 % Coverage — inklusive Bulk-, Edge- und Negativfällen. Reseller-Revenue-Dashboards funktionieren out-of-the-box. Wiederverwendbares Pattern, das auf jede channel-getriebene B2B-Org in DACH übertragbar ist. Nächste Phase: Schema-Erweiterung mit Salesforce CPQ für Hardware-Bundle-Pricing.",
      },
    },
  },
  {
    slug: "urla-shoes-nationalize",
    year: 2024,
    role: "Salesforce Developer",
    tech: [
      "Apex Trigger",
      "Trigger Handler",
      "Queueable Apex",
      "Database.AllowsCallouts",
      "HTTP Callout",
      "HttpCalloutMock",
      "Remote Site Setting",
    ],
    featured: true,
    translations: {
      en: {
        title: "Urla Shoes — Contact nationalization via async callout",
        tagline:
          "Apex async-callout pattern: on Contact insert, a Queueable job hits the Nationalize.io API and writes the most likely country code back to the record.",
        problem:
          "Salesforce triggers can't make HTTP callouts directly, but the business wanted Contact records enriched at the moment of creation. A naive solution would have used a synchronous flow action and broken under load.",
        approach:
          "After-insert trigger → ContactTriggerHandler collects the new Contact IDs and enqueues a single Queueable job marked Database.AllowsCallouts. The job calls api.nationalize.io with the FirstName, parses the JSON response, picks the country with the highest probability, and updates Nationalized_Country__c. Bulk-safe by design — one Queueable handles up to 200 contacts per trigger invocation.",
        outcome:
          "Full test coverage with HttpCalloutMock across six scenarios: success, empty response, HTTP 500 error, missing FirstName, bulk-insert of 10 contacts, and a direct unit test of the JSON parser. A clean reference implementation for any Apex trigger that needs to hit an external API.",
      },
      de: {
        title: "Urla Shoes — Contact-Nationalisierung via Async-Callout",
        tagline:
          "Apex-Async-Callout-Pattern: Bei Contact-Insert ruft ein Queueable-Job die Nationalize.io-API auf und schreibt den wahrscheinlichsten Ländercode zurück auf den Datensatz.",
        problem:
          "Salesforce-Trigger können keine direkten HTTP-Callouts machen, aber das Business wollte Contact-Datensätze zum Zeitpunkt der Erstellung anreichern. Eine naive Lösung über synchrone Flow-Aktion würde unter Last brechen.",
        approach:
          "After-Insert-Trigger → ContactTriggerHandler sammelt die neuen Contact-IDs und enqueued einen einzelnen Queueable-Job mit Database.AllowsCallouts. Der Job ruft api.nationalize.io mit dem FirstName auf, parsed die JSON-Antwort, wählt das Land mit der höchsten Wahrscheinlichkeit und aktualisiert Nationalized_Country__c. Bulk-safe by design — ein Queueable verarbeitet bis zu 200 Kontakte pro Trigger-Invocation.",
        outcome:
          "Volle Testabdeckung mit HttpCalloutMock über sechs Szenarien: Erfolg, leere Antwort, HTTP-500-Fehler, fehlender FirstName, Bulk-Insert von 10 Kontakten und ein direkter Unit-Test des JSON-Parsers. Eine saubere Referenzimplementierung für jeden Apex-Trigger, der eine externe API erreichen muss.",
      },
    },
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
