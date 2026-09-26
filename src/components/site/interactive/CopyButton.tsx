"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { btn } from "../ui/buttons";

export function CopyButton({ text, label, done }: { text: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };
  return (
    <button type="button" onClick={copy} className={btn.outline}>
      {copied ? <Check className="h-4 w-4 text-accent-ink" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  );
}
