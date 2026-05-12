export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "tools";

export const skills: Record<SkillCategory, string[]> = {
  frontend: [
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Framer Motion",
    "shadcn/ui",
  ],
  backend: ["Node.js", "Express", "REST", "GraphQL", "tRPC"],
  database: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Drizzle"],
  devops: ["Vercel", "Docker", "GitHub Actions", "AWS (basics)"],
  tools: ["Git", "VS Code", "Figma", "Linear", "Notion"],
};
