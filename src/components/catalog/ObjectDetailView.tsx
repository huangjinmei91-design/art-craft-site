import type { ObjectEntry } from "@/data/catalog";
import styles from "./CatalogPage.module.css";

function splitCraftSummary(summary: string): string[] {
  return summary
    .split("||")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function ObjectDetailView({
  backHref,
  backLabel,
  object
}: {
  backHref: string;
  backLabel: string;
  object: ObjectEntry;
}) {
  return (
    <>
      <section className={styles.objectHeroSection}>
        <div className={styles.breadcrumbs}>
          <a href={backHref}>{backLabel}</a>
        </div>

        <div className={styles.objectHeroGrid}>
          <div className={styles.objectHeroCopy}>
            <div className={styles.objectMetaLine}>{object.accessionNumber}</div>
            <h1 className={styles.objectTitle}>{object.title}</h1>
            <div className={styles.objectChipRow}>
              <span className={styles.objectChip}>{object.dynasty}</span>
              <span className={styles.objectChip}>{object.material}</span>
            </div>
            <p className={styles.objectSectionLabel}>文物名片</p>
            <div className={styles.longformText}>
              {object.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className={styles.objectHeroMedia}>
            <img src={object.image} alt={object.title} />
          </div>
        </div>
      </section>

      {object.craftInsights.length > 0 ? (
        <section className={styles.section}>
          <div className={styles.sectionHeadingRow}>
            <h2 className={styles.sectionHeading}>工艺品鉴</h2>
          </div>
          <div className={styles.insightList}>
            {object.craftInsights.map((item) => (
              item.href ? (
                <a key={`${item.title}-${item.href}`} href={item.href} className={styles.insightCard}>
                  <div className={styles.insightThumb}>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className={styles.insightCopy}>
                    <h3>{item.title}</h3>
                    <div className={styles.insightText}>
                      {splitCraftSummary(item.summary).map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    <span className={styles.inlineLink}>进入词条</span>
                  </div>
                </a>
              ) : (
                <article key={item.title} className={styles.insightCard}>
                  <div className={styles.insightThumb}>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className={styles.insightCopy}>
                    <h3>{item.title}</h3>
                    <div className={styles.insightText}>
                      {splitCraftSummary(item.summary).map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </article>
              )
            ))}
          </div>
        </section>
      ) : null}

      {object.cultureBody.length > 0 ? (
        <section className={styles.section}>
          <div className={styles.sectionHeadingRow}>
            <h2 className={styles.sectionHeading}>{object.cultureTitle}</h2>
          </div>
          <div className={styles.splitNarrative}>
            <div
              className={
                object.cultureMedia.length === 1
                  ? `${styles.mediaMosaic} ${styles.mediaMosaicSingle}`
                  : styles.mediaMosaic
              }
            >
              {object.cultureMedia.map((item) => (
                <figure
                  key={`${item.image}-${item.alt}`}
                  className={
                    object.cultureMedia.length === 1
                      ? `${styles.mediaCard} ${styles.mediaCardLarge}`
                      : styles.mediaCard
                  }
                >
                  <img src={item.image} alt={item.alt} />
                  {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
            <div className={styles.longformText}>
              {object.cultureBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {object.relatedTerms.length > 0 ? (
                <div className={styles.readingBlock}>
                  <p className={styles.readingLabel}>延伸阅读</p>
                  <div className={styles.readingLinks}>
                    {object.relatedTerms.map((item) => (
                      <a key={item.href} href={item.href} className={styles.readingLinkChip}>
                        {item.title}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a href={object.cultureCtaHref} className={styles.moreLink}>
                  {object.cultureCtaLabel}
                </a>
              )}
            </div>
          </div>
        </section>
      ) : null}

      {object.relatedObjects.length > 0 ? (
        <section className={styles.section}>
          <div className={styles.sectionHeadingRow}>
            <h2 className={styles.sectionHeading}>相关推荐</h2>
          </div>
          <div className={styles.relatedGrid}>
            {object.relatedObjects.map((item) => (
              <a key={item.href} href={item.href} className={styles.relatedCard}>
                <div className={styles.relatedCardMeta}>{item.meta}</div>
                <div className={styles.relatedCardImage}>
                  <img src={item.image} alt={item.title} />
                </div>
                <h3 className={styles.relatedCardTitle}>{item.title}</h3>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      {object.references.length > 0 ? (
        <section className={styles.section}>
          <div className={styles.sectionHeadingRow}>
            <h2 className={styles.sectionHeading}>参考文献</h2>
          </div>
          <ol className={styles.referenceList}>
            {object.references.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </>
  );
}
