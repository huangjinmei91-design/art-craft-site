import type { GlossaryEntry } from "@/data/catalog";
import { ReferenceList } from "./ReferenceList";
import styles from "./CatalogPage.module.css";

function NarrativeSection({
  heading,
  body,
  figure,
  reverse
}: {
  heading: string;
  body: string[];
  figure?: GlossaryEntry["introMedia"][number];
  reverse?: boolean;
}) {
  if (body.length === 0 && !figure) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeadingRow}>
        <h2 className={styles.sectionHeading}>{heading}</h2>
      </div>
      <div
        className={
          reverse
            ? `${styles.glossaryNarrativeGrid} ${styles.glossaryNarrativeGridReverse}`
            : styles.glossaryNarrativeGrid
        }
      >
        {reverse ? (
          <>
            {figure ? (
              <figure className={styles.glossaryNarrativeFigure}>
                <img src={figure.image} alt={figure.alt} />
                {figure.caption ? <figcaption>{figure.caption}</figcaption> : null}
              </figure>
            ) : null}
            {body.length > 0 ? (
              <div className={styles.longformText}>
                {body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <>
            {body.length > 0 ? (
              <div className={styles.longformText}>
                {body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}
            {figure ? (
              <figure className={styles.glossaryNarrativeFigure}>
                <img src={figure.image} alt={figure.alt} />
                {figure.caption ? <figcaption>{figure.caption}</figcaption> : null}
              </figure>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}

export function GlossaryDetailView({
  backHref,
  backLabel,
  entry
}: {
  backHref: string;
  backLabel: string;
  entry: GlossaryEntry;
}) {
  return (
    <>
      <section className={styles.section}>
        <div className={styles.breadcrumbs}>
          <a href={backHref}>{backLabel}</a>
        </div>
        <div className={styles.glossaryDetailHero}>
          <h1 className={styles.objectTitle}>{entry.title}</h1>
          {entry.summary ? <p className={styles.detailSummary}>{entry.summary}</p> : null}
        </div>
      </section>

      <NarrativeSection
        heading={entry.introLabel || "简介"}
        body={entry.introBody}
        figure={entry.introMedia[0]}
      />

      <NarrativeSection
        heading={entry.historyLabel || "历史发展"}
        body={entry.historyBody}
        figure={entry.historyMedia[0]}
        reverse
      />

      {entry.relatedObjects.length > 0 ? (
        <section className={styles.section}>
          <div className={styles.sectionHeadingRow}>
            <h2 className={styles.sectionHeading}>相关推荐</h2>
          </div>
          <div className={styles.relatedGrid}>
            {entry.relatedObjects.map((item) => (
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

      {entry.references.length > 0 ? (
        <section className={styles.section}>
          <div className={styles.sectionHeadingRow}>
            <h2 className={styles.sectionHeading}>参考文献</h2>
          </div>
          <ReferenceList references={entry.references} />
        </section>
      ) : null}
    </>
  );
}
