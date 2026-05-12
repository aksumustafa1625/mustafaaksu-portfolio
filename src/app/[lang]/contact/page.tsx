import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { FadeIn } from "@/components/fade-in";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";
import { getDictionary, hasLocale } from "../dictionaries";

export async function generateMetadata(
  props: PageProps<"/[lang]/contact">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.contact.title };
}

export default async function ContactPage(
  props: PageProps<"/[lang]/contact">,
) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <FadeIn>
        <p className="text-sm uppercase tracking-widest text-muted">
          {dict.contact.title}
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {dict.contact.lead}
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted">
          <span>{dict.contact.orEmail}</span>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-1.5 text-foreground hover:text-accent"
          >
            <Mail className="h-4 w-4" />
            {site.email}
          </a>
        </div>
        <div className="mt-2 flex items-center gap-4 text-sm">
          <a
            href={site.social.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-foreground/70 hover:text-foreground"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-foreground/70 hover:text-foreground"
          >
            <LinkedinIcon className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="mt-10 rounded-2xl border border-border bg-muted-bg/30 p-6 sm:p-8">
          <ContactForm
            labels={{
              name: dict.contact.name,
              email: dict.contact.email,
              message: dict.contact.message,
              send: dict.contact.send,
              sending: dict.contact.sending,
              success: dict.contact.success,
              error: dict.contact.error,
            }}
          />
        </div>
      </FadeIn>
    </div>
  );
}
