"use client";
import { useEffect } from "react";

let printed = false;

/** A one-time signature in the browser console, for developers who look. */
export function ConsoleSignature() {
  useEffect(() => {
    if (printed) return;
    printed = true;
    console.info(
      "%cMahmoud Attia%c\nDesigned & developed this website\nFaculty of Medicine · Suez University",
      "font: italic 600 22px Georgia, serif; color: #C9A227;",
      "font: 12px system-ui, sans-serif; color: #8A94A6; line-height: 1.6;",
    );
  }, []);
  return null;
}
