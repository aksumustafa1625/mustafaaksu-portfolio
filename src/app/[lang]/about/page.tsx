import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import { getDictionary, hasLocale } from "../dictionaries";

export async function generateMetadata(
  props: PageProps<"/[lang]/about">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.about.title };
}

export default async function AboutPage(props: PageProps<"/[lang]/about">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <FadeIn>
        <p className="text-sm uppercase tracking-widest text-muted">
          {dict.about.title}
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {dict.about.lead}
        </h1>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground/80">
          {dict.about.body.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </FadeIn>
      <FadeIn delay={0.3}>
        <div className="mt-10">
          <ButtonLink href="/cv.pdf" variant="secondary">
            <Download className="h-4 w-4" />
            {dict.about.downloadCv}
          </ButtonLink>
        </div>
      </FadeIn>
    </div>
  );
}
