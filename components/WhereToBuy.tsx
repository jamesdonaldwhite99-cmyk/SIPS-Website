import Link from "next/link";

export type BuyOption = { kicker: string; title: string; copy: string; links: { label: string; href: string }[] };
export type WhereToBuyData = { eyebrow: string; h2: string; lead: string; options: BuyOption[]; leadTime: string };
/** Stores that keep a small range on the shelf (content/bunnings-stocked.json). */
export type StockedRange = { kicker: string; title: string; lead: string; stores: { name: string; state: string }[]; colours: string[]; range: string[] };

/** Where a brand can be bought: direct, patiokits.com.au and Bunnings, with the lead time under it. */
export default function WhereToBuy({ data, stocked, id = "where-to-buy" }: { data: WhereToBuyData; stocked?: StockedRange; id?: string }) {
  return (
    <section id={id} className="ts-section ts-divider-top">
      <div className="ts-container">
        <div className="ts-section-head">
          <div>
            <div className="ts-eyebrow">{data.eyebrow}</div>
            <h2>{data.h2}</h2>
          </div>
          <p>{data.lead}</p>
        </div>
        <div className="qb-buy-grid">
          {data.options.map((o) => (
            <article key={o.title} className="qb-buy-card">
              <div className="kicker">{o.kicker}</div>
              <h3>{o.title}</h3>
              <p>{o.copy}</p>
              {o.links.length > 0 && (
                <div className="links">
                  {o.links.map((l, i) =>
                    /^https?:/.test(l.href) ? (
                      // noopener only: keep the referrer so patiokits.com.au sees where the visit came from.
                      <a key={l.href} href={l.href} target="_blank" rel="noopener" className={i === 0 ? "ts-btn ts-btn--dark" : "qb-buy-link"}>{l.label}</a>
                    ) : l.href.startsWith("/") ? (
                      <Link key={l.href} href={l.href} className={i === 0 ? "ts-btn ts-btn--dark" : "qb-buy-link"}>{l.label}</Link>
                    ) : (
                      <a key={l.href} href={l.href} className={i === 0 ? "ts-btn ts-btn--dark" : "qb-buy-link"}>{l.label}</a>
                    )
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
        {stocked && (
          <div className="qb-buy-stocked">
            <div className="kicker">{stocked.kicker}</div>
            <h3>{stocked.title}</h3>
            <p>{stocked.lead}</p>
            <div className="qb-buy-stocked-cols">
              <div>
                <h4>Stores</h4>
                <ul>
                  {stocked.stores.map((st) => (
                    <li key={st.name}>Bunnings {st.name} <span>{st.state}</span></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>In stock, in {stocked.colours.join(" and ")}</h4>
                <ul>
                  {stocked.range.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        <p className="qb-buy-leadtime">{data.leadTime}</p>
      </div>
    </section>
  );
}
