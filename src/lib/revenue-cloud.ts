import type { Locale } from "@/lib/i18n";

export type Capability = {
  id: string;
  cert?: string;
  translations: Record<Locale, { title: string; body: string }>;
};

export type LifecycleStage = {
  id: string;
  translations: Record<Locale, { title: string; body: string }>;
};

export const capabilities: Capability[] = [
  {
    id: "salesforce-cpq",
    cert: "CPQ Administrator certified",
    translations: {
      en: {
        title: "Salesforce CPQ",
        body: "Product catalogue design, pricing rules, quote lifecycle, contract generation, and renewal automation across the classic Sales Cloud path.",
      },
      de: {
        title: "Salesforce CPQ",
        body: "Produktkatalog-Design, Preisregeln, Angebots-Lifecycle, Vertragsgenerierung und Renewal-Automatisierung auf dem klassischen Sales-Cloud-Pfad.",
      },
    },
  },
  {
    id: "industries-cpq",
    cert: "Industries CPQ Developer certified",
    translations: {
      en: {
        title: "Industries CPQ",
        body: "Attribute-based pricing, context rules, account-context catalogues, and bundle configuration — the Vlocity-era stack used across communications, energy, and manufacturing.",
      },
      de: {
        title: "Industries CPQ",
        body: "Attributbasiertes Pricing, Context Rules, account-kontextbezogene Kataloge und Bundle-Konfiguration — der Vlocity-Stack für Communications, Energy und Manufacturing.",
      },
    },
  },
  {
    id: "rlm",
    translations: {
      en: {
        title: "Revenue Lifecycle Management",
        body: "Modern Revenue Cloud (post-Vlocity rebranding) — subscription products, usage-based pricing, ramp deals, amendments, and the new product-management surface.",
      },
      de: {
        title: "Revenue Lifecycle Management",
        body: "Modernes Revenue Cloud (Post-Vlocity-Rebranding) — Subscription-Produkte, usage-based Pricing, Ramp Deals, Amendments und das neue Product-Management-Surface.",
      },
    },
  },
  {
    id: "clm",
    translations: {
      en: {
        title: "Contract Lifecycle Management",
        body: "DocuSign envelope flow, Connect webhook landing on a Salesforce Site, Platform Event indirection to escape Guest User FLS limits, and Asset creation on signature.",
      },
      de: {
        title: "Contract Lifecycle Management",
        body: "DocuSign-Envelope-Flow, Connect-Webhook auf Salesforce Site, Platform-Event-Indirektion gegen Guest-User-FLS-Limits und Asset-Erstellung bei Signatur.",
      },
    },
  },
  {
    id: "q2c-architecture",
    translations: {
      en: {
        title: "Quote-to-Cash architecture",
        body: "End-to-end orchestration via MuleSoft Anypoint across seven external systems — Stripe with HMAC-SHA256 webhook verification, Sendcloud/DHL, JIRA, Slack, DocuSign, Notion.",
      },
      de: {
        title: "Quote-to-Cash-Architektur",
        body: "End-to-End-Orchestrierung via MuleSoft Anypoint über sieben externe Systeme — Stripe mit HMAC-SHA256-Webhook-Verifizierung, Sendcloud/DHL, JIRA, Slack, DocuSign, Notion.",
      },
    },
  },
  {
    id: "omnistudio",
    cert: "OmniStudio Developer + Consultant certified",
    translations: {
      en: {
        title: "OmniStudio",
        body: "DataRaptors, Integration Procedures, OmniScripts, and FlexCards — the OmniStudio surface that sits on top of Industries CPQ for guided sales and partner experiences.",
      },
      de: {
        title: "OmniStudio",
        body: "DataRaptors, Integration Procedures, OmniScripts und FlexCards — die OmniStudio-Oberfläche auf Industries CPQ für Guided Sales und Partner Experiences.",
      },
    },
  },
];

export const lifecycle: LifecycleStage[] = [
  {
    id: "product",
    translations: {
      en: {
        title: "Product & Catalogue",
        body: "Industries CPQ attribute-based catalogue with account-context filtering. Products grouped into bundles; pricing tied to attributes (volume, region, channel).",
      },
      de: {
        title: "Produkt & Katalog",
        body: "Industries-CPQ-Katalog mit Attribut-basiertem Pricing und Account-Kontext-Filterung. Produkte in Bundles; Preise an Attribute (Volumen, Region, Kanal) gebunden.",
      },
    },
  },
  {
    id: "quote",
    translations: {
      en: {
        title: "Quote & Configure",
        body: "Bundle configuration, attribute-driven pricing, DACH-specific 19% VAT formulas, and an approval chain. Quote artefacts ready for signature in one click.",
      },
      de: {
        title: "Angebot & Konfiguration",
        body: "Bundle-Konfiguration, attributgetriebenes Pricing, 19%-MwSt-Formeln für DACH und eine Freigabe-Kette. Angebots-Artefakte mit einem Klick signaturbereit.",
      },
    },
  },
  {
    id: "order",
    translations: {
      en: {
        title: "Order",
        body: "On activation, OrderTriggerHandler fans out in parallel to five downstream systems: JIRA (inventory ticket), Slack #warehouse (Platform Event → MuleSoft), DocuSign (envelope), Stripe (payment), branded invoice email.",
      },
      de: {
        title: "Auftrag",
        body: "Bei Aktivierung fächert OrderTriggerHandler parallel zu fünf Downstream-Systemen aus: JIRA (Bestandsticket), Slack #warehouse (Platform Event → MuleSoft), DocuSign (Envelope), Stripe (Zahlung), gebrandete Rechnungs-Mail.",
      },
    },
  },
  {
    id: "contract",
    translations: {
      en: {
        title: "Contract",
        body: "DocuSign Connect webhook lands on a Salesforce Site, publishes a Platform Event (escapes Guest User FLS), and an autolaunched Flow creates the Asset on signature.",
      },
      de: {
        title: "Vertrag",
        body: "DocuSign-Connect-Webhook landet auf einer Salesforce Site, publiziert ein Platform Event (umgeht Guest-User-FLS) und ein autolaunched Flow erstellt das Asset bei Signatur.",
      },
    },
  },
  {
    id: "asset",
    translations: {
      en: {
        title: "Asset & Subscription",
        body: "Asset created on contract signature drives the subscription state machine: active, paused, amended, renewed. License keys generated for digital products via the same fulfilment router.",
      },
      de: {
        title: "Asset & Subscription",
        body: "Asset bei Vertragssignatur treibt die Subscription-State-Machine: aktiv, pausiert, geändert, verlängert. Lizenzschlüssel für digitale Produkte über denselben Fulfilment-Router.",
      },
    },
  },
  {
    id: "billing",
    translations: {
      en: {
        title: "Billing & Settlement",
        body: "Stripe checkout via MuleSoft; HMAC-SHA256 webhook verified at the Mule edge, then scattered back to Salesforce (mark Paid), Slack #payments-team, and a Choice router for fulfilment — Sendcloud/DHL for physical, license-key generation for digital.",
      },
      de: {
        title: "Abrechnung & Settlement",
        body: "Stripe-Checkout via MuleSoft; HMAC-SHA256-Webhook am Mule-Edge verifiziert, dann zurück zu Salesforce (Status Paid), Slack #payments-team und einem Choice-Router für Fulfilment — Sendcloud/DHL für Physisches, Lizenzschlüssel für Digitales.",
      },
    },
  },
];
