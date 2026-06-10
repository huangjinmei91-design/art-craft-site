import type { ConceptEntry } from "@/data/catalog";
import { ReferenceList } from "./ReferenceList";
import styles from "./CatalogPage.module.css";

type RelatedCard = {
  title: string;
  meta: string;
  image: string;
  href: string;
};

export function ConceptDetailView({
  backHref,
  backLabel,
  concept
}: {
  backHref: string;
  backLabel: string;
  concept: ConceptEntry;
}) {
  const [sourceSection, formSection] = concept.sections;

  return (
    <>
      <section className={styles.detailHero}>
        <div className={styles.breadcrumbs}>
          <a href={backHref}>{backLabel}</a>
        </div>

        <div className={styles.conceptBanner}>
          <img src={concept.image} alt={concept.title} />
        </div>
      </section>

      {concept.introBody.length > 0 ? (
        <section className={styles.section}>
          <div className={styles.sectionHeadingRow}>
            <h2 className={styles.sectionHeading}>{concept.introLabel || "理念简述"}</h2>
          </div>
          <div className={styles.longformText}>
            {concept.introBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      ) : null}

      {sourceSection ? (
        <section className={styles.section}>
          <div className={styles.sectionHeadingRow}>
            <h2 className={styles.sectionHeading}>{sourceSection.heading}</h2>
          </div>
          <div className={styles.conceptSourceGrid}>
            <div className={styles.longformText}>
              {sourceSection.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {sourceSection.media.length > 0 ? (
              <div
                className={
                  sourceSection.media.length === 1
                    ? `${styles.mediaMosaic} ${styles.mediaMosaicSingle}`
                    : styles.mediaMosaic
                }
              >
                {sourceSection.media.map((item) => (
                  <figure key={`${item.image}-${item.alt}`} className={styles.mediaCard}>
                    <img src={item.image} alt={item.alt} />
                    {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                  </figure>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {formSection ? (
        <section className={styles.section}>
          <div className={styles.sectionHeadingRow}>
            <h2 className={styles.sectionHeading}>{formSection.heading}</h2>
          </div>
          <div className={styles.longformText}>
            {formSection.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {formSection.media[0] ? (
            <figure className={styles.diagramCard}>
              <img src={formSection.media[0].image} alt={formSection.media[0].alt} />
              {formSection.media[0].caption ? (
                <figcaption>{formSection.media[0].caption}</figcaption>
              ) : null}
            </figure>
          ) : null}
        </section>
      ) : null}

      {concept.relatedObjects.length > 0 ? (
        <section className={styles.section}>
          <div className={styles.sectionHeadingRow}>
            <h2 className={styles.sectionHeading}>相关推荐</h2>
          </div>
          <div className={styles.relatedGrid}>
            {concept.relatedObjects.map((item: RelatedCard) => (
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

      {concept.references.length > 0 ? (
        <section className={styles.section}>
          <div className={styles.sectionHeadingRow}>
            <h2 className={styles.sectionHeading}>参考文献</h2>
          </div>
          <ReferenceList references={concept.references} />
        </section>
      ) : null}
    </>
  );
}
