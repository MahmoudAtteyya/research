"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang, SUPERVISORS, TEAM_MEMBERS } from "@/lib/presentation/slides-data";

export default function ThankYouSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div className="pres-slide-inner pres-cover" style={{ justifyContent: "center" }}>
      {/* Glow orb */}
      <div style={{
        position: "absolute", width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none",
      }} />

      {/* Logos */}
      <motion.div className="pres-cover-logos" initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} style={{ marginBottom: "24px" }}>
        <img src="/university.svg" alt="Suez University" className="pres-cover-logo" style={{ width: 70, height: 70 }} />
        <div className="pres-cover-sep" style={{ height: 50 }} />
        <img src="/faculty.svg" alt="Faculty" className="pres-cover-logo" style={{ width: 70, height: 70 }} />
      </motion.div>

      {/* Icon */}
      <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, type: "spring" }}
        style={{ fontSize: "60px", marginBottom: "12px" }}>🙏</motion.div>

      {/* Title */}
      <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
        style={{ fontSize: "clamp(36px,6vw,64px)", fontWeight: 900, color: "var(--c-text)", letterSpacing: "-1px", marginBottom: "8px" }}>
        {ar ? "شكراً لكم" : "Thank You"}
      </motion.h1>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
        style={{ fontSize: "15px", color: "var(--c-text-muted)", marginBottom: "28px" }}>
        {ar ? "نحن مستعدون للإجابة على أسئلتكم" : "We are ready for your questions"}
      </motion.div>

      <div className="pres-cover-sep-line" />

      {/* Group */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
        style={{ textAlign: "center", marginBottom: "20px" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--c-gold)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "4px" }}>
          {ar ? "المجموعة السادسة — الدفعة الخامسة" : "Group 6 · 5th Year Batch"}
        </div>
        <div style={{ fontSize: "11px", color: "var(--c-text-dim)" }}>
          {ar ? "كلية الطب — جامعة السويس — 2021/2026" : "Faculty of Medicine · Suez University · 2021 / 2026"}
        </div>
      </motion.div>

      {/* Supervisors */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
        <div style={{ fontSize: "10px", color: "var(--c-text-dim)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", textAlign: "center" }}>
          {ar ? "تحت إشراف" : "Supervised by"}
        </div>
        <div className="pres-cover-sups">
          {SUPERVISORS.map((s, i) => <div key={i} className="pres-sup-chip" style={{ fontSize: "10px" }}>{s.name}</div>)}
        </div>
      </motion.div>
    </div>
  );
}
