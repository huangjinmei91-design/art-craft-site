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
  selectHomepageObjectCards,
} from "@/data/home";
import styles from "@/components/home/Frontpage.module.css";
import { usePreferredLocale } from "@/components/usePreferredLocale";

export function FrontpageClient() {
  const [locale, setLocale] = usePreferredLocale("zh-Hans");
  const [objectSeed, setObjectSeed] = useState<number>(0);
  const pageData = useMemo(() => getHomePageData(locale), [locale]);
  const objectCards = useMemo(
    () => selectHomepageObjectCards(pageData.objectCards, objectSeed, 6),
    [objectSeed, pageData.objectCards]
  );
  const searchEntries = useMemo(() => buildSearchEntries(pageData), [pageData]);

  useEffect(() => {
    if (typeof window === "undefined" || objectSeed !== 0) {
      return;
    }

    const randomSeed = window.crypto?.getRandomValues
      ? window.crypto.getRandomValues(new Uint32Array(1))[0] ?? 1
      : Math.floor(Math.random() * 1_000_000_000);

    setObjectSeed(randomSeed || 1);
  }, [objectSeed]);

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
            slides={pageData.heroSlides}
            emptyState={pageData.heroEmptyState}
          />

          <section className={styles.section} id={pageData.sections.concepts.id}>
            <SectionHeader
              title={pageData.sections.concepts.title}
              actionLabel={pageData.sections.concepts.actionLabel}
              href={pageData.sections.concepts.href}
            />
            <div className={styles.threeColumnGrid}>
              {pageData.conceptCards.map((card) => (
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
