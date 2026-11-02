import JsonLd from "@/components/JsonLd";
import data from "@/content/alyspan.json";
import { ORGANIZATION_ID, SITE_URL, absoluteUrl, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("alyspan", "/products/alyspan");

/* Product markup without an offer: the page shows no prices (Alyspan is quoted, or bought as part of
   a kit on patiokits.com.au), so there is no price to mark up. No ratings: none are collected here. */
const product = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${SITE_URL}/products/alyspan#product`,
  name: "Alyspan Structural Aluminium Beam",
  url: absoluteUrl("/products/alyspan"),
  brand: { "@type": "Brand", name: "Alyspan" },
  manufacturer: { "@id": ORGANIZATION_ID },
  category: "Structural aluminium patio beams, posts and connectors",
  material: "Aluminium 6063-T6",
  description: data.heroLead,
  image: [
    absoluteUrl(data.heroPhoto),
    ...data.beams.map((b) => absoluteUrl(b.photo)),
  ],
  additionalProperty: data.beams.flatMap((b) =>
    b.properties.map((p) => ({ "@type": "PropertyValue", name: `${b.name}: ${p.label}`, value: p.value }))
  ),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={product} />
      <JsonLd data={breadcrumbJsonLd([{ label: "Products", href: "/products" }, { label: "Alyspan", href: "/products/alyspan" }])} />
      <JsonLd data={faqJsonLd(data.faq)} />
      {children}
    </>
  );
}
