"use client";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PieChart, Pie, Cell, Legend } from "recharts";
import { researchData } from "@/lib/data/research";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import { formatNumber, getChangePercent } from "@/lib/utils";

const COLORS = ["var(--accent-cyan)", "var(--accent-green)", "var(--accent-red)", "var(--accent-gold)", "var(--accent-purple)"];
const COLORS_HEX = ["#00D4FF", "#00FF9F", "#FF4D6D", "#FFD700", "#A78BFA"];

function SectionTitle({ title, subtitle, isAr }: { title: string; subtitle?: string; isAr?: boolean }) {
  return (
    <div className={`mb-10 ${isAr ? "text-right" : "text-left"}`}>
      <h2 className="text-3xl lg:text-4xl font-black gradient-text mb-2">{title}</h2>
      {subtitle && <p className="text-base" style={{ color: "var(--text-muted)" }}>{subtitle}</p>}
      <div className="mt-3 h-1 w-16 rounded-full" style={{ background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-green))" }} />
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl p-3 text-sm" style={{ border: "1px solid var(--border-accent)" }}>
      <p className="font-medium mb-1" style={{ color: "var(--text-muted)" }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="font-bold" style={{ color: p.color }}>
          {p.name}: {typeof p.value === "number" ? p.value.toFixed(2) : p.value}
        </p>
      ))}
    </div>
  );
};

function VitalCard({ vital, isAr, index }: { vital: typeof researchData.vitalSigns[0]; isAr: boolean; index: number }) {
  const pct = parseFloat(getChangePercent(vital.pre.mean, vital.post.mean));
  const color = COLORS_HEX[index % COLORS_HEX.length];
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass rounded-2xl p-5 relative overflow-hidden group cursor-default"
      style={{ borderTop: `3px solid ${color}` }}>
      <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
        style={{ background: color, filter: "blur(20px)", transform: "translate(30%, -30%)" }} />
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs font-medium mb-0.5" style={{ color: "var(--text-muted)" }}>{isAr ? vital.nameAr : vital.name}</p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>{vital.unit}</p>
        </div>
        <span className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full"
          style={{ color, background: `${color}18` }}>
          <ArrowUpRight className="w-3 h-3" /> +{Math.abs(pct)}%
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="rounded-xl p-3 text-center" style={{ background: "var(--bg-surface-2)" }}>
          <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{isAr ? "قبل" : "Pre"}</div>
          <div className="text-xl font-black" style={{ color: "var(--text-primary)" }}>{formatNumber(vital.pre.mean, 1)}</div>
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>±{formatNumber(vital.pre.sd, 2)}</div>
        </div>
        <div className="rounded-xl p-3 text-center" style={{ background: `${color}10`, border: `1px solid ${color}30` }}>
          <div className="text-xs mb-1" style={{ color }}>{ isAr ? "بعد" : "Post"}</div>
          <div className="text-xl font-black" style={{ color }}>{formatNumber(vital.post.mean, 1)}</div>
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>±{formatNumber(vital.post.sd, 2)}</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span style={{ color: "var(--text-muted)" }}>p-value:</span>
        <span className="font-mono font-bold" style={{ color: "var(--accent-cyan)" }}>{vital.pValue}</span>
      </div>
    </motion.div>
  );
}

export default function ResultsSection({ lang }: { lang: "en" | "ar" }) {
  const isAr = lang === "ar";

  const vitalBarData = researchData.vitalSigns.map(v => ({
    name: isAr ? v.nameAr.split(" ").slice(0, 2).join(" ") : v.name.split(" ").slice(0, 2).join(" "),
    [isAr ? "قبل" : "Pre"]: parseFloat(v.pre.mean.toFixed(2)),
    [isAr ? "بعد" : "Post"]: parseFloat(v.post.mean.toFixed(2)),
  }));

  const cognitiveRadar = researchData.cognitiveTests.map(t => ({
    subject: isAr ? t.nameAr.split(" ")[0] : t.name.split(" ")[0],
    [isAr ? "قبل" : "Pre"]: t.pre,
    [isAr ? "بعد" : "Post"]: t.post,
  }));

  const frequencyData = researchData.consumption.frequency.map(f => ({
    name: isAr ? f.labelAr : f.label, value: f.value,
  }));

  const sideEffectsData = researchData.consumption.sideEffects.map(s => ({
    name: isAr ? s.labelAr : s.label, value: s.value,
  }));

  return (
    <section id="results" className="py-20 px-4 max-w-7xl mx-auto" dir={isAr ? "rtl" : "ltr"}>
      <SectionTitle
        title={isAr ? "النتائج" : "Results"}
        subtitle={isAr ? "زيادات ذات دلالة إحصائية في جميع العلامات الحيوية (p < 0.001)" : "Statistically significant changes across all measures (p < 0.001)"}
        isAr={isAr}
      />

      {/* Vital cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {researchData.vitalSigns.map((v, i) => <VitalCard key={i} vital={v} isAr={isAr} index={i} />)}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="glass rounded-2xl p-6">
          <h4 className="font-bold mb-4 text-sm" style={{ color: "var(--accent-cyan)" }}>
            {isAr ? "📊 العلامات الحيوية: قبل وبعد" : "📊 Vital Signs: Pre vs Post"}
          </h4>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={vitalBarData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "var(--text-muted)", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--text-muted)", fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--bg-surface-2)" }} />
              <Legend wrapperStyle={{ fontSize: "11px", color: "var(--text-muted)" }} />
              <Bar dataKey={isAr ? "قبل" : "Pre"} fill="#00D4FF" radius={[6, 6, 0, 0]} opacity={0.8} />
              <Bar dataKey={isAr ? "بعد" : "Post"} fill="#00FF9F" radius={[6, 6, 0, 0]} opacity={0.9} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="glass rounded-2xl p-6">
          <h4 className="font-bold mb-4 text-sm" style={{ color: "var(--accent-green)" }}>
            🧠 {isAr ? "الأداء المعرفي" : "Cognitive Performance"}
          </h4>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={cognitiveRadar} cx="50%" cy="50%" outerRadius="75%">
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--text-muted)", fontSize: 9 }} />
              <Radar name={isAr ? "قبل" : "Pre"} dataKey={isAr ? "قبل" : "Pre"} stroke="#00D4FF" fill="#00D4FF" fillOpacity={0.15} strokeWidth={2} />
              <Radar name={isAr ? "بعد" : "Post"} dataKey={isAr ? "بعد" : "Post"} stroke="#00FF9F" fill="#00FF9F" fillOpacity={0.2} strokeWidth={2} />
              <Legend wrapperStyle={{ fontSize: "11px", color: "var(--text-muted)" }} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-2xl p-6">
          <h4 className="font-bold mb-4 text-sm" style={{ color: "var(--accent-gold)" }}>
            📅 {isAr ? "تكرار الاستهلاك" : "Consumption Frequency"}
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={frequencyData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" paddingAngle={3}>
                {frequencyData.map((_, i) => <Cell key={i} fill={COLORS_HEX[i % COLORS_HEX.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "12px" }} />
              <Legend wrapperStyle={{ fontSize: "10px", color: "var(--text-muted)" }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6">
          <h4 className="font-bold mb-4 text-sm" style={{ color: "var(--accent-red)" }}>
            ⚠️ {isAr ? "الآثار الجانبية" : "Side Effects"}
          </h4>
          <div className="space-y-3">
            {sideEffectsData.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: "var(--text-secondary)" }}>{s.name}</span>
                  <span className="font-bold" style={{ color: COLORS_HEX[i % COLORS_HEX.length] }}>{s.value}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--bg-surface-3)" }}>
                  <motion.div className="h-full rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.value}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    style={{ background: COLORS_HEX[i % COLORS_HEX.length] }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6">
          <h4 className="font-bold mb-4 text-sm gradient-text">✨ {isAr ? "أبرز النتائج" : "Key Findings"}</h4>
          <div className="space-y-2.5">
            {(isAr ? researchData.keyFindings.ar : researchData.keyFindings.en).slice(0, 5).map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: isAr ? 10 : -10 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-2.5 p-2.5 rounded-xl" style={{ background: "var(--bg-surface-2)" }}>
                <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black text-white mt-0.5"
                  style={{ background: COLORS_HEX[i % COLORS_HEX.length], minWidth: "20px" }}>
                  {i + 1}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{f}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
