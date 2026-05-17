"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const POINTS = [
  {
    icon: "📋", color: "#6366f1",
    titleEn: "Institutional Approval", titleAr: "موافقة لجنة الأخلاقيات",
    textEn: "The study was reviewed and approved by the Research Ethics Committee of the Faculty of Medicine, Suez University",
    textAr: "تمت مراجعة الدراسة والموافقة عليها من قِبَل لجنة أخلاقيات البحث في كلية الطب، جامعة السويس",
  },
  {
    icon: "🤝", color: "#10b981",
    titleEn: "Informed Consent", titleAr: "الموافقة المستنيرة",
    textEn: "Written informed consent was obtained from all participants; participation was entirely voluntary",
    textAr: "تم الحصول على موافقة خطية مستنيرة من جميع المشاركين؛ كانت المشاركة طوعية تمامًا",
  },
  {
    icon: "🔒", color: "#8b5cf6",
    titleEn: "Data Confidentiality", titleAr: "سرية البيانات",
    textEn: "All data was coded with strict confidentiality; participants' identities remain anonymous",
    textAr: "تم ترميز جميع البيانات بسرية تامة؛ وتظل هويات المشاركين مجهولة",
  },
  {
    icon: "🚪", color: "#06b6d4",
    titleEn: "Right to Withdraw", titleAr: "حق الانسحاب",
    textEn: "Participants retained the right to withdraw at any time without consequences",
    textAr: "احتفظ المشاركون بحق الانسحاب في أي وقت دون أي عواقب",
  },
  {
    icon: "⚕️", color: "#f43f5e",
    titleEn: "Safety Monitoring", titleAr: "مراقبة السلامة",
    textEn: "Vital signs were monitored continuously; participants with adverse reactions were excluded and referred for care",
    textAr: "تمت مراقبة العلامات الحيوية باستمرار؛ وتم استبعاد من أظهروا تفاعلات سلبية وإحالتهم للرعاية",
  },
];

export default function EthicsSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 10 }}>
        <div className="pres-label">{ar ? "الاعتبارات الأخلاقية" : "Ethical Considerations"}</div>
        <h2 className="pres-h1">{ar ? "الاعتبارات " : "Ethical "}<em>{ar ? "الأخلاقية" : "Considerations"}</em></h2>
        <div className="pres-divider" />
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, justifyContent: "center" }}>
        {POINTS.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: ar ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 + i * 0.09, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "flex", alignItems: "center", gap: 14,
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${p.color}28`,
              borderLeft: `3px solid ${p.color}`,
              borderRadius: 9, padding: "9px 14px",
            }}
          >
            <div style={
              { width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                background: `${p.color}18`, border: `1px solid ${p.color}35`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
              }}>
              {p.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--c-text)", marginBottom: 1 }}>
                {ar ? p.titleAr : p.titleEn}
              </div>
              <div style={{ fontSize: "11px", color: "var(--c-text-muted)", lineHeight: 1.4 }}>
                {ar ? p.textAr : p.textEn}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
