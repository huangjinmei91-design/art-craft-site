"use client";

import type { Locale, NavigationItem, SearchEntry } from "@/data/home";
import styles from "./Header.module.css";

export function Header({
  navigationItems,
  locale,
  localeCopy,
  onLocaleChange,
  searchHref = "/search"
}: {
  navigationItems: NavigationItem[];
  locale: Locale;
  localeCopy: {
    searchLabel: string;
    searchPlaceholder: string;
    searchResultsLabel: string;
    searchEmptyLabel: string;
    localeLabel: string;
    localeOptions: {
      hans: string;
      hant: string;
    };
  };
  searchEntries?: SearchEntry[];
  onLocaleChange: (locale: Locale) => void;
  searchHref?: string;
}) {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.brand} aria-label="ART&CRAFT 首页">
        <span className={styles.brandGlyph}>⌘</span>
      </a>

      <nav className={styles.nav} aria-label="主导航">
        {navigationItems.map((item) => (
          <a key={item.label} href={item.href} className={styles.navLink}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className={styles.tools}>
        <a href={searchHref} className={styles.searchLink}>
          {localeCopy.searchLabel}
        </a>

        <div className={styles.localeSwitch} aria-label={localeCopy.localeLabel}>
          <button
            type="button"
            className={locale === "zh-Hans" ? styles.localeActive : styles.localeButton}
            aria-pressed={locale === "zh-Hans"}
            onClick={() => onLocaleChange("zh-Hans")}
          >
            {localeCopy.localeOptions.hans}
          </button>
          <button
            type="button"
            className={locale === "zh-Hant" ? styles.localeActive : styles.localeButton}
            aria-pressed={locale === "zh-Hant"}
            onClick={() => onLocaleChange("zh-Hant")}
          >
            {localeCopy.localeOptions.hant}
          </button>
        </div>
      </div>
    </header>
  );
}
