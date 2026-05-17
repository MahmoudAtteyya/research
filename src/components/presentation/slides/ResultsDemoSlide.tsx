"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang, DEMOGRAPHICS_DATA, ED_CONSUMPTION_REASONS } from "@/lib/presentation/slides-data";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

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
    { name: ar ? "ذكور" : "Males",   value: d.males,   color: "#6366f1" },
    { name: ar ? "إناث" : "Females", value: d.females, color: "#ec4899" },
  ];

  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "النتائج" : "Results"} · {ar ? "الديموغرافيا" : "Demographics"}</div>
        <h2 className="pres-h1" style={{ fontSize: "clamp(22px, 3vw, 36px)" }}>{ar ? "خصائص " : "Study "}<em>{ar ? "المشاركين" : "Participants"}</em></h2>
        <div className="pres-divider" />
      </motion.div>

      <div className="pres-grid-2" style={{ flex: 1, gap: "14px", alignContent: "center" }}>
        {/* Left: Key stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { val: d.totalParticipants, suffix: "", labelEn: "Total Participants", labelAr: "إجمالي المشاركين", color: "var(--c-indigo)" },
            { val: d.malePercent, suffix: "%", labelEn: "Male Participants", labelAr: "ذكور", color: "#6366f1" },
            { val: d.ageMean, suffix: " yrs", dec: 1, labelEn: "Mean Age ± 5.8", labelAr: "متوسط العمر ± 5.8", color: "var(--c-cyan)" },
            { val: d.edConsumerPercent, suffix: "%", labelEn: "Had consumed EDs", labelAr: "سبق لهم استهلاك مشروبات الطاقة", color: "var(--c-amber)" },
          ].map((item: any, i) => (
            <motion.div key={i} className="pres-stat" initial={{ opacity: 0, x: ar ? 16 : -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              style={{ borderLeft: `3px solid ${item.color}`, textAlign: "left", display: "flex", alignItems: "center", gap: "14px", padding: "12px 16px" }}
            >
              <div className="pres-stat-val" style={{ fontSize: "28px" }}>
                <CountUp end={item.val} dec={item.dec || 0} suffix={item.suffix} />
              </div>
              <div className="pres-stat-unit" style={{ textAlign: ar ? "right" : "left" }}>{ar ? item.labelAr : item.labelEn}</div>
            </motion.div>
          ))}
        </div>

        {/* Right: Pie + Reasons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <motion.div className="pres-card" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 }}
            style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px" }}>
            <ResponsiveContainer width={90} height={90}>
              <PieChart>
                <Pie data={genderData} cx="50%" cy="50%" innerRadius={25} outerRadius={40} dataKey="value">
                  {genderData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#07102e", border: "1px solid rgba(255,255,255,0.1)", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div>
              {genderData.map((g, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "5px" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: g.color, display: "inline-block" }} />
                  <span style={{ fontSize: "13px", color: "var(--c-text)" }}>{g.name}: {i === 0 ? d.malePercent : d.femalePercent}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="pres-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={{ padding: "12px 16px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--c-text-dim)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
              {ar ? "أسباب الاستهلاك" : "Reasons for Consumption"}
            </div>
            {ED_CONSUMPTION_REASONS.map((r, i) => (
              <div key={i} style={{ marginBottom: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                  <span style={{ fontSize: "13px", color: "var(--c-text-muted)" }}>{ar ? r.reasonAr : r.reason}</span>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: r.color }}>{r.percent}%</span>
                </div>
                <div className="pres-bar-track">
                  <motion.div className="pres-bar-fill" style={{ background: r.color }} initial={{ width: 0 }} animate={{ width: `${r.percent}%` }} transition={{ delay: 0.65 + i * 0.08, duration: 0.7 }} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
