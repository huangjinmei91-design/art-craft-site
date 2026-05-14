"use client";

import { useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import { getHomePageData } from "@/data/home";
import {
  findConceptBySlug,
  findObjectBySlug,
  findTimelineBySlug
} from "@/data/catalog";
import { EssayDetailView } from "./EssayDetailView";
import { ConceptDetailView } from "./ConceptDetailView";
import { ObjectDetailView } from "./ObjectDetailView";
import styles from "./CatalogPage.module.css";
import { usePreferredLocale } from "@/components/usePreferredLocale";

type DetailKind = "concepts" | "objects" | "timeline";

export function CatalogDetailClient({
  kind,
  slug
}: {
  kind: DetailKind;
  slug: string;
}) {
  const [locale, setLocale] = usePreferredLocale("zh-Hans");
  const home = useMemo(() => getHomePageData(locale), [locale]);

  const concept = kind === "concepts" ? findConceptBySlug(locale, slug) : null;
  const object = kind === "objects" ? findObjectBySlug(locale, slug) : null;
  const era = kind === "timeline" ? findTimelineBySlug(locale, slug) : null;

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
          <EssayDetailView
            backHref="/timeline"
            backLabel={locale === "zh-Hans" ? "首页 / 时代长廊" : "首頁 / 時代長廊"}
            title={era.title}
            subtitle={era.heroSubtitle}
            summary={`${era.periodLabel} · ${era.years} · ${era.summary}`}
            heroImage={era.image}
            heroImageAlt={era.title}
            introLabel={era.introLabel}
            introBody={era.introBody}
            introMedia={era.introMedia}
            sections={era.sections}
            relatedObjects={era.relatedObjects}
            references={era.references}
          />
        </div>
      </PageContainer>
    </main>
  );
}
