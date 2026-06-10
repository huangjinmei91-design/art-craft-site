"use client";

import { useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import { findGlossaryBySlug } from "@/data/catalog";
import { getHomePageData } from "@/data/home";
import { GlossaryDetailView } from "./GlossaryDetailView";
import styles from "./CatalogPage.module.css";
import { usePreferredLocale } from "@/components/usePreferredLocale";

export function GlossaryPageClient({ slug }: { slug: string }) {
  const [locale, setLocale] = usePreferredLocale("zh-Hans");
  const home = useMemo(() => getHomePageData(locale), [locale]);
  const entry = findGlossaryBySlug(locale, slug);

  if (!entry) {
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
          <GlossaryDetailView
            backHref="/objects"
            backLabel={locale === "zh-Hans" ? "首页 / 浏览物件 / 文化延伸" : "首頁 / 瀏覽物件 / 文化延伸"}
            entry={entry}
          />
        </div>
      </PageContainer>
    </main>
  );
}
