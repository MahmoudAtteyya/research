"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const LIMITATIONS = [
  {
    icon: "👥",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.15)",
    categoryEn: "Sample Size",
    categoryAr: "حجم العينة",
    textEn: "The relatively small sample size may limit the generalizability of the findings.",
    textAr: "قد يُحدّ حجم العينة الصغير نسبياً من قابلية تعميم النتائج على مجتمعات أوسع.",
  },
  {
    icon: "⏱️",
    color: "#6366f1",
    glow: "rgba(99,102,241,0.15)",
    categoryEn: "Time Frame",
    categoryAr: "الإطار الزمني",
    textEn: "The study assessed only the immediate effects of energy drink consumption.",
    textAr: "اقتصر التقييم على التأثيرات الفورية لاستهلاك مشروبات الطاقة دون رصد التأثيرات طويلة الأمد.",
  },
  {
    icon: "❤️",
    color: "#ef4444",
    glow: "rgba(239,68,68,0.15)",
    categoryEn: "Cardiac Monitoring",
    categoryAr: "مراقبة القلب الكهربائية",
    textEn: "Cardiac electrical activity was not evaluated; therefore, potential electrophysiological effects associated with palpitations could not be assessed.",
    textAr: "لم يتم تقييم النشاط الكهربائي للقلب؛ لذا لم يكن بالإمكان تقييم التأثيرات الفيزيولوجية الكهربائية المرتبطة بالخفقان.",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 14 } },
};

export default function LimitationsSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  return (
    <div className="pres-slide-inner" style={{ direction: ar ? "rtl" : "ltr" }}>

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ flexShrink: 0 }}
      >
        <div className="pres-label">{ar ? "التحليل الناقد" : "Limitations"}</div>
        <h2 className="pres-h1">
          {ar ? "محدودية " : "Study "}
          <em>{ar ? "الدراسة" : "Limitations"}</em>
        </h2>
        <div className="pres-divider" />
      </motion.div>

      {/* ── Cards ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ flex: 1, display: "flex", flexDirection: "column", gap: "14px", justifyContent: "center" }}
      >
        {LIMITATIONS.map((lim, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{ scale: 1.015, x: ar ? -6 : 6 }}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "18px",
              background: `linear-gradient(135deg, ${lim.glow}, rgba(255,255,255,0.01))`,
              border: `1px solid ${lim.color}30`,
              borderLeft: ar ? undefined : `4px solid ${lim.color}`,
              borderRight: ar ? `4px solid ${lim.color}` : undefined,
              borderRadius: "16px",
              padding: "20px 22px",
              boxShadow: `0 6px 28px ${lim.glow}`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background number watermark */}
            <div style={{
              position: "absolute",
              [ar ? "left" : "right"]: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "clamp(60px, 6.6vw, 107px)",
              fontWeight: 900,
              color: `${lim.color}08`,
              lineHeight: 1,
              pointerEvents: "none",
              userSelect: "none",
            }}>
              {i + 1}
            </div>

            {/* Icon bubble */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 4, -4, 0] }}
              transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                flexShrink: 0,
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                background: `${lim.color}18`,
                border: `1.5px solid ${lim.color}35`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "clamp(24px, 3.7vw, 43px)",
                boxShadow: `0 4px 14px ${lim.glow}`,
              }}
            >
              {lim.icon}
            </motion.div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Category badge */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span style={{
                  display: "inline-block",
                  padding: "2px 10px",
                  background: `${lim.color}18`,
                  border: `1px solid ${lim.color}35`,
                  borderRadius: "20px",
                  fontSize: "9.5px",
                  fontWeight: 800,
                  color: lim.color,
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                }}>
                  {ar ? lim.categoryAr : lim.categoryEn}
                </span>
                <div style={{ flex: 1, height: "1px", background: `linear-gradient(${ar ? "to left" : "to right"}, ${lim.color}40, transparent)` }} />
              </div>

              {/* Text */}
              <p style={{
                margin: 0,
                fontSize: "clamp(14px, 2.0vw, 26px)",
                color: "var(--c-text)",
                lineHeight: 1.75,
                fontWeight: 430,
              }}>
                {ar ? lim.textAr : lim.textEn}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Bottom note ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        style={{
          flexShrink: 0,
          textAlign: "center",
          marginTop: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "8px 16px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "10px",
        }}
      >
        <span style={{ fontSize: "clamp(14px, 2.0vw, 26px)" }}>💡</span>
        <span style={{ fontSize: "clamp(11px, 1.5vw, 20px)", color: "var(--c-text-muted)", fontStyle: "italic" }}>
          {ar
            ? "تُوجّه هذه المحدودية الدراسات المستقبلية نحو عينات أكبر وتقييمات أكثر شمولاً"
            : "These limitations guide future research toward larger samples and more comprehensive assessments"}
        </span>
      </motion.div>

    </div>
  );
}
