"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projectTypes, budgetRanges, submitContactForm, type ContactFormData } from "@/lib/contact";
import { motionTokens } from "@/lib/motion-tokens";

const initialData: ContactFormData = {
  name: "",
  email: "",
  company: "",
  website: "",
  projectType: "",
  budget: "",
  message: "",
};

const fieldClasses =
  "w-full border-0 border-b border-border-strong bg-transparent py-3 text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none";
const labelClasses = "font-mono text-micro uppercase tracking-widest2 text-fg-subtle";

export function ContactForm() {
  const [data, setData] = useState<ContactFormData>(initialData);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function update<K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const result = await submitContactForm(data);
    if (result.ok) {
      setStatus("success");
      setData(initialData);
    } else {
      setStatus("error");
      setError(result.error ?? "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: motionTokens.distance.md }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
        role="status"
        className="border border-accent/40 bg-accent-muted p-8"
      >
        <p className="font-display text-h2 font-medium text-fg">Thanks — message received.</p>
        <p className="mt-3 text-fg-muted">I&rsquo;ll get back to you shortly.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10" noValidate>
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          <input
            id="name"
            required
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            className={`mt-2 ${fieldClasses}`}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            className={`mt-2 ${fieldClasses}`}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="company" className={labelClasses}>
            Company
          </label>
          <input
            id="company"
            value={data.company}
            onChange={(e) => update("company", e.target.value)}
            className={`mt-2 ${fieldClasses}`}
            autoComplete="organization"
          />
        </div>
        <div>
          <label htmlFor="website" className={labelClasses}>
            Website
          </label>
          <input
            id="website"
            value={data.website}
            onChange={(e) => update("website", e.target.value)}
            className={`mt-2 ${fieldClasses}`}
            placeholder="https://"
          />
        </div>
      </div>

      <fieldset>
        <legend className={labelClasses}>Project type</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {projectTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => update("projectType", type)}
              aria-pressed={data.projectType === type}
              className="rounded-full border px-4 py-2 text-sm transition-colors"
              style={{
                borderColor: data.projectType === type ? "var(--color-accent)" : "var(--color-border-strong)",
                color: data.projectType === type ? "var(--color-accent)" : "var(--color-fg-muted)",
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={labelClasses}>Budget</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {budgetRanges.map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => update("budget", range)}
              aria-pressed={data.budget === range}
              className="rounded-full border px-4 py-2 text-sm transition-colors"
              style={{
                borderColor: data.budget === range ? "var(--color-accent)" : "var(--color-border-strong)",
                color: data.budget === range ? "var(--color-accent)" : "var(--color-fg-muted)",
              }}
            >
              {range}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
          className={`mt-2 ${fieldClasses} resize-none`}
        />
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="text-sm text-accent-ink"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-accent px-8 py-4 font-mono text-label uppercase text-accent-fg disabled:opacity-60"
        data-cursor="open"
        data-cursor-label="OPEN"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
