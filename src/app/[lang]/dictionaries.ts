import "server-only";
import type { Locale } from "@/lib/i18n";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  de: () => import("./dictionaries/de.json").then((m) => m.default),
} as const;

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();

export { locales, defaultLocale, hasLocale, localeLabels } from "@/lib/i18n";
export type { Locale } from "@/lib/i18n";
