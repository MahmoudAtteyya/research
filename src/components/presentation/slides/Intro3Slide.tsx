"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const COMPONENTS = [
  { name: "Caffeine",   nameAr: "الكافيين",     effect: "Central Nervous System Stimulant", effectAr: "محفّز الجهاز العصبي المركزي", dose: "80–150 mg / can", color: "#e11d48", pct: 90 },
  { name: "Taurine",    nameAr: "التورين",      effect: "Cardiac & Neurological Modulation", effectAr: "تنظيم قلبي وعصبي",              dose: "1000 mg / can",   color: "#6366f1", pct: 70 },
  { name: "Sugar",      nameAr: "السكر",         effect: "Rapid Energy Substrate",           effectAr: "مصدر طاقة سريع",              dose: "25–39 g / can",   color: "#f59e0b", pct: 80 },
  { name: "B-Vitamins", nameAr: "فيتامينات ب",  effect: "Metabolic Co-factors",             effectAr: "عوامل مساعدة في الأيض",        dose: "B3, B6, B12",     color: "#10b981", pct: 55 },
  { name: "Guarana",    nameAr: "جوارانا",       effect: "Additional Caffeine Source",       effectAr: "مصدر إضافي للكافيين",          dose: "Synergistic",     color: "#8b5cf6", pct: 45 },
];

export default function Intro3Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "المقدمة" : "Introduction"} · 3 / 3</div>
        <h2 className="pres-h1">{ar ? "المكوّنات " : "Active "}<em>{ar ? "الفعّالة" : "Ingredients"}</em></h2>
        <div className="pres-divider" />
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1, justifyContent: "center" }}>
        {COMPONENTS.map((c, i) => (
          <motion.div
            key={i}
            className="pres-card"
            initial={{ opacity: 0, x: ar ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.09 }}
            style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px 16px" }}
          >
            {/* Color dot */}
            <div style={{
              width: "10px", height: "10px", borderRadius: "50%",
              background: c.color, flexShrink: 0,
              boxShadow: `0 0 8px ${c.color}88`,
            }} />
            <div style={{ width: "110px", flexShrink: 0 }}>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--c-text)" }}>
                {ar ? c.nameAr : c.name}
              </div>
              <div style={{ fontSize: "10px", color: "var(--c-text-dim)" }}>{c.dose}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "12px", color: "var(--c-text-muted)", marginBottom: "5px" }}>
                {ar ? c.effectAr : c.effect}
              </div>
              <div className="pres-bar-track">
                <motion.div
                  className="pres-bar-fill"
                  style={{ background: c.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${c.pct}%` }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.7 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{ marginTop: "12px", textAlign: "center", fontSize: "11px", color: "var(--c-text-dim)" }}
      >
        * {ar ? "التركيزات تختلف حسب العلامة التجارية" : "Concentrations vary by brand and formulation"}
      </motion.div>
    </div>
  );
}
