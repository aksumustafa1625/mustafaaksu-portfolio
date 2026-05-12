import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/fade-in";
import { skills, type SkillCategory } from "@/lib/skills";
import { getDictionary, hasLocale } from "../dictionaries";

export async function generateMetadata(
  props: PageProps<"/[lang]/skills">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.skills.title };
}

export default async function SkillsPage(props: PageProps<"/[lang]/skills">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const categories: SkillCategory[] = [
    "revenuecloud",
    "salesforce",
    "industry",
    "integration",
    "tools",
    "devops",
    "web",
    "languages",
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <FadeIn>
        <p className="text-sm uppercase tracking-widest text-muted">
          {dict.skills.title}
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {dict.skills.lead}
        </h1>
      </FadeIn>

      <div className="mt-12 space-y-10">
        {categories.map((cat, idx) => (
          <FadeIn key={cat} delay={0.15 + idx * 0.05}>
            <section className="grid gap-4 sm:grid-cols-[12rem_1fr]">
              <h2 className="text-sm font-medium uppercase tracking-widest text-muted">
                {dict.skills.categories[cat]}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {skills[cat].map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-border bg-muted-bg/40 px-3 py-1 text-sm text-foreground/80"
                  >
                    {skill}
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
