"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const POINTS = [
  { icon: "🤝", color: "#10b981", titleEn: "Informed Consent", titleAr: "الموافقة المستنيرة",
    textEn: "Written informed consent obtained from all participants; participation was entirely voluntary",
    textAr: "موافقة خطية مستنيرة من جميع المشاركين؛ طوعية تمامًا" },
  { icon: "🔒", color: "#8b5cf6", titleEn: "Data Confidentiality", titleAr: "سرية البيانات",
    textEn: "All data coded with strict confidentiality; participant identities remain fully anonymous",
    textAr: "جميع البيانات مُرمَّزة بسرية تامة؛ الهويات مجهولة" },
  { icon: "🚪", color: "#06b6d4", titleEn: "Right to Withdraw", titleAr: "حق الانسحاب",
    textEn: "Participants retained the right to withdraw at any time without consequences",
    textAr: "حق الانسحاب في أي وقت دون أي عواقب" },
  { icon: "⚕️", color: "#f43f5e", titleEn: "Safety Monitoring", titleAr: "مراقبة السلامة",
    textEn: "Vital signs monitored continuously; adverse reactions managed immediately",
    textAr: "مراقبة مستمرة للعلامات الحيوية؛ التعامل الفوري مع التفاعلات السلبية" },
];

export default function EthicsSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "الاعتبارات الأخلاقية" : "Ethical Considerations"}</div>
        <h2 className="pres-h1" style={{ fontSize: "clamp(22px, 3vw, 36px)" }}>{ar ? "الاعتبارات " : "Ethical "}<em>{ar ? "الأخلاقية" : "Considerations"}</em></h2>
        <div className="pres-divider" />
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px", flex: 1, justifyContent: "center" }}>
        {POINTS.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: ar ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.11, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.015, x: ar ? -5 : 5 }}
            style={{
              display: "flex", alignItems: "center", gap: 18,
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${p.color}30`,
              borderLeft: `4px solid ${p.color}`,
              borderRadius: 12, padding: "16px 20px",
              boxShadow: `0 4px 20px ${p.color}12`,
            }}
          >
            <motion.div
              animate={{ rotate: [0, 6, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.5 }}
              style={{
                width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                background: `${p.color}20`, border: `1px solid ${p.color}40`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
              }}>
              {p.icon}
            </motion.div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--c-text)", marginBottom: 4 }}>
                {ar ? p.titleAr : p.titleEn}
              </div>
              <div style={{ fontSize: "14px", color: "var(--c-text-muted)", lineHeight: 1.55 }}>
                {ar ? p.textAr : p.textEn}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
