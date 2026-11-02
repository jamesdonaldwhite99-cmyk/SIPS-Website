import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("steel_floors", "/products/steel-floors");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ label: "Products", href: "/products" }, { label: "Steel Floors", href: "/products/steel-floors" }])} />
      {children}
    </>
  );
}
