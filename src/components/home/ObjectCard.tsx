import type { ObjectCard as ObjectCardType } from "@/data/home";
import cardStyles from "./CardGrid.module.css";

export function ObjectCard({ card }: { card: ObjectCardType }) {
  return (
    <a href={card.href} className={cardStyles.objectCard}>
      <div className={cardStyles.objectBody}>
        <h3 className={cardStyles.objectTitle}>{card.title}</h3>
        <p className={cardStyles.objectNumber}>{card.accessionNumber}</p>
      </div>
      <div className={cardStyles.objectImageFrame}>
        <img src={card.image} alt={card.title} className={cardStyles.image} />
      </div>
    </a>
  );
}
