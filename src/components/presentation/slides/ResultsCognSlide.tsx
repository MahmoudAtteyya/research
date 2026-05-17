"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang, COGNITIVE_DATA } from "@/lib/presentation/slides-data";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";

export default function ResultsCognSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  const radarData = COGNITIVE_DATA.map(cd => ({
    domain: ar ? cd.domainAr.split("/")[0].trim() : cd.domain.split("/")[0].trim(),
    [ar ? "قبل" : "Before"]: cd.pre,
    [ar ? "بعد"  : "After"]:  cd.post,
  }));

  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "النتائج" : "Results"} · {ar ? "الأداء المعرفي" : "Cognitive Performance"}</div>
        <h2 className="pres-h1" style={{ fontSize: "clamp(22px, 3vw, 36px)" }}>🧠 <em>{ar ? "الأداء المعرفي" : "Cognitive Outcomes"}</em></h2>
        <div className="pres-divider" />
      </motion.div>

      <div className="pres-grid-2" style={{ flex: 1, gap: "14px", alignContent: "center" }}>
        {/* Domain cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {COGNITIVE_DATA.map((cd, i) => (
            <motion.div
              key={i}
              className="pres-card"
              initial={{ opacity: 0, x: ar ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.015 }}
              style={{ padding: "10px 14px", borderLeft: `3px solid ${cd.color}` }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--c-text)" }}>
                  {ar ? cd.domainAr : cd.domain}
                </span>
                <span className={cd.improvement ? "pres-sig" : "pres-sig pres-sig-warn"}>
                  {cd.improvement ? (ar ? "✅ معنوي" : "✅ Significant") : (ar ? "⚠️ محدود" : "⚠️ Limited")}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "13px", color: "#93c5fd" }}>{cd.pre}</span>
                <div className="pres-bar-track" style={{ flex: 1 }}>
                  <motion.div
                    className="pres-bar-fill"
                    style={{ background: cd.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(cd.post / 100) * 100}%` }}
                    transition={{ delay: 0.4 + i * 0.09, duration: 0.8 }}
                  />
                </div>
                <span style={{ fontSize: "13px", color: "#fca5a5", fontWeight: 700 }}>{cd.post}</span>
                <span style={{ fontSize: "12px", color: "#6ee7b7", fontWeight: 700 }}>+{cd.post - cd.pre}</span>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="anim-border-glow"
            style={{ padding: "8px 12px", background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "8px" }}
          >
            <p style={{ fontSize: "12px", color: "#a5b4fc" }}>
              💡 {ar
                ? "الذاكرة العاملة واليقظة وسرعة المعالجة تحسّنت — الانتباه ثابت نسبياً"
                : "Working memory, mindfulness & processing speed improved — Attention stable"}
            </p>
          </motion.div>
        </div>

        {/* Radar */}
        <motion.div className="pres-card" initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.28 }}
          style={{ display: "flex", flexDirection: "column", padding: "12px 14px" }}>
          <div style={{ fontSize: "12px", color: "var(--c-text-dim)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>
            {ar ? "مخطط الرادار — قبل / بعد" : "Radar — Before / After"}
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="domain" tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }} />
                <Radar name={ar ? "قبل" : "Before"} dataKey={ar ? "قبل" : "Before"} stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} strokeWidth={2} />
                <Radar name={ar ? "بعد"  : "After"}  dataKey={ar ? "بعد"  : "After"}  stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
