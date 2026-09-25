"use client";

import Field from "./Field";
import { StepProps } from "@/lib/tradeAccount";

/** Step 4 — up to three trade references. Suppliers you already have credit with work best. */
export default function StepReferences({ app, errors, update }: StepProps) {
  return (
    <div className="ts-form-group">
      <div className="legend"><span className="num">Step 4</span><span className="name">Trade references</span></div>
      <p className="hint">Up to three suppliers who give you credit now. Independent businesses only — not related companies.</p>
      {app.references.map((r, i) => (
        <fieldset key={i} className="qb-ta-card">
          <legend>Reference {i + 1}</legend>
          <div className="ts-form-inputs">
            <Field full label="Business name" name={`r${i}-name`} value={r.name} onChange={(e) => { const v = e.target.value; update((d) => { d.references[i].name = v; }); }} error={errors[`references.${i}.name`]} />
            <Field label="Phone" name={`r${i}-phone`} type="tel" value={r.phone} onChange={(e) => { const v = e.target.value; update((d) => { d.references[i].phone = v; }); }} error={errors[`references.${i}.phone`]} />
            <Field label="Email" name={`r${i}-email`} type="email" value={r.email} onChange={(e) => { const v = e.target.value; update((d) => { d.references[i].email = v; }); }} error={errors[`references.${i}.email`]} />
            <Field full label="Address" name={`r${i}-addr`} value={r.address} onChange={(e) => { const v = e.target.value; update((d) => { d.references[i].address = v; }); }} />
          </div>
        </fieldset>
      ))}
    </div>
  );
}
