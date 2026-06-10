import type { ReferenceItem } from "@/data/catalog";
import styles from "./CatalogPage.module.css";

export function ReferenceList({ references }: { references: ReferenceItem[] }) {
  return (
    <ol className={styles.referenceList}>
      {references.map((item, index) => (
        <li key={`${item.label}-${item.href ?? index}`}>
          {item.href ? (
            <a href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ) : (
            <span>{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  );
}
