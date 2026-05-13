export type Certification = {
  name: string;
  category:
    | "Platform"
    | "Sales Cloud"
    | "Industry Solutions"
    | "Agentforce"
    | "AI Associate";
  issuedMonth: string;
  issuedYear: number;
  status: "active" | "preparing" | "retired";
  badgeImage?: string;
};

export const certifications: Certification[] = [
  {
    name: "Salesforce Certified Industries CPQ Developer",
    category: "Industry Solutions",
    issuedMonth: "May",
    issuedYear: 2025,
    status: "active",
    badgeImage: "/badges/cert-industries-cpq-developer.png",
  },
  {
    name: "Salesforce Certified Platform App Builder",
    category: "Platform",
    issuedMonth: "Apr",
    issuedYear: 2025,
    status: "active",
    badgeImage: "/badges/cert-platform-app-builder.png",
  },
  {
    name: "Salesforce Certified CPQ Administrator",
    category: "Sales Cloud",
    issuedMonth: "Mar",
    issuedYear: 2025,
    status: "active",
    badgeImage: "/badges/cert-cpq-administrator.png",
  },
  {
    name: "Salesforce Certified Agentforce Specialist",
    category: "Agentforce",
    issuedMonth: "Jan",
    issuedYear: 2025,
    status: "active",
    badgeImage: "/badges/cert-agentforce-specialist.png",
  },
  {
    name: "Salesforce Certified Platform Developer II",
    category: "Platform",
    issuedMonth: "Dec",
    issuedYear: 2024,
    status: "active",
    badgeImage: "/badges/cert-platform-developer-ii.png",
  },
  {
    name: "Salesforce Certified Platform Developer I",
    category: "Platform",
    issuedMonth: "Nov",
    issuedYear: 2024,
    status: "active",
    badgeImage: "/badges/cert-platform-developer-i.png",
  },
  {
    name: "Salesforce Certified Administrator",
    category: "Platform",
    issuedMonth: "Oct",
    issuedYear: 2024,
    status: "active",
    badgeImage: "/badges/cert-administrator.png",
  },
  {
    name: "Salesforce Certified AI Associate",
    category: "AI Associate",
    issuedMonth: "Dec",
    issuedYear: 2024,
    status: "retired",
  },
];

export type Superbadge = {
  name: string;
  completedMonth: string;
  completedYear: number;
};

export const superbadges: Superbadge[] = [
  { name: "Advanced Apex Specialist", completedMonth: "Dec", completedYear: 2024 },
  { name: "Apex Specialist", completedMonth: "Oct", completedYear: 2024 },
  { name: "Apex Callouts Superbadge", completedMonth: "Dec", completedYear: 2024 },
  { name: "Apex Web Services Superbadge", completedMonth: "Dec", completedYear: 2024 },
  { name: "Salesforce Inbound Integration Specialist", completedMonth: "Dec", completedYear: 2024 },
  { name: "Named Credentials Superbadge Unit", completedMonth: "Dec", completedYear: 2024 },
  { name: "Platform Events Superbadge Unit", completedMonth: "Dec", completedYear: 2024 },
  { name: "Platform API Superbadge Unit", completedMonth: "Dec", completedYear: 2024 },
];

export const trailhead = {
  username: "aksumustafa16",
  profileUrl: "https://www.salesforce.com/trailblazer/aksumustafa16",
  rank: "Five Star Ranger",
  badges: 518,
  superBadges: superbadges.length,
  points: 258050,
  trails: 28,
};
