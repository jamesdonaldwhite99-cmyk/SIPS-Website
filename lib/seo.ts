import type { Metadata } from "next";
import seo from "@/content/seo.json";

type PageKey = keyof typeof seo.pages;

/** The one address search engines should index: www, https, no query strings. */
export const SITE_URL = "https://www.quickbuiltsystems.com.au";

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const clean = (path || "/").split("#")[0].split("?")[0];
  const url = `${SITE_URL}${clean.startsWith("/") ? clean : `/${clean}`}`;
  return url === `${SITE_URL}/` ? url : url.replace(/\/$/, "");
}

/**
 * Metadata for a page whose words live in content/seo.json. The title there is the FULL title
 * (keyword first, brand last, 60 characters or fewer), so it is used as-is rather than run through
 * the layout's template. `path` is the page's own clean address and becomes its canonical.
 */
export function pageMetadata(key: PageKey, path: string): Metadata {
  const site = seo.site;
  const page = seo.pages[key] as { title: string; description: string; ogImage?: string };
  const ogImage = page.ogImage || site.ogImage || undefined;

  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: page.title,
      description: page.description,
      url: absoluteUrl(path),
      siteName: site.siteName,
      locale: site.locale,
      type: "website",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

/* ── Structured data (JSON-LD) ─────────────────────────────────────────────
   Only facts the site already shows: the legal name, address and ABN (footer, /privacy-policy,
   the Insulspan brochure), the phone and sales@ address on every page, the header logo, and the
   three sister sites the menu and footer link to. No ratings or reviews: stars on our own reviews
   of ourselves are self-serving and Google ignores or penalises them. */

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Quick Built Systems",
    legalName: "Quick Built Systems Pty Ltd",
    alternateName: "QuickBuilt Systems",
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/photos/a_logo_for_quickbuilt_systems_is_displayed_agains.png`,
    telephone: "+61 1300 132 787",
    email: "sales@quickbuiltsystems.com.au",
    taxID: "63 167 322 116",
    address: {
      "@type": "PostalAddress",
      streetAddress: "21 Econo Place",
      addressLocality: "Silverdale",
      addressRegion: "NSW",
      postalCode: "2752",
      addressCountry: "AU",
    },
    sameAs: [
      "https://www.quickbuilthomes.com.au/",
      "https://www.quickbuiltfencing.com.au/",
      "https://www.patiokits.com.au/",
    ],
  };
}

export type Crumb = { label: string; href: string };

/** BreadcrumbList from the same trail the page prints. Home is added first. */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
  const all = [{ label: "Home", href: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: absoluteUrl(c.href),
    })),
  };
}

export type Faq = { q: string; a: string };

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** JSON for a <script type="application/ld+json">, with "<" escaped so no text can close the tag. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
