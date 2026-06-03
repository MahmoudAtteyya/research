"use client";
import React from "react";
import { motion, type Variants } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const DESIGN_CARDS = [
  {
    icon: "🔬",
    labelEn: "Study Design",
    labelAr: "تصميم الدراسة",
    valueEn: "Pre-Post Experimental",
    valueAr: "تجريبية قبلية-بعدية",
    color: "#6366f1",
    glow: "rgba(99,102,241,0.18)",
  },
  {
    icon: "🏥",
    labelEn: "Setting",
    labelAr: "الموقع",
    valueEn: "Suez University & Suez University Hospital",
    valueAr: "جامعة السويس ومستشفى جامعة السويس",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.18)",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, type: "spring" as const, stiffness: 110 },
  }),
};

export default function Methods1Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  return (
    <div className="pres-slide-inner" style={{ direction: ar ? "rtl" : "ltr" }}>

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ flexShrink: 0, marginBottom: "18px" }}
      >
        <div className="pres-label">{ar ? "الطرق" : "Methods"} · 1 / 4</div>
        <h2 className="pres-h1">
          {ar ? "تصميم " : "Study "}
          <em>{ar ? "الدراسة والموقع" : "Design & Setting"}</em>
        </h2>
        <div className="pres-divider" />
      </motion.div>

      {/* ── Body ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px", minHeight: 0, justifyContent: "center" }}>

        {/* Two Design Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          {DESIGN_CARDS.map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="show"
              whileHover={{ scale: 1.025, y: -4, transition: { type: "spring" as const, stiffness: 300 } }}
              style={{
                background: `linear-gradient(145deg, ${card.glow}, rgba(255,255,255,0.01))`,
                border: `1px solid ${card.color}35`,
                borderTop: `3px solid ${card.color}`,
                borderRadius: "18px",
                padding: "22px 20px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                boxShadow: `0 8px 32px ${card.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Background glow orb */}
              <div style={{
                position: "absolute",
                top: "-20px",
                right: ar ? undefined : "-20px",
                left: ar ? "-20px" : undefined,
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${card.color}20, transparent 70%)`,
                pointerEvents: "none",
              }} />

              {/* Icon */}
              <motion.div
                animate={{ scale: [1, 1.12, 1], rotate: [0, 4, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
                style={{
                  fontSize: "clamp(36px, 5.1vw, 65px)",
                  flexShrink: 0,
                  lineHeight: 1,
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                }}
              >
                {card.icon}
              </motion.div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: "9.5px",
                  fontWeight: 800,
                  color: card.color,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "6px",
                  opacity: 0.9,
                }}>
                  {ar ? card.labelAr : card.labelEn}
                </div>
                <div style={{
                  fontSize: "15.5px",
                  fontWeight: 800,
                  color: "var(--c-text)",
                  lineHeight: 1.35,
                }}>
                  {ar ? card.valueAr : card.valueEn}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Study Population Block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, type: "spring" as const, stiffness: 100 }}
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.10) 0%, rgba(6,182,212,0.06) 60%, rgba(16,185,129,0.04) 100%)",
            border: "1px solid rgba(99,102,241,0.28)",
            borderRadius: "18px",
            padding: "22px 26px",
            display: "flex",
            gap: "18px",
            alignItems: "center",
            boxShadow: "0 10px 40px rgba(99,102,241,0.1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Left accent bar */}
          <div style={{
            position: "absolute",
            top: 0,
            [ar ? "right" : "left"]: 0,
            width: "4px",
            height: "100%",
            background: "linear-gradient(180deg, #6366f1, #06b6d4, #10b981)",
            borderRadius: "18px 0 0 18px",
          }} />

          {/* Icon */}
          <motion.div
            animate={{ rotate: [0, 6, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontSize: "clamp(40px, 5.5vw, 71px)", flexShrink: 0, lineHeight: 1 }}
          >
            🧑‍🤝‍🧑
          </motion.div>

          {/* Content */}
          <div style={{ flex: 1 }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "10px",
            }}>
              <span style={{
                fontSize: "clamp(10px, 1.4vw, 18px)",
                fontWeight: 800,
                color: "#a5b4fc",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}>
                {ar ? "مجتمع الدراسة" : "Study Population"}
              </span>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(165,180,252,0.4), transparent)" }} />
            </div>
            <p style={{
              margin: 0,
              fontSize: "clamp(14px, 2.0vw, 26px)",
              color: "var(--c-text)",
              lineHeight: 1.8,
              fontWeight: 450,
            }}>
              {ar
                ? "تألّف مجتمع الدراسة من متطوعين بالغين أصحاء من جامعة السويس ومستشفى جامعة السويس. واختِيروا ليمثّلوا البالغين الذين يستهلكون مشروبات الطاقة بصفة منتظمة أو قد يُقبلون على استهلاكها."
                : "The study population consisted of healthy adult volunteers from Suez University and Suez University Hospital. Participants were selected to represent adults who are regular consumers or potential consumers of energy drinks."}
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
