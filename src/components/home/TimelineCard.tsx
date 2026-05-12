import type { TimelineItem } from "@/data/home";
import cardStyles from "./CardGrid.module.css";

export function TimelineCard({ item }: { item: TimelineItem }) {
  return (
    <a href={item.href} className={cardStyles.timelineCard}>
      <div className={cardStyles.timelineImageFrame}>
        <img src={item.image} alt={item.title} className={cardStyles.image} />
        <div className={cardStyles.timelineOverlay}>
          <div className={cardStyles.timelineCaptionBox}>
            {(item.homeCaptionLines ?? []).map((line) => (
              <p key={line} className={cardStyles.timelineCaptionLine}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}
