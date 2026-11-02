import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("panelcore", "/products/panelcore");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ label: "Products", href: "/products" }, { label: "Panelcore", href: "/products/panelcore" }])} />
      {children}
    </>
  );
}
