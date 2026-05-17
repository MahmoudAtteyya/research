"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const INCLUSION = [
  { en: "Healthy adults aged 18–45 years", ar: "بالغون أصحاء عمر 18–45 سنة" },
  { en: "Both males and females", ar: "ذكور وإناث" },
  { en: "Willing to provide informed consent", ar: "موافقة طوعية مستنيرة" },
  { en: "No medications affecting CV / CNS", ar: "بدون أدوية تؤثر على القلب أو الجهاز العصبي" },
];

const EXCLUSION = [
  { en: "Known cardiovascular disease", ar: "أمراض قلبية وعائية معروفة" },
  { en: "Neurological or psychiatric disorders", ar: "اضطرابات عصبية أو نفسية" },
  { en: "Pregnant / breastfeeding females", ar: "حوامل أو مرضعات" },
  { en: "Known hypersensitivity to caffeine", ar: "حساسية معروفة للكافيين" },
];

const TOOLS = [
  { en: "Mercury sphygmomanometer", ar: "جهاز ضغط الزئبق", icon: "🩺" },
  { en: "Manual HR & RR measurement", ar: "قياس القلب والتنفس يدوياً", icon: "⏱️" },
  { en: "Mercury thermometer", ar: "ميزان حرارة زئبقي", icon: "🌡️" },
  { en: "Mindfulness Scale", ar: "مقياس اليقظة الذهنية", icon: "🧠" },
  { en: "Digit Span / Memory Tests", ar: "اختبارات الأرقام والذاكرة", icon: "🔢" },
];

export default function Methods2Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "الطرق" : "Methods"} · 2 / 2</div>
        <h2 className="pres-h1" style={{ fontSize: "clamp(22px, 3vw, 34px)" }}>{ar ? "المعايير " : "Criteria & "}<em>{ar ? "والأدوات" : "Tools"}</em></h2>
        <div className="pres-divider" />
      </motion.div>

      <div className="pres-grid-3" style={{ flex: 1, alignContent: "center", gap: "12px" }}>
        {/* Inclusion */}
        <motion.div className="pres-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02 }} style={{ borderTop: "3px solid var(--c-emerald)", padding: "10px 14px" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#6ee7b7", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
            ✅ {ar ? "معايير الإدراج" : "Inclusion"}
          </div>
          <ul className="pres-list emerald" style={{ gap: "6px" }}>
            {INCLUSION.map((item, i) => (
              <motion.li key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 + i * 0.07 }} style={{ fontSize: "12px" }}>
                {ar ? item.ar : item.en}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Exclusion */}
        <motion.div className="pres-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }} style={{ borderTop: "3px solid var(--c-rose)", padding: "10px 14px" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#fca5a5", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
            ❌ {ar ? "معايير الاستبعاد" : "Exclusion"}
          </div>
          <ul className="pres-list rose" style={{ gap: "6px" }}>
            {EXCLUSION.map((item, i) => (
              <motion.li key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 + i * 0.07 }} style={{ fontSize: "12px" }}>
                {ar ? item.ar : item.en}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Tools */}
        <motion.div className="pres-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }} style={{ borderTop: "3px solid var(--c-indigo)", padding: "10px 14px" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#a5b4fc", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
            🛠️ {ar ? "أدوات القياس" : "Tools"}
          </div>
          {TOOLS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 + i * 0.07 }}
              style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px" }}>
              <span style={{ fontSize: "14px" }}>{t.icon}</span>
              <span style={{ fontSize: "12px", color: "var(--c-text-muted)" }}>{ar ? t.ar : t.en}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
