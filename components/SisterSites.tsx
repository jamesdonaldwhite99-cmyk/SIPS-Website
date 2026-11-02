import Image from "next/image";

/**
 * The other Quick Built sites, built on the same panels. These links used to send the homes and patio
 * sites their best-converting referral traffic, so they open with rel="noopener" only: "noreferrer"
 * would hide the referrer and the visit would show up there as Direct.
 */
const SITES = [
  {
    title: "Kit homes, granny flats and cabins",
    site: "quickbuilthomes.com.au",
    copy: "Homes, granny flats and backyard cabins built with our insulated wall and roof panels.",
    href: "https://www.quickbuilthomes.com.au/",
    image: "/photos/gallery/11.jpg",
  },
  {
    title: "Modular fencing and retaining",
    site: "quickbuiltfencing.com.au",
    copy: "Acoustic modular fencing and retaining walls for homes and commercial sites.",
    href: "https://www.quickbuiltfencing.com.au/",
    image: "/photos/010a6725-enhanced-nr-2.jpg",
  },
  {
    title: "DIY patio kits",
    site: "patiokits.com.au",
    copy: "Insulspan and Slimline patio kits, flat-packed for DIY. Design yours and see a delivered price.",
    href: "https://www.patiokits.com.au/",
    image: "/photos/Patio Kit.png",
  },
];

export default function SisterSites({ h2 = "More from Quick Built." }: { h2?: string }) {
  return (
    <section className="ts-section ts-divider-top" style={{ background: "var(--ts-cream-2)" }}>
      <div className="ts-container">
        <div className="ts-section-head">
          <div>
            <div className="ts-eyebrow">The Quick Built family</div>
            <h2>{h2}</h2>
          </div>
          <p>One family business behind every one of them.</p>
        </div>
        <div className="qb-sister-grid">
          {SITES.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener" className="qb-sister-card">
              <div className="img">
                <Image src={s.image} alt={s.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 900px) 100vw, 33vw" />
              </div>
              <div className="body">
                <div className="site">{s.site}</div>
                <h3>{s.title}</h3>
                <p>{s.copy}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
