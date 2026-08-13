import React from "react";
import styles from "./Hoogwerker.module.scss";

export default function HoogwerkerPrinciple() {
  const steps = [
    { num: "1", title: "REGIO.", desc: "Waar wil je daadwerkelijk opdrachten winnen?" },
    { num: "2", title: "ASSORTIMENT.", desc: "Welke hoogwerkers en machines wil je vaker verhuren?" },
    { num: "3", title: "KLANT.", desc: "Wie zoekt ze, wanneer en met welke informatiebehoefte?" },
  ];

  return (
    <section className={styles.principleSection}>
      <div className={styles.principleInner}>
        <span className={styles.sectionLabel}>HET PRINCIPE IS OVERAL HETZELFDE.</span>
        <h2 className={styles.sectionTitle}>
          DIT WERKT NIET ALLEEN<br />IN OOST-GRONINGEN.
        </h2>
        <p className={styles.sectionDesc}>
          Je hoeft niet de grootste verhuurder van Nederland te zijn. Je moet
          digitaal de logischste keuze worden binnen jouw regio, assortiment en
          doelgroep.
        </p>

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
