import type { Locale } from "@/lib/i18n";

export type Integration = {
  name: string;
  href?: string;
  note?: string;
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
      { name: "Stripe", href: "https://stripe.com", note: "Checkout + webhook with HMAC-SHA256 verification" },
      { name: "Sendcloud / DHL", href: "https://www.sendcloud.com", note: "v3 API, DACH carrier prioritised" },
      { name: "DocuSign", href: "https://www.docusign.com", note: "Envelope creation + Connect webhook" },
      { name: "JIRA Cloud", href: "https://www.atlassian.com/software/jira", note: "Auto-ticket on inventory shortage" },
      { name: "Slack", href: "https://slack.com", note: "Two channels: #warehouse + #payments-team" },
      { name: "Notion", href: "https://www.notion.so", note: "Programmatic 50-entry portfolio publishing" },
      { name: "MuleSoft Anypoint", href: "https://www.mulesoft.com", note: "Orchestration layer for the whole flow" },
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
      "Apex (Queueable)",
      "Lightning Web Components",
      "Visualforce (bridge)",
      "Salesforce Einstein",
      "Prompt Templates",
      "ConnectApi.EinsteinLLM",
      "Named Credentials",
      "Remote Site Settings",
    ],
    integrations: [
      { name: "Google Maps Directions", href: "https://developers.google.com/maps", note: "Route geometry via VF + postMessage" },
      { name: "OpenWeatherMap", href: "https://openweathermap.org", note: "5-waypoint parallel forecast" },
      { name: "Salesforce Einstein (GPT-4o mini)", href: "https://www.salesforce.com/products/artificial-intelligence/einstein/", note: "Prompt Template safety assessment" },
      { name: "Nationalize.io", href: "https://nationalize.io", note: "Contact country prediction (secondary feature)" },
    ],
    highlights: {
      en: [
        "Three external APIs composed in a single user flow",
        "Five-waypoint parallel weather fetch via Promise.all",
        "GPT-4o mini reasoning via Einstein Prompt Template — output coloured red/amber/green by keyword classifier",
        "postMessage bridge between LWC and Visualforce to bypass Lightning Web Security for Google Maps",
        "Queueable Apex with full HttpCalloutMock test coverage on the secondary nationalization feature",
      ],
      de: [
        "Drei externe APIs in einem einzigen User-Flow komponiert",
        "Wetterabfrage für fünf Wegpunkte parallel via Promise.all",
        "GPT-4o-mini-Reasoning via Einstein Prompt Template — Output rot/gelb/grün eingefärbt per Schlagwort-Klassifizierer",
        "postMessage-Brücke zwischen LWC und Visualforce, um Lightning Web Security für Google Maps zu umgehen",
        "Queueable Apex mit voller HttpCalloutMock-Testabdeckung für das sekundäre Nationalize-Feature",
      ],
    },
    repoUrl: "https://github.com/aksumustafa1625/urla-shoes",
    notionUrl: "https://www.notion.so/Urla-Shoes-Documentation-Yedek-33310a2e9f8680c0a5acc0d6ccf49745",
    featured: true,
    translations: {
      en: {
        title: "Urla Shoes — Route safety with Google Maps, OpenWeather, and Salesforce Einstein",
        tagline:
          "A live demo combining three external integrations to plan a route, fetch weather along five waypoints, and let an Einstein Prompt Template (GPT-4o mini) decide whether the journey is safe.",
        problem:
          "Sales reps and field technicians in logistics-heavy industries plan routes on the day. Weather and conditions vary along the path, not just at the destination, and a single 'it's sunny in Frankfurt' check fails when the midpoint is hailing. Combining route geometry, multi-waypoint weather, and a judgement call into a Salesforce-native experience is the kind of multi-system composition that breaks naïve trigger-and-callout patterns.",
        architecture:
          "The routeWeather LWC is the orchestrator. It hosts a Visualforce page in an iframe (the only way to load Google Maps under Lightning Web Security) and communicates via postMessage: the LWC sends DRAW_ROUTE, the page responds with ROUTE_DONE plus the destination coordinates. The LWC then computes five waypoints (origin, 25 %, midpoint, 75 %, destination) and fires five parallel fetches to OpenWeatherMap via Promise.all. Once weather lands, the LWC POSTs a slim six-field-per-waypoint payload to the Apex RouteWeatherAnalysisService, which formats the data as text and invokes ConnectApi.EinsteinLLM.generateMessagesForPromptTemplate('RouteWeatherAnalysis', input). The GPT-4o mini response is rendered in a colour-coded card based on a keyword classifier (storm / ice / hazard → red; caution / careful → amber; otherwise green).",
        approach:
          "Three lessons drove the design. First, the LWC stays in charge of the user-facing flow so weather cards render before the AI verdict — graceful degradation if Einstein times out. Second, payloads are minimised: only six fields per waypoint cross the Apex boundary, keeping heap and serialisation cost low. Third, the secondary Nationalize.io feature on Contact insert is intentionally separated into a Queueable with Database.AllowsCallouts — bulk-safe, mocked end-to-end (success, empty array, HTTP 500, missing FirstName, ten-record bulk insert, parser unit test), and chosen over a synchronous trigger callout precisely because the demo is meant to be a reference implementation.",
        outcome:
          "A single screen where a rep types a destination and gets three layers of decision support: the route, the weather along the route, and an AI safety verdict — all running inside Salesforce, all using platform-native AI without leaving the Trust Layer. The same composition pattern transfers directly to fleet management, field service, and delivery scheduling apps the DACH market is full of.",
      },
      de: {
        title: "Urla Shoes — Routensicherheit mit Google Maps, OpenWeather und Salesforce Einstein",
        tagline:
          "Eine Live-Demo, die drei externe Integrationen kombiniert, um eine Route zu planen, das Wetter an fünf Wegpunkten zu holen und einen Einstein Prompt Template (GPT-4o mini) entscheiden zu lassen, ob die Reise sicher ist.",
        problem:
          "Vertriebsmitarbeiter und Außendiensttechniker in logistiklastigen Branchen planen Routen tagesaktuell. Wetter und Bedingungen schwanken entlang der Strecke, nicht nur am Ziel — ein simpler 'in Frankfurt scheint die Sonne'-Check versagt, wenn es auf halbem Weg hagelt. Die Komposition aus Routengeometrie, Wegpunkt-Wetter und einer Bewertungs-Empfehlung zu einer Salesforce-nativen Erfahrung ist genau die Mehrsystem-Komposition, an der naive Trigger-und-Callout-Muster scheitern.",
        architecture:
          "Die routeWeather-LWC ist der Orchestrator. Sie hostet eine Visualforce-Seite im iframe (der einzige Weg, Google Maps unter Lightning Web Security zu laden) und kommuniziert via postMessage: Die LWC sendet DRAW_ROUTE, die Seite antwortet mit ROUTE_DONE plus Zielkoordinaten. Die LWC berechnet dann fünf Wegpunkte (Start, 25 %, Mitte, 75 %, Ziel) und feuert fünf parallele Fetches gegen OpenWeatherMap via Promise.all. Sobald das Wetter ankommt, POSTet die LWC ein schlankes Payload mit sechs Feldern pro Wegpunkt an den Apex-Service RouteWeatherAnalysisService, der die Daten als Text formatiert und ConnectApi.EinsteinLLM.generateMessagesForPromptTemplate('RouteWeatherAnalysis', input) aufruft. Die GPT-4o-mini-Antwort wird in einer farbcodierten Karte basierend auf einem Schlagwort-Klassifizierer gerendert (storm / ice / hazard → rot; caution / careful → gelb; sonst grün).",
        approach:
          "Drei Lektionen prägten das Design. Erstens: Die LWC behält die Hoheit über den User-Flow, sodass Wetterkarten erscheinen, bevor das KI-Urteil eintrifft — Graceful Degradation, falls Einstein in Timeout läuft. Zweitens: Payloads minimiert — nur sechs Felder pro Wegpunkt überqueren die Apex-Grenze, Heap- und Serialisierungskosten bleiben niedrig. Drittens: Das sekundäre Nationalize.io-Feature beim Contact-Insert ist bewusst in einen Queueable mit Database.AllowsCallouts ausgelagert — bulk-safe, End-to-End gemockt (Erfolg, leere Antwort, HTTP 500, fehlender FirstName, Zehn-Datensatz-Bulk-Insert, Parser-Unit-Test) und gegenüber einem synchronen Trigger-Callout gewählt, weil die Demo explizit als Referenzimplementierung gedacht ist.",
        outcome:
          "Ein einziger Screen, auf dem ein Mitarbeiter ein Ziel eingibt und drei Entscheidungs-Layer bekommt: die Route, das Wetter entlang der Route und ein KI-Sicherheitsurteil — alles in Salesforce, alles mit plattformnativer KI ohne den Trust Layer zu verlassen. Dasselbe Kompositions-Muster überträgt sich direkt auf Fleet-Management-, Field-Service- und Delivery-Scheduling-Apps, von denen der DACH-Markt voll ist.",
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
    highlights: {
      en: [
        "Custom Reseller__c object with indexed External ID",
        "Four-layer Apex pattern: trigger → handler → service → matcher",
        "80 / 80 Apex tests, 100 % coverage",
        "Salesforce CPQ extension planned next",
      ],
      de: [
        "Custom Object Reseller__c mit indizierter External ID",
        "Vierschichtiges Apex-Pattern: Trigger → Handler → Service → Matcher",
        "80 / 80 Apex-Tests, 100 % Coverage",
        "Salesforce-CPQ-Erweiterung als nächster Schritt geplant",
      ],
    },
    repoUrl: "https://github.com/aksumustafa1625/VoltStreamMobility",
    featured: true,
    translations: {
      en: {
        title: "VoltStream Mobility — Channel-partner attribution for EV-charging sales",
        tagline:
          "B2B EV-charging CRM where one field on an Opportunity auto-links the deal to the right channel partner via Apex. Modelled on the German e-mobility hiring market (EnBW, Ionity, Allego, Mercedes-Benz Mobility).",
        problem:
          "Channel-partner attribution is a real workflow gap on most B2B Salesforce orgs: sales reps enter Opportunities manually and forget to credit the reseller that sourced the deal, so revenue-by-partner reports go dark. Manual lookup is slow and error-prone, and German e-mobility companies sell through electrical contractors, auto dealers, hotel chains, and parking operators — each tracked as a separate channel.",
        approach:
          "Custom Reseller__c object with Company_Email__c as an indexed unique External ID. Sales reps enter the reseller email on the Opportunity; an after-insert/after-update Apex trigger (Kevin O'Hara framework, four-layer pattern: trigger → handler → service → matcher) does a case-insensitive SOQL lookup against active resellers and populates the lookup field. Lookup relationship chosen over master-detail so revenue data outlives partner churn. Permission set scoped to the Sales profile.",
        outcome:
          "80 of 80 Apex tests passing with 100 % coverage including bulk, edge, and negative cases. Reseller-attributed revenue dashboards work out of the box. Reusable pattern transferable to any channel-driven B2B org in DACH. Next phase: extend the schema with Salesforce CPQ for hardware-bundle pricing.",
      },
      de: {
        title: "VoltStream Mobility — Channel-Partner-Attribution für E-Mobility-Vertrieb",
        tagline:
          "B2B-CRM für EV-Ladelösungen, bei dem ein Feld an der Opportunity den Deal via Apex automatisch dem richtigen Channel-Partner zuordnet. Gebaut für den deutschen E-Mobility-Stellenmarkt (EnBW, Ionity, Allego, Mercedes-Benz Mobility).",
        problem:
          "Channel-Partner-Attribution ist eine echte Workflow-Lücke in vielen B2B-Salesforce-Orgs: Reps erfassen Opportunities manuell und vergessen, den Reseller zu kreditieren, der den Deal gebracht hat — Revenue-by-Partner-Reports laufen ins Leere. Manuelle Lookups sind langsam und fehleranfällig, und deutsche E-Mobility-Firmen verkaufen über Elektrofachbetriebe, Autohäuser, Hotelketten und Parkplatzbetreiber — jeder als eigener Kanal.",
        approach:
          "Custom Object Reseller__c mit Company_Email__c als indizierte, eindeutige External ID. Reps tragen die Reseller-E-Mail in die Opportunity ein; ein after-insert/after-update Apex-Trigger (Kevin-O'Hara-Framework, vierschichtiges Pattern: Trigger → Handler → Service → Matcher) macht ein case-insensitive SOQL-Lookup auf aktive Reseller und befüllt das Lookup-Feld. Lookup statt Master-Detail gewählt, damit Revenue-Daten Partnerwechsel überleben. Permission Set auf das Sales-Profil zugeschnitten.",
        outcome:
          "80 von 80 Apex-Tests grün mit 100 % Coverage — inklusive Bulk-, Edge- und Negativfällen. Reseller-Revenue-Dashboards funktionieren out-of-the-box. Wiederverwendbares Pattern, das auf jede channel-getriebene B2B-Org in DACH übertragbar ist. Nächste Phase: Schema-Erweiterung mit Salesforce CPQ für Hardware-Bundle-Pricing.",
      },
    },
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
