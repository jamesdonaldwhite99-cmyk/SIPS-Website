"use client";

import Field from "./Field";
import { StepProps, emptyGuarantor } from "@/lib/tradeAccount";

/**
 * Step 5 — who will personally guarantee the account. Nobody signs anything here: the Deed of
 * Guarantee is a paper document, sent to these people only if the account is approved, to be signed
 * by hand in front of a witness. Their details are collected now so it arrives already filled in.
 */
export default function StepGuarantors({ app, errors, update }: StepProps) {
  const required = app.business.entityType === "company" || app.business.entityType === "trust";
  const fill = (i: number, name: string) => {
    const p = app.people.find((x) => x.fullName === name);
    if (!p) return;
    update((d) => { d.guarantors[i] = { ...d.guarantors[i], fullName: p.fullName, dob: p.dob, residentialAddress: p.residentialAddress }; });
  };
  return (
    <div className="ts-form-group">
      <div className="legend"><span className="num">Step 5</span><span className="name">Guarantors</span></div>
      <p className="hint">
        {required
          ? "A company or trust account needs at least one personal guarantor — usually a director. "
          : "Optional for sole traders and partnerships. "}
        If the account is approved we&rsquo;ll email each guarantor the Deed of Guarantee to sign by hand in front of a witness. Nothing is signed on this page.
      </p>
      {errors.guarantors && <p className="qb-ta-error" role="alert">{errors.guarantors}</p>}
      {app.guarantors.map((g, i) => (
        <fieldset key={i} className="qb-ta-card">
          <legend>Guarantor {i + 1}</legend>
          {app.people.some((p) => p.fullName) && (
            <div className="qb-ta-quickfill">
              Same person as:{" "}
              {app.people.filter((p) => p.fullName).map((p) => (
                <button key={p.fullName} type="button" onClick={() => fill(i, p.fullName)}>{p.fullName}</button>
              ))}
            </div>
          )}
          <div className="ts-form-inputs">
            <Field full label="Full name" required name={`g${i}-name`} value={g.fullName} onChange={(e) => { const v = e.target.value; update((d) => { d.guarantors[i].fullName = v; }); }} error={errors[`guarantors.${i}.fullName`]} />
            <Field label="Date of birth" required name={`g${i}-dob`} type="date" value={g.dob} onChange={(e) => { const v = e.target.value; update((d) => { d.guarantors[i].dob = v; }); }} error={errors[`guarantors.${i}.dob`]} />
            <Field label="Driver licence no." required name={`g${i}-lic`} autoComplete="off" value={g.licence} onChange={(e) => { const v = e.target.value; update((d) => { d.guarantors[i].licence = v; }); }} error={errors[`guarantors.${i}.licence`]} />
            <Field full label="Residential address" required name={`g${i}-addr`} value={g.residentialAddress} onChange={(e) => { const v = e.target.value; update((d) => { d.guarantors[i].residentialAddress = v; }); }} error={errors[`guarantors.${i}.residentialAddress`]} />
            <Field label="Mobile" required name={`g${i}-mob`} type="tel" value={g.mobile} onChange={(e) => { const v = e.target.value; update((d) => { d.guarantors[i].mobile = v; }); }} error={errors[`guarantors.${i}.mobile`]} />
            <Field label="Email" required name={`g${i}-email`} type="email" value={g.email} onChange={(e) => { const v = e.target.value; update((d) => { d.guarantors[i].email = v; }); }} error={errors[`guarantors.${i}.email`]} hint="The Deed is sent here" />
          </div>
          {(app.guarantors.length > 1 || !required) && (
            <button type="button" className="qb-ta-link" onClick={() => update((d) => { d.guarantors.splice(i, 1); if (!d.guarantors.length && required) d.guarantors.push(emptyGuarantor()); })}>Remove</button>
          )}
        </fieldset>
      ))}
      {app.guarantors.length < 2 && (
        <button type="button" className="qb-ta-add" onClick={() => update((d) => { d.guarantors.push(emptyGuarantor()); })}>+ Add {app.guarantors.length ? "a second" : "a"} guarantor</button>
      )}
    </div>
  );
}
