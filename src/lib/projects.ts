import type { Locale } from "@/lib/i18n";

export type Integration = {
  name: string;
  href?: string;
  note?: string;
  logoImage?: string;
};

export type Project = {
  slug: string;
  year: number;
  role: string;
  tech: string[];
  integrations?: Integration[];
  highlights?: Partial<Record<Locale, string[]>>;
  liveUrl?: string;
  repoUrl?: string;
  notionUrl?: string;
  demoImage?: string;
  demoImageAlt?: string;
  featured?: boolean;
  translations: Record<
    Locale,
    {
      title: string;
      tagline: string;
      problem: string;
      approach: string;
      outcome: string;
      architecture?: string;
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
      "SFDX (6 packages)",
      "Kevin O'Hara trigger framework",
      "OpenAPI 3.0",
      "arc42",
    ],
    integrations: [
      { name: "Stripe", href: "https://stripe.com", note: "Checkout + webhook with HMAC-SHA256 verification", logoImage: "/integrations/stripe.png" },
      { name: "Sendcloud / DHL", href: "https://www.sendcloud.com", note: "v3 API, DACH carrier prioritised", logoImage: "/integrations/sendcloud.png" },
      { name: "DocuSign", href: "https://www.docusign.com", note: "Envelope creation + Connect webhook", logoImage: "/integrations/docusign.png" },
      { name: "JIRA Cloud", href: "https://www.atlassian.com/software/jira", note: "Auto-ticket on inventory shortage", logoImage: "/integrations/jira.png" },
      { name: "Slack", href: "https://slack.com", note: "Two channels: #warehouse + #payments-team", logoImage: "/integrations/slack.png" },
      { name: "Notion", href: "https://www.notion.so", note: "Programmatic 50-entry portfolio publishing", logoImage: "/integrations/notion.png" },
      { name: "MuleSoft Anypoint", href: "https://www.mulesoft.com", note: "Orchestration layer for the whole flow", logoImage: "/integrations/mulesoft.png" },
    ],
    highlights: {
      en: [
        "7 external systems integrated end-to-end via MuleSoft + Apex",
        "60 Apex classes across 6 SFDX packages (~214 KB of code)",
        "10 Architecture Decision Records (Nygard format) + arc42 Solution Blueprint",
        "50-entry STAR-format Notion portfolio published programmatically",
        "DACH-specific: 19 % VAT formulas, DHL preference, DE/AT/CH address parsing",
        "Quote-to-Cash end-to-end latency measured at 2–6 seconds",
      ],
      de: [
        "7 externe Systeme End-to-End via MuleSoft + Apex integriert",
        "60 Apex-Klassen in 6 SFDX-Paketen (~214 KB Code)",
        "10 Architecture Decision Records (Nygard-Format) + arc42-Solution-Blueprint",
        "50 STAR-Einträge programmatisch nach Notion publiziert",
        "DACH-spezifisch: 19 % USt-Formeln, DHL-Präferenz, DE/AT/CH-Adressparsing",
        "Quote-to-Cash-Latenz End-to-End gemessen bei 2–6 Sekunden",
      ],
    },
    repoUrl: "https://github.com/aksumustafa1625/TechnoStore",
    notionUrl: "https://www.notion.so/TechnoStore-Interview-Prep-35d10a2e9f868035b2baf974792298c5",
    featured: true,
    translations: {
      en: {
        title: "TechnoStore — Revenue Cloud Quote-to-Cash for the DACH market",
        tagline:
          "End-to-end B2B electronics Quote-to-Cash demo on Salesforce Revenue Lifecycle Management, Contract Lifecycle Management, and Industries CPQ — orchestrated with MuleSoft Anypoint across seven external systems.",
        problem:
          "DACH enterprise Salesforce roles (T-Systems, Allianz Technology, Mercedes-Benz.io, BMW Group IT, SAP Industries practice) consistently ask for the same combination: Revenue Cloud + Industries CPQ on the Salesforce side, plus real MuleSoft + payment + logistics + e-signature integration on the orchestration side. Most portfolio projects demonstrate one or the other, not both, and almost none reflect German-market specifics such as Mehrwertsteuer, DHL preference, or multi-country address parsing.",
        architecture:
          "Reps work with an account-context-aware Industries CPQ catalogue. Bundle configuration triggers an asynchronous attribute-based pricing service. On Order activation, the OrderTriggerHandler fans out across five downstream systems in parallel: JIRA (direct Apex callout) for inventory tickets, Slack #warehouse (Platform Event → MuleSoft) for picking, DocuSign (Apex + Named Credential) for the contract envelope, Stripe (MuleSoft outbound) for payment, and a branded invoice email. The Stripe webhook arrives at MuleSoft, is HMAC-SHA256 verified, then scatters back to Salesforce (mark Paid), Slack #payments-team, and a Choice router for fulfilment — Sendcloud/DHL for physical items, license-key generation for digital. The DocuSign Connect webhook lands at a Salesforce Site, publishes a Platform Event to escape Guest User FLS limits, and an autolaunched Flow creates the Asset.",
        approach:
          "Code is organised into six SFDX packages (force-app + controllers + services + handlers + actions + tests) so architectural boundaries are visible at the filesystem level — a Service class calling ApexPages would be obvious in code review. All triggers extend the Kevin O'Hara TriggerHandler base with recursion guards and a bypass mechanism. Each external call uses a Named Credential and is wrapped in an idempotent service: the Stripe webhook checks Order.Status before mutating, DocuSign uses a Platform Event indirection to satisfy Guest User context, JIRA stays in direct Apex because the flow is synchronous and low-volume while Stripe goes via Mule for retry and queueing. The 50-entry Notion documentation is itself a feature: NotionPublishService.publishEnterprise() orchestrates six API calls per entry to work around Notion's two-level nesting limit.",
        outcome:
          "A coherent twelve-minute Quote-to-Cash demo narrative across seven external systems, ready for both portfolio interviews and customer-facing solution conversations. The project is documented as 10 Architecture Decision Records in Nygard format, an arc42 Solution Blueprint, OpenAPI 3.0 specs for inbound webhooks, and a 17-request Postman collection. Measured end-to-end latency lands at 2–6 seconds. The DACH framing — Mehrwertsteuer formulas, DHL preference, DE/AT/CH address parsing — is the level of detail German enterprises expect, not generic Salesforce knowledge.",
      },
      de: {
        title: "TechnoStore — Revenue Cloud Quote-to-Cash für den DACH-Markt",
        tagline:
          "End-to-End-Quote-to-Cash-Demo für B2B-Elektronik auf Salesforce Revenue Lifecycle Management, Contract Lifecycle Management und Industries CPQ — orchestriert mit MuleSoft Anypoint über sieben externe Systeme.",
        problem:
          "DACH-Enterprise-Salesforce-Rollen (T-Systems, Allianz Technology, Mercedes-Benz.io, BMW Group IT, SAP Industries Practice) verlangen konsequent dieselbe Kombination: Revenue Cloud + Industries CPQ auf Salesforce-Seite plus echte MuleSoft- + Payment- + Logistik- + E-Signature-Integration auf der Orchestrierungsseite. Die meisten Portfolio-Projekte zeigen eines von beiden, fast keines spiegelt deutsche Marktspezifika wie Mehrwertsteuer, DHL-Präferenz oder mehrsprachiges Adressparsing wider.",
        architecture:
          "Vertriebsmitarbeiter arbeiten mit einem account-kontextbezogenen Industries-CPQ-Katalog. Bundle-Konfiguration triggert einen asynchronen attributbasierten Pricing-Service. Bei Auftragsaktivierung fächert der OrderTriggerHandler parallel zu fünf Downstream-Systemen aus: JIRA (direkter Apex-Callout) für Bestandstickets, Slack #warehouse (Platform Event → MuleSoft) für Kommissionierung, DocuSign (Apex + Named Credential) für die Vertragsdose, Stripe (MuleSoft Outbound) für Zahlung und eine gebrandete Rechnungs-Mail. Der Stripe-Webhook trifft MuleSoft, wird HMAC-SHA256 verifiziert und streut zurück nach Salesforce (Status Paid), Slack #payments-team und einen Choice-Router für Fulfilment — Sendcloud/DHL für physische Ware, Lizenzschlüssel-Generierung für digitale. Der DocuSign-Connect-Webhook landet auf einer Salesforce Site, publiziert ein Platform Event, um die Guest-User-FLS-Limits zu umgehen, und ein Autolaunched Flow erstellt das Asset.",
        approach:
          "Der Code ist in sechs SFDX-Pakete aufgeteilt (force-app + controllers + services + handlers + actions + tests), sodass Architekturgrenzen schon auf Dateisystem-Ebene sichtbar sind — eine Service-Klasse, die ApexPages aufruft, fiele im Code-Review sofort auf. Alle Trigger erben vom Kevin-O'Hara-TriggerHandler mit Rekursionsschutz und Bypass-Mechanismus. Jeder externe Aufruf nutzt eine Named Credential und ist in einen idempotenten Service verpackt: Der Stripe-Webhook prüft Order.Status vor dem Mutieren, DocuSign nutzt eine Platform-Event-Indirektion für den Guest-User-Kontext, JIRA bleibt im direkten Apex, weil der Flow synchron und volumenarm ist — während Stripe über Mule geht wegen Retry und Queueing. Die 50-teilige Notion-Doku ist selbst Feature: NotionPublishService.publishEnterprise() orchestriert sechs API-Calls pro Eintrag, um Notions Zwei-Ebenen-Nesting-Limit zu umgehen.",
        outcome:
          "Eine zusammenhängende zwölfminütige Quote-to-Cash-Story über sieben externe Systeme, bereit sowohl für Portfolio-Interviews als auch für kundennahe Lösungsgespräche. Dokumentiert als 10 Architecture Decision Records im Nygard-Format, arc42-Solution-Blueprint, OpenAPI-3.0-Specs für eingehende Webhooks und eine 17-Request-Postman-Collection. Gemessene End-to-End-Latenz: 2–6 Sekunden. Die DACH-Ausrichtung — Mehrwertsteuer-Formeln, DHL-Präferenz, DE/AT/CH-Adressparsing — ist das Detaillevel, das deutsche Enterprises erwarten, nicht generisches Salesforce-Wissen.",
      },
    },
  },
  {
    slug: "urla-shoes-route-einstein",
    year: 2024,
    role: "Salesforce Developer",
    tech: [
      "Apex (Queueable, Schedulable)",
      "Lightning Web Components",
      "Visualforce (bridge)",
      "Salesforce Einstein",
      "Prompt Templates",
      "ConnectApi.EinsteinLLM",
      "Trigger Framework (Kevin O'Hara)",
      "Custom Settings (hierarchical)",
      "Platform Events",
      "Custom Objects",
      "HttpCalloutMock",
      "Remote Site Settings",
    ],
    integrations: [
      { name: "Google Maps Directions", href: "https://developers.google.com/maps", note: "Route geometry via VF iframe + postMessage; key from Custom Setting" },
      { name: "OpenWeatherMap", href: "https://openweathermap.org", note: "5-waypoint parallel forecast; key from Custom Setting" },
      { name: "Salesforce Einstein (GPT-4o mini)", href: "https://www.salesforce.com/products/artificial-intelligence/einstein/", note: "Prompt Template safety assessment via ConnectApi.EinsteinLLM" },
      { name: "Nationalize.io", href: "https://nationalize.io", note: "Contact country prediction on insert (Queueable + 6-scenario mock)" },
    ],
    highlights: {
      en: [
        "Route Safety LWC — Google Maps + 5-waypoint parallel OpenWeather + Einstein Prompt Template AI verdict in one screen",
        "Contact Enrichment Queueable — Nationalize.io with HttpCalloutMock across 6 scenarios (success, empty, HTTP 500, missing FirstName, bulk-10, parser test)",
        "Lead Queue Routing — scheduled batch + Lead_Shift_Event__e Platform Event + LWC dashboard for shift-based distribution",
        "Loan Sync Pipeline — Loan__c + Loan_Sync_Log__c custom objects + Opportunity-triggered sync + retry scheduler with audit logging",
        "Reseller Matching Engine — multi-criteria scoring + Opportunity trigger + LWC tier badge",
        "Platform foundations — extensible Kevin O'Hara TriggerHandler framework, round-robin task assignment, SLA expiry automation",
        "Senior pattern: API keys served from API_Config__c Custom Setting via ApiKeyService Apex helper — no secrets in source",
      ],
      de: [
        "Route-Safety-LWC — Google Maps + parallele 5-Wegpunkt-OpenWeather + Einstein-Prompt-Template-KI-Urteil auf einem Screen",
        "Contact-Enrichment-Queueable — Nationalize.io mit HttpCalloutMock über 6 Szenarien (Erfolg, leer, HTTP 500, fehlender FirstName, Bulk-10, Parser-Test)",
        "Lead-Queue-Routing — scheduled Batch + Lead_Shift_Event__e Platform Event + LWC-Dashboard für schichtbasierte Verteilung",
        "Loan-Sync-Pipeline — Loan__c + Loan_Sync_Log__c Custom Objects + Opportunity-getriggerter Sync + Retry-Scheduler mit Audit-Logging",
        "Reseller-Matching-Engine — mehrkriterielles Scoring + Opportunity-Trigger + LWC-Tier-Badge",
        "Plattform-Foundations — erweiterbares Kevin-O'Hara-TriggerHandler-Framework, Round-Robin-Task-Zuweisung, SLA-Ablauf-Automatisierung",
        "Senior-Pattern: API-Keys aus API_Config__c Custom Setting via ApiKeyService Apex-Helper — keine Secrets im Code",
      ],
    },
    repoUrl: "https://github.com/aksumustafa1625/urla-shoes",
    notionUrl: "https://www.notion.so/Urla-Shoes-Documentation-Yedek-33310a2e9f8680c0a5acc0d6ccf49745",
    demoImage: "/projects/urla-shoes-demo.png",
    demoImageAlt: "Route Safety LWC — Essen to Berlin route, 5-waypoint weather, Einstein AI safety verdict",
    featured: true,
    translations: {
      en: {
        title: "Urla Shoes — Multi-feature Salesforce platform sandbox",
        tagline:
          "A multi-feature Salesforce sandbox: route-safety AI composition (Google Maps + OpenWeather + Einstein), Contact enrichment via Nationalize.io, Lead Queue routing with Platform Events, Loan Sync with retry scheduler, a Reseller Matching engine, and a Custom-Setting-backed API key layer that keeps secrets out of source.",
        problem:
          "I needed a single Salesforce project that demonstrated platform breadth — multiple integration patterns, async Apex flavours, AI integration, custom data models, and the kind of secrets-out-of-source discipline that production orgs require. A single-feature demo wouldn't show how engineering decisions compose across an org.",
        architecture:
          "The headline feature is the routeWeather LWC — a three-integration composition. It hosts a Visualforce page (RouteMapPage) in an iframe (the only way to load Google Maps under Lightning Web Security) and communicates via postMessage: the LWC sends DRAW_ROUTE, the page responds with ROUTE_DONE plus the destination coordinates. The LWC then computes five waypoints (origin, 25 %, midpoint, 75 %, destination) and fires five parallel fetches to OpenWeatherMap via Promise.all. Once weather lands, the LWC POSTs a slim six-field-per-waypoint payload to the Apex RouteWeatherAnalysisService, which formats the data as text and invokes ConnectApi.EinsteinLLM.generateMessagesForPromptTemplate('RouteWeatherAnalysis', input). The GPT-4o mini response is rendered in a colour-coded card by a keyword classifier (storm/ice/hazard → red; caution/careful → amber; otherwise green). Around that headline sits a Lead Queue routing system (LeadQueueScheduler scheduled batch + Lead_Shift_Event__e Platform Event + leadShiftDashboard LWC), a Loan Sync Pipeline (Loan__c + Loan_Sync_Log__c custom objects with retry scheduler and audit logging), a Reseller Matching Engine (multi-criteria scoring service + Opportunity trigger + resellerTierBadge LWC), and an extensible TriggerHandler framework that every trigger in the org extends.",
        approach:
          "Three principles run through every feature. First, async by default — every external callout uses Queueable or Schedulable, no synchronous trigger callouts, no governor surprises under load. Second, secrets out of source — both the Google Maps and OpenWeather API keys live in an API_Config__c hierarchical Custom Setting, read at runtime via an ApiKeyService Apex class (instance property for VF, @AuraEnabled cacheable methods for LWC). The Visualforce page renders the Maps key via {!JSENCODE(mapsApiKey)} so it never appears as a literal in source; the LWC awaits getOpenWeatherApiKey() in connectedCallback. ApiKeyServiceTest gives 100 % coverage. Third, every trigger extends the same Kevin O'Hara TriggerHandler base — recursion guards, bypass mechanism, testable logic — so the routing, sync, matching, and contact-enrichment features all behave consistently under bulk load.",
        outcome:
          "A reference Salesforce sandbox a recruiter can clone, deploy, paste two API keys into Setup → Custom Settings → API Config → Manage, and watch run end-to-end. Six features across LWC, Apex, Visualforce, custom objects, Platform Events, scheduled batches, and Einstein AI — with the senior-engineering details (key management via Custom Setting, trigger framework, async-by-default, mocked tests) visible in the diff. The same patterns transfer directly to the multi-feature Salesforce orgs that mid-to-large DACH companies actually run.",
      },
      de: {
        title: "Urla Shoes — Multifeature Salesforce-Plattform-Sandbox",
        tagline:
          "Ein Multifeature Salesforce-Sandbox: KI-gestützte Routensicherheit (Google Maps + OpenWeather + Einstein), Contact-Enrichment via Nationalize.io, Lead-Queue-Routing mit Platform Events, Loan-Sync mit Retry-Scheduler, eine Reseller-Matching-Engine und ein Custom-Setting-basiertes API-Key-Layer, das Secrets aus dem Code hält.",
        problem:
          "Ich brauchte ein einzelnes Salesforce-Projekt, das Plattform-Breite demonstriert — mehrere Integrations-Patterns, Async-Apex-Varianten, KI-Integration, eigene Datenmodelle und die Secrets-aus-dem-Code-Disziplin, die Produktions-Orgs verlangen. Eine Single-Feature-Demo würde nicht zeigen, wie Engineering-Entscheidungen über eine Org hinweg komponieren.",
        architecture:
          "Das Headline-Feature ist die routeWeather-LWC — eine Drei-Integrations-Komposition. Sie hostet eine Visualforce-Seite (RouteMapPage) im iframe (der einzige Weg, Google Maps unter Lightning Web Security zu laden) und kommuniziert via postMessage: Die LWC sendet DRAW_ROUTE, die Seite antwortet mit ROUTE_DONE plus Zielkoordinaten. Die LWC berechnet dann fünf Wegpunkte (Start, 25 %, Mitte, 75 %, Ziel) und feuert fünf parallele Fetches gegen OpenWeatherMap via Promise.all. Sobald das Wetter ankommt, POSTet die LWC ein schlankes Sechs-Felder-pro-Wegpunkt-Payload an den Apex-Service RouteWeatherAnalysisService, der die Daten als Text formatiert und ConnectApi.EinsteinLLM.generateMessagesForPromptTemplate('RouteWeatherAnalysis', input) aufruft. Die GPT-4o-mini-Antwort wird in einer farbcodierten Karte gerendert per Schlagwort-Klassifizierer (storm/ice/hazard → rot; caution/careful → gelb; sonst grün). Drumherum sitzt ein Lead-Queue-Routing-System (LeadQueueScheduler scheduled Batch + Lead_Shift_Event__e Platform Event + leadShiftDashboard LWC), eine Loan-Sync-Pipeline (Loan__c + Loan_Sync_Log__c Custom Objects mit Retry-Scheduler und Audit-Logging), eine Reseller-Matching-Engine (mehrkriterieller Scoring-Service + Opportunity-Trigger + resellerTierBadge LWC) und ein erweiterbares TriggerHandler-Framework, von dem jeder Trigger in der Org erbt.",
        approach:
          "Drei Prinzipien laufen durch jedes Feature. Erstens: Async by default — jeder externe Callout nutzt Queueable oder Schedulable, keine synchronen Trigger-Callouts, keine Governor-Überraschungen unter Last. Zweitens: Secrets aus dem Code — sowohl der Google-Maps- als auch der OpenWeather-API-Key leben in einer API_Config__c-Hierarchical-Custom-Setting, zur Laufzeit gelesen via ApiKeyService Apex-Klasse (Instance-Property für VF, @AuraEnabled-cacheable-Methoden für LWC). Die Visualforce-Seite rendert den Maps-Key via {!JSENCODE(mapsApiKey)}, sodass er nie als Literal im Code erscheint; die LWC awaitet getOpenWeatherApiKey() im connectedCallback. ApiKeyServiceTest liefert 100 % Coverage. Drittens: Jeder Trigger erbt vom selben Kevin-O'Hara-TriggerHandler — Rekursionsschutz, Bypass-Mechanismus, testbare Logik — sodass Routing, Sync, Matching und Contact-Enrichment unter Bulk-Last konsistent verhalten.",
        outcome:
          "Ein Salesforce-Referenz-Sandbox, das ein Recruiter klonen, deployen, zwei API-Keys in Setup → Custom Settings → API Config → Manage einfügen und End-to-End laufen sehen kann. Sechs Features über LWC, Apex, Visualforce, Custom Objects, Platform Events, scheduled Batches und Einstein-KI — mit den Senior-Engineering-Details (Key-Management via Custom Setting, Trigger-Framework, Async-by-Default, gemockte Tests) im Diff sichtbar. Dieselben Patterns übertragen sich direkt auf die Multifeature-Salesforce-Orgs, die mittlere bis große DACH-Unternehmen tatsächlich betreiben.",
      },
    },
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
