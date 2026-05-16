"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AbstractSection from "@/components/AbstractSection";
import ResultsSection from "@/components/ResultsSection";
import MethodologySection from "@/components/MethodologySection";
import VitalSimulator from "@/components/VitalSimulator";
import DiscussionSection from "@/components/DiscussionSection";
import ConclusionSection from "@/components/ConclusionSection";
import QuizSection from "@/components/QuizSection";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ParticleBackground from "@/components/ParticleBackground";

export default function HomePage() {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const toggleLang = () => setLang(l => l === "en" ? "ar" : "en");

  return (
    <main className="min-h-screen relative">
      <ParticleBackground />
      <ScrollProgress />
      <Navbar lang={lang} onLangChange={toggleLang} />

      <div className="relative z-10">
        <HeroSection lang={lang} />
        <div className="section-divider" />
        <AbstractSection lang={lang} />
        <div className="section-divider" />
        <ResultsSection lang={lang} />
        <div className="section-divider" />
        <VitalSimulator lang={lang} />
        <div className="section-divider" />
        <MethodologySection lang={lang} />
        <div className="section-divider" />
        <DiscussionSection lang={lang} />
        <div className="section-divider" />
        <ConclusionSection lang={lang} />
        <div className="section-divider" />
        <QuizSection lang={lang} />
        <div className="section-divider" />
        <TeamSection lang={lang} />
        <Footer lang={lang} />
      </div>
    </main>
  );
}
