export type SkillCategory =
  | "revenuecloud"
  | "salesforce"
  | "industry"
  | "integration"
  | "tools"
  | "devops"
  | "web"
  | "languages";

export const skills: Record<SkillCategory, string[]> = {
  revenuecloud: [
    "Salesforce CPQ (CPQ Admin certified)",
    "Industries CPQ (Industries CPQ Developer certified)",
    "Revenue Lifecycle Management (RLM)",
    "Contract Lifecycle Management (CLM)",
    "Salesforce Billing (basics)",
    "Quote-to-Cash architecture",
    "Subscription & usage-based pricing",
  ],
  salesforce: [
    "Apex (PD II certified)",
    "Lightning Web Components",
    "Aura Components",
    "SOQL / SOSL",
    "Flow Builder",
    "Validation Rules",
    "Platform Events",
    "Async Apex (Queueable, Batch, Schedulable)",
    "Trigger frameworks (Kevin O'Hara)",
    "Visualforce",
  ],
  industry: [
    "Agentforce Specialist (certified)",
    "Einstein Prompt Templates",
    "ConnectApi.EinsteinLLM",
  ],
  integration: [
    "REST APIs",
    "SOAP APIs",
    "Named Credentials",
    "External Services",
    "Platform Events",
    "Webhooks (HMAC-SHA256 verification)",
    "MuleSoft Anypoint (intermediate)",
    "SAP S/4HANA (active project)",
    "OpenAPI 3.0",
  ],
  tools: [
    "Salesforce DX (sfdx)",
    "VS Code + SF Extensions",
    "Scratch Orgs",
    "Workbench",
    "Data Loader",
    "Postman",
    "Schema Builder",
  ],
  devops: [
    "Git / GitHub",
    "GitHub Actions",
    "CI/CD pipelines",
    "Salesforce DevOps Center (basics)",
    "Copado (basics)",
  ],
  web: [
    "JavaScript (ES6+)",
    "TypeScript (basics)",
    "HTML",
    "CSS",
  ],
  languages: [
    "Turkish (native)",
    "English (professional)",
    "German (Goethe A2 — in progress)",
  ],
};
