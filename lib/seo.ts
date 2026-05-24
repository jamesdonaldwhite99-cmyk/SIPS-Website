import type { Metadata } from "next";
import seo from "@/content/seo.json";

type PageKey = keyof typeof seo.pages;

export function pageMetadata(key: PageKey): Metadata {
  const site = seo.site;
  const page = seo.pages[key];
  const ogImage = page.ogImage || site.ogImage || undefined;

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
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
