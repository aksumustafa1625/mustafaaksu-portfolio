// Generate an ATS-friendly PDF CV for Mustafa Aksu.
//
// Usage:
//   npm run cv:pdf    # writes public/cv.pdf (served by Vercel from the site)
//
// Keep the content here in sync with `scripts/generate-cv.mjs` (the .docx
// equivalent). Single-column layout, Helvetica (always available), no
// images — chosen so applicant-tracking systems parse the text cleanly.
// Target length: 1–1.5 A4 pages, projects-first ordering.

import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";

// ---------- layout constants ----------

const A4 = { width: 595, height: 842 };
const MARGIN = 36;
const CONTENT_WIDTH = A4.width - MARGIN * 2;

const COLOR_BODY = "#111111";
const COLOR_MUTED = "#555555";
const COLOR_RULE = "#888888";
const COLOR_LINK = "#0b5fff";

const FONT_REG = "Helvetica";
const FONT_BOLD = "Helvetica-Bold";
const FONT_ITAL = "Helvetica-Oblique";

// ---------- helpers ----------

function ensureRoom(doc, needed) {
  if (doc.y + needed > A4.height - MARGIN) {
    doc.addPage();
  }
}

function rule(doc) {
  doc
    .moveTo(MARGIN, doc.y)
    .lineTo(A4.width - MARGIN, doc.y)
    .strokeColor(COLOR_RULE)
    .lineWidth(0.5)
    .stroke();
}

function sectionHeading(doc, title) {
  ensureRoom(doc, 24);
  doc.moveDown(0.25);
  doc
    .font(FONT_BOLD)
    .fontSize(10)
    .fillColor(COLOR_BODY)
    .text(title.toUpperCase(), MARGIN, doc.y, {
      characterSpacing: 1.2,
      width: CONTENT_WIDTH,
    });
  doc.moveDown(0.05);
  rule(doc);
  doc.moveDown(0.12);
}

function paragraph(doc, text, opts = {}) {
  ensureRoom(doc, 20);
  doc
    .font(FONT_REG)
    .fontSize(opts.size ?? 9)
    .fillColor(COLOR_BODY)
    .text(text, MARGIN, doc.y, {
      width: CONTENT_WIDTH,
      lineGap: 1,
      align: opts.align ?? "left",
    });
  doc.moveDown(opts.after ?? 0.1);
}

function bullet(doc, runs) {
  ensureRoom(doc, 16);
  const startY = doc.y;
  doc
    .font(FONT_REG)
    .fontSize(9)
    .fillColor(COLOR_BODY)
    .text("•", MARGIN, startY, { continued: false, width: 10 });

  doc.font(FONT_REG).fontSize(9).fillColor(COLOR_BODY);
  doc.y = startY;
  doc.x = MARGIN + 11;
  const innerWidth = CONTENT_WIDTH - 11;

  const list = Array.isArray(runs) ? runs : [{ text: runs }];
  list.forEach((run, idx) => {
    const isLast = idx === list.length - 1;
    if (run.font === "bold") doc.font(FONT_BOLD);
    else if (run.font === "italic") doc.font(FONT_ITAL);
    else doc.font(FONT_REG);

    if (run.color) doc.fillColor(run.color);
    else doc.fillColor(COLOR_BODY);

    doc.text(run.text, {
      continued: !isLast,
      width: innerWidth,
      link: run.link ?? undefined,
      underline: !!run.link,
      lineGap: 1,
    });
  });

  doc.x = MARGIN;
  doc.moveDown(0.04);
}

// "Label: long comma-separated tail that wraps to the available width."
function labeledLine(doc, label, body) {
  ensureRoom(doc, 14);
  doc.font(FONT_BOLD).fontSize(9).fillColor(COLOR_BODY);
  doc.text(`${label}: `, MARGIN, doc.y, { continued: true });
  doc.font(FONT_REG);
  doc.text(body, { width: CONTENT_WIDTH, lineGap: 1 });
  doc.moveDown(0.06);
}

function roleHeader(doc, titleText, organizationText, dateText) {
  ensureRoom(doc, 18);
  doc.moveDown(0.15);
  const y = doc.y;

  doc.font(FONT_BOLD).fontSize(9.5).fillColor(COLOR_BODY);
  doc.text(titleText, MARGIN, y, { continued: true, width: CONTENT_WIDTH });
  doc.font(FONT_ITAL).text(`  —  ${organizationText}`, { continued: false });

  doc.font(FONT_REG).fontSize(9).fillColor(COLOR_MUTED);
  const datesWidth = doc.widthOfString(dateText);
  doc.text(dateText, A4.width - MARGIN - datesWidth, y, {
    width: datesWidth,
    align: "right",
    lineBreak: false,
  });

  doc.fillColor(COLOR_BODY);
  doc.moveDown(0.05);
}

function inlineLink(label, href) {
  return { text: label, link: href, color: COLOR_LINK };
}

// Centered line with mixed segments, used by the header so inline links
// and a centered alignment can coexist (pdfkit's continued+center stacks
// segments at the same x otherwise).
function centeredLine(doc, segments, opts = {}) {
  const size = opts.size ?? 9;
  doc.fontSize(size).font(opts.font ?? FONT_REG);

  const widths = segments.map((seg) => {
    doc.font(seg.font ?? opts.font ?? FONT_REG);
    return doc.widthOfString(seg.text);
  });
  const totalWidth = widths.reduce((a, b) => a + b, 0);

  const y = doc.y;
  let x = (A4.width - totalWidth) / 2;

  segments.forEach((seg, idx) => {
    doc.font(seg.font ?? opts.font ?? FONT_REG);
    doc.fillColor(seg.color ?? COLOR_BODY);
    doc.text(seg.text, x, y, {
      lineBreak: false,
      width: widths[idx] + 2,
      link: seg.link,
      underline: !!seg.link,
    });
    x += widths[idx];
  });

  doc.fillColor(COLOR_BODY);
  doc.x = MARGIN;
  doc.y = y + doc.currentLineHeight() + (opts.after ?? 3);
}

// ---------- content ----------

function renderHeader(doc) {
  doc.x = MARGIN;
  doc.y = MARGIN;
  doc
    .font(FONT_BOLD)
    .fontSize(20)
    .fillColor(COLOR_BODY)
    .text("MUSTAFA AKSU", MARGIN, MARGIN, {
      width: CONTENT_WIDTH,
      align: "center",
      characterSpacing: 1.5,
    });
  doc.moveDown(0.15);

  doc
    .font(FONT_REG)
    .fontSize(11)
    .fillColor(COLOR_MUTED)
    .text("Salesforce Developer  ·  Revenue Cloud  ·  Industries CPQ", MARGIN, doc.y, {
      width: CONTENT_WIDTH,
      align: "center",
    });
  doc.moveDown(0.45);

  centeredLine(
    doc,
    [{ text: "Nigeria  ·  Open to relocation — Germany / DACH" }],
    { size: 9, after: 2 },
  );

  centeredLine(
    doc,
    [
      inlineLink(
        "mustafa.aksu@mustafaaksu.dev",
        "mailto:mustafa.aksu@mustafaaksu.dev",
      ),
      { text: "  ·  " },
      inlineLink("mustafaaksu.dev", "https://mustafaaksu.dev"),
      { text: "  ·  " },
      inlineLink("LinkedIn", "https://www.linkedin.com/in/aksumustafa16/"),
      { text: "  ·  " },
      inlineLink("GitHub", "https://github.com/aksumustafa1625"),
      { text: "  ·  " },
      inlineLink(
        "Trailhead (Five Star Ranger)",
        "https://www.salesforce.com/trailblazer/aksumustafa16",
      ),
    ],
    { size: 9, after: 6 },
  );
}

function renderSummary(doc) {
  sectionHeading(doc, "Professional Summary");
  paragraph(
    doc,
    "Salesforce Developer with seven active certifications and eight Trailhead Superbadges, specialising in Apex architecture, async patterns (Queueable, Batch, Schedulable, Platform Events), and end-to-end integrations (MuleSoft, REST/SOAP, SAP S/4HANA). Owns Revenue Cloud (RLM + CLM) and Industries CPQ implementations from declarative design through trigger frameworks, unit testing, and SFDX / GitHub Actions deployment. MSc Computer Software Engineering · bilingual EN/DE portfolio · targeting senior Salesforce roles in the DACH market.",
  );
}

function renderProjects(doc) {
  sectionHeading(doc, "Salesforce Projects");

  roleHeader(
    doc,
    "TechnoStore — Quote-to-Cash on Salesforce Revenue Cloud",
    "Salesforce Developer / Solution Architect",
    "2025 — present",
  );
  bullet(
    doc,
    "Built end-to-end Quote-to-Cash demo for a B2B electronics supplier targeting DACH — Revenue Lifecycle Management (RLM) + Contract Lifecycle Management (CLM) + Industries CPQ.",
  );
  bullet(
    doc,
    "Orchestrated seven external systems (Stripe, Sendcloud / DHL, DocuSign, JIRA, Slack ×2, Notion) via MuleSoft Anypoint Studio with HMAC-SHA256-verified webhook callbacks.",
  );
  bullet(
    doc,
    "Applied the Kevin O'Hara sfdc-trigger-framework across a six-package SFDX layout; full Apex test coverage; published OpenAPI 3.0 specs for inbound webhooks.",
  );
  bullet(
    doc,
    "Documented architecture as an arc42 blueprint plus a 50-entry STAR-format Notion portfolio generated programmatically via a custom Apex Notion-publishing service.",
  );
  bullet(
    doc,
    "Extending with SAP S/4HANA via MuleSoft (Product Master sync, Order Acknowledgment on activation) and a DATEV integration for the DACH back-office story.",
  );
  bullet(doc, [
    { text: "Repository: ", font: "bold" },
    inlineLink(
      "github.com/aksumustafa1625/TechnoStore",
      "https://github.com/aksumustafa1625/TechnoStore",
    ),
  ]);

  roleHeader(
    doc,
    "Urla Shoes — Route safety with Google Maps, OpenWeather & Einstein",
    "Salesforce Developer",
    "2024",
  );
  bullet(
    doc,
    "Live demo combining three external integrations to plan a route, fetch weather along five waypoints in parallel, and let an Einstein Prompt Template (GPT-4o mini) assess whether the journey is safe.",
  );
  bullet(
    doc,
    "routeWeather LWC orchestrates a Visualforce-bridge to load Google Maps under Lightning Web Security; postMessage between LWC and VF; five parallel Promise.all fetches to OpenWeather.",
  );
  bullet(
    doc,
    "RouteWeatherAnalysisService calls ConnectApi.EinsteinLLM.generateMessagesForPromptTemplate; AI verdict rendered in a colour-coded card by a keyword classifier (storm/ice → red; caution → amber; else green).",
  );
  bullet(
    doc,
    "Secondary feature: Contact-insert Queueable hits Nationalize.io with full HttpCalloutMock coverage across six scenarios (success, empty, HTTP 500, missing FirstName, bulk-10, parser unit test).",
  );
  bullet(doc, [
    { text: "Repository: ", font: "bold" },
    inlineLink(
      "github.com/aksumustafa1625/urla-shoes",
      "https://github.com/aksumustafa1625/urla-shoes",
    ),
  ]);

  roleHeader(
    doc,
    "VoltStream Mobility — Channel-Partner Attribution for EV Charging",
    "Salesforce Developer",
    "2025",
  );
  bullet(
    doc,
    "B2B EV-charging CRM modelled on the German e-mobility hiring market (EnBW, Ionity, Allego, Mercedes-Benz Mobility); auto-links Opportunities to the right channel partner via Apex.",
  );
  bullet(
    doc,
    "Custom Reseller__c object with indexed Company_Email__c as an External ID; case-insensitive SOQL lookup wired through a four-layer pattern (trigger → handler → service → matcher).",
  );
  bullet(
    doc,
    "80 / 80 Apex tests passing with 100 % coverage including bulk and negative scenarios. Lookup relationship chosen over master-detail so revenue data outlives partner churn.",
  );
  bullet(doc, [
    { text: "Repository: ", font: "bold" },
    inlineLink(
      "github.com/aksumustafa1625/VoltStreamMobility",
      "https://github.com/aksumustafa1625/VoltStreamMobility",
    ),
  ]);

  roleHeader(
    doc,
    "mustafaaksu.dev — Personal Portfolio Site",
    "Designer & Product Owner",
    "2026",
  );
  bullet(doc, [
    { text: "Bilingual (EN + DE) Salesforce-developer portfolio at " },
    inlineLink("mustafaaksu.dev", "https://mustafaaksu.dev"),
    {
      text: " hosted on Vercel; Lighthouse-perfect, dark-mode, SEO-ready (sitemap, robots, per-locale Open Graph images).",
    },
  ]);
  bullet(
    doc,
    "Content modelled in TypeScript so adding a project, certification, or Trailhead stat is a single object edit — site, sitemap, and a synced Notion documentation page all update from that source.",
  );
  bullet(doc, [
    { text: "Repository: ", font: "bold" },
    inlineLink(
      "github.com/aksumustafa1625/mustafaaksu-portfolio",
      "https://github.com/aksumustafa1625/mustafaaksu-portfolio",
    ),
  ]);
}

function renderSkills(doc) {
  sectionHeading(doc, "Technical Skills");
  labeledLine(
    doc,
    "Revenue Cloud",
    "Salesforce CPQ (Admin), Industries CPQ (Developer), Revenue Lifecycle Management (RLM), Contract Lifecycle Management (CLM), Salesforce Billing, Quote-to-Cash architecture, subscription & usage-based pricing",
  );
  labeledLine(
    doc,
    "Salesforce Platform",
    "Apex (PD II), Lightning Web Components (LWC), Aura, SOQL / SOSL, Flow Builder, Validation Rules, Platform Events, Async Apex (Queueable, Batch, Schedulable), Trigger frameworks (Kevin O'Hara), Visualforce",
  );
  labeledLine(
    doc,
    "Industry & AI",
    "Agentforce Specialist, Einstein Prompt Templates, ConnectApi.EinsteinLLM",
  );
  labeledLine(
    doc,
    "Integration",
    "REST APIs, SOAP APIs, Named Credentials, External Services, Platform Events, Webhooks (HMAC-SHA256), MuleSoft Anypoint, SAP S/4HANA, OpenAPI 3.0",
  );
  labeledLine(
    doc,
    "DevOps & Tools",
    "Salesforce DX (sfdx), VS Code + SF Extensions, Scratch Orgs, Workbench, Data Loader, Postman, Git, GitHub Actions, CI/CD pipelines, Salesforce DevOps Center, Copado (basics)",
  );
  labeledLine(
    doc,
    "Other",
    "JavaScript (ES6+), TypeScript, HTML, CSS, Agile / SCRUM, JIRA, OAuth2, JSON, JWT",
  );
  labeledLine(
    doc,
    "Languages",
    "Turkish (native), English (professional), German (Goethe A2 — in progress)",
  );
}

function renderCertifications(doc) {
  sectionHeading(doc, "Salesforce Certifications");
  labeledLine(
    doc,
    "Platform",
    "Administrator (Oct 2024), Platform App Builder (Apr 2025), Platform Developer I (Nov 2024), Platform Developer II (Dec 2024)",
  );
  labeledLine(
    doc,
    "Industry & Revenue",
    "Industries CPQ Developer (May 2025), CPQ Administrator (Mar 2025)",
  );
  labeledLine(doc, "AI", "Agentforce Specialist (Jan 2025)");
}

function renderTrailhead(doc) {
  sectionHeading(doc, "Trailhead");
  ensureRoom(doc, 16);
  doc.font(FONT_REG).fontSize(9).fillColor(COLOR_BODY);
  doc.text("", MARGIN, doc.y, { continued: true });
  doc.font(FONT_BOLD).text("Five Star Ranger", { continued: true });
  doc.font(FONT_REG).text(
    "  ·  518 badges  ·  258K points  ·  8 Superbadges (Advanced Apex, Apex Specialist, Apex Callouts, Apex Web Services, Inbound Integration, Named Credentials, Platform Events, Platform API)  ·  ",
    { continued: true, width: CONTENT_WIDTH, lineGap: 1.5 },
  );
  doc.fillColor(COLOR_LINK).text("@aksumustafa16", {
    link: "https://www.salesforce.com/trailblazer/aksumustafa16",
    underline: true,
  });
  doc.fillColor(COLOR_BODY);
  doc.moveDown(0.1);
}

function renderEducation(doc) {
  sectionHeading(doc, "Education");

  roleHeader(
    doc,
    "MSc Computer Software Engineering",
    "North American University",
    "Jan 2021 — May 2023",
  );
  paragraph(
    doc,
    "Capstone: cloud-based SaaS subscription-billing application with JWT authentication, dynamic pricing modules, and Hibernate ORM persistence. Coursework: distributed systems, software architecture, database optimization, NoSQL fundamentals, API security (OAuth2), TDD/BDD. CI/CD with Jenkins and GitHub Actions; JUnit/TestNG; Docker containerization.",
  );

  roleHeader(
    doc,
    "Postgraduate Degree in Information Technology",
    "Vistula University",
    "Jun 2019 — May 2020",
  );
  paragraph(
    doc,
    "Advanced system architecture, software development, and data management; fully online international program.",
  );

  roleHeader(
    doc,
    "Bachelor of Education — Turkish Language and Literature",
    "Balıkesir University",
    "Sep 1996 — Jun 2000",
  );
}

function renderEarlierCareer(doc) {
  sectionHeading(doc, "Earlier Career");
  paragraph(
    doc,
    "2000 – 2020: Educator and counselor roles at Sevgi Çiçeği Anafen Dershanesi (Türkiye) and Nigerian Tulip International Colleges (Nigeria) — foundation for structured communication, mentoring, and cross-cultural stakeholder management.",
  );
}

// ---------- main ----------

const outPath = path.resolve("public", "cv.pdf");
fs.mkdirSync(path.dirname(outPath), { recursive: true });

const doc = new PDFDocument({
  size: "A4",
  margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
  info: {
    Title: "Mustafa Aksu — Salesforce Developer CV",
    Author: "Mustafa Aksu",
    Subject: "Salesforce Developer / Revenue Cloud — CV",
    Keywords:
      "Salesforce, Apex, LWC, Revenue Cloud, CPQ, Industries CPQ, MuleSoft, Quote-to-Cash, DACH, Agentforce",
  },
});

const stream = fs.createWriteStream(outPath);
doc.pipe(stream);

renderHeader(doc);
renderSummary(doc);
renderProjects(doc);
renderSkills(doc);
renderCertifications(doc);
renderTrailhead(doc);
renderEducation(doc);
renderEarlierCareer(doc);

doc.end();

await new Promise((resolve, reject) => {
  stream.on("finish", resolve);
  stream.on("error", reject);
});

const size = fs.statSync(outPath).size;
console.log(`✓ Wrote ${outPath} (${(size / 1024).toFixed(1)} KB)`);
