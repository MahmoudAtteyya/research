"use client";
import { motion } from "framer-motion";
import { Target, Lightbulb } from "lucide-react";

export default function ConclusionSection({ lang }: { lang: "en" | "ar" }) {
  const isAr = lang === "ar";
  const recommendations = isAr ? [
    { icon: "📢", title: "التوعية الصحية", text: "تنفيذ برامج توعوية حول التأثيرات الفسيولوجية ومخاطر الاستهلاك المفرط" },
    { icon: "⚖️", title: "الاستهلاك المعتدل", text: "الحد من الاستهلاك وتجنب الجرعات العالية أو المتكررة خاصة للمراهقين" },
    { icon: "🏥", title: "التقييم السريري", text: "المتخصصون الصحيون يجب أن يستفسروا عن مشروبات الطاقة أثناء التقييمات الروتينية" },
    { icon: "🎓", title: "سياسات الجامعة", text: "تشجيع بدائل صحية: النوم الكافي والتغذية السليمة والتمارين الرياضية" },
    { icon: "🔬", title: "البحث المستقبلي", text: "دراسات بعينات أكبر وفترات متابعة أطول لتقييم التأثيرات طويلة الأمد" },
  ] : [
    { icon: "📢", title: "Public Health Awareness", text: "Educational programs about physiological effects and risks of excessive energy drink consumption" },
    { icon: "⚖️", title: "Moderation", text: "Limit intake and avoid frequent or high-dose consumption, especially adolescents and young adults" },
    { icon: "🏥", title: "Clinical Screening", text: "Healthcare professionals should inquire about energy drink use during routine clinical assessments" },
    { icon: "🎓", title: "University Policy", text: "Promote healthier alternatives: adequate sleep, proper nutrition, and regular exercise" },
    { icon: "🔬", title: "Future Research", text: "Studies with larger samples and longer follow-up to assess long-term cardiovascular & cognitive effects" },
  ];

  return (
    <section id="conclusion" className="py-20 px-4 max-w-7xl mx-auto" dir={isAr ? "rtl" : "ltr"}>
      <div className="mb-10">
        <h2 className="text-3xl lg:text-4xl font-black gradient-text mb-2">{isAr ? "الخلاصة والتوصيات" : "Conclusion & Recommendations"}</h2>
        <div className="mt-3 h-1 w-16 rounded-full" style={{ background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-green))" }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="glass rounded-2xl p-8 mb-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-green))" }} />
        <div className="flex items-start gap-4">
          <Target className="w-7 h-7 flex-shrink-0" style={{ color: "var(--accent-cyan)" }} />
          <div>
            <h3 className="text-lg font-bold mb-3" style={{ color: "var(--accent-cyan)" }}>{isAr ? "الخلاصة" : "Conclusion"}</h3>
            <p className="leading-relaxed text-sm lg:text-base mb-4" style={{ color: "var(--text-muted)" }}>
              {isAr
                ? "كشفت نتائج هذه الدراسة عن زيادة معنوية إحصائياً في معدل ضربات القلب وضغط الدم ومعدل التنفس ودرجة الحرارة بعد استهلاك مشروبات الطاقة. كما أظهر المشاركون تحسناً في الانتباه ووقت الاستجابة والأداء المعرفي. على الرغم من هذه الفوائد قصيرة الأمد، فإن التغيرات القلبية الوعائية الملحوظة تسلط الضوء على مخاوف صحية محتملة خاصة عند الاستخدام المتكرر أو المفرط. تُقدم مشروبات الطاقة تحسيناً معرفياً عابراً ولكن مصحوباً بتغيرات فسيولوجية قابلة للقياس تستوجب الحذر."
                : "This study revealed statistically significant increases in heart rate, blood pressure, respiratory rate, and temperature after energy drink consumption. Participants showed improvements in attention, reaction time, and cognitive performance. Despite these short-term benefits, the observed cardiovascular changes highlight potential health concerns, particularly with frequent or excessive use. Energy drinks may provide transient cognitive enhancement; however, their consumption is associated with measurable physiological changes that warrant caution."}
            </p>
            <div className="flex flex-wrap gap-2">
              {(isAr ? ["تأثير فسيولوجي موثق", "تحسن معرفي مؤقت", "مخاوف قلبية وعائية", "الحذر من الإفراط"] :
                ["Documented physiological impact", "Transient cognitive benefit", "Cardiovascular concerns", "Caution with excessive use"]).map((tag, i) => (
                <span key={i} className="px-3 py-1 text-xs rounded-full font-medium"
                  style={{ border: "1px solid var(--border-accent)", color: "var(--accent-cyan)", background: "var(--glow-cyan)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div>
        <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
          <Lightbulb className="w-5 h-5" style={{ color: "var(--accent-gold)" }} />
          <span className="gradient-text-warm">{isAr ? "التوصيات" : "Recommendations"}</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {recommendations.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-5 text-center group cursor-default">
              <div className="text-3xl mb-3">{r.icon}</div>
              <h4 className="font-bold text-sm mb-2 group-hover:gradient-text transition-all" style={{ color: "var(--text-primary)" }}>{r.title}</h4>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{r.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
