"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

export default function HypothesisSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "السؤال البحثي" : "Research Question"}</div>
        <h2 className="pres-h1"><em>{ar ? "ماذا نسأل؟" : "What We Ask"}</em></h2>
        <div className="pres-divider" />
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1, justifyContent: "center" }}>
        {/* Research Question */}
        <motion.div
          className="pres-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{ padding: "22px 26px", border: "1px solid rgba(99,102,241,0.3)", background: "rgba(99,102,241,0.07)" }}
        >
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--c-indigo)", marginBottom: "10px" }}>
            🔬 {ar ? "السؤال البحثي" : "Research Question"}
          </div>
          <p style={{ fontSize: "16px", color: "var(--c-text)", lineHeight: 1.65, fontWeight: 500 }}>
            {ar
              ? "هل لاستهلاك مشروبات الطاقة تأثير معنوي على العلامات الحيوية والأداء المعرفي لدى البالغين في جامعة السويس ومستشفاها؟"
              : "Does energy drink consumption have a significant effect on vital signs and cognitive performance among adults at Suez University and its Hospital?"}
          </p>
        </motion.div>

        {/* Hypothesis */}
        <motion.div
          className="pres-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ padding: "22px 26px", border: "1px solid rgba(251,191,36,0.25)", background: "rgba(251,191,36,0.06)" }}
        >
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: "10px" }}>
            💡 {ar ? "الفرضية" : "Hypothesis"}
          </div>
          <p style={{ fontSize: "16px", color: "var(--c-text)", lineHeight: 1.65, fontWeight: 500 }}>
            {ar
              ? "لمشروبات الطاقة تأثير معنوي على العلامات الحيوية، وقد تُحسّن الأداء المعرفي مع ما يصاحب ذلك من تغيرات قلبية وعائية قابلة للقياس."
              : "Energy drinks have a significant effect on vital signs and may improve cognitive performance, accompanied by measurable cardiovascular changes."}
          </p>
        </motion.div>

        {/* Study type */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          style={{ display: "flex", gap: "12px" }}
        >
          {[
            { labelEn: "Pre-Post Experimental",   labelAr: "تجريبية قبلية-بعدية", icon: "🧪" },
            { labelEn: "Suez University Hospital", labelAr: "مستشفى جامعة السويس", icon: "🏥" },
            { labelEn: "Year 2025",                labelAr: "عام 2025",             icon: "📅" },
          ].map((item, i) => (
            <div key={i} className="pres-card" style={{ flex: 1, textAlign: "center", padding: "12px" }}>
              <div style={{ fontSize: "22px", marginBottom: "5px" }}>{item.icon}</div>
              <div style={{ fontSize: "12px", color: "var(--c-text-muted)", fontWeight: 500 }}>{ar ? item.labelAr : item.labelEn}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
