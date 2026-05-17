"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const POINTS = [
  { icon: "❤️", color: "var(--c-rose)",    en: "All 5 vital signs showed statistically significant increases (p < 0.001) after energy drink consumption",     ar: "جميع العلامات الحيوية الخمس أظهرت ارتفاعات ذات دلالة إحصائية (p < 0.001) بعد استهلاك مشروبات الطاقة" },
  { icon: "🧠", color: "var(--c-indigo)",  en: "Significant improvements in working memory, mindfulness scores, and cognitive processing speed",             ar: "تحسّن ملحوظ في الذاكرة العاملة ودرجات اليقظة الذهنية وسرعة المعالجة المعرفية" },
  { icon: "⚖️", color: "var(--c-violet)",  en: "Dual effect: temporary cognitive enhancement alongside measurable cardiovascular stimulation",              ar: "تأثير مزدوج: تعزيز معرفي مؤقت مع تحفيز قلبي وعائي قابل للقياس" },
  { icon: "🌍", color: "var(--c-emerald)", en: "First study to document these effects in a Suez / Egyptian population — adds critical regional data",       ar: "أول دراسة توثّق هذه التأثيرات في مجتمع السويس / المصري — تُضيف بيانات إقليمية حيوية" },
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

      {/* Main statement */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{
          marginBottom: "18px", padding: "18px 22px",
          background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.25)",
          borderRadius: "14px",
        }}
      >
        <p style={{ fontSize: "16px", color: "var(--c-text)", lineHeight: 1.65, fontWeight: 500, textAlign: "center" }}>
          {ar
            ? "تُنتج مشروبات الطاقة تأثيراً مزدوجاً: تعزيز معرفي مؤقت مع تحفيز قلبي وعائي قابل للقياس — مما يستوجب الاعتدال والوعي الصحي."
            : "Energy drinks produce a dual effect: temporary cognitive enhancement with measurable cardiovascular stimulation — necessitating moderation and health awareness."}
        </p>
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {POINTS.map((p, i) => (
          <motion.div
            key={i}
            className="pres-card"
            initial={{ opacity: 0, x: ar ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.28 + i * 0.1 }}
            style={{ display: "flex", alignItems: "center", gap: "14px", padding: "13px 18px", borderLeft: `3px solid ${p.color}` }}
          >
            <span style={{ fontSize: "22px", flexShrink: 0 }}>{p.icon}</span>
            <span className="pres-body-text" style={{ fontSize: "14px" }}>{ar ? p.ar : p.en}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
