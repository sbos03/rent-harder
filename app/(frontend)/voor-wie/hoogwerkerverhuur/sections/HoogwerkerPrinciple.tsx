import React from "react";
import styles from "./Hoogwerker.module.scss";

interface Props {
  content?: {
    label?: string;
    title?: string;
    description?: string;
    steps?: { num?: string; title?: string; description?: string }[];
  };
}

export default function HoogwerkerPrinciple({ content }: Props) {
  const label = content?.label || "HET PRINCIPE IS OVERAL HETZELFDE.";
  const title = content?.title || "DIT WERKT NIET ALLEEN|IN OOST-GRONINGEN.";
  const description =
    content?.description ||
    "Je hoeft niet de grootste verhuurder van Nederland te zijn. Je moet digitaal de logischste keuze worden binnen jouw regio, assortiment en doelgroep.";
  const steps =
    content?.steps && content.steps.length > 0
      ? content.steps.map((s) => ({ num: s.num || "", title: s.title || "", desc: s.description || "" }))
      : [
          { num: "1", title: "REGIO.", desc: "Waar wil je daadwerkelijk opdrachten winnen?" },
          { num: "2", title: "ASSORTIMENT.", desc: "Welke hoogwerkers en machines wil je vaker verhuren?" },
          { num: "3", title: "KLANT.", desc: "Wie zoekt ze, wanneer en met welke informatiebehoefte?" },
        ];

  return (
    <section className={styles.principleSection}>
      <div className={styles.principleInner}>
        <span className={styles.sectionLabel}>{label}</span>
        <h2 className={styles.sectionTitle}>
          {title.split("|").map((line, i, arr) => (
            <React.Fragment key={i}>
              {line.trim()}
              {i < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h2>
        <p className={styles.sectionDesc}>{description}</p>

        <div className={styles.principleSteps}>
          {steps.map((step, i) => (
            <div key={i} className={styles.principleStep}>
              <div className={styles.principleNum}>{step.num}</div>
              <h3 className={styles.principleStepTitle}>{step.title}</h3>
              <p className={styles.principleStepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
