import React from "react";
import { ArrowRight } from "lucide-react";
import styles from "./Hoogwerker.module.scss";

export default function HoogwerkerOtherMarkets() {
  const markets = ["POMPVERHUUR", "CONTAINERVERHUUR", "MATERIEELVERHUUR", "SPECIALISTISCHE VERHUUR"];

  return (
    <section className={styles.otherMarketsSection}>
      <div className={styles.otherMarketsInner}>
        <div className={styles.otherMarketsLeft}>
          <span className={styles.sectionLabelMuted}>OOK ACTIEF IN.</span>
          <h2 className={styles.sectionTitle}>
            ANDERE VERHUURMARKT?<br />ZELFDE PRINCIPES.
          </h2>
        </div>

        <div className={styles.otherMarketsList}>
          {markets.map((market) => (
            <a
              key={market}
              href="#"
              onClick={(e) => e.preventDefault()}
              className={styles.marketItem}
            >
              <span className={styles.marketName}>{market}</span>
              <ArrowRight className={styles.marketArrow} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
