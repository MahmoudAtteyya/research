"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const POINTS = [
  { en: "Beverages marketed to boost energy, alertness & mental performance", ar: "مشروبات تُسوَّق لتعزيز الطاقة واليقظة والأداء الذهني", icon: "⚡" },
  { en: "Commonly contain caffeine, taurine, B-vitamins & sugar", ar: "تحتوي شيوعاً على الكافيين والتورين وفيتامينات ب والسكر", icon: "🧪" },
  { en: "Rapidly growing global phenomenon since the late 1980s", ar: "ظاهرة عالمية متنامية بسرعة منذ أواخر الثمانينيات", icon: "🌍" },
  { en: "Particularly popular among university students and young adults", ar: "شائعة بشكل خاص بين طلاب الجامعات والشباب", icon: "🎓" },
  { en: "Growing public health concern due to reported adverse effects", ar: "مصدر قلق صحي عام متنامٍ بسبب الآثار الجانبية المُبلَّغ عنها", icon: "⚠️" },
];

export default function Intro1Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "المقدمة" : "Introduction"} · 1 / 3</div>
        <h2 className="pres-h1">{ar ? "ما هي مشروبات " : "What are "}
          <em>{ar ? "الطاقة؟" : "Energy Drinks?"}</em>
        </h2>
        <div className="pres-divider" />
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1, justifyContent: "center" }}>
        {POINTS.map((p, i) => (
          <motion.div
            key={i}
            className="pres-card"
            initial={{ opacity: 0, x: ar ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.015, x: ar ? -4 : 4 }}
            style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px 18px" }}
          >
            <motion.span
              style={{ fontSize: "24px", flexShrink: 0 }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >{p.icon}</motion.span>
            <span style={{ fontSize: "15px", color: "var(--c-text-muted)" }}>
              {ar ? p.ar : p.en}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
