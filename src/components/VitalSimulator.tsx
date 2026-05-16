"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Heart, Wind, Thermometer, Activity, Brain, Info } from "lucide-react";

const vitals = [
  { key: "hr", label: "Heart Rate", labelAr: "معدل النبض", unit: "bpm", base: 75.62, perCan: 3.02, max: 100, min: 60, icon: Heart, color: "#FF4D6D", colorDark: "#FF4D6D", colorLight: "#E8264B", normal: "60-100" },
  { key: "sbp", label: "Systolic BP", labelAr: "ضغط الدم الانقباضي", unit: "mmHg", base: 116.83, perCan: 3.02, max: 150, min: 100, icon: Activity, color: "#00D4FF", colorDark: "#00D4FF", colorLight: "#0078FF", normal: "90-130" },
  { key: "dbp", label: "Diastolic BP", labelAr: "ضغط الدم الانبساطي", unit: "mmHg", base: 76.21, perCan: 1.28, max: 100, min: 60, icon: Activity, color: "#9B59B6", colorDark: "#A78BFA", colorLight: "#6C3EE8", normal: "60-90" },
  { key: "rr", label: "Respiratory Rate", labelAr: "معدل التنفس", unit: "/min", base: 16.70, perCan: 0.75, max: 25, min: 12, icon: Wind, color: "#00FF9F", colorDark: "#00FF9F", colorLight: "#00B86B", normal: "12-20" },
  { key: "temp", label: "Temperature", labelAr: "درجة الحرارة", unit: "°C", base: 37.004, perCan: 0.21, max: 38.5, min: 36.5, icon: Thermometer, color: "#FFD700", colorDark: "#FFD700", colorLight: "#D4900A", normal: "36.5-37.5" },
];

function Gauge({ value, min, max, color }: { value: number; min: number; max: number; color: string }) {
  const pct = Math.min(Math.max((value - min) / (max - min), 0), 1);
  const angle = -135 + pct * 270;
  const radius = 45;
  const cx = 60, cy = 60;
  const startAngle = -135 * (Math.PI / 180);
  const endAngle = 135 * (Math.PI / 180);

  const arcPath = (startA: number, endA: number, r: number) => {
    const x1 = cx + r * Math.cos(startA), y1 = cy + r * Math.sin(startA);
    const x2 = cx + r * Math.cos(endA), y2 = cy + r * Math.sin(endA);
    const large = endA - startA > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };

  const valueEndAngle = -135 * (Math.PI / 180) + pct * 270 * (Math.PI / 180);

  return (
    <svg viewBox="0 0 120 90" className="w-full">
      {/* Track */}
      <path d={arcPath(startAngle, endAngle, radius)} fill="none" stroke="var(--bg-surface-3)" strokeWidth="8" strokeLinecap="round" />
      {/* Value arc */}
      <motion.path
        d={arcPath(startAngle, valueEndAngle, radius)}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: pct }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
      {/* Needle */}
      <motion.line
        x1={cx} y1={cy}
        x2={cx + radius * 0.7 * Math.cos((angle - 90) * (Math.PI / 180))}
        y2={cy + radius * 0.7 * Math.sin((angle - 90) * (Math.PI / 180))}
        stroke={color} strokeWidth="2" strokeLinecap="round"
        animate={{ x2: cx + radius * 0.7 * Math.cos((angle - 90) * (Math.PI / 180)), y2: cy + radius * 0.7 * Math.sin((angle - 90) * (Math.PI / 180)) }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <circle cx={cx} cy={cy} r="4" fill={color} />
    </svg>
  );
}

function HeartbeatLine({ bpm, color }: { bpm: number; color: string }) {
  const speed = 60 / bpm; // seconds per beat
  return (
    <div className="relative overflow-hidden h-12 rounded-lg" style={{ background: "var(--bg-surface-3)" }}>
      <svg viewBox="0 0 400 48" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`hbGrad${color.replace('#','')}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="50%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,24 L60,24 L70,24 L75,8 L85,40 L95,24 L110,24 L160,24 L170,24 L175,8 L185,40 L195,24 L210,24
             L260,24 L270,24 L275,8 L285,40 L295,24 L310,24 L360,24 L370,24 L375,8 L385,40 L395,24 L400,24"
          fill="none"
          stroke={`url(#hbGrad${color.replace('#','')})`}
          strokeWidth="2"
          strokeLinecap="round"
          className="ecg-animate"
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: 1000,
            animation: `ecg ${speed * 2}s ease-in-out infinite`,
            filter: `drop-shadow(0 0 3px ${color})`
          }}
        />
      </svg>
    </div>
  );
}

export default function VitalSimulator({ lang }: { lang: "en" | "ar" }) {
  const isAr = lang === "ar";
  const [cans, setCans] = useState(0);
  const [selected, setSelected] = useState(0);

  const v = vitals[selected];
  const currentValue = Math.min(v.base + cans * v.perCan, v.max);
  const baseValue = v.base;
  const change = currentValue - baseValue;
  const changePct = ((change / baseValue) * 100);

  const getRisk = () => {
    if (cans === 0) return { level: isAr ? "طبيعي" : "Normal", color: "var(--accent-green)" };
    if (cans <= 1) return { level: isAr ? "منخفض" : "Low", color: "var(--accent-cyan)" };
    if (cans <= 2) return { level: isAr ? "معتدل" : "Moderate", color: "var(--accent-gold)" };
    return { level: isAr ? "مرتفع" : "High Risk", color: "var(--accent-red)" };
  };

  const risk = getRisk();

  return (
    <section id="simulator" className="py-20 px-4 max-w-7xl mx-auto" dir={isAr ? "rtl" : "ltr"}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">⚡</span>
            <h2 className="text-3xl lg:text-4xl font-black gradient-text">{isAr ? "محاكي العلامات الحيوية" : "Vital Signs Simulator"}</h2>
          </div>
          <p style={{ color: "var(--text-muted)" }}>{isAr ? "اضغط على الـ slider واستعرض تأثير مشروبات الطاقة على جسمك" : "Drag the slider and explore how energy drinks affect your body"}</p>
          <div className="mt-3 h-1 w-16 rounded-full" style={{ background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-green))" }} />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="glass rounded-3xl p-6 flex flex-col gap-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold flex items-center gap-2">
                <Zap className="w-5 h-5" style={{ color: "var(--accent-gold)" }} />
                {isAr ? "عدد العلب" : "Number of Cans"}
              </h3>
              <motion.div
                key={cans}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-3xl font-black"
                style={{ color: risk.color }}
              >
                {cans}
              </motion.div>
            </div>

            {/* Custom slider */}
            <div className="relative">
              <input
                type="range" min={0} max={4} step={1} value={cans}
                onChange={e => setCans(Number(e.target.value))}
                className="w-full h-3 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(90deg, var(--accent-cyan) ${cans * 25}%, var(--bg-surface-3) ${cans * 25}%)`,
                  outline: "none",
                }}
              />
              <div className="flex justify-between text-xs mt-2" style={{ color: "var(--text-muted)" }}>
                {[0, 1, 2, 3, 4].map(n => <span key={n}>{n}</span>)}
              </div>
            </div>

            {/* Can emoji display */}
            <div className="flex gap-2 mt-4 justify-center">
              {[0, 1, 2, 3, 4].map(n => (
                <motion.div key={n} animate={{ scale: n < cans ? 1 : 0.7, opacity: n < cans ? 1 : 0.3 }}
                  className="text-2xl cursor-pointer" onClick={() => setCans(n + 1)}>
                  🥤
                </motion.div>
              ))}
            </div>
          </div>

          {/* Risk indicator */}
          <div className="p-4 rounded-2xl" style={{ background: "var(--bg-surface-2)", border: `1px solid ${risk.color}40` }}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>{isAr ? "مستوى الخطر" : "Risk Level"}</span>
              <motion.span key={risk.level} initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                className="text-sm font-bold px-3 py-1 rounded-full"
                style={{ color: risk.color, background: `${risk.color}15` }}>
                {risk.level}
              </motion.span>
            </div>
            {cans >= 3 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs mt-2"
                style={{ color: "var(--accent-red)" }}>
                ⚠️ {isAr ? "جرعة عالية! قد تسبب خفقاناً وقلقاً" : "High dose! May cause palpitations & anxiety"}
              </motion.p>
            )}
          </div>

          {/* Caffeine info */}
          <div className="p-4 rounded-2xl" style={{ background: "var(--bg-surface-2)" }}>
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--accent-cyan)" }} />
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>
                  {isAr ? `كافيين: ~${cans * 80} ملغ` : `Caffeine: ~${cans * 80} mg`}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {isAr ? "الحد الآمن: 400 ملغ/يوم (Mayo Clinic)" : "Safe limit: 400 mg/day (Mayo Clinic)"}
                </p>
                <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-surface-3)" }}>
                  <motion.div className="h-full rounded-full"
                    animate={{ width: `${Math.min((cans * 80 / 400) * 100, 100)}%` }}
                    style={{ background: cans <= 2 ? "var(--accent-green)" : cans === 3 ? "var(--accent-gold)" : "var(--accent-red)" }} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Vital selector + gauge */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-3xl p-6 flex flex-col gap-4">
          <h3 className="font-bold text-center">{isAr ? "اختر العلامة الحيوية" : "Select Vital Sign"}</h3>

          <div className="grid grid-cols-5 gap-1.5">
            {vitals.map((vt, i) => (
              <button key={i} onClick={() => setSelected(i)}
                className="flex flex-col items-center p-2 rounded-xl transition-all text-center btn-press"
                style={{
                  background: selected === i ? `${vt.color}20` : "var(--bg-surface-2)",
                  border: `1px solid ${selected === i ? vt.color : "var(--border)"}`,
                }}>
                <vt.icon className="w-4 h-4 mb-1" style={{ color: selected === i ? vt.color : "var(--text-muted)" }} />
                <span className="text-[9px] font-medium leading-tight" style={{ color: selected === i ? vt.color : "var(--text-muted)" }}>
                  {isAr ? vt.labelAr.split(" ")[0] : vt.label.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Gauge */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-40">
              <Gauge value={currentValue} min={v.min} max={v.max} color={v.color} />
            </div>
            <motion.div key={`${selected}-${cans}`} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="text-center">
              <div className="text-4xl font-black" style={{ color: v.color }}>
                {currentValue.toFixed(v.unit === "°C" ? 2 : 1)}
              </div>
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>{v.unit}</div>
              <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                {isAr ? v.labelAr : v.label}
              </div>
            </motion.div>
          </div>

          {/* Change indicator */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl text-center" style={{ background: "var(--bg-surface-2)" }}>
              <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{isAr ? "القيمة الأساسية" : "Baseline"}</div>
              <div className="text-lg font-bold" style={{ color: "var(--text-secondary)" }}>{baseValue.toFixed(2)}</div>
            </div>
            <div className="p-3 rounded-xl text-center" style={{ background: "var(--bg-surface-2)", border: `1px solid ${change > 0 ? "var(--accent-red)" : "var(--accent-green)"}40` }}>
              <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{isAr ? "التغيير" : "Change"}</div>
              <motion.div key={cans} initial={{ scale: 1.5 }} animate={{ scale: 1 }}
                className="text-lg font-bold"
                style={{ color: change > 0 ? "var(--accent-red)" : "var(--accent-green)" }}>
                {change > 0 ? "+" : ""}{change.toFixed(2)}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* All vitals summary */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="glass rounded-3xl p-6 flex flex-col gap-3">
          <h3 className="font-bold mb-2">{isAr ? "ملخص العلامات الحيوية" : "All Vitals Overview"}</h3>

          {/* Heartbeat line */}
          <div className="mb-2">
            <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>
              {isAr ? `معدل النبض: ${Math.round(75.62 + cans * 3.02)} bpm` : `Heart Rate: ${Math.round(75.62 + cans * 3.02)} bpm`}
            </p>
            <HeartbeatLine bpm={Math.round(75.62 + cans * 3.02)} color="#FF4D6D" />
          </div>

          {vitals.map((vt, i) => {
            const val = Math.min(vt.base + cans * vt.perCan, vt.max);
            const pct = ((val - vt.min) / (vt.max - vt.min)) * 100;
            const chg = val - vt.base;
            return (
              <motion.div key={i} className="flex items-center gap-3 p-2 rounded-xl"
                style={{ background: i === selected ? `${vt.color}10` : "var(--bg-surface-2)" }}
                onClick={() => setSelected(i)}>
                <vt.icon className="w-4 h-4 flex-shrink-0" style={{ color: vt.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium truncate" style={{ color: "var(--text-secondary)" }}>
                      {isAr ? vt.labelAr : vt.label}
                    </span>
                    <span className="font-bold flex-shrink-0 ms-2" style={{ color: vt.color }}>
                      {val.toFixed(vt.unit === "°C" ? 1 : 0)} {vt.unit}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-surface-3)" }}>
                    <motion.div className="h-full rounded-full"
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.4 }}
                      style={{ background: vt.color, boxShadow: `0 0 6px ${vt.color}80` }} />
                  </div>
                </div>
                {cans > 0 && (
                  <span className="text-xs font-bold flex-shrink-0" style={{ color: "var(--accent-red)" }}>
                    +{chg.toFixed(1)}
                  </span>
                )}
              </motion.div>
            );
          })}

          <p className="text-xs mt-2 p-3 rounded-xl" style={{ background: "var(--bg-surface-2)", color: "var(--text-muted)" }}>
            💡 {isAr
              ? "القيم مبنية على نتائج دراستنا: 47 مشاركاً، قياس قبل وبعد 30 دقيقة"
              : "Values based on our study results: 47 participants, measured pre & 30 min post-consumption"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
