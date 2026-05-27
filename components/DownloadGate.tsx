"use client";

import { useEffect, useState } from "react";

type Resource = {
  title: string;
  href: string;
  fileType: string;
  fileSize: string;
};

type Props = {
  resource: Resource | null;
  webhookUrl: string;
  onClose: () => void;
};

const STORAGE_KEY = "ts-resource-access";
const TTL_DAYS = 30;

type StoredAccess = {
  name: string;
  email: string;
  phone: string;
  savedAt: number;
};

export function hasStoredAccess(): StoredAccess | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredAccess;
    const ageMs = Date.now() - parsed.savedAt;
    if (ageMs > TTL_DAYS * 24 * 60 * 60 * 1000) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export default function DownloadGate({ resource, webhookUrl, onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!resource) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [resource, onClose]);

  if (!resource) return null;

  const triggerDownload = (href: string) => {
    const a = document.createElement("a");
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.download = href.split("/").pop() || "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in your name, email and phone number.");
      return;
    }
    setSending(true);
    setError("");

    const payload = {
      formType: "resource-download",
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      resourceTitle: resource.title,
      resourceFile: resource.href,
      submittedAt: new Date().toISOString(),
    };

    try {
      if (webhookUrl && !webhookUrl.includes("PLACEHOLDER")) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ name: payload.name, email: payload.email, phone: payload.phone, savedAt: Date.now() } as StoredAccess)
      );
      triggerDownload(resource.href);
      onClose();
    } catch {
      setError("Something went wrong. Please try again or call us on 1300 132 787.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="ts-gate-scrim" onClick={onClose} role="dialog" aria-modal="true">
      <div className="ts-gate-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="ts-gate-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="ts-gate-eyebrow">Resource access</div>
        <h2 className="ts-gate-title">Almost there.</h2>
        <p className="ts-gate-lead">
          Enter your details to download <strong>{resource.title}</strong>. We&apos;ll never share your information — just keep you updated on new specifications and project resources.
        </p>

        <div className="ts-gate-file">
          <div className="ts-gate-file-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <path d="M14 2v6h6" />
            </svg>
          </div>
          <div className="ts-gate-file-meta">
            <div className="title">{resource.title}</div>
            <div className="sub">{resource.fileType} · {resource.fileSize}</div>
          </div>
        </div>

        <form className="ts-gate-form" onSubmit={handleSubmit}>
          <label className="ts-gate-field">
            <span>Full name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              placeholder="e.g. James Anderson"
            />
          </label>

          <div className="ts-gate-row">
            <label className="ts-gate-field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>
            <label className="ts-gate-field">
              <span>Phone</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                autoComplete="tel"
                placeholder="04XX XXX XXX"
              />
            </label>
          </div>

          {error && <div className="ts-gate-error">{error}</div>}

          <button type="submit" className="ts-btn ts-btn--primary ts-gate-submit" disabled={sending}>
            {sending ? "Sending…" : "Download now"}
            {!sending && (
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            )}
          </button>

          <p className="ts-gate-fineprint">
            By downloading you agree to be contacted by QuickBuilt Systems about your project.
          </p>
        </form>
      </div>
    </div>
  );
}
