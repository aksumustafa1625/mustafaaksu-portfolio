import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Award, ExternalLink } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import { certifications, trailhead } from "@/lib/certifications";
import { getDictionary, hasLocale } from "../dictionaries";

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

      <ul className="mt-12 space-y-3">
        {certifications.map((cert, idx) => (
          <li key={cert.name}>
            <FadeIn delay={0.15 + idx * 0.05}>
              <div className="flex flex-col gap-3 rounded-2xl border border-border bg-muted-bg/30 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-background p-2.5 text-accent">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-medium text-foreground">
                      {cert.name}
                    </h2>
                    <p className="mt-0.5 text-sm text-muted">
                      {dict.certifications.issuedBy} {cert.issuer} ·{" "}
                      {cert.status === "preparing"
                        ? dict.certifications.preparing
                        : `${dict.certifications.earned} ${cert.year}`}
                    </p>
                  </div>
                </div>
                {cert.credentialUrl && cert.status === "active" ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-foreground/70 hover:text-accent sm:flex-shrink-0"
                  >
                    {dict.certifications.verify}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </div>
            </FadeIn>
          </li>
        ))}
      </ul>

      <FadeIn delay={0.4}>
        <section className="mt-16 rounded-2xl border border-border bg-muted-bg/30 p-6 sm:p-8">
          <p className="text-sm uppercase tracking-widest text-muted">
            {dict.certifications.trailheadTitle}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            {dict.certifications.trailheadLead}
          </h2>
          <dl className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="rounded-xl bg-background p-4">
              <dt className="text-xs uppercase tracking-wider text-muted">
                {dict.certifications.trailheadBadges}
              </dt>
              <dd className="mt-1 text-2xl font-semibold">{trailhead.badges}</dd>
            </div>
            <div className="rounded-xl bg-background p-4">
              <dt className="text-xs uppercase tracking-wider text-muted">
                {dict.certifications.trailheadSuperBadges}
              </dt>
              <dd className="mt-1 text-2xl font-semibold">
                {trailhead.superBadges}
              </dd>
            </div>
            <div className="rounded-xl bg-background p-4">
              <dt className="text-xs uppercase tracking-wider text-muted">
                Rank
              </dt>
              <dd className="mt-1 text-2xl font-semibold">{trailhead.rank}</dd>
            </div>
          </dl>
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
