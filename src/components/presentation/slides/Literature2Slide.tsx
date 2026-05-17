"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const POINTS = [
  { en: "Enhanced alertness, reaction time & sustained attention (Horne & Reyner, 2001)", ar: "تحسّن في اليقظة وزمن رد الفعل والانتباه المستدام (Horne & Reyner, 2001)" },
  { en: "Improvements in attention switching & subjective alertness (Haskell et al.)", ar: "تحسّن في تحويل الانتباه واليقظة الذاتية (Haskell et al.)" },
  { en: "Caffeine improves working memory at low-moderate doses (Kennedy, 2004)", ar: "الكافيين يحسّن الذاكرة العاملة بالجرعات المنخفضة–المتوسطة (Kennedy, 2004)" },
  { en: "Optimal dose: 50–200 mg; higher doses show diminishing returns (Nehlig, 2010)", ar: "الجرعة المثلى: 50–200 ملغ؛ الجرعات الأعلى تُظهر تراجعاً في الفائدة (Nehlig, 2010)" },
];

export default function Literature2Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "مراجعة الأدبيات" : "Literature Review"} · 2 / 2</div>
        <h2 className="pres-h1"><em>{ar ? "الأداء المعرفي" : "Cognitive Performance"}</em> {ar ? "— الأدلة" : "— Evidence"}</h2>
        <div className="pres-divider" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="pres-card anim-border-glow"
        style={{ marginBottom: "14px", padding: "14px 18px", border: "1px solid rgba(99,102,241,0.25)", background: "rgba(99,102,241,0.06)" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <svg width="110" height="65" viewBox="0 0 120 70" fill="none" style={{ flexShrink: 0 }}>
            <path d="M10,60 Q40,5 60,8 Q80,10 110,55" stroke="#6366f1" strokeWidth="2.5" fill="none" />
            <circle cx="60" cy="8" r="4" fill="#fbbf24" />
            <text x="52" y="4" fill="#fbbf24" fontSize="7">Optimal</text>
            <text x="2" y="68" fill="#94a3b8" fontSize="7">Low</text>
            <text x="92" y="68" fill="#94a3b8" fontSize="7">High dose</text>
          </svg>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--c-text)", marginBottom: "4px" }}>
              {ar ? "منحنى الأداء المقلوب–U" : "Inverted-U Dose-Response Curve"}
            </div>
            <div style={{ fontSize: "13px", color: "var(--c-text-muted)", lineHeight: 1.5 }}>
              {ar
                ? "الجرعة المنخفضة–المتوسطة تُعطي أفضل فائدة. الجرعات العالية تُسبّب قلقاً وتقلل الأداء."
                : "Low-to-moderate doses yield best benefit. High doses cause anxiety and impair performance."}
            </div>
          </div>
        </div>
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1, justifyContent: "center" }}>
        {POINTS.map((p, i) => (
          <motion.div
            key={i}
            className="pres-card"
            initial={{ opacity: 0, x: ar ? 16 : -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            whileHover={{ scale: 1.01 }}
            style={{ padding: "10px 16px", borderLeft: "3px solid var(--c-emerald)" }}
          >
            <span style={{ fontSize: "14px", color: "var(--c-text-muted)" }}>{ar ? p.ar : p.en}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75 }}
        className="pres-card"
        style={{ marginTop: "8px", padding: "8px 14px", border: "1px solid rgba(251,191,36,0.2)", background: "rgba(251,191,36,0.05)" }}
      >
        <span style={{ fontSize: "13px", color: "var(--c-gold-light)" }}>
          ⚠️ {ar
            ? "ملاحظة: أغلب الدراسات على عينات غربية — نتائجنا تضيف بيانات إقليمية نادرة"
            : "Note: Most studies used Western samples — our findings add rare regional data"}
        </span>
      </motion.div>
    </div>
  );
}
