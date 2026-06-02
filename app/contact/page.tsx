"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/content/contact.json";

gsap.registerPlugin(ScrollTrigger);

// ── Types ──────────────────────────────────────────────────────────────────

interface FormState {
  interests: string[];
  message: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  wantsPatio: boolean;
  patioStyle: string;
  patioWidth: string;
  patioLength: string;
  patioAddress: string;
  roofType: string;
  panelProfile: string;
  panelColour: string;
  beamSize: string;
  beamColour: string;
  postSize: string;
  postColour: string;
  accessories: string[];
  accessoryQty: Record<string, number>;
  financeInterest: boolean;
}

// ── Choice component ────────────────────────────────────────────────────────

function Choice({
  type,
  name,
  value,
  checked,
  onChange,
  children,
}: {
  type: "checkbox" | "radio";
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string, checked: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`ts-choice${checked ? " is-checked" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        onChange(value, !checked);
      }}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={() => {}}
        tabIndex={-1}
      />
      <span className={`box${type === "radio" ? " radio" : ""}`}>
        <svg viewBox="0 0 12 12">
          <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="copy">{children}</span>
    </label>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────

const PATIO_STYLES = [
  { name: "Flat Attached",       image: "/photos/patio-styles/flat-attached.png" },
  { name: "Flat Flyover",        image: "/photos/patio-styles/flat-flyover.png" },
  { name: "Flat Freestanding",   image: "/photos/patio-styles/flat-freestanding.png" },
  { name: "Gable Attached",      image: "/photos/patio-styles/gable-attached.png" },
  { name: "Gable Flyover",       image: "/photos/patio-styles/gable-flyover.png" },
  { name: "Gable Freestanding",  image: "/photos/patio-styles/gable-freestanding.png" },
  { name: "Dutch Gable Attached", image: "/photos/patio-styles/dutch-gable-attached.png" },
  { name: "Dutch Gable Flyover", image: "/photos/patio-styles/dutch-gable-flyover.png" },
];
const PANEL_PROFILES = [
  { name: "Monospan",      image: "/photos/profile-monospan.png" },
  { name: "Corrugated",    image: "/photos/profile-corrugated.png" },
  { name: "Corro / Corro", image: "/photos/profile-corro-corro.png" },
];

const SLIMLINE_PROFILES = [
  { name: "Slimline W 300", image: "/photos/profile-slimline-w300.jpg" },
  { name: "Slimline Flat",  image: "/photos/profile-slimline-flat.jpg" },
];

const STANDARD_COLOURS = ["Pearl White", "Monument"];
const COLORBOND_EXTRA_COLOURS = [
  "Classic Cream", "Surfmist", "Paperbark", "Dune", "Shale Grey",
  "Windspray", "Wallaby", "Woodland Grey", "Ironstone", "Basalt",
  "Pale Eucalypt", "Jasper", "Cove", "Mangrove", "Night Sky",
];
const SLIMLINE_COLOURS = ["Pearl White", "Monument", "Paperbark"];
const BEAM_SIZES = ['100 × 50mm', '150 × 100mm'];
const POST_SIZES = ['67mm', '90mm'];
const ACCESSORIES_WITH_QTY = ['Skylights', 'Downlights', 'Fan brackets'];

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<FormState>({
    interests: [],
    message: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    location: "",
    wantsPatio: false,
    patioStyle: "",
    patioWidth: "",
    patioLength: "",
    patioAddress: "",
    roofType: "",
    panelProfile: "",
    panelColour: "",
    beamSize: "",
    beamColour: "",
    postSize: "",
    postColour: "",
    accessories: [],
    accessoryQty: {},
    financeInterest: false,
  });

  // Detect patio interest
  useEffect(() => {
    const wantsPatio = form.interests.some((i) =>
      i.toLowerCase().includes("patio") || i.toLowerCase().includes("awning")
    );
    setForm((f) => ({ ...f, wantsPatio }));
  }, [form.interests]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-animate", {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.1,
      });
      gsap.from(".form-animate", {
        scrollTrigger: { trigger: ".ts-quote-grid", start: "top 80%", once: true },
        y: 30, opacity: 0, duration: 0.8, ease: "power2.out",
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const toggleInterest = useCallback((val: string, checked: boolean) => {
    setForm((f) => ({
      ...f,
      interests: checked
        ? [...f.interests, val]
        : f.interests.filter((i) => i !== val),
    }));
  }, []);

  const toggleAccessory = useCallback((val: string, checked: boolean) => {
    setForm((f) => ({
      ...f,
      accessories: checked
        ? [...f.accessories, val]
        : f.accessories.filter((a) => a !== val),
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setError("Please fill in your name, email and phone number.");
      return;
    }

    const isPatioSubmission = form.wantsPatio || Boolean(form.patioStyle);
    if (isPatioSubmission) {
      const requiredPatio: Array<{ key: keyof FormState; label: string }> = [
        { key: "patioStyle",   label: "Patio style" },
        { key: "patioWidth",   label: "Width" },
        { key: "patioLength",  label: "Length" },
        { key: "patioAddress", label: "Site address" },
        { key: "panelProfile", label: "Roof panel profile" },
        { key: "roofType",     label: "Roof panel type" },
        { key: "panelColour",  label: "Roof panel colour" },
        { key: "beamSize",     label: "Beam size" },
        { key: "beamColour",   label: "Beam colour" },
        { key: "postSize",     label: "Post size" },
        { key: "postColour",   label: "Post colour" },
      ];
      const missing = requiredPatio.filter((f) => {
        const value = form[f.key];
        return typeof value === "string" ? !value.trim() : !value;
      });
      if (missing.length > 0) {
        setError(
          `Please complete the patio configurator — missing: ${missing.map((m) => m.label).join(", ")}.`
        );
        return;
      }
    }

    setSending(true);
    setError("");

    try {
      const targetWebhook = isPatioSubmission && data.patioWebhookUrl
        ? data.patioWebhookUrl
        : data.webhookUrl;
      const formType = isPatioSubmission ? "patio-quote" : "contact-enquiry";

      const basePayload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        location: form.location,
        message: form.message,
        interests: form.interests,
      };

      const patioPayload = isPatioSubmission ? {
        patioStyle: form.patioStyle,
        patioWidth: form.patioWidth,
        patioLength: form.patioLength,
        patioAddress: form.patioAddress,
        roofType: form.roofType,
        panelProfile: form.panelProfile,
        panelColour: form.panelColour,
        beamSize: form.beamSize,
        beamColour: form.beamColour,
        postSize: form.postSize,
        postColour: form.postColour,
        accessories: form.accessories,
        accessoryQty: form.accessoryQty,
        financeInterest: form.financeInterest,
      } : {};

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          webhookUrl: targetWebhook,
          formType,
          ...basePayload,
          ...patioPayload,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call us on 1300 132 787.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: 520, padding: "0 40px" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--ts-cream-2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--ts-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 400, letterSpacing: "-1px", margin: "0 0 16px" }}>
            We&apos;ll be in touch within 24 hours.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--color-graphite)", margin: "0 0 32px" }}>
            Thanks for your enquiry. One of our team will review your details and get back to you with panel specs, timeline and a no-obligation quote.
          </p>
          <Link href="/" className="ts-btn ts-btn--dark">Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef}>
      {/* Hero — slim strip */}
      <section className="ts-page-strip">
        <div className="ts-container">
          <div className="ts-breadcrumbs hero-animate">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span>Contact</span>
          </div>
          <h1 className="hero-animate">Contact Us</h1>
        </div>
      </section>

      {/* Channel strip */}
      <div className="ts-channel-strip">
        <div className="ts-container">
          <div className="ts-channel-grid">
            {data.channels.map((ch, i) => (
              <div key={i} className="ts-channel-item">
                <div className="l">{ch.label}</div>
                {ch.href ? (
                  <a href={ch.href} className="v">{ch.value}</a>
                ) : (
                  <div className="v" style={{ textDecoration: "none" }}>{ch.value}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main form */}
      <section className="ts-section">
        <div className="ts-container">
          <div className="ts-quote-grid form-animate">
            {/* Aside */}
            <aside className="ts-quote-aside">
              <div className="ts-eyebrow">Get in touch</div>
              <h2>{data.asideH2}</h2>
              <p>{data.asidePara1}</p>
              <p>{data.asidePara2}</p>
              <div className="ts-quote-meta">
                <div className="item">
                  <div className="l">Phone</div>
                  <div className="v"><a href="tel:1300132787">1300 132 787</a></div>
                </div>
                <div className="item">
                  <div className="l">Email</div>
                  <div className="v">
                    <a href="mailto:sales@quickbuiltsystems.com.au">
                      sales@quickbuiltsystems.com.au
                    </a>
                  </div>
                </div>
                <div className="item">
                  <div className="l">Hours</div>
                  <div className="v" style={{ fontSize: 16 }}>Mon–Fri 7:30am–4:30pm AEST</div>
                </div>
                <div className="item">
                  <div className="l">Location</div>
                  <div className="v" style={{ fontSize: 16 }}>Sydney, NSW</div>
                </div>
              </div>
            </aside>

            {/* Form */}
            <form className="ts-form" onSubmit={handleSubmit}>

              {/* 01 — Interests */}
              <div className="ts-form-group">
                <div className="legend">
                  <span className="num">01</span>
                  <span className="name">What are you interested in?</span>
                </div>
                <p className="hint">Select all that apply.</p>
                <div className="ts-choice-grid">
                  {[
                    "Insulspan® Roofing",
                    "Panelspan® Walls",
                    "Panelcore® Coldroom",
                    "Patio / awning kit",
                    "Complete building system",
                    "Technical advice",
                  ].map((opt) => (
                    <Choice
                      key={opt}
                      type="checkbox"
                      name="interests"
                      value={opt}
                      checked={form.interests.includes(opt)}
                      onChange={toggleInterest}
                    >
                      {opt}
                    </Choice>
                  ))}
                </div>
              </div>

              {/* 02 — Message */}
              <div className="ts-form-group">
                <div className="legend">
                  <span className="num">02</span>
                  <span className="name">Tell us about your project</span>
                </div>
                <p className="hint">Any details help — size, timeline, location, budget range.</p>
                <div className="ts-form-inputs">
                  <div className="ts-form-input full">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      placeholder="Describe your project…"
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {/* Patio configurator (conditional) */}
              {form.wantsPatio && (
                <div className="ts-roofing-extra">
                  <div className="head">
                    <span className="badge">Patio kit</span>
                    <span className="label">Configure your patio</span>
                  </div>

                  {/* Style */}
                  <div className="ts-form-group">
                    <div className="legend">
                      <span className="name" style={{ fontSize: 16 }}>Patio style</span>
                    </div>
                    <div className="ts-patio-grid">
                      {PATIO_STYLES.map((style) => (
                        <label
                          key={style.name}
                          className={`ts-patio-card${form.patioStyle === style.name ? " is-checked" : ""}`}
                          onClick={() => setForm((f) => ({ ...f, patioStyle: style.name }))}
                        >
                          <input type="radio" name="patioStyle" value={style.name} checked={form.patioStyle === style.name} onChange={() => {}} />
                          <div className="ts-patio-card-thumb">
                            <Image src={style.image} alt={style.name} fill style={{ objectFit: "contain" }} sizes="160px" />
                          </div>
                          <div className="ts-patio-card-label">{style.name}</div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Dimensions & site */}
                  <div className="ts-form-group">
                    <div className="legend">
                      <span className="name" style={{ fontSize: 16 }}>Dimensions &amp; site</span>
                    </div>
                    <div className="ts-form-inputs">
                      <div className="ts-form-input">
                        <label htmlFor="patioWidth">Width (m)</label>
                        <input
                          id="patioWidth"
                          type="number"
                          min="0"
                          step="0.1"
                          placeholder="e.g. 4.5"
                          value={form.patioWidth}
                          onChange={(e) => setForm((f) => ({ ...f, patioWidth: e.target.value }))}
                        />
                      </div>
                      <div className="ts-form-input">
                        <label htmlFor="patioLength">Length (m)</label>
                        <input
                          id="patioLength"
                          type="number"
                          min="0"
                          step="0.1"
                          placeholder="e.g. 6.0"
                          value={form.patioLength}
                          onChange={(e) => setForm((f) => ({ ...f, patioLength: e.target.value }))}
                        />
                      </div>
                      <div className="ts-form-input full">
                        <label htmlFor="patioAddress">Site address</label>
                        <input
                          id="patioAddress"
                          type="text"
                          placeholder="e.g. 12 Smith St, Penrith NSW 2750"
                          value={form.patioAddress}
                          onChange={(e) => setForm((f) => ({ ...f, patioAddress: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Roof panel type + profile combined */}
                  <div className="ts-form-group">
                    <div className="legend">
                      <span className="name" style={{ fontSize: 16 }}>Roof panel type &amp; profile</span>
                    </div>
                    <div className="ts-profile-group-label">Insulspan® — Insulated</div>
                    <div className="ts-patio-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                      {PANEL_PROFILES.map((p) => (
                        <label
                          key={p.name}
                          className={`ts-patio-card${form.panelProfile === p.name ? " is-checked" : ""}`}
                          onClick={() => setForm((f) => ({ ...f, panelProfile: p.name, roofType: "Insulspan® (insulated)", panelColour: f.roofType === "Insulspan® (insulated)" ? f.panelColour : "" }))}
                        >
                          <input type="radio" name="panelProfile" value={p.name} checked={form.panelProfile === p.name} onChange={() => {}} />
                          <div className="ts-patio-card-thumb">
                            <Image src={p.image} alt={p.name} fill style={{ objectFit: "contain" }} sizes="200px" />
                          </div>
                          <div className="ts-patio-card-label">{p.name}</div>
                        </label>
                      ))}
                    </div>
                    <div className="ts-profile-group-label" style={{ marginTop: 16 }}>Slimline — Non-insulated</div>
                    <div className="ts-patio-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                      {SLIMLINE_PROFILES.map((p) => (
                        <label
                          key={p.name}
                          className={`ts-patio-card${form.panelProfile === p.name ? " is-checked" : ""}`}
                          onClick={() => setForm((f) => ({ ...f, panelProfile: p.name, roofType: "Slimline (non-insulated)", panelColour: f.roofType === "Slimline (non-insulated)" ? f.panelColour : "" }))}
                        >
                          <input type="radio" name="panelProfile" value={p.name} checked={form.panelProfile === p.name} onChange={() => {}} />
                          <div className="ts-patio-card-thumb">
                            <Image src={p.image} alt={p.name} fill style={{ objectFit: "contain" }} sizes="300px" />
                          </div>
                          <div className="ts-patio-card-label">{p.name}</div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Roof panel colour */}
                  {form.roofType === "Insulspan® (insulated)" && (
                    <div className="ts-form-group">
                      <div className="legend">
                        <span className="name" style={{ fontSize: 16 }}>Roof panel colour <span style={{ fontWeight: 400, color: "var(--color-graphite)", fontSize: 13 }}>(Colorbond®)</span></span>
                      </div>
                      <div className="ts-colour-extra">
                        <select
                          className="ts-colour-select"
                          value={form.panelColour}
                          onChange={(e) => setForm((f) => ({ ...f, panelColour: e.target.value }))}
                        >
                          <option value="">Select a Colorbond® colour</option>
                          {[...STANDARD_COLOURS, ...COLORBOND_EXTRA_COLOURS].map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {form.roofType === "Slimline (non-insulated)" && (
                    <div className="ts-form-group">
                      <div className="legend">
                        <span className="name" style={{ fontSize: 16 }}>Roof panel colour <span style={{ fontWeight: 400, color: "var(--color-graphite)", fontSize: 13 }}>(Colorbond®)</span></span>
                      </div>
                      <div className="ts-choice-grid">
                        {SLIMLINE_COLOURS.map((c) => (
                          <Choice key={c} type="radio" name="panelColour" value={c} checked={form.panelColour === c} onChange={(v) => setForm((f) => ({ ...f, panelColour: v }))}>
                            {c}
                          </Choice>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Beams */}
                  <div className="ts-form-group">
                    <div className="legend">
                      <span className="name" style={{ fontSize: 16 }}>Beam size <span style={{ fontWeight: 400, color: "var(--color-graphite)", fontSize: 13 }}>(other sizes available on request)</span></span>
                    </div>
                    <div className="ts-choice-grid">
                      {BEAM_SIZES.map((s) => (
                        <Choice key={s} type="radio" name="beamSize" value={s} checked={form.beamSize === s} onChange={(v) => setForm((f) => ({ ...f, beamSize: v }))}>
                          {s}
                        </Choice>
                      ))}
                    </div>
                  </div>

                  {/* Beam colour */}
                  <div className="ts-form-group">
                    <div className="legend">
                      <span className="name" style={{ fontSize: 16 }}>Beam colour</span>
                    </div>
                    <div className="ts-choice-grid">
                      {STANDARD_COLOURS.map((c) => (
                        <Choice key={c} type="radio" name="beamColour" value={c} checked={form.beamColour === c} onChange={(v) => setForm((f) => ({ ...f, beamColour: v }))}>
                          {c} <small>Standard</small>
                        </Choice>
                      ))}
                    </div>
                    <div className="ts-colour-extra">
                      <select
                        className="ts-colour-select"
                        value={STANDARD_COLOURS.includes(form.beamColour) ? "" : form.beamColour}
                        onChange={(e) => setForm((f) => ({ ...f, beamColour: e.target.value }))}
                      >
                        <option value="">Other Colorbond® colour (additional charges apply)</option>
                        {COLORBOND_EXTRA_COLOURS.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Posts */}
                  <div className="ts-form-group">
                    <div className="legend">
                      <span className="name" style={{ fontSize: 16 }}>Post size <span style={{ fontWeight: 400, color: "var(--color-graphite)", fontSize: 13 }}>(other sizes available on request)</span></span>
                    </div>
                    <div className="ts-choice-grid two">
                      {POST_SIZES.map((s) => (
                        <Choice key={s} type="radio" name="postSize" value={s} checked={form.postSize === s} onChange={(v) => setForm((f) => ({ ...f, postSize: v }))}>
                          {s}
                        </Choice>
                      ))}
                    </div>
                  </div>

                  {/* Post colour */}
                  <div className="ts-form-group">
                    <div className="legend">
                      <span className="name" style={{ fontSize: 16 }}>Post colour</span>
                    </div>
                    <div className="ts-choice-grid">
                      {STANDARD_COLOURS.map((c) => (
                        <Choice key={c} type="radio" name="postColour" value={c} checked={form.postColour === c} onChange={(v) => setForm((f) => ({ ...f, postColour: v }))}>
                          {c} <small>Standard</small>
                        </Choice>
                      ))}
                    </div>
                    <div className="ts-colour-extra">
                      <select
                        className="ts-colour-select"
                        value={STANDARD_COLOURS.includes(form.postColour) ? "" : form.postColour}
                        onChange={(e) => setForm((f) => ({ ...f, postColour: e.target.value }))}
                      >
                        <option value="">Other Colorbond® colour (additional charges apply)</option>
                        {COLORBOND_EXTRA_COLOURS.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Accessories */}
                  <div className="ts-form-group">
                    <div className="legend">
                      <span className="name" style={{ fontSize: 16 }}>Accessories</span>
                    </div>
                    <div className="ts-choice-grid">
                      {ACCESSORIES_WITH_QTY.map((acc) => (
                        <div key={acc} className="ts-accessory-qty-row">
                          <Choice
                            type="checkbox"
                            name="accessories"
                            value={acc}
                            checked={form.accessories.includes(acc)}
                            onChange={toggleAccessory}
                          >
                            {acc}
                          </Choice>
                          {form.accessories.includes(acc) && (
                            <div className="ts-qty-row">
                              <label className="ts-qty-label">Qty</label>
                              <div className="ts-qty-stepper">
                                <button
                                  type="button"
                                  className="ts-qty-btn"
                                  onClick={() => setForm((f) => ({ ...f, accessoryQty: { ...f.accessoryQty, [acc]: Math.max(1, (f.accessoryQty[acc] ?? 1) - 1) } }))}
                                >−</button>
                                <span className="ts-qty-val">{form.accessoryQty[acc] ?? 1}</span>
                                <button
                                  type="button"
                                  className="ts-qty-btn"
                                  onClick={() => setForm((f) => ({ ...f, accessoryQty: { ...f.accessoryQty, [acc]: (f.accessoryQty[acc] ?? 1) + 1 } }))}
                                >+</button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Finance */}
                  <div className="ts-form-group">
                    <Choice
                      type="checkbox"
                      name="financeInterest"
                      value="finance"
                      checked={form.financeInterest}
                      onChange={(_, c) => setForm((f) => ({ ...f, financeInterest: c }))}
                    >
                      I&apos;m interested in finance options
                      <small>We work with approved finance partners</small>
                    </Choice>
                  </div>
                </div>
              )}

              {/* 03 — Your details */}
              <div className="ts-form-group">
                <div className="legend">
                  <span className="num">03</span>
                  <span className="name">Your details</span>
                </div>
                <div className="ts-form-inputs">
                  <div className="ts-form-input">
                    <label htmlFor="name">Name *</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="James White"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="ts-form-input">
                    <label htmlFor="company">Company (optional)</label>
                    <input
                      id="company"
                      type="text"
                      placeholder="White Building Co."
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                    />
                  </div>
                  <div className="ts-form-input">
                    <label htmlFor="email">Email *</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="james@example.com"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="ts-form-input">
                    <label htmlFor="phone">Phone *</label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="0400 000 000"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="ts-form-input full">
                    <label htmlFor="location">Project location</label>
                    <input
                      id="location"
                      type="text"
                      placeholder="e.g. Penrith NSW 2750"
                      value={form.location}
                      onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {error && (
                <p style={{ color: "#c0392b", fontSize: 14, margin: 0 }}>{error}</p>
              )}

              <div className="ts-form-submit">
                <button
                  type="submit"
                  className="ts-btn ts-btn--primary"
                  disabled={sending}
                  style={{ opacity: sending ? 0.6 : 1 }}
                >
                  {sending ? "Sending…" : "Send enquiry"}
                  {!sending && (
                    <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
                <span className="note">We respond within 24 hours</span>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
