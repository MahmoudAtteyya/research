"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang, TEAM_MEMBERS, SUPERVISORS } from "@/lib/presentation/slides-data";

export default function CoverSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div className="pres-slide-inner pres-cover">
      {/* Logos */}
      <motion.div className="pres-cover-logos" initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <img src="/university.svg" alt="Suez University" className="pres-cover-logo" />
        <div className="pres-cover-sep" />
        <img src="/faculty.svg" alt="Faculty" className="pres-cover-logo" />
      </motion.div>

      {/* University */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
        <div className="pres-cover-uni">{ar ? "جامعة السويس" : "Suez University"}</div>
        <div className="pres-cover-fac">{ar ? "كلية الطب — مشروع التخرج — الدفعة الخامسة" : "Faculty of Medicine · Graduation Project · 5th Year Batch"}</div>
      </motion.div>

      <div className="pres-cover-sep-line" />

      {/* Title */}
      <motion.h1 className="pres-cover-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.6 }}>
        {ar
          ? "تأثير استهلاك مشروبات الطاقة على العلامات الحيوية والأداء المعرفي لدى البالغين"
          : "Effect of Energy Drinks Consumption on Vital Signs and Cognitive Performance Among Adults"}
      </motion.h1>
      <motion.div className="pres-cover-group" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        {ar ? "دفعة 2021 / 2026" : "Batch 2021 / 2026"}
      </motion.div>

      {/* Team */}
      <motion.div className="pres-cover-team" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
        {TEAM_MEMBERS.map((n, i) => <div key={i} className="pres-cover-member">{n}</div>)}
      </motion.div>

      {/* Supervisors */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.68 }}>
        <div style={{ fontSize: "9px", color: "var(--c-text-dim)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>
          {ar ? "تحت إشراف" : "Under Supervision of"}
        </div>
        <div className="pres-cover-sups">
          {SUPERVISORS.map((s, i) => <div key={i} className="pres-sup-chip">{s.name}</div>)}
        </div>
      </motion.div>
    </div>
  );
}
