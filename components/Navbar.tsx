"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import menuData from "@/content/menu.json";

const categories = menuData.categories;

const navItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "products", label: "Products", dropdown: true },
  { id: "about", label: "About", href: "/about" },
  { id: "gallery", label: "Gallery", href: "/gallery" },
  { id: "resources", label: "Resources", href: "/resources" },
  { id: "contact", label: "Contact", href: "/contact" },
];

type MenuItem = { title: string; copy: string; href: string; external: boolean; image: string };

function MenuLink({ item, onClick, className, children }: { item: { href: string; external: boolean }; onClick?: () => void; className?: string; children: React.ReactNode }) {
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenuOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMenuOpen(false), 140);
  };

  const isProductActive =
    pathname.startsWith("/products") ||
    pathname.startsWith("/building-system");

  const getActiveId = () => {
    if (pathname === "/") return "home";
    if (isProductActive) return "products";
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
              src="/photos/a_vector_based_logo_for_quickbuilt_systems_feat white.png"
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
                  <div key={item.id} className="ts-mobile-section">
                    <div className="ts-mobile-section-title">Products</div>
                    {categories.map((cat) => (
                      <MenuLink
                        key={cat.title}
                        item={{ href: cat.href, external: cat.external }}
                        onClick={() => setMobileOpen(false)}
                        className="ts-mobile-sub"
                      >
                        {cat.title}
                      </MenuLink>
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

            <div className="ts-mobile-cta">
              <a className="ts-phone-pill" href="tel:1300132787" onClick={() => setMobileOpen(false)}>
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                1300 132 787
              </a>
              <Link href="/contact" className="ts-btn ts-btn--primary" onClick={() => setMobileOpen(false)}>
                Request a quote
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </nav>
        )}

        {/* Products mega menu — 4 columns */}
        <div
          className={`ts-megamenu ts-megamenu--wide${menuOpen ? " is-open" : ""}`}
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
          aria-hidden={!menuOpen}
        >
          <div className="ts-megamenu-inner">
            <div className="ts-megamenu-columns">
              {categories.map((cat) => (
                <div key={cat.title} className="ts-megamenu-column">
                  <MenuLink item={{ href: cat.href, external: cat.external }} onClick={() => setMenuOpen(false)} className="ts-megamenu-cat-card">
                    {cat.image && (
                      <div className="ts-megamenu-cat-thumb">
                        <Image src={cat.image} alt={cat.title} fill style={{ objectFit: "cover" }} sizes="280px" />
                      </div>
                    )}
                    <div className="ts-megamenu-cat-title">
                      {cat.title}
                      <span className="ts-megamenu-column-arrow">→</span>
                    </div>
                  </MenuLink>
                  <div className="ts-megamenu-sublist">
                    {cat.items.map((it: MenuItem) => (
                      <MenuLink key={it.title} item={it} onClick={() => setMenuOpen(false)} className="ts-megamenu-textitem">
                        {it.title}
                      </MenuLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`ts-megamenu-scrim${menuOpen ? " is-open" : ""}`}
          onClick={() => setMenuOpen(false)}
        />
      </header>
    </>
  );
}
