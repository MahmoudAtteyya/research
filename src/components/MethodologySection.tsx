"use client";
import { motion } from "framer-motion";
import { Users, Microscope, FlaskConical, BarChart2, Scale, CheckSquare } from "lucide-react";

export default function MethodologySection({ lang }: { lang: "en" | "ar" }) {
  const isAr = lang === "ar";
  const steps = [
    { icon: Users, color: "#00D4FF", title: "Study Design", titleAr: "تصميم الدراسة", text: "Pre-post experimental (within-subject) design assessing acute effects of a single energy drink session.", textAr: "تصميم تجريبي قبل وبعد لتقييم التأثيرات الحادة لجلسة استهلاك واحدة." },
    { icon: Microscope, color: "#00FF9F", title: "Inclusion Criteria", titleAr: "معايير القبول", text: "Healthy adults 18–45 years, both sexes, willing to participate, no chronic diseases or medications affecting CV/cognitive function.", textAr: "بالغون أصحاء 18-45 سنة، كلا الجنسين، بدون أمراض مزمنة أو أدوية." },
    { icon: FlaskConical, color: "#FF4D6D", title: "Physiological Tools", titleAr: "أدوات القياس", text: "Mercury sphygmomanometer (BP), thermometer (temp), manual heart rate & respiratory rate counting.", textAr: "جهاز ضغط زئبقي، ميزان حرارة، قياس يدوي لمعدل النبض والتنفس." },
    { icon: BarChart2, color: "#FFD700", title: "Cognitive Battery", titleAr: "الاختبارات المعرفية", text: "Mindfulness Scale, Paired Associate Learning (21 pairs), Digit Span, Digit Subtraction, Timed Arithmetic.", textAr: "مقياس اليقظة، اختبار الاقتران (21 زوجاً)، الأرقام، طرح الأرقام، الحساب المقيد." },
    { icon: Scale, color: "#A78BFA", title: "Statistical Analysis", titleAr: "التحليل الإحصائي", text: "SPSS v26. Paired t-test for pre-post comparison. Descriptive stats: Mean ± SD, frequencies & percentages.", textAr: "SPSS الإصدار 26. اختبار t للأزواج. متوسط ± انحراف معياري، تكرارات ونسب." },
    { icon: CheckSquare, color: "#00D4FF", title: "Ethics", titleAr: "الأخلاقيات", text: "Written informed consent from all participants. Data anonymized. Voluntary participation with right to withdraw.", textAr: "موافقة مكتوبة من الجميع. بيانات مجهولة. مشاركة طوعية مع حق الانسحاب." },
  ];

  const protocol = [
    { emoji: "📋", step: "Enrollment", stepAr: "التسجيل", sub: "Consent + Survey", subAr: "موافقة + استبيان" },
    { emoji: "📊", step: "Baseline", stepAr: "القياس الأولي", sub: "Vitals + Cognitive", subAr: "علامات حيوية + معرفي" },
    { emoji: "⚡", step: "Consumption", stepAr: "الاستهلاك", sub: "Energy Drink", subAr: "مشروب الطاقة" },
    { emoji: "⏱️", step: "30 Minutes", stepAr: "30 دقيقة", sub: "Wait Period", subAr: "فترة انتظار" },
    { emoji: "✅", step: "Post-Test", stepAr: "القياس النهائي", sub: "Same Measures", subAr: "نفس المقاييس" },
  ];

  return (
    <section id="methodology" className="py-20 px-4 max-w-7xl mx-auto" dir={isAr ? "rtl" : "ltr"}>
      <div className="mb-10">
        <h2 className="text-3xl lg:text-4xl font-black gradient-text mb-2">{isAr ? "المنهج والأدوات" : "Subjects & Methods"}</h2>
        <p style={{ color: "var(--text-muted)" }}>{isAr ? "تصميم الدراسة، أدوات القياس، والتحليل الإحصائي" : "Study design, measurement tools & statistical analysis"}</p>
        <div className="mt-3 h-1 w-16 rounded-full" style={{ background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-green))" }} />
      </div>

      {/* Protocol flow */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="glass rounded-2xl p-6 mb-10">
        <h3 className="font-bold text-center mb-6" style={{ color: "var(--accent-cyan)" }}>{isAr ? "بروتوكول الدراسة" : "Study Protocol"}</h3>
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-3 sm:gap-0">
          {protocol.map((item, i, arr) => (
            <div key={i} className="flex items-center">
              <div className="text-center w-20">
                <div className="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl"
                  style={{ background: "var(--bg-surface-2)", border: "1px solid var(--border-accent)" }}>
                  {item.emoji}
                </div>
                <div className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{isAr ? item.stepAr : item.step}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{isAr ? item.subAr : item.sub}</div>
              </div>
              {i < arr.length - 1 && (
                <div className="hidden sm:block mx-2 text-lg" style={{ color: "var(--accent-cyan)", opacity: 0.5 }}>→</div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Participant stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { val: "47", label: isAr ? "إجمالي المشاركين" : "Total Participants", color: "var(--accent-cyan)" },
          { val: "70.2%", label: isAr ? "ذكور" : "Male", color: "var(--accent-green)" },
          { val: "29.8%", label: isAr ? "إناث" : "Female", color: "var(--accent-red)" },
          { val: "23.68", label: isAr ? "متوسط العمر (سنة)" : "Mean Age (yrs)", color: "var(--accent-gold)" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-4 text-center" style={{ borderTop: `2px solid ${s.color}` }}>
            <div className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.val}</div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <h4 className="font-bold text-sm" style={{ color: s.color }}>{isAr ? s.titleAr : s.title}</h4>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{isAr ? s.textAr : s.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
