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

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case " ":
          e.preventDefault();
          nextSlide();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          prevSlide();
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "n":
        case "N":
          setShowNotes((v) => !v);
          break;
        case "Escape":
          if (document.fullscreenElement) {
            document.exitFullscreen();
            setIsFullscreen(false);
          }
          break;
        case "Home":
          goToSlide(0);
          break;
        case "End":
          goToSlide(totalSlides - 1);
          break;
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener("keydown", handleKey);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [nextSlide, prevSlide, toggleFullscreen, goToSlide, totalSlides]);

  return {
    currentSlide,
    totalSlides,
    isFullscreen,
    showNotes,
    isTransitioning,
    slide: SLIDES[currentSlide],
    goToSlide,
    nextSlide,
    prevSlide,
    toggleFullscreen,
    setShowNotes,
    canNext: currentSlide < totalSlides - 1,
    canPrev: currentSlide > 0,
    progress: ((currentSlide + 1) / totalSlides) * 100,
  };
}
