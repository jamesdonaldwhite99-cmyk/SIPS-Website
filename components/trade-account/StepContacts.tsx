"use client";

import Field from "./Field";
import { StepProps } from "@/lib/tradeAccount";

/** Step 3 — who we talk to, and the bank and accountant (all optional, as on the paper form). */
export default function StepContacts({ app, update }: StepProps) {
  const c = app.contacts;
  const set = (k: keyof typeof c) => (e: React.ChangeEvent<HTMLInputElement>) => { const v = e.target.value; update((d) => { d.contacts[k] = v; }); };
  return (
    <div className="ts-form-group">
      <div className="legend"><span className="num">Step 3</span><span className="name">Contacts, bank and accountant</span></div>
      <p className="hint">Optional, but it helps us assess the application faster.</p>
      <div className="ts-form-inputs">
        <Field full label="Sales contact" name="sales" placeholder="Name, phone or email" value={c.sales} onChange={set("sales")} />
        <Field full label="Accounts contact" name="accounts" placeholder="Name, phone or email" value={c.accounts} onChange={set("accounts")} />
        <Field full label="Bank (name & address)" name="bank" value={c.bank} onChange={set("bank")} />
        <Field full label="Accountant (name & address)" name="accountant" value={c.accountant} onChange={set("accountant")} />
      </div>
    </div>
  );
}
