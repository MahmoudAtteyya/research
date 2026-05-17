"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang, SLIDES } from "@/lib/presentation/slides-data";
import { usePresentation } from "@/lib/presentation/usePresentation";

const GROUPS = [
  { labelEn: "Introduction",      labelAr: "المقدمة",          ids: ["intro-1","intro-2","intro-3"],             icon: "📖", color: "#6366f1" },
  { labelEn: "Aim & Objectives",  labelAr: "الهدف والأهداف",   ids: ["aim","hypothesis"],                        icon: "🎯", color: "#8b5cf6" },
  { labelEn: "Subjects & Methods",labelAr: "المواد والطرق",     ids: ["literature-1","literature-2","methods-1","methods-2","stat-analysis"], icon: "🔬", color: "#06b6d4" },
  { labelEn: "Ethics & Results",  labelAr: "الأخلاقيات والنتائج", ids: ["ethics","results-demo","results-vital-1","results-vital-2","results-cognitive"], icon: "📊", color: "#10b981" },
  { labelEn: "Discussion",        labelAr: "المناقشة",          ids: ["discussion"],                              icon: "💬", color: "#f59e0b" },
  { labelEn: "Conclusion & Recs", labelAr: "الخلاصة والتوصيات", ids: ["conclusion","recommendations"],            icon: "✅", color: "#f43f5e" },
];

export default function TOCSlide({ lang }: { lang: Lang }) {
  const { goToSlide } = usePresentation();
  const ar = lang === "ar";

  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "المحتويات" : "Agenda"}</div>
        <h2 className="pres-h2" style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}>{ar ? "جدول المحتويات" : "Table of Contents"}</h2>
        <div className="pres-divider" />
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", flex: 1, alignContent: "center" }}>
        {GROUPS.map((g, gi) => (
          <motion.div
            key={gi}
            className="pres-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.08 }}
            whileHover={{ scale: 1.03, y: -2 }}
            style={{ borderTop: `3px solid ${g.color}`, padding: "10px 12px", cursor: "pointer" }}
            onClick={() => {
              const idx = SLIDES.findIndex(s => s.id === g.ids[0]);
              if (idx >= 0) goToSlide(idx);
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <motion.span
                style={{ fontSize: "18px" }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: gi * 0.3 }}
              >{g.icon}</motion.span>
              <span style={{ fontSize: "13px", fontWeight: 700, color: g.color }}>{ar ? g.labelAr : g.labelEn}</span>
            </div>
            <div style={{ fontSize: "11px", color: "var(--c-text-dim)" }}>
              {g.ids.length} {ar ? "شرائح" : "slides"}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
