import type { Viewport } from "next";
import "@/styles/site.css";
import { latinFontVariables } from "@/lib/fonts-latin";
import { arabicFontVariables } from "@/lib/fonts-arabic";
import { SiteProviders } from "@/components/site/layout/SiteProviders";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1b33",
  colorScheme: "light dark",
};

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={`${latinFontVariables} ${arabicFontVariables}`}
      suppressHydrationWarning
    >
      <body>
        <SiteProviders>{children}</SiteProviders>
      </body>
    </html>
  );
}
