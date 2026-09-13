import React from "react";
import { Check } from "lucide-react";
import styles from "./TextColumns.module.scss";

interface Column {
  body?: string;
  highlight?: string;
  bullets?: { text?: string }[];
}

interface Props {
  content?: {
    eyebrow?: string;
    title?: string;
    theme?: "light" | "dark";
    columns?: Column[];
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
 * Editorial intro with an eyebrow + title, then a row of text columns. Each
 * column has an optional body paragraph, an optional accent-coloured highlight
 * line, and a list of checkmark bullets.
 */
export default function TextColumns({ content }: Props) {
  const columns = content?.columns ?? [];
  if (columns.length === 0 && !content?.title) return null;

  const theme = content?.theme === "dark" ? styles.dark : styles.light;

  return (
    <section className={`${styles.section} ${theme}`}>
      <div className={styles.inner}>
        {content?.eyebrow && <span className={styles.eyebrow}>{content.eyebrow}</span>}
        {content?.title && <h2 className={styles.title}>{lines(content.title)}</h2>}

        {columns.length > 0 && (
          <div className={styles.columns}>
            {columns.map((col, i) => {
              const bullets = col.bullets ?? [];
              return (
                <div key={i} className={styles.column}>
                  {col.body && (
                    <p className={styles.body}>
                      {col.body}
                      {col.highlight && (
                        <span className={styles.highlight}> {col.highlight}</span>
                      )}
                    </p>
                  )}
                  {!col.body && col.highlight && (
                    <p className={styles.body}>
                      <span className={styles.highlight}>{col.highlight}</span>
                    </p>
                  )}
                  {bullets.length > 0 && (
                    <ul className={styles.bullets}>
                      {bullets.map((b, j) =>
                        b.text ? (
                          <li key={j} className={styles.bullet}>
                            <Check className={styles.check} aria-hidden="true" />
                            <span>{b.text}</span>
                          </li>
                        ) : null
                      )}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
