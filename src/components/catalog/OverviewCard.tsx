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
  variant?: "default" | "conceptIndex" | "timelinePanel";
}) {
  return (
    <a
      href={href}
      className={
        variant === "conceptIndex"
          ? `${styles.overviewCard} ${styles.conceptOverviewCard}`
          : variant === "timelinePanel"
            ? `${styles.overviewCard} ${styles.timelineOverviewCard}`
            : styles.overviewCard
      }
    >
      <div
        className={
          variant === "conceptIndex"
            ? `${styles.overviewImage} ${styles.conceptOverviewImage}`
            : variant === "timelinePanel"
              ? `${styles.overviewImage} ${styles.timelineOverviewImage}`
              : styles.overviewImage
        }
      >
        <img src={image} alt={title} />
      </div>
      <div className={styles.overviewCopy}>
        {meta ? <div className={styles.overviewMeta}>{meta}</div> : null}
        <h2 className={styles.overviewTitle}>{title}</h2>
        {summary ? <p className={styles.overviewSummary}>{summary}</p> : null}
        <span className={styles.overviewCta}>
          {ctaLabel}
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </a>
  );
}
