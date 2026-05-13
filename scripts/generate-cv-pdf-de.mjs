// Generate an ATS-friendly German PDF CV (Lebenslauf) for Mustafa Aksu.
//
// Usage:
//   npm run cv:pdf-de    # writes public/cv-de.pdf
//
// Keep this in sync with scripts/generate-cv-pdf.mjs (English). Same layout,
// same helpers, just German content. Salesforce technical terms (Apex, LWC,
// RLM, CLM, Quote-to-Cash, Industries CPQ, etc.) stay in English because
// that's the industry vocabulary across the German Salesforce market too.
// Career narrative + section labels are German.

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

// Same Turkish-character transliteration as the English version. Affects
// Sevgi Çiçeği and Balıkesir in the Education / Earlier Career sections.
const LATIN_MAP = {
  ğ: "g", Ğ: "G",
  ı: "i", İ: "I",
  ş: "s", Ş: "S",
};
function latin(value) {
  return String(value).replace(/[ğĞıİşŞ]/g, (c) => LATIN_MAP[c] || c);
}

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
    .text(latin(text), MARGIN, doc.y, {
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

    doc.text(latin(run.text), {
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

function labeledLine(doc, label, body) {
  ensureRoom(doc, 14);
  doc.font(FONT_BOLD).fontSize(9).fillColor(COLOR_BODY);
  doc.text(`${latin(label)}: `, MARGIN, doc.y, { continued: true });
  doc.font(FONT_REG);
  doc.text(latin(body), { width: CONTENT_WIDTH, lineGap: 1 });
  doc.moveDown(0.06);
}

function roleHeader(doc, titleText, organizationText, dateText) {
  ensureRoom(doc, 18);
  doc.moveDown(0.15);
  const y = doc.y;

  doc.font(FONT_REG).fontSize(9).fillColor(COLOR_MUTED);
  const dateLatin = latin(dateText);
  const datesWidth = doc.widthOfString(dateLatin);
  const gap = 12;
  const leftWidth = CONTENT_WIDTH - datesWidth - gap;

  doc.text(dateLatin, A4.width - MARGIN - datesWidth, y, {
    width: datesWidth,
    align: "right",
    lineBreak: false,
  });

  doc.font(FONT_BOLD).fontSize(9.5).fillColor(COLOR_BODY);
  doc.text(latin(titleText), MARGIN, y, {
    continued: true,
    width: leftWidth,
    lineGap: 1,
  });
  doc.font(FONT_ITAL).text(latin(`  —  ${organizationText}`), {
    continued: false,
    width: leftWidth,
    lineGap: 1,
  });

  doc.fillColor(COLOR_BODY);
  doc.moveDown(0.05);
}

function inlineLink(label, href) {
  return { text: label, link: href, color: COLOR_LINK };
}

function centeredLine(doc, segments, opts = {}) {
  const size = opts.size ?? 9;
  doc.fontSize(size).font(opts.font ?? FONT_REG);

  const widths = segments.map((seg) => {
    doc.font(seg.font ?? opts.font ?? FONT_REG);
    return doc.widthOfString(latin(seg.text));
  });
  const totalWidth = widths.reduce((a, b) => a + b, 0);

  const y = doc.y;
  let x = (A4.width - totalWidth) / 2;

  segments.forEach((seg, idx) => {
    doc.font(seg.font ?? opts.font ?? FONT_REG);
    doc.fillColor(seg.color ?? COLOR_BODY);
    doc.text(latin(seg.text), x, y, {
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
    .text("Salesforce-Entwickler  ·  Revenue Cloud  ·  Industries CPQ", MARGIN, doc.y, {
      width: CONTENT_WIDTH,
      align: "center",
    });
  doc.moveDown(0.45);

  centeredLine(
    doc,
    [{ text: "Nigeria  ·  Offen für Umzug — Deutschland / DACH" }],
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
  sectionHeading(doc, "Profil");
  paragraph(
    doc,
    "Salesforce-Entwickler mit sieben aktiven Zertifikaten und acht Trailhead-Superbadges, spezialisiert auf Apex-Architektur, Async-Patterns (Queueable, Batch, Schedulable, Platform Events) und End-to-End-Integrationen (MuleSoft, REST/SOAP, SAP S/4HANA). Verantwortlich für Revenue Cloud (RLM + CLM) und Industries-CPQ-Implementierungen — von deklarativem Design über Trigger-Frameworks und Unit-Tests bis zum Deployment via SFDX und GitHub Actions. MSc Computer Software Engineering · zweisprachiges Portfolio EN/DE · auf Salesforce-Entwicklerrollen im DACH-Markt ausgerichtet.",
  );
}

function renderProjects(doc) {
  sectionHeading(doc, "Salesforce-Projekte");

  roleHeader(
    doc,
    "TechnoStore — Quote-to-Cash auf Salesforce Revenue Cloud",
    "Salesforce-Entwickler / Solution Architect",
    "2025 — heute",
  );
  bullet(
    doc,
    "End-to-End Quote-to-Cash-Demo für einen B2B-Elektronikhändler im DACH-Markt entwickelt — Revenue Lifecycle Management (RLM) + Contract Lifecycle Management (CLM) + Industries CPQ.",
  );
  bullet(
    doc,
    "Sieben externe Systeme (Stripe, Sendcloud / DHL, DocuSign, JIRA, Slack ×2, Notion) via MuleSoft Anypoint Studio mit HMAC-SHA256-verifizierten Webhook-Callbacks orchestriert.",
  );
  bullet(
    doc,
    "Kevin O'Hara sfdc-trigger-framework über sechs SFDX-Pakete angewendet; volle Apex-Testabdeckung; OpenAPI 3.0-Spezifikationen für eingehende Webhooks veröffentlicht.",
  );
  bullet(
    doc,
    "Architektur als arc42-Blueprint plus 50-Eintrag STAR-Format Notion-Portfolio dokumentiert, programmatisch über einen eigenen Apex-Notion-Publishing-Service generiert.",
  );
  bullet(
    doc,
    "Erweitert um SAP S/4HANA via MuleSoft (Product-Master-Sync, Auftragsbestätigung bei Aktivierung) und eine DATEV-Integration für die DACH-Backoffice-Story.",
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
    "Urla Shoes — Routensicherheit mit Google Maps, OpenWeather & Einstein",
    "Salesforce-Entwickler",
    "2024",
  );
  bullet(
    doc,
    "Live-Demo, die drei externe Integrationen kombiniert, um eine Route zu planen, das Wetter an fünf Wegpunkten parallel abzurufen und ein Einstein Prompt Template (GPT-4o mini) entscheiden zu lassen, ob die Reise sicher ist.",
  );
  bullet(
    doc,
    "routeWeather LWC orchestriert eine Visualforce-Brücke, um Google Maps unter Lightning Web Security zu laden; postMessage zwischen LWC und VF; fünf parallele Promise.all-Fetches an OpenWeather.",
  );
  bullet(
    doc,
    "RouteWeatherAnalysisService ruft ConnectApi.EinsteinLLM.generateMessagesForPromptTemplate auf; KI-Urteil in einer farbcodierten Karte gerendert über einen Schlagwort-Klassifizierer (Sturm/Eis → rot; Vorsicht → gelb; sonst grün).",
  );
  bullet(
    doc,
    "Sekundärfeature: Contact-Insert-Queueable ruft Nationalize.io mit voller HttpCalloutMock-Abdeckung über sechs Szenarien auf (Erfolg, leer, HTTP 500, fehlender FirstName, Bulk-10, Parser-Unit-Test).",
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
    "VoltStream Mobility — Channel-Partner-Attribution für E-Mobility",
    "Salesforce-Entwickler",
    "2025",
  );
  bullet(
    doc,
    "B2B-CRM für E-Ladelösungen, modelliert nach dem deutschen E-Mobility-Markt (EnBW, Ionity, Allego, Mercedes-Benz Mobility); verknüpft Opportunities automatisch via Apex mit dem richtigen Channel-Partner.",
  );
  bullet(
    doc,
    "Custom Object Reseller__c mit indizierter Company_Email__c als External ID; case-insensitive SOQL-Lookup über ein vierstufiges Pattern (Trigger → Handler → Service → Matcher).",
  );
  bullet(
    doc,
    "80 / 80 Apex-Tests grün mit 100 % Abdeckung, inkl. Bulk- und Negativfällen. Lookup-Beziehung statt Master-Detail gewählt, damit Umsatzdaten Partnerwechsel überleben.",
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
    "mustafaaksu.dev — Persönliche Portfolio-Seite",
    "Designer & Product Owner",
    "2026",
  );
  bullet(doc, [
    { text: "Zweisprachiges (EN + DE) Salesforce-Entwickler-Portfolio auf " },
    inlineLink("mustafaaksu.dev", "https://mustafaaksu.dev"),
    {
      text: " — gehostet auf Vercel; Lighthouse-perfekt, Dark-Mode, SEO-ready (Sitemap, Robots, locale-spezifische Open-Graph-Bilder).",
    },
  ]);
  bullet(
    doc,
    "Inhalte in TypeScript modelliert — ein Projekt, Zertifikat oder Trailhead-Statistik hinzufügen ist eine einzige Object-Bearbeitung; Site, Sitemap und eine synchronisierte Notion-Doku aktualisieren sich aus derselben Quelle.",
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
  sectionHeading(doc, "Technische Kenntnisse");
  labeledLine(
    doc,
    "Revenue Cloud",
    "Salesforce CPQ (Admin), Industries CPQ (Developer), Revenue Lifecycle Management (RLM), Contract Lifecycle Management (CLM), Salesforce Billing, Quote-to-Cash-Architektur, Subscription- und Usage-based-Pricing",
  );
  labeledLine(
    doc,
    "Salesforce-Plattform",
    "Apex (PD II), Lightning Web Components (LWC), Aura, SOQL / SOSL, Flow Builder, Validation Rules, Platform Events, Async Apex (Queueable, Batch, Schedulable), Trigger-Frameworks (Kevin O'Hara), Visualforce",
  );
  labeledLine(
    doc,
    "Industry & KI",
    "Agentforce Specialist, Einstein Prompt Templates, ConnectApi.EinsteinLLM",
  );
  labeledLine(
    doc,
    "Integration",
    "REST APIs, SOAP APIs, Named Credentials, External Services, Platform Events, Webhooks (HMAC-SHA256), MuleSoft Anypoint, SAP S/4HANA, OpenAPI 3.0",
  );
  labeledLine(
    doc,
    "DevOps & Werkzeuge",
    "Salesforce DX (sfdx), VS Code + SF Extensions, Scratch Orgs, Workbench, Data Loader, Postman, Git, GitHub Actions, CI/CD-Pipelines, Salesforce DevOps Center, Copado (Grundlagen)",
  );
  labeledLine(
    doc,
    "Sonstiges",
    "JavaScript (ES6+), TypeScript, HTML, CSS, Agile / SCRUM, JIRA, OAuth2, JSON, JWT",
  );
  labeledLine(
    doc,
    "Sprachen",
    "Türkisch (Muttersprache), Englisch (verhandlungssicher), Deutsch (Goethe A2 — in Vorbereitung)",
  );
}

function renderCertifications(doc) {
  sectionHeading(doc, "Salesforce-Zertifikate");
  labeledLine(
    doc,
    "Platform",
    "Administrator (Okt. 2024), Platform App Builder (Apr. 2025), Platform Developer I (Nov. 2024), Platform Developer II (Dez. 2024)",
  );
  labeledLine(
    doc,
    "Industry & Revenue",
    "Industries CPQ Developer (Mai 2025), CPQ Administrator (Mär. 2025)",
  );
  labeledLine(doc, "KI", "Agentforce Specialist (Jan. 2025)");
}

function renderTrailhead(doc) {
  sectionHeading(doc, "Trailhead");
  ensureRoom(doc, 16);
  doc.font(FONT_REG).fontSize(9).fillColor(COLOR_BODY);
  doc.text("", MARGIN, doc.y, { continued: true });
  doc.font(FONT_BOLD).text("Five Star Ranger", { continued: true });
  doc.font(FONT_REG).text(
    "  ·  518 Badges  ·  258K Punkte  ·  8 Superbadges (Advanced Apex, Apex Specialist, Apex Callouts, Apex Web Services, Inbound Integration, Named Credentials, Platform Events, Platform API)  ·  ",
    { continued: true, width: CONTENT_WIDTH, lineGap: 1.5 },
  );
  doc.fillColor(COLOR_LINK).text("@aksumustafa16", {
    link: "https://www.salesforce.com/trailblazer/aksumustafa16",
    underline: true,
  });
  doc.fillColor(COLOR_BODY);
  doc.moveDown(0.1);
}

function renderCommunity(doc) {
  sectionHeading(doc, "Community");
  ensureRoom(doc, 16);
  doc.font(FONT_BOLD).fontSize(9).fillColor(COLOR_BODY);
  doc.text("Gründer & Betreiber", MARGIN, doc.y, { continued: true });
  doc.font(FONT_REG).text(" — ", { continued: true });
  doc.fillColor(COLOR_LINK).text("Salesforce Revenue Cloud | Germany", {
    link: "https://www.linkedin.com/groups/10046805/",
    underline: true,
    continued: true,
  });
  doc.fillColor(COLOR_BODY).text(
    " LinkedIn-Gruppe (279 Mitglieder)  ·  11.982 LinkedIn-Follower; schreibe regelmäßig über Revenue Cloud, Integrationen und den DACH-Salesforce-Markt.",
    { width: CONTENT_WIDTH, lineGap: 1 },
  );
  doc.moveDown(0.06);
}

function renderEducation(doc) {
  sectionHeading(doc, "Ausbildung");

  roleHeader(
    doc,
    "MSc Computer Software Engineering",
    "North American University",
    "Jan. 2021 — Mai 2023",
  );
  paragraph(
    doc,
    "Abschlussprojekt: cloud-basierte SaaS-Anwendung für Subscription-Billing mit JWT-Authentifizierung, dynamischen Preismodulen und Hibernate-ORM-Persistenz. Kursinhalte: verteilte Systeme, Softwarearchitektur, Datenbankoptimierung, NoSQL-Grundlagen, API-Sicherheit (OAuth2), TDD/BDD. CI/CD mit Jenkins und GitHub Actions; JUnit/TestNG; Docker-Containerisierung.",
  );

  roleHeader(
    doc,
    "Postgraduate-Studium in Informationstechnologie",
    "Vistula University",
    "Jun. 2019 — Mai 2020",
  );
  paragraph(
    doc,
    "Vertiefung in Systemarchitektur, Softwareentwicklung und Datenmanagement; vollständig online absolviertes internationales Programm.",
  );

  roleHeader(
    doc,
    "Bachelor of Education — Türkische Sprache und Literatur",
    "Balıkesir Universität",
    "Sep. 1996 — Jun. 2000",
  );
}

function renderEarlierCareer(doc) {
  sectionHeading(doc, "Frühere Berufserfahrung");
  paragraph(
    doc,
    "2000 – 2020: Lehrer und schließlich Schulleiter am Sevgi Çiçeği Anafen Dershanesi (Türkei, 2000 – 2014), danach Berater am Nigerian Tulip International Colleges (Nigeria, 2014 – 2020) — Grundlage für Führung, strukturierte Kommunikation, Mentoring und kulturübergreifendes Stakeholder-Management.",
  );
}

// ---------- main ----------

const outPath = path.resolve("public", "cv-de.pdf");
fs.mkdirSync(path.dirname(outPath), { recursive: true });

const doc = new PDFDocument({
  size: "A4",
  margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
  info: {
    Title: "Mustafa Aksu — Salesforce-Entwickler — Lebenslauf",
    Author: "Mustafa Aksu",
    Subject: "Salesforce-Entwickler / Revenue Cloud — Lebenslauf",
    Keywords:
      "Salesforce, Apex, LWC, Revenue Cloud, CPQ, Industries CPQ, MuleSoft, Quote-to-Cash, DACH, Agentforce, Lebenslauf",
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
renderCommunity(doc);
renderEducation(doc);
renderEarlierCareer(doc);

doc.end();

await new Promise((resolve, reject) => {
  stream.on("finish", resolve);
  stream.on("error", reject);
});

const size = fs.statSync(outPath).size;
console.log(`✓ Wrote ${outPath} (${(size / 1024).toFixed(1)} KB)`);
