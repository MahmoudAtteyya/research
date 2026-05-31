"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang, TEAM_MEMBERS } from "@/lib/presentation/slides-data";

const Symposium = "The Fourth Student Symposium for Research Projects, 2026";

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

      {/* ── Symposium banner ── */}
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
          {Symposium}
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

        {/* ── Members grid — Auto-fit Flex ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px 18px",
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
                whileHover={{ scale: 1.05, y: -2 }}
                style={{
                  background: `linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))`,
                  border: `1px solid rgba(255,255,255,0.08)`,
                  borderBottom: `2px solid ${color}80`,
                  borderRadius: "40px",
                  padding: "6px 16px 6px 6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "default",
                  boxShadow: `0 4px 12px rgba(0,0,0,0.1)`,
                  transition: "all 0.2s ease",
                  direction: ar ? "rtl" : "ltr",
                  whiteSpace: "nowrap",
                }}
              >
                {/* Avatar circle */}
                <div
                  style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                    background: `linear-gradient(135deg, ${color}, ${color}88)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "10px", fontWeight: 800, color: "#fff",
                    letterSpacing: "-0.5px",
                    boxShadow: `0 2px 6px ${color}66`,
                  }}
                >
                  {initials}
                </div>

                {/* Name */}
                <div style={{
                  fontSize: "13px", fontWeight: 700, color: "var(--c-text)",
                  letterSpacing: "0.2px"
                }}>
                  {name}
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
