import { jsonLdString } from "@/lib/seo";

/** Structured data for search engines (lib/seo.ts builds the objects). Renders on the server. */
export default function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(data) }} />;
}
