"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang, COGNITIVE_DATA } from "@/lib/presentation/slides-data";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Legend, Tooltip } from "recharts";

export default function ResultsCognSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  const radarData = COGNITIVE_DATA.map(cd => ({
    domain: ar ? cd.domainAr.split("/")[0].trim() : cd.domain.split("/")[0].trim(),
    [ar ? "قبل" : "Pre"]: cd.pre,
    [ar ? "بعد" : "Post"]: cd.post,
  }));

  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ flexShrink: 0 }}>
        <div className="pres-label">{ar ? "النتائج" : "Results"} · {ar ? "الأداء المعرفي" : "Cognitive Performance"}</div>
        <h2 className="pres-h1" style={{ fontSize: "clamp(18px, 2.5vw, 28px)", marginBottom: "4px" }}>🧠 <em>{ar ? "الأداء المعرفي" : "Cognitive Outcomes"}</em></h2>
        <div className="pres-divider" style={{ marginBottom: "12px" }} />
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "12px", flex: 1, minHeight: 0 }}>

        {/* Left: Domain cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", minHeight: 0 }}>
          {COGNITIVE_DATA.map((cd, i) => (
            <motion.div
              key={i}
              className="pres-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ padding: "8px 12px", borderLeft: `3px solid ${cd.color}`, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--c-text)" }}>
                  {ar ? cd.domainAr : cd.domain}
                </span>
                <span className={cd.improvement ? "pres-sig" : "pres-sig pres-sig-warn"} style={{ padding: "2px 6px", fontSize: "9px" }}>
                  {cd.improvement ? (ar ? "✅ معنوي p<0.001" : "✅ Sig.") : (ar ? "⚠️ غير معنوي" : "⚠️ Not Sig.")}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "9px", color: "var(--c-text-dim)" }}>{ar ? "قبل" : "Pre"}</div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "#06b6d4" }}>{cd.pre}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="pres-bar-track">
                    <motion.div
                      className="pres-bar-fill"
                      style={{ background: cd.color, boxShadow: `0 0 6px ${cd.color}55` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(cd.post / (cd.domain === "Mindfulness / Alertness" ? 60 : cd.domain === "Working Memory" ? 12 : 1)) * 100}%` }}
                      transition={{ delay: 0.4 + i * 0.08, duration: 0.9, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "9px", color: "var(--c-text-dim)" }}>{ar ? "بعد" : "Post"}</div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "#10b981" }}>{cd.post}</div>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            className="anim-border-glow"
            style={{ flexShrink: 0, padding: "8px 10px", background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "8px" }}>
            <p style={{ fontSize: "11px", color: "#a5b4fc", fontWeight: 600, margin: 0 }}>
              💡 {ar
                ? "الذاكرة العاملة واليقظة وسرعة المعالجة تحسّنت معنوياً"
                : "Working memory, mindfulness & processing speed improved significantly"}
            </p>
          </motion.div>
        </div>

        {/* Right: Radar chart */}
        <motion.div className="pres-card" initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.28 }}
          style={{ padding: "12px", display: "flex", flexDirection: "column" }}>
          <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
            <span style={{ fontSize: "14px" }}>🧠</span>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#06b6d4" }}>
              {ar ? "مخطط الرادار — قبل / بعد" : "Radar Chart — Pre / Post"}
            </div>
          </div>
          <div style={{ flex: 1, position: "relative" }}>
            <div style={{ position: "absolute", inset: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="62%">
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis dataKey="domain" tick={{ fill: "var(--c-text-muted)", fontSize: 10, fontWeight: 600 }} />
                  <Radar name={ar ? "قبل" : "Pre"} dataKey={ar ? "قبل" : "Pre"} stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} strokeWidth={2} />
                  <Radar name={ar ? "بعد" : "Post"} dataKey={ar ? "بعد" : "Post"} stroke="#10b981" fill="#10b981" fillOpacity={0.35} strokeWidth={2.5} />
                  <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "0px" }} />
                  <Tooltip contentStyle={{ background: "var(--c-bg2)", border: "1px solid var(--c-border)", borderRadius: "8px", fontSize: "11px" }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
