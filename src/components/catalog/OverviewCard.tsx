import styles from "./CatalogPage.module.css";

export function OverviewCard({
  title,
  summary,
  image,
  href,
  meta,
  ctaLabel
}: {
  title: string;
  summary: string;
  image: string;
  href: string;
  meta: string;
  ctaLabel: string;
}) {
  return (
    <a href={href} className={styles.overviewCard}>
      <div className={styles.overviewImage}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.overviewMeta}>{meta}</div>
      <h2 className={styles.overviewTitle}>{title}</h2>
      <p className={styles.overviewSummary}>{summary}</p>
      <span className={styles.overviewCta}>
        {ctaLabel}
        <span aria-hidden="true">→</span>
      </span>
    </a>
  );
}
