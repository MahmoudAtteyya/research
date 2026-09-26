import type { Metadata } from "next";
import "@/styles/site.css";
import { latinFontVariables } from "@/lib/fonts-latin";
import { SITE } from "@/content/site";
import { en } from "@/content/i18n/en";
import { ar } from "@/content/i18n/ar";
import { CrestPlate } from "@/components/site/ui/CrestPlate";

export const metadata: Metadata = {
  title: `${en.notFound.title} · ${en.meta.shortTitle}`,
  description: en.notFound.text,
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${latinFontVariables} dark`}>
      <body>
        <main className="relative isolate grid min-h-dvh place-items-center overflow-hidden bg-navy-900 px-6 text-center text-white">
          <div aria-hidden className="bg-ecg absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]" />
          <div className="max-w-xl">
            <div className="flex justify-center -space-x-2">
              <CrestPlate src={SITE.brand.university} alt={en.brand.universityAlt} size={56} />
              <CrestPlate src={SITE.brand.faculty} alt={en.brand.facultyAlt} size={56} />
            </div>
            <p className="tnum mt-10 font-display text-8xl font-medium text-gold-300">404</p>
            <h1 className="mt-4 font-display text-3xl font-medium">{en.notFound.title}</h1>
            <p className="mt-3 text-mist">{en.notFound.text}</p>
            <p lang="ar" dir="rtl" className="mt-2 text-mist/70">
              {ar.notFound.text}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="/" className="rounded-full bg-crimson-600 px-5 py-3 text-sm font-semibold text-white hover:bg-crimson-700">
                {en.notFound.home}
              </a>
              <a href="/ar" lang="ar" className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
                {ar.notFound.home}
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
