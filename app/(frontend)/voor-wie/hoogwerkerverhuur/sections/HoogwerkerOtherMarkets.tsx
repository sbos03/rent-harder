import React from "react";
import { ArrowRight } from "lucide-react";
import styles from "./Hoogwerker.module.scss";
import { normalizeInternalHref } from "@/app/lib/href";

interface Props {
  content?: {
    label?: string;
    title?: string;
    markets?: { name?: string; href?: string }[];
  };
}

export default function HoogwerkerOtherMarkets({ content }: Props) {
  const label = content?.label || "OOK ACTIEF IN.";
  const title = content?.title || "ANDERE VERHUURMARKT?|ZELFDE PRINCIPES.";
  const markets =
    content?.markets && content.markets.length > 0
      ? content.markets.map((m) => ({ name: m.name || "", href: m.href || "#" }))
      : [
          { name: "POMPVERHUUR", href: "#" },
          { name: "CONTAINERVERHUUR", href: "#" },
          { name: "MATERIEELVERHUUR", href: "#" },
          { name: "SPECIALISTISCHE VERHUUR", href: "#" },
        ];

  return (
    <section className={styles.otherMarketsSection}>
      <div className={styles.otherMarketsInner}>
        <div className={styles.otherMarketsLeft}>
          <span className={styles.sectionLabelMuted}>{label}</span>
          <h2 className={styles.sectionTitle}>
            {title.split("|").map((line, i, arr) => (
              <React.Fragment key={i}>
                {line.trim()}
                {i < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
        </div>

        <div className={styles.otherMarketsList}>
          {markets.map((market) => (
            <a
              key={market.name}
              href={normalizeInternalHref(market.href) || "#"}
              onClick={(e) => {
                if (!market.href || market.href === "#") e.preventDefault();
              }}
              className={styles.marketItem}
            >
              <span className={styles.marketName}>{market.name}</span>
              <ArrowRight className={styles.marketArrow} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
