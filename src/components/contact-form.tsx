"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

type Labels = {
  name: string;
  email: string;
  message: string;
  send: string;
  sending: string;
  success: string;
  error: string;
};

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ labels }: { labels: Labels }) {
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    setStatus("sending");
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}\nReply-to: ${email}`,
    );
    try {
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={labels.name} name="name" type="text" autoComplete="name" />
        <Field
          label={labels.email}
          name="email"
          type="email"
          autoComplete="email"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-foreground/80"
        >
          {labels.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1.5 block w-full resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/10"
        />
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={status === "sending"}>
          <Send className="h-4 w-4" />
          {status === "sending" ? labels.sending : labels.send}
        </Button>
        {status === "sent" ? (
          <span className="text-sm text-emerald-600 dark:text-emerald-400">
            {labels.success}
          </span>
        ) : null}
        {status === "error" ? (
          <span className="text-sm text-red-600 dark:text-red-400">
            {labels.error}
          </span>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  autoComplete,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-foreground/80"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        className="mt-1.5 block w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/10"
      />
    </div>
  );
}
