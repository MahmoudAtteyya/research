"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang, SLIDES } from "@/lib/presentation/slides-data";
import { usePresentation } from "@/lib/presentation/usePresentation";

const SECTIONS = [
  {
    num: "01",
    labelEn: "Introduction",
    labelAr: "المقدمة",
    descEn: "Background, significance & literature",
    descAr: "الخلفية، الأهمية والأدبيات",
    ids: ["intro-1", "intro-2", "intro-3"],
    icon: "📖",
    color: "#6366f1",
    gradient: "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(99,102,241,0.06))",
  },
  {
    num: "02",
    labelEn: "Aim & Objectives",
    labelAr: "الهدف والأهداف",
    descEn: "Research question & hypothesis",
    descAr: "السؤال البحثي والفرضية",
    ids: ["aim", "hypothesis"],
    icon: "🎯",
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.18), rgba(139,92,246,0.06))",
  },
  {
    num: "03",
    labelEn: "Subjects & Methods",
    labelAr: "المواد والأساليب",
    descEn: "Design, criteria, tools & analysis",
    descAr: "التصميم والمعايير والأدوات والتحليل",
    ids: ["methods-1", "methods-2", "data-tools", "stat-analysis"],
    icon: "🔬",
    color: "#06b6d4",
    gradient: "linear-gradient(135deg, rgba(6,182,212,0.18), rgba(6,182,212,0.06))",
  },
  {
    num: "04",
    labelEn: "Ethics",
    labelAr: "الاعتبارات الأخلاقية",
    descEn: "Consent, confidentiality & safety",
    descAr: "الموافقة والسرية والسلامة",
    ids: ["ethics"],
    icon: "⚕️",
    color: "#10b981",
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.18), rgba(16,185,129,0.06))",
  },
  {
    num: "05",
    labelEn: "Results",
    labelAr: "النتائج",
    descEn: "Vital signs & cognitive performance",
    descAr: "العلامات الحيوية والأداء المعرفي",
    ids: ["results-intro", "results-demo", "results-habits", "results-vital-1", "results-vital-2", "results-cognitive"],
    icon: "📊",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.18), rgba(245,158,11,0.06))",
  },
  {
    num: "06",
    labelEn: "Discussion & Conclusion",
    labelAr: "المناقشة والخلاصة",
    descEn: "Interpretation, conclusion & recommendations",
    descAr: "التفسير والخلاصة والتوصيات",
    ids: ["discussion", "conclusion", "recommendations"],
    icon: "✅",
    color: "#f43f5e",
    gradient: "linear-gradient(135deg, rgba(244,63,94,0.18), rgba(244,63,94,0.06))",
  },
];

export default function TOCSlide({ lang }: { lang: Lang }) {
  const { goToSlide } = usePresentation();
  const ar = lang === "ar";

  return (
    <div className="pres-slide-inner" style={{ direction: ar ? "rtl" : "ltr" }}>
      {/* ── Header ── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "جدول المحتويات" : "Agenda"}</div>
        <h2 className="pres-h2" style={{ fontSize: "clamp(20px, 2.6vw, 32px)" }}>
          {ar ? "مسار " : "Research "}<em className="grad-indigo">{ar ? "البحث" : "Roadmap"}</em>
        </h2>
        <div className="pres-divider" />
      </motion.div>

      {/* ── Sections grid — 3×2 ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          flex: 1,
          alignContent: "center",
        }}
      >
        {SECTIONS.map((sec, gi) => (
          <motion.div
            key={gi}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 + gi * 0.07, type: "spring", stiffness: 130 }}
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              const idx = SLIDES.findIndex((s) => s.id === sec.ids[0]);
              if (idx >= 0) goToSlide(idx);
            }}
            style={{
              background: sec.gradient,
              border: `1px solid ${sec.color}30`,
              borderRadius: "14px",
              padding: "14px 16px",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              boxShadow: `0 4px 20px ${sec.color}12`,
              transition: "box-shadow 0.25s",
            }}
          >
            {/* Top accent line */}
            <div style={{
              position: "absolute", top: 0, left: "12%", right: "12%", height: "2px",
              background: `linear-gradient(90deg, transparent, ${sec.color}, transparent)`,
              borderRadius: "1px",
            }} />

            {/* Section number */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <motion.span
                style={{
                  fontSize: "clamp(22px, 3vw, 34px)",
                  fontWeight: 900,
                  fontVariantNumeric: "tabular-nums",
                  background: `linear-gradient(135deg, ${sec.color}, ${sec.color}aa)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1,
                }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, delay: gi * 0.4 }}
              >
                {sec.num}
              </motion.span>
              <motion.span
                style={{ fontSize: "22px" }}
                animate={{ rotate: [0, 4, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: gi * 0.35 }}
              >
                {sec.icon}
              </motion.span>
            </div>

            {/* Title */}
            <div style={{
              fontSize: "clamp(11px, 1.1vw, 14px)",
              fontWeight: 800,
              color: "var(--c-text)",
              marginBottom: "5px",
              lineHeight: 1.3,
            }}>
              {ar ? sec.labelAr : sec.labelEn}
            </div>

            {/* Description */}
            <div style={{
              fontSize: "11px",
              color: "var(--c-text-muted)",
              lineHeight: 1.5,
              marginBottom: "10px",
              fontWeight: 400,
            }}>
              {ar ? sec.descAr : sec.descEn}
            </div>

            {/* Slide count badge */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              background: `${sec.color}18`,
              border: `1px solid ${sec.color}40`,
              borderRadius: "20px",
              padding: "2px 9px",
              fontSize: "10px",
              fontWeight: 700,
              color: sec.color,
            }}>
              <span style={{ fontSize: "8px" }}>◆</span>
              {sec.ids.length} {ar ? "شريحة" : "slides"}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Footer note ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{
          textAlign: "center",
          fontSize: "10px",
          color: "var(--c-text-dim)",
          paddingTop: "8px",
          letterSpacing: "0.5px",
        }}
      >
        {ar ? "انقر على أي قسم للانتقال إليه مباشرةً" : "Click any section to navigate directly"}
      </motion.div>
    </div>
  );
}
