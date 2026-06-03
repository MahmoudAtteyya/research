"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang, DEMOGRAPHICS_DATA } from "@/lib/presentation/slides-data";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

function CountUp({ end, dec = 0, suffix = "" }: { end: number; dec?: number; suffix?: string }) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    let s = 0; const step = (end / 900) * 16;
    const t = setInterval(() => { s += step; if (s >= end) { setV(end); clearInterval(t); } else setV(s); }, 16);
    return () => clearInterval(t);
  }, [end]);
  return <>{dec ? v.toFixed(dec) : Math.round(v)}{suffix}</>;
}

export default function ResultsDemoSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  const d = DEMOGRAPHICS_DATA;

  const genderData = [
    { name: ar ? "ذكور" : "Males",   value: d.males,   pct: d.malePercent,   color: "#6366f1" },
    { name: ar ? "إناث" : "Females", value: d.females, pct: d.femalePercent, color: "#ec4899" },
  ];

  const STATS = [
    { val: d.totalParticipants, suffix: "", dec: 0, labelEn: "Total Participants", labelAr: "إجمالي المشاركين", color: "#6366f1", icon: "👥", subEn: "Enrolled", subAr: "مسجّل" },
    { val: d.malePercent, suffix: "%", dec: 0, labelEn: "Male", labelAr: "ذكور", color: "#3b82f6", icon: "♂", subEn: "of sample", subAr: "من العينة" },
    { val: d.ageMean, suffix: "", dec: 1, labelEn: "Mean Age", labelAr: "متوسط العمر", color: "#06b6d4", icon: "📅", subEn: "years ± 5.8", subAr: "سنة ± 5.8" },
    { val: d.edConsumerPercent, suffix: "%", dec: 0, labelEn: "Prior ED Consumers", labelAr: "مستهلكو مشروبات الطاقة", color: "#f59e0b", icon: "⚡", subEn: "had used EDs", subAr: "سبق لهم الاستهلاك" },
  ];

  return (
    <div className="pres-slide-inner" style={{ direction: ar ? "rtl" : "ltr" }}>

      {/* ── Header ── */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ flexShrink: 0, marginBottom: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <div style={{
            background: "linear-gradient(135deg, #6366f1, #ec4899)",
            borderRadius: "10px", padding: "5px 12px",
            fontSize: "clamp(10px, 1.4vw, 18px)", fontWeight: 800, letterSpacing: "2px",
            color: "#fff", textTransform: "uppercase",
          }}>
            {ar ? "النتائج · الديموغرافيا" : "Results · Demographics"}
          </div>
        </div>
        <h2 style={{ margin: 0, fontSize: "clamp(20px, 3.1vw, 38px)", fontWeight: 900, color: "var(--c-text)", lineHeight: 1.15 }}>
          {ar ? "خصائص " : "Study "}
          <span style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {ar ? "المشاركين" : "Participants"}
          </span>
        </h2>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
          style={{ height: "3px", width: "60px", background: "linear-gradient(90deg, #6366f1, #ec4899)", borderRadius: "2px", marginTop: "10px", transformOrigin: ar ? "right" : "left" }} />
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", flex: 1, minHeight: 0 }}>

        {/* Left: Stat cards 2x2 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", alignContent: "start" }}>
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 1.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              whileHover={{ scale: 1.04, y: -3 }}
              style={{
                background: `linear-gradient(145deg, ${s.color}14, ${s.color}06)`,
                border: `1px solid ${s.color}30`,
                borderTop: `3px solid ${s.color}`,
                borderRadius: "14px",
                padding: "14px 12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "4px",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Glow */}
              <div style={{ position: "absolute", top: "-8px", left: "50%", transform: "translateX(-50%)", width: "40px", height: "40px", borderRadius: "50%", background: `radial-gradient(${s.color}30, transparent 70%)`, pointerEvents: "none" }} />

              <div style={{ fontSize: "22px" }}>{s.icon}</div>
              <motion.div
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
                style={{
                  fontSize: "clamp(28px, 4.2vw, 50px)", fontWeight: 900, lineHeight: 1,
                  background: `linear-gradient(135deg, ${s.color}, ${s.color}cc)`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}
              >
                <CountUp end={s.val} dec={s.dec} suffix={s.suffix} />
              </motion.div>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 20px)", fontWeight: 700, color: "var(--c-text)", lineHeight: 1.2 }}>
                {ar ? s.labelAr : s.labelEn}
              </div>
              <div style={{ fontSize: "9.5px", color: "var(--c-text-muted)" }}>
                {ar ? s.subAr : s.subEn}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Gender pie + legend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          style={{
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          }}
        >
          <div style={{ fontSize: "clamp(10px, 1.4vw, 18px)", fontWeight: 800, letterSpacing: "2px", color: "#94a3b8", textTransform: "uppercase" }}>
            {ar ? "توزيع الجنس" : "Gender Distribution"}
          </div>

          {/* Pie chart */}
          <div style={{ flex: 1, position: "relative" }}>
            <div style={{ position: "absolute", inset: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%" cy="48%"
                    innerRadius="35%"
                    outerRadius="65%"
                    dataKey="value"
                    stroke="none"
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={3}
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, payload }: any) => {
                      const RADIAN = Math.PI / 180;
                      const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      return <text x={x} y={y} fill="white" fontSize="13" fontWeight="800" textAnchor="middle" dominantBaseline="central">{payload.pct}%</text>;
                    }}
                    labelLine={false}
                  >
                    {genderData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "rgba(15,23,42,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", fontSize: "clamp(12px, 1.7vw, 21px)" }}
                    formatter={(value: any, name: any, props: any) => [`${value} (${props.payload.pct}%)`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexShrink: 0 }}>
            {genderData.map((g, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: `${g.color}12`, border: `1px solid ${g.color}25`,
                borderRadius: "20px", padding: "5px 12px",
              }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: g.color, boxShadow: `0 0 8px ${g.color}66` }} />
                <span style={{ fontSize: "clamp(12px, 1.7vw, 21px)", fontWeight: 700, color: "var(--c-text)" }}>{g.name}</span>
                <span style={{ fontSize: "clamp(13px, 1.8vw, 24px)", fontWeight: 900, color: g.color }}>
                  {i === 0 ? d.malePercent : d.femalePercent}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
