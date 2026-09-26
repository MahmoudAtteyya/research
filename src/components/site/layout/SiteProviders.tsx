"use client";
import { ThemeProvider } from "next-themes";

export function SiteProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange storageKey="fomsu-theme">
      {children}
    </ThemeProvider>
  );
}
