"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lang, SUPERVISORS } from "@/lib/presentation/slides-data";
import { Stethoscope, Award, Heart, GraduationCap, ArrowUpRight } from "lucide-react";

// Map supervisor name → image file
const PHOTO_MAP: Record<string, string> = {
  "Prof Dr. Maysa Ibrahim": "/images/maysa.jpeg",
  "Dr. Mohammed Wagih Saleh": "/images/wagih.jpeg",
  "Dr. Nanees Kamel Hussein": "/images/nanees.jpeg",
  "Dr. Yosra Saeed Abdalla": "/images/yosra.jpeg",
};

/** Animated sparkle particles */
function Sparkles() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 4,
    dur: 3 + Math.random() * 3,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          animate={{ opacity: [0, 0.7, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          style={{
            position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size, borderRadius: "50%",
            background: "rgba(251, 191, 36, 0.5)",
            boxShadow: "0 0 8px rgba(251, 191, 36, 0.3)",
          }}
        />
      ))}
    </div>
  );
}

/** Animated moving ECG line */
function ECGLine() {
  return (
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[200px] w-full opacity-10 pointer-events-none z-0">
      <svg width="100%" height="100%" viewBox="0 0 1200 100" preserveAspectRatio="none">
        <motion.path
          d="M0,50 L400,50 L415,35 L430,65 L445,10 L460,90 L475,45 L485,55 L500,50 L800,50 L815,25 L830,75 L845,0 L860,100 L875,40 L885,60 L900,50 L1200,50"
          fill="none"
          stroke="url(#ecg-grad)"
          strokeWidth="2.5"
          initial={{ strokeDasharray: "1200", strokeDashoffset: "1200" }}
          animate={{ strokeDashoffset: ["1200", "0"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <defs>
          <linearGradient id="ecg-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function ThankYouSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  const [activeIcon, setActiveIcon] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveIcon(c => (c + 1) % 4), 3000);
    return () => clearInterval(t);
  }, []);

  const icons = [
    <GraduationCap key="g" className="w-12 h-12 text-indigo-400" />,
    <Stethoscope key="s" className="w-12 h-12 text-cyan-400" />,
    <Award key="a" className="w-12 h-12 text-amber-400" />,
    <Heart key="h" className="w-12 h-12 text-rose-400" />
  ];

  return (
    <div
      className="pres-slide-inner relative flex flex-col justify-between items-center text-center overflow-hidden py-10 px-8 select-none"
      style={{ background: "#04071a", minHeight: "100%", width: "100%" }}
    >
      {/* Background Graphics */}
      <Sparkles />
      <ECGLine />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-radial from-indigo-500/5 to-transparent pointer-events-none z-0" />

      {/* Top Header Logos */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-6 z-10"
      >
        <img
          src="/university.svg"
          alt="Suez University"
          className="w-14 h-14 object-contain filter drop-shadow-[0_4px_12px_rgba(251,191,36,0.15)]"
        />
        <div className="h-10 w-[1px] bg-gradient-to-b from-transparent via-slate-600 to-transparent" />
        <img
          src="/faculty.svg"
          alt="Faculty"
          className="w-14 h-14 object-contain rounded-full bg-white p-0.5 filter drop-shadow-[0_4px_12px_rgba(99,102,241,0.15)]"
        />
      </motion.div>

      {/* Center Section: Core Title & Message */}
      <div className="flex flex-col items-center gap-2 z-10 max-w-2xl my-auto">
        {/* Animated Central Medical Icon */}
        <div className="w-20 h-20 rounded-full bg-slate-900/60 border border-white/5 flex items-center justify-center shadow-xl backdrop-blur-sm relative overflow-hidden mb-2">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-cyan-500/5" />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIcon}
              initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              {icons[activeIcon]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Big Thank You Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl md:text-6xl font-black tracking-tight"
          style={{
            background: "linear-gradient(135deg, #ffffff 30%, #a5b4fc 70%, #6366f1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          {ar ? "شكراً لكم" : "Thank You"}
        </motion.h1>

        {/* Dynamic Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-sm md:text-lg text-slate-400 font-medium tracking-wide mt-1"
        >
          {ar ? "نحن مستعدون للإجابة على أسئلتكم ومناقشاتكم" : "We are ready for your questions and discussions"}
        </motion.p>

        {/* Separator line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 140 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-3"
        />
      </div>

      {/* Supervisors Grid Section */}
      <div className="w-full max-w-4xl z-10 mt-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest mb-3"
        >
          {ar ? "تحت إشراف" : "Heartfelt Thanks To Our Supervisors"}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {SUPERVISORS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              whileHover={{ y: -3, borderColor: "rgba(251,191,36,0.4)", boxShadow: "0 8px 24px rgba(251,191,36,0.15)" }}
              className="bg-slate-900/40 border border-white/5 hover:bg-slate-900/60 rounded-xl p-4 text-center backdrop-blur-md transition-all shadow-md group relative"
            >
              {/* Doctor/Supervisor Photo */}
              <div className="relative w-14 h-14 rounded-full border-2 border-indigo-500/30 flex items-center justify-center bg-slate-800 mx-auto mb-3 overflow-hidden group-hover:scale-105 group-hover:border-amber-400/50 transition-all shadow-[0_0_12px_rgba(99,102,241,0.2)]">
                {PHOTO_MAP[s.name] ? (
                  <img src={PHOTO_MAP[s.name]} alt={s.name} className="w-full h-full object-cover object-top" />
                ) : (
                  <Stethoscope className="w-6 h-6 text-indigo-400" />
                )}
              </div>

              <h3 className="text-xs font-bold text-slate-200 tracking-wide line-clamp-1">
                {s.name}
              </h3>
              <p className="text-[9px] text-slate-500 font-medium mt-1 uppercase tracking-tighter line-clamp-2 min-h-[24px]">
                {ar ? s.roleAr : s.roleEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Footer Details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="w-full border-t border-white/5 pt-4 mt-6 z-10 flex flex-col md:flex-row justify-between items-center gap-2 text-slate-500 text-[10px] md:px-4"
      >
        <span className="font-semibold tracking-wider text-amber-500/80">
          {ar ? "المجموعة السادسة — الدفعة الخامسة" : "GROUP 6 • 5TH YEAR BATCH"}
        </span>
        <span className="text-slate-600">
          {ar ? "كلية الطب — جامعة السويس — 2021/2026" : "FACULTY OF MEDICINE • SUEZ UNIVERSITY • 2021 / 2026"}
        </span>
      </motion.div>
    </div>
  );
}
