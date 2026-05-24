"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const products = [
  {
    slug: "insulspan",
    kicker: "Insulspan®",
    title: "Insulated Roofing Panels",
    copy: "Long-span structural roofing — three profiles. No purlins, sarking, or plasterboard.",
    image: "/photos/product-insulspan-new.png",
    href: "/products/insulspan",
  },
  {
    slug: "panelspan",
    kicker: "Panelspan®",
    title: "Structural Insulated Panels",
    copy: "Pre-finished FC or MgO walls bonded to a high-density EPS core. Lock-up in days.",
    image: "/photos/product-panelspan-new.png",
    href: "/products/panelspan",
  },
  {
    slug: "panelcore",
    kicker: "Panelcore®",
    title: "Coldroom Panels",
    copy: "Steel-skinned insulated panels for cold storage, food processing and pharma.",
    image: "/photos/product-panelcore-new.png",
    href: "/products/panelcore",
  },
];

const systems = [
  {
    slug: "patio-kits",
    kicker: "Patio Kits",
    title: "Pre-engineered outdoor living",
    copy: "Eight styles, flat-packed and ready to install. Insulspan® insulated or Slimline.",
    image: "/photos/Patio Kit.png",
    href: "/patio-kits",
  },
  {
    slug: "building-system",
    kicker: "Building System",
    title: "Complete SIPs envelope",
    copy: "Walls, roof and coldroom panels working together as one high-performance system.",
    image: "/photos/Building system.jpg",
    href: "/building-system",
  },
];

const navItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "products", label: "Products", dropdown: true },
  { id: "systems", label: "Systems", systemsDropdown: true },
  { id: "about", label: "About", href: "/about" },
  { id: "gallery", label: "Gallery", href: "/gallery" },
  { id: "resources", label: "Resources", href: "/resources" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [systemsOpen, setSystemsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const systemsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setSystemsOpen(false);
    setMenuOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMenuOpen(false), 140);
  };

  const openSystems = () => {
    if (systemsCloseTimer.current) clearTimeout(systemsCloseTimer.current);
    setMenuOpen(false);
    setSystemsOpen(true);
  };
  const scheduleSystems = () => {
    systemsCloseTimer.current = setTimeout(() => setSystemsOpen(false), 140);
  };

  const isProductActive = pathname.startsWith("/products");
  const isSystemsActive = pathname.startsWith("/building-system") || pathname.startsWith("/patio-kits");

  const getActiveId = () => {
    if (pathname === "/") return "home";
    if (pathname.startsWith("/products")) return "products";
    if (pathname.startsWith("/building-system") || pathname.startsWith("/patio-kits")) return "systems";
    if (pathname.startsWith("/about")) return "about";
    if (pathname.startsWith("/gallery")) return "gallery";
    if (pathname.startsWith("/resources")) return "resources";
    if (pathname.startsWith("/contact")) return "contact";
    return "";
  };

  const activeId = getActiveId();

  return (
    <>
      <header className="ts-header">
        <div className="ts-header-inner">
          <Link href="/" className="ts-wordmark" aria-label="ThermaSpan">
            <Image
              src="/photos/logo-qbs.png"
              alt="ThermaSpan — Structural Insulated Panels by QuickBuilt Systems"
              width={380}
              height={140}
              style={{ height: 140, width: "auto" }}
              priority
            />
          </Link>

          <nav className="ts-nav">
            {navItems.map((item) => {
              if (item.dropdown) {
                return (
                  <div
                    key={item.id}
                    className={`ts-nav-trigger${menuOpen ? " is-open" : ""}${isProductActive ? " is-active" : ""}`}
                    onMouseEnter={openMenu}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      type="button"
                      className={`ts-nav-btn has-caret${isProductActive ? " is-active" : ""}`}
                      aria-expanded={menuOpen}
                      onClick={() => setMenuOpen(!menuOpen)}
                    >
                      {item.label}
                    </button>
                  </div>
                );
              }
              if (item.systemsDropdown) {
                return (
                  <div
                    key={item.id}
                    className={`ts-nav-trigger${systemsOpen ? " is-open" : ""}${isSystemsActive ? " is-active" : ""}`}
                    onMouseEnter={openSystems}
                    onMouseLeave={scheduleSystems}
                  >
                    <button
                      type="button"
                      className={`ts-nav-btn has-caret${isSystemsActive ? " is-active" : ""}`}
                      aria-expanded={systemsOpen}
                      onClick={() => setSystemsOpen(!systemsOpen)}
                    >
                      {item.label}
                    </button>
                  </div>
                );
              }
              return (
                <Link
                  key={item.id}
                  href={item.href!}
                  className={activeId === item.id ? "is-active" : ""}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ts-header-actions">
            <a className="ts-phone-pill" href="tel:1300132787">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              1300 132 787
            </a>
            <Link href="/contact" className="ts-btn ts-btn--primary">
              Request a quote
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <button
              className="ts-hamburger"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="ts-mobile-menu">
            {navItems.map((item) => {
              if (item.dropdown) {
                return (
                  <div key={item.id}>
                    <div style={{ fontSize: 12, letterSpacing: "1.4px", textTransform: "uppercase", color: "var(--ts-accent)", fontWeight: 600, padding: "10px 0 6px", borderBottom: "1px solid var(--color-hairline)" }}>
                      Products
                    </div>
                    {products.map((p) => (
                      <Link key={p.slug} href={p.href} onClick={() => setMobileOpen(false)}
                        style={{ display: "block", padding: "8px 0 8px 16px", borderBottom: "1px solid var(--color-hairline)", fontSize: 15 }}>
                        {p.kicker} — {p.title}
                      </Link>
                    ))}
                  </div>
                );
              }
              if (item.systemsDropdown) {
                return (
                  <div key={item.id}>
                    <div style={{ fontSize: 12, letterSpacing: "1.4px", textTransform: "uppercase", color: "var(--ts-accent)", fontWeight: 600, padding: "10px 0 6px", borderBottom: "1px solid var(--color-hairline)" }}>
                      Systems
                    </div>
                    {systems.map((s) => (
                      <Link key={s.slug} href={s.href} onClick={() => setMobileOpen(false)}
                        style={{ display: "block", padding: "8px 0 8px 16px", borderBottom: "1px solid var(--color-hairline)", fontSize: 15 }}>
                        {s.kicker} — {s.title}
                      </Link>
                    ))}
                  </div>
                );
              }
              return (
                <Link key={item.id} href={item.href!} onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Products mega menu */}
        <div
          className={`ts-megamenu${menuOpen ? " is-open" : ""}`}
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
          aria-hidden={!menuOpen}
        >
          <div className="ts-megamenu-inner">
            <div className="ts-megamenu-aside">
              <div className="ts-eyebrow">Our products</div>
              <h3>One panel system for every Australian build.</h3>
              <p>
                Roofing, walls, and coldroom panels — engineered to work as a complete
                high-performance envelope, or specified individually for any project.
              </p>
              <Link href="/products" className="ts-link-arrow" onClick={() => setMenuOpen(false)}>
                View all products
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="ts-megamenu-grid">
              {products.map((p) => (
                <Link
                  key={p.slug}
                  href={p.href}
                  className="ts-megamenu-item"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="ts-megamenu-thumb">
                    <Image src={p.image} alt={p.title} fill style={{ objectFit: "cover" }} sizes="300px" />
                  </div>
                  <div className="ts-megamenu-body">
                    <div className="ts-megamenu-kicker">{p.kicker}</div>
                    <div className="ts-megamenu-title">{p.title}</div>
                    <div className="ts-megamenu-copy">{p.copy}</div>
                    <span className="ts-megamenu-link">Explore →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Systems mega menu */}
        <div
          className={`ts-megamenu${systemsOpen ? " is-open" : ""}`}
          onMouseEnter={openSystems}
          onMouseLeave={scheduleSystems}
          aria-hidden={!systemsOpen}
        >
          <div className="ts-megamenu-inner">
            <div className="ts-megamenu-aside">
              <div className="ts-eyebrow">Our systems</div>
              <h3>Patio kits and complete building systems.</h3>
              <p>
                Pre-engineered patio kits and full SIPs building systems — designed, manufactured and supplied direct from our factory in Silverdale, NSW.
              </p>
            </div>
            <div className="ts-megamenu-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              {systems.map((s) => (
                <Link
                  key={s.slug}
                  href={s.href}
                  className="ts-megamenu-item"
                  onClick={() => setSystemsOpen(false)}
                >
                  <div className="ts-megamenu-thumb">
                    <Image src={s.image} alt={s.title} fill style={{ objectFit: "cover" }} sizes="300px" />
                  </div>
                  <div className="ts-megamenu-body">
                    <div className="ts-megamenu-title">{s.kicker}</div>
                    <div className="ts-megamenu-copy">{s.title}</div>
                    <span className="ts-megamenu-link">Explore →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`ts-megamenu-scrim${menuOpen || systemsOpen ? " is-open" : ""}`}
          onClick={() => { setMenuOpen(false); setSystemsOpen(false); }}
        />
      </header>
    </>
  );
}
