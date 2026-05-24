import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "ThermaSpan — Australia's Lightest, Fastest SIPs System",
    template: "%s · ThermaSpan",
  },
  description:
    "Insulspan® roofing panels, Panelspan® wall panels and Panelcore® coldroom panels. Pre-finished SIPs engineered for Australian conditions. Family-owned, 25 years experience.",
  keywords: ["SIPs panels", "structural insulated panels", "insulated roofing", "Insulspan", "Panelspan", "Panelcore", "ThermaSpan", "QuickBuilt", "Australian building"],
  openGraph: {
    siteName: "ThermaSpan",
    locale: "en_AU",
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
        <Footer />
      </body>
    </html>
  );
}
