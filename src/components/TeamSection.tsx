"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap, Stethoscope, BookOpen, Award, Crown,
  HeartPulse, Microscope, Brain, TestTube, Activity,
  FlaskConical, ClipboardList, Dna, Globe, Pill,
  Syringe, BarChart2, Scan, Users,
} from "lucide-react";
import { researchData } from "@/lib/data/research";

/* ── Icon map ─────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
  GraduationCap, Stethoscope, BookOpen, Award, Crown,
  HeartPulse, Microscope, Brain, TestTube, Activity,
  FlaskConical, ClipboardList, Dna, Globe, Pill,
  Syringe, BarChart2, Scan, Users,
};

/* ── Palette (one per index) ──────────────────────────────── */
const PALETTE = [
  { from: "#FF6B9D", to: "#C0125C" }, // 0 – Rehab (lead) – rose
  { from: "#00D4FF", to: "#0050CC" }, // 1 – Mahmoud Attia – cyan
  { from: "#00C78B", to: "#006644" }, // 2
  { from: "#A78BFA", to: "#5B21B6" }, // 3
  { from: "#FB923C", to: "#B45309" }, // 4
  { from: "#60A5FA", to: "#1D4ED8" }, // 5
  { from: "#34D399", to: "#065F46" }, // 6
  { from: "#F472B6", to: "#9D174D" }, // 7
  { from: "#FFD700", to: "#B45309" }, // 8
  { from: "#22D3EE", to: "#0E7490" }, // 9
  { from: "#A3E635", to: "#3F6212" }, // 10
  { from: "#E879F9", to: "#86198F" }, // 11
  { from: "#F87171", to: "#991B1B" }, // 12
  { from: "#38BDF8", to: "#075985" }, // 13
  { from: "#4ADE80", to: "#166534" }, // 14
  { from: "#FCD34D", to: "#92400E" }, // 15
];

/* Supervisor palette */
const SUP_PALETTE = [
  { from: "#FFD700", to: "#B45309" },
  { from: "#00D4FF", to: "#0050CC" },
  { from: "#A78BFA", to: "#5B21B6" },
  { from: "#34D399", to: "#065F46" },
];

/* ── Supervisor Card ─────────────────────────────────────── */
function SupervisorCard({
  name, role, iconName, index,
}: { name: string; role: string; iconName: string; index: number }) {
  const pal = SUP_PALETTE[index % SUP_PALETTE.length];
  const Icon = ICON_MAP[iconName] ?? GraduationCap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative flex flex-col items-center gap-3 p-6 rounded-2xl text-center overflow-hidden cursor-default group"
      style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}
    >
      {/* Top colour strip */}
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${pal.from}, ${pal.to})` }} />

      {/* Subtle bg on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${pal.from}14, transparent 65%)` }} />

      {/* Icon circle */}
      <div className="relative w-16 h-16 rounded-full flex items-center justify-center z-10 group-hover:scale-105 transition-transform duration-300"
        style={{ background: `linear-gradient(135deg, ${pal.from}, ${pal.to})`, boxShadow: `0 6px 24px ${pal.from}55` }}>
        <Icon className="w-7 h-7 text-white" strokeWidth={1.8} />
      </div>

      {/* Role badge */}
      <span className="relative z-10 flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold"
        style={{ background: `${pal.from}18`, border: `1px solid ${pal.from}45`, color: pal.from }}>
        <GraduationCap className="w-3 h-3" /> Supervisor
      </span>

      <h4 className="relative z-10 font-bold text-sm leading-snug" style={{ color: "var(--text-primary)" }}>{name}</h4>
      <p className="relative z-10 text-[11px] leading-relaxed" style={{ color: "var(--text-muted)" }}>{role}</p>
    </motion.div>
  );
}

/* ── Member Card ──────────────────────────────────────────── */
function MemberCard({
  member, index,
}: {
  member: { name: string; icon: string; isLead: boolean };
  index: number;
}) {
  const pal = PALETTE[index % PALETTE.length];
  const Icon = ICON_MAP[member.icon] ?? Stethoscope;
  const isLead = member.isLead;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.42, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.04 }}
      className="relative flex flex-col items-center gap-2.5 p-4 rounded-2xl cursor-default group overflow-hidden"
      style={{
        background: "var(--bg-surface)",
        border: isLead ? `1px solid ${pal.from}70` : "1px solid var(--border)",
        boxShadow: isLead ? `0 0 0 1px ${pal.from}25, 0 8px 28px ${pal.from}20` : "var(--shadow)",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${pal.from}90`;
        el.style.boxShadow = `0 0 0 1px ${pal.from}30, 0 16px 40px ${pal.from}28`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = isLead ? `${pal.from}70` : "var(--border)";
        el.style.boxShadow = isLead ? `0 0 0 1px ${pal.from}25, 0 8px 28px ${pal.from}20` : "var(--shadow)";
      }}
    >
      {/* Subtle bg glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${pal.from}10, transparent 70%)` }} />

      {/* Lead crown badge */}
      {isLead && (
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 300 }}
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full z-20 flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${pal.from}, ${pal.to})`, boxShadow: `0 0 12px ${pal.from}90` }}>
          <Crown className="w-3.5 h-3.5 text-white fill-white" />
        </motion.div>
      )}

      {/* Icon circle */}
      <div className="relative z-10">
        {/* Spinning outer ring on hover */}
        <div className="absolute -inset-1.5 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300 spin-slow pointer-events-none"
          style={{ background: `conic-gradient(${pal.from}80, ${pal.to}80, ${pal.from}80)` }} />

        <div className="relative w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
          style={{
            background: `linear-gradient(135deg, ${pal.from}, ${pal.to})`,
            boxShadow: `0 4px 16px ${pal.from}55`,
            zIndex: 1,
          }}>
          <Icon className="w-6 h-6 text-white" strokeWidth={1.8} />
        </div>
      </div>

      {/* Name */}
      <p className="relative z-10 text-[11.5px] font-semibold text-center leading-snug w-full px-1"
        style={{ color: "var(--text-secondary)" }}>
        {member.name}
      </p>

      {/* Lead label */}
      {isLead && (
        <span className="relative z-10 text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ background: `${pal.from}18`, border: `1px solid ${pal.from}50`, color: pal.from }}>
          Team Lead
        </span>
      )}

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${pal.from}, transparent)` }} />
    </motion.div>
  );
}

/* ── Main ─────────────────────────────────────────────────── */
export default function TeamSection({ lang }: { lang: "en" | "ar" }) {
  const isAr = lang === "ar";

  return (
    <section id="team" className="py-20 px-4 max-w-7xl mx-auto" dir={isAr ? "rtl" : "ltr"}>
      {/* Section Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} className="mb-12">
        <h2 className="text-3xl lg:text-4xl font-black gradient-text mb-2">
          {isAr ? "فريق البحث" : "Research Team"}
        </h2>
        <p style={{ color: "var(--text-muted)" }}>
          {isAr
            ? "الفرقة الخامسة – أسماء الفريق – كلية الطب البشري، جامعة السويس"
            : "Fifth Year Students – Group names – Faculty of Medicine, Suez University"}
        </p>
        <div className="mt-3 h-1 w-16 rounded-full"
          style={{ background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-green))" }} />
      </motion.div>

      {/* ── Supervisors ── */}
      <div className="mb-14">
        <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} className="flex items-center gap-2.5 mb-6">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--accent-gold), #D4900A)" }}>
            <Award className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-bold gradient-text-warm">
            {isAr ? "المشرفون" : "Supervisors"}
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {researchData.supervisors.map((sup, i) => (
            <SupervisorCard
              key={sup.name}
              name={sup.name}
              role={sup.role}
              iconName={(sup as any).icon ?? "GraduationCap"}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* ── Team Members ── */}
      <div>
        <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} className="flex items-center gap-2.5 mb-6">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-green))" }}>
            <Users className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
            {isAr ? "أعضاء الفريق" : "Team Members"}
          </h3>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold"
            style={{ background: "var(--glow-cyan)", border: "1px solid var(--border-accent)", color: "var(--accent-cyan)" }}>
            {researchData.team.length}
          </span>
        </motion.div>

        {/* Responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {(researchData.team as Array<{ name: string; icon: string; isLead: boolean }>)
            .map((member, i) => (
              <MemberCard key={member.name} member={member} index={i} />
            ))}
        </div>
      </div>
    </section>
  );
}
