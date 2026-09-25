import { Application, ENTITY_OPTIONS } from "@/lib/tradeAccount";

const Row = ({ k, v }: { k: string; v?: string }) => (v ? <div className="qb-ta-row"><dt>{k}</dt><dd>{v}</dd></div> : null);
const ausDate = (s: string) => (/^\d{4}-\d{2}-\d{2}$/.test(s) ? s.split("-").reverse().join("/") : s);

/** Step 7 — everything on one screen before it is signed and sent, each block with an Edit link. */
export default function StepReview({ app, onEdit }: { app: Application; onEdit: (step: number) => void }) {
  const b = app.business;
  const kind = ENTITY_OPTIONS.find((o) => o.value === b.entityType);
  const refs = app.references.filter((r) => r.name);
  const guarantors = app.guarantors.filter((g) => g.fullName);
  const Block = ({ title, step, children }: { title: string; step: number; children: React.ReactNode }) => (
    <section className="qb-ta-review">
      <header><h3>{title}</h3><button type="button" onClick={() => onEdit(step)}>Edit</button></header>
      <dl>{children}</dl>
    </section>
  );
  return (
    <div className="ts-form-group">
      <div className="legend"><span className="num">Step 7</span><span className="name">Check and submit</span></div>
      <p className="hint">Please check everything. When you submit, the application is signed and a copy is emailed to {b.email || "you"}.</p>
      <Block title="Business" step={0}>
        <Row k="Registered name" v={b.legalName} />
        <Row k="Trading as" v={b.tradingAs} />
        <Row k="ABN / ACN" v={[b.abn, b.acn].filter(Boolean).join(" / ")} />
        <Row k="Entity" v={kind?.label} />
        <Row k="Established" v={ausDate(b.dateEstablished)} />
        <Row k="Years trading" v={b.yearsTrading} />
        <Row k="Nature of business" v={b.natureOfBusiness} />
        <Row k="Credit limit required" v={b.creditLimit ? `$${b.creditLimit}` : ""} />
        <Row k="Accounts email" v={b.email} />
        <Row k="Registered address" v={b.registeredAddress} />
        <Row k="Trading address" v={b.tradingAddress} />
      </Block>
      <Block title={kind?.people || "Directors"} step={1}>
        {app.people.map((p, i) => <Row key={i} k={p.fullName} v={`${p.residentialAddress} · born ${ausDate(p.dob)}`} />)}
      </Block>
      <Block title="Contacts" step={2}>
        <Row k="Sales" v={app.contacts.sales} />
        <Row k="Accounts" v={app.contacts.accounts} />
        <Row k="Bank" v={app.contacts.bank} />
        <Row k="Accountant" v={app.contacts.accountant} />
      </Block>
      <Block title="Trade references" step={3}>
        {refs.length ? refs.map((r, i) => <Row key={i} k={r.name} v={[r.phone, r.email, r.address].filter(Boolean).join(" · ")} />) : <Row k="None given" v="—" />}
      </Block>
      <Block title="Guarantors" step={4}>
        {guarantors.length ? guarantors.map((g, i) => <Row key={i} k={g.fullName} v={`${g.email} · ${g.mobile}`} />) : <Row k="None" v="—" />}
      </Block>
      <Block title="Signed by" step={5}>
        <Row k={app.declaration.signerName} v={app.declaration.signerPosition} />
      </Block>
    </div>
  );
}
