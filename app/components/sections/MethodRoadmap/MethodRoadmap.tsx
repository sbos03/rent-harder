import React from "react";
import Image from "next/image";
import styles from "./MethodRoadmap.module.scss";
import { withLineBreaks } from "@/app/lib/renderText";

const defaultSteps = [
  { num: "01", title: "WAAR WIL JE NAARTOE?", desc: "We brengen jouw ambities, assortiment, werkwijze en kansen in kaart. We beginnen niet met techniek, maar met waar jij naartoe wilt.", side: "right" },
  { num: "02", title: "WE MAKEN EEN PLAN.", desc: "We vertalen jouw doelen naar een praktische digitale route. Realistisch waar nodig. Ambitieus waar het kan. Geen dikke rapporten, wel een concreet groeiplan.", side: "left" },
  { num: "03", title: "WE BOUWEN JE FUNDAMENT.", desc: "Geen standaard website die over twee jaar weer vervangen moet worden. We bouwen een snel, veilig en schaalbaar digitaal fundament dat kan meegroeien met jouw verhuurbedrijf.", side: "right" },
  { num: "04", title: "WE DIGITALISEREN JE VERHUUR.", desc: "Aanvragen, planning, klanten, content en vindbaarheid worden één logisch geheel. Minder gedoe. Meer overzicht.", side: "left" },
  { num: "05", title: "WE LATEN JE GROEIEN.", desc: "Een platform alleen brengt geen verhuur. We blijven werken aan zichtbaarheid, content, vindbaarheid en commerciële kansen.", side: "right" },
  { num: "06", title: "WE BLIJVEN MEEDENKEN.", desc: "Geen project opleveren en verdwijnen. Rent Harder blijft je digitale sidekick. We kijken mee, verbeteren wat beter kan en zien nieuwe kansen voordat ze blijven liggen.", side: "left" },
];

interface Props {
  content?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    steps?: { num?: string; title?: string; description?: string; side?: string }[];
  };
}

export default function MethodRoadmap({ content }: Props) {
  const eyebrow = content?.eyebrow || "DE RENT HARDER METHODE.";
  const title = content?.title || "VAN AMBITIE|NAAR HARDER VERHUREN.";
  const description =
    content?.description ||
    "Geen dikke rapporten of vage trajecten. Met de Rent Harder Methode bouwen we stap voor stap aan een verhuurbedrijf dat beter zichtbaar is, slimmer werkt en sterker groeit.";
  const steps =
    content?.steps && content.steps.length > 0
      ? content.steps.map((st) => ({
          num: st.num || "",
          title: st.title || "",
          desc: st.description || "",
          side: st.side || "right",
        }))
      : defaultSteps;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Intro */}
        <div className={styles.intro}>
          <div className={styles.eyebrow}>
            <Image
              src="/images/Rent_Harder_beeldmerk.svg"
              alt=""
              width={24}
              height={24}
              className={styles.eyebrowIcon}
            />
            <span>{eyebrow}</span>
          </div>
          <h2 className={styles.title}>{withLineBreaks(title)}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          <div className={styles.line} />

          {steps.map((step) => (
            <div
              key={step.num}
              className={`${styles.step} ${step.side === 'left' ? styles.stepLeft : styles.stepRight}`}
            >
              <div className={styles.dot} />
              <div className={styles.stepCard}>
                <span className={styles.stepNum}>{step.num}.</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
