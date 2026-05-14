"use client";

import { useEffect, useState } from "react";
import { getActiveHeroSlide, type HeroSlide } from "@/data/home";
import { getNextCarouselIndex } from "./carouselState";
import styles from "./HeroCarousel.module.css";

export function HeroCarousel({
  slides,
  emptyState
}: {
  slides: HeroSlide[];
  emptyState: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => getNextCarouselIndex(current, slides.length));
    }, 4800);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  const activeSlide = getActiveHeroSlide(slides, activeIndex);

  if (!activeSlide) {
    return (
      <section className={styles.heroFallback} aria-label="首页轮播占位">
        <p className={styles.eyebrow}>{emptyState.eyebrow}</p>
        <h1 className={styles.title}>{emptyState.title}</h1>
        <p className={styles.subtitle}>{emptyState.subtitle}</p>
      </section>
    );
  }

  return (
    <section className={styles.hero} aria-label="首页轮播">
      <a href={activeSlide.href} className={styles.heroLink} aria-label={`进入 ${activeSlide.title}`}>
        <div className={styles.mediaPanel}>
          <img src={activeSlide.image} alt={activeSlide.alt} className={styles.image} />
        </div>
      </a>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrow}
          aria-label="上一张"
          onClick={() =>
            setActiveIndex((current) =>
              getNextCarouselIndex(current, slides.length, -1)
            )
          }
        >
          ←
        </button>

        <div className={styles.dots} aria-label="轮播分页">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              className={index === activeIndex ? styles.dotActive : styles.dot}
              aria-label={`切换到第 ${index + 1} 张`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.arrow}
          aria-label="下一张"
          onClick={() =>
            setActiveIndex((current) =>
              getNextCarouselIndex(current, slides.length, 1)
            )
          }
        >
          →
        </button>
      </div>
    </section>
  );
}
