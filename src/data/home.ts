import { getCatalogContent } from "./catalog";

export type Locale = "zh-Hans" | "zh-Hant";

export type NavigationItem = {
  label: string;
  href: string;
};

export type HeroSlide = {
  title: string;
  subtitle: string;
  image: string;
  alt: string;
};

export type ConceptCard = {
  title: string;
  description: string;
  image: string;
  href: string;
};

export type ObjectCard = {
  title: string;
  accessionNumber: string;
  image: string;
  href: string;
};

export type TimelineItem = {
  title: string;
  subtitle: string;
  periodLabel: string;
  homeCaptionLines: string[];
  image: string;
  href: string;
};

export type SearchEntry = {
  title: string;
  kind: string;
  href: string;
};

export type HomePageData = {
  header: {
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
  navigation: {
    items: NavigationItem[];
  };
  heroEmptyState: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  sections: {
    concepts: {
      id: string;
      title: string;
      actionLabel: string;
      href: string;
    };
    objects: {
      id: string;
      title: string;
      actionLabel: string;
      href: string;
    };
    timeline: {
      id: string;
      title: string;
      actionLabel: string;
      href: string;
    };
  };
  heroSlides: HeroSlide[];
  conceptCards: ConceptCard[];
  objectCards: ObjectCard[];
  timelineItems: TimelineItem[];
};

function createHomePageContent(locale: Locale): HomePageData {
  const catalog = getCatalogContent(locale);

  return {
    header: {
      searchLabel: locale === "zh-Hans" ? "搜索" : "搜尋",
      searchPlaceholder:
        locale === "zh-Hans"
          ? "搜索理念、物件与时代线索"
          : "搜尋理念、物件與時代線索",
      searchResultsLabel: locale === "zh-Hans" ? "搜索结果" : "搜尋結果",
      searchEmptyLabel:
        locale === "zh-Hans" ? "没有找到匹配内容" : "沒有找到匹配內容",
      localeLabel: locale === "zh-Hans" ? "语言切换" : "語言切換",
      localeOptions: {
        hans: locale === "zh-Hans" ? "简" : "簡",
        hant: locale === "zh-Hans" ? "繁" : "繁"
      }
    },
    navigation: {
      items: [
        {
          label: locale === "zh-Hans" ? "浏览物件" : "瀏覽物件",
          href: "/objects"
        },
        {
          label: locale === "zh-Hans" ? "探索理念" : "探索理念",
          href: "/concepts"
        },
        {
          label: locale === "zh-Hans" ? "时代长廊" : "時代長廊",
          href: "/timeline"
        }
      ]
    },
    heroEmptyState: {
      eyebrow: "Frontpage Placeholder",
      title: locale === "zh-Hans" ? "首页内容整理中" : "首頁內容整理中",
      subtitle:
        locale === "zh-Hans"
          ? "当前轮播内容尚未载入，页面其余内容仍可继续浏览。"
          : "目前輪播內容尚未載入，頁面其餘內容仍可繼續瀏覽。"
    },
    sections: {
      concepts: {
        id: "concepts",
        title: locale === "zh-Hans" ? "探索理念" : "探索理念",
        actionLabel: locale === "zh-Hans" ? "浏览全部理念" : "瀏覽全部理念",
        href: "/concepts"
      },
      objects: {
        id: "objects",
        title: locale === "zh-Hans" ? "浏览物件" : "瀏覽物件",
        actionLabel: locale === "zh-Hans" ? "浏览全部物件" : "瀏覽全部物件",
        href: "/objects"
      },
      timeline: {
        id: "timeline",
        title: locale === "zh-Hans" ? "时代长廊" : "時代長廊",
        actionLabel: locale === "zh-Hans" ? "进入时代线索" : "進入時代線索",
        href: "/timeline"
      }
    },
    heroSlides: [
      {
        title: locale === "zh-Hans" ? "格物致用" : "格物致用",
        subtitle:
          locale === "zh-Hans"
            ? "以中国传统工艺，观美学之境，思哲学之理"
            : "以中國傳統工藝，觀美學之境，思哲學之理",
        image: "/images/hero-celadon-bowl.svg",
        alt: locale === "zh-Hans" ? "青瓷器物主视觉" : "青瓷器物主視覺"
      },
      {
        title: locale === "zh-Hans" ? "器以载道" : "器以載道",
        subtitle:
          locale === "zh-Hans"
            ? "从器物纹理与工序中，理解古人的审美与秩序"
            : "從器物紋理與工序中，理解古人的審美與秩序",
        image: "/images/hero-bronze-dish.svg",
        alt: locale === "zh-Hans" ? "金属器物主视觉" : "金屬器物主視覺"
      },
      {
        title: locale === "zh-Hans" ? "万象入卷" : "萬象入卷",
        subtitle:
          locale === "zh-Hans"
            ? "在时间与工艺之间，重访中国文化的绵长叙事"
            : "在時間與工藝之間，重訪中國文化的綿長敘事",
        image: "/images/hero-scroll-landscape.svg",
        alt: locale === "zh-Hans" ? "卷轴山水主视觉" : "卷軸山水主視覺"
      }
    ],
    conceptCards: catalog.concepts
      .filter((entry) => entry.featuredOnHome)
      .map((entry) => ({
      title: entry.title,
      description: entry.summary,
      image: entry.image,
      href: entry.href
    })),
    objectCards: catalog.objects
      .filter((entry) => entry.featuredOnHome)
      .map((entry) => ({
      title: entry.title,
      accessionNumber: entry.accessionNumber,
      image: entry.image,
      href: entry.href
    })),
    timelineItems: catalog.timeline
      .filter((entry) => entry.featuredOnHome)
      .map((entry) => ({
      title: entry.title,
      subtitle: entry.summary,
      periodLabel: entry.periodLabel,
      homeCaptionLines: entry.homeCaptionLines ?? [],
      image: entry.image,
      href: entry.href
    }))
  };
}

export function getHomePageData(locale: Locale): HomePageData {
  return createHomePageContent(locale);
}

export function buildSearchEntries(data: HomePageData): SearchEntry[] {
  return [
    ...data.navigation.items.map((item) => ({
      title: item.label,
      kind: data.header.searchResultsLabel,
      href: item.href
    })),
    ...data.conceptCards.map((card) => ({
      title: card.title,
      kind: data.sections.concepts.title,
      href: card.href
    })),
    ...data.objectCards.map((card) => ({
      title: card.title,
      kind: data.sections.objects.title,
      href: card.href
    })),
    ...data.timelineItems.map((item) => ({
      title: `${item.title} · ${item.subtitle}`,
      kind: data.sections.timeline.title,
      href: item.href
    }))
  ];
}

export function filterSearchEntries(
  entries: SearchEntry[],
  query: string
): SearchEntry[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return entries.slice(0, 6);
  }

  return entries.filter((entry) =>
    `${entry.kind} ${entry.title}`.toLowerCase().includes(normalizedQuery)
  );
}

export function getActiveHeroSlide(
  slides: HeroSlide[],
  activeIndex: number
): HeroSlide | null {
  if (slides.length === 0) {
    return null;
  }

  return slides[Math.min(activeIndex, slides.length - 1)];
}

export const homePageData = getHomePageData("zh-Hans");
