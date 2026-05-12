export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
};

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);
