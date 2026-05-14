"use client";

import { useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import { OverviewCard } from "./OverviewCard";
import { buildSearchEntries, getHomePageData } from "@/data/home";
import { getCatalogContent } from "@/data/catalog";
import styles from "./CatalogPage.module.css";
import { usePreferredLocale } from "@/components/usePreferredLocale";

type IndexKind = "concepts" | "objects" | "timeline";

const copy = {
  concepts: {
    breadcrumbHans: "探索理念",
    breadcrumbHant: "探索理念",
    meta: {
      hans: "",
      hant: ""
    },
    cta: {
      hans: "进入专题",
      hant: "進入專題"
    }
  },
  objects: {
    breadcrumbHans: "浏览物件",
    breadcrumbHant: "瀏覽物件",
    eyebrow: "Object Index",
    titleHans: "从代表性器物进入工艺系统",
    titleHant: "從代表性器物進入工藝系統",
    summaryHans:
      "以器物为入口，快速理解材料、时代与使用方式之间的关系，形成更直观的工艺认识。",
    summaryHant:
      "以器物為入口，快速理解材料、時代與使用方式之間的關係，形成更直觀的工藝認識。",
    meta: {
      hans: "物件档案",
      hant: "物件檔案"
    },
    cta: {
      hans: "查看物件",
      hant: "查看物件"
    }
  },
  timeline: {
    breadcrumbHans: "时代长廊",
    breadcrumbHant: "時代長廊",
    eyebrow: "Timeline Index",
    titleHans: "沿着时代更替理解工艺气质",
    titleHant: "沿著時代更替理解工藝氣質",
    summaryHans:
      "以朝代与气质为轴线，梳理形式、材料和审美判断如何随着时代发生变化。",
    summaryHant:
      "以朝代與氣質為軸線，梳理形式、材料和審美判斷如何隨著時代發生變化。",
    meta: {
      hans: "时代线索",
      hant: "時代線索"
    },
    cta: {
      hans: "查看时代",
      hant: "查看時代"
    }
  }
} as const;

export function CatalogIndexClient({ kind }: { kind: IndexKind }) {
  const [locale, setLocale] = usePreferredLocale("zh-Hans");
  const home = useMemo(() => getHomePageData(locale), [locale]);
  const catalog = useMemo(() => getCatalogContent(locale), [locale]);
  const searchEntries = useMemo(() => buildSearchEntries(home), [home]);
  const pageCopy = copy[kind];

  return (
    <main className={styles.page}>
      <PageContainer>
        <div className={styles.shell}>
          <Header
            navigationItems={home.navigation.items}
            locale={locale}
            localeCopy={home.header}
            searchEntries={searchEntries}
            onLocaleChange={setLocale}
          />

          <section className={styles.hero}>
            <div className={styles.breadcrumbs}>
              <a href="/">首页</a>
              <span>/</span>
              <span>
                {locale === "zh-Hans"
                  ? pageCopy.breadcrumbHans
                  : pageCopy.breadcrumbHant}
              </span>
            </div>
          </section>

          <section className={styles.section}>
            <div
              className={kind === "concepts" ? styles.conceptGrid : styles.grid}
            >
              {kind === "concepts"
                ? catalog.concepts.map((item) => (
                    <OverviewCard
                      key={item.slug}
                      title={item.title}
                      image={item.image}
                      href={item.href}
                      ctaLabel={
                        locale === "zh-Hans"
                          ? pageCopy.cta.hans
                          : pageCopy.cta.hant
                      }
                      variant="conceptIndex"
                    />
                  ))
                : null}

              {kind === "objects"
                ? catalog.objects.map((item) => (
                    <OverviewCard
                      key={item.slug}
                      title={item.title}
                      summary={item.summary}
                      image={item.image}
                      href={item.href}
                      meta={item.dynasty}
                      ctaLabel={
                        locale === "zh-Hans"
                          ? pageCopy.cta.hans
                          : pageCopy.cta.hant
                      }
                    />
                  ))
                : null}

              {kind === "timeline"
                ? catalog.timeline.map((item) => (
                    <OverviewCard
                      key={item.slug}
                      title={item.title}
                      summary={item.summary}
                      image={item.image}
                      href={item.href}
                      meta={`${item.periodLabel} · ${item.years}`}
                      ctaLabel={
                        locale === "zh-Hans"
                          ? pageCopy.cta.hans
                          : pageCopy.cta.hant
                      }
                    />
                  ))
                : null}
            </div>
          </section>
        </div>
      </PageContainer>
    </main>
  );
}
