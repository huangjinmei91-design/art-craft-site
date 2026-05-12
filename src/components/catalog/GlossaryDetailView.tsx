import type { GlossaryEntry } from "@/data/catalog";
import styles from "./CatalogPage.module.css";

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
        <div className={styles.glossaryIntroGrid}>
          <div>
            <h1 className={styles.objectTitle}>{entry.title}</h1>
            <p className={styles.detailSummary}>{entry.summary}</p>
          </div>
          <div className={styles.longformText}>
            {entry.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.glossarySteps}>
          {entry.steps.map((step) => (
            <article key={step.title} className={styles.glossaryStep}>
              <div className={styles.glossaryStepImage}>
                <img src={step.image} alt={step.title} />
              </div>
              <div className={styles.glossaryStepCopy}>
                <h2 className={styles.sectionHeading}>{step.title}</h2>
                <p>{step.body}</p>
              </div>
            </article>
          ))}
        </div>

        <aside className={styles.videoCard}>
          <img src={entry.video.image} alt={entry.video.title} />
          <div className={styles.videoOverlay}>
            <span className={styles.videoPlay}>▶</span>
            <span>{entry.video.title}</span>
          </div>
        </aside>
      </section>

      {entry.relatedObjects.length > 0 ? (
        <section className={styles.section}>
          <div className={styles.sectionHeadingRow}>
            <h2 className={styles.sectionHeading}>相关物件</h2>
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
          <ol className={styles.referenceList}>
            {entry.references.map((item) => (
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
