"use client";

import Field from "./Field";
import SignaturePad from "./SignaturePad";
import { CONSENTS, StepProps, TERMS_PDF, TERMS_EDITION } from "@/lib/tradeAccount";

function Consent({ checked, onChange, error, children }: { checked: boolean; onChange: (v: boolean) => void; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={`qb-ta-consent${checked ? " is-checked" : ""}${error ? " qb-ta-has-error" : ""}`}>
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className="box" aria-hidden>
          <svg viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <span className="copy">{children}</span>
      </label>
      {error && <span className="qb-ta-error" role="alert">{error}</span>}
    </div>
  );
}

/**
 * Step 6 — the declaration from page 2 of the paper form, the Terms, the two extra consents an
 * online application needs, and the signature. The consent sentences are the exact words printed
 * in the signed application's signing record (lib/tradeAccount.ts).
 */
export default function StepDeclaration({ app, errors, update }: StepProps) {
  const d = app.declaration;
  const sig = d.signature;
  return (
    <div className="ts-form-group">
      <div className="legend"><span className="num">Step 6</span><span className="name">Declaration and signature</span></div>
      <p className="qb-ta-declaration">
        The Applicant requests Quick Built Systems Pty Ltd (the &ldquo;Seller&rdquo;) to open a 30-day trading account on the basis of the
        Seller&rsquo;s Terms and Conditions of Trade — {TERMS_EDITION}, a copy of which is attached to and forms part of this application,
        and agrees to be bound by those Terms. The Applicant and the signatory acknowledge that the information in this application is true
        and correct and has been relied upon by the Seller in deciding whether to grant credit, and that the signatory has full authority to
        sign on behalf of the Applicant. Where required, a separate Deed of Guarantee and Indemnity must also be completed.
      </p>
      <div className="qb-ta-terms">
        <div>
          <strong>Payment terms.</strong> Invoices are payable by the last working day of the month following the month of invoice. Overdue
          amounts incur interest at 3% p.a. above the Westpac Overdraft Business Rate, calculated daily (see clause 5 of the Terms), plus
          solicitor-and-own-client recovery costs.
        </div>
        <a className="ts-btn ts-btn--ghost" href={TERMS_PDF} target="_blank" rel="noopener">Read the Terms (PDF)</a>
      </div>

      <Consent checked={d.agreeTerms} onChange={(v) => update((x) => { x.declaration.agreeTerms = v; })} error={errors["declaration.agreeTerms"]}>
        {CONSENTS.agreeTerms}
      </Consent>
      <Consent checked={d.consentCredit} onChange={(v) => update((x) => { x.declaration.consentCredit = v; })} error={errors["declaration.consentCredit"]}>
        {CONSENTS.consentCredit}
      </Consent>
      <Consent checked={d.consentElectronic} onChange={(v) => update((x) => { x.declaration.consentElectronic = v; })} error={errors["declaration.consentElectronic"]}>
        {CONSENTS.consentElectronic}
      </Consent>

      <div className="ts-form-inputs">
        <Field required label="Name of person signing" name="signerName" autoComplete="name" value={d.signerName} onChange={(e) => { const v = e.target.value; update((x) => { x.declaration.signerName = v; }); }} error={errors["declaration.signerName"]} />
        <Field required label="Position" name="signerPosition" placeholder="e.g. Director" value={d.signerPosition} onChange={(e) => { const v = e.target.value; update((x) => { x.declaration.signerPosition = v; }); }} error={errors["declaration.signerPosition"]} />
      </div>

      <div className="ts-form-input full">
        <label>Signature<span className="qb-ta-req" aria-hidden> *</span></label>
        <div className="qb-ta-segment qb-ta-segment--small" role="radiogroup" aria-label="How to sign">
          <button type="button" role="radio" aria-checked={sig.type === "drawn"} className={sig.type === "drawn" ? "is-on" : ""} onClick={() => update((x) => { x.declaration.signature = { type: "drawn", dataUrl: "" }; })}>Draw</button>
          <button type="button" role="radio" aria-checked={sig.type === "typed"} className={sig.type === "typed" ? "is-on" : ""} onClick={() => update((x) => { x.declaration.signature = { type: "typed", text: "" }; })}>Type</button>
        </div>
        {sig.type === "drawn" ? (
          <SignaturePad onChange={(dataUrl) => update((x) => { x.declaration.signature = { type: "drawn", dataUrl }; })} error={errors["declaration.signature"]} />
        ) : (
          <Field label="Type your full name" name="typedSignature" value={sig.text} onChange={(e) => { const v = e.target.value; update((x) => { x.declaration.signature = { type: "typed", text: v }; }); }} error={errors["declaration.signature"]} />
        )}
      </div>
    </div>
  );
}
