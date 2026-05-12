export type Certification = {
  name: string;
  issuer: string;
  year: number;
  credentialUrl?: string;
  status: "active" | "preparing";
};

// TODO Mustafa: replace these with your real credentials.
// For each active cert, paste the verification URL from credential.salesforce.com.
export const certifications: Certification[] = [
  {
    name: "Salesforce Platform Developer I",
    issuer: "Salesforce",
    year: 2025,
    status: "active",
  },
  {
    name: "Salesforce Administrator",
    issuer: "Salesforce",
    year: 2024,
    status: "active",
  },
  {
    name: "Salesforce Platform Developer II",
    issuer: "Salesforce",
    year: 2026,
    status: "preparing",
  },
];

export const trailhead = {
  username: "mustafaaksu",
  profileUrl: "https://www.salesforce.com/trailblazer/mustafaaksu",
  badges: 0,
  superBadges: 0,
  rank: "Ranger",
};
