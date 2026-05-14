import type { Locale } from "./home";
import importedMasterRows from "./generated/master-content.json";

type LocalizedText = Record<Locale, string>;

type MediaSeed = {
  image: string;
  alt: LocalizedText;
  caption?: LocalizedText;
};

type ReferenceSeed = {
  label: LocalizedText;
  href: string;
};

type EssaySectionSeed = {
  heading: LocalizedText;
  body: LocalizedText[];
  media?: MediaSeed[];
};

type RelatedCard = {
  title: string;
  meta: string;
  image: string;
  href: string;
};

type EssaySection = {
  heading: string;
  body: string[];
  media: MediaItem[];
};

export type MediaItem = {
  image: string;
  alt: string;
  caption?: string;
};

export type ReferenceItem = {
  label: string;
  href: string;
};

export type CraftInsight = {
  title: string;
  summary: string;
  image: string;
  href?: string;
};

export type RelatedTermLink = {
  title: string;
  href: string;
  kind: "glossary" | "concept";
};

export type ConceptEntry = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  accent: string;
  heroSubtitle: string;
  introLabel: string;
  introBody: string[];
  introMedia: MediaItem[];
  sections: EssaySection[];
  diagram: MediaItem | null;
  relatedObjects: RelatedCard[];
  references: ReferenceItem[];
  featuredOnHome: boolean;
  href: string;
};

export type ObjectEntry = {
  slug: string;
  eraSlug: string;
  materialSlug: string;
  objectKindSlug: string;
  conceptSlugs: string[];
  title: string;
  accessionNumber: string;
  dynasty: string;
  material: string;
  image: string;
  summary: string;
  highlights: string[];
  overview: string[];
  craftInsights: CraftInsight[];
  cultureTitle: string;
  cultureBody: string[];
  cultureMedia: MediaItem[];
  relatedTerms: RelatedTermLink[];
  cultureCtaLabel: string;
  cultureCtaHref: string;
  relatedObjects: RelatedCard[];
  references: ReferenceItem[];
  search: {
    colors: string[];
    materials: string[];
  };
  featuredOnHome: boolean;
  href: string;
};

export type TimelineEntry = {
  slug: string;
  title: string;
  periodLabel: string;
  years: string;
  homeCaptionLines: string[];
  image: string;
  summary: string;
  heroSubtitle: string;
  introLabel: string;
  introBody: string[];
  introMedia: MediaItem[];
  sections: EssaySection[];
  relatedObjects: RelatedCard[];
  references: ReferenceItem[];
  featuredOnHome: boolean;
  href: string;
};

export type GlossaryEntry = {
  slug: string;
  title: string;
  summary: string;
  intro: string[];
  steps: Array<{
    title: string;
    body: string;
    image: string;
  }>;
  video: {
    title: string;
    image: string;
  };
  relatedObjects: RelatedCard[];
  references: ReferenceItem[];
  href: string;
};

export type CatalogContent = {
  concepts: ConceptEntry[];
  objects: ObjectEntry[];
  timeline: TimelineEntry[];
  glossary: GlossaryEntry[];
};

type ObjectSeed = {
  slug: string;
  eraSlug: string;
  materialSlug: string;
  objectKindSlug: string;
  conceptSlugs: string[];
  relatedTermSlugs?: string[];
  title: LocalizedText;
  accessionNumber: string;
  dynasty: LocalizedText;
  material: LocalizedText;
  image: string;
  summary: LocalizedText;
  highlights: LocalizedText[];
  overview: LocalizedText[];
  craftInsights: Array<{
    title: LocalizedText;
    summary: LocalizedText;
    image: string;
    glossarySlug: string;
  }>;
  cultureTitle: LocalizedText;
  cultureBody: LocalizedText[];
  cultureMedia: MediaSeed[];
  cultureCtaLabel: LocalizedText;
  cultureCtaHref: string;
  relatedObjectSlugs: string[];
  references: ReferenceSeed[];
  search: {
    colors: LocalizedText[];
    materials: LocalizedText[];
  };
  featuredOnHome: boolean;
};

type EssaySeed = {
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  image: string;
  accent: string;
  heroSubtitle: LocalizedText;
  introLabel: LocalizedText;
  introBody: LocalizedText[];
  introMedia: MediaSeed[];
  sections: EssaySectionSeed[];
  diagram?: MediaSeed;
  relatedObjectSlugs: string[];
  references: ReferenceSeed[];
  featuredOnHome: boolean;
};

type TimelineSeed = {
  slug: string;
  title: LocalizedText;
  periodLabel: LocalizedText;
  years: LocalizedText;
  homeCaptionLines: LocalizedText[];
  image: string;
  summary: LocalizedText;
  heroSubtitle: LocalizedText;
  introLabel: LocalizedText;
  introBody: LocalizedText[];
  introMedia: MediaSeed[];
  sections: EssaySectionSeed[];
  relatedObjectSlugs: string[];
  references: ReferenceSeed[];
  featuredOnHome: boolean;
};

type GlossarySeed = {
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  intro: LocalizedText[];
  steps: Array<{
    title: LocalizedText;
    body: LocalizedText;
    image: string;
  }>;
  video: {
    title: LocalizedText;
    image: string;
  };
  relatedObjectSlugs: string[];
  references: ReferenceSeed[];
};

type ImportedMasterRow = Record<string, unknown>;

function inferEraSlug(value: string): string {
  if (!value) {
    return "";
  }

  if (value.includes("唐")) return "tang";
  if (value.includes("宋")) return "song";
  if (value.includes("元")) return "yuan";
  if (value.includes("明")) return "ming";
  if (value.includes("清")) return "qing";

  return "";
}

function inferMaterialSlug(value: string): string {
  if (!value) {
    return "uncategorized";
  }

  if (value.includes("瓷") || value.includes("陶")) return "ceramic";
  if (value.includes("漆")) return "lacquer";
  if (value.includes("铜") || value.includes("金") || value.includes("银") || value.includes("铁")) {
    return "metalwork";
  }
  if (value.includes("玻璃")) return "glass";
  if (value.includes("木") || value.includes("竹")) return "wood-bamboo";
  if (value.includes("丝") || value.includes("绢") || value.includes("纺")) return "textile";

  return "uncategorized";
}

function inferConceptSlugs(value: string): string[] {
  const matched = value.match(/\/concepts\/([a-z0-9-]+)/);
  return matched?.[1] ? [matched[1]] : [];
}

function inferObjectKindSlug(value: string): string {
  if (!value) {
    return "object";
  }

  if (value.includes("盏") || value.includes("碗")) return "bowl";
  if (value.includes("盘") || value.includes("托")) return "tray";
  if (value.includes("扇")) return "fan";
  if (value.includes("箱") || value.includes("匣")) return "case";
  if (value.includes("灯") || value.includes("台")) return "stand";

  return "object";
}

function localizeText(locale: Locale, value: LocalizedText): string {
  return value[locale];
}

function createLocalizedText(hans: string, hant: string): LocalizedText {
  return {
    "zh-Hans": hans,
    "zh-Hant": hant || hans
  };
}

function splitField(value: string): string[] {
  if (!value) {
    return [];
  }

  return value
    .split("||")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getRowValue(
  row: Record<string, unknown>,
  key: string
): string {
  const value = row[key];

  return typeof value === "string" ? value : "";
}

function localizeTextList(locale: Locale, values: LocalizedText[]): string[] {
  return values.map((value) => localizeText(locale, value));
}

function localizeMedia(locale: Locale, values: MediaSeed[]): MediaItem[] {
  return values.map((value) => ({
    image: value.image,
    alt: localizeText(locale, value.alt),
    caption: value.caption ? localizeText(locale, value.caption) : undefined
  }));
}

function localizeReferences(locale: Locale, values: ReferenceSeed[]): ReferenceItem[] {
  return values.map((value) => ({
    label: localizeText(locale, value.label),
    href: value.href
  }));
}

function localizeSections(locale: Locale, values: EssaySectionSeed[]): EssaySection[] {
  return values.map((value) => ({
    heading: localizeText(locale, value.heading),
    body: localizeTextList(locale, value.body),
    media: localizeMedia(locale, value.media ?? [])
  }));
}

function buildImportedObjectSeeds(): ObjectSeed[] {
  return (importedMasterRows as ImportedMasterRow[])
    .filter((row) => getRowValue(row, "record_type") === "object")
    .map((row) => {
    const referenceLabelsHans = splitField(getRowValue(row, "reference_labels_zh_hans"));
    const referenceLabelsHant = splitField(getRowValue(row, "reference_labels_zh_hant"));
    const referenceHrefs = splitField(getRowValue(row, "reference_hrefs"));
    const highlightsHans = splitField(getRowValue(row, "highlights_zh_hans"));
    const highlightsHant = splitField(getRowValue(row, "highlights_zh_hant"));
    const overviewHans = splitField(getRowValue(row, "overview_zh_hans"));
    const overviewHant = splitField(getRowValue(row, "overview_zh_hant"));
    const cultureBodyHans = splitField(getRowValue(row, "culture_body_zh_hans"));
    const cultureBodyHant = splitField(getRowValue(row, "culture_body_zh_hant"));
    const colorHans = splitField(getRowValue(row, "search_colors_zh_hans"));
    const colorHant = splitField(getRowValue(row, "search_colors_zh_hant"));
    const materialHans = splitField(getRowValue(row, "search_materials_zh_hans"));
    const materialHant = splitField(getRowValue(row, "search_materials_zh_hant"));

    return {
      slug: getRowValue(row, "slug"),
      eraSlug: getRowValue(row, "era_slug") || inferEraSlug(getRowValue(row, "dynasty_zh_hans")),
      materialSlug:
        getRowValue(row, "material_slug") ||
        inferMaterialSlug(getRowValue(row, "material_zh_hans")),
      objectKindSlug:
        getRowValue(row, "object_kind_slug") ||
        inferObjectKindSlug(getRowValue(row, "title_zh_hans")),
      relatedTermSlugs: splitField(getRowValue(row, "related_term_slugs")),
      conceptSlugs:
        splitField(getRowValue(row, "concept_slugs")).length > 0
          ? splitField(getRowValue(row, "concept_slugs"))
          : inferConceptSlugs(getRowValue(row, "culture_cta_href")),
      title: createLocalizedText(
        getRowValue(row, "title_zh_hans"),
        getRowValue(row, "title_zh_hant")
      ),
      accessionNumber: getRowValue(row, "accession_number"),
      dynasty: createLocalizedText(
        getRowValue(row, "dynasty_zh_hans"),
        getRowValue(row, "dynasty_zh_hant")
      ),
      material: createLocalizedText(
        getRowValue(row, "material_zh_hans"),
        getRowValue(row, "material_zh_hant")
      ),
      image: getRowValue(row, "hero_image"),
      summary: createLocalizedText(
        getRowValue(row, "summary_zh_hans"),
        getRowValue(row, "summary_zh_hant")
      ),
      highlights: highlightsHans.map((item, index) =>
        createLocalizedText(item, highlightsHant[index] ?? "")
      ),
      overview: overviewHans.map((item, index) =>
        createLocalizedText(item, overviewHant[index] ?? "")
      ),
      craftInsights:
        getRowValue(row, "craft_title_zh_hans") &&
        getRowValue(row, "craft_summary_zh_hans") &&
        getRowValue(row, "craft_image")
          ? [
              {
                title: createLocalizedText(
                  getRowValue(row, "craft_title_zh_hans"),
                  getRowValue(row, "craft_title_zh_hant")
                ),
                summary: createLocalizedText(
                  getRowValue(row, "craft_summary_zh_hans"),
                  getRowValue(row, "craft_summary_zh_hant")
                ),
                image: getRowValue(row, "craft_image"),
                glossarySlug: getRowValue(row, "glossary_slug")
              }
            ]
          : [],
      cultureTitle: createLocalizedText(
        getRowValue(row, "culture_title_zh_hans") || "文化解读",
        getRowValue(row, "culture_title_zh_hant")
      ),
      cultureBody: cultureBodyHans.map((item, index) =>
        createLocalizedText(item, cultureBodyHant[index] ?? "")
      ),
      cultureMedia: getRowValue(row, "culture_image_1")
        ? [
            {
              image: getRowValue(row, "culture_image_1"),
              alt: createLocalizedText(
                getRowValue(row, "culture_image_1_alt_zh_hans") ||
                  getRowValue(row, "title_zh_hans"),
                getRowValue(row, "culture_image_1_alt_zh_hant")
              ),
              caption: getRowValue(row, "culture_image_1_caption_zh_hans")
                ? createLocalizedText(
                    getRowValue(row, "culture_image_1_caption_zh_hans"),
                    getRowValue(row, "culture_image_1_caption_zh_hant")
                  )
                : undefined
            }
          ]
        : [],
      cultureCtaLabel: createLocalizedText(
        getRowValue(row, "culture_cta_label_zh_hans") || "延伸阅读",
        getRowValue(row, "culture_cta_label_zh_hant")
      ),
      cultureCtaHref:
        getRowValue(row, "culture_cta_href") ||
        (splitField(getRowValue(row, "concept_slugs"))[0]
          ? `/concepts/${splitField(getRowValue(row, "concept_slugs"))[0]}`
          : "/concepts/utility"),
      relatedObjectSlugs: splitField(getRowValue(row, "related_object_slugs")),
      references: referenceHrefs.map((href, index) => ({
        label: createLocalizedText(referenceLabelsHans[index] ?? href, referenceLabelsHant[index] ?? ""),
        href
      })),
      search: {
        colors: colorHans.map((item, index) =>
          createLocalizedText(item, colorHant[index] ?? "")
        ),
        materials:
          materialHans.length > 0
            ? materialHans.map((item, index) =>
                createLocalizedText(item, materialHant[index] ?? "")
              )
            : [
                createLocalizedText(
                  getRowValue(row, "material_zh_hans"),
                  getRowValue(row, "material_zh_hant")
                )
              ]
      },
      featuredOnHome: getRowValue(row, "featured_on_home").toLowerCase() === "true"
    };
  });
}

function getConceptAccent(slug: string): string {
  if (slug === "fusion") return "var(--accent-earth)";
  if (slug === "harmony") return "var(--accent-ceramic)";
  if (slug === "zen") return "var(--accent-gold)";
  return "var(--accent-ceramic)";
}

function buildImportedConceptSeeds(): EssaySeed[] {
  return (importedMasterRows as ImportedMasterRow[])
    .filter(
      (row) =>
        getRowValue(row, "record_type") === "term" &&
        getRowValue(row, "term_type") === "concept"
    )
    .map((row) => {
      const referenceLabelsHans = splitField(getRowValue(row, "reference_labels_zh_hans"));
      const referenceLabelsHant = splitField(getRowValue(row, "reference_labels_zh_hant"));
      const referenceHrefs = splitField(getRowValue(row, "reference_hrefs"));
      const introBodyHans = splitField(getRowValue(row, "intro_body_zh_hans"));
      const introBodyHant = splitField(getRowValue(row, "intro_body_zh_hant"));
      const sectionBodyHans = splitField(getRowValue(row, "section_1_body_zh_hans"));
      const sectionBodyHant = splitField(getRowValue(row, "section_1_body_zh_hant"));
      const section2BodyHans = splitField(getRowValue(row, "section_2_body_zh_hans"));
      const section2BodyHant = splitField(getRowValue(row, "section_2_body_zh_hant"));
      const section1Media = [1, 2, 3, 4]
        .map((index) => {
          const image = getRowValue(row, `section_1_image_${index}`);

          if (!image) {
            return null;
          }

          return {
            image,
            alt: createLocalizedText(
              getRowValue(row, "title_zh_hans"),
              getRowValue(row, "title_zh_hant")
            ),
            caption: getRowValue(row, `section_1_image_${index}_caption_zh_hans`)
              ? createLocalizedText(
                  getRowValue(row, `section_1_image_${index}_caption_zh_hans`),
                  getRowValue(row, `section_1_image_${index}_caption_zh_hant`)
                )
              : undefined
          };
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item));
      const section2Media = getRowValue(row, "section_2_image_1")
        ? [
            {
              image: getRowValue(row, "section_2_image_1"),
              alt: createLocalizedText(
                getRowValue(row, "title_zh_hans"),
                getRowValue(row, "title_zh_hant")
              ),
              caption: getRowValue(row, "section_2_image_1_caption_zh_hans")
                ? createLocalizedText(
                    getRowValue(row, "section_2_image_1_caption_zh_hans"),
                    getRowValue(row, "section_2_image_1_caption_zh_hant")
                  )
                : undefined
            }
          ]
        : [];

      return {
        slug: getRowValue(row, "slug"),
        title: createLocalizedText(
          getRowValue(row, "title_zh_hans"),
          getRowValue(row, "title_zh_hant")
        ),
        summary: createLocalizedText(
          getRowValue(row, "summary_zh_hans"),
          getRowValue(row, "summary_zh_hant")
        ),
        image:
          getRowValue(row, "hero_image") ||
          getRowValue(row, "intro_image_1") ||
          getRowValue(row, "section_1_image_1") ||
          "/images/hero-celadon-bowl.svg",
        accent: getConceptAccent(getRowValue(row, "slug")),
        heroSubtitle: createLocalizedText(
          getRowValue(row, "hero_subtitle_zh_hans"),
          getRowValue(row, "hero_subtitle_zh_hant")
        ),
        introLabel: createLocalizedText(
          getRowValue(row, "intro_label_zh_hans") || "观念导读",
          getRowValue(row, "intro_label_zh_hant")
        ),
        introBody: introBodyHans.map((item, index) =>
          createLocalizedText(item, introBodyHant[index] ?? "")
        ),
        introMedia: getRowValue(row, "intro_image_1")
          ? [
              {
                image: getRowValue(row, "intro_image_1"),
                alt: createLocalizedText(
                  getRowValue(row, "title_zh_hans"),
                  getRowValue(row, "title_zh_hant")
                )
              }
            ]
          : [],
        sections: [
          ...(getRowValue(row, "section_1_heading_zh_hans") || sectionBodyHans.length > 0 || section1Media.length > 0
            ? [
                {
                  heading: createLocalizedText(
                    getRowValue(row, "section_1_heading_zh_hans") || "文化源流",
                    getRowValue(row, "section_1_heading_zh_hant")
                  ),
                  body: sectionBodyHans.map((item, index) =>
                    createLocalizedText(item, sectionBodyHant[index] ?? "")
                  ),
                  media: section1Media
                }
              ]
            : []),
          ...(getRowValue(row, "section_2_heading_zh_hans") || section2BodyHans.length > 0 || section2Media.length > 0
            ? [
                {
                  heading: createLocalizedText(
                    getRowValue(row, "section_2_heading_zh_hans") || "理蕴于形",
                    getRowValue(row, "section_2_heading_zh_hant")
                  ),
                  body: section2BodyHans.map((item, index) =>
                    createLocalizedText(item, section2BodyHant[index] ?? "")
                  ),
                  media: section2Media
                }
              ]
            : [])
        ],
        relatedObjectSlugs: splitField(getRowValue(row, "related_object_slugs")),
        references: referenceHrefs.map((href, index) => ({
          label: createLocalizedText(referenceLabelsHans[index] ?? href, referenceLabelsHant[index] ?? ""),
          href
        })),
        featuredOnHome: getRowValue(row, "featured_on_home").toLowerCase() === "true"
      };
    });
}

function buildImportedGlossarySeeds(): GlossarySeed[] {
  return (importedMasterRows as ImportedMasterRow[])
    .filter(
      (row) =>
        getRowValue(row, "record_type") === "term" &&
        getRowValue(row, "term_type") === "glossary"
    )
    .map((row) => {
      const referenceLabelsHans = splitField(getRowValue(row, "reference_labels_zh_hans"));
      const referenceLabelsHant = splitField(getRowValue(row, "reference_labels_zh_hant"));
      const referenceHrefs = splitField(getRowValue(row, "reference_hrefs"));
      const introHans = splitField(getRowValue(row, "intro_body_zh_hans"));
      const introHant = splitField(getRowValue(row, "intro_body_zh_hant"));

      return {
        slug: getRowValue(row, "slug"),
        title: createLocalizedText(
          getRowValue(row, "title_zh_hans"),
          getRowValue(row, "title_zh_hant")
        ),
        summary: createLocalizedText(
          getRowValue(row, "summary_zh_hans"),
          getRowValue(row, "summary_zh_hant")
        ),
        intro: introHans.map((item, index) =>
          createLocalizedText(item, introHant[index] ?? "")
        ),
        steps:
          getRowValue(row, "glossary_step_1_title_zh_hans") ||
          getRowValue(row, "glossary_step_1_body_zh_hans") ||
          getRowValue(row, "glossary_step_1_image")
            ? [
                {
                  title: createLocalizedText(
                    getRowValue(row, "glossary_step_1_title_zh_hans") || "词条展开",
                    getRowValue(row, "glossary_step_1_title_zh_hant")
                  ),
                  body: createLocalizedText(
                    getRowValue(row, "glossary_step_1_body_zh_hans"),
                    getRowValue(row, "glossary_step_1_body_zh_hant")
                  ),
                  image:
                    getRowValue(row, "glossary_step_1_image") ||
                    getRowValue(row, "intro_image_1") ||
                    "/images/video-kiln.svg"
                }
              ]
            : [],
        video: {
          title: createLocalizedText(
            getRowValue(row, "video_title_zh_hans") || "延伸影像",
            getRowValue(row, "video_title_zh_hant")
          ),
          image:
            getRowValue(row, "video_image") ||
            getRowValue(row, "hero_image") ||
            "/images/video-kiln.svg"
        },
        relatedObjectSlugs: splitField(getRowValue(row, "related_object_slugs")),
        references: referenceHrefs.map((href, index) => ({
          label: createLocalizedText(referenceLabelsHans[index] ?? href, referenceLabelsHant[index] ?? ""),
          href
        }))
      };
    });
}

function buildImportedTimelineSeeds(): TimelineSeed[] {
  return (importedMasterRows as ImportedMasterRow[])
    .filter((row) => getRowValue(row, "record_type") === "timeline")
    .map((row) => {
      const introBodyHans = splitField(getRowValue(row, "intro_body_zh_hans"));
      const introBodyHant = splitField(getRowValue(row, "intro_body_zh_hant"));
      const sectionBodyHans = splitField(getRowValue(row, "section_1_body_zh_hans"));
      const sectionBodyHant = splitField(getRowValue(row, "section_1_body_zh_hant"));
      const referenceLabelsHans = splitField(getRowValue(row, "reference_labels_zh_hans"));
      const referenceLabelsHant = splitField(getRowValue(row, "reference_labels_zh_hant"));
      const referenceHrefs = splitField(getRowValue(row, "reference_hrefs"));

      return {
        slug: getRowValue(row, "slug"),
        title: createLocalizedText(
          getRowValue(row, "title_zh_hans"),
          getRowValue(row, "title_zh_hant")
        ),
        periodLabel: createLocalizedText(
          getRowValue(row, "period_label_zh_hans"),
          getRowValue(row, "period_label_zh_hant")
        ),
        years: createLocalizedText(
          getRowValue(row, "years_zh_hans"),
          getRowValue(row, "years_zh_hant")
        ),
        homeCaptionLines: [
          createLocalizedText(
            getRowValue(row, "home_caption_line_1_zh_hans"),
            getRowValue(row, "home_caption_line_1_zh_hant")
          ),
          createLocalizedText(
            getRowValue(row, "home_caption_line_2_zh_hans"),
            getRowValue(row, "home_caption_line_2_zh_hant")
          )
        ].filter((value) => value["zh-Hans"]),
        image: getRowValue(row, "hero_image"),
        summary: createLocalizedText(
          getRowValue(row, "summary_zh_hans"),
          getRowValue(row, "summary_zh_hant")
        ),
        heroSubtitle: createLocalizedText(
          getRowValue(row, "hero_subtitle_zh_hans"),
          getRowValue(row, "hero_subtitle_zh_hant")
        ),
        introLabel: createLocalizedText(
          getRowValue(row, "intro_label_zh_hans") || "时代导览",
          getRowValue(row, "intro_label_zh_hant")
        ),
        introBody: introBodyHans.map((item, index) =>
          createLocalizedText(item, introBodyHant[index] ?? "")
        ),
        introMedia: getRowValue(row, "intro_image_1")
          ? [
              {
                image: getRowValue(row, "intro_image_1"),
                alt: createLocalizedText(
                  getRowValue(row, "title_zh_hans"),
                  getRowValue(row, "title_zh_hant")
                )
              }
            ]
          : [],
        sections:
          getRowValue(row, "section_1_heading_zh_hans") || sectionBodyHans.length > 0
            ? [
                {
                  heading: createLocalizedText(
                    getRowValue(row, "section_1_heading_zh_hans") || "时代展开",
                    getRowValue(row, "section_1_heading_zh_hant")
                  ),
                  body: sectionBodyHans.map((item, index) =>
                    createLocalizedText(item, sectionBodyHant[index] ?? "")
                  ),
                  media: getRowValue(row, "section_1_image_1")
                    ? [
                        {
                          image: getRowValue(row, "section_1_image_1"),
                          alt: createLocalizedText(
                            getRowValue(row, "title_zh_hans"),
                            getRowValue(row, "title_zh_hant")
                          )
                        }
                      ]
                    : []
                }
              ]
            : [],
        relatedObjectSlugs: splitField(getRowValue(row, "related_object_slugs")),
        references: referenceHrefs.map((href, index) => ({
          label: createLocalizedText(referenceLabelsHans[index] ?? href, referenceLabelsHant[index] ?? ""),
          href
        })),
        featuredOnHome: getRowValue(row, "featured_on_home").toLowerCase() === "true"
      };
    });
}

function dedupeObjectSeeds(seeds: ObjectSeed[]): ObjectSeed[] {
  const seen = new Set<string>();

  return seeds.filter((seed) => {
    if (seen.has(seed.slug)) {
      return false;
    }

    seen.add(seed.slug);
    return true;
  });
}

function dedupeEssaySeeds(seeds: EssaySeed[]): EssaySeed[] {
  const seen = new Set<string>();

  return seeds.filter((seed) => {
    if (seen.has(seed.slug)) {
      return false;
    }

    seen.add(seed.slug);
    return true;
  });
}

function dedupeGlossarySeeds(seeds: GlossarySeed[]): GlossarySeed[] {
  const seen = new Set<string>();

  return seeds.filter((seed) => {
    if (seen.has(seed.slug)) {
      return false;
    }

    seen.add(seed.slug);
    return true;
  });
}

function dedupeTimelineSeeds(seeds: TimelineSeed[]): TimelineSeed[] {
  const seen = new Set<string>();

  return seeds.filter((seed) => {
    if (seen.has(seed.slug)) {
      return false;
    }

    seen.add(seed.slug);
    return true;
  });
}


const baseObjectSeeds: ObjectSeed[] = [
  {
    slug: "tea-bowl",
    eraSlug: "song",
    materialSlug: "ceramic",
    objectKindSlug: "bowl",
    conceptSlugs: ["utility", "zen"],
    title: {
      "zh-Hans": "宋建窑兔毫茶盏",
      "zh-Hant": "宋建窯兔毫茶盞"
    },
    accessionNumber: "No. 1234567",
    dynasty: {
      "zh-Hans": "宋代",
      "zh-Hant": "宋代"
    },
    material: {
      "zh-Hans": "黑釉瓷",
      "zh-Hant": "黑釉瓷"
    },
    image: "/images/object-tea-bowl.svg",
    summary: {
      "zh-Hans": "厚重胎体与细密兔毫纹并存，让宋代点茶场景中的观看、使用与评鉴合为一体。",
      "zh-Hant": "厚重胎體與細密兔毫紋並存，讓宋代點茶場景中的觀看、使用與評鑑合為一體。"
    },
    highlights: [
      {
        "zh-Hans": "高温窑变形成丝缕状结晶",
        "zh-Hant": "高溫窯變形成絲縷狀結晶"
      },
      {
        "zh-Hans": "深色盏面更利于观察茶汤色泽",
        "zh-Hant": "深色盞面更利於觀察茶湯色澤"
      },
      {
        "zh-Hans": "器形稳重，强调握持与品评节奏",
        "zh-Hant": "器形穩重，強調握持與品評節奏"
      }
    ],
    overview: [
      {
        "zh-Hans": "建窑茶盏兴盛于宋代福建建安地区，烧成温度高、胎体厚重，器壁外撇而盏心深敛，适合点茶时的注水、击拂与观色。",
        "zh-Hant": "建窯茶盞興盛於宋代福建建安地區，燒成溫度高、胎體厚重，器壁外撇而盞心深斂，適合點茶時的注水、擊拂與觀色。"
      },
      {
        "zh-Hans": "兔毫纹来自釉层中铁质结晶的流动和析出，并不是后期描绘的装饰，而是在高温中自然形成的工艺结果。",
        "zh-Hant": "兔毫紋來自釉層中鐵質結晶的流動和析出，並不是後期描繪的裝飾，而是在高溫中自然形成的工藝結果。"
      },
      {
        "zh-Hans": "宋人以斗茶和点茶为重要雅集活动，深色茶盏使茶沫层次更容易被辨认，也让器物本身成为审美判断的一部分。",
        "zh-Hant": "宋人以鬥茶和點茶為重要雅集活動，深色茶盞使茶沫層次更容易被辨認，也讓器物本身成為審美判斷的一部分。"
      }
    ],
    craftInsights: [
      {
        title: {
          "zh-Hans": "窑变与兔毫纹",
          "zh-Hant": "窯變與兔毫紋"
        },
        summary: {
          "zh-Hans": "从配釉、入窑到冷却，看建窑如何在高温中形成丝缕般的结晶纹理。",
          "zh-Hant": "從配釉、入窯到冷卻，看建窯如何在高溫中形成絲縷般的結晶紋理。"
        },
        image: "/images/process-kiln-1.svg",
        glossarySlug: "kiln-transmutation"
      }
    ],
    cultureTitle: {
      "zh-Hans": "文化解读",
      "zh-Hant": "文化解讀"
    },
    cultureBody: [
      {
        "zh-Hans": "宋代茶事的核心不只是饮用，更是一种以动作、秩序和审美评判为核心的社交方式。茶盏的深浅、口沿与盏心比例，都直接影响点茶时茶沫的聚拢与观看效果。",
        "zh-Hant": "宋代茶事的核心不只是飲用，更是一種以動作、秩序和審美評判為核心的社交方式。茶盞的深淺、口沿與盞心比例，都直接影響點茶時茶沫的聚攏與觀看效果。"
      },
      {
        "zh-Hans": "因此，兔毫盏既是实用品，也是审美制度中的标准器。它把材料性能、烧造经验和文人趣味连接在一起，成为理解“格物致用”的最佳入口之一。",
        "zh-Hant": "因此，兔毫盞既是實用品，也是審美制度中的標準器。它把材料性能、燒造經驗和文人趣味連接在一起，成為理解「格物致用」的最佳入口之一。"
      }
    ],
    cultureMedia: [
      {
        image: "/images/timeline-song.svg",
        alt: {
          "zh-Hans": "宋代茶事图像示意",
          "zh-Hant": "宋代茶事圖像示意"
        },
        caption: {
          "zh-Hans": "点茶与观盏的宋代语境",
          "zh-Hant": "點茶與觀盞的宋代語境"
        }
      },
      {
        image: "/images/object-writing-case.svg",
        alt: {
          "zh-Hans": "文房器物示意",
          "zh-Hant": "文房器物示意"
        },
        caption: {
          "zh-Hans": "文人起居中的器用秩序",
          "zh-Hant": "文人起居中的器用秩序"
        }
      }
    ],
    cultureCtaLabel: {
      "zh-Hans": "延伸阅读：格物致用",
      "zh-Hant": "延伸閱讀：格物致用"
    },
    cultureCtaHref: "/concepts/utility",
    relatedObjectSlugs: ["glass-bowl", "bronze-tray", "writing-case"],
    references: [
      {
        label: {
          "zh-Hans": "《大观茶论》相关章节",
          "zh-Hant": "《大觀茶論》相關章節"
        },
        href: "https://zh.wikisource.org/wiki/%E5%A4%A7%E8%A7%80%E8%8C%B6%E8%AB%96"
      },
      {
        label: {
          "zh-Hans": "故宫博物院建窑黑釉盏图录",
          "zh-Hant": "故宮博物院建窯黑釉盞圖錄"
        },
        href: "https://www.dpm.org.cn/"
      }
    ],
    search: {
      colors: [
        {
          "zh-Hans": "黑色",
          "zh-Hant": "黑色"
        },
        {
          "zh-Hans": "褐色",
          "zh-Hant": "褐色"
        }
      ],
      materials: [
        {
          "zh-Hans": "陶瓷",
          "zh-Hant": "陶瓷"
        },
        {
          "zh-Hans": "黑釉",
          "zh-Hant": "黑釉"
        }
      ]
    },
    featuredOnHome: true
  },
  {
    slug: "glass-bowl",
    eraSlug: "tang",
    materialSlug: "glass",
    objectKindSlug: "bowl",
    conceptSlugs: ["fusion"],
    title: {
      "zh-Hans": "玻璃茶盏",
      "zh-Hant": "玻璃茶盞"
    },
    accessionNumber: "No. 1234568",
    dynasty: {
      "zh-Hans": "明代",
      "zh-Hant": "明代"
    },
    material: {
      "zh-Hans": "吹制玻璃",
      "zh-Hant": "吹製玻璃"
    },
    image: "/images/object-glass-bowl.svg",
    summary: {
      "zh-Hans": "透明材质让光影、液体与空间同时参与器物体验，形成不同于陶瓷的观看路径。",
      "zh-Hant": "透明材質讓光影、液體與空間同時參與器物體驗，形成不同於陶瓷的觀看路徑。"
    },
    highlights: [
      {
        "zh-Hans": "强调通透与轻盈",
        "zh-Hant": "強調通透與輕盈"
      },
      {
        "zh-Hans": "适合观察液体流动与折光",
        "zh-Hant": "適合觀察液體流動與折光"
      }
    ],
    overview: [
      {
        "zh-Hans": "玻璃器的出现让内容物本身成为视觉的一部分，器物不再只提供承载功能，而是让光线与空间进入观看。",
        "zh-Hant": "玻璃器的出現讓內容物本身成為視覺的一部分，器物不再只提供承載功能，而是讓光線與空間進入觀看。"
      }
    ],
    craftInsights: [
      {
        title: {
          "zh-Hans": "吹制成形",
          "zh-Hant": "吹製成形"
        },
        summary: {
          "zh-Hans": "高温下快速扩张与整形，决定了器壁薄厚和口沿的稳定度。",
          "zh-Hant": "高溫下快速擴張與整形，決定了器壁薄厚和口沿的穩定度。"
        },
        image: "/images/process-kiln-2.svg",
        glossarySlug: "kiln-transmutation"
      }
    ],
    cultureTitle: {
      "zh-Hans": "文化解读",
      "zh-Hant": "文化解讀"
    },
    cultureBody: [
      {
        "zh-Hans": "玻璃茶盏让饮器的观看方式从“表面纹理”延伸到“内部流动”，它天然带有更强的即时感与现代感。",
        "zh-Hant": "玻璃茶盞讓飲器的觀看方式從「表面紋理」延伸到「內部流動」，它天然帶有更強的即時感與現代感。"
      }
    ],
    cultureMedia: [
      {
        image: "/images/object-glass-bowl.svg",
        alt: {
          "zh-Hans": "玻璃茶盏细节",
          "zh-Hant": "玻璃茶盞細節"
        }
      }
    ],
    cultureCtaLabel: {
      "zh-Hans": "延伸阅读：融合多元",
      "zh-Hant": "延伸閱讀：融合多元"
    },
    cultureCtaHref: "/concepts/fusion",
    relatedObjectSlugs: ["tea-bowl", "white-bowl"],
    references: [],
    search: {
      colors: [
        {
          "zh-Hans": "绿色",
          "zh-Hant": "綠色"
        }
      ],
      materials: [
        {
          "zh-Hans": "玻璃",
          "zh-Hant": "玻璃"
        }
      ]
    },
    featuredOnHome: true
  },
  {
    slug: "fan",
    eraSlug: "qing",
    materialSlug: "textile",
    objectKindSlug: "fan",
    conceptSlugs: ["harmony"],
    title: {
      "zh-Hans": "象牙丝编花鸟纹扇",
      "zh-Hant": "象牙絲編花鳥紋扇"
    },
    accessionNumber: "No. 1234569",
    dynasty: {
      "zh-Hans": "清代",
      "zh-Hant": "清代"
    },
    material: {
      "zh-Hans": "象牙、丝编、设色",
      "zh-Hant": "象牙、絲編、設色"
    },
    image: "/images/object-fan.svg",
    summary: {
      "zh-Hans": "轻薄扇面与繁密纹饰并置，体现晚期宫廷趣味与精细手工的高度结合。",
      "zh-Hant": "輕薄扇面與繁密紋飾並置，體現晚期宮廷趣味與精細手工的高度結合。"
    },
    highlights: [
      {
        "zh-Hans": "多材料协作完成轻薄扇面",
        "zh-Hant": "多材料協作完成輕薄扇面"
      }
    ],
    overview: [
      {
        "zh-Hans": "扇面需要同时处理透气、强度与装饰性，复杂程度远高于单一材料器物。",
        "zh-Hant": "扇面需要同時處理透氣、強度與裝飾性，複雜程度遠高於單一材料器物。"
      }
    ],
    craftInsights: [
      {
        title: {
          "zh-Hans": "丝编与设色",
          "zh-Hant": "絲編與設色"
        },
        summary: {
          "zh-Hans": "细密编织之后再叠加花鸟设色，决定了轻、透、繁之间的平衡。",
          "zh-Hant": "細密編織之後再疊加花鳥設色，決定了輕、透、繁之間的平衡。"
        },
        image: "/images/object-fan.svg",
        glossarySlug: "kiln-transmutation"
      }
    ],
    cultureTitle: {
      "zh-Hans": "文化解读",
      "zh-Hant": "文化解讀"
    },
    cultureBody: [
      {
        "zh-Hans": "在晚期都市与宫廷生活中，手持器物不只服务功能，也承担风格表达和身份展示的作用。",
        "zh-Hant": "在晚期都市與宮廷生活中，手持器物不只服務功能，也承擔風格表達和身份展示的作用。"
      }
    ],
    cultureMedia: [
      {
        image: "/images/object-fan.svg",
        alt: {
          "zh-Hans": "花鸟纹扇示意",
          "zh-Hant": "花鳥紋扇示意"
        }
      }
    ],
    cultureCtaLabel: {
      "zh-Hans": "延伸阅读：清代工艺",
      "zh-Hant": "延伸閱讀：清代工藝"
    },
    cultureCtaHref: "/timeline/qing",
    relatedObjectSlugs: ["lamp-stand", "white-bowl"],
    references: [],
    search: {
      colors: [
        {
          "zh-Hans": "白色",
          "zh-Hant": "白色"
        },
        {
          "zh-Hans": "红色",
          "zh-Hant": "紅色"
        }
      ],
      materials: [
        {
          "zh-Hans": "丝织",
          "zh-Hant": "絲織"
        },
        {
          "zh-Hans": "象牙",
          "zh-Hant": "象牙"
        }
      ]
    },
    featuredOnHome: true
  },
  {
    slug: "bronze-tray",
    eraSlug: "tang",
    materialSlug: "metalwork",
    objectKindSlug: "tray",
    conceptSlugs: ["fusion"],
    title: {
      "zh-Hans": "鎏金银茶托",
      "zh-Hant": "鎏金銀茶托"
    },
    accessionNumber: "No. 1234570",
    dynasty: {
      "zh-Hans": "唐代",
      "zh-Hant": "唐代"
    },
    material: {
      "zh-Hans": "金银器",
      "zh-Hant": "金銀器"
    },
    image: "/images/object-bronze-tray.svg",
    summary: {
      "zh-Hans": "托盘边缘起伏有节，体现盛唐金银器的外来纹样吸收与本土化转译。",
      "zh-Hant": "托盤邊緣起伏有節，體現盛唐金銀器的外來紋樣吸收與本土化轉譯。"
    },
    highlights: [
      {
        "zh-Hans": "轮廓富有节奏变化",
        "zh-Hant": "輪廓富有節奏變化"
      }
    ],
    overview: [
      {
        "zh-Hans": "茶托既承担承接器皿的功能，也展示金工工艺中锤揲、鎏金和纹饰组织的能力。",
        "zh-Hant": "茶托既承擔承接器皿的功能，也展示金工工藝中錘揲、鎏金和紋飾組織的能力。"
      }
    ],
    craftInsights: [
      {
        title: {
          "zh-Hans": "錾刻与锤揲",
          "zh-Hant": "鏨刻與錘揲"
        },
        summary: {
          "zh-Hans": "薄金属板如何通过反复敲击与修整形成起伏纹样。",
          "zh-Hant": "薄金屬板如何透過反覆敲擊與修整形成起伏紋樣。"
        },
        image: "/images/process-metal-1.svg",
        glossarySlug: "metal-chasing"
      }
    ],
    cultureTitle: {
      "zh-Hans": "文化解读",
      "zh-Hant": "文化解讀"
    },
    cultureBody: [
      {
        "zh-Hans": "唐代都城生活高度开放，金银器既吸纳西方器形，也保留中式礼用秩序，成为融合多元的典型样本。",
        "zh-Hant": "唐代都城生活高度開放，金銀器既吸納西方器形，也保留中式禮用秩序，成為融合多元的典型樣本。"
      }
    ],
    cultureMedia: [
      {
        image: "/images/object-bronze-tray.svg",
        alt: {
          "zh-Hans": "茶托示意",
          "zh-Hant": "茶托示意"
        }
      }
    ],
    cultureCtaLabel: {
      "zh-Hans": "延伸阅读：融合多元",
      "zh-Hant": "延伸閱讀：融合多元"
    },
    cultureCtaHref: "/concepts/fusion",
    relatedObjectSlugs: ["lamp-stand", "tea-bowl"],
    references: [],
    search: {
      colors: [
        {
          "zh-Hans": "金色",
          "zh-Hant": "金色"
        }
      ],
      materials: [
        {
          "zh-Hans": "金属",
          "zh-Hant": "金屬"
        }
      ]
    },
    featuredOnHome: false
  },
  {
    slug: "lamp-stand",
    eraSlug: "yuan",
    materialSlug: "metalwork",
    objectKindSlug: "stand",
    conceptSlugs: ["fusion"],
    title: {
      "zh-Hans": "鎏金摩羯纹三足烛盘台",
      "zh-Hant": "鎏金摩羯紋三足燭盤台"
    },
    accessionNumber: "No. 1234571",
    dynasty: {
      "zh-Hans": "唐代",
      "zh-Hant": "唐代"
    },
    material: {
      "zh-Hans": "铜鎏金",
      "zh-Hant": "銅鎏金"
    },
    image: "/images/object-lamp-stand.svg",
    summary: {
      "zh-Hans": "三足结构抬高器身，兼具宗教图像感与实用照明功能。",
      "zh-Hant": "三足結構抬高器身，兼具宗教圖像感與實用照明功能。"
    },
    highlights: [
      {
        "zh-Hans": "造型更具异域色彩",
        "zh-Hant": "造型更具異域色彩"
      }
    ],
    overview: [
      {
        "zh-Hans": "这类器物多见于唐代开放交流的图像系统中，兼具陈设、照明与礼仪象征。",
        "zh-Hant": "這類器物多見於唐代開放交流的圖像系統中，兼具陳設、照明與禮儀象徵。"
      }
    ],
    craftInsights: [],
    cultureTitle: {
      "zh-Hans": "文化解读",
      "zh-Hant": "文化解讀"
    },
    cultureBody: [],
    cultureMedia: [],
    cultureCtaLabel: {
      "zh-Hans": "查看唐代线索",
      "zh-Hant": "查看唐代線索"
    },
    cultureCtaHref: "/timeline/tang",
    relatedObjectSlugs: ["bronze-tray"],
    references: [],
    search: {
      colors: [
        {
          "zh-Hans": "金色",
          "zh-Hant": "金色"
        }
      ],
      materials: [
        {
          "zh-Hans": "金属",
          "zh-Hant": "金屬"
        }
      ]
    },
    featuredOnHome: false
  },
  {
    slug: "white-bowl",
    eraSlug: "song",
    materialSlug: "ceramic",
    objectKindSlug: "bowl",
    conceptSlugs: ["harmony", "zen"],
    title: {
      "zh-Hans": "白釉唇口碗",
      "zh-Hant": "白釉唇口碗"
    },
    accessionNumber: "No. 1234572",
    dynasty: {
      "zh-Hans": "宋代",
      "zh-Hant": "宋代"
    },
    material: {
      "zh-Hans": "白瓷",
      "zh-Hant": "白瓷"
    },
    image: "/images/object-white-bowl.svg",
    summary: {
      "zh-Hans": "简练口沿与内收腹壁，让日常用器保持清爽、克制的器形秩序。",
      "zh-Hant": "簡練口沿與內收腹壁，讓日常用器保持清爽、克制的器形秩序。"
    },
    highlights: [
      {
        "zh-Hans": "线条简净",
        "zh-Hant": "線條簡淨"
      }
    ],
    overview: [
      {
        "zh-Hans": "白釉器强调比例与釉面气质，往往是日常器用中最能体现宋人审美节制的一类。",
        "zh-Hant": "白釉器強調比例與釉面氣質，往往是日常器用中最能體現宋人審美節制的一類。"
      }
    ],
    craftInsights: [],
    cultureTitle: {
      "zh-Hans": "文化解读",
      "zh-Hant": "文化解讀"
    },
    cultureBody: [],
    cultureMedia: [],
    cultureCtaLabel: {
      "zh-Hans": "查看宋代线索",
      "zh-Hant": "查看宋代線索"
    },
    cultureCtaHref: "/timeline/song",
    relatedObjectSlugs: ["tea-bowl"],
    references: [],
    search: {
      colors: [
        {
          "zh-Hans": "白色",
          "zh-Hant": "白色"
        }
      ],
      materials: [
        {
          "zh-Hans": "陶瓷",
          "zh-Hant": "陶瓷"
        }
      ]
    },
    featuredOnHome: false
  },
  {
    slug: "writing-case",
    eraSlug: "ming",
    materialSlug: "lacquer",
    objectKindSlug: "case",
    conceptSlugs: ["utility"],
    title: {
      "zh-Hans": "朱漆镶铜文具箱",
      "zh-Hant": "朱漆鑲銅文具箱"
    },
    accessionNumber: "No. 1234573",
    dynasty: {
      "zh-Hans": "明代",
      "zh-Hant": "明代"
    },
    material: {
      "zh-Hans": "木胎髹漆、铜饰件",
      "zh-Hant": "木胎髹漆、銅飾件"
    },
    image: "/images/object-writing-case.svg",
    summary: {
      "zh-Hans": "文房器具在收纳与展示之间保持平衡，体现制度化日常里的细部审美。",
      "zh-Hant": "文房器具在收納與展示之間保持平衡，體現制度化日常裡的細部審美。"
    },
    highlights: [
      {
        "zh-Hans": "器用秩序清晰",
        "zh-Hant": "器用秩序清晰"
      }
    ],
    overview: [
      {
        "zh-Hans": "文具箱是使用动作高度明确的器物，每一层隔断与构件都对应一种具体功能。",
        "zh-Hant": "文具箱是使用動作高度明確的器物，每一層隔斷與構件都對應一種具體功能。"
      }
    ],
    craftInsights: [],
    cultureTitle: {
      "zh-Hans": "文化解读",
      "zh-Hant": "文化解讀"
    },
    cultureBody: [
      {
        "zh-Hans": "文房器用是“格物致用”在生活层面的直接体现，精致并非炫耀，而是为了让使用更准确、更从容。",
        "zh-Hant": "文房器用是「格物致用」在生活層面的直接體現，精緻並非炫耀，而是為了讓使用更準確、更從容。"
      }
    ],
    cultureMedia: [
      {
        image: "/images/object-writing-case.svg",
        alt: {
          "zh-Hans": "文具箱示意",
          "zh-Hant": "文具箱示意"
        }
      }
    ],
    cultureCtaLabel: {
      "zh-Hans": "延伸阅读：格物致用",
      "zh-Hant": "延伸閱讀：格物致用"
    },
    cultureCtaHref: "/concepts/utility",
    relatedObjectSlugs: ["tea-bowl"],
    references: [],
    search: {
      colors: [
        {
          "zh-Hans": "红色",
          "zh-Hant": "紅色"
        }
      ],
      materials: [
        {
          "zh-Hans": "漆器",
          "zh-Hant": "漆器"
        },
        {
          "zh-Hans": "木器",
          "zh-Hant": "木器"
        }
      ]
    },
    featuredOnHome: false
  }
];

const objectSeeds: ObjectSeed[] = dedupeObjectSeeds([
  ...buildImportedObjectSeeds(),
  ...baseObjectSeeds
]);

function getDerivedRelatedObjectSlugs(entry: ObjectSeed): string[] {
  const seen = new Set<string>([entry.slug, ...entry.relatedObjectSlugs]);

  const sameKind = objectSeeds
    .filter((candidate) => candidate.objectKindSlug === entry.objectKindSlug)
    .map((candidate) => candidate.slug);

  const sameMaterial = objectSeeds
    .filter((candidate) => candidate.materialSlug === entry.materialSlug)
    .map((candidate) => candidate.slug);

  const sameEra = objectSeeds
    .filter((candidate) => candidate.eraSlug === entry.eraSlug)
    .map((candidate) => candidate.slug);

  return [...sameKind, ...sameMaterial, ...sameEra].filter((slug) => {
    if (!slug || seen.has(slug)) {
      return false;
    }

    seen.add(slug);
    return true;
  });
}

function getRelatedObjectCards(
  locale: Locale,
  explicitSlugs: string[],
  derivedSlugs: string[],
  limit = Number.POSITIVE_INFINITY
): RelatedCard[] {
  const seen = new Set<string>();
  const combined = [...explicitSlugs, ...derivedSlugs];

  return combined.flatMap((slug) => {
    if (!slug || seen.has(slug)) {
      return [];
    }

    seen.add(slug);
    return [getObjectCard(locale, slug)];
  }).slice(0, limit);
}

const conceptSeeds: EssaySeed[] = dedupeEssaySeeds([
  ...buildImportedConceptSeeds(),
  {
    slug: "fusion",
    title: {
      "zh-Hans": "融合多元",
      "zh-Hant": "融合多元"
    },
    summary: {
      "zh-Hans": "从器形、纹样与材料流动中，看见不同文明在中国工艺中的汇流。",
      "zh-Hant": "從器形、紋樣與材料流動中，看見不同文明在中國工藝中的匯流。"
    },
    image: "/images/object-bronze-tray.svg",
    accent: "var(--accent-earth)",
    heroSubtitle: {
      "zh-Hans": "跨地域交流与本土转译",
      "zh-Hant": "跨地域交流與本土轉譯"
    },
    introLabel: {
      "zh-Hans": "观念索引",
      "zh-Hant": "觀念索引"
    },
    introBody: [
      {
        "zh-Hans": "外来元素进入中国工艺并不是简单移植，而是经过礼制、趣味与使用方式的重新组织。",
        "zh-Hant": "外來元素進入中國工藝並不是簡單移植，而是經過禮制、趣味與使用方式的重新組織。"
      }
    ],
    introMedia: [
      {
        image: "/images/object-bronze-tray.svg",
        alt: {
          "zh-Hans": "金银器示意",
          "zh-Hant": "金銀器示意"
        }
      },
      {
        image: "/images/object-lamp-stand.svg",
        alt: {
          "zh-Hans": "烛台示意",
          "zh-Hant": "燭台示意"
        }
      }
    ],
    sections: [
      {
        heading: {
          "zh-Hans": "器形与纹样的跨地域流动",
          "zh-Hant": "器形與紋樣的跨地域流動"
        },
        body: [
          {
            "zh-Hans": "从金银器、玻璃器到织绣纹样，异域元素之所以留下来，是因为它们在本土语境中找到了新的功能和秩序。",
            "zh-Hant": "從金銀器、玻璃器到織繡紋樣，異域元素之所以留下來，是因為它們在本土語境中找到了新的功能和秩序。"
          }
        ]
      },
      {
        heading: {
          "zh-Hans": "融合本身也是审美筛选",
          "zh-Hant": "融合本身也是審美篩選"
        },
        body: [
          {
            "zh-Hans": "真正被吸收的风格，往往同时满足礼用、日常与时代趣味，因此融合不是杂糅，而是主动选择。",
            "zh-Hant": "真正被吸收的風格，往往同時滿足禮用、日常與時代趣味，因此融合不是雜糅，而是主動選擇。"
          }
        ]
      }
    ],
    relatedObjectSlugs: ["bronze-tray", "lamp-stand", "glass-bowl"],
    references: [
      {
        label: {
          "zh-Hans": "丝路与工艺交流研究资料",
          "zh-Hant": "絲路與工藝交流研究資料"
        },
        href: "https://www.npm.gov.tw/"
      }
    ],
    featuredOnHome: true
  },
  {
    slug: "harmony",
    title: {
      "zh-Hans": "天人合一",
      "zh-Hant": "天人合一"
    },
    summary: {
      "zh-Hans": "通过器物比例、材质节奏与空间留白，感受自然秩序如何进入日常使用。",
      "zh-Hant": "透過器物比例、材質節奏與空間留白，感受自然秩序如何進入日常使用。"
    },
    image: "/images/hero-celadon-bowl.svg",
    accent: "var(--accent-ceramic)",
    heroSubtitle: {
      "zh-Hans": "材料、尺度与身体经验",
      "zh-Hant": "材料、尺度與身體經驗"
    },
    introLabel: {
      "zh-Hans": "观念索引",
      "zh-Hant": "觀念索引"
    },
    introBody: [
      {
        "zh-Hans": "自然并不只是题材来源，它更是一套关于比例、节奏与使用感受的组织方式。",
        "zh-Hant": "自然並不只是題材來源，它更是一套關於比例、節奏與使用感受的組織方式。"
      }
    ],
    introMedia: [
      {
        image: "/images/object-white-bowl.svg",
        alt: {
          "zh-Hans": "白釉器物示意",
          "zh-Hant": "白釉器物示意"
        }
      }
    ],
    sections: [
      {
        heading: {
          "zh-Hans": "由自然进入器物",
          "zh-Hant": "由自然進入器物"
        },
        body: [
          {
            "zh-Hans": "青瓷的釉色、木器的纹理和漆器的光泽，都让材料本身的自然性成为审美的一部分。",
            "zh-Hant": "青瓷的釉色、木器的紋理和漆器的光澤，都讓材料本身的自然性成為審美的一部分。"
          }
        ]
      }
    ],
    relatedObjectSlugs: ["white-bowl", "fan"],
    references: [],
    featuredOnHome: true
  },
  {
    slug: "zen",
    title: {
      "zh-Hans": "禅宗美学",
      "zh-Hant": "禪宗美學"
    },
    summary: {
      "zh-Hans": "在克制、留白与不事张扬的形式中，建立更安静、更内省的观看方式。",
      "zh-Hant": "在克制、留白與不事張揚的形式中，建立更安靜、更內省的觀看方式。"
    },
    image: "/images/concept-lacquer-plate.svg",
    accent: "var(--accent-gold)",
    heroSubtitle: {
      "zh-Hans": "留白、节制与余味",
      "zh-Hant": "留白、節制與餘味"
    },
    introLabel: {
      "zh-Hans": "观念索引",
      "zh-Hant": "觀念索引"
    },
    introBody: [
      {
        "zh-Hans": "禅意并不排斥精工，它只是把观看重心从炫技转向气韵和余味。",
        "zh-Hant": "禪意並不排斥精工，它只是把觀看重心從炫技轉向氣韻和餘味。"
      }
    ],
    introMedia: [
      {
        image: "/images/concept-lacquer-plate.svg",
        alt: {
          "zh-Hans": "漆器示意",
          "zh-Hant": "漆器示意"
        }
      }
    ],
    sections: [
      {
        heading: {
          "zh-Hans": "留白作为结构",
          "zh-Hant": "留白作為結構"
        },
        body: [
          {
            "zh-Hans": "空的部分并不是没有设计，而是让观者的注意力有停顿与沉淀的空间。",
            "zh-Hant": "空的部分並不是沒有設計，而是讓觀者的注意力有停頓與沉澱的空間。"
          }
        ]
      }
    ],
    relatedObjectSlugs: ["tea-bowl", "white-bowl"],
    references: [],
    featuredOnHome: true
  },
  {
    slug: "utility",
    title: {
      "zh-Hans": "格物致用",
      "zh-Hant": "格物致用"
    },
    summary: {
      "zh-Hans": "从器物的比例、材质与使用动作入手，理解中国传统工艺中的秩序感与实用哲学。",
      "zh-Hant": "從器物的比例、材質與使用動作入手，理解中國傳統工藝中的秩序感與實用哲學。"
    },
    image: "/images/hero-celadon-bowl.svg",
    accent: "var(--accent-ceramic)",
    heroSubtitle: {
      "zh-Hans": "以中国传统工艺，观美学之境，思哲学之理",
      "zh-Hant": "以中國傳統工藝，觀美學之境，思哲學之理"
    },
    introLabel: {
      "zh-Hans": "观念导读",
      "zh-Hant": "觀念導讀"
    },
    introBody: [
      {
        "zh-Hans": "“格物致用”并不只是一种实用主义，它强调的是通过对材料、工序和身体经验的细致观察，形成更准确的器用判断。",
        "zh-Hant": "「格物致用」並不只是一種實用主義，它強調的是透過對材料、工序和身體經驗的細緻觀察，形成更準確的器用判斷。"
      }
    ],
    introMedia: [
      {
        image: "/images/object-writing-case.svg",
        alt: {
          "zh-Hans": "文具箱示意",
          "zh-Hant": "文具箱示意"
        },
        caption: {
          "zh-Hans": "文房与器用秩序",
          "zh-Hant": "文房與器用秩序"
        }
      },
      {
        image: "/images/object-tea-bowl.svg",
        alt: {
          "zh-Hans": "兔毫茶盏示意",
          "zh-Hant": "兔毫茶盞示意"
        },
        caption: {
          "zh-Hans": "茶器中的观看与使用",
          "zh-Hant": "茶器中的觀看與使用"
        }
      },
      {
        image: "/images/object-white-bowl.svg",
        alt: {
          "zh-Hans": "白釉碗示意",
          "zh-Hant": "白釉碗示意"
        },
        caption: {
          "zh-Hans": "比例与留白",
          "zh-Hant": "比例與留白"
        }
      },
      {
        image: "/images/object-writing-case.svg",
        alt: {
          "zh-Hans": "文房案头示意",
          "zh-Hant": "文房案頭示意"
        },
        caption: {
          "zh-Hans": "结构化的日常",
          "zh-Hant": "結構化的日常"
        }
      }
    ],
    sections: [
      {
        heading: {
          "zh-Hans": "观其形质",
          "zh-Hant": "觀其形質"
        },
        body: [
          {
            "zh-Hans": "中国工艺中大量优秀器物并不依赖繁复装饰，而是靠比例、边界、质感和手感来建立高级感。",
            "zh-Hant": "中國工藝中大量優秀器物並不依賴繁複裝飾，而是靠比例、邊界、質感和手感來建立高級感。"
          },
          {
            "zh-Hans": "这种审美判断并不抽象，它始终与使用动作绑定：拿起、注入、书写、摆放，每一步都会反过来塑造器形。",
            "zh-Hant": "這種審美判斷並不抽象，它始終與使用動作綁定：拿起、注入、書寫、擺放，每一步都會反過來塑造器形。"
          }
        ],
        media: [
          {
            image: "/images/timeline-song.svg",
            alt: {
              "zh-Hans": "宋代相关图像",
              "zh-Hant": "宋代相關圖像"
            }
          }
        ]
      },
      {
        heading: {
          "zh-Hans": "知其工序",
          "zh-Hant": "知其工序"
        },
        body: [
          {
            "zh-Hans": "真正的“致用”并不是缩减工艺，而是让每一道工序都服务于最终的使用体验。烧成温度、收口角度、器壁厚薄都不是偶然。",
            "zh-Hant": "真正的「致用」並不是縮減工藝，而是讓每一道工序都服務於最終的使用體驗。燒成溫度、收口角度、器壁厚薄都不是偶然。"
          }
        ],
        media: [
          {
            image: "/images/process-kiln-2.svg",
            alt: {
              "zh-Hans": "烧造流程示意",
              "zh-Hant": "燒造流程示意"
            }
          },
          {
            image: "/images/object-writing-case.svg",
            alt: {
              "zh-Hans": "结构化器物示意",
              "zh-Hant": "結構化器物示意"
            }
          }
        ]
      }
    ],
    diagram: {
      image: "/images/diagram-utility.svg",
      alt: {
        "zh-Hans": "格物致用结构图示",
        "zh-Hant": "格物致用結構圖示"
      },
      caption: {
        "zh-Hans": "从形、工、用三个层面进入理解",
        "zh-Hant": "從形、工、用三個層面進入理解"
      }
    },
    relatedObjectSlugs: ["tea-bowl", "writing-case", "white-bowl", "glass-bowl"],
    references: [
      {
        label: {
          "zh-Hans": "《考工记》与器用观念资料",
          "zh-Hant": "《考工記》與器用觀念資料"
        },
        href: "https://ctext.org"
      }
    ],
    featuredOnHome: false
  }
]);

const baseTimelineSeeds: TimelineSeed[] = [
  {
    slug: "tang",
    title: {
      "zh-Hans": "唐",
      "zh-Hant": "唐"
    },
    periodLabel: {
      "zh-Hans": "盛唐",
      "zh-Hant": "盛唐"
    },
    years: {
      "zh-Hans": "618 - 907",
      "zh-Hant": "618 - 907"
    },
    homeCaptionLines: [
      {
        "zh-Hans": "雍容华贵",
        "zh-Hant": "雍容華貴"
      },
      {
        "zh-Hans": "融合多元",
        "zh-Hant": "融合多元"
      }
    ],
    image: "/images/timeline-tang.svg",
    summary: {
      "zh-Hans": "开放交流与昂扬审美并行，使工艺语言呈现出饱满、外放与兼容并蓄的气质。",
      "zh-Hant": "開放交流與昂揚審美並行，使工藝語言呈現出飽滿、外放與兼容並蓄的氣質。"
    },
    heroSubtitle: {
      "zh-Hans": "开放交流 · 多元融合",
      "zh-Hant": "開放交流 · 多元融合"
    },
    introLabel: {
      "zh-Hans": "时代导览",
      "zh-Hant": "時代導覽"
    },
    introBody: [
      {
        "zh-Hans": "盛唐工艺吸纳来自中亚、西亚与草原的图像和器形，并以更自信的姿态完成本土化。",
        "zh-Hant": "盛唐工藝吸納來自中亞、西亞與草原的圖像和器形，並以更自信的姿態完成本土化。"
      }
    ],
    introMedia: [
      {
        image: "/images/object-bronze-tray.svg",
        alt: {
          "zh-Hans": "唐代金银器示意",
          "zh-Hant": "唐代金銀器示意"
        }
      },
      {
        image: "/images/object-lamp-stand.svg",
        alt: {
          "zh-Hans": "唐代烛台示意",
          "zh-Hant": "唐代燭台示意"
        }
      }
    ],
    sections: [
      {
        heading: {
          "zh-Hans": "盛世气象中的工艺扩张",
          "zh-Hant": "盛世氣象中的工藝擴張"
        },
        body: [
          {
            "zh-Hans": "材料更丰富、图像更复杂、器形更大胆，背后是开放交流网络带来的审美扩张。",
            "zh-Hant": "材料更豐富、圖像更複雜、器形更大膽，背後是開放交流網絡帶來的審美擴張。"
          }
        ]
      }
    ],
    relatedObjectSlugs: ["bronze-tray", "lamp-stand"],
    references: [],
    featuredOnHome: true
  },
  {
    slug: "song",
    title: {
      "zh-Hans": "宋",
      "zh-Hant": "宋"
    },
    periodLabel: {
      "zh-Hans": "两宋",
      "zh-Hant": "兩宋"
    },
    years: {
      "zh-Hans": "960 - 1279",
      "zh-Hant": "960 - 1279"
    },
    homeCaptionLines: [
      {
        "zh-Hans": "简雅天成",
        "zh-Hant": "簡雅天成"
      },
      {
        "zh-Hans": "格物致用",
        "zh-Hant": "格物致用"
      }
    ],
    image: "/images/hero-celadon-bowl.svg",
    summary: {
      "zh-Hans": "更克制的形式、更精密的比例意识和更内敛的色调，使宋代成为“格物致用”的核心样本。",
      "zh-Hant": "更克制的形式、更精密的比例意識和更內斂的色調，使宋代成為「格物致用」的核心樣本。"
    },
    heroSubtitle: {
      "zh-Hans": "疏雅天成 · 格物致用",
      "zh-Hant": "疏雅天成 · 格物致用"
    },
    introLabel: {
      "zh-Hans": "时代导览",
      "zh-Hant": "時代導覽"
    },
    introBody: [
      {
        "zh-Hans": "宋代审美常以含蓄、耐看与尺度准确为核心，器物从炫目走向克制，转而把重点放在材料、比例与动作体验上。",
        "zh-Hant": "宋代審美常以含蓄、耐看與尺度準確為核心，器物從炫目走向克制，轉而把重點放在材料、比例與動作體驗上。"
      }
    ],
    introMedia: [
      {
        image: "/images/timeline-song.svg",
        alt: {
          "zh-Hans": "宋代人物图像示意",
          "zh-Hant": "宋代人物圖像示意"
        }
      },
      {
        image: "/images/object-tea-bowl.svg",
        alt: {
          "zh-Hans": "兔毫茶盏示意",
          "zh-Hant": "兔毫茶盞示意"
        }
      },
      {
        image: "/images/object-writing-case.svg",
        alt: {
          "zh-Hans": "文具箱示意",
          "zh-Hant": "文具箱示意"
        }
      }
    ],
    sections: [
      {
        heading: {
          "zh-Hans": "器用如何进入美学",
          "zh-Hant": "器用如何進入美學"
        },
        body: [
          {
            "zh-Hans": "宋代器物的高级感往往来自“看似简单却难以替代”的使用准确度，这也是格物致用得以成立的社会基础。",
            "zh-Hant": "宋代器物的高級感往往來自「看似簡單卻難以替代」的使用準確度，這也是格物致用得以成立的社會基礎。"
          }
        ]
      }
    ],
    relatedObjectSlugs: ["tea-bowl", "white-bowl", "writing-case"],
    references: [],
    featuredOnHome: true
  },
  {
    slug: "yuan",
    title: {
      "zh-Hans": "元",
      "zh-Hant": "元"
    },
    periodLabel: {
      "zh-Hans": "大元",
      "zh-Hant": "大元"
    },
    years: {
      "zh-Hans": "1271 - 1368",
      "zh-Hant": "1271 - 1368"
    },
    homeCaptionLines: [
      {
        "zh-Hans": "豪迈纵横",
        "zh-Hant": "豪邁縱橫"
      },
      {
        "zh-Hans": "兼收并蓄",
        "zh-Hant": "兼收並蓄"
      }
    ],
    image: "/images/timeline-yuan.svg",
    summary: {
      "zh-Hans": "跨地域统合让材料、图像和技术交流更直接，形成兼具力量感与流动性的视觉面貌。",
      "zh-Hant": "跨地域統合讓材料、圖像和技術交流更直接，形成兼具力量感與流動性的視覺面貌。"
    },
    heroSubtitle: {
      "zh-Hans": "结构力量 · 草原视野",
      "zh-Hant": "結構力量 · 草原視野"
    },
    introLabel: {
      "zh-Hans": "时代导览",
      "zh-Hant": "時代導覽"
    },
    introBody: [
      {
        "zh-Hans": "元代的广域统合使图像与材料的流动更直接，装饰更强调节奏与速度。",
        "zh-Hant": "元代的廣域統合使圖像與材料的流動更直接，裝飾更強調節奏與速度。"
      }
    ],
    introMedia: [
      {
        image: "/images/timeline-yuan.svg",
        alt: {
          "zh-Hans": "元代图像示意",
          "zh-Hant": "元代圖像示意"
        }
      }
    ],
    sections: [],
    relatedObjectSlugs: ["lamp-stand"],
    references: [],
    featuredOnHome: true
  },
  {
    slug: "ming",
    title: {
      "zh-Hans": "明",
      "zh-Hant": "明"
    },
    periodLabel: {
      "zh-Hans": "大明",
      "zh-Hant": "大明"
    },
    years: {
      "zh-Hans": "1368 - 1644",
      "zh-Hant": "1368 - 1644"
    },
    homeCaptionLines: [
      {
        "zh-Hans": "典丽适用",
        "zh-Hant": "典麗適用"
      },
      {
        "zh-Hans": "文质相兼",
        "zh-Hant": "文質相兼"
      }
    ],
    image: "/images/timeline-ming.svg",
    summary: {
      "zh-Hans": "礼制修整与生活品味同步发展，使典雅、适用与精工在同一套秩序中共存。",
      "zh-Hant": "禮制修整與生活品味同步發展，使典雅、適用與精工在同一套秩序中共存。"
    },
    heroSubtitle: {
      "zh-Hans": "文质相彰 · 制度与生活",
      "zh-Hant": "文質相彰 · 制度與生活"
    },
    introLabel: {
      "zh-Hans": "时代导览",
      "zh-Hant": "時代導覽"
    },
    introBody: [
      {
        "zh-Hans": "明代器用在制度与生活之间形成平衡，很多日用器也因此拥有更成熟的形式语言。",
        "zh-Hant": "明代器用在制度與生活之間形成平衡，很多日用器也因此擁有更成熟的形式語言。"
      }
    ],
    introMedia: [
      {
        image: "/images/timeline-ming.svg",
        alt: {
          "zh-Hans": "明代图像示意",
          "zh-Hant": "明代圖像示意"
        }
      }
    ],
    sections: [],
    relatedObjectSlugs: ["writing-case"],
    references: [],
    featuredOnHome: true
  },
  {
    slug: "qing",
    title: {
      "zh-Hans": "清",
      "zh-Hant": "清"
    },
    periodLabel: {
      "zh-Hans": "大清",
      "zh-Hant": "大清"
    },
    years: {
      "zh-Hans": "1644 - 1912",
      "zh-Hant": "1644 - 1912"
    },
    homeCaptionLines: [
      {
        "zh-Hans": "繁缛富艳",
        "zh-Hant": "繁縟富豔"
      },
      {
        "zh-Hans": "规整精致",
        "zh-Hant": "規整精緻"
      }
    ],
    image: "/images/timeline-qing.svg",
    summary: {
      "zh-Hans": "复杂工艺、精密装饰与宫廷趣味叠加，使“繁而不乱”的高级感成为这一时期的重要命题。",
      "zh-Hant": "複雜工藝、精密裝飾與宮廷趣味疊加，使「繁而不亂」的高級感成為這一時期的重要命題。"
    },
    heroSubtitle: {
      "zh-Hans": "繁丽精工 · 巧饰成章",
      "zh-Hant": "繁麗精工 · 巧飾成章"
    },
    introLabel: {
      "zh-Hans": "时代导览",
      "zh-Hant": "時代導覽"
    },
    introBody: [
      {
        "zh-Hans": "清代宫廷和都市消费共同推动工艺向精细化、繁复化发展，但真正出色的作品并不显得杂乱，而是具有高度组织能力。",
        "zh-Hant": "清代宮廷和都市消費共同推動工藝向精細化、繁複化發展，但真正出色的作品並不顯得雜亂，而是具有高度組織能力。"
      }
    ],
    introMedia: [
      {
        image: "/images/object-fan.svg",
        alt: {
          "zh-Hans": "清代扇具示意",
          "zh-Hant": "清代扇具示意"
        }
      },
      {
        image: "/images/timeline-qing.svg",
        alt: {
          "zh-Hans": "清代图像示意",
          "zh-Hant": "清代圖像示意"
        }
      },
      {
        image: "/images/object-white-bowl.svg",
        alt: {
          "zh-Hans": "清代瓷器示意",
          "zh-Hant": "清代瓷器示意"
        }
      }
    ],
    sections: [
      {
        heading: {
          "zh-Hans": "繁缛不等于杂乱",
          "zh-Hant": "繁縟不等於雜亂"
        },
        body: [
          {
            "zh-Hans": "清代工艺最重要的能力，是在多材料、多纹样和高密度装饰中仍然维持秩序感，让复杂成为一种可被控制的美。",
            "zh-Hant": "清代工藝最重要的能力，是在多材料、多紋樣和高密度裝飾中仍然維持秩序感，讓複雜成為一種可被控制的美。"
          }
        ]
      },
      {
        heading: {
          "zh-Hans": "晚期趣味如何影响日常器物",
          "zh-Hant": "晚期趣味如何影響日常器物"
        },
        body: [
          {
            "zh-Hans": "佩用器、扇具、陈设器大量参与身份表达，使日常器物也承担更强的展示功能。",
            "zh-Hant": "佩用器、扇具、陳設器大量參與身份表達，使日常器物也承擔更強的展示功能。"
          }
        ]
      }
    ],
    relatedObjectSlugs: ["fan", "white-bowl"],
    references: [
      {
        label: {
          "zh-Hans": "清宫工艺研究资料",
          "zh-Hant": "清宮工藝研究資料"
        },
        href: "https://www.dpm.org.cn/"
      }
    ],
    featuredOnHome: true
  }
];

const timelineSeeds: TimelineSeed[] = dedupeTimelineSeeds([
  ...buildImportedTimelineSeeds(),
  ...baseTimelineSeeds
]);

const glossarySeeds: GlossarySeed[] = dedupeGlossarySeeds([
  ...buildImportedGlossarySeeds(),
  {
    slug: "kiln-transmutation",
    title: {
      "zh-Hans": "窑变与兔毫纹",
      "zh-Hant": "窯變與兔毫紋"
    },
    summary: {
      "zh-Hans": "建窑黑釉如何在高温中形成丝缕状结晶，是理解兔毫茶盏的关键工艺词条。",
      "zh-Hant": "建窯黑釉如何在高溫中形成絲縷狀結晶，是理解兔毫茶盞的關鍵工藝詞條。"
    },
    intro: [
      {
        "zh-Hans": "所谓“兔毫纹”，并不是后期描摹的花纹，而是窑炉高温中釉层流动、析晶与冷却共同作用的结果。",
        "zh-Hant": "所謂「兔毫紋」，並不是後期描摹的花紋，而是窯爐高溫中釉層流動、析晶與冷卻共同作用的結果。"
      },
      {
        "zh-Hans": "工匠需要同时控制胎土、釉料、火候和冷却节奏，任何一个环节变化都可能让纹理失控，因此这项工艺既依赖经验，也依赖对材料反应的精准判断。",
        "zh-Hant": "工匠需要同時控制胎土、釉料、火候和冷卻節奏，任何一個環節變化都可能讓紋理失控，因此這項工藝既依賴經驗，也依賴對材料反應的精準判斷。"
      }
    ],
    steps: [
      {
        title: {
          "zh-Hans": "配胎与施釉",
          "zh-Hant": "配胎與施釉"
        },
        body: {
          "zh-Hans": "含铁量较高的釉层覆盖在厚胎表面，为后续析晶提供基础条件。",
          "zh-Hant": "含鐵量較高的釉層覆蓋在厚胎表面，為後續析晶提供基礎條件。"
        },
        image: "/images/process-kiln-1.svg"
      },
      {
        title: {
          "zh-Hans": "高温熔融",
          "zh-Hant": "高溫熔融"
        },
        body: {
          "zh-Hans": "窑温升高后，釉层开始强烈流动，铁质在液态表面聚集。",
          "zh-Hant": "窯溫升高後，釉層開始強烈流動，鐵質在液態表面聚集。"
        },
        image: "/images/process-kiln-2.svg"
      },
      {
        title: {
          "zh-Hans": "析晶拉丝",
          "zh-Hant": "析晶拉絲"
        },
        body: {
          "zh-Hans": "温度回落时结晶逐渐析出，形成细长、带有方向性的“毫纹”。",
          "zh-Hant": "溫度回落時結晶逐漸析出，形成細長、帶有方向性的「毫紋」。"
        },
        image: "/images/process-kiln-3.svg"
      },
      {
        title: {
          "zh-Hans": "冷却定型",
          "zh-Hant": "冷卻定型"
        },
        body: {
          "zh-Hans": "冷却速度决定纹理是否清晰稳定，也影响最终釉色的层次。",
          "zh-Hant": "冷卻速度決定紋理是否清晰穩定，也影響最終釉色的層次。"
        },
        image: "/images/process-kiln-4.svg"
      }
    ],
    video: {
      title: {
        "zh-Hans": "建窑烧成过程示意",
        "zh-Hant": "建窯燒成過程示意"
      },
      image: "/images/video-kiln.svg"
    },
    relatedObjectSlugs: ["tea-bowl", "white-bowl"],
    references: [
      {
        label: {
          "zh-Hans": "建窑黑釉研究资料",
          "zh-Hant": "建窯黑釉研究資料"
        },
        href: "https://www.npm.gov.tw/"
      }
    ]
  },
  {
    slug: "metal-chasing",
    title: {
      "zh-Hans": "錾刻与锤揲",
      "zh-Hant": "鏨刻與錘揲"
    },
    summary: {
      "zh-Hans": "金属器表面起伏纹样如何被一点点敲击出来，是理解唐代金工的重要工艺词条。",
      "zh-Hant": "金屬器表面起伏紋樣如何被一點點敲擊出來，是理解唐代金工的重要工藝詞條。"
    },
    intro: [
      {
        "zh-Hans": "錾刻与锤揲常常配合使用：前者处理线条与局部纹样，后者负责让整体表面起伏成形。",
        "zh-Hant": "鏨刻與錘揲常常配合使用：前者處理線條與局部紋樣，後者負責讓整體表面起伏成形。"
      }
    ],
    steps: [
      {
        title: {
          "zh-Hans": "起稿",
          "zh-Hant": "起稿"
        },
        body: {
          "zh-Hans": "先在金属片表面定出主要纹样和边界。",
          "zh-Hant": "先在金屬片表面定出主要紋樣和邊界。"
        },
        image: "/images/process-metal-1.svg"
      },
      {
        title: {
          "zh-Hans": "锤揲起伏",
          "zh-Hant": "錘揲起伏"
        },
        body: {
          "zh-Hans": "从背面反复敲击，使图案产生浮雕般的起伏。",
          "zh-Hant": "從背面反覆敲擊，使圖案產生浮雕般的起伏。"
        },
        image: "/images/process-metal-2.svg"
      },
      {
        title: {
          "zh-Hans": "正面修整",
          "zh-Hant": "正面修整"
        },
        body: {
          "zh-Hans": "回到正面细修边缘和线脚，强化轮廓节奏。",
          "zh-Hant": "回到正面細修邊緣和線腳，強化輪廓節奏。"
        },
        image: "/images/process-metal-3.svg"
      },
      {
        title: {
          "zh-Hans": "抛光与鎏金",
          "zh-Hant": "拋光與鎏金"
        },
        body: {
          "zh-Hans": "最后通过表面处理统一光泽，让纹样层次更清晰。",
          "zh-Hant": "最後透過表面處理統一光澤，讓紋樣層次更清晰。"
        },
        image: "/images/process-metal-4.svg"
      }
    ],
    video: {
      title: {
        "zh-Hans": "金工敲击流程示意",
        "zh-Hant": "金工敲擊流程示意"
      },
      image: "/images/video-metal.svg"
    },
    relatedObjectSlugs: ["bronze-tray", "lamp-stand"],
    references: []
  }
]);

function getRelatedTermLinks(locale: Locale, slugs: string[]): RelatedTermLink[] {
  const seen = new Set<string>();

  return slugs.flatMap<RelatedTermLink>((slug) => {
    if (!slug || seen.has(slug)) {
      return [];
    }

    seen.add(slug);

    const glossary = glossarySeeds.find((entry) => entry.slug === slug);

    if (glossary) {
      return [
        {
          title: localizeText(locale, glossary.title),
          href: `/glossary/${glossary.slug}`,
          kind: "glossary"
        }
      ];
    }

    const concept = conceptSeeds.find((entry) => entry.slug === slug);

    if (concept) {
      return [
        {
          title: localizeText(locale, concept.title),
          href: `/concepts/${concept.slug}`,
          kind: "concept"
        }
      ];
    }

    return [];
  });
}

function getObjectCard(locale: Locale, slug: string): RelatedCard {
  const seed = objectSeeds.find((entry) => entry.slug === slug);

  if (!seed) {
    throw new Error(`Missing related object seed: ${slug}`);
  }

  return {
    title: localizeText(locale, seed.title),
    meta: seed.accessionNumber,
    image: seed.image,
    href: `/objects/${seed.slug}`
  };
}

export function getCatalogContent(locale: Locale): CatalogContent {
  return {
    objects: objectSeeds.map((entry) => ({
      slug: entry.slug,
      eraSlug: entry.eraSlug,
      materialSlug: entry.materialSlug,
      objectKindSlug: entry.objectKindSlug,
      conceptSlugs: entry.conceptSlugs,
      title: localizeText(locale, entry.title),
      accessionNumber: entry.accessionNumber,
      dynasty: localizeText(locale, entry.dynasty),
      material: localizeText(locale, entry.material),
      image: entry.image,
      summary: localizeText(locale, entry.summary),
      highlights: localizeTextList(locale, entry.highlights),
      overview: localizeTextList(locale, entry.overview),
      craftInsights: entry.craftInsights.map((item) => ({
        title: localizeText(locale, item.title),
        summary: localizeText(locale, item.summary),
        image: item.image,
        href: item.glossarySlug ? `/glossary/${item.glossarySlug}` : undefined
      })),
      cultureTitle: localizeText(locale, entry.cultureTitle),
      cultureBody: localizeTextList(locale, entry.cultureBody),
      cultureMedia: localizeMedia(locale, entry.cultureMedia),
      relatedTerms:
        (entry.relatedTermSlugs?.length ?? 0) > 0
          ? getRelatedTermLinks(locale, entry.relatedTermSlugs ?? [])
          : entry.cultureCtaHref
            ? [
                {
                  title: localizeText(locale, entry.cultureCtaLabel),
                  href: entry.cultureCtaHref,
                  kind: entry.cultureCtaHref.startsWith("/glossary/") ? "glossary" : "concept"
                }
              ]
            : [],
      cultureCtaLabel: localizeText(locale, entry.cultureCtaLabel),
      cultureCtaHref: entry.cultureCtaHref || `/concepts/${entry.conceptSlugs[0] ?? "utility"}`,
      relatedObjects: getRelatedObjectCards(
        locale,
        entry.relatedObjectSlugs,
        getDerivedRelatedObjectSlugs(entry),
        4
      ),
      references: localizeReferences(locale, entry.references),
      search: {
        colors: localizeTextList(locale, entry.search.colors),
        materials: localizeTextList(locale, entry.search.materials)
      },
      featuredOnHome: entry.featuredOnHome,
      href: `/objects/${entry.slug}`
    })),
    concepts: conceptSeeds.map((entry) => ({
      slug: entry.slug,
      title: localizeText(locale, entry.title),
      summary: localizeText(locale, entry.summary),
      image: entry.image,
      accent: entry.accent,
      heroSubtitle: localizeText(locale, entry.heroSubtitle),
      introLabel: localizeText(locale, entry.introLabel),
      introBody: localizeTextList(locale, entry.introBody),
      introMedia: localizeMedia(locale, entry.introMedia),
      sections: localizeSections(locale, entry.sections),
      diagram: entry.diagram
        ? {
            image: entry.diagram.image,
            alt: localizeText(locale, entry.diagram.alt),
            caption: entry.diagram.caption
              ? localizeText(locale, entry.diagram.caption)
              : undefined
          }
        : null,
      relatedObjects: getRelatedObjectCards(
        locale,
        [],
        objectSeeds
          .filter((object) => object.conceptSlugs.includes(entry.slug))
          .map((object) => object.slug),
        4
      ),
      references: localizeReferences(locale, entry.references),
      featuredOnHome: entry.featuredOnHome,
      href: `/concepts/${entry.slug}`
    })),
    timeline: timelineSeeds.map((entry) => ({
      slug: entry.slug,
      title: localizeText(locale, entry.title),
      periodLabel: localizeText(locale, entry.periodLabel),
      years: localizeText(locale, entry.years),
      homeCaptionLines: localizeTextList(locale, entry.homeCaptionLines),
      image: entry.image,
      summary: localizeText(locale, entry.summary),
      heroSubtitle: localizeText(locale, entry.heroSubtitle),
      introLabel: localizeText(locale, entry.introLabel),
      introBody: localizeTextList(locale, entry.introBody),
      introMedia: localizeMedia(locale, entry.introMedia),
      sections: localizeSections(locale, entry.sections),
      relatedObjects: getRelatedObjectCards(
        locale,
        entry.relatedObjectSlugs,
        objectSeeds
          .filter((object) => object.eraSlug === entry.slug)
          .map((object) => object.slug)
      ),
      references: localizeReferences(locale, entry.references),
      featuredOnHome: entry.featuredOnHome,
      href: `/timeline/${entry.slug}`
    })),
    glossary: glossarySeeds.map((entry) => ({
      slug: entry.slug,
      title: localizeText(locale, entry.title),
      summary: localizeText(locale, entry.summary),
      intro: localizeTextList(locale, entry.intro),
      steps: entry.steps.map((step) => ({
        title: localizeText(locale, step.title),
        body: localizeText(locale, step.body),
        image: step.image
      })),
      video: {
        title: localizeText(locale, entry.video.title),
        image: entry.video.image
      },
      relatedObjects: entry.relatedObjectSlugs.map((slug) => getObjectCard(locale, slug)),
      references: localizeReferences(locale, entry.references),
      href: `/glossary/${entry.slug}`
    }))
  };
}

export function findConceptBySlug(locale: Locale, slug: string): ConceptEntry | null {
  return getCatalogContent(locale).concepts.find((item) => item.slug === slug) ?? null;
}

export function findObjectBySlug(locale: Locale, slug: string): ObjectEntry | null {
  return getCatalogContent(locale).objects.find((item) => item.slug === slug) ?? null;
}

export function findTimelineBySlug(locale: Locale, slug: string): TimelineEntry | null {
  return getCatalogContent(locale).timeline.find((item) => item.slug === slug) ?? null;
}

export function findGlossaryBySlug(locale: Locale, slug: string): GlossaryEntry | null {
  return getCatalogContent(locale).glossary.find((item) => item.slug === slug) ?? null;
}
