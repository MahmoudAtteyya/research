import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Remote Clicker | Suez Med Presentation",
  description: "Remote slide controller for Suez University Faculty of Medicine presentation",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#04071a",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
