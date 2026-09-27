"use client";
import { ThemeProvider } from "next-themes";

export function SiteProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange storageKey="fomsu-theme">
      {children}
    </ThemeProvider>
  );
}
