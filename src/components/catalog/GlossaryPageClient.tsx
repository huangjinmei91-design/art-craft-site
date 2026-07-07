"use client";

import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import { findGlossaryBySlug } from "@/data/catalog";
import { getHomePageData } from "@/data/home";
import { GlossaryDetailView } from "./GlossaryDetailView";
import styles from "./CatalogPage.module.css";
import { usePreferredLocale } from "@/components/usePreferredLocale";

function selectGlossaryRelatedObjects<T extends { href: string; title: string }>(
  items: T[],
  seed: number,
  count = 4
): T[] {
  if (items.length <= count) {
    return items;
  }

  const normalizedSeed = Number.isFinite(seed) && seed > 0 ? seed : 1;

  return items
    .map((item, index) => {
      let hash = normalizedSeed + index * 2654435761;
      const source = `${item.href}:${item.title}`;

      for (const char of source) {
        hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
      }

      return {
        item,
        hash: hash >>> 0
      };
    })
    .sort((left, right) => left.hash - right.hash)
    .slice(0, count)
    .map((entry) => entry.item);
}

export function GlossaryPageClient({ slug }: { slug: string }) {
  const [locale, setLocale] = usePreferredLocale("zh-Hans");
  const [relatedSeed, setRelatedSeed] = useState<number>(0);
  const home = useMemo(() => getHomePageData(locale), [locale]);
  const entry = findGlossaryBySlug(locale, slug);

  useEffect(() => {
    if (typeof window === "undefined" || relatedSeed !== 0) {
      return;
    }

    const randomSeed = window.crypto?.getRandomValues
      ? window.crypto.getRandomValues(new Uint32Array(1))[0] ?? 1
      : Math.floor(Math.random() * 1_000_000_000);

    setRelatedSeed(randomSeed || 1);
  }, [relatedSeed]);

  if (!entry) {
    return null;
  }

  const selectedRelatedObjects = selectGlossaryRelatedObjects(
    entry.relatedObjects,
    relatedSeed,
    4
  );

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
            entry={{ ...entry, relatedObjects: selectedRelatedObjects }}
          />
        </div>
      </PageContainer>
    </main>
  );
}
