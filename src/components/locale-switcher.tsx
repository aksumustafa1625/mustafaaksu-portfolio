"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { useState } from "react";
import { locales, localeLabels, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

export function LocaleSwitcher({
  current,
  label,
}: {
  current: Locale;
  label: string;
}) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  const swap = (locale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        aria-label={label}
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3 text-sm",
          "text-foreground/70 hover:text-foreground hover:bg-muted-bg transition-colors",
        )}
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{current}</span>
      </button>
      {open ? (
        <div
          className={cn(
            "absolute right-0 top-full mt-2 min-w-32 overflow-hidden rounded-xl border border-border bg-background shadow-lg",
            "z-50",
          )}
        >
          {locales.map((locale) => (
            <Link
              key={locale}
              href={swap(locale)}
              className={cn(
                "block px-4 py-2 text-sm hover:bg-muted-bg",
                locale === current && "text-accent font-medium",
              )}
              onMouseDown={(e) => e.preventDefault()}
            >
              {localeLabels[locale]}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
