"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, MonitorPlay, X } from "lucide-react";
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

const iconButton =
  "tap-target inline-grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-white/85 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white";

export function SiteHeader({ locale, brand, nav, a11y, lang }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const other: Locale = locale === "ar" ? "en" : "ar";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
    <header className="no-print pointer-events-none fixed inset-x-0 top-0 z-50 pt-2.5 sm:pt-4">
      <a
        href="#main"
        className="pointer-events-auto sr-only z-[60] rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy-900 focus:not-sr-only focus:absolute focus:start-4 focus:top-3"
      >
        {a11y.skip}
      </a>

      <div className="container-page">
        <div
          className={cn(
            "pointer-events-auto flex h-14 items-center justify-between gap-2 rounded-full border ps-2 pe-2 transition-[background-color,border-color,box-shadow] duration-500 sm:h-[3.75rem] sm:gap-4 sm:ps-2.5",
            scrolled
              ? "border-white/10 bg-navy-975/75 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.9)] backdrop-blur-xl backdrop-saturate-150"
              : "border-white/[0.07] bg-white/[0.03] backdrop-blur-md",
          )}
        >
          <Link href={localePath(locale)} className="flex min-w-0 items-center gap-2.5 rounded-full py-1 pe-2 text-white">
            <span className="flex shrink-0 -space-x-2 rtl:space-x-reverse">
              <CrestPlate src={SITE.brand.university} alt={brand.universityAlt} size={36} preload />
              <CrestPlate src={SITE.brand.faculty} alt={brand.facultyAlt} size={36} preload />
            </span>
            <span className="hidden min-w-0 leading-tight sm:block">
              <span className="block truncate text-[0.9375rem] font-semibold tracking-tight">{brand.study}</span>
              <span className="block truncate text-xs text-mist/70 lg:hidden xl:block">{brand.facultyUniversity}</span>
            </span>
          </Link>

          <nav aria-label={a11y.primaryNav} className="hidden lg:block">
            <ul className="flex items-center gap-0.5 rounded-full border border-white/[0.06] bg-white/[0.03] p-1">
              {NAV_IDS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? "true" : undefined}
                    className={cn(
                      "block rounded-full px-3 py-1.5 text-[0.8125rem] font-medium transition-colors duration-300 xl:px-3.5",
                      active === id ? "bg-white/[0.12] text-white" : "text-mist/70 hover:text-white",
                    )}
                  >
                    {nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <a
              href={localePath(other)}
              hrefLang={lang.hrefLang}
              lang={lang.hrefLang}
              onClick={switchLanguage}
              aria-label={a11y.language}
              className="tap-target inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-white/10 px-3 text-sm font-semibold text-white/90 transition-colors hover:border-white/25 hover:bg-white/10"
            >
              <span className="hidden sm:inline">{lang.switchLabel}</span>
              <span className="sm:hidden">{lang.short}</span>
            </a>
            <ThemeToggle label={a11y.theme} className={iconButton} />
            <a
              href="/presentation"
              className="hidden h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-navy-900 transition-colors hover:bg-mist xl:inline-flex"
            >
              <MonitorPlay className="h-4 w-4" aria-hidden />
              {nav.presentation}
            </a>
            <button type="button" onClick={openMenu} aria-label={a11y.openMenu} aria-haspopup="dialog" className={cn(iconButton, "lg:hidden")}>
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-label={a11y.primaryNav}
        className="pointer-events-auto m-0 h-dvh max-h-none w-full max-w-none bg-navy-975/[0.97] p-0 text-white backdrop-blur-2xl open:flex open:flex-col"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -end-32 h-80 w-80 rounded-full bg-crimson-600/25 blur-[100px]" />
          <div className="absolute -bottom-32 -start-32 h-80 w-80 rounded-full bg-blue-400/20 blur-[100px]" />
        </div>
        <div className="container-page relative flex h-[4.5rem] shrink-0 items-center justify-between">
          <span className="flex items-center gap-2.5">
            <span className="flex -space-x-2 rtl:space-x-reverse">
              <CrestPlate src={SITE.brand.university} alt="" size={32} />
              <CrestPlate src={SITE.brand.faculty} alt="" size={32} />
            </span>
            <span className="text-[0.9375rem] font-semibold">{brand.study}</span>
          </span>
          <button type="button" onClick={closeMenu} aria-label={a11y.closeMenu} className={iconButton}>
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <nav aria-label={a11y.primaryNav} className="container-page relative flex-1 overflow-y-auto py-4">
          <ol className="space-y-1">
            {SECTION_IDS.map((id, i) => (
              <li key={id} className="enter" style={{ ["--d" as string]: `${60 + i * 45}ms` }}>
                <a
                  href={`#${id}`}
                  onClick={closeMenu}
                  className="group flex items-baseline gap-4 rounded-2xl px-2 py-2.5 transition-colors hover:bg-white/[0.06]"
                >
                  <span className="tnum w-6 font-mono text-xs text-white/40">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-2xl font-semibold tracking-tight text-white/90 group-hover:text-white sm:text-3xl">{nav[id]}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="container-page relative grid shrink-0 gap-3 border-t border-white/10 py-5 sm:grid-cols-2">
          <a href="/presentation" className="flex h-12 items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold text-navy-900">
            <MonitorPlay className="h-4 w-4" aria-hidden />
            {nav.presentation}
          </a>
          <a
            href={localePath(other)}
            hrefLang={lang.hrefLang}
            lang={lang.hrefLang}
            onClick={switchLanguage}
            className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 text-sm font-semibold"
          >
            {lang.switchLabel}
            <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
          </a>
        </div>
      </dialog>
    </header>
  );
}
