// Generate an ATS-friendly PDF CV for Mustafa Aksu.
//
// Usage:
//   npm run cv:pdf    # writes public/cv.pdf (served by Vercel from the site)
//
// Keep the content here in sync with `scripts/generate-cv.mjs` (the .docx
// equivalent) until/unless we factor the content into a shared module.
// Single-column layout, Helvetica (always available), no images — chosen
// so applicant-tracking systems parse the text cleanly.

import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";

// ---------- layout constants ----------

const A4 = { width: 595, height: 842 };
const MARGIN = 48;
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
  ensureRoom(doc, 32);
  doc.moveDown(0.6);
  doc
    .font(FONT_BOLD)
    .fontSize(10.5)
    .fillColor(COLOR_BODY)
    .text(title.toUpperCase(), MARGIN, doc.y, {
      characterSpacing: 1.2,
      width: CONTENT_WIDTH,
    });
  doc.moveDown(0.15);
  rule(doc);
  doc.moveDown(0.25);
}

function paragraph(doc, text, opts = {}) {
  ensureRoom(doc, 30);
  doc
    .font(FONT_REG)
    .fontSize(opts.size ?? 9.5)
    .fillColor(COLOR_BODY)
    .text(text, MARGIN, doc.y, {
      width: CONTENT_WIDTH,
      lineGap: 1.5,
      align: opts.align ?? "left",
    });
  doc.moveDown(opts.after ?? 0.35);
}

function bullet(doc, runs) {
  ensureRoom(doc, 18);
  const startY = doc.y;
  doc
    .font(FONT_REG)
    .fontSize(9.5)
    .fillColor(COLOR_BODY)
    .text("•", MARGIN, startY, { continued: false, width: 10 });

  doc.font(FONT_REG).fontSize(9.5).fillColor(COLOR_BODY);
  doc.y = startY;
  doc.x = MARGIN + 12;
  const innerWidth = CONTENT_WIDTH - 12;

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
      lineGap: 1.5,
    });
  });

  doc.x = MARGIN;
  doc.moveDown(0.18);
}

function roleHeader(doc, title, organization, dates) {
  ensureRoom(doc, 22);
  doc.moveDown(0.35);
  const y = doc.y;

  // Left: title + organization
  doc.font(FONT_BOLD).fontSize(10).fillColor(COLOR_BODY);
  doc.text(title, MARGIN, y, { continued: true, width: CONTENT_WIDTH });
  doc.font(FONT_ITAL).text(`  —  ${organization}`, { continued: false });

  // Right: dates aligned right on the same line
  doc.font(FONT_REG).fontSize(9).fillColor(COLOR_MUTED);
  const datesWidth = doc.widthOfString(dates);
  doc.text(dates, A4.width - MARGIN - datesWidth, y, {
    width: datesWidth,
    align: "right",
    lineBreak: false,
  });

  doc.fillColor(COLOR_BODY);
  doc.moveDown(0.1);
}

function inlineLink(doc, label, href) {
  return { text: label, link: href, color: COLOR_LINK };
}

// Draw a single centered line composed of segments. Each segment can carry
// its own colour and hyperlink. We position every segment with an explicit
// x so center alignment and inline links coexist (pdfkit's continued+center
// flow gets them stacked at the same x otherwise).
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
  doc.y = y + doc.currentLineHeight() + (opts.after ?? 4);
}

// ---------- content (mirror of generate-cv.mjs) ----------

function renderHeader(doc) {
  // Name
  doc.x = MARGIN;
  doc.y = MARGIN;
  doc
    .font(FONT_BOLD)
    .fontSize(22)
    .fillColor(COLOR_BODY)
    .text("Mustafa Aksu", MARGIN, MARGIN, {
      width: CONTENT_WIDTH,
      align: "center",
    });
  doc.moveDown(0.1);

  // Role subtitle
  doc
    .font(FONT_REG)
    .fontSize(12)
    .fillColor(COLOR_MUTED)
    .text("Salesforce Developer", MARGIN, doc.y, {
      width: CONTENT_WIDTH,
      align: "center",
    });
  doc.moveDown(0.55);

  // Contact line 1 — location
  centeredLine(
    doc,
    [{ text: "Nigeria  ·  Open to EU, DACH, Remote" }],
    { size: 9, after: 2 },
  );

  // Contact line 2 — email + site (clickable)
  centeredLine(
    doc,
    [
      {
        text: "mustafa.aksu@mustafaaksu.dev",
        link: "mailto:mustafa.aksu@mustafaaksu.dev",
        color: COLOR_LINK,
      },
      { text: "  ·  " },
      {
        text: "mustafaaksu.dev",
        link: "https://mustafaaksu.dev",
        color: COLOR_LINK,
      },
    ],
    { size: 9, after: 2 },
  );

  // Contact line 3 — profile links
  centeredLine(
    doc,
    [
      {
        text: "LinkedIn",
        link: "https://www.linkedin.com/in/aksumustafa16/",
        color: COLOR_LINK,
      },
      { text: "    ·    " },
      {
        text: "GitHub",
        link: "https://github.com/aksumustafa1625",
        color: COLOR_LINK,
      },
      { text: "    ·    " },
      {
        text: "Trailhead (Five Star Ranger)",
        link: "https://www.salesforce.com/trailblazer/aksumustafa16",
        color: COLOR_LINK,
      },
    ],
    { size: 9, after: 10 },
  );
}

function renderSummary(doc) {
  sectionHeading(doc, "Professional Summary");
  paragraph(
    doc,
    "Salesforce Developer with 9 active certifications across Platform (PD I, PD II, Administrator, App Builder), Industry Solutions (OmniStudio Developer + Consultant, Industries CPQ), Sales Cloud (CPQ Admin), and Agentforce. Eight Trailhead Superbadges concentrated in Apex and integration (Advanced Apex, Apex Callouts, Apex Web Services, Inbound Integration Specialist, Named Credentials, Platform Events, Platform API). Five Star Ranger on Trailhead with 518 badges and 258,050 points.",
  );
  paragraph(
    doc,
    "Specialise in Apex architecture, asynchronous patterns (Queueable, Batch, Schedulable, Platform Events), and end-to-end integrations between Salesforce and external systems (MuleSoft, REST/SOAP APIs, payment gateways, e-signature, SAP S/4HANA). Comfortable owning a feature from declarative design through Apex trigger framework, unit tests, and deployment via SFDX and GitHub Actions. Master's degree in Computer Software Engineering. Bilingual portfolio in English and German, targeting the DACH Salesforce market.",
  );
}

function renderCertifications(doc) {
  sectionHeading(doc, "Salesforce Certifications");
  const certs = [
    ["Salesforce Certified OmniStudio Developer", "June 2025"],
    ["Salesforce Certified OmniStudio Consultant", "June 2025"],
    ["Salesforce Certified Industries CPQ Developer", "May 2025"],
    ["Salesforce Certified Platform App Builder", "April 2025"],
    ["Salesforce Certified CPQ Administrator", "March 2025"],
    ["Salesforce Certified Agentforce Specialist", "January 2025"],
    ["Salesforce Certified Platform Developer II", "December 2024"],
    ["Salesforce Certified Platform Developer I", "November 2024"],
    ["Salesforce Certified Administrator", "October 2024"],
  ];
  certs.forEach(([name, date]) => {
    bullet(doc, [
      { text: name, font: "bold" },
      { text: ` — ${date}` },
    ]);
  });
  bullet(doc, [
    { text: "Salesforce Certified AI Associate", font: "bold" },
    { text: " — December 2024 " },
    { text: "(retired credential)", font: "italic" },
  ]);
}

function renderTrailhead(doc) {
  sectionHeading(doc, "Trailhead");
  bullet(doc, [
    { text: "Profile: ", font: "bold" },
    inlineLink(
      doc,
      "salesforce.com/trailblazer/aksumustafa16",
      "https://www.salesforce.com/trailblazer/aksumustafa16",
    ),
  ]);
  bullet(doc, [
    { text: "Rank: ", font: "bold" },
    { text: "Five Star Ranger (working toward All Star Ranger)" },
  ]);
  bullet(doc, [
    { text: "Badges: ", font: "bold" },
    { text: "518  ·  Points: 258,050  ·  Trails: 28" },
  ]);
  bullet(doc, [
    { text: "Superbadges (8): ", font: "bold" },
    {
      text: "Advanced Apex Specialist, Apex Specialist, Apex Callouts, Apex Web Services, Inbound Integration Specialist, Named Credentials, Platform Events, Platform API",
    },
  ]);
}

function renderSkills(doc) {
  sectionHeading(doc, "Technical Skills");
  const groups = [
    [
      "Revenue Cloud",
      "Salesforce CPQ (Admin certified), Industries CPQ (Developer certified), Revenue Lifecycle Management (RLM), Contract Lifecycle Management (CLM), Salesforce Billing (basics), Quote-to-Cash architecture, subscription & usage-based pricing",
    ],
    [
      "Salesforce Platform",
      "Apex (PD II), Lightning Web Components (LWC), Aura Components, SOQL / SOSL, Flow Builder, Validation Rules, Platform Events, Async Apex (Queueable, Batch, Schedulable), Trigger frameworks (Kevin O'Hara), Visualforce",
    ],
    [
      "Industry & AI",
      "OmniStudio (Developer + Consultant), Agentforce Specialist, Einstein Prompt Templates, ConnectApi.EinsteinLLM",
    ],
    [
      "Integration",
      "REST APIs, SOAP APIs, Named Credentials, External Services, Platform Events, Webhooks (HMAC-SHA256), MuleSoft Anypoint (intermediate), SAP S/4HANA (active project), OpenAPI 3.0",
    ],
    [
      "Tools",
      "Salesforce DX (sfdx), VS Code + SF Extensions, Scratch Orgs, Workbench, Data Loader, Postman, Schema Builder",
    ],
    [
      "DevOps",
      "Git, GitHub, GitHub Actions, CI/CD pipelines, Salesforce DevOps Center (basics), Copado (basics)",
    ],
    [
      "Other",
      "JavaScript (ES6+), TypeScript (basics), HTML, CSS, Agile / SCRUM, JIRA, OAuth2, JSON, JWT",
    ],
    [
      "Languages",
      "Turkish (native), English (professional), German (Goethe A2 — in progress)",
    ],
  ];
  groups.forEach(([label, items]) => {
    bullet(doc, [
      { text: `${label}: `, font: "bold" },
      { text: items },
    ]);
  });
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
    "Built an end-to-end Quote-to-Cash demo for a B2B electronics supplier targeting the DACH market — Revenue Lifecycle Management (RLM) + Contract Lifecycle Management (CLM) + Industries CPQ on the Salesforce side.",
  );
  bullet(
    doc,
    "Orchestrated seven external systems (Stripe, Sendcloud / DHL, DocuSign, JIRA, Slack ×2, Notion) via MuleSoft Anypoint Studio with HMAC-SHA256-verified webhook callbacks.",
  );
  bullet(
    doc,
    "Applied the Kevin O'Hara sfdc-trigger-framework across a six-package SFDX layout; achieved full Apex test coverage and published OpenAPI 3.0 specs for inbound webhooks.",
  );
  bullet(
    doc,
    "Documented architecture as an arc42 blueprint plus a 50-entry STAR-format Notion portfolio generated programmatically via a custom Apex Notion-publishing service.",
  );
  bullet(
    doc,
    "Currently extending the project with SAP S/4HANA integration via MuleSoft (Product Master sync, Order Acknowledgment on activation) and a DATEV integration to round out the DACH back-office story.",
  );
  bullet(doc, [
    { text: "Repository: ", font: "bold" },
    inlineLink(
      doc,
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
      doc,
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
      doc,
      "github.com/aksumustafa1625/VoltStreamMobility",
      "https://github.com/aksumustafa1625/VoltStreamMobility",
    ),
  ]);

  roleHeader(
    doc,
    "mustafaaksu.dev — Personal Portfolio Site",
    "Designer & product owner",
    "2026",
  );
  bullet(doc, [
    { text: "Designed and shipped a bilingual (EN + DE) Salesforce-developer portfolio at " },
    inlineLink(doc, "mustafaaksu.dev", "https://mustafaaksu.dev"),
    {
      text: " hosted on Vercel with a GoDaddy custom domain; Lighthouse-perfect, dark-mode, SEO-ready (sitemap, robots, per-locale Open Graph images).",
    },
  ]);
  bullet(
    doc,
    "Content modelled in TypeScript so adding a project, certification, or Trailhead stat is a single object edit — site, sitemap, and a programmatically synced Notion documentation page all update from that source.",
  );
  bullet(doc, [
    { text: "Repository: ", font: "bold" },
    inlineLink(
      doc,
      "github.com/aksumustafa1625/mustafaaksu-portfolio",
      "https://github.com/aksumustafa1625/mustafaaksu-portfolio",
    ),
  ]);
}

function renderEducation(doc) {
  sectionHeading(doc, "Education");

  roleHeader(
    doc,
    "Master of Science in Computer Software Engineering",
    "North American University (NAU)",
    "Jan 2021 — May 2023",
  );
  bullet(
    doc,
    "Capstone: cloud-based SaaS subscription-billing application with JWT authentication, dynamic pricing modules, and Hibernate ORM persistence.",
  );
  bullet(
    doc,
    "Coursework: distributed systems, software architecture, database optimization (indexing, normalization, query tuning), NoSQL fundamentals, API security (OAuth2, rate limiting), TDD / BDD methodologies.",
  );
  bullet(
    doc,
    "Practiced Agile / SCRUM in bi-weekly sprints; led sprint planning, conducted code reviews, used Jira / Trello / Git / GitHub for distributed version control.",
  );
  bullet(
    doc,
    "Implemented CI/CD pipelines with Jenkins and GitHub Actions, automated tests (JUnit, TestNG), and Docker containerization.",
  );

  roleHeader(
    doc,
    "Postgraduate Degree in Information Technology",
    "Vistula University",
    "Jun 2019 — May 2020",
  );
  bullet(
    doc,
    "Advanced system architecture, software development, and data management — fully online international program, completed with strong self-discipline and remote-team collaboration habits.",
  );

  roleHeader(
    doc,
    "Bachelor of Education (BEd) — Turkish Language and Literature",
    "Balıkesir University",
    "Sep 1996 — Jun 2000",
  );
  bullet(
    doc,
    "Served as MC for the graduation ceremony; foundation in structured communication and presentation that transfers directly to technical demos and stakeholder briefings.",
  );
}

function renderEarlierCareer(doc) {
  sectionHeading(doc, "Earlier Career");

  roleHeader(
    doc,
    "High School Counselor",
    "Nigerian Tulip International Colleges (NTIC) · Nigeria · On-site",
    "Sep 2014 — Jun 2017",
  );
  bullet(
    doc,
    "Guided a multicultural student body in an international school context; coordinated academic planning, mentoring, and personal-development programs.",
  );
  bullet(
    doc,
    "Developed strong cross-cultural communication and stakeholder-management skills that translate directly to consulting-style work with global Salesforce teams.",
  );

  roleHeader(
    doc,
    "Turkish Language Teacher",
    "Sevgi Çiçeği Anafen Dershanesi · Türkiye · On-site",
    "Sep 2000 — Aug 2014",
  );
  bullet(
    doc,
    "Designed and delivered language curriculum to high-school students over 14 years at the same institution; sustained, results-oriented training programs.",
  );
  bullet(
    doc,
    "Honed structured presentation, mentoring, and explanation skills — directly applicable to demoing Salesforce solutions, training admin users, and communicating with non-technical stakeholders.",
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
      "Salesforce, Apex, LWC, Revenue Cloud, CPQ, MuleSoft, Quote-to-Cash, DACH, OmniStudio, Agentforce",
  },
});

const stream = fs.createWriteStream(outPath);
doc.pipe(stream);

renderHeader(doc);
renderSummary(doc);
renderCertifications(doc);
renderTrailhead(doc);
renderSkills(doc);
renderProjects(doc);
renderEducation(doc);
renderEarlierCareer(doc);

doc.end();

await new Promise((resolve, reject) => {
  stream.on("finish", resolve);
  stream.on("error", reject);
});

const size = fs.statSync(outPath).size;
console.log(`✓ Wrote ${outPath} (${(size / 1024).toFixed(1)} KB)`);
