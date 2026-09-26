"use client";
import { useRef } from "react";
import Image from "next/image";
import { Download, Maximize2, X } from "lucide-react";
import { SITE } from "@/content/site";
import type { Dictionary } from "@/content/i18n";

export function PosterViewer({ t }: { t: Dictionary["poster"] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const aspect = SITE.poster.height / SITE.poster.width;

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        className="group relative block w-full overflow-hidden rounded-2xl border border-line bg-surface p-3 shadow-lift transition-transform duration-500 hover:-translate-y-1"
        aria-haspopup="dialog"
      >
        <Image
          src={SITE.poster.thumb}
          alt={t.posterAlt}
          width={640}
          height={Math.round(640 * aspect)}
          sizes="(min-width: 1024px) 360px, 90vw"
          className="h-auto w-full rounded-lg"
        />
        <span className="absolute inset-3 flex items-end justify-center rounded-lg bg-linear-to-t from-navy-950/70 via-navy-950/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy-900">
            <Maximize2 className="h-4 w-4" aria-hidden />
            {t.open}
          </span>
        </span>
      </button>

      <dialog
        ref={dialog}
        aria-label={t.posterTitle}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
        className="m-auto h-[92dvh] max-h-none w-[min(64rem,94vw)] max-w-none overflow-hidden rounded-2xl bg-navy-950 p-0 text-white open:flex open:flex-col"
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <p className="truncate text-sm font-semibold">{t.posterTitle}</p>
          <div className="flex items-center gap-2">
            <a
              href={SITE.poster.download}
              download
              className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-3.5 text-sm font-semibold text-navy-900"
            >
              <Download className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">{t.download}</span>
            </a>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label={t.close}
              className="inline-grid h-9 w-9 place-items-center rounded-full border border-white/20"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
        <div tabIndex={0} role="region" aria-label={t.posterAlt} className="flex-1 overflow-auto bg-[#e9edf3] focus-visible:outline-offset-[-3px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={SITE.poster.full} alt={t.posterAlt} loading="lazy" className="mx-auto block h-auto w-full max-w-[1600px]" />
        </div>
      </dialog>
    </>
  );
}
