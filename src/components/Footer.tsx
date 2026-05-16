"use client";
import { FlaskConical, Heart } from "lucide-react";

export default function Footer({ lang }: { lang: "en" | "ar" }) {
  const isAr = lang === "ar";
  return (
    <footer dir={isAr ? "rtl" : "ltr"} style={{ borderTop: "1px solid var(--border)", background: "var(--bg-surface)" }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-green))" }}>
                <FlaskConical className="w-5 h-5 text-white" />
              </div>
              <span className="font-black gradient-text">{isAr ? "بحث مشروبات الطاقة" : "Energy Drinks Study"}</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {isAr ? "مشروع تخرج – كلية الطب البشري، جامعة السويس | الفرقة الخامسة 2021–2026" : "Graduation Project – Faculty of Medicine, Suez University | Fifth Year 2021–2026"}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-3" style={{ color: "var(--text-muted)" }}>{isAr ? "التنقل" : "Navigation"}</h4>
            <div className="grid grid-cols-2 gap-1">
              {[
                { href: "#abstract", en: "Abstract", ar: "الملخص" },
                { href: "#results", en: "Results", ar: "النتائج" },
                { href: "#methodology", en: "Methods", ar: "المنهجية" },
                { href: "#simulator", en: "Simulator", ar: "المحاكاة" },
                { href: "#discussion", en: "Discussion", ar: "المناقشة" },
                { href: "#team", en: "Team", ar: "الفريق" },
              ].map(link => (
                <a key={link.href} href={link.href}
                  className="text-xs py-1 transition-colors hover:underline"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--accent-cyan)"}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = "var(--text-muted)"}>
                  {isAr ? link.ar : link.en}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-3" style={{ color: "var(--text-muted)" }}>{isAr ? "معلومات البحث" : "Research Info"}</h4>
            <div className="space-y-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
              <p>📍 {isAr ? "جامعة السويس، مصر" : "Suez University, Egypt"}</p>
              <p>📅 2021–2026</p>
              <p>🔬 {isAr ? "قسم الصحة العامة وطب المجتمع" : "Dept. of Community Medicine"}</p>
              <p>👥 {isAr ? "47 مشاركاً | المجموعة السادسة" : "47 Participants | Group 6"}</p>
            </div>
          </div>
        </div>
        <div className="section-divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
          <p className="flex items-center gap-1.5">
            {isAr ? "صُنع بـ" : "Made with"}
            <Heart className="w-3.5 h-3.5" style={{ color: "var(--accent-red)" }} />
            {isAr ? "من طلاب كلية الطب – جامعة السويس" : "by Suez University Medical Students"}
          </p>
          <p>© 2026 {isAr ? "جميع الحقوق محفوظة" : "All rights reserved"}</p>
        </div>
      </div>
    </footer>
  );
}
