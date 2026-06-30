"use client";

import { useEffect, useRef, useState } from "react";

// FREE address autocomplete via Photon (OpenStreetMap) — no API key, no billing.
// As you type it suggests Australian addresses; on select it returns the structured parts
// (formatted address, suburb, state, postcode) so we capture a postcode for freight.
// Same props/interface as before, so every form using it is unchanged.

type Selected = { formatted: string; postcode: string; locality: string; state: string; name: string };

const AU_STATE: Record<string, string> = {
  "new south wales": "NSW", victoria: "VIC", queensland: "QLD", "south australia": "SA",
  "western australia": "WA", tasmania: "TAS", "northern territory": "NT",
  "australian capital territory": "ACT",
};
const stateAbbrev = (s?: string) => (s ? AU_STATE[s.toLowerCase()] || s : "");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function label(p: any): string {
  const parts: string[] = [];
  const line1 = [p.housenumber, p.street].filter(Boolean).join(" ");
  if (p.name && p.name !== p.street) parts.push(p.name);
  if (line1) parts.push(line1);
  const line2 = [p.city || p.district || p.county, stateAbbrev(p.state), p.postcode].filter(Boolean).join(" ");
  if (line2) parts.push(line2);
  return parts.join(", ") || p.name || "";
}

export default function PlacesAutocomplete({
  value, onChange, onSelect, placeholder, types,
}: {
  value: string;
  onChange: (v: string) => void;
  onSelect: (s: Selected) => void;
  placeholder?: string;
  types?: string[]; // accepted for compatibility; not needed for Photon
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [items, setItems] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const search = (q: string) => {
    if (timer.current) clearTimeout(timer.current);
    if (q.trim().length < 3) { setItems([]); return; }
    timer.current = setTimeout(async () => {
      try {
        // Bias to Australia with a bounding box; filter to AU results.
        const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&lang=en&limit=6&bbox=112.9,-43.7,153.7,-10.6`;
        const r = await fetch(url);
        const d = await r.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const feats = (d.features || []).filter((f: any) => (f.properties?.countrycode || "AU") === "AU");
        setItems(feats);
        setOpen(feats.length > 0);
      } catch { setItems([]); }
    }, 250);
  };

  return (
    <div ref={wrap} style={{ position: "relative" }}>
      <input
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(e) => { onChange(e.target.value); search(e.target.value); }}
        onFocus={() => { if (items.length) setOpen(true); }}
      />
      {open && (
        <ul style={{ position: "absolute", zIndex: 50, top: "100%", left: 0, right: 0, margin: "4px 0 0", padding: 0, listStyle: "none",
          background: "#fff", border: "1px solid #d8d8d8", borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", maxHeight: 280, overflowY: "auto" }}>
          {items.map((f, i) => {
            const p = f.properties || {};
            const text = label(p);
            return (
              <li key={i}>
                <button type="button"
                  onClick={() => {
                    onChange(text);
                    onSelect({ formatted: text, postcode: p.postcode || "", locality: p.city || p.district || p.county || "", state: stateAbbrev(p.state), name: p.name || "" });
                    setOpen(false);
                  }}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 12px", background: "none", border: "none", borderBottom: "1px solid #f0f0f0", cursor: "pointer", fontSize: 14, color: "#222" }}>
                  {text}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
