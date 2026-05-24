import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("gallery");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
