import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { projects } from "@/lib/projects";
import { getDictionary, hasLocale } from "../dictionaries";

export async function generateMetadata(
  props: PageProps<"/[lang]/projects">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.projects.title };
}

export default async function ProjectsPage(
  props: PageProps<"/[lang]/projects">,
) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <FadeIn>
        <p className="text-sm uppercase tracking-widest text-muted">
          {dict.projects.title}
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          {dict.projects.lead}
        </h1>
      </FadeIn>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {projects.map((p, idx) => {
          const t = p.translations[lang];
          return (
            <li key={p.slug}>
              <FadeIn delay={0.1 + idx * 0.05}>
                <Link
                  href={`/${lang}/projects/${p.slug}`}
                  className="group block h-full rounded-2xl border border-border p-6 transition-colors hover:bg-muted-bg"
                >
                  <div className="flex items-center justify-between text-xs text-muted">
                    <span>{p.year}</span>
                    <span>{p.role}</span>
                  </div>
                  <h2 className="mt-3 text-lg font-medium text-foreground">
                    {t.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted">{t.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-muted-bg px-2 py-0.5 text-xs text-foreground/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm text-foreground/80 group-hover:text-accent">
                    {dict.projects.viewProject}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </FadeIn>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
