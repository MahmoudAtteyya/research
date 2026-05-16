"use client";
import { motion } from "framer-motion";
import { FileText, Target, Users, BarChart3, FlaskConical } from "lucide-react";

export default function AbstractSection({ lang }: { lang: "en" | "ar" }) {
  const isAr = lang === "ar";

  const abstractEN = `Energy drink consumption has markedly increased among university students seeking improved alertness and enhanced academic performance. This pre-post experimental study aimed to assess the acute effects of energy drink consumption on vital signs and cognitive performance among 47 healthy adults at Suez University and Suez University Hospital. Physiological parameters were measured before and 30 minutes after consumption. Five cognitive domains were assessed using validated instruments. Results revealed statistically significant increases in all vital signs (p < 0.001) and improvements across all cognitive domains. These findings indicate that energy drinks produce short-term physiological stimulation alongside limited cognitive enhancement, warranting public health awareness regarding excessive use.`;

  const abstractAR = `ازداد استهلاك مشروبات الطاقة بشكل ملحوظ بين طلاب الجامعات. هدفت هذه الدراسة التجريبية (قبل وبعد) إلى تقييم التأثيرات الحادة لاستهلاك مشروبات الطاقة على العلامات الحيوية والأداء المعرفي لدى 47 بالغًا أصحاء في جامعة السويس ومستشفى جامعة السويس. أظهرت النتائج زيادات ذات دلالة إحصائية في جميع العلامات الحيوية (p < 0.001) وتحسنًا في جميع المجالات المعرفية.`;

  const cards = [
    { icon: Target, label: "Aim", labelAr: "الهدف", color: "#00D4FF", text: "Assess acute effects of energy drink consumption on vital signs and cognitive performance among healthy adults.", textAr: "تقييم التأثيرات الحادة لاستهلاك مشروبات الطاقة على العلامات الحيوية والأداء المعرفي." },
    { icon: Users, label: "Methods", labelAr: "المنهجية", color: "#00FF9F", text: "Pre-post experimental. 47 participants. 5 vital signs + 5 cognitive tests, before and 30 min post-consumption.", textAr: "تصميم قبل وبعد. 47 مشاركاً. 5 علامات حيوية + 5 اختبارات معرفية قبل وبعد 30 دقيقة." },
    { icon: BarChart3, label: "Results", labelAr: "النتائج", color: "#FF4D6D", text: "All vital signs significantly elevated. Cognitive improvements in mindfulness, working memory & processing speed (p < 0.001).", textAr: "ارتفاع معنوي في جميع العلامات الحيوية. تحسن في اليقظة والذاكرة العاملة وسرعة المعالجة." },
    { icon: FlaskConical, label: "Conclusion", labelAr: "الخلاصة", color: "#FFD700", text: "Energy drinks produce short-term physiological stimulation with limited cognitive enhancement. Excessive use warrants awareness.", textAr: "تُحدث مشروبات الطاقة تحفيزاً فسيولوجياً مؤقتاً مع تحسن معرفي محدود. الاستخدام المفرط يستوجب التوعية." },
  ];

  const keywords = ["Energy Drinks", "Vital Signs", "Cognitive Performance", "Caffeine", "University Students", "Pre-Post Study"];

  return (
    <section id="abstract" className="py-20 px-4 max-w-7xl mx-auto" dir={isAr ? "rtl" : "ltr"}>
      <div className="mb-10">
        <h2 className="text-3xl lg:text-4xl font-black gradient-text mb-2">{isAr ? "الملخص" : "Abstract"}</h2>
        <div className="mt-3 h-1 w-16 rounded-full" style={{ background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-green))" }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="glass rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-green), var(--accent-red))" }} />
        <div className="flex items-start gap-4">
          <FileText className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: "var(--accent-cyan)" }} />
          <div>
            <h3 className="font-bold text-lg mb-3" style={{ color: "var(--accent-cyan)" }}>{isAr ? "ملخص البحث" : "Research Abstract"}</h3>
            <p className="leading-relaxed text-sm lg:text-base" style={{ color: "var(--text-muted)" }}>{isAr ? abstractAR : abstractEN}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {keywords.map((kw, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ border: "1px solid var(--border-accent)", color: "var(--accent-cyan)", background: "var(--glow-cyan)" }}>
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-5 relative overflow-hidden"
            style={{ borderTop: `3px solid ${c.color}` }}>
            <c.icon className="w-6 h-6 mb-3" style={{ color: c.color }} />
            <h4 className="font-bold mb-2" style={{ color: c.color }}>{isAr ? c.labelAr : c.label}</h4>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{isAr ? c.textAr : c.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
