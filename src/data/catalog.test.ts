import assert from "node:assert/strict";
import test from "node:test";
import {
  findConceptBySlug,
  findGlossaryBySlug,
  findObjectBySlug,
  findTimelineBySlug,
  getCatalogContent
} from "@/data/catalog";

test("getCatalogContent exposes the expected concept, object, and timeline counts", () => {
  const content = getCatalogContent("zh-Hans");

  assert.ok(content.concepts.length >= 4);
  assert.ok(content.objects.length >= 6);
  assert.ok(content.timeline.length >= 5);
  assert.ok(content.glossary.length >= 5);
});

test("detail lookup helpers return localized entries by slug", () => {
  const concept = findConceptBySlug("zh-Hant", "utility");
  const object = findObjectBySlug("zh-Hans", "song-jianyangheiyoutuhao-zhan");
  const timeline = findTimelineBySlug("zh-Hans", "song");
  const glossary = findGlossaryBySlug("zh-Hans", "kiln-transmutation");

  assert.equal(concept?.title, "格物致用");
  assert.equal(object?.title, "宋建阳窑黑釉兔毫盏");
  assert.equal(timeline?.title, "宋");
  assert.equal(glossary?.title, "窑变与兔毫纹");
  assert.ok((concept?.sections.length ?? 0) >= 1);
});

test("imported objects from the single master csv drive the catalog content", () => {
  const content = getCatalogContent("zh-Hans");
  const imported = content.objects.find(
    (item) => item.slug === "song-jianyangheiyoutuhao-zhan"
  );

  assert.ok(imported);
  assert.equal(content.objects.some((item) => item.slug === "tea-bowl"), false);
  assert.equal(imported.title, "宋建阳窑黑釉兔毫盏");
  assert.equal(imported.featuredOnHome, true);
  assert.equal(imported.eraSlug, "song");
  assert.deepEqual(imported.conceptSlugs, ["utility", "zen"]);
});

test("imported object metadata drives search filters, references, and automatic related recommendations", () => {
  const object = findObjectBySlug("zh-Hans", "song-jianyangheiyoutuhao-zhan");

  assert.ok(object);
  assert.equal(object.objectKindSlug, "bowl");
  assert.deepEqual(object.search.colors, ["黑色", "褐色", "铁黑"]);
  assert.deepEqual(object.search.materials, ["瓷器", "黑釉瓷", "建盏"]);
  assert.ok(object.relatedObjects.length > 0);
  assert.ok(object.relatedObjects.length <= 4);
  assert.ok(object.relatedObjects.every((item) => item.href !== "/objects/tea-bowl"));
  assert.ok(object.relatedObjects.every((item) => item.href !== "/objects/song-jianyangheiyoutuhao-zhan"));
  assert.equal(object.references.length, 4);
  assert.equal(object.references[0]?.label, "故宫博物院藏品详情");
});

test("detail lookup helpers return null for unknown slugs", () => {
  assert.equal(findConceptBySlug("zh-Hans", "missing"), null);
  assert.equal(findObjectBySlug("zh-Hans", "missing"), null);
  assert.equal(findTimelineBySlug("zh-Hans", "missing"), null);
  assert.equal(findGlossaryBySlug("zh-Hans", "missing"), null);
});

test("concept related recommendations only include linked objects and are capped at four", () => {
  const concept = findConceptBySlug("zh-Hans", "utility");

  assert.ok(concept);
  assert.ok(concept.relatedObjects.length <= 4);
  assert.ok(concept.relatedObjects.every((item) => item.href.startsWith("/objects/")));
});
