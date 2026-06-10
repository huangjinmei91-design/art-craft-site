import type { ObjectEntry, TimelineEntry } from "@/data/catalog";
import { OverviewCard } from "./OverviewCard";
import { ReferenceList } from "./ReferenceList";
import styles from "./CatalogPage.module.css";

type TimelinePanelCard = {
  title: string;
  summary: string;
  image: string;
  href: string;
  ctaLabel: string;
  variant?: "default" | "conceptIndex" | "timelinePanel";
};

export function TimelineDetailView({
  backHref,
  backLabel,
  entry,
  philosophyCards,
  cultureCards,
  recommendedObjects
}: {
  backHref: string;
  backLabel: string;
  entry: TimelineEntry;
  philosophyCards: TimelinePanelCard[];
  cultureCards: TimelinePanelCard[];
  recommendedObjects: ObjectEntry["relatedObjects"];
}) {
  const introMedia = entry.introMedia[0];
  const periodSummary = [entry.periodLabel, entry.years].filter(Boolean).join(" · ");

  return (
    <>
      <section className={styles.timelineHeroSection}>
        <div className={styles.timelineHeroTop}>
          <div className={styles.breadcrumbs}>
            <a href={backHref}>{backLabel}</a>
          </div>
        </div>

        <div className={styles.timelineBanner}>
          <img src={entry.image} alt={entry.title} />
          <div className={styles.timelineBannerShade} />
          <div className={styles.timelineBannerCopy}>
            <p className={styles.detailKicker}>{entry.heroSubtitle}</p>
            <h1 className={`${styles.detailTitle} ${styles.timelineBannerTitle}`}>{entry.title}</h1>
            {periodSummary ? <p className={styles.timelineBannerMeta}>{periodSummary}</p> : null}
            <p className={styles.timelineBannerSummary}>{entry.summary}</p>
          </div>
        </div>
      </section>

      {entry.introBody.length > 0 || introMedia ? (
        <section className={styles.section}>
          <div className={styles.timelineIntroGrid}>
            <div className={styles.timelineIntroCopy}>
              <div className={styles.sectionHeadingRow}>
                <h2 className={styles.sectionHeading}>{entry.introLabel || "时代简介"}</h2>
              </div>
              <div className={styles.longformText}>
                {entry.introBody.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            {introMedia ? (
              <figure className={styles.timelineIntroFigure}>
                <img src={introMedia.image} alt={introMedia.alt} />
                {introMedia.caption ? <figcaption>{introMedia.caption}</figcaption> : null}
              </figure>
            ) : null}
          </div>
        </section>
      ) : null}

      {philosophyCards.length > 0 ? (
        <section className={styles.section}>
          <div className={styles.sectionHeadingRow}>
            <h2 className={styles.sectionHeading}>美学哲学理念</h2>
          </div>
          <div
            className={
              philosophyCards.length === 1
                ? `${styles.timelinePanelGrid} ${styles.timelinePanelGridSingle}`
                : styles.timelinePanelGrid
            }
          >
            {philosophyCards.map((item) => (
              <OverviewCard
                key={item.href}
                title={item.title}
                summary={item.summary}
                image={item.image}
                href={item.href}
                ctaLabel={item.ctaLabel}
                variant={item.variant}
              />
            ))}
          </div>
        </section>
      ) : null}

      {cultureCards.length > 0 ? (
        <section className={styles.section}>
          <div className={styles.sectionHeadingRow}>
            <h2 className={styles.sectionHeading}>相关文化场景</h2>
          </div>
          <div
            className={
              cultureCards.length === 1
                ? `${styles.timelinePanelGrid} ${styles.timelinePanelGridSingle}`
                : styles.timelinePanelGrid
            }
          >
            {cultureCards.map((item) => (
              <OverviewCard
                key={item.href}
                title={item.title}
                summary={item.summary}
                image={item.image}
                href={item.href}
                ctaLabel={item.ctaLabel}
                variant={item.variant}
              />
            ))}
          </div>
        </section>
      ) : null}

      {recommendedObjects.length > 0 ? (
        <section className={styles.section}>
          <div className={styles.sectionHeadingRow}>
            <h2 className={styles.sectionHeading}>相关推荐</h2>
          </div>
          <div className={styles.relatedGrid}>
            {recommendedObjects.map((item) => (
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
