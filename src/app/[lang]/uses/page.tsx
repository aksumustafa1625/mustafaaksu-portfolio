import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/fade-in";
import { uses } from "@/lib/uses";
import { getDictionary, hasLocale } from "../dictionaries";

export async function generateMetadata(
  props: PageProps<"/[lang]/uses">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.uses.title };
}

export default async function UsesPage(props: PageProps<"/[lang]/uses">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <FadeIn>
        <p className="text-sm uppercase tracking-widest text-muted">
          {dict.uses.title}
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {dict.uses.lead}
        </h1>
      </FadeIn>

      <div className="mt-12 space-y-10">
        {uses.map((section, idx) => (
          <FadeIn key={section.category} delay={0.15 + idx * 0.05}>
            <section className="grid gap-4 sm:grid-cols-[14rem_1fr]">
              <h2 className="text-sm font-medium uppercase tracking-widest text-muted">
                {section.category}
              </h2>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex flex-wrap items-baseline gap-x-2 text-sm"
                  >
                    <span className="text-foreground">{item.name}</span>
                    {item.note ? (
                      <span className="text-muted">— {item.note}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
