import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/fade-in";
import { now } from "@/lib/now";
import { getDictionary, hasLocale } from "../dictionaries";

export async function generateMetadata(
  props: PageProps<"/[lang]/now">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.now.title };
}

export default async function NowPage(props: PageProps<"/[lang]/now">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <FadeIn>
        <p className="text-sm uppercase tracking-widest text-muted">
          {dict.now.title}
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {dict.now.lead}
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <ul className="mt-10 space-y-4">
          {now.items[lang].map((item, idx) => (
            <li
              key={idx}
              className="flex gap-3 text-base leading-relaxed text-foreground/80"
            >
              <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </FadeIn>

      <FadeIn delay={0.3}>
        <p className="mt-10 text-sm text-muted">
          {dict.now.lastUpdated}: {now.lastUpdated}
        </p>
      </FadeIn>
    </div>
  );
}
