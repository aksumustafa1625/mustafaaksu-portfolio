// Generate an ATS-friendly Word CV for Mustafa Aksu.
//
// Usage:
//   npm run cv:generate    # writes cv.docx in the repo root
//
// Keep the content here in sync with `scripts/generate-cv-pdf.mjs` (the
// .pdf equivalent). Single-column layout, Calibri, no images — chosen so
// applicant-tracking systems parse the text cleanly.
// Target length: 1–1.5 pages, projects-first ordering.

import fs from "node:fs/promises";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  TabStopType,
  TabStopPosition,
  BorderStyle,
  ExternalHyperlink,
} from "docx";

// ---------- helpers ----------

const FONT = "Calibri";

const t = (text, opts = {}) =>
  new TextRun({
    text,
    bold: opts.bold ?? false,
    italics: opts.italic ?? false,
    size: opts.size ?? 18, // half-points → 18 = 9pt body (was 22)
    color: opts.color,
    font: FONT,
  });

const p = (runs, opts = {}) =>
  new Paragraph({
    children: Array.isArray(runs) ? runs : [runs],
    spacing: { before: opts.before ?? 0, after: opts.after ?? 60 },
    alignment: opts.alignment,
  });

const sectionHeading = (text) =>
  new Paragraph({
    children: [t(text.toUpperCase(), { bold: true, size: 20 })],
    spacing: { before: 200, after: 60 },
    border: {
      bottom: { color: "888888", space: 2, style: BorderStyle.SINGLE, size: 6 },
    },
  });

const bullet = (runs) =>
  new Paragraph({
    children: Array.isArray(runs) ? runs : [t(runs)],
    bullet: { level: 0 },
    spacing: { before: 0, after: 30 },
  });

const link = (text, href, opts = {}) =>
  new ExternalHyperlink({
    link: href,
    children: [
      new TextRun({
        text,
        style: "Hyperlink",
        size: opts.size ?? 18,
        font: FONT,
      }),
    ],
  });

const roleHeader = (titleText, organizationText, dateText) =>
  new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      t(titleText, { bold: true, size: 19 }),
      t(" — ", { size: 19 }),
      t(organizationText, { italic: true, size: 19 }),
      t("\t"),
      t(dateText, { color: "555555" }),
    ],
    spacing: { before: 100, after: 20 },
  });

// "Label: long comma-separated tail" — used in Skills + Certifications
const labeledLine = (label, body) =>
  p([t(`${label}: `, { bold: true }), t(body)], { after: 30 });

// ---------- content ----------

const header = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [t("MUSTAFA AKSU", { bold: true, size: 36 })],
    spacing: { after: 40 },
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      t("Salesforce Developer  ·  Revenue Cloud  ·  Industries CPQ", {
        size: 22,
        color: "555555",
      }),
    ],
    spacing: { after: 60 },
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      t("Nigeria  ·  Open to relocation — Germany / DACH"),
    ],
    spacing: { after: 40 },
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      link("mustafa.aksu@mustafaaksu.dev", "mailto:mustafa.aksu@mustafaaksu.dev"),
      t("  ·  "),
      link("mustafaaksu.dev", "https://mustafaaksu.dev"),
      t("  ·  "),
      link("LinkedIn", "https://www.linkedin.com/in/aksumustafa16/"),
      t("  ·  "),
      link("GitHub", "https://github.com/aksumustafa1625"),
      t("  ·  "),
      link("Trailhead (Five Star Ranger)", "https://www.salesforce.com/trailblazer/aksumustafa16"),
    ],
    spacing: { after: 80 },
  }),
];

const summary = [
  sectionHeading("Professional Summary"),
  p([
    t(
      "Salesforce Developer with seven active certifications and eight Trailhead Superbadges, specialising in Apex architecture, async patterns (Queueable, Batch, Schedulable, Platform Events), and end-to-end integrations (MuleSoft, REST/SOAP, SAP S/4HANA). Owns Revenue Cloud (RLM + CLM) and Industries CPQ implementations from declarative design through trigger frameworks, unit testing, and SFDX / GitHub Actions deployment. MSc Computer Software Engineering · bilingual EN/DE portfolio · targeting Salesforce Developer roles in the DACH market.",
    ),
  ]),
];

const projects = [
  sectionHeading("Salesforce Projects"),

  roleHeader(
    "TechnoStore — Quote-to-Cash on Salesforce Revenue Cloud",
    "Salesforce Developer / Solution Architect",
    "2025 — present",
  ),
  bullet(
    "Built end-to-end Quote-to-Cash demo for a B2B electronics supplier targeting DACH — Revenue Lifecycle Management (RLM) + Contract Lifecycle Management (CLM) + Industries CPQ.",
  ),
  bullet(
    "Orchestrated seven external systems (Stripe, Sendcloud / DHL, DocuSign, JIRA, Slack ×2, Notion) via MuleSoft Anypoint Studio with HMAC-SHA256-verified webhook callbacks.",
  ),
  bullet(
    "Applied the Kevin O'Hara sfdc-trigger-framework across a six-package SFDX layout; full Apex test coverage; published OpenAPI 3.0 specs for inbound webhooks.",
  ),
  bullet(
    "Documented architecture as an arc42 blueprint plus a 50-entry STAR-format Notion portfolio generated programmatically via a custom Apex Notion-publishing service.",
  ),
  bullet(
    "Extending with SAP S/4HANA via MuleSoft (Product Master sync, Order Acknowledgment on activation) and a DATEV integration for the DACH back-office story.",
  ),
  bullet([
    t("Repository: ", { bold: true }),
    link("github.com/aksumustafa1625/TechnoStore", "https://github.com/aksumustafa1625/TechnoStore"),
  ]),

  roleHeader(
    "Urla Shoes — Route safety with Google Maps, OpenWeather & Einstein",
    "Salesforce Developer",
    "2024",
  ),
  bullet(
    "Live demo combining three external integrations to plan a route, fetch weather along five waypoints in parallel, and let an Einstein Prompt Template (GPT-4o mini) assess whether the journey is safe.",
  ),
  bullet(
    "routeWeather LWC orchestrates a Visualforce-bridge to load Google Maps under Lightning Web Security; postMessage between LWC and VF; five parallel Promise.all fetches to OpenWeather.",
  ),
  bullet(
    "RouteWeatherAnalysisService calls ConnectApi.EinsteinLLM.generateMessagesForPromptTemplate; AI verdict rendered in a colour-coded card by a keyword classifier (storm/ice → red; caution → amber; else green).",
  ),
  bullet(
    "Secondary feature: Contact-insert Queueable hits Nationalize.io with full HttpCalloutMock coverage across six scenarios (success, empty, HTTP 500, missing FirstName, bulk-10, parser unit test).",
  ),
  bullet([
    t("Repository: ", { bold: true }),
    link("github.com/aksumustafa1625/urla-shoes", "https://github.com/aksumustafa1625/urla-shoes"),
  ]),

  roleHeader(
    "VoltStream Mobility — Channel-Partner Attribution for EV Charging",
    "Salesforce Developer",
    "2025",
  ),
  bullet(
    "B2B EV-charging CRM modelled on the German e-mobility hiring market (EnBW, Ionity, Allego, Mercedes-Benz Mobility); auto-links Opportunities to the right channel partner via Apex.",
  ),
  bullet(
    "Custom Reseller__c object with indexed Company_Email__c as an External ID; case-insensitive SOQL lookup wired through a four-layer pattern (trigger → handler → service → matcher).",
  ),
  bullet(
    "80 / 80 Apex tests passing with 100 % coverage including bulk and negative scenarios. Lookup relationship chosen over master-detail so revenue data outlives partner churn.",
  ),
  bullet([
    t("Repository: ", { bold: true }),
    link(
      "github.com/aksumustafa1625/VoltStreamMobility",
      "https://github.com/aksumustafa1625/VoltStreamMobility",
    ),
  ]),

  roleHeader(
    "mustafaaksu.dev — Personal Portfolio Site",
    "Designer & Product Owner",
    "2026",
  ),
  bullet([
    t("Bilingual (EN + DE) Salesforce-developer portfolio at "),
    link("mustafaaksu.dev", "https://mustafaaksu.dev"),
    t(" hosted on Vercel; Lighthouse-perfect, dark-mode, SEO-ready (sitemap, robots, per-locale Open Graph images)."),
  ]),
  bullet(
    "Content modelled in TypeScript so adding a project, certification, or Trailhead stat is a single object edit — site, sitemap, and a synced Notion documentation page all update from that source.",
  ),
  bullet([
    t("Repository: ", { bold: true }),
    link(
      "github.com/aksumustafa1625/mustafaaksu-portfolio",
      "https://github.com/aksumustafa1625/mustafaaksu-portfolio",
    ),
  ]),
];

const skills = [
  sectionHeading("Technical Skills"),
  labeledLine(
    "Revenue Cloud",
    "Salesforce CPQ (Admin), Industries CPQ (Developer), Revenue Lifecycle Management (RLM), Contract Lifecycle Management (CLM), Salesforce Billing, Quote-to-Cash architecture, subscription & usage-based pricing",
  ),
  labeledLine(
    "Salesforce Platform",
    "Apex (PD II), Lightning Web Components (LWC), Aura, SOQL / SOSL, Flow Builder, Validation Rules, Platform Events, Async Apex (Queueable, Batch, Schedulable), Trigger frameworks (Kevin O'Hara), Visualforce",
  ),
  labeledLine(
    "Industry & AI",
    "Agentforce Specialist, Einstein Prompt Templates, ConnectApi.EinsteinLLM",
  ),
  labeledLine(
    "Integration",
    "REST APIs, SOAP APIs, Named Credentials, External Services, Platform Events, Webhooks (HMAC-SHA256), MuleSoft Anypoint, SAP S/4HANA, OpenAPI 3.0",
  ),
  labeledLine(
    "DevOps & Tools",
    "Salesforce DX (sfdx), VS Code + SF Extensions, Scratch Orgs, Workbench, Data Loader, Postman, Git, GitHub Actions, CI/CD pipelines, Salesforce DevOps Center, Copado (basics)",
  ),
  labeledLine(
    "Other",
    "JavaScript (ES6+), TypeScript, HTML, CSS, Agile / SCRUM, JIRA, OAuth2, JSON, JWT",
  ),
  labeledLine(
    "Languages",
    "Turkish (native), English (professional), German (Goethe A2 — in progress)",
  ),
];

const certifications = [
  sectionHeading("Salesforce Certifications"),
  labeledLine(
    "Platform",
    "Administrator (Oct 2024), Platform App Builder (Apr 2025), Platform Developer I (Nov 2024), Platform Developer II (Dec 2024)",
  ),
  labeledLine(
    "Industry & Revenue",
    "Industries CPQ Developer (May 2025), CPQ Administrator (Mar 2025)",
  ),
  labeledLine("AI", "Agentforce Specialist (Jan 2025)"),
];

const trailhead = [
  sectionHeading("Trailhead"),
  p([
    t("Five Star Ranger", { bold: true }),
    t("  ·  518 badges  ·  258K points  ·  8 Superbadges (Advanced Apex, Apex Specialist, Apex Callouts, Apex Web Services, Inbound Integration, Named Credentials, Platform Events, Platform API)  ·  "),
    link("@aksumustafa16", "https://www.salesforce.com/trailblazer/aksumustafa16"),
  ]),
];

const community = [
  sectionHeading("Community"),
  p([
    t("Founder & operator", { bold: true }),
    t(" — "),
    link("Salesforce Revenue Cloud | Germany", "https://www.linkedin.com/groups/10046805/"),
    t(" LinkedIn group (279 members)  ·  11,982 LinkedIn followers writing about Revenue Cloud, integrations, and the DACH Salesforce market."),
  ]),
];

const education = [
  sectionHeading("Education"),

  roleHeader(
    "MSc Computer Software Engineering",
    "North American University",
    "Jan 2021 — May 2023",
  ),
  p([
    t(
      "Capstone: cloud-based SaaS subscription-billing application with JWT authentication, dynamic pricing modules, and Hibernate ORM persistence. Coursework: distributed systems, software architecture, database optimization, NoSQL fundamentals, API security (OAuth2), TDD/BDD. CI/CD with Jenkins and GitHub Actions; JUnit/TestNG; Docker containerization.",
    ),
  ]),

  roleHeader(
    "Postgraduate Degree in Information Technology",
    "Vistula University",
    "Jun 2019 — May 2020",
  ),
  p([
    t(
      "Advanced system architecture, software development, and data management; fully online international program.",
    ),
  ]),

  roleHeader(
    "Bachelor of Education — Turkish Language and Literature",
    "Balıkesir University",
    "Sep 1996 — Jun 2000",
  ),
];

const earlierCareer = [
  sectionHeading("Earlier Career"),
  p([
    t(
      "2000 – 2020: Educator and ultimately Principal at Sevgi Çiçeği Anafen Dershanesi (Türkiye, 2000 – 2014), then Counselor at Nigerian Tulip International Colleges (Nigeria, 2014 – 2020) — foundation for leadership, structured communication, mentoring, and cross-cultural stakeholder management.",
    ),
  ]),
];

// ---------- assemble ----------

const doc = new Document({
  creator: "Mustafa Aksu",
  title: "Mustafa Aksu — Salesforce Developer CV",
  description: "ATS-friendly CV generated from scripts/generate-cv.mjs",
  styles: {
    default: {
      document: { run: { font: FONT, size: 18 } },
    },
  },
  sections: [
    {
      properties: {
        page: {
          margin: { top: 600, bottom: 600, left: 600, right: 600 },
        },
      },
      children: [
        ...header,
        ...summary,
        ...projects,
        ...skills,
        ...certifications,
        ...trailhead,
        ...community,
        ...education,
        ...earlierCareer,
      ],
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
const outPath = "cv.docx";
await fs.writeFile(outPath, buffer);
console.log(`✓ Wrote ${outPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
