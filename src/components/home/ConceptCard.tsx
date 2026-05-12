import type { ConceptCard as ConceptCardType } from "@/data/home";
import cardStyles from "./CardGrid.module.css";

export function ConceptCard({ card }: { card: ConceptCardType }) {
  return (
    <a href={card.href} className={cardStyles.conceptCard}>
      <div className={cardStyles.imageFrame}>
        <img src={card.image} alt={card.title} className={cardStyles.image} />
      </div>
      <div className={cardStyles.conceptOverlay}>
        <h3 className={cardStyles.conceptTitle}>{card.title}</h3>
        <p className={cardStyles.conceptDescription}>{card.description}</p>
      </div>
    </a>
  );
}
