"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const POINTS = [
  { icon: "📋", color: "#6366f1", titleEn: "Institutional Approval", titleAr: "موافقة لجنة الأخلاقيات",
    textEn: "Reviewed and approved by the Research Ethics Committee, Faculty of Medicine, Suez University",
    textAr: "تمت المراجعة والموافقة من لجنة أخلاقيات البحث بكلية الطب، جامعة السويس" },
  { icon: "🤝", color: "#10b981", titleEn: "Informed Consent", titleAr: "الموافقة المستنيرة",
    textEn: "Written informed consent obtained from all participants; entirely voluntary",
    textAr: "موافقة خطية مستنيرة من جميع المشاركين؛ طوعية تمامًا" },
  { icon: "🔒", color: "#8b5cf6", titleEn: "Data Confidentiality", titleAr: "سرية البيانات",
    textEn: "All data coded with strict confidentiality; identities remain anonymous",
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

      <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, justifyContent: "center" }}>
        {POINTS.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: ar ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 + i * 0.09, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.01, x: ar ? -3 : 3 }}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${p.color}28`,
              borderLeft: `3px solid ${p.color}`,
              borderRadius: 9, padding: "8px 14px",
            }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
              style={{
                width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                background: `${p.color}18`, border: `1px solid ${p.color}35`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15,
              }}>
              {p.icon}
            </motion.div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--c-text)", marginBottom: 1 }}>
                {ar ? p.titleAr : p.titleEn}
              </div>
              <div style={{ fontSize: "12px", color: "var(--c-text-muted)", lineHeight: 1.4 }}>
                {ar ? p.textAr : p.textEn}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
