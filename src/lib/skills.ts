export type SkillCategory =
  | "salesforce"
  | "industry"
  | "integration"
  | "tools"
  | "web"
  | "devops";

export const skills: Record<SkillCategory, string[]> = {
  salesforce: [
    "Apex (PD II)",
    "Lightning Web Components",
    "Aura Components",
    "SOQL / SOSL",
    "Flow Builder",
    "Validation Rules",
    "Platform Events",
    "Async Apex (Queueable, Batch, Schedulable)",
    "Visualforce",
  ],
  industry: [
    "OmniStudio (Developer + Consultant)",
    "Industries CPQ",
    "Salesforce CPQ",
    "Agentforce",
  ],
  integration: [
    "REST APIs",
    "SOAP APIs",
    "Named Credentials",
    "External Services",
    "Platform Events",
    "Webhooks",
    "MuleSoft (basics)",
  ],
  tools: [
    "Salesforce DX (sfdx)",
    "VS Code + SF Extensions",
    "Workbench",
    "Data Loader",
    "Postman",
    "Schema Builder",
  ],
  web: ["HTML", "CSS"],
  devops: ["Git / GitHub", "GitHub Actions"],
};
