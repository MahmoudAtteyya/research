"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang, TEAM_MEMBERS } from "@/lib/presentation/slides-data";

const CONFERENCE = "The Fourth Student Conference for Research Projects, 2026";

// Assign colors cycling through accent palette
const COLORS = [
  "#6366f1", "#8b5cf6", "#06b6d4", "#10b981",
  "#f43f5e", "#f59e0b", "#6366f1", "#8b5cf6",
  "#06b6d4", "#10b981", "#f43f5e", "#f59e0b",
  "#6366f1", "#8b5cf6", "#06b6d4", "#10b981",
];

// Get initials from full name
function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const cardVariant = {
  hidden: { opacity: 0, scale: 0.9, y: 8 },
  show: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Cover2Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* ── Conference banner ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.14) 100%)",
          borderBottom: "1px solid rgba(99,102,241,0.35)",
          padding: "8px 40px",
          textAlign: "center",
          backdropFilter: "blur(10px)",
          flexShrink: 0,
        }}
      >
        <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(165,180,252,0.7)", marginBottom: "1px" }}>
          🎓 {ar ? "يُقدَّم في" : "Presented at"}
        </div>
        <div style={{ fontSize: "clamp(11px, 1.3vw, 14px)", fontWeight: 800, color: "var(--c-text)" }}>
          {CONFERENCE}
        </div>
      </motion.div>

      {/* ── Main area ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "12px 36px 10px" }}>

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}
        >
          <div>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--c-indigo)", marginBottom: "3px" }}>
              {ar ? "أعضاء الفريق البحثي" : "Research Team Members"}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span style={{ fontSize: "clamp(18px, 2.2vw, 26px)", fontWeight: 800, color: "var(--c-text)" }}>
                {ar ? "المجموعة" : "Group"}
              </span>
              <motion.span
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  fontSize: "clamp(22px, 2.8vw, 32px)", fontWeight: 900,
                  background: "linear-gradient(135deg, var(--c-indigo), var(--c-cyan))",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}
              >6</motion.span>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.25, duration: 0.55 }}
              style={{
                width: 44, height: 3, borderRadius: 2,
                background: "linear-gradient(90deg, var(--c-indigo), var(--c-violet))",
                marginTop: "6px",
                transformOrigin: ar ? "right" : "left",
              }}
            />
          </div>

          {/* Member count pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(99,102,241,0.06)",
              border: "1px solid rgba(99,102,241,0.2)",
              borderRadius: "30px",
              padding: "6px 16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <span style={{ fontSize: "18px" }}>👥</span>
            <div style={{ textAlign: ar ? "right" : "left" }}>
              <div style={{ fontSize: "20px", fontWeight: 900, color: "var(--c-indigo)", lineHeight: 1 }}>
                {TEAM_MEMBERS.length}
              </div>
              <div style={{ fontSize: "9px", color: "var(--c-text-dim)", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>
                {ar ? "عضواً" : "Members"}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Members grid — 4 columns ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
            flex: 1,
            alignContent: "center",
          }}
        >
          {TEAM_MEMBERS.map((name, i) => {
            const color = COLORS[i % COLORS.length];
            const initials = getInitials(name);

            return (
              <motion.div
                key={i}
                variants={cardVariant}
                whileHover={{ scale: 1.03, y: -2 }}
                style={{
                  background: `linear-gradient(145deg, ${color}08, transparent)`,
                  border: `1px solid ${color}25`,
                  borderRadius: "14px",
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "default",
                  boxShadow: `0 4px 16px ${color}05`,
                  transition: "all 0.25s ease",
                  position: "relative",
                  overflow: "hidden",
                  direction: ar ? "rtl" : "ltr",
                }}
              >
                {/* Side accent line */}
                <div style={{
                  position: "absolute", top: "15%", bottom: "15%", left: ar ? "auto" : 0, right: ar ? 0 : "auto", width: "3px",
                  background: `linear-gradient(to bottom, transparent, ${color}80, transparent)`,
                  borderRadius: "2px",
                }} />

                {/* Avatar circle */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.15 }}
                  style={{
                    width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                    background: `linear-gradient(135deg, ${color}33, ${color}11)`,
                    border: `1.5px solid ${color}66`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "11px", fontWeight: 800, color: color,
                    letterSpacing: "-0.5px",
                    boxShadow: `inset 0 2px 4px ${color}22`,
                  }}
                >
                  {initials}
                </motion.div>

                {/* Name */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: "12.5px", fontWeight: 600, color: "var(--c-text)",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    lineHeight: 1.3,
                  }}>
                    {name}
                  </div>
                  {/* Subtle underline dot */}
                  <div style={{
                    width: "4px", height: "4px",
                    background: color,
                    borderRadius: "50%",
                    marginTop: "3px",
                    opacity: 0.6,
                  }} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Bottom note ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            textAlign: "center",
            fontSize: "10px",
            color: "var(--c-text-dim)",
            paddingTop: "12px",
            letterSpacing: "0.5px",
          }}
        >
          {ar
            ? "طلاب السنة الدراسية الخامسة — كلية الطب — جامعة السويس"
            : "5th Year Medical Students — Faculty of Medicine — Suez University"}
        </motion.div>
      </div>
    </div>
  );
}
