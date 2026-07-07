import styles from "./CatalogPage.module.css";

export function OverviewCard({
  title,
  summary,
  image,
  href,
  meta,
  ctaLabel,
  variant = "default"
}: {
  title: string;
  summary?: string;
  image: string;
  href: string;
  meta?: string;
  ctaLabel: string;
  variant?:
    | "default"
    | "conceptIndex"
    | "timelineIndex"
    | "timelinePanel"
    | "timelinePhilosophyPanel";
}) {
  const isTimelineCard =
    variant === "timelineIndex" ||
    variant === "timelinePanel" ||
    variant === "timelinePhilosophyPanel";
  const isTimelineIndex = variant === "timelineIndex";

  return (
    <a
      href={href}
      className={
        variant === "conceptIndex"
          ? `${styles.overviewCard} ${styles.conceptOverviewCard}`
          : variant === "timelineIndex"
            ? `${styles.overviewCard} ${styles.timelineOverviewIndexCard}`
            : isTimelineCard
            ? `${styles.overviewCard} ${styles.timelineOverviewCard}`
            : styles.overviewCard
      }
    >
      <div
        className={
          variant === "conceptIndex"
            ? `${styles.overviewImage} ${styles.conceptOverviewImage}`
            : variant === "timelineIndex"
              ? `${styles.overviewImage} ${styles.timelineOverviewIndexCardImage}`
              : variant === "timelinePhilosophyPanel"
                ? `${styles.overviewImage} ${styles.timelineOverviewImage} ${styles.timelineOverviewPhilosophyImage}`
              : variant === "timelinePanel"
                ? `${styles.overviewImage} ${styles.timelineOverviewImage}`
              : styles.overviewImage
        }
      >
        <img src={image} alt={title} />
      </div>
      <div
        className={
          isTimelineIndex
            ? `${styles.overviewCopy} ${styles.timelineOverviewIndexCopy}`
            : styles.overviewCopy
        }
      >
        {meta ? <div className={styles.overviewMeta}>{meta}</div> : null}
        {isTimelineIndex ? (
          <div className={styles.timelineOverviewIndexRow}>
            <h2 className={styles.overviewTitle}>{title}</h2>
            <span className={styles.overviewCta}>
              {ctaLabel}
              <span aria-hidden="true">→</span>
            </span>
          </div>
        ) : (
          <h2 className={styles.overviewTitle}>{title}</h2>
        )}
        {summary ? <p className={styles.overviewSummary}>{summary}</p> : null}
        {isTimelineIndex ? null : (
          <span className={styles.overviewCta}>
            {ctaLabel}
            <span aria-hidden="true">→</span>
          </span>
        )}
      </div>
    </a>
  );
}
