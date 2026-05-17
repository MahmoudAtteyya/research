"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const POINTS = [
  { icon: "❤️", color: "var(--c-rose)",    en: "All 5 vital signs showed statistically significant increases (p < 0.001)", ar: "جميع العلامات الحيوية الخمس أظهرت ارتفاعات ذات دلالة إحصائية (p < 0.001)" },
  { icon: "🧠", color: "var(--c-indigo)",  en: "Significant improvements in working memory, mindfulness, and processing speed", ar: "تحسّن ملحوظ في الذاكرة العاملة واليقظة الذهنية وسرعة المعالجة" },
  { icon: "⚖️", color: "var(--c-violet)",  en: "Dual effect: cognitive enhancement + cardiovascular stimulation", ar: "تأثير مزدوج: تعزيز معرفي + تحفيز قلبي وعائي" },
  { icon: "🌍", color: "var(--c-emerald)", en: "First study documenting these effects in Suez / Egyptian population", ar: "أول دراسة توثّق هذه التأثيرات في مجتمع السويس / المصري" },
];

export default function ConclusionSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "الخلاصة" : "Conclusion"}</div>
        <h2 className="pres-h1">{ar ? "ما " : "What We "}<em>{ar ? "توصّلنا إليه" : "Found"}</em></h2>
        <div className="pres-divider" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="anim-border-glow"
        style={{
          marginBottom: "14px", padding: "16px 20px",
          background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.25)",
          borderRadius: "14px",
        }}
      >
        <p style={{ fontSize: "16px", color: "var(--c-text)", lineHeight: 1.6, fontWeight: 500, textAlign: "center" }}>
          {ar
            ? "تُنتج مشروبات الطاقة تأثيراً مزدوجاً: تعزيز معرفي مؤقت مع تحفيز قلبي وعائي — مما يستوجب الاعتدال."
            : "Energy drinks produce a dual effect: temporary cognitive enhancement with measurable cardiovascular stimulation — necessitating moderation."}
        </p>
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1, justifyContent: "center" }}>
        {POINTS.map((p, i) => (
          <motion.div
            key={i}
            className="pres-card"
            initial={{ opacity: 0, x: ar ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.28 + i * 0.1 }}
            whileHover={{ scale: 1.015, x: ar ? -4 : 4 }}
            style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px 16px", borderLeft: `3px solid ${p.color}` }}
          >
            <motion.span
              style={{ fontSize: "22px", flexShrink: 0 }}
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >{p.icon}</motion.span>
            <span style={{ fontSize: "14px", color: "var(--c-text-muted)" }}>{ar ? p.ar : p.en}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
