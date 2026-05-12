import type { MediaItem, ReferenceItem } from "@/data/catalog";
import styles from "./CatalogPage.module.css";

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

export function EssayDetailView({
  backHref,
  backLabel,
  title,
  subtitle,
  summary,
  heroImage,
  heroImageAlt,
  introLabel,
  introBody,
  introMedia,
  sections,
  diagram,
  relatedObjects,
  references
}: {
  backHref: string;
  backLabel: string;
  title: string;
  subtitle: string;
  summary: string;
  heroImage: string;
  heroImageAlt: string;
  introLabel: string;
  introBody: string[];
  introMedia: MediaItem[];
  sections: EssaySection[];
  diagram?: MediaItem | null;
  relatedObjects: RelatedCard[];
  references: ReferenceItem[];
}) {
  return (
    <>
      <section className={styles.detailHero}>
        <div className={styles.breadcrumbs}>
          <a href={backHref}>{backLabel}</a>
        </div>

        <div className={styles.detailHeroGrid}>
          <div className={styles.detailHeroMedia}>
            <img src={heroImage} alt={heroImageAlt} />
          </div>
          <div className={styles.detailHeroCopy}>
            <p className={styles.detailKicker}>{subtitle}</p>
            <h1 className={styles.detailTitle}>{title}</h1>
            <p className={styles.detailSummary}>{summary}</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeadingRow}>
          <h2 className={styles.sectionHeading}>{introLabel}</h2>
        </div>
        <div className={styles.splitNarrative}>
          <div className={styles.longformText}>
            {introBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className={styles.mediaMosaic}>
            {introMedia.map((item) => (
              <figure key={`${item.image}-${item.alt}`} className={styles.mediaCard}>
                <img src={item.image} alt={item.alt} />
                {item.caption ? <figcaption>{item.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        </div>
      </section>

      {sections.map((section) => (
        <section key={section.heading} className={styles.section}>
          <div className={styles.sectionHeadingRow}>
            <h2 className={styles.sectionHeading}>{section.heading}</h2>
          </div>
          <div className={styles.splitNarrative}>
            <div className={styles.longformText}>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {section.media.length > 0 ? (
              <div className={styles.mediaMosaic}>
                {section.media.map((item) => (
                  <figure key={`${item.image}-${item.alt}`} className={styles.mediaCard}>
                    <img src={item.image} alt={item.alt} />
                    {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                  </figure>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ))}

      {diagram ? (
        <section className={styles.section}>
          <figure className={styles.diagramCard}>
            <img src={diagram.image} alt={diagram.alt} />
            {diagram.caption ? <figcaption>{diagram.caption}</figcaption> : null}
          </figure>
        </section>
      ) : null}

      {relatedObjects.length > 0 ? (
        <section className={styles.section}>
          <div className={styles.sectionHeadingRow}>
            <h2 className={styles.sectionHeading}>相关物品</h2>
          </div>
          <div className={styles.relatedGrid}>
            {relatedObjects.map((item) => (
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

      {references.length > 0 ? (
        <section className={styles.section}>
          <div className={styles.sectionHeadingRow}>
            <h2 className={styles.sectionHeading}>参考文献</h2>
          </div>
          <ol className={styles.referenceList}>
            {references.map((item) => (
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
