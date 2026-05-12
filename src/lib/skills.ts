export type SkillCategory =
  | "salesforce"
  | "integration"
  | "tools"
  | "web"
  | "devops";

export const skills: Record<SkillCategory, string[]> = {
  salesforce: [
    "Apex",
    "Lightning Web Components",
    "Aura Components",
    "SOQL / SOSL",
    "Flow Builder",
    "Validation Rules",
    "Visualforce",
    "OmniStudio (basics)",
  ],
  integration: [
    "REST APIs",
    "SOAP APIs",
    "Named Credentials",
    "External Services",
    "Platform Events",
    "Webhooks",
  ],
  tools: [
    "Salesforce DX (sfdx)",
    "VS Code + SF Extensions",
    "Workbench",
    "Data Loader",
    "Postman",
    "Schema Builder",
  ],
  web: ["TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS"],
  devops: ["Git / GitHub", "GitHub Actions", "Copado (basics)", "Vercel"],
};
