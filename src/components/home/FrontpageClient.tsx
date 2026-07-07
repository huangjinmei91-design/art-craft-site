"use client";

import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { ConceptCard } from "@/components/home/ConceptCard";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ObjectCard } from "@/components/home/ObjectCard";
import { TimelineCard } from "@/components/home/TimelineCard";
import {
  buildSearchEntries,
  getHomePageData,
  selectHomepageConceptCards,
  selectHomepageHeroSlides,
  selectHomepageObjectCards,
} from "@/data/home";
import styles from "@/components/home/Frontpage.module.css";
import { usePreferredLocale } from "@/components/usePreferredLocale";

export function FrontpageClient() {
  const [locale, setLocale] = usePreferredLocale("zh-Hans");
  const [conceptSeed, setConceptSeed] = useState<number>(0);
  const [objectSeed, setObjectSeed] = useState<number>(0);
  const pageData = useMemo(() => getHomePageData(locale), [locale]);
  const heroSlides = useMemo(
    () => selectHomepageHeroSlides(pageData.heroSlides, conceptSeed, 3),
    [conceptSeed, pageData.heroSlides]
  );
  const conceptCards = useMemo(
    () => selectHomepageConceptCards(pageData.conceptCards, conceptSeed + 17, 3),
    [conceptSeed, pageData.conceptCards]
  );
  const objectCards = useMemo(
    () => selectHomepageObjectCards(pageData.objectCards, objectSeed, 6),
    [objectSeed, pageData.objectCards]
  );
  const searchEntries = useMemo(() => buildSearchEntries(pageData), [pageData]);

  useEffect(() => {
    if (typeof window === "undefined" || (objectSeed !== 0 && conceptSeed !== 0)) {
      return;
    }

    const randomSeeds = window.crypto?.getRandomValues
      ? window.crypto.getRandomValues(new Uint32Array(2))
      : undefined;
    const nextConceptSeed = randomSeeds?.[0]
      ? randomSeeds[0]
      : Math.floor(Math.random() * 1_000_000_000);
    const nextObjectSeed = randomSeeds?.[1]
      ? randomSeeds[1]
      : Math.floor(Math.random() * 1_000_000_000);

    setConceptSeed(nextConceptSeed || 1);
    setObjectSeed(nextObjectSeed || 1);
  }, [conceptSeed, objectSeed]);

  return (
    <main className={styles.page}>
      <PageContainer>
        <div className={styles.shell}>
          <Header
            navigationItems={pageData.navigation.items}
            locale={locale}
            localeCopy={pageData.header}
            searchEntries={searchEntries}
            onLocaleChange={setLocale}
          />

          <HeroCarousel
            slides={heroSlides}
            emptyState={pageData.heroEmptyState}
          />

          <section className={styles.section} id={pageData.sections.concepts.id}>
            <SectionHeader
              title={pageData.sections.concepts.title}
              actionLabel={pageData.sections.concepts.actionLabel}
              href={pageData.sections.concepts.href}
            />
            <div className={styles.threeColumnGrid}>
              {conceptCards.map((card) => (
                <ConceptCard key={card.title} card={card} />
              ))}
            </div>
          </section>

          <section className={styles.section} id={pageData.sections.objects.id}>
            <SectionHeader
              title={pageData.sections.objects.title}
              actionLabel={pageData.sections.objects.actionLabel}
              href={pageData.sections.objects.href}
            />
            <div className={styles.threeColumnGrid}>
              {objectCards.map((card) => (
                <ObjectCard key={card.title} card={card} />
              ))}
            </div>
          </section>

          <section className={styles.section} id={pageData.sections.timeline.id}>
            <SectionHeader
              title={pageData.sections.timeline.title}
              actionLabel={pageData.sections.timeline.actionLabel}
              href={pageData.sections.timeline.href}
            />
            <div className={styles.timelineGrid}>
              {pageData.timelineItems.map((item) => (
                <TimelineCard key={item.href} item={item} />
              ))}
            </div>
          </section>
        </div>
      </PageContainer>
    </main>
  );
}
