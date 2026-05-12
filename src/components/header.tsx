"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";

export function Header({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  const nav = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/revenue-cloud`, label: dict.nav.revenueCloud },
    { href: `/${lang}/projects`, label: dict.nav.projects },
    { href: `/${lang}/certifications`, label: dict.nav.certifications },
    { href: `/${lang}/skills`, label: dict.nav.skills },
    { href: `/${lang}/blog`, label: dict.nav.blog },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  const isActive = (href: string) =>
    href === `/${lang}` ? pathname === href : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href={`/${lang}`}
          className="font-semibold tracking-tight text-foreground"
        >
          Mustafa<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm transition-colors",
                isActive(item.href)
                  ? "text-foreground"
                  : "text-foreground/60 hover:text-foreground hover:bg-muted-bg",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher current={lang} label={dict.common.switchLanguage} />
          <ThemeToggle label={dict.common.switchTheme} />
          <button
            type="button"
            aria-label={open ? dict.common.closeMenu : dict.common.openMenu}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border md:hidden",
              "text-foreground/70 hover:text-foreground",
            )}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-border md:hidden">
          <ul className="mx-auto max-w-5xl px-4 py-2 sm:px-6">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm",
                    isActive(item.href)
                      ? "bg-muted-bg text-foreground"
                      : "text-foreground/70 hover:bg-muted-bg",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
