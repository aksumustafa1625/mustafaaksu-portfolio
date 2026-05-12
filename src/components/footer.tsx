import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Footer({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const secondary = [
    { href: `/${lang}/uses`, label: dict.uses.title },
    { href: `/${lang}/now`, label: dict.now.title },
  ];

  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1">
            <p className="text-sm text-foreground">
              © {new Date().getFullYear()} Mustafa Aksu. {dict.footer.rights}
            </p>
            <p className="text-xs text-muted">{dict.footer.tagline}</p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <nav aria-label={dict.footer.more}>
              <ul className="flex items-center gap-4 text-sm">
                {secondary.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-foreground/70 hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={`/${lang}/contact`}
                    className="text-foreground/70 hover:text-foreground"
                  >
                    {dict.nav.contact}
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex items-center gap-3">
              <a
                href={site.social.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-foreground/70 hover:text-foreground"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-foreground/70 hover:text-foreground"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={site.social.trailhead}
                target="_blank"
                rel="noreferrer"
                aria-label="Trailhead"
                className="text-foreground/70 hover:text-foreground"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.22-1.78L9 12v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V4h2c1.1 0 2-.9 2-2v-.41C18.84 3.21 22 7.24 22 12c0 2.98-1.23 5.67-3.1 7.39z" />
                </svg>
              </a>
              <a
                href={`mailto:${site.email}`}
                aria-label="Email"
                className="text-foreground/70 hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
