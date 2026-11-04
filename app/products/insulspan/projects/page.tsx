import Link from "next/link";
import Image from "next/image";
import data from "@/content/insulspan-projects.json";
import PageHero from "@/components/PageHero";

/* The jobs that used to sit on insulspan.com.au, moved here so that site can be retired into this one
   (James 4 Nov 2026). Linked from the Insulspan page only, not the menu, so the site stays uncluttered. */
export default function InsulspanProjectsPage() {
  return (
    <div>
      <PageHero crumb="Insulspan projects" eyebrow={data.heroEyebrow} h1={data.heroH1} lead={data.heroLead} photo={data.heroPhoto} />

      <section className="ts-section">
        <div className="ts-container">
          <div className="qb-proj-back">
            <Link href="/products/insulspan">← Insulspan insulated roof panels: span tables, specs and colours</Link>
          </div>
          <div className="qb-proj-grid">
            {data.projects.map((p) => (
              <article key={p.id} id={p.id} className="qb-proj-card">
                <div className="qb-proj-photo">
                  <Image src={p.photos[0].src} alt={p.photos[0].alt} fill style={{ objectFit: "cover" }} sizes="(max-width: 900px) 100vw, 50vw" />
                </div>
                {p.photos.length > 1 && (
                  <div className="qb-proj-thumbs">
                    {p.photos.slice(1).map((ph) => (
                      <div key={ph.src} className="qb-proj-thumb">
                        <Image src={ph.src} alt={ph.alt} fill style={{ objectFit: "cover" }} sizes="200px" />
                      </div>
                    ))}
                  </div>
                )}
                <div className="qb-proj-body">
                  <div className="qb-proj-tags">
                    <span>{p.use}</span>
                    {"profile" in p && p.profile && <span>{p.profile}</span>}
                    {"builder" in p && p.builder && <span>Built by {p.builder}</span>}
                  </div>
                  <h2>{p.title}</h2>
                  <p>{p.copy}</p>
                  {"quote" in p && p.quote && <blockquote>“{p.quote}”</blockquote>}
                  {"link" in p && p.link && (
                    <Link href={p.link.href} className="qb-proj-link">{p.link.label} →</Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ts-cta-strip">
        <div className="ts-container">
          <div className="inner">
            <div>
              <h2>{data.ctaH2}</h2>
              <p>{data.ctaBody}</p>
            </div>
            <div className="ts-cta-card">
              <span className="ts-eyebrow">Speak to our team</span>
              <a href={`tel:${data.ctaPhone.replace(/\s+/g, "")}`} className="phone">{data.ctaPhone}</a>
              <p className="hours">Mon–Fri · 7:30am – 4:30pm AEST</p>
              <div className="actions">
                <Link href="/contact" className="ts-btn ts-btn--primary">
                  Enquire Now
                  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/products/insulspan#span-tables" className="ts-btn ts-btn--ghost-on-dark">Span tables</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
