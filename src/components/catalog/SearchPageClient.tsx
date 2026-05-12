"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import { getCatalogContent } from "@/data/catalog";
import { getHomePageData, type Locale } from "@/data/home";
import styles from "./SearchPage.module.css";

type SortKey = "featured" | "name" | "dynasty" | "material";

function toggleValue(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function SearchPageClient({ initialQuery = "" }: { initialQuery?: string }) {
  const [locale, setLocale] = useState<Locale>("zh-Hans");
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<SortKey>("featured");
  const [dynasties, setDynasties] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);

  const home = useMemo(() => getHomePageData(locale), [locale]);
  const catalog = useMemo(() => getCatalogContent(locale), [locale]);

  const filterOptions = useMemo(
    () => ({
      dynasties: Array.from(new Set(catalog.objects.map((item) => item.dynasty))),
      colors: Array.from(new Set(catalog.objects.flatMap((item) => item.search.colors))),
      materials: Array.from(new Set(catalog.objects.flatMap((item) => item.search.materials)))
    }),
    [catalog.objects]
  );

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = catalog.objects.filter((item) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${item.title} ${item.summary} ${item.dynasty} ${item.material} ${item.highlights.join(" ")}`
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesDynasty = dynasties.length === 0 || dynasties.includes(item.dynasty);
      const matchesColors =
        colors.length === 0 || colors.every((value) => item.search.colors.includes(value));
      const matchesMaterials =
        materials.length === 0 ||
        materials.every((value) => item.search.materials.includes(value));

      return matchesQuery && matchesDynasty && matchesColors && matchesMaterials;
    });

    return filtered.toSorted((left, right) => {
      if (sort === "name") {
        return left.title.localeCompare(right.title, locale === "zh-Hans" ? "zh-CN" : "zh-TW");
      }

      if (sort === "dynasty") {
        return left.dynasty.localeCompare(
          right.dynasty,
          locale === "zh-Hans" ? "zh-CN" : "zh-TW"
        );
      }

      if (sort === "material") {
        return left.material.localeCompare(
          right.material,
          locale === "zh-Hans" ? "zh-CN" : "zh-TW"
        );
      }

      return Number(right.featuredOnHome) - Number(left.featuredOnHome);
    });
  }, [catalog.objects, colors, dynasties, locale, materials, query, sort]);

  const activeKeywords = [
    ...query
      .split(/\s+/)
      .map((item) => item.trim())
      .filter(Boolean),
    ...dynasties,
    ...colors,
    ...materials
  ];

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

          <section className={styles.content}>
            <aside className={styles.sidebar}>
              <div className={styles.filterBlock}>
                <h2 className={styles.filterTitle}>Keywords</h2>
                <div className={styles.keywordChips}>
                  {activeKeywords.length > 0 ? (
                    activeKeywords.map((item) => (
                      <span key={item} className={styles.keywordChip}>
                        {item}
                      </span>
                    ))
                  ) : (
                    <span className={styles.keywordEmpty}>输入关键词或筛选条件</span>
                  )}
                </div>
              </div>

              <div className={styles.filterBlock}>
                <h2 className={styles.filterTitle}>Dynasty</h2>
                {filterOptions.dynasties.map((item) => (
                  <label key={item} className={styles.filterOption}>
                    <input
                      type="checkbox"
                      checked={dynasties.includes(item)}
                      onChange={() => setDynasties((current) => toggleValue(current, item))}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>

              <div className={styles.filterBlock}>
                <h2 className={styles.filterTitle}>Color</h2>
                {filterOptions.colors.map((item) => (
                  <label key={item} className={styles.filterOption}>
                    <input
                      type="checkbox"
                      checked={colors.includes(item)}
                      onChange={() => setColors((current) => toggleValue(current, item))}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>

              <div className={styles.filterBlock}>
                <h2 className={styles.filterTitle}>Material</h2>
                {filterOptions.materials.map((item) => (
                  <label key={item} className={styles.filterOption}>
                    <input
                      type="checkbox"
                      checked={materials.includes(item)}
                      onChange={() => setMaterials((current) => toggleValue(current, item))}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </aside>

            <div className={styles.resultsColumn}>
              <div className={styles.searchToolbar}>
                <div className={styles.searchBox}>
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={home.header.searchPlaceholder}
                  />
                </div>

                <div className={styles.sortChips}>
                  {[
                    ["featured", locale === "zh-Hans" ? "精选优先" : "精選優先"],
                    ["name", locale === "zh-Hans" ? "名称排序" : "名稱排序"],
                    ["dynasty", locale === "zh-Hans" ? "朝代排序" : "朝代排序"],
                    ["material", locale === "zh-Hans" ? "材质排序" : "材質排序"]
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      className={sort === value ? styles.sortChipActive : styles.sortChip}
                      onClick={() => setSort(value as SortKey)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.resultGrid}>
                {results.map((item) => (
                  <a key={item.href} href={item.href} className={styles.resultCard}>
                    <div className={styles.resultCardHeader}>
                      <h2>{item.title}</h2>
                      <span>{item.accessionNumber}</span>
                    </div>
                    <div className={styles.resultCardImage}>
                      <img src={item.image} alt={item.title} />
                    </div>
                  </a>
                ))}
              </div>

              {results.length === 0 ? (
                <p className={styles.emptyState}>
                  {locale === "zh-Hans" ? "没有符合条件的物件。" : "沒有符合條件的物件。"}
                </p>
              ) : null}
            </div>
          </section>
        </div>
      </PageContainer>
    </main>
  );
}
