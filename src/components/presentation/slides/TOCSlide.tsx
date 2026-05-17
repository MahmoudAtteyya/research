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
        <h2 className="pres-h2">{ar ? "جدول المحتويات" : "Table of Contents"}</h2>
        <div className="pres-divider" />
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", flex: 1, alignContent: "start" }}>
        {GROUPS.map((g, gi) => (
          <motion.div
            key={gi}
            className="pres-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.08 }}
            style={{ borderTop: `3px solid ${g.color}`, padding: "12px 16px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ fontSize: "16px" }}>{g.icon}</span>
              <span style={{ fontSize: "12px", fontWeight: 700, color: g.color }}>{ar ? g.labelAr : g.labelEn}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {g.ids.map(id => {
                const slide = SLIDES.find(s => s.id === id);
                const idx   = SLIDES.findIndex(s => s.id === id);
                return slide ? (
                  <div
                    key={id}
                    className="pres-toc-item"
                    onClick={() => goToSlide(idx)}
                    style={{ padding: "5px 8px" }}
                  >
                    <div className="pres-toc-num" style={{ width: 22, height: 22, fontSize: "10px" }}>{idx + 1}</div>
                    <span style={{ fontSize: "11px", color: "var(--c-text-muted)" }}>
                      {ar ? slide.titleAr : slide.titleEn}
                    </span>
                  </div>
                ) : null;
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
        style={{ marginTop: "10px", textAlign: "center", fontSize: "11px", color: "var(--c-text-dim)" }}
      >
        ← → · Space · F {ar ? "للتنقل والشاشة الكاملة" : "to navigate & fullscreen"}
      </motion.div>
    </div>
  );
}
