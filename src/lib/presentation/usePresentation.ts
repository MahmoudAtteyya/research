"use client";
import { useState, useEffect, useCallback } from "react";
import { SLIDES } from "./slides-data";

export function usePresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalSlides = SLIDES.length;

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index < 0 || index >= totalSlides) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 300);
    },
    [isTransitioning, totalSlides]
  );

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
  }, [currentSlide, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  // Track fullscreen state changes (from browser button / Escape)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return {
    currentSlide,
    totalSlides,
    isFullscreen,
    setIsFullscreen,
    showNotes,
    isTransitioning,
    slide: SLIDES[currentSlide],
    goToSlide,
    nextSlide,
    prevSlide,
    setShowNotes,
    canNext: currentSlide < totalSlides - 1,
    canPrev: currentSlide > 0,
    progress: ((currentSlide + 1) / totalSlides) * 100,
  };
}
