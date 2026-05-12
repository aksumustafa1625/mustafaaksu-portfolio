import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import { getProject, projects } from "@/lib/projects";
import { getDictionary, hasLocale, locales } from "../../dictionaries";

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    projects.map((p) => ({ lang, slug: p.slug })),
  );
}

export async function generateMetadata(
  props: PageProps<"/[lang]/projects/[slug]">,
): Promise<Metadata> {
  const { lang, slug } = await props.params;
  if (!hasLocale(lang)) return {};
  const project = getProject(slug);
  if (!project) return {};
  const t = project.translations[lang];
  return { title: t.title, description: t.tagline };
}

export default async function ProjectDetail(
  props: PageProps<"/[lang]/projects/[slug]">,
) {
  const { lang, slug } = await props.params;
  if (!hasLocale(lang)) notFound();
  const project = getProject(slug);
  if (!project) notFound();
  const dict = await getDictionary(lang);
  const t = project.translations[lang];
  const highlights = project.highlights?.[lang];

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <FadeIn>
        <Link
          href={`/${lang}/projects`}
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {dict.projects.back}
        </Link>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          {t.title}
        </h1>
      </FadeIn>
      <FadeIn delay={0.15}>
        <p className="mt-3 text-lg text-muted">{t.tagline}</p>
      </FadeIn>

      <FadeIn delay={0.2}>
        <dl className="mt-8 grid grid-cols-1 gap-6 rounded-2xl border border-border bg-muted-bg/40 p-6 sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">
              {dict.projects.year}
            </dt>
            <dd className="mt-1 text-sm text-foreground">{project.year}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">
              {dict.projects.role}
            </dt>
            <dd className="mt-1 text-sm text-foreground">{project.role}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">
              {dict.projects.tech}
            </dt>
            <dd className="mt-1 flex flex-wrap gap-1">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-background px-2 py-0.5 text-xs text-foreground/80"
                >
                  {tech}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </FadeIn>

      {highlights && highlights.length > 0 ? (
        <FadeIn delay={0.25}>
          <section className="mt-8 rounded-2xl border border-accent/30 bg-accent/5 p-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <h2 className="text-sm font-medium uppercase tracking-widest text-accent">
                {dict.projects.highlights}
              </h2>
            </div>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {highlights.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-foreground/90"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </FadeIn>
      ) : null}

      <FadeIn delay={0.3}>
        <div className="mt-10 space-y-8 text-base leading-relaxed text-foreground/80">
          <Section title={dict.projects.problem} body={t.problem} />
          {t.architecture ? (
            <Section
              title={dict.projects.architecture}
              body={t.architecture}
            />
          ) : null}
          <Section title={dict.projects.approach} body={t.approach} />
          <Section title={dict.projects.outcome} body={t.outcome} />
        </div>
      </FadeIn>

      {project.integrations && project.integrations.length > 0 ? (
        <FadeIn delay={0.35}>
          <section className="mt-12">
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted">
              {dict.projects.integrations}
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {project.integrations.map((it) => {
                const card = (
                  <div className="group flex h-full flex-col rounded-xl border border-border bg-muted-bg/30 p-4 transition-colors hover:border-accent/40 hover:bg-muted-bg/60">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-medium text-foreground">
                        {it.name}
                      </span>
                      {it.href ? (
                        <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0 text-muted transition-colors group-hover:text-accent" />
                      ) : null}
                    </div>
                    {it.note ? (
                      <p className="mt-1.5 text-xs leading-relaxed text-muted">
                        {it.note}
                      </p>
                    ) : null}
                  </div>
                );
                return (
                  <li key={it.name}>
                    {it.href ? (
                      <a
                        href={it.href}
                        target="_blank"
                        rel="noreferrer"
                        className="block h-full"
                      >
                        {card}
                      </a>
                    ) : (
                      card
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        </FadeIn>
      ) : null}

      {(project.liveUrl || project.repoUrl || project.notionUrl) && (
        <FadeIn delay={0.4}>
          <div className="mt-12 flex flex-wrap gap-3">
            {project.liveUrl ? (
              <ButtonLink href={project.liveUrl} target="_blank">
                <ExternalLink className="h-4 w-4" />
                {dict.projects.viewLive}
              </ButtonLink>
            ) : null}
            {project.repoUrl ? (
              <ButtonLink
                href={project.repoUrl}
                target="_blank"
                variant="secondary"
              >
                <GithubIcon className="h-4 w-4" />
                {dict.projects.viewCode}
              </ButtonLink>
            ) : null}
            {project.notionUrl ? (
              <ButtonLink
                href={project.notionUrl}
                target="_blank"
                variant="secondary"
              >
                <BookOpen className="h-4 w-4" />
                {dict.projects.viewNotion}
              </ButtonLink>
            ) : null}
          </div>
        </FadeIn>
      )}
    </article>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <section>
      <h2 className="text-sm font-medium uppercase tracking-widest text-muted">
        {title}
      </h2>
      <p className="mt-3">{body}</p>
    </section>
  );
}
