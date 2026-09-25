"use client";

import Field from "./Field";
import { ENTITY_OPTIONS, StepProps, emptyPerson } from "@/lib/tradeAccount";

/** Step 2 — directors, partners or the proprietor, with the wording that fits the entity type. */
export default function StepPeople({ app, errors, update }: StepProps) {
  const kind = ENTITY_OPTIONS.find((o) => o.value === app.business.entityType) || ENTITY_OPTIONS[0];
  const single = app.business.entityType === "sole_trader";
  return (
    <div className="ts-form-group">
      <div className="legend"><span className="num">Step 2</span><span className="name">{kind.people}</span></div>
      <p className="hint">Full name, residential address and date of birth are required for identity verification and credit assessment.</p>
      {errors.people && <p className="qb-ta-error" role="alert">{errors.people}</p>}
      {app.people.map((p, i) => (
        <fieldset key={i} className="qb-ta-card">
          <legend>{kind.person} {single ? "" : i + 1}</legend>
          <div className="ts-form-inputs">
            <Field full required label="Full name" name={`p${i}-name`} autoComplete="name" value={p.fullName} onChange={(e) => { const v = e.target.value; update((d) => { d.people[i].fullName = v; }); }} error={errors[`people.${i}.fullName`]} />
            <Field full required label="Residential address" name={`p${i}-addr`} value={p.residentialAddress} onChange={(e) => { const v = e.target.value; update((d) => { d.people[i].residentialAddress = v; }); }} error={errors[`people.${i}.residentialAddress`]} />
            <Field required label="Date of birth" name={`p${i}-dob`} type="date" value={p.dob} onChange={(e) => { const v = e.target.value; update((d) => { d.people[i].dob = v; }); }} error={errors[`people.${i}.dob`]} />
          </div>
          {app.people.length > 1 && (
            <button type="button" className="qb-ta-link" onClick={() => update((d) => { d.people.splice(i, 1); })}>Remove</button>
          )}
        </fieldset>
      ))}
      {!single && app.people.length < 10 && (
        <button type="button" className="qb-ta-add" onClick={() => update((d) => { d.people.push(emptyPerson()); })}>+ Add another {kind.person.toLowerCase()}</button>
      )}
    </div>
  );
}
