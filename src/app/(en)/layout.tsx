import type { Viewport } from "next";
import "@/styles/site.css";
import { latinFontVariables } from "@/lib/fonts-latin";
import { SiteProviders } from "@/components/site/layout/SiteProviders";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060b16",
  colorScheme: "dark light",
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" data-scroll-behavior="smooth" className={latinFontVariables} suppressHydrationWarning>
      <body>
        <SiteProviders>{children}</SiteProviders>
      </body>
    </html>
  );
}
