/**
 * exportToPptx.ts
 * Renders every presentation slide via html2canvas then packs them
 * into a .pptx file using PptxGenJS.
 */
import type { Lang } from "./slides-data";

interface SlideInfo {
  id: string;
  titleEn: string;
  titleAr: string;
}

/**
 * Builds and downloads a .pptx for the given slides.
 * @param slides        Array of slide metadata (id, titles)
 * @param theme         Current theme: "dark" | "projector"
 * @param lang          Current language
 * @param getSlideEl    Callback that returns the DOM element for a given slide id
 */
export async function exportToPptx(
  slides: SlideInfo[],
  theme: "dark" | "projector",
  lang: Lang,
  getSlideEl: (id: string) => HTMLElement | null
) {
  // ── Dynamic imports (keep bundle small) ──
  const [{ default: PptxGenJS }, { default: html2canvas }] = await Promise.all([
    import("pptxgenjs"),
    import("html2canvas"),
  ]);

  const ar = lang === "ar";

  // ── Create presentation ──
  const pptx = new PptxGenJS();
  pptx.layout  = "LAYOUT_WIDE";  // 16:9  (33.87 cm × 19.05 cm)
  pptx.subject = ar
    ? "تأثير مشروبات الطاقة على العلامات الحيوية والأداء المعرفي"
    : "Acute Effects of Energy Drinks on Vital Signs & Cognitive Performance";
  pptx.company = ar ? "جامعة السويس — كلية الطب" : "Suez University — Faculty of Medicine";
  pptx.title   = ar ? "مشروع التخرج — المجموعة 6" : "Graduation Project — Group 6";

  const bgHex = theme === "dark" ? "04071a" : "ffffff";

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const el = getSlideEl(slide.id);
    if (!el) continue;

    let canvas: HTMLCanvasElement;
    try {
      canvas = await html2canvas(el, {
        useCORS:       true,
        allowTaint:    true,
        backgroundColor: theme === "dark" ? "#04071a" : "#ffffff",
        scale:         2,         // Retina quality
        logging:       false,
        removeContainer: true,
      });
    } catch {
      // Skip slides that fail to capture
      continue;
    }

    const imgData = canvas.toDataURL("image/png");

    const pptSlide = pptx.addSlide();
    pptSlide.background = { fill: bgHex };
    pptSlide.addImage({
      data: imgData,
      x: 0, y: 0,
      w: "100%",
      h: "100%",
    });

    // Add slide number as a tiny text (bottom right) — optional
    pptSlide.addText(`${i + 1} / ${slides.length}`, {
      x: "88%", y: "95%",
      w: "10%", h: "4%",
      fontSize: 7,
      color: theme === "dark" ? "555577" : "888888",
      align: "right",
    });
  }

  const dateStr = new Date().toISOString().slice(0, 10);
  const fileName = `energy-drinks-study_${theme}_${dateStr}.pptx`;

  await pptx.writeFile({ fileName });
}
