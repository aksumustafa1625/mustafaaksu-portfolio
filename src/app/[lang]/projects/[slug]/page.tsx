import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
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

      <FadeIn delay={0.25}>
        <div className="mt-10 space-y-8 text-base leading-relaxed text-foreground/80">
          <Section title={dict.projects.problem} body={t.problem} />
          <Section title={dict.projects.approach} body={t.approach} />
          <Section title={dict.projects.outcome} body={t.outcome} />
        </div>
      </FadeIn>

      {(project.liveUrl || project.repoUrl) && (
        <FadeIn delay={0.3}>
          <div className="mt-10 flex flex-wrap gap-3">
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
