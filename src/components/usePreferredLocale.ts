"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/data/home";

const STORAGE_KEY = "artcraft-locale";

function isLocale(value: string | null): value is Locale {
  return value === "zh-Hans" || value === "zh-Hant";
}

export function usePreferredLocale(defaultLocale: Locale = "zh-Hans") {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (isLocale(stored)) {
      setLocale(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale === "zh-Hans" ? "zh-CN" : "zh-Hant";
  }, [locale]);

  return [locale, setLocale] as const;
}
