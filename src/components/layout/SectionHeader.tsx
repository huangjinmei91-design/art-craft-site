import styles from "./SectionHeader.module.css";

export function SectionHeader({
  title,
  actionLabel,
  href
}: {
  title: string;
  actionLabel: string;
  href?: string;
}) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title} id={title}>
        {title}
      </h2>
      {href ? (
        <a href={href} className={styles.link}>
          {actionLabel}
        </a>
      ) : (
        <span className={styles.link}>{actionLabel}</span>
      )}
    </div>
  );
}
