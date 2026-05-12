// Sync the portfolio documentation to Notion.
//
// Usage:
//   node --env-file=.env.local scripts/sync-notion-docs.mjs
//
// Behavior: deletes existing top-level child blocks under NOTION_PORTFOLIO_PAGE_ID
// and re-appends the structured docs below. The page title and properties are untouched.

import { setTimeout as sleep } from "node:timers/promises";

const TOKEN = process.env.NOTION_TOKEN;
const PAGE_ID = process.env.NOTION_PORTFOLIO_PAGE_ID;

if (!TOKEN || !PAGE_ID) {
  console.error(
    "Missing NOTION_TOKEN or NOTION_PORTFOLIO_PAGE_ID. Run with --env-file=.env.local.",
  );
  process.exit(1);
}

const API = "https://api.notion.com/v1";
const HEADERS = {
  Authorization: `Bearer ${TOKEN}`,
  "Notion-Version": "2022-06-28",
  "Content-Type": "application/json",
};

async function notion(method, path, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: HEADERS,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Notion ${method} ${path} → ${res.status}: ${txt}`);
  }
  return res.json();
}

// ---------- Block builders ----------

const rt = (content, opts = {}) => ({
  type: "text",
  text: { content, link: opts.href ? { url: opts.href } : null },
  annotations: {
    bold: opts.bold ?? false,
    italic: opts.italic ?? false,
    code: opts.code ?? false,
    color: opts.color ?? "default",
  },
});

const p = (...rich) => ({
  object: "block",
  type: "paragraph",
  paragraph: { rich_text: rich.flat() },
});

const h2 = (text) => ({
  object: "block",
  type: "heading_2",
  heading_2: { rich_text: [rt(text)] },
});

const h3 = (text) => ({
  object: "block",
  type: "heading_3",
  heading_3: { rich_text: [rt(text)] },
});

const bullet = (rich) => ({
  object: "block",
  type: "bulleted_list_item",
  bulleted_list_item: { rich_text: Array.isArray(rich) ? rich : [rt(rich)] },
});

const todo = (text, checked = false) => ({
  object: "block",
  type: "to_do",
  to_do: { rich_text: [rt(text)], checked },
});

const callout = (emoji, rich) => ({
  object: "block",
  type: "callout",
  callout: {
    rich_text: Array.isArray(rich) ? rich : [rt(rich)],
    icon: { type: "emoji", emoji },
    color: "gray_background",
  },
});

const divider = () => ({ object: "block", type: "divider", divider: {} });

const code = (content, language = "plain text") => ({
  object: "block",
  type: "code",
  code: { rich_text: [rt(content)], language },
});

// ---------- Document content ----------

const blocks = [
  callout("🟢", [
    rt("Status: ", { bold: true }),
    rt("Live in production · "),
    rt("Live: ", { bold: true }),
    rt("https://mustafaaksu.dev", { href: "https://mustafaaksu.dev" }),
    rt(" · "),
    rt("Repo: ", { bold: true }),
    rt("aksumustafa1625/mustafaaksu-portfolio", {
      href: "https://github.com/aksumustafa1625/mustafaaksu-portfolio",
    }),
  ]),

  h2("TL;DR"),
  p(
    rt(
      "Personal portfolio site for Mustafa Aksu — Salesforce Developer with 10 active certifications, 8 superbadges, and Five Star Ranger on Trailhead. Bilingual (EN + DE), targeted at the DACH Salesforce market. Three real case studies featured: TechnoStore (Revenue Cloud + MuleSoft Quote-to-Cash), VoltStream Mobility (channel attribution with Apex trigger framework), Urla Shoes (async-callout reference).",
    ),
  ),

  h2("Quick links"),
  bullet([
    rt("Live site: ", { bold: true }),
    rt("https://mustafaaksu.dev", { href: "https://mustafaaksu.dev" }),
  ]),
  bullet([
    rt("GitHub repo: ", { bold: true }),
    rt("aksumustafa1625/mustafaaksu-portfolio", {
      href: "https://github.com/aksumustafa1625/mustafaaksu-portfolio",
    }),
  ]),
  bullet([
    rt("LinkedIn: ", { bold: true }),
    rt("aksumustafa16", {
      href: "https://www.linkedin.com/in/aksumustafa16/",
    }),
  ]),
  bullet([
    rt("Trailhead: ", { bold: true }),
    rt("aksumustafa16 (Five Star Ranger)", {
      href: "https://www.salesforce.com/trailblazer/aksumustafa16",
    }),
  ]),
  bullet([
    rt("Email: ", { bold: true }),
    rt("mustafa.aksu@mustafaaksu.dev", {
      href: "mailto:mustafa.aksu@mustafaaksu.dev",
    }),
  ]),

  h2("Credentials snapshot"),
  bullet([
    rt("10 Salesforce certifications", { bold: true }),
    rt(" — PD I, PD II, Administrator, Platform App Builder, CPQ Admin, OmniStudio Developer, OmniStudio Consultant, Industries CPQ Developer, Agentforce Specialist + AI Associate (retired)."),
  ]),
  bullet([
    rt("8 Superbadges", { bold: true }),
    rt(" — Apex-heavy: Advanced Apex, Apex Specialist, Apex Callouts, Apex Web Services, Inbound Integration Specialist, Named Credentials, Platform Events, Platform API."),
  ]),
  bullet([
    rt("Trailhead", { bold: true }),
    rt(" — 518 badges, 258,050 points, 28 trails, Five Star Ranger rank."),
  ]),

  h2("Stack & key decisions"),
  bullet([
    rt("Next.js 16", { bold: true }),
    rt(
      " with App Router and Turbopack — uses the new proxy.ts (renamed from middleware.ts) for locale detection.",
    ),
  ]),
  bullet([
    rt("TypeScript", { bold: true }),
    rt(
      " strict mode; in v16, params is now a Promise, so every page awaits it.",
    ),
  ]),
  bullet([
    rt("Tailwind CSS v4", { bold: true }),
    rt(
      " with @custom-variant dark for class-based dark mode + prefers-color-scheme fallback.",
    ),
  ]),
  bullet([
    rt("Hand-built primitives", { bold: true }),
    rt(
      " in shadcn/ui style (no CLI run) — Button, ContactForm, FadeIn — so the bundle stays small and ownership is full.",
    ),
  ]),
  bullet([
    rt("Framer Motion", { bold: true }),
    rt(" for restrained fade-ins. Lucide React for icons + inline SVGs for GitHub/LinkedIn (Lucide removed brand icons)."),
  ]),
  bullet([
    rt("i18n", { bold: true }),
    rt(
      " via app/[lang]/ segment + JSON dictionaries — fully static, no runtime translation library.",
    ),
  ]),
  bullet([
    rt("Hosting: ", { bold: true }),
    rt("Vercel Hobby plan + GoDaddy domain. A record points to 216.198.79.1."),
  ]),

  h2("Page architecture"),
  bullet([rt("/", { code: true }), rt(" — redirect to user's locale (en or de)")]),
  bullet([rt("/[lang]", { code: true }), rt(" — hero, credentials snapshot, featured projects")]),
  bullet([rt("/[lang]/about", { code: true }), rt(" — bio with integration-focus emphasis")]),
  bullet([rt("/[lang]/projects", { code: true }), rt(" — three real case studies")]),
  bullet([rt("/[lang]/projects/[slug]", { code: true }), rt(" — single project deep-dive: highlights · problem · architecture · approach · outcome · integrations grid · Notion / Source / Live CTAs")]),
  bullet([rt("/[lang]/certifications", { code: true }), rt(" — 10 certs grouped by status + 8 superbadges + Trailhead stats")]),
  bullet([rt("/[lang]/skills", { code: true }), rt(" — Salesforce / Industry / Integration / Tools / Web (HTML+CSS) / DevOps")]),
  bullet([rt("/[lang]/blog", { code: true }), rt(" — empty-state placeholder for future technical posts")]),
  bullet([rt("/[lang]/uses", { code: true }), rt(" — developer setup (uses.tech style)")]),
  bullet([rt("/[lang]/now", { code: true }), rt(" — current focus, last updated date")]),
  bullet([rt("/[lang]/contact", { code: true }), rt(" — mailto form + socials")]),
  p(rt("Plus: localized 404, sitemap.xml, robots.txt, dynamic OG images per locale.", { italic: true })),

  h2("Featured case studies"),

  h3("TechnoStore — Revenue Cloud Quote-to-Cash for the DACH market"),
  p(
    rt(
      "End-to-end B2B electronics Quote-to-Cash demo on Salesforce Revenue Lifecycle Management, Contract Lifecycle Management, and Industries CPQ — orchestrated with MuleSoft Anypoint across seven external systems. Built specifically against DACH enterprise role expectations (T-Systems, Allianz Technology, Mercedes-Benz.io, BMW Group IT, SAP Industries practice).",
    ),
  ),
  bullet([rt("Stack: ", { bold: true }), rt("Apex · RLM · CLM · Industries CPQ · MuleSoft Anypoint · Platform Events · Named Credentials · OpenAPI 3.0 · arc42 · Kevin O'Hara trigger framework")]),
  bullet([rt("Integrations (7): ", { bold: true }), rt("Stripe (HMAC-SHA256 webhook), Sendcloud/DHL (v3 API), DocuSign (envelope + Connect webhook), JIRA Cloud (inventory tickets), Slack (#warehouse + #payments-team), Notion (programmatic publishing), MuleSoft (orchestration layer)")]),
  bullet([rt("Architecture: ", { bold: true }), rt("OrderTriggerHandler fan-out across five downstream systems in parallel; Stripe webhook arrives at MuleSoft, HMAC-verified, scatters back to Salesforce + Slack + a Choice router for fulfilment; DocuSign Connect lands at a Salesforce Site and uses a Platform Event indirection to escape Guest User FLS limits.")]),
  bullet([rt("Numbers: ", { bold: true }), rt("60 Apex classes across 6 SFDX packages (~214 KB of code), 10 Architecture Decision Records (Nygard format), 50-entry STAR-format Notion portfolio published programmatically, 2–6 second end-to-end Quote-to-Cash latency.")]),
  bullet([rt("DACH-specific: ", { bold: true }), rt("19 % VAT formulas, DHL preference, DE/AT/CH address parsing.")]),
  bullet([
    rt("Repo: ", { bold: true }),
    rt("github.com/aksumustafa1625/TechnoStore", { href: "https://github.com/aksumustafa1625/TechnoStore" }),
  ]),
  bullet([
    rt("Notion case study: ", { bold: true }),
    rt("TechnoStore Interview Prep", { href: "https://www.notion.so/TechnoStore-Interview-Prep-35d10a2e9f868035b2baf974792298c5" }),
  ]),

  h3("Urla Shoes — Route safety with Google Maps, OpenWeather, and Salesforce Einstein"),
  p(
    rt(
      "A live demo combining three external integrations to plan a route, fetch weather along five waypoints, and let an Einstein Prompt Template (GPT-4o mini) decide whether the journey is safe. Direct match for fleet management, field service, and delivery scheduling work in the DACH market.",
    ),
  ),
  bullet([rt("Stack: ", { bold: true }), rt("Apex (Queueable) · Lightning Web Components · Visualforce (bridge) · Salesforce Einstein · Prompt Templates · ConnectApi.EinsteinLLM · Named Credentials")]),
  bullet([rt("Integrations: ", { bold: true }), rt("Google Maps Directions (via VF iframe + postMessage), OpenWeatherMap (5-waypoint parallel forecast), Salesforce Einstein (GPT-4o mini), Nationalize.io (secondary feature on Contact insert).")]),
  bullet([rt("Architecture: ", { bold: true }), rt("routeWeather LWC orchestrates the flow — hosts a Visualforce page in an iframe (the only way to load Google Maps under Lightning Web Security), receives the route via postMessage, computes five waypoints, fires five parallel Promise.all fetches to OpenWeather, then POSTs a slim six-field-per-waypoint payload to RouteWeatherAnalysisService which calls ConnectApi.EinsteinLLM.generateMessagesForPromptTemplate('RouteWeatherAnalysis').")]),
  bullet([rt("Output: ", { bold: true }), rt("AI verdict rendered in a colour-coded card by a keyword classifier (storm/ice/hazard → red; caution/careful → amber; else green).")]),
  bullet([rt("Secondary feature: ", { bold: true }), rt("Contact-insert Queueable hits Nationalize.io with full HttpCalloutMock coverage across six scenarios (success, empty, HTTP 500, missing FirstName, bulk-10, parser unit test).")]),
  bullet([
    rt("Repo: ", { bold: true }),
    rt("github.com/aksumustafa1625/urla-shoes", { href: "https://github.com/aksumustafa1625/urla-shoes" }),
  ]),
  bullet([
    rt("Notion case study: ", { bold: true }),
    rt("Urla Shoes Documentation", { href: "https://www.notion.so/Urla-Shoes-Documentation-Yedek-33310a2e9f8680c0a5acc0d6ccf49745" }),
  ]),

  h3("VoltStream Mobility — Channel-partner attribution for EV-charging sales"),
  p(
    rt(
      "B2B EV-charging CRM where one field on an Opportunity auto-links the deal to the right channel partner via Apex. Modelled on the German e-mobility hiring market (EnBW, Ionity, Allego, Mercedes-Benz Mobility).",
    ),
  ),
  bullet([rt("Stack: ", { bold: true }), rt("Apex · Custom Objects · Trigger Framework · SOQL · Lightning App Builder · Reports & Dashboards")]),
  bullet([rt("Architecture: ", { bold: true }), rt("Custom Reseller__c object with indexed Company_Email__c External ID; four-layer pattern (trigger → handler → service → matcher) on the Kevin O'Hara framework. Lookup relationship (not master-detail) so revenue data survives partner churn.")]),
  bullet([rt("Numbers: ", { bold: true }), rt("80 / 80 Apex tests passing, 100 % coverage including bulk and negative cases.")]),
  bullet([rt("Next phase: ", { bold: true }), rt("Extend the schema with Salesforce CPQ for hardware-bundle pricing.")]),
  bullet([
    rt("Repo: ", { bold: true }),
    rt("github.com/aksumustafa1625/VoltStreamMobility", { href: "https://github.com/aksumustafa1625/VoltStreamMobility" }),
  ]),

  h2("Roadmap"),

  h3("✅ Phase 1 — Foundation"),
  todo("Set up Next.js 16 + Tailwind v4 + TypeScript", true),
  todo("Bilingual EN+DE i18n architecture", true),
  todo("All page skeletons with placeholder content", true),
  todo("GitHub repo + Vercel deploy + custom domain (apex primary, www redirects)", true),
  todo("Pivot positioning from generic web dev to Salesforce Developer", true),

  h3("🟡 Phase 2 — Real content"),
  todo("Salesforce-focused About bio in EN + DE", true),
  todo("Three real case studies: TechnoStore, VoltStream, Urla Shoes", true),
  todo("Skills audited (Web stack reduced to HTML/CSS — honesty)", true),
  todo("Certifications page with all 10 certs + 8 superbadges + Trailhead stats", true),
  todo("Add profile photo to About page", false),
  todo("Upload CV PDF to /public/cv.pdf", false),
  todo("Extend VoltStream case study with Salesforce CPQ phase", false),

  h3("🔵 Phase 3 — Polish"),
  todo("Add blog (MDX) — at least 2 Salesforce technical posts", false),
  todo("Vercel Analytics + Speed Insights", false),
  todo("Lighthouse audit, fix any < 95 scores", false),
  todo("Reach out to 2-3 friends for feedback", false),
  todo("Submit sitemap to Google Search Console", false),

  h3("⚪ Phase 4 — Reach"),
  todo("Share on LinkedIn with a 'built my portfolio' post", false),
  todo("Add to GitHub profile README", false),
  todo("Pin the repo on GitHub profile", false),

  h2("Content backlog"),
  p(rt("Concrete items still pending:", { italic: true })),
  todo("Add /public/profile.jpg + render on About page", false),
  todo("Add /public/cv.pdf (Salesforce-targeted, 1-page)", false),
  todo("German bio paragraphs — quality check by a native speaker before LinkedIn share", false),
  todo("VoltStream — extend case study with Salesforce CPQ scope when added", false),
  todo("Blog — write first post (e.g., 'Async callout patterns in Apex')", false),

  h2("Deploy runbook"),
  p(
    rt("Trigger: ", { bold: true }),
    rt(
      "every push to main deploys automatically to production via Vercel's GitHub integration. PRs get preview deploys.",
    ),
  ),
  p(rt("Manual rollback:", { bold: true })),
  bullet("Vercel dashboard → Deployments → find good previous deploy"),
  bullet([rt('"..." menu → '), rt('"Promote to Production"', { bold: true })]),
  p(rt("DNS:", { bold: true })),
  bullet([rt("A record @", { code: true }), rt(" → "), rt("216.198.79.1", { code: true }), rt(" (Vercel)")]),
  bullet([rt("CNAME www", { code: true }), rt(" → "), rt("mustafaaksu.dev.", { code: true }), rt(" (chains to apex)")]),
  bullet("Email-related records (MX, TXT/SPF/DMARC, DKIM CNAMEs) untouched"),

  h2("Lessons learned"),
  bullet(
    "Next.js 16 renamed middleware.ts to proxy.ts — sub-30 min change once you find the new docs.",
  ),
  bullet(
    "Lucide-react has removed all brand icons (GitHub, LinkedIn, Twitter). Inline SVG is the cleanest workaround.",
  ),
  bullet([
    rt("Tailwind v4 class-based dark mode: "),
    rt("@custom-variant dark (&:where(.dark, .dark *));", { code: true }),
  ]),
  bullet(
    "'server-only' propagates through imports — split locale constants into a client-safe module.",
  ),

  divider(),

  p(
    rt("Last synced from ", { italic: true }),
    rt("scripts/sync-notion-docs.mjs", { code: true, italic: true }),
    rt(` on ${new Date().toISOString().split("T")[0]}.`, { italic: true }),
  ),
];

// ---------- Sync logic ----------

async function clearExistingChildren() {
  const children = await notion("GET", `/blocks/${PAGE_ID}/children?page_size=100`);
  for (const block of children.results) {
    await notion("DELETE", `/blocks/${block.id}`);
    await sleep(80); // gentle rate limiting
  }
  if (children.has_more) {
    console.warn("More than 100 existing children; consider re-running to clean fully.");
  }
}

async function appendBlocks(blocks) {
  // Notion limits append to 100 blocks per request
  const CHUNK = 90;
  for (let i = 0; i < blocks.length; i += CHUNK) {
    const chunk = blocks.slice(i, i + CHUNK);
    await notion("PATCH", `/blocks/${PAGE_ID}/children`, { children: chunk });
    await sleep(120);
  }
}

(async () => {
  console.log(`Syncing to Notion page: ${PAGE_ID}`);
  console.log("Clearing existing children…");
  await clearExistingChildren();
  console.log(`Appending ${blocks.length} blocks…`);
  await appendBlocks(blocks);
  console.log("✓ Done. Reload the page in Notion to see updated content.");
})().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
