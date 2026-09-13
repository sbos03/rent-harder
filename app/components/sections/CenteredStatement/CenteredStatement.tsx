import React from "react";
import styles from "./CenteredStatement.module.scss";

interface Props {
  content?: {
    title?: string;
    paragraphs?: { text?: string }[];
    highlightText?: string;
    theme?: "light" | "dark";
  };
}

function lines(text?: string) {
  if (!text) return null;
  const parts = text.split("|");
  return parts.map((line, i) => (
    <React.Fragment key={i}>
      {line.trim()}
      {i < parts.length - 1 && <br />}
    </React.Fragment>
  ));
}

/**
 * "Niet de grootste vloot. Wel de logischste keuze." — a centered heading,
 * body paragraphs, and an optional dark highlight bar underneath.
 */
export default function CenteredStatement({ content }: Props) {
  const paragraphs = content?.paragraphs ?? [];
  if (!content?.title && paragraphs.length === 0) return null;

  const theme = content?.theme === "dark" ? styles.dark : styles.light;

  return (
    <section className={`${styles.section} ${theme}`}>
      <div className={styles.inner}>
        {content?.title && <h2 className={styles.title}>{lines(content.title)}</h2>}

        {paragraphs.length > 0 && (
          <div className={styles.body}>
            {paragraphs.map((p, i) =>
              p.text ? <p key={i}>{p.text}</p> : null
            )}
          </div>
        )}

        {content?.highlightText && (
          <div className={styles.highlight}>
            <p className={styles.highlightText}>{lines(content.highlightText)}</p>
          </div>
        )}
      </div>
    </section>
  );
}
