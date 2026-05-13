import { ArrowRight, Award, Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { FadeIn } from "@/components/fade-in";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { certifications, superbadges, trailhead } from "@/lib/certifications";
import { getDictionary, hasLocale } from "./dictionaries";
import Link from "next/link";

export default async function HomePage(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <section className="flex min-h-[calc(100vh-4rem)] flex-col justify-center py-16">
        <FadeIn>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted-bg/60 px-3 py-1 text-xs text-muted">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            {dict.home.availability}
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="mt-6 flex items-center gap-3">
            <Image
              src="/profile.jpg"
              alt="Mustafa Aksu"
              width={56}
              height={56}
              priority
              className="h-14 w-14 rounded-full object-cover object-[center_top] ring-1 ring-border"
            />
            <p className="text-sm text-muted">{dict.home.greeting}</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {dict.home.headline}
          </h1>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p className="mt-6 max-w-2xl text-base text-muted sm:text-lg">
            {dict.home.subhead}
          </p>
        </FadeIn>
        <FadeIn delay={0.35}>
          <div className="mt-8 flex flex-wrap gap-2">
            <Link
              href={`/${lang}/certifications`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted-bg/40 px-3 py-1 text-xs text-foreground/80 hover:bg-muted-bg hover:text-foreground transition-colors"
            >
              <Award className="h-3.5 w-3.5 text-accent" />
              <span className="font-semibold text-foreground">
                {certifications.filter((c) => c.status === "active").length}
              </span>
              Salesforce certifications
            </Link>
            <Link
              href={`/${lang}/certifications`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted-bg/40 px-3 py-1 text-xs text-foreground/80 hover:bg-muted-bg hover:text-foreground transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span className="font-semibold text-foreground">
                {superbadges.length}
              </span>
              Superbadges
            </Link>
            <a
              href={trailhead.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted-bg/40 px-3 py-1 text-xs text-foreground/80 hover:bg-muted-bg hover:text-foreground transition-colors"
            >
              {trailhead.rank} · {trailhead.badges} badges
            </a>
          </div>
        </FadeIn>
        <FadeIn delay={0.45}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href={`/${lang}/projects`} size="lg">
              {dict.home.ctaProjects}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href={`/${lang}/contact`}
              variant="secondary"
              size="lg"
            >
              {dict.home.ctaContact}
            </ButtonLink>
            <div className="ml-1 flex items-center gap-2 pl-3 border-l border-border">
              <a
                href={site.social.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-foreground/60 hover:text-foreground"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-foreground/60 hover:text-foreground"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${site.email}`}
                aria-label="Email"
                className="text-foreground/60 hover:text-foreground"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      {featured.length > 0 ? (
        <section className="py-16 border-t border-border">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">
              {dict.projects.title}
            </h2>
            <Link
              href={`/${lang}/projects`}
              className="text-sm text-muted hover:text-foreground"
            >
              {dict.projects.viewProject} →
            </Link>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {featured.map((p) => {
              const t = p.translations[lang];
              return (
                <li key={p.slug}>
                  <Link
                    href={`/${lang}/projects/${p.slug}`}
                    className="group block rounded-2xl border border-border p-6 transition-colors hover:bg-muted-bg"
                  >
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>{p.year}</span>
                      <span>{p.tech.slice(0, 3).join(" · ")}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-medium text-foreground">
                      {t.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{t.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm text-foreground/80 group-hover:text-accent">
                      {dict.projects.viewProject}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
