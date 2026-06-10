import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PreFooter from "@/components/PreFooter";
import Footer from "@/components/Footer";
import seo from "@/content/seo.json";

export const metadata: Metadata = {
  title: {
    default: seo.site.defaultTitle,
    template: seo.site.titleTemplate,
  },
  description: seo.site.description,
  keywords: seo.site.keywords.split(",").map((k) => k.trim()).filter(Boolean),
  openGraph: {
    siteName: seo.site.siteName,
    locale: seo.site.locale,
    ...(seo.site.ogImage ? { images: [{ url: seo.site.ogImage }] } : {}),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU">
      <body>
        <Navbar />
        <main>{children}</main>
        <PreFooter />
        <Footer />
      </body>
    </html>
  );
}
