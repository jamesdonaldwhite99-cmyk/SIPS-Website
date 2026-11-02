import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("panelspan", "/products/panelspan");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ label: "Products", href: "/products" }, { label: "Panelspan", href: "/products/panelspan" }])} />
      {children}
    </>
  );
}
