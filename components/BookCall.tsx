"use client";

/* Book a call with James, straight into his Outlook calendar (James, 23 Nov 2026: "call booker is already working
 * perfect? should we add it to all sites?").
 *
 * The homes site's booking form (New Homes Website components/BookCall.tsx), for the Quick Built Systems site: builders
 * and trade asking about the building system, panels, Alyspan and steel floors, where a half-hour call is worth it. Not
 * after a plain patio kit quote (the kit quote goes by itself; a large or custom patio still gets it). On the contact
 * page and its thank-you screen. The slots are James's real free/busy through /api/book.
 *
 * Four short questions, the homes form's limit: every extra field costs bookings. Hidden entirely until the site has
 * NURTURE_SITE_KEY and QUOTE_SERVICE_URL (a customer never sees our configuration error). Only a week ahead: no-shows
 * climb with lead time.
 */
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import "./BookCall.css";

type Slot = { start: string; label: string; day: string; dayLabel: string };

const PROJECT = ["Building system (SIPs) project", "Insulated roof or wall panels", "Alyspan", "Steel floor", "Large or custom patio", "Not sure yet"];
const TIMEFRAME = ["In the next month", "1 to 3 months", "3 to 6 months", "Just pricing for now"];
const PHOTO = "/photos/Building system.jpg";

export default function BookCall({ compact = false }: { compact?: boolean }) {
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [loadError, setLoadError] = useState("");
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [f, setF] = useState({ name: "", email: "", mobile: "", project: "", size: "", timeframe: "", notes: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [booked, setBooked] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);

  const load = async () => {
    setLoadError("");
    try {
      const res = await fetch("/api/book", { cache: "no-store" });
      const data = await res.json();
      if (data.notConfigured) { setHidden(true); return; }
      if (!res.ok || !data.ok) throw new Error(data.error || "Booking is unavailable right now.");
      setSlots(data.slots || []);
      const first = (data.slots || [])[0];
      if (first) setDay(first.day);
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "Booking is unavailable right now.");
      setSlots([]);
    }
  };

  useEffect(() => { load(); }, []);

  const days = useMemo(() => {
    const seen = new Map<string, string>();
    (slots || []).forEach((s) => { if (!seen.has(s.day)) seen.set(s.day, s.dayLabel); });
    return Array.from(seen.entries()).map(([d, label]) => ({ day: d, label }));
  }, [slots]);
  const times = (slots || []).filter((s) => s.day === day);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slot) { setError("Pick a time first."); return; }
    if (!f.name.trim() || !f.email.trim() || !f.mobile.trim()) { setError("Please add your name, mobile and email."); return; }
    setSending(true); setError("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          start: slot.start, name: f.name.trim(), email: f.email.trim(), mobile: f.mobile.trim(),
          answers: { project: f.project, size: f.size.trim(), timeframe: f.timeframe, notes: f.notes.trim() },
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 409) { setSlot(null); setError(data.error || "That time was just taken. Please pick another."); await load(); return; }
      if (!res.ok || !data.ok) throw new Error(data.error || "That didn't go through.");
      setBooked(data.when || `${slot.dayLabel}, ${slot.label}`);
      const w = window as unknown as { dataLayer?: unknown[]; fbq?: (...a: unknown[]) => void };
      w.dataLayer = w.dataLayer || [];
      /* Not trackLead(): most bookers already enquired, and a second Lead conversion would double count them. */
      w.dataLayer.push({ event: "call_booked" });
      if (typeof w.fbq === "function") w.fbq("track", "Schedule");
    } catch (err) {
      setError(err instanceof Error ? err.message : "That didn't go through. Please call James on 0466 062 906.");
    } finally { setSending(false); }
  };

  if (hidden) return null;

  if (booked) {
    return (
      <div className="bc bc--done" id="book">
        <h2>You&apos;re booked in.</h2>
        <p>Your call with James is on <strong>{booked}</strong>. A calendar invite is on its way to your email, and James will call you on {f.mobile}.</p>
        <p><strong>Before the call:</strong> have your site address, rough sizes and any plans handy. It helps James make the most of your half hour.</p>
      </div>
    );
  }

  return (
    <div className={`bc bc--split${compact ? " bc--compact" : ""}`} id="book">
      <div className="bc__photo">
        <Image src={PHOTO} alt="A Quick Built building system going together" width={2048} height={1365} sizes="(max-width: 900px) 100vw, 420px" />
      </div>
      <div className="bc__main">
        <span className="ts-eyebrow">Talk it through</span>
        <h2>Book a call with James</h2>
        <p className="bc__lead">
          A half hour about your project, the panels or system that suit it, and what it will take. James takes these
          calls himself.
        </p>

        {slots === null && <p className="bc__muted">Checking James&apos;s calendar…</p>}
        {loadError && <p className="bc__error">{loadError} You can also call James on <a href="tel:0466062906">0466 062 906</a>.</p>}
        {slots && !loadError && !slots.length && (
          <p className="bc__muted">James&apos;s week is full. Call him on <a href="tel:0466062906">0466 062 906</a> and he&apos;ll find a time.</p>
        )}

        {slots && slots.length > 0 && (
          <form onSubmit={submit}>
            <div className="bc__step">
              <div className="bc__label">1. Pick a day</div>
              <div className="bc__days">
                {days.map((d) => (
                  <button type="button" key={d.day} className={`bc__chip${d.day === day ? " is-on" : ""}`}
                          onClick={() => { setDay(d.day); setSlot(null); }}>{shortDay(d.label)}</button>
                ))}
              </div>
            </div>

            <div className="bc__step">
              <div className="bc__label">2. Pick a time <span className="bc__muted">(Sydney time)</span></div>
              <div className="bc__times">
                {times.map((s) => (
                  <button type="button" key={s.start} className={`bc__chip${slot?.start === s.start ? " is-on" : ""}`}
                          onClick={() => setSlot(s)}>{s.label}</button>
                ))}
              </div>
            </div>

            {slot && (
              <div className="bc__step">
                <div className="bc__label">3. A little about you and the project</div>
                <div className="bc__grid">
                  <label>Name<input value={f.name} required autoComplete="name" onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
                  <label>Mobile<input type="tel" value={f.mobile} required autoComplete="tel" onChange={(e) => setF({ ...f, mobile: e.target.value })} /></label>
                  <label className="bc__full">Email<input type="email" value={f.email} required autoComplete="email" onChange={(e) => setF({ ...f, email: e.target.value })} /></label>
                  <Select label="What is it for?" value={f.project} options={PROJECT} onChange={(v) => setF({ ...f, project: v })} />
                  <label>Rough size (optional)<input value={f.size} placeholder="e.g. 12 x 6 m, or 200 m2 of roof" onChange={(e) => setF({ ...f, size: e.target.value })} /></label>
                  <Select label="When do you need it?" value={f.timeframe} options={TIMEFRAME} onChange={(v) => setF({ ...f, timeframe: v })} />
                  <label className="bc__full">Anything James should know? (optional)<textarea rows={2} value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} /></label>
                </div>
                {error && <p className="bc__error">{error}</p>}
                <button type="submit" className="ts-btn ts-btn--primary" disabled={sending}>
                  {sending ? "Booking…" : `Book ${slot.dayLabel.split(" ")[0]} at ${slot.label}`}
                </button>
              </div>
            )}
            {!slot && error && <p className="bc__error">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}

/* "Monday 28 September" → "Mon 28 Sep": seven of these have to sit side by side on a phone. */
function shortDay(label: string) {
  const [wd, d, m] = label.split(" ");
  return m ? `${wd.slice(0, 3)} ${d} ${m.slice(0, 3)}` : label;
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label>
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Choose one</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
