"use client";
import { useState } from "react";
import PresentationEngine from "@/components/presentation/PresentationEngine";

export default function PresentationPage() {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const toggleLang = () => setLang((l) => (l === "en" ? "ar" : "en"));

  return (
    <div style={{ margin: 0, padding: 0, overflow: "hidden", height: "100vh", width: "100vw", background: "#04071a" }}>
      <PresentationEngine lang={lang} onLangChange={toggleLang} />
    </div>
  );
}

