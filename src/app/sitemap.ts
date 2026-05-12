import type { MetadataRoute } from "next";
import { locales } from "./[lang]/dictionaries";
import { projects } from "@/lib/projects";

const BASE = "https://mustafaaksu.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/about", "/projects", "/skills", "/contact"];

  const pages = locales.flatMap((lang) =>
    staticPaths.map((path) => ({
      url: `${BASE}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1.0 : 0.7,
    })),
  );

  const projectPages = locales.flatMap((lang) =>
    projects.map((p) => ({
      url: `${BASE}/${lang}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );

  return [...pages, ...projectPages];
}
