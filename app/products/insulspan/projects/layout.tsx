import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("insulspanProjects", "/products/insulspan/projects");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Products", href: "/products" },
          { label: "Insulspan", href: "/products/insulspan" },
          { label: "Projects", href: "/products/insulspan/projects" },
        ])}
      />
      {children}
    </>
  );
}
