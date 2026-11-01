"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send, Copy, Check } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact({ email }: { email?: string }) {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // fallback
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !from.trim() || !message.trim()) return;
    setStatus("sending");
    setError("");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: from, message, company }),
      });
      if (r.ok) {
        setStatus("sent");
        setName("");
        setFrom("");
        setMessage("");
      } else {
        const j = await r.json().catch(() => ({}));
        setError(j.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setError("Network error. Please try again or email directly.");
      setStatus("error");
    }
  };

  const inputCls =
    "w-full rounded-xl border border-line bg-black/[0.02] dark:bg-white/[0.04] px-4 py-2.5 text-sm text-fg placeholder:text-muted/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all";

  return (
    <section id="contact" className="container-wide mt-20 sm:mt-28 scroll-mt-20" aria-labelledby="contact-heading">
      <div className="flex flex-col gap-2">
        <h2 id="contact-heading" className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-fg">
          Get in Touch
        </h2>
        <p className="text-muted text-[15px] sm:text-base max-w-2xl leading-relaxed">
          Interested in networking research, internship opportunities, or collaborating? Drop a note below.
          {email && (
            <>
              {" "}Or reach out directly at{" "}
              <span className="inline-flex items-center gap-1.5 font-medium text-fg">
                <a href={`mailto:${email}`} className="text-accent underline hover:opacity-85 transition-opacity">
                  {email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="rounded p-1 text-muted hover:text-fg transition-colors inline-flex"
                  aria-label="Copy email address"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="size-3.5 text-accent" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </span>.
            </>
          )}
        </p>
      </div>

      <div className="card mt-7 max-w-2xl rounded-2xl sm:rounded-3xl border border-line bg-surface p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
        {status === "sent" ? (
          <div className="flex items-center gap-3 py-4 text-accent">
            <CheckCircle2 className="size-5 shrink-0" />
            <p className="text-sm font-medium">
              Thank you — your message has been sent. I will respond as soon as possible.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            {/* Honeypot for spam bots */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="hidden"
              aria-hidden="true"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  Name
                </label>
                <input
                  id="contact-name"
                  className={inputCls}
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  id="contact-email"
                  className={inputCls}
                  type="email"
                  placeholder="name@example.com"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  maxLength={200}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="contact-message" className="block text-xs font-semibold text-muted uppercase tracking-wider">
                  Message
                </label>
                {message.length > 0 && (
                  <span className="text-[11px] text-muted tabular-nums">
                    {message.length} / 5000
                  </span>
                )}
              </div>
              <textarea
                id="contact-message"
                className={`${inputCls} resize-y`}
                rows={4}
                placeholder="How can I help you?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={5000}
                aria-invalid={status === "error"}
                aria-describedby={status === "error" ? "contact-error" : undefined}
                required
              />
            </div>

            {status === "error" && (
              <p id="contact-error" role="alert" className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                {error}
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn btn-primary px-6 py-2.5"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Sending…</span>
                  </>
                ) : (
                  <>
                    <Send className="size-3.5" />
                    <span>Send message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
