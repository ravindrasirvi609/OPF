"use client";

import { SendHorizonal } from "lucide-react";
import Script from "next/script";
import { FormEvent, useEffect, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        selector: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId?: string) => void;
    };
  }
}

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialFormState: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormState>(initialFormState);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileWidgetId, setTurnstileWidgetId] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const renderTurnstile = () => {
    if (!turnstileSiteKey || !window.turnstile || turnstileWidgetId) {
      return;
    }

    const widgetId = window.turnstile.render("#turnstile-widget", {
      sitekey: turnstileSiteKey,
      callback: (token: string) => {
        setTurnstileToken(token);
      },
      "expired-callback": () => {
        setTurnstileToken("");
      },
      "error-callback": () => {
        setTurnstileToken("");
      },
    });

    setTurnstileWidgetId(widgetId);
  };

  useEffect(() => {
    return () => {
      if (turnstileWidgetId && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId);
      }
    };
  }, [turnstileWidgetId]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    if (!turnstileSiteKey) {
      setStatus({ type: "error", message: "Captcha is not configured. Please contact support directly at help@opf.org.in." });
      return;
    }

    if (!turnstileToken) {
      setStatus({ type: "error", message: "Please complete the captcha challenge." });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? "Unable to submit contact form.");
      }

      setStatus({ type: "success", message: "Thanks for reaching out. Your message has been submitted successfully." });
      setFormData(initialFormState);
      setTurnstileToken("");
      if (window.turnstile) {
        window.turnstile.reset(turnstileWidgetId ?? undefined);
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to submit contact form.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onLoad={renderTurnstile} />

      <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
        <Input
          label="Full Name"
          name="name"
          placeholder="Your full name"
          value={formData.name}
          onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
        />
        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="name@email.com"
          value={formData.email}
          onChange={(value) => setFormData((prev) => ({ ...prev, email: value }))}
        />
        <Input
          label="Phone Number"
          name="phone"
          placeholder="10-digit mobile number"
          value={formData.phone}
          onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
        />
        <Input
          label="Subject"
          name="subject"
          placeholder="Membership query"
          value={formData.subject}
          onChange={(value) => setFormData((prev) => ({ ...prev, subject: value }))}
        />
        <label className="sm:col-span-2">
          <span className="mb-2 block text-sm font-medium text-slate-700">Message</span>
          <textarea
            name="message"
            rows={5}
            required
            value={formData.message}
            onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
            placeholder="Tell us how we can help"
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-900"
          />
        </label>

        <div className="hidden" aria-hidden>
          <label>
            Company
            <input
              name="company"
              tabIndex={-1}
              autoComplete="off"
              onChange={() => {
                setStatus({ type: "error", message: "Spam detected." });
              }}
            />
          </label>
        </div>

        <div className="sm:col-span-2">
          <div id="turnstile-widget" className="min-h-[65px]" />
          {!turnstileSiteKey ? (
            <p className="mt-2 text-sm text-amber-700">
              Captcha is not configured yet. Please set NEXT_PUBLIC_TURNSTILE_SITE_KEY.
            </p>
          ) : null}
        </div>

        {status ? (
          <p className={`sm:col-span-2 text-sm ${status.type === "success" ? "text-green-700" : "text-red-700"}`}>
            {status.message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0a4ea3] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
          <SendHorizonal size={15} />
        </button>
      </form>
    </>
  );
}

function Input({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <input
        name={name}
        type={type}
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-900"
      />
    </label>
  );
}
