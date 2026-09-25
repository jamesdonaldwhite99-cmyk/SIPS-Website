"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import StepIndicator from "./StepIndicator";
import StepBusiness from "./StepBusiness";
import StepPeople from "./StepPeople";
import StepContacts from "./StepContacts";
import StepReferences from "./StepReferences";
import StepGuarantors from "./StepGuarantors";
import StepDeclaration from "./StepDeclaration";
import StepReview from "./StepReview";
import { Application, Errors, STEPS, emptyApplication, stepErrors, toPayload } from "@/lib/tradeAccount";

const STEP_OF_FIELD: Record<string, number> = { business: 0, people: 1, contacts: 2, references: 3, guarantors: 4, declaration: 5 };

/**
 * The trade account application, one step at a time.
 *
 * Each step is checked when you press Continue, and you cannot move past a step with a problem. The
 * form lives only in this page's memory — nothing is saved in the browser, because it holds dates
 * of birth and licence numbers — so leaving the page asks first.
 */
export default function TradeAccountForm() {
  const [app, setApp] = useState<Application>(emptyApplication);
  const [step, setStep] = useState(0);
  const [reached, setReached] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [problem, setProblem] = useState("");
  const [done, setDone] = useState<{ ref: string; email: string } | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const hpRef = useRef<HTMLInputElement>(null);
  const started = useRef(Date.now());
  const submissionId = useRef("");
  const dirty = useRef(false);

  useEffect(() => {
    submissionId.current = typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
    const warn = (e: BeforeUnloadEvent) => { if (dirty.current) { e.preventDefault(); e.returnValue = ""; } };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

  const update = useCallback((edit: (draft: Application) => void) => {
    dirty.current = true;
    setApp((prev) => { const next = structuredClone(prev); edit(next); return next; });
  }, []);

  // Once a step has been attempted, its errors clear as they are fixed.
  useEffect(() => { if (Object.keys(errors).length) setErrors(stepErrors(step, app)); }, [app]); // eslint-disable-line react-hooks/exhaustive-deps

  const go = (to: number) => {
    setStep(to);
    setErrors({});
    setProblem("");
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const next = () => {
    const e = stepErrors(step, app);
    if (Object.keys(e).length) { setErrors(e); setProblem("Please fix the highlighted fields."); return; }
    const to = step + 1;
    setReached((r) => Math.max(r, to));
    go(to);
  };

  const submit = async () => {
    // Every step again, in case something was edited out of order.
    for (let s = 0; s < STEPS.length - 1; s++) {
      const e = stepErrors(s, app);
      if (Object.keys(e).length) { go(s); setErrors(e); setProblem("Please fix the highlighted fields."); return; }
    }
    setSending(true);
    setProblem("");
    try {
      const res = await fetch("/api/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toPayload(app, submissionId.current, started.current, hpRef.current?.value || "")),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ref) {
        dirty.current = false;
        setDone({ ref: body.ref, email: app.business.email });
        requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
        return;
      }
      if (res.status === 422 && Array.isArray(body.errors) && body.errors.length) {
        const first = body.errors[0].field.split(".")[0];
        const map: Errors = {};
        body.errors.forEach((x: { field: string; message: string }) => { map[x.field] = x.message; });
        go(STEP_OF_FIELD[first] ?? 0);
        setErrors(map);
        setProblem("Some details need attention.");
        return;
      }
      setProblem(body.error || "We couldn't send your application. Please try again, or call us on 1300 132 787.");
    } catch {
      setProblem("We couldn't reach our server. Check your connection and try again — nothing has been lost.");
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div ref={topRef} className="qb-ta-done">
        <span className="num">Application received</span>
        <h2>Thank you — your reference is {done.ref}</h2>
        <p>Your signed application, with the Terms and Conditions of Trade you agreed to, is on its way to <strong>{done.email}</strong>.</p>
        <p>We usually assess applications within two business days. If a guarantee is needed, we&rsquo;ll email the Deed of Guarantee to your guarantors once the account is approved.</p>
        <p>Questions: <a href="mailto:accounts@quickbuiltsystems.com.au">accounts@quickbuiltsystems.com.au</a> or <a href="tel:1300132787">1300 132 787</a>.</p>
      </div>
    );
  }

  const props = { app, errors, update };
  return (
    <div ref={topRef} className="qb-ta">
      <StepIndicator step={step} reached={reached} onJump={(i) => i <= reached && go(i)} />
      <form className="ts-form" onSubmit={(e) => { e.preventDefault(); if (step === STEPS.length - 1) submit(); else next(); }} noValidate>
        {/* Honeypot: invisible to people, irresistible to form-filling bots. */}
        <input ref={hpRef} type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden className="qb-ta-hp" />
        {step === 0 && <StepBusiness {...props} />}
        {step === 1 && <StepPeople {...props} />}
        {step === 2 && <StepContacts {...props} />}
        {step === 3 && <StepReferences {...props} />}
        {step === 4 && <StepGuarantors {...props} />}
        {step === 5 && <StepDeclaration {...props} />}
        {step === 6 && <StepReview app={app} onEdit={go} />}

        {problem && <p className="qb-ta-problem" role="alert">{problem}</p>}

        <div className="qb-ta-actions">
          {step > 0 ? <button type="button" className="ts-btn ts-btn--ghost" onClick={() => go(step - 1)}>Back</button> : <span />}
          <button type="submit" className="ts-btn ts-btn--primary" disabled={sending}>
            {step === STEPS.length - 1 ? (sending ? "Signing and sending…" : "Sign and submit application") : "Continue"}
            <span className="arrow" aria-hidden>→</span>
          </button>
        </div>
      </form>
    </div>
  );
}
