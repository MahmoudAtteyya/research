"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Lang, SUPERVISORS } from "@/lib/presentation/slides-data";

const Symposium = "The Fourth Student Symposium for Research Projects, 2026";

// Map supervisor name → image file
const PHOTO_MAP: Record<string, string> = {
  "Prof Dr. Maysa Ibrahim": "/images/maysa.jpeg",
  "Dr. Mohamed Wagih Saleh": "/images/wagih.jpeg",
  "Dr. Nanees Kamel Hussein": "/images/nanees.jpeg",
  "Dr. Yosra Saeed Abdalla": "/images/yosra.jpeg",
};

const ROLE_CONFIG: Record<string, { color: string; badge: string }> = {
  "Direct Research Project Supervisor": {
    color: "#6366f1",
    badge: "Direct Supervisor",
  },
  "Research Year Supervisor": {
    color: "#8b5cf6",
    badge: "Research Year",
  },
  "General Research Projects Supervisor": {
    color: "#fbbf24",
    badge: "General Supervisor",
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardV = {
  hidden: { opacity: 0, scale: 0.95, x: 20 },
  show: { opacity: 1, scale: 1, x: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } },
};

export default function Cover3Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>

      {/* ── Ambient Background ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: "-20%", left: "-10%", width: "60%", height: "70%", borderRadius: "50%", background: "radial-gradient(circle, #fbbf2460, transparent 70%)" }} />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.15, 0.06] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "50%", height: "60%", borderRadius: "50%", background: "radial-gradient(circle, #6366f160, transparent 70%)" }} />
      </div>

      {/* ── Symposium banner ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{
          background: "linear-gradient(90deg, rgba(251,191,36,0.15), rgba(99,102,241,0.12))",
          borderBottom: "1px solid rgba(251,191,36,0.3)",
          padding: "8px 40px", textAlign: "center",
          flexShrink: 0, zIndex: 2, position: "relative",
        }}
      >
        <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(251,191,36,0.8)", marginRight: "6px" }}>
          🎓 {ar ? "يُقدَّم في" : "Presented at"}
        </span>
        <span style={{ fontSize: "clamp(11px,1.3vw,13.5px)", fontWeight: 800, color: "var(--c-text)" }}>{Symposium}</span>
      </motion.div>

      {/* ── Main content ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "clamp(12px, 2vh, 20px) 48px clamp(12px, 2vh, 16px)", gap: "clamp(12px, 2.5vh, 20px)", zIndex: 2, minHeight: 0 }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}
        >
          <div>
            <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase", color: "#fbbf24", marginBottom: "4px" }}>
              {ar ? "تحت إشراف" : "Under the Supervision of"}
            </div>
            <h2 style={{ margin: 0, fontSize: "clamp(24px,3vw,36px)", fontWeight: 900, color: "var(--c-text)", lineHeight: 1.15 }}>
              {ar ? "المشرفون" : "Supervisors"}
            </h2>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.5 }}
              style={{ width: 60, height: 3, borderRadius: 2, background: "linear-gradient(90deg, #fbbf24, #fde68a)", marginTop: 8, transformOrigin: ar ? "right" : "left" }} />
          </div>

          {/* University logos */}
          <motion.div style={{ display: "flex", alignItems: "center", gap: 16 }}
            initial={{ opacity: 0, x: ar ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          >
            <motion.img src="/university.svg" alt="Suez University"
              animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 70, height: 70, objectFit: "contain", filter: "drop-shadow(0 4px 16px rgba(251,191,36,0.35))" }} />
            <div style={{ width: 1, height: 45, background: "linear-gradient(to bottom, transparent, rgba(251,191,36,0.5), transparent)" }} />
            <motion.img src="/faculty.svg" alt="Faculty"
              animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              style={{ width: 70, height: 70, objectFit: "cover", borderRadius: "50%", background: "white", filter: "drop-shadow(0 4px 16px rgba(99,102,241,0.3))" }} />
          </motion.div>
        </motion.div>

        {/* ── Supervisor Cards: 2×2 grid with HORIZONTAL layout ── */}
        <motion.div
          variants={container} initial="hidden" animate="show"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(12px, 2.5vh, 24px)", flex: 1, minHeight: 0 }}
        >
          {SUPERVISORS.map((s, i) => {
            const cfg = ROLE_CONFIG[s.roleEn] ?? { color: "#6366f1", badge: "Supervisor" };
            const photo = PHOTO_MAP[s.name];
            const badgeText = ar ? s.roleAr : cfg.badge;

            return (
              <motion.div
                key={i}
                variants={cardV}
                whileHover={{ scale: 1.02, x: ar ? -4 : 4 }}
                style={{
                  display: "flex", flexDirection: ar ? "row-reverse" : "row", alignItems: "center", gap: "clamp(16px, 2vw, 24px)",
                  background: `linear-gradient(${ar ? "-90deg" : "90deg"}, ${cfg.color}15 0%, rgba(255,255,255,0.02) 100%)`,
                  border: `1px solid ${cfg.color}35`,
                  borderLeft: ar ? "none" : `4px solid ${cfg.color}`,
                  borderRight: ar ? `4px solid ${cfg.color}` : "none",
                  borderRadius: "24px",
                  padding: "clamp(12px, 2vh, 20px) clamp(16px, 2vw, 24px)",
                  backdropFilter: "blur(12px)",
                  position: "relative", overflow: "hidden",
                  boxShadow: `0 10px 40px ${cfg.color}12`,
                  textAlign: ar ? "right" : "left",
                }}
              >
                {/* Ambient glow behind image */}
                <motion.div
                  animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                  style={{ position: "absolute", [ar ? "right" : "left"]: "5%", width: "120px", height: "120px", borderRadius: "50%", background: `${cfg.color}40`, filter: "blur(45px)", pointerEvents: "none" }}
                />

                {/* Big Photo (Unrestricted vertically) */}
                <motion.div
                  style={{
                    width: "clamp(90px, 22vh, 160px)", height: "clamp(90px, 22vh, 160px)", borderRadius: "50%", flexShrink: 0,
                    border: `3px solid ${cfg.color}80`,
                    padding: "4px",
                    background: `linear-gradient(135deg, ${cfg.color}40, transparent)`,
                    position: "relative",
                    boxShadow: `0 8px 24px ${cfg.color}40`,
                  }}
                >
                  <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", position: "relative", background: "rgba(0,0,0,0.5)" }}>
                    {photo ? (
                      <Image src={photo} alt={s.name} fill style={{ objectFit: "cover", objectPosition: "top" }} unoptimized />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px" }}>🎓</div>
                    )}
                  </div>
                </motion.div>

                {/* Info Text */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: ar ? "flex-end" : "flex-start", gap: "6px", minWidth: 0 }}>
                  <div style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    background: `${cfg.color}1a`,
                    border: `1px solid ${cfg.color}40`,
                    borderRadius: "20px",
                    fontSize: "clamp(9px, 1.1vw, 11px)", fontWeight: 800, color: cfg.color,
                    letterSpacing: "1px", textTransform: "uppercase",
                  }}>
                    {badgeText}
                  </div>

                  <div style={{
                    fontSize: "clamp(16px, 1.8vw, 24px)", fontWeight: 800,
                    color: "var(--c-text)", lineHeight: 1.2,
                    marginTop: "4px"
                  }}>
                    {s.name}
                  </div>

                  <div style={{ fontSize: "clamp(12px, 1.4vw, 15px)", fontWeight: 500, color: "var(--c-text-muted)", lineHeight: 1.4 }}>
                    {ar ? s.roleAr : s.roleEn}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
