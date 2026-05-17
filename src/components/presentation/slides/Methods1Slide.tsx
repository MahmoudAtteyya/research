"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const INFO = [
  { labelEn: "Study Design",   labelAr: "تصميم الدراسة",   value: "Pre-Post Experimental",             valueAr: "تجريبية قبلية-بعدية",                           icon: "🔬" },
  { labelEn: "Setting",        labelAr: "الموقع",           value: "Suez University & Suez Univ. Hospital", valueAr: "جامعة السويس ومستشفاها",                      icon: "🏥" },
  { labelEn: "Sample Size",    labelAr: "حجم العينة",       value: "47 Healthy Adults",                 valueAr: "47 بالغاً سليماً",                              icon: "👥" },
  { labelEn: "Age Range",      labelAr: "الفئة العمرية",    value: "18–45 years  (mean 23.68 ± 5.8)",   valueAr: "18–45 سنة  (متوسط 23.68 ± 5.8)",                icon: "📅" },
  { labelEn: "Sampling",       labelAr: "طريقة الاختيار",   value: "Convenience Sampling",              valueAr: "أخذ عينات ملائمة",                              icon: "🎯" },
  { labelEn: "Analysis",       labelAr: "التحليل",          value: "SPSS v26 — Paired T-Test",          valueAr: "SPSS v26 — Paired T-Test",                      icon: "📊" },
];

export default function Methods1Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "الطرق" : "Methods"} · 1 / 2</div>
        <h2 className="pres-h1">{ar ? "تصميم " : "Study "}<em>{ar ? "الدراسة" : "Design"}</em></h2>
        <div className="pres-divider" />
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: "9px", flex: 1, justifyContent: "center" }}>
        {INFO.map((item, i) => (
          <motion.div
            key={i}
            className="pres-card"
            initial={{ opacity: 0, x: ar ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px 16px" }}
          >
            <span style={{ fontSize: "22px", flexShrink: 0 }}>{item.icon}</span>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--c-indigo)", width: "120px", flexShrink: 0, letterSpacing: "0.3px" }}>
              {ar ? item.labelAr : item.labelEn}
            </span>
            <span style={{ fontSize: "14px", color: "var(--c-text)", fontWeight: 500 }}>
              {ar ? item.valueAr : item.value}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
