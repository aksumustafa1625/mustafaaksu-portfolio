import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import { LinkedinIcon } from "@/components/icons";
import { site } from "@/lib/site";
import { getDictionary, hasLocale } from "../dictionaries";

export async function generateMetadata(
  props: PageProps<"/[lang]/blog">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.blog.title };
}

export default async function BlogPage(props: PageProps<"/[lang]/blog">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <FadeIn>
        <p className="text-sm uppercase tracking-widest text-muted">
          {dict.blog.title}
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {dict.blog.lead}
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="mt-12 rounded-2xl border border-dashed border-border bg-muted-bg/30 p-8 text-center sm:p-12">
          <p className="text-muted">{dict.blog.empty}</p>
          <div className="mt-6">
            <ButtonLink
              href={site.social.linkedin}
              target="_blank"
              variant="secondary"
            >
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
            </ButtonLink>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
