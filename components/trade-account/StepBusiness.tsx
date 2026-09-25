"use client";

import { useState } from "react";
import Field from "./Field";
import { ENTITY_OPTIONS, StepProps, validAbn, digits } from "@/lib/tradeAccount";

type AbnResult = { found: boolean; entityName?: string; acn?: string; status?: string; entityTypeName?: string; gst?: boolean; businessNames?: string[] };

/** Step 1 — the business. Entering a valid ABN looks it up on the ABR and offers to fill the name. */
export default function StepBusiness({ app, errors, update }: StepProps) {
  const b = app.business;
  const [abn, setAbn] = useState<AbnResult | null>(null);
  const [looking, setLooking] = useState(false);
  const set = (k: keyof typeof b) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    update((d) => { (d.business[k] as string) = v; });
  };

  const lookUp = async (value: string) => {
    if (!validAbn(value)) { setAbn(null); return; }
    setLooking(true);
    try {
      const res = await fetch(`/api/account/abn?abn=${digits(value)}`);
      setAbn(res.ok ? await res.json() : null);
    } catch { setAbn(null); } finally { setLooking(false); }
  };

  const useRegistered = () => {
    if (!abn?.found) return;
    update((d) => {
      d.business.legalName = abn.entityName || d.business.legalName;
      if (abn.acn && !d.business.acn) d.business.acn = abn.acn;
      if (!d.business.tradingAs && abn.businessNames?.length === 1) d.business.tradingAs = abn.businessNames[0];
    });
  };

  return (
    <div className="ts-form-group">
      <div className="legend"><span className="num">Step 1</span><span className="name">The business</span></div>
      <p className="hint">As registered with the ABR and ASIC. Fields marked * are required.</p>
      <div className="ts-form-inputs">
        <Field label="ABN" name="abn" inputMode="numeric" autoComplete="off" value={b.abn} onChange={set("abn")} onBlur={(e) => lookUp(e.target.value)} error={errors["business.abn"]} hint="11 digits — we'll look it up for you" />
        <Field label="ACN" name="acn" inputMode="numeric" autoComplete="off" value={b.acn} onChange={set("acn")} error={errors["business.acn"]} hint="Companies only" />
        {(looking || abn) && (
          <div className="ts-form-input full">
            <div className={`qb-ta-abn${abn && !abn.found ? " is-miss" : ""}`}>
              {looking && "Looking up the ABN…"}
              {!looking && abn?.found && (
                <>
                  <span><strong>{abn.entityName}</strong> · {abn.entityTypeName} · ABN {abn.status?.toLowerCase()}{abn.gst ? " · GST registered" : " · not registered for GST"}</span>
                  {abn.entityName !== b.legalName && <button type="button" onClick={useRegistered}>Use this name</button>}
                </>
              )}
              {!looking && abn && !abn.found && "We couldn't confirm that ABN right now — please check it and carry on."}
            </div>
          </div>
        )}
        <Field full required label="Registered name of applicant" name="legalName" autoComplete="organization" value={b.legalName} onChange={set("legalName")} error={errors["business.legalName"]} />
        <Field full label="Trading as" name="tradingAs" value={b.tradingAs} onChange={set("tradingAs")} />
        <div className="ts-form-input full">
          <label>Type of entity<span className="qb-ta-req" aria-hidden> *</span></label>
          <div className="qb-ta-segment" role="radiogroup" aria-label="Type of entity">
            {ENTITY_OPTIONS.map((o) => (
              <button key={o.value} type="button" role="radio" aria-checked={b.entityType === o.value} className={b.entityType === o.value ? "is-on" : ""}
                onClick={() => update((d) => {
                  d.business.entityType = o.value;
                  if (o.value === "sole_trader") d.people = d.people.slice(0, 1);
                })}>
                {o.label}
              </button>
            ))}
          </div>
          {errors["business.entityType"] && <span className="qb-ta-error" role="alert">{errors["business.entityType"]}</span>}
        </div>
        <Field required label="Date established" name="dateEstablished" type="date" value={b.dateEstablished} onChange={set("dateEstablished")} error={errors["business.dateEstablished"]} />
        <Field required label="Years trading" name="yearsTrading" inputMode="numeric" value={b.yearsTrading} onChange={set("yearsTrading")} error={errors["business.yearsTrading"]} />
        <Field full required label="Nature of business" name="natureOfBusiness" placeholder="e.g. Residential builder — new homes and extensions" value={b.natureOfBusiness} onChange={set("natureOfBusiness")} error={errors["business.natureOfBusiness"]} />
        <Field required label="Credit limit required ($)" name="creditLimit" inputMode="numeric" placeholder="25,000" value={b.creditLimit} onChange={set("creditLimit")} error={errors["business.creditLimit"]} />
        <Field required label="Email (accounts)" name="email" type="email" autoComplete="email" value={b.email} onChange={set("email")} error={errors["business.email"]} hint="Your signed copy is sent here" />
        <Field full label="Registered address" name="registeredAddress" autoComplete="street-address" value={b.registeredAddress} onChange={set("registeredAddress")} error={errors["business.registeredAddress"]} />
        <Field label="Phone" name="registeredPhone" type="tel" autoComplete="tel" value={b.registeredPhone} onChange={set("registeredPhone")} />
        <Field label="Mobile" name="registeredMobile" type="tel" value={b.registeredMobile} onChange={set("registeredMobile")} />
        <Field full label="Trading address (if different)" name="tradingAddress" value={b.tradingAddress} onChange={set("tradingAddress")} />
        <Field label="Trading phone" name="tradingPhone" type="tel" value={b.tradingPhone} onChange={set("tradingPhone")} />
        <Field label="Trading mobile" name="tradingMobile" type="tel" value={b.tradingMobile} onChange={set("tradingMobile")} />
        <Field full label="Previous trading name(s)" name="previousNames" value={b.previousNames} onChange={set("previousNames")} />
      </div>
    </div>
  );
}
