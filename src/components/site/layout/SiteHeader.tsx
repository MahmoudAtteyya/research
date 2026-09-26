"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, MonitorPlay, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_IDS, SECTION_IDS, SITE, localePath, type Locale, type SectionId } from "@/content/site";
import type { Dictionary } from "@/content/i18n";
import { CrestPlate } from "../ui/CrestPlate";
import { ThemeToggle } from "./ThemeToggle";

type HeaderProps = {
  locale: Locale;
  brand: Dictionary["brand"];
  nav: Dictionary["nav"];
  a11y: Dictionary["a11y"];
  lang: Dictionary["lang"];
};

/** Sections without their own nav item highlight the nearest one. */
const NAV_FOR: Partial<Record<SectionId, SectionId>> = {
  background: "abstract",
  conclusion: "discussion",
  quiz: "discussion",
};

export function SiteHeader({ locale, brand, nav, a11y, lang }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const other: Locale = locale === "ar" ? "en" : "ar";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const visible = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        const current = SECTION_IDS.find((id) => visible.get(id));
        setActive(current ? (NAV_FOR[current] ?? current) : null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const switchLanguage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.assign(localePath(other, window.location.hash));
  };

  const openMenu = () => dialogRef.current?.showModal();
  const closeMenu = () => dialogRef.current?.close();

  return (
    <header
      className={cn(
        "no-print fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-b border-white/10 bg-navy-900/88 shadow-[0_10px_30px_-20px_rgb(0_0_0/0.6)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy-900 focus:not-sr-only focus:absolute focus:start-4 focus:top-3"
      >
        {a11y.skip}
      </a>

      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href={localePath(locale)} className="flex min-w-0 items-center gap-3 rounded-full text-white">
          <span className="flex -space-x-2 rtl:space-x-reverse">
            <CrestPlate src={SITE.brand.university} alt={brand.universityAlt} size={36} preload />
            <CrestPlate src={SITE.brand.faculty} alt={brand.facultyAlt} size={36} preload />
          </span>
          <span className="hidden min-w-0 leading-tight sm:block">
            <span className="block truncate font-display text-[1.0625rem] font-medium">{brand.study}</span>
            <span className="block truncate text-xs text-mist/75">{brand.facultyUniversity}</span>
          </span>
        </Link>

        <nav aria-label={a11y.primaryNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_IDS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    active === id ? "text-white" : "text-mist/75 hover:text-white",
                  )}
                >
                  {nav[id]}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-crimson-400 transition-transform duration-300",
                      active === id ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={localePath(other)}
            hrefLang={lang.hrefLang}
            lang={lang.hrefLang}
            onClick={switchLanguage}
            aria-label={a11y.language}
            className="inline-flex h-10 items-center rounded-full border border-white/15 px-3.5 text-sm font-semibold text-white/90 transition-colors hover:border-white/30 hover:bg-white/10"
          >
            <span className="hidden sm:inline">{lang.switchLabel}</span>
            <span className="sm:hidden">{lang.short}</span>
          </a>
          <ThemeToggle label={a11y.theme} />
          <a
            href="/presentation"
            className="hidden h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-navy-900 transition-colors hover:bg-mist xl:inline-flex"
          >
            <MonitorPlay className="h-4 w-4" aria-hidden />
            {nav.presentation}
          </a>
          <button
            type="button"
            onClick={openMenu}
            aria-label={a11y.openMenu}
            aria-haspopup="dialog"
            className="inline-grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      <span aria-hidden className="scroll-progress absolute inset-x-0 bottom-0 h-0.5 bg-crimson-400" />

      <dialog
        ref={dialogRef}
        aria-label={a11y.primaryNav}
        className="m-0 ms-auto h-dvh max-h-none w-[min(22rem,88vw)] max-w-none bg-navy-900 p-0 text-white shadow-2xl backdrop:bg-navy-950/70 open:flex open:flex-col"
        onClick={(e) => {
          if (e.target === dialogRef.current) closeMenu();
        }}
      >
        <div className="flex h-[var(--header-h)] items-center justify-between border-b border-white/10 px-5">
          <span className="font-display text-lg">{brand.study}</span>
          <button
            type="button"
            onClick={closeMenu}
            aria-label={a11y.closeMenu}
            className="inline-grid h-10 w-10 place-items-center rounded-full border border-white/15"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <nav aria-label={a11y.primaryNav} className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {SECTION_IDS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={closeMenu}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-base text-white/90 hover:bg-white/10"
                >
                  {nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-white/10 p-5">
          <a
            href="/presentation"
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold text-navy-900"
          >
            <MonitorPlay className="h-4 w-4" aria-hidden />
            {nav.presentation}
          </a>
        </div>
      </dialog>
    </header>
  );
}
