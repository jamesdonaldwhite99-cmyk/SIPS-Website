import Link from "next/link";
import Image from "next/image";
import galleryData from "@/content/gallery.json";

const galleryImages = galleryData.images.slice(0, 20);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ts-footer">
      <div className="ts-container">
        <div className="ts-footer-top">
          <div className="ts-footer-brand">
            <Link href="/" aria-label="ThermaSpan">
              <Image
                src="/photos/logo-qbs-white.png"
                alt="ThermaSpan — Structural Insulated Panels by QuickBuilt Systems"
                width={380}
                height={140}
                style={{ height: 140, width: "auto" }}
              />
            </Link>
            <p>
              Australian-made structural insulated panels. Family owned, 25 years
              of modular building experience.
            </p>
            <Link href="/contact" className="ts-btn ts-btn--primary">
              Request a quote
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="ts-footer-col">
            <h4>Products</h4>
            <ul>
              <li><Link href="/products/insulspan">Insulspan® Roofing</Link></li>
              <li><Link href="/products/panelspan">Panelspan® Walls</Link></li>
              <li><Link href="/products/panelcore">Panelcore® Coldroom</Link></li>
              <li><Link href="/products">All products</Link></li>
              <li><Link href="/building-system">Building system</Link></li>
            </ul>
          </div>

          <div className="ts-footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/building-system">Our process</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/resources">Resources</Link></li>
            </ul>
          </div>

          <div className="ts-footer-col">
            <h4>Resources</h4>
            <ul>
              <li><Link href="/resources">Brochures</Link></li>
              <li><Link href="/resources">Specifications</Link></li>
              <li><Link href="/resources">Install guides</Link></li>
              <li><Link href="/resources">Warranty</Link></li>
              <li><Link href="/resources">NCC compliance</Link></li>
            </ul>
          </div>

          <div className="ts-footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:1300132787">1300 132 787</a></li>
              <li><a href="mailto:sales@quickbuiltsystems.com.au">sales@quickbuiltsystems.com.au</a></li>
              <li><Link href="/contact">Contact us</Link></li>
              <li>Sydney, NSW</li>
              <li>Mon–Fri 7:30–4:30 AEST</li>
            </ul>
          </div>
        </div>

        <div className="ts-footer-gallery" aria-label="Recent projects">
          {galleryImages.map((img, i) => (
            <div key={i} className="tile">
              <Image
                src={img.src}
                alt={img.alt}
                width={80}
                height={80}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div className="ts-footer-bar">
          <div>© {year} ThermaSpan · A Quick Built Systems brand · ABN 00 000 000 000</div>
          <div className="sister">
            <a href="#">Quick Built Homes</a>
            <a href="#">Quick Built Fencing</a>
            <a href="#">Quick Built Flooring</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
