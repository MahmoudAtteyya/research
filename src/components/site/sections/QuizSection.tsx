import type { Dictionary } from "@/content/i18n";
import { Section } from "../ui/Section";
import { Quiz } from "../interactive/Quiz";

export function QuizSection({ t }: { t: Dictionary }) {
  return (
    <Section id="quiz" index={7} kicker={t.sections.quiz.kicker} title={t.sections.quiz.title} lead={t.quiz.lead} tone="tint" glow="blue" className="no-print">
      <Quiz t={t.quiz} />
    </Section>
  );
}
