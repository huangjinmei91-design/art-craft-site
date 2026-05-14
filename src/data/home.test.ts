import assert from "node:assert/strict";
import test from "node:test";
import {
  buildSearchEntries,
  filterSearchEntries,
  getActiveHeroSlide,
  getHomePageData,
  selectHomepageObjectCards
} from "@/data/home";

test("homePageData provides the frontpage sections needed by the homepage", () => {
  const homePageData = getHomePageData("zh-Hans");

  assert.deepEqual(homePageData.navigation.items, [
    { label: "浏览物件", href: "/objects" },
    { label: "探索理念", href: "/concepts" },
    { label: "时代长廊", href: "/timeline" }
  ]);

  assert.equal(homePageData.heroSlides.length, 3);
  assert.deepEqual(
    homePageData.heroSlides.map((slide) => slide.title),
    ["格物致用", "融合多元", "天人合一"]
  );
  assert.deepEqual(
    homePageData.heroSlides.map((slide) => slide.href),
    ["/concepts/utility", "/concepts/fusion", "/concepts/harmony"]
  );
  assert.equal(homePageData.conceptCards.length, 3);
  assert.ok(homePageData.objectCards.length >= 6);
  assert.ok(homePageData.timelineItems.length >= 5);
  assert.equal(homePageData.sections.timeline.actionLabel, "进入时代长廊");

  assert.equal(typeof homePageData.heroSlides[0].title, "string");
  assert.equal(typeof homePageData.heroSlides[0].subtitle, "string");
  assert.equal(typeof homePageData.heroSlides[0].image, "string");
  assert.equal(typeof homePageData.heroSlides[0].alt, "string");
  assert.equal(typeof homePageData.heroSlides[0].href, "string");
});

test("getHomePageData returns traditional Chinese copy when requested", () => {
  const traditionalData = getHomePageData("zh-Hant");

  assert.equal(traditionalData.header.searchLabel, "搜尋");
  assert.equal(traditionalData.sections.objects.title, "瀏覽物件");
  assert.ok(
    traditionalData.objectCards.some(
      (card) => card.href === "/objects/song-jianyangheiyoutuhao-zhan"
    )
  );
});

test("buildSearchEntries and filterSearchEntries keep homepage discovery on valid routes", () => {
  const searchEntries = buildSearchEntries(getHomePageData("zh-Hans"));
  const matches = filterSearchEntries(searchEntries, "茶盏");

  assert.ok(matches.length > 0);
  assert.ok(matches.some((entry) => entry.href === "/objects/tea-bowl"));
});

test("selectHomepageObjectCards returns six unique cards in a seeded order", () => {
  const selected = selectHomepageObjectCards(getHomePageData("zh-Hans").objectCards, 42, 6);

  assert.equal(selected.length, 6);
  assert.equal(new Set(selected.map((item) => item.href)).size, 6);
});

test("getActiveHeroSlide returns null when the hero has no slides", () => {
  assert.equal(getActiveHeroSlide([], 0), null);
});
