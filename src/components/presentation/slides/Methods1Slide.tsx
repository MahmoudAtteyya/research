"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

/* ─── Design meta-data ────────────────────────────────────────── */
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
  {
    icon: "👥",
    labelEn: "Sample Size",
    labelAr: "حجم العينة",
    valueEn: "47 Healthy Adult Volunteers",
    valueAr: "47 متطوعاً بالغاً سليماً",
    color: "#10b981",
    glow: "rgba(16,185,129,0.18)",
  },
  {
    icon: "🎯",
    labelEn: "Sampling Method",
    labelAr: "أسلوب أخذ العينات",
    valueEn: "Convenience Sampling",
    valueAr: "أخذ عينات ملائمة",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.18)",
  },
];

export default function Methods1Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  return (
    <div className="pres-slide-inner">
      {/* ── Header ── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "الطرق" : "Methods"} · 1 / 3</div>
        <h2 className="pres-h1">
          {ar ? "تصميم " : "Study "}
          <em>{ar ? "الدراسة" : "Design"}</em>
        </h2>
        <div className="pres-divider" />
      </motion.div>

      {/* ── Body: design cards + population block ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          flex: 1,
          justifyContent: "center",
          direction: ar ? "rtl" : "ltr",
        }}
      >
        {/* Top row — 4 info cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
          }}
        >
          {DESIGN_CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, type: "spring", stiffness: 120 }}
              whileHover={{ scale: 1.04, y: -3 }}
              style={{
                background: `linear-gradient(145deg, ${card.glow} 0%, rgba(255,255,255,0.02) 100%)`,
                border: `1px solid ${card.color}44`,
                borderTop: `3px solid ${card.color}`,
                borderRadius: "14px",
                padding: "14px 12px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                boxShadow: `0 4px 20px ${card.glow}`,
                cursor: "default",
              }}
            >
              <motion.span
                style={{ fontSize: "22px" }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.25 }}
              >
                {card.icon}
              </motion.span>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: card.color,
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                }}
              >
                {ar ? card.labelAr : card.labelEn}
              </div>
              <div
                style={{
                  fontSize: "12.5px",
                  color: "var(--c-text)",
                  fontWeight: 600,
                  lineHeight: 1.4,
                }}
              >
                {ar ? card.valueAr : card.valueEn}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Study Population block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 110 }}
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.10) 0%, rgba(6,182,212,0.06) 100%)",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: "16px",
            padding: "18px 22px",
            display: "flex",
            gap: "16px",
            alignItems: "flex-start",
            boxShadow: "0 6px 32px rgba(99,102,241,0.12)",
          }}
        >
          {/* Icon column */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              fontSize: "32px",
              flexShrink: 0,
              lineHeight: 1,
              marginTop: "2px",
            }}
          >
            🧑‍🤝‍🧑
          </motion.div>

          {/* Text column */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  width: "4px",
                  height: "20px",
                  borderRadius: "2px",
                  background: "linear-gradient(180deg, #6366f1, #06b6d4)",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "#a5b4fc",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                {ar ? "مجتمع الدراسة" : "Study Population"}
              </span>
            </div>
            <p
              style={{
                fontSize: "13.5px",
                color: "var(--c-text)",
                lineHeight: 1.75,
                margin: 0,
                fontWeight: 450,
              }}
            >
              {ar
                ? "تألّف مجتمع الدراسة من متطوعين بالغين أصحاء من جامعة السويس ومستشفى جامعة السويس. واختِيروا ليمثّلوا البالغين الذين يستهلكون مشروبات الطاقة بصفة منتظمة أو قد يُقبلون على استهلاكها."
                : "The study population consisted of healthy adult volunteers from Suez University and Suez University and Suez University Hospital. Participants were selected to represent adults who are regular consumers or potential consumers of energy drinks."}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
