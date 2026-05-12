// Generate an ATS-friendly Word CV for Mustafa Aksu.
//
// Usage:
//   npm run cv:generate    # writes cv.docx in the repo root

import fs from "node:fs/promises";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
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
    size: opts.size ?? 22, // half-points → 22 = 11pt
    color: opts.color,
    font: FONT,
  });

const p = (runs, opts = {}) =>
  new Paragraph({
    children: Array.isArray(runs) ? runs : [runs],
    spacing: { before: opts.before ?? 0, after: opts.after ?? 60 },
    alignment: opts.alignment,
  });

const blank = () =>
  new Paragraph({ children: [], spacing: { before: 0, after: 60 } });

const sectionHeading = (text) =>
  new Paragraph({
    children: [t(text.toUpperCase(), { bold: true, size: 24 })],
    spacing: { before: 240, after: 80 },
    border: {
      bottom: { color: "888888", space: 2, style: BorderStyle.SINGLE, size: 6 },
    },
  });

const bullet = (runs) =>
  new Paragraph({
    children: Array.isArray(runs) ? runs : [t(runs)],
    bullet: { level: 0 },
    spacing: { before: 0, after: 40 },
  });

const link = (text, href, opts = {}) =>
  new ExternalHyperlink({
    link: href,
    children: [
      new TextRun({
        text,
        style: "Hyperlink",
        size: opts.size ?? 22,
        font: FONT,
      }),
    ],
  });

const roleHeader = (titleText, organizationText, dateText) =>
  new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      t(titleText, { bold: true }),
      t(" — "),
      t(organizationText, { italic: true }),
      t("\t"),
      t(dateText),
    ],
    spacing: { before: 120, after: 40 },
  });

// ---------- content ----------

const header = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [t("Mustafa Aksu", { bold: true, size: 36 })],
    spacing: { after: 60 },
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      t("Salesforce Developer", { size: 24, color: "555555" }),
    ],
    spacing: { after: 60 },
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      t("Türkiye · Open to EU, DACH, Remote · "),
      link("mustafa.aksu@mustafaaksu.dev", "mailto:mustafa.aksu@mustafaaksu.dev"),
      t(" · "),
      link("mustafaaksu.dev", "https://mustafaaksu.dev"),
    ],
    spacing: { after: 60 },
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      link("LinkedIn", "https://www.linkedin.com/in/aksumustafa16/"),
      t("  ·  "),
      link("GitHub", "https://github.com/aksumustafa1625"),
      t("  ·  "),
      link("Trailhead (Five Star Ranger)", "https://www.salesforce.com/trailblazer/aksumustafa16"),
    ],
    spacing: { after: 120 },
  }),
];

const summary = [
  sectionHeading("Professional Summary"),
  p([
    t(
      "Salesforce Developer with 9 active certifications across Platform (PD I, PD II, Administrator, App Builder), Industry Solutions (OmniStudio Developer + Consultant, Industries CPQ), Sales Cloud (CPQ Admin), and Agentforce. Eight Trailhead Superbadges concentrated in Apex and integration (Advanced Apex, Apex Callouts, Apex Web Services, Inbound Integration Specialist, Named Credentials, Platform Events, Platform API). Five Star Ranger on Trailhead with 518 badges and 258,050 points.",
    ),
  ]),
  p([
    t(
      "Specialise in Apex architecture, asynchronous patterns (Queueable, Batch, Schedulable, Platform Events), and end-to-end integrations between Salesforce and external systems (MuleSoft, REST/SOAP APIs, payment gateways, e-signature). Comfortable owning a feature from declarative design through Apex trigger framework, unit tests, and deployment via SFDX and GitHub Actions. Master's degree in Computer Software Engineering. Bilingual portfolio in English and German, targeting the DACH Salesforce market.",
    ),
  ]),
];

const certifications = [
  sectionHeading("Salesforce Certifications"),
  bullet([t("Salesforce Certified OmniStudio Developer", { bold: true }), t(" — June 2025")]),
  bullet([t("Salesforce Certified OmniStudio Consultant", { bold: true }), t(" — June 2025")]),
  bullet([t("Salesforce Certified Industries CPQ Developer", { bold: true }), t(" — May 2025")]),
  bullet([t("Salesforce Certified Platform App Builder", { bold: true }), t(" — April 2025")]),
  bullet([t("Salesforce Certified CPQ Administrator", { bold: true }), t(" — March 2025")]),
  bullet([t("Salesforce Certified Agentforce Specialist", { bold: true }), t(" — January 2025")]),
  bullet([t("Salesforce Certified Platform Developer II", { bold: true }), t(" — December 2024")]),
  bullet([t("Salesforce Certified Platform Developer I", { bold: true }), t(" — November 2024")]),
  bullet([t("Salesforce Certified Administrator", { bold: true }), t(" — October 2024")]),
  bullet([
    t("Salesforce Certified AI Associate", { bold: true }),
    t(" — December 2024 (retired credential)", { italic: true }),
  ]),
];

const trailhead = [
  sectionHeading("Trailhead"),
  p([
    t("Profile: ", { bold: true }),
    link("salesforce.com/trailblazer/aksumustafa16", "https://www.salesforce.com/trailblazer/aksumustafa16"),
  ]),
  bullet([t("Rank: ", { bold: true }), t("Five Star Ranger (working toward All Star Ranger)")]),
  bullet([t("Badges: ", { bold: true }), t("518 · Points: 258,050 · Trails: 28")]),
  bullet([t("Superbadges (8): ", { bold: true }), t("Advanced Apex Specialist, Apex Specialist, Apex Callouts, Apex Web Services, Inbound Integration Specialist, Named Credentials, Platform Events, Platform API")]),
];

const skills = [
  sectionHeading("Technical Skills"),
  bullet([
    t("Salesforce Platform: ", { bold: true }),
    t("Apex (PD II), Lightning Web Components (LWC), Aura Components, SOQL / SOSL, Flow Builder, Validation Rules, Platform Events, Async Apex (Queueable, Batch, Schedulable), Visualforce"),
  ]),
  bullet([
    t("Industry Solutions: ", { bold: true }),
    t("OmniStudio (Developer + Consultant), Industries CPQ, Salesforce CPQ, Agentforce"),
  ]),
  bullet([
    t("Integration: ", { bold: true }),
    t("REST APIs, SOAP APIs, Named Credentials, External Services, Platform Events, Webhooks, MuleSoft Anypoint (basics)"),
  ]),
  bullet([
    t("Tools: ", { bold: true }),
    t("Salesforce DX (sfdx), VS Code + SF Extensions, Workbench, Data Loader, Postman, Schema Builder"),
  ]),
  bullet([
    t("DevOps: ", { bold: true }),
    t("Git, GitHub, GitHub Actions, CI/CD pipelines, Copado (basics)"),
  ]),
  bullet([
    t("Other: ", { bold: true }),
    t("HTML, CSS, Agile / SCRUM, JIRA, OAuth2, JSON, JWT"),
  ]),
  bullet([
    t("Languages: ", { bold: true }),
    t("Turkish (native), English (professional), German (basics — portfolio shipped bilingually)"),
  ]),
];

const projects = [
  sectionHeading("Salesforce Projects"),

  roleHeader(
    "TechnoStore — Quote-to-Cash on Salesforce Revenue Cloud",
    "Salesforce Developer / Solution Architect",
    "2025",
  ),
  bullet([
    t(
      "Built an end-to-end Quote-to-Cash demo for a B2B electronics supplier targeting the DACH market — Revenue Lifecycle Management (RLM) + Contract Lifecycle Management (CLM) + Industries CPQ on the Salesforce side.",
    ),
  ]),
  bullet([
    t(
      "Orchestrated seven external systems (Stripe, Sendcloud / DHL, DocuSign, JIRA, Slack ×2, Notion) via MuleSoft Anypoint Studio with HMAC-verified webhook callbacks.",
    ),
  ]),
  bullet([
    t(
      "Applied the Kevin O'Hara sfdc-trigger-framework across a six-package SFDX layout; achieved full Apex test coverage and published OpenAPI 3.0 specs for inbound webhooks.",
    ),
  ]),
  bullet([
    t(
      "Documented architecture as an arc42 blueprint plus a 50-entry STAR-format Notion portfolio generated programmatically via a custom Apex Notion-publishing service.",
    ),
  ]),
  bullet([
    t("Repository: ", { bold: true }),
    link("github.com/aksumustafa1625/TechnoStore", "https://github.com/aksumustafa1625/TechnoStore"),
  ]),

  roleHeader(
    "VoltStream Mobility — Channel-Partner Attribution",
    "Salesforce Developer",
    "2025",
  ),
  bullet([
    t(
      "Designed and implemented a B2B EV-charging CRM for the German e-mobility market modelled on EnBW / Ionity / Allego sales motions.",
    ),
  ]),
  bullet([
    t(
      "Custom Reseller__c object with indexed Company_Email__c as an External ID; Apex trigger auto-links Opportunities to the right channel partner via case-insensitive SOQL on insert and update.",
    ),
  ]),
  bullet([
    t(
      "Four-layer architecture (trigger → handler → service → matcher) on the Kevin O'Hara framework; 80 / 80 Apex tests passing with 100% coverage including bulk and negative scenarios.",
    ),
  ]),
  bullet([
    t(
      "Lookup relationship (not master-detail) so revenue data survives partner churn; reseller-revenue dashboards available out of the box.",
    ),
  ]),
  bullet([
    t("Repository: ", { bold: true }),
    link("github.com/aksumustafa1625/VoltStreamMobility", "https://github.com/aksumustafa1625/VoltStreamMobility"),
  ]),

  roleHeader(
    "Urla Shoes — Async-Callout Reference Pattern",
    "Salesforce Developer",
    "2024",
  ),
  bullet([
    t(
      "Reference implementation for Apex triggers that need to call external APIs — uses Queueable with Database.AllowsCallouts to overcome the trigger-callout limitation.",
    ),
  ]),
  bullet([
    t(
      "On Contact insert, enqueues a job that calls Nationalize.io, parses the JSON response, and writes the most-probable country code to Nationalized_Country__c.",
    ),
  ]),
  bullet([
    t(
      "Full test coverage with HttpCalloutMock across six scenarios: success, empty response, HTTP 500, missing FirstName, bulk insert of 10 records, and a direct unit test of the JSON parser.",
    ),
  ]),
  bullet([
    t("Repository: ", { bold: true }),
    link("github.com/aksumustafa1625/urla-shoes", "https://github.com/aksumustafa1625/urla-shoes"),
  ]),

  roleHeader(
    "mustafaaksu.dev — Personal Portfolio Site",
    "Designer + product owner",
    "2026",
  ),
  bullet([
    t(
      "Designed and shipped a bilingual (EN + DE) Salesforce-developer portfolio site at ",
    ),
    link("mustafaaksu.dev", "https://mustafaaksu.dev"),
    t(" hosted on Vercel with a GoDaddy custom domain; Lighthouse-perfect, dark-mode, SEO-ready (sitemap, robots, per-locale Open Graph images)."),
  ]),
  bullet([
    t(
      "Content modelled in TypeScript so adding a new project, certification, or Trailhead stat is a single object edit — site, sitemap, and a programmatically synced Notion documentation page all update from that source.",
    ),
  ]),
  bullet([
    t("Repository: ", { bold: true }),
    link("github.com/aksumustafa1625/mustafaaksu-portfolio", "https://github.com/aksumustafa1625/mustafaaksu-portfolio"),
  ]),
];

const education = [
  sectionHeading("Education"),

  roleHeader(
    "Master of Science in Computer Software Engineering",
    "North American University (NAU)",
    "Jan 2021 – May 2023",
  ),
  bullet(
    "Capstone: cloud-based SaaS subscription-billing application with JWT authentication, dynamic pricing modules, and Hibernate ORM persistence.",
  ),
  bullet(
    "Coursework: distributed systems, software architecture, database optimization (indexing, normalization, query tuning), NoSQL fundamentals, API security (OAuth2, rate limiting), TDD / BDD methodologies.",
  ),
  bullet(
    "Practiced Agile / SCRUM in bi-weekly sprints; led sprint planning, conducted code reviews, used Jira / Trello / Git / GitHub for distributed version control.",
  ),
  bullet(
    "Implemented CI/CD pipelines with Jenkins and GitHub Actions, automated tests (JUnit, TestNG), and Docker containerization.",
  ),

  roleHeader(
    "Postgraduate Degree in Information Technology",
    "Vistula University",
    "Jun 2019 – May 2020",
  ),
  bullet(
    "Advanced system architecture, software development, and data management — fully online international program, completed with strong self-discipline and remote-team collaboration habits.",
  ),

  roleHeader(
    "Bachelor of Education (BEd) — Turkish Language and Literature",
    "Balıkesir University",
    "Sep 1996 – Jun 2000",
  ),
  bullet(
    "Served as MC for the graduation ceremony; foundation in structured communication and presentation that transfers directly to technical demos and stakeholder briefings.",
  ),
];

const experience = [
  sectionHeading("Earlier Career"),

  roleHeader(
    "High School Counselor",
    "Nigerian Tulip International Colleges (NTIC) · Nigeria · On-site",
    "Sep 2014 – Jun 2017",
  ),
  bullet(
    "Guided a multicultural student body in an international school context; coordinated academic planning, mentoring, and personal-development programs.",
  ),
  bullet(
    "Developed strong cross-cultural communication and stakeholder-management skills that now translate to consulting-style work with global Salesforce teams.",
  ),

  roleHeader(
    "Turkish Language Teacher",
    "Sevgi Çiçeği Anafen Dershanesi · Türkiye · On-site",
    "Sep 2000 – Aug 2014",
  ),
  bullet(
    "Designed and delivered language curriculum to high-school students over 14 years at the same institution; sustained, results-oriented training programs.",
  ),
  bullet(
    "Honed structured presentation, mentoring, and explanation skills — directly applicable to demoing Salesforce solutions, training admin users, and communicating with non-technical stakeholders.",
  ),
];

// ---------- assemble ----------

const doc = new Document({
  creator: "Mustafa Aksu",
  title: "Mustafa Aksu — Salesforce Developer CV",
  description: "ATS-friendly CV generated from scripts/generate-cv.mjs",
  styles: {
    default: {
      document: { run: { font: FONT, size: 22 } },
    },
  },
  sections: [
    {
      properties: {
        page: {
          margin: { top: 720, bottom: 720, left: 720, right: 720 },
        },
      },
      children: [
        ...header,
        ...summary,
        ...certifications,
        ...trailhead,
        ...skills,
        ...projects,
        ...education,
        ...experience,
      ],
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
const outPath = "cv.docx";
await fs.writeFile(outPath, buffer);
console.log(`✓ Wrote ${outPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
