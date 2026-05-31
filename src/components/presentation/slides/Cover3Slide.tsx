"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang, SUPERVISORS } from "@/lib/presentation/slides-data";

const Symposium = "The Fourth Student Symposium for Research Projects, 2026";

const ROLE_CONFIG: Record<string, { icon: string; color: string; gradient: string }> = {
  "Direct Research Project Supervisor": { icon: "🔬", color: "#6366f1", gradient: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(99,102,241,0.05))" },
  "Research Year Supervisor": { icon: "📚", color: "#8b5cf6", gradient: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.05))" },
  "General Research Projects Supervisor": { icon: "🏛️", color: "#fbbf24", gradient: "linear-gradient(135deg, rgba(251,191,36,0.15), rgba(251,191,36,0.05))" },
};

export default function Cover3Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>

      {/* Symposium Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.14) 100%)",
          borderBottom: "1px solid rgba(99,102,241,0.35)",
          padding: "10px 40px", textAlign: "center",
          backdropFilter: "blur(10px)", flexShrink: 0, zIndex: 2, position: "relative",
        }}
      >
        <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(165,180,252,0.7)", marginBottom: "2px" }}>
          🎓 {ar ? "يُقدَّم في" : "Presented at"}
        </div>
        <div style={{ fontSize: "clamp(12px, 1.4vw, 15px)", fontWeight: 800, color: "var(--c-text)" }}>
          {Symposium}
        </div>
      </motion.div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 52px 12px", gap: "14px", position: "relative", zIndex: 2 }}>

        {/* Header with logos */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: 4 }}>
              {ar ? "تحت إشراف" : "Under the Supervision of"}
            </div>
            <div style={{ fontSize: "clamp(22px, 2.8vw, 34px)", fontWeight: 800, color: "var(--c-text)" }}>
              {ar ? "المشرفون" : "Supervisors"}
            </div>
            <div style={{ width: 52, height: 3, borderRadius: 2, background: "linear-gradient(90deg, #fbbf24, #fde68a)", marginTop: 8 }} />
          </div>

          {/* Logos — bigger on this slide */}
          <motion.div
            style={{ display: "flex", alignItems: "center", gap: 16 }}
            initial={{ opacity: 0, x: ar ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "relative" }}
            >
              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ position: "absolute", inset: -6, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.18), transparent 70%)" }}
              />
              <img src="/university.svg" alt="Suez University"
                style={{ width: 68, height: 68, objectFit: "contain", filter: "drop-shadow(0 4px 16px rgba(251,191,36,0.3))", position: "relative" }} />
            </motion.div>
            <div style={{ width: 1, height: 44, background: "linear-gradient(to bottom, transparent, rgba(251,191,36,0.4), transparent)" }} />
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              style={{ position: "relative" }}
            >
              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                style={{ position: "absolute", inset: -6, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%)" }}
              />
              <img src="/faculty.svg" alt="Faculty"
                style={{ width: 68, height: 68, objectFit: "contain", filter: "drop-shadow(0 4px 16px rgba(99,102,241,0.3))", position: "relative" }} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Supervisor Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, flex: 1, alignContent: "center" }}>
          {SUPERVISORS.map((s, i) => {
            const cfg = ROLE_CONFIG[s.roleEn] ?? { icon: "🎓", color: "#6366f1", gradient: "linear-gradient(135deg, rgba(99,102,241,0.1), transparent)" };
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.03, y: -3 }}
                style={{
                  display: "flex", alignItems: "center", gap: 16,
                  background: cfg.gradient,
                  border: `1px solid ${cfg.color}33`,
                  borderLeft: `4px solid ${cfg.color}`,
                  borderRadius: 14, padding: "18px 20px",
                  backdropFilter: "blur(12px)", cursor: "default",
                  position: "relative", overflow: "hidden",
                }}
              >
                {/* Subtle bg shimmer */}
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 1.2, ease: "easeInOut" }}
                  style={{
                    position: "absolute", top: 0, left: 0, width: "40%", height: "100%",
                    background: `linear-gradient(90deg, transparent, ${cfg.color}08, transparent)`,
                    pointerEvents: "none",
                  }}
                />

                <motion.div
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: i * 0.6 }}
                  style={{
                    width: 50, height: 50, borderRadius: 14, flexShrink: 0,
                    background: `${cfg.color}20`, border: `1px solid ${cfg.color}50`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
                  }}>
                  {cfg.icon}
                </motion.div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--c-text)", marginBottom: 4, lineHeight: 1.3 }}>
                    {s.name}
                  </div>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: cfg.color, letterSpacing: "0.3px", lineHeight: 1.4 }}>
                    {ar ? s.roleAr : s.roleEn}
                  </div>
                </div>

                {/* Glowing dot */}
                <motion.div
                  animate={{ boxShadow: [`0 0 4px ${cfg.color}50`, `0 0 14px ${cfg.color}90`, `0 0 4px ${cfg.color}50`] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                  style={{ width: 8, height: 8, borderRadius: "50%", background: cfg.color, flexShrink: 0 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
