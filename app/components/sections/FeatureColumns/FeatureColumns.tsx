import React from "react";
import styles from "./FeatureColumns.module.scss";

interface Column {
  title?: string;
  description?: string;
}

interface Props {
  content?: {
    title?: string;
    subtitle?: string;
    theme?: "light" | "dark";
    columns?: Column[];
  };
}

/** Split a "|"-delimited string into <br />-separated lines. */
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
 * "Waar blijft nog verhuur liggen?" — a title + subtitle followed by a row of
 * equal columns, each a bold title and a description, separated by thin rules.
 */
export default function FeatureColumns({ content }: Props) {
  const columns = content?.columns ?? [];
  if (!content?.title && columns.length === 0) return null;

  const theme = content?.theme === "dark" ? styles.dark : styles.light;

  return (
    <section className={`${styles.section} ${theme}`}>
      <div className={styles.inner}>
        {content?.title && <h2 className={styles.title}>{lines(content.title)}</h2>}
        {content?.subtitle && <p className={styles.subtitle}>{content.subtitle}</p>}

        {columns.length > 0 && (
          <div className={styles.columns}>
            {columns.map((col, i) => (
              <div key={i} className={styles.column}>
                {col.title && <h3 className={styles.columnTitle}>{lines(col.title)}</h3>}
                {col.description && (
                  <p className={styles.columnDesc}>{col.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
