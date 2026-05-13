import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Award, ExternalLink, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import {
  certifications,
  superbadges,
  trailhead,
} from "@/lib/certifications";
import { getDictionary, hasLocale } from "../dictionaries";
import { cn } from "@/lib/cn";

export async function generateMetadata(
  props: PageProps<"/[lang]/certifications">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.certifications.title };
}

export default async function CertificationsPage(
  props: PageProps<"/[lang]/certifications">,
) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const active = certifications.filter((c) => c.status === "active");
  const retired = certifications.filter((c) => c.status === "retired");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <FadeIn>
        <p className="text-sm uppercase tracking-widest text-muted">
          {dict.certifications.title}
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          {dict.certifications.lead}
        </h1>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="mt-8 flex flex-wrap gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted-bg px-3 py-1 text-foreground/80">
            <span className="font-semibold text-foreground">{active.length}</span>{" "}
            {dict.certifications.active}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted-bg px-3 py-1 text-foreground/80">
            <span className="font-semibold text-foreground">{superbadges.length}</span>{" "}
            {dict.certifications.superbadgesTitle}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted-bg px-3 py-1 text-foreground/80">
            <span className="font-semibold text-foreground">{trailhead.badges}</span>{" "}
            {dict.certifications.trailheadBadges}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted-bg px-3 py-1 text-foreground/80">
            {trailhead.rank}
          </span>
        </div>
      </FadeIn>

      <ul className="mt-10 space-y-3">
        {active.map((cert, idx) => (
          <li key={cert.name}>
            <FadeIn delay={0.2 + idx * 0.04}>
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-muted-bg/30 p-5">
                {cert.badgeImage ? (
                  <Image
                    src={cert.badgeImage}
                    alt={`${cert.name} badge`}
                    width={72}
                    height={72}
                    className="h-16 w-16 flex-shrink-0 sm:h-20 sm:w-20"
                  />
                ) : (
                  <div className="rounded-xl bg-background p-2.5 text-accent flex-shrink-0">
                    <Award className="h-5 w-5" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-wider text-muted">
                    {cert.category}
                  </p>
                  <h2 className="mt-1 text-base font-medium text-foreground">
                    {cert.name}
                  </h2>
                  <p className="mt-0.5 text-sm text-muted">
                    {dict.certifications.issued} {cert.issuedMonth}{" "}
                    {cert.issuedYear}
                  </p>
                </div>
              </div>
            </FadeIn>
          </li>
        ))}
      </ul>

      {retired.length > 0 ? (
        <FadeIn delay={0.4}>
          <ul className="mt-3 space-y-3">
            {retired.map((cert) => (
              <li
                key={cert.name}
                className="flex items-start gap-4 rounded-2xl border border-border/60 p-5 opacity-60"
              >
                <div className="rounded-xl bg-muted-bg p-2.5 text-muted flex-shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-wider text-muted">
                    {cert.category} · {dict.certifications.retired}
                  </p>
                  <h2 className="mt-1 text-base font-medium text-foreground/80">
                    {cert.name}
                  </h2>
                  <p className="mt-0.5 text-sm text-muted">
                    {dict.certifications.issued} {cert.issuedMonth}{" "}
                    {cert.issuedYear}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </FadeIn>
      ) : null}

      <FadeIn delay={0.45}>
        <p className="mt-6 text-center">
          <a
            href={trailhead.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
          >
            {dict.certifications.verifyAll}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </p>
      </FadeIn>

      <FadeIn delay={0.5}>
        <section className="mt-16">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted">
              {dict.certifications.superbadgesTitle}
            </h2>
          </div>
          <p className="mt-2 text-base text-foreground/70">
            {dict.certifications.superbadgesLead}
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {superbadges.map((sb) => (
              <li
                key={sb.name}
                className={cn(
                  "rounded-xl border border-border bg-muted-bg/20 px-4 py-3",
                  "flex items-baseline justify-between gap-3",
                )}
              >
                <span className="text-sm text-foreground">{sb.name}</span>
                <span className="text-xs text-muted whitespace-nowrap">
                  {sb.completedMonth} {sb.completedYear}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </FadeIn>

      <FadeIn delay={0.6}>
        <section className="mt-16 rounded-2xl border border-border bg-muted-bg/30 p-6 sm:p-8">
          <p className="text-sm uppercase tracking-widest text-muted">
            {dict.certifications.trailheadTitle}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            {dict.certifications.trailheadLead}
          </h2>
          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat
              label={dict.certifications.trailheadBadges}
              value={trailhead.badges.toLocaleString()}
            />
            <Stat
              label={dict.certifications.trailheadSuperBadges}
              value={trailhead.superBadges.toString()}
            />
            <Stat
              label={dict.certifications.trailheadPoints}
              value={trailhead.points.toLocaleString()}
            />
            <Stat
              label={dict.certifications.trailheadTrails}
              value={trailhead.trails.toString()}
            />
          </dl>
          <p className="mt-4 text-sm text-muted">
            Rank: <span className="font-medium text-foreground">{trailhead.rank}</span>
          </p>
          <div className="mt-6">
            <ButtonLink href={trailhead.profileUrl} target="_blank">
              {dict.certifications.trailheadCta}
              <ExternalLink className="h-4 w-4" />
            </ButtonLink>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-background p-4 text-center">
      <dt className="text-xs uppercase tracking-wider text-muted">{label}</dt>
      <dd className="mt-1 text-xl font-semibold sm:text-2xl">{value}</dd>
    </div>
  );
}
