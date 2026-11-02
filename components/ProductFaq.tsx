"use client";

import { useState } from "react";

/** FAQ accordion for a product page. Answers stay in the HTML (only their height animates), so
    search engines and AI assistants read every answer. FAQPage markup is added by the page's layout. */
export default function ProductFaq({ eyebrow, h2, lead, faqs }: { eyebrow: string; h2: string; lead: string; faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="ts-section ts-divider-top">
      <div className="ts-container">
        <div className="ts-section-head">
          <div>
            <div className="ts-eyebrow">{eyebrow}</div>
            <h2>{h2}</h2>
          </div>
          <p>{lead}</p>
        </div>
        <div className="ts-aly-faq">
          {faqs.map((f, i) => (
            <div key={i} className={`ts-aly-faq-item${open === i ? " is-open" : ""}`}>
              <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                <span>{f.q}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" width="20" height="20">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className="answer"><p>{f.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
