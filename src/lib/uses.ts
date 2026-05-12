export type UsesSection = {
  category: string;
  items: { name: string; note?: string }[];
};

export const uses: UsesSection[] = [
  {
    category: "Editor & Salesforce dev",
    items: [
      { name: "VS Code", note: "main editor" },
      { name: "Salesforce Extension Pack", note: "Apex, LWC, sfdx integration" },
      { name: "Apex Language Server", note: "code completion, navigation" },
      { name: "Prettier + Apex plugin", note: "consistent formatting" },
      { name: "ESLint with @salesforce/eslint-config-lwc" },
    ],
  },
  {
    category: "CLI & local tools",
    items: [
      { name: "Salesforce CLI (sfdx)", note: "scratch orgs, deploy, retrieve" },
      { name: "Workbench", note: "ad-hoc SOQL / SOAP" },
      { name: "Postman", note: "REST integrations" },
      { name: "Data Loader", note: "bulk data work" },
      { name: "Git + GitHub", note: "version control everything" },
    ],
  },
  {
    category: "Web stack (for side projects)",
    items: [
      { name: "Node.js (latest LTS)" },
      { name: "TypeScript" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Vercel for hosting" },
    ],
  },
  {
    category: "Services",
    items: [
      { name: "GitHub", note: "code + Actions" },
      { name: "Notion", note: "docs, planning, learning notes" },
      { name: "Trailhead", note: "ongoing Salesforce learning" },
      { name: "Linear", note: "personal task tracking" },
    ],
  },
];
