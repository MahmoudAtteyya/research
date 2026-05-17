"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const POINTS = [
  { en: "Acute elevation in blood pressure and heart rate (Grasser et al., 2014)", ar: "ارتفاع حاد في ضغط الدم ومعدل القلب (Grasser et al., 2014)" },
  { en: "Significant cardiovascular stimulation and ECG changes (Shah et al., 2019)", ar: "تحفيز قلبي وعائي ملحوظ وتغيرات ECG (Shah et al., 2019)" },
  { en: "Altered heart rate variability in healthy young adults (Steinke et al., 2009)", ar: "تغيير في تباين معدل القلب لدى الشباب الأصحاء (Steinke et al., 2009)" },
  { en: "Risk of arrhythmia at high doses (> 400 mg caffeine/day)", ar: "خطر اضطراب نظم القلب عند الجرعات العالية (> 400 ملغ كافيين/يوم)" },
];

export default function Literature1Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "مراجعة الأدبيات" : "Literature Review"} · 1 / 2</div>
        <h2 className="pres-h1">{ar ? "التأثيرات " : "Cardiovascular "}<em>{ar ? "القلبية الوعائية" : "Effects"}</em></h2>
        <div className="pres-divider" />
      </motion.div>

      {/* Big visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "32px", marginBottom: "20px",
          padding: "20px",
          background: "rgba(244,63,94,0.06)",
          border: "1px solid rgba(244,63,94,0.2)",
          borderRadius: "14px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div className="anim-heartbeat" style={{ fontSize: "48px", marginBottom: "6px" }}>❤️</div>
          <div style={{ fontSize: "11px", color: "var(--c-text-dim)" }}>{ar ? "معدل القلب" : "Heart Rate"}</div>
        </div>
        <div style={{ fontSize: "32px", color: "var(--c-rose)", fontWeight: 900 }}>↑</div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "36px", fontWeight: 900, color: "var(--c-rose)" }}>BP</div>
          <div style={{ fontSize: "11px", color: "var(--c-text-dim)" }}>{ar ? "ضغط الدم" : "Blood Pressure"}</div>
        </div>
        <div style={{ fontSize: "32px", color: "var(--c-rose)", fontWeight: 900 }}>↑</div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "36px", fontWeight: 900, color: "var(--c-amber)" }}>⚡</div>
          <div style={{ fontSize: "11px", color: "var(--c-text-dim)" }}>{ar ? "تأثير حاد" : "Acute Effect"}</div>
        </div>
      </motion.div>

      <ul className="pres-list rose">
        {POINTS.map((p, i) => (
          <motion.li key={i} initial={{ opacity: 0, x: ar ? 16 : -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
            {ar ? p.ar : p.en}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
