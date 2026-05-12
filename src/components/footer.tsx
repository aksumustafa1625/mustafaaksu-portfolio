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
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-foreground">
            © {new Date().getFullYear()} Mustafa Aksu. {dict.footer.rights}
          </p>
          <p className="text-xs text-muted">{dict.footer.tagline}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/${lang}/contact`}
            className="text-sm text-foreground/70 hover:text-foreground"
          >
            {dict.nav.contact}
          </Link>
          <span className="text-muted">·</span>
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
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="text-foreground/70 hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
