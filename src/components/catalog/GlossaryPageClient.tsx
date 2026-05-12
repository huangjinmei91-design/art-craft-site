"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import { findGlossaryBySlug } from "@/data/catalog";
import { getHomePageData, type Locale } from "@/data/home";
import { GlossaryDetailView } from "./GlossaryDetailView";
import styles from "./CatalogPage.module.css";

export function GlossaryPageClient({ slug }: { slug: string }) {
  const [locale, setLocale] = useState<Locale>("zh-Hans");
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
            backLabel={locale === "zh-Hans" ? "首页 / 物件详情 / 工艺词条" : "首頁 / 物件詳情 / 工藝詞條"}
            entry={entry}
          />
        </div>
      </PageContainer>
    </main>
  );
}
