"use client";

import { useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import { getHomePageData, type Locale } from "@/data/home";
import {
  getCatalogContent,
  type ConceptEntry,
  type GlossaryEntry,
  type ObjectEntry
} from "@/data/catalog";
import { ConceptDetailView } from "./ConceptDetailView";
import { ObjectDetailView } from "./ObjectDetailView";
import { TimelineDetailView } from "./TimelineDetailView";
import styles from "./CatalogPage.module.css";
import { usePreferredLocale } from "@/components/usePreferredLocale";

type DetailKind = "concepts" | "objects" | "timeline";

type TimelinePanelCard = {
  title: string;
  summary: string;
  image: string;
  href: string;
  ctaLabel: string;
  variant?: "default" | "conceptIndex" | "timelinePanel";
};

function rankSlugsByFrequency(slugs: string[]): string[] {
  const counts = new Map<string, number>();
  const firstIndex = new Map<string, number>();

  slugs.forEach((slug, index) => {
    counts.set(slug, (counts.get(slug) ?? 0) + 1);
    if (!firstIndex.has(slug)) {
      firstIndex.set(slug, index);
    }
  });

  return [...counts.keys()].sort((left, right) => {
    const countDelta = (counts.get(right) ?? 0) - (counts.get(left) ?? 0);

    if (countDelta !== 0) {
      return countDelta;
    }

    return (firstIndex.get(left) ?? 0) - (firstIndex.get(right) ?? 0);
  });
}

function hashString(value: string): number {
  let hash = 0;

  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }

  return hash;
}

function getTimelinePhilosophyCards(
  locale: Locale,
  eraSlug: string,
  objects: ObjectEntry[],
  concepts: ConceptEntry[]
): TimelinePanelCard[] {
  const conceptSlugs = rankSlugsByFrequency(
    objects
      .filter((item) => item.eraSlug === eraSlug)
      .flatMap((item) => item.conceptSlugs)
  ).slice(0, 2);

  return conceptSlugs
    .map((slug) => concepts.find((item) => item.slug === slug))
    .filter((item): item is ConceptEntry => Boolean(item))
    .map((item) => ({
      title: item.title,
      summary: item.summary,
      image: item.image,
      href: item.href,
      ctaLabel: locale === "zh-Hans" ? "进入理念" : "進入理念",
      variant: "timelinePanel"
    }));
}

function getTimelineCultureCards(
  locale: Locale,
  eraSlug: string,
  objects: ObjectEntry[],
  glossary: GlossaryEntry[]
): TimelinePanelCard[] {
  const relatedTermSlugs = rankSlugsByFrequency(
    objects
      .filter((item) => item.eraSlug === eraSlug)
      .flatMap((item) => item.relatedTerms)
      .filter((item) => item.kind === "glossary")
      .map((item) => item.href.split("/").pop() ?? "")
      .filter(Boolean)
  ).slice(0, 4);

  return relatedTermSlugs
    .map((slug) => glossary.find((item) => item.slug === slug))
    .filter((item): item is GlossaryEntry => Boolean(item))
    .map((item) => ({
      title: item.title,
      summary: item.summary,
      image: item.introMedia[0]?.image || item.historyMedia[0]?.image || "/images/video-kiln.svg",
      href: item.href,
      ctaLabel: locale === "zh-Hans" ? "进入词条" : "進入詞條",
      variant: "timelinePanel"
    }));
}

function getTimelineRecommendedObjects(eraSlug: string, objects: ObjectEntry[]) {
  return [...objects]
    .filter((item) => item.eraSlug === eraSlug)
    .sort((left, right) => {
      const leftHash = hashString(`${eraSlug}-${left.slug}`);
      const rightHash = hashString(`${eraSlug}-${right.slug}`);

      if (leftHash === rightHash) {
        return left.slug.localeCompare(right.slug);
      }

      return leftHash - rightHash;
    })
    .slice(0, 4)
    .map((item) => ({
      title: item.title,
      meta: item.accessionNumber,
      image: item.image,
      href: item.href
    }));
}

export function CatalogDetailClient({
  kind,
  slug
}: {
  kind: DetailKind;
  slug: string;
}) {
  const [locale, setLocale] = usePreferredLocale("zh-Hans");
  const home = useMemo(() => getHomePageData(locale), [locale]);
  const catalog = useMemo(() => getCatalogContent(locale), [locale]);

  const concept = kind === "concepts" ? catalog.concepts.find((item) => item.slug === slug) : null;
  const object = kind === "objects" ? catalog.objects.find((item) => item.slug === slug) : null;
  const era = kind === "timeline" ? catalog.timeline.find((item) => item.slug === slug) : null;

  if (kind === "concepts" && concept) {
    return (
      <main className={styles.page}>
        <PageContainer>
          <div className={styles.shell}>
            <Header
              navigationItems={home.navigation.items}
              locale={locale}
              localeCopy={home.header}
              onLocaleChange={setLocale}
            />
            <ConceptDetailView
              backHref="/concepts"
              backLabel={locale === "zh-Hans" ? "首页 / 探索理念" : "首頁 / 探索理念"}
              concept={concept}
            />
          </div>
        </PageContainer>
      </main>
    );
  }

  if (kind === "objects" && object) {
    return (
      <main className={styles.page}>
        <PageContainer>
          <div className={styles.shell}>
            <Header
              navigationItems={home.navigation.items}
              locale={locale}
              localeCopy={home.header}
              onLocaleChange={setLocale}
            />
            <ObjectDetailView
              backHref="/objects"
              backLabel={locale === "zh-Hans" ? "首页 / 浏览物件 / 物件详情" : "首頁 / 瀏覽物件 / 物件詳情"}
              object={object}
            />
          </div>
        </PageContainer>
      </main>
    );
  }

  if (!era) {
    return null;
  }

  return (
    <main className={styles.page}>
      <PageContainer>
        <div className={styles.shell}>
          <Header
            navigationItems={home.navigation.items}
            locale={locale}
            localeCopy={home.header}
            onLocaleChange={setLocale}
          />
          <TimelineDetailView
            backHref="/timeline"
            backLabel={locale === "zh-Hans" ? "首页 / 时代长廊" : "首頁 / 時代長廊"}
            entry={era}
            philosophyCards={getTimelinePhilosophyCards(
              locale,
              era.slug,
              catalog.objects,
              catalog.concepts
            )}
            cultureCards={getTimelineCultureCards(
              locale,
              era.slug,
              catalog.objects,
              catalog.glossary
            )}
            recommendedObjects={getTimelineRecommendedObjects(era.slug, catalog.objects)}
          />
        </div>
      </PageContainer>
    </main>
  );
}
