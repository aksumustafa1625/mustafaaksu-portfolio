import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Mail,
  Workflow,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import { capabilities, lifecycle } from "@/lib/revenue-cloud";
import { certifications } from "@/lib/certifications";
import { getDictionary, hasLocale } from "../dictionaries";

export async function generateMetadata(
  props: PageProps<"/[lang]/revenue-cloud">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.revenueCloud.title,
    description: dict.revenueCloud.lead,
  };
}

const REVENUE_CLOUD_CERT_CATEGORIES = new Set([
  "Industry Solutions",
  "Sales Cloud",
  "Platform",
]);

export default async function RevenueCloudPage(
  props: PageProps<"/[lang]/revenue-cloud">,
) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const relevantCerts = certifications.filter(
    (c) =>
      c.status === "active" && REVENUE_CLOUD_CERT_CATEGORIES.has(c.category),
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      {/* Hero */}
      <section className="py-16 sm:py-20">
        <FadeIn>
          <p className="text-sm uppercase tracking-widest text-accent">
            {dict.revenueCloud.title}
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {dict.revenueCloud.lead}
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
            {dict.revenueCloud.intro}
          </p>
        </FadeIn>
      </section>

      {/* Capabilities */}
      <section className="border-t border-border py-16">
        <FadeIn>
          <h2 className="text-2xl font-semibold tracking-tight">
            {dict.revenueCloud.capabilitiesTitle}
          </h2>
        </FadeIn>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {capabilities.map((cap, idx) => {
            const t = cap.translations[lang];
            return (
              <li key={cap.id}>
                <FadeIn delay={0.05 + idx * 0.04}>
                  <article className="h-full rounded-2xl border border-border bg-muted-bg/30 p-6">
                    <h3 className="text-base font-medium text-foreground">
                      {t.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                      {t.body}
                    </p>
                    {cap.cert ? (
                      <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
                        <CheckCircle2 className="h-3 w-3" />
                        {cap.cert}
                      </p>
                    ) : null}
                  </article>
                </FadeIn>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Lifecycle */}
      <section className="border-t border-border py-16">
        <FadeIn>
          <div className="flex items-center gap-2 text-accent">
            <Workflow className="h-4 w-4" />
            <p className="text-sm uppercase tracking-widest">
              {dict.revenueCloud.title}
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl">
            {dict.revenueCloud.lifecycleTitle}
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mt-3 max-w-3xl text-base text-muted">
            {dict.revenueCloud.lifecycleLead}
          </p>
        </FadeIn>

        <ol className="mt-12 space-y-6">
          {lifecycle.map((stage, idx) => {
            const t = stage.translations[lang];
            return (
              <li key={stage.id}>
                <FadeIn delay={0.1 + idx * 0.04}>
                  <article className="grid gap-4 sm:grid-cols-[3.5rem_1fr]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-sm font-semibold text-accent">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-medium text-foreground">
                        {t.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/70 sm:text-base">
                        {t.body}
                      </p>
                    </div>
                  </article>
                </FadeIn>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Credentials */}
      <section className="border-t border-border py-16">
        <FadeIn>
          <h2 className="text-2xl font-semibold tracking-tight">
            {dict.revenueCloud.credentialsTitle}
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-3 max-w-3xl text-base text-muted">
            {dict.revenueCloud.credentialsLead}
          </p>
        </FadeIn>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {relevantCerts.map((cert, idx) => (
            <li key={cert.name}>
              <FadeIn delay={0.1 + idx * 0.04}>
                <div className="flex items-start gap-3 rounded-xl border border-border bg-muted-bg/20 p-4">
                  <Award className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {cert.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      {cert.category} · {cert.issuedMonth} {cert.issuedYear}
                    </p>
                  </div>
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>

        <FadeIn delay={0.4}>
          <div className="mt-8">
            <Link
              href={`/${lang}/certifications`}
              className="inline-flex items-center gap-1.5 text-sm text-foreground/80 hover:text-accent"
            >
              {dict.revenueCloud.credentialsCta}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Projects */}
      <section className="border-t border-border py-16">
        <FadeIn>
          <h2 className="text-2xl font-semibold tracking-tight">
            {dict.revenueCloud.projectsTitle}
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-3 max-w-3xl text-base text-muted">
            {dict.revenueCloud.projectsLead}
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <FadeIn delay={0.15}>
            <Link
              href={`/${lang}/projects/technostore-revenue-cloud`}
              className="group block h-full rounded-2xl border border-border p-6 transition-colors hover:bg-muted-bg"
            >
              <p className="text-xs uppercase tracking-widest text-accent">
                Reference architecture
              </p>
              <h3 className="mt-3 text-lg font-medium text-foreground">
                TechnoStore — Revenue Cloud Quote-to-Cash for DACH
              </h3>
              <p className="mt-2 text-sm text-muted">
                RLM + CLM + Industries CPQ, MuleSoft across 7 external systems,
                arc42 architecture docs, 60 Apex classes.
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm text-foreground/80 group-hover:text-accent">
                {dict.revenueCloud.ctaCaseStudy}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link
              href={`/${lang}/projects/voltstream-mobility`}
              className="group block h-full rounded-2xl border border-border p-6 transition-colors hover:bg-muted-bg"
            >
              <p className="text-xs uppercase tracking-widest text-accent">
                CPQ extension
              </p>
              <h3 className="mt-3 text-lg font-medium text-foreground">
                VoltStream Mobility — Channel attribution & CPQ next
              </h3>
              <p className="mt-2 text-sm text-muted">
                Channel-partner attribution on the Kevin O&apos;Hara trigger
                framework today, Salesforce CPQ for hardware-bundle pricing
                next.
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm text-foreground/80 group-hover:text-accent">
                {dict.projects.viewProject}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </FadeIn>
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href={`/${lang}/contact`}>
              <Mail className="h-4 w-4" />
              {dict.revenueCloud.ctaContact}
            </ButtonLink>
            <ButtonLink href={`/${lang}/projects`} variant="secondary">
              {dict.nav.projects}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
