import React from "react";
import { Check } from "lucide-react";
import styles from "./TextColumns.module.scss";

interface Column {
  /** Server-rendered HTML from the rich-text `richBody` field (preferred). */
  richBodyHtml?: string;
  /** Legacy plain-text body, used only when richBody is empty. */
  body?: string;
  /** Legacy accent line, used only when richBody is empty. */
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
 * Editorial intro with an eyebrow + title, then a row of text columns.
 *
 * Each column's text comes from the rich-text editor (`richBody`, rendered as
 * HTML server-side into `richBodyHtml`) so editors can add paragraph breaks,
 * bold, links, etc. Columns created before the editor existed fall back to the
 * old plain `body` + `highlight` fields, so no existing content is lost.
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
              const hasRich = typeof col.richBodyHtml === "string" && col.richBodyHtml.trim() !== "";
              return (
                <div key={i} className={styles.column}>
                  {hasRich ? (
                    <div
                      className={styles.richText}
                      dangerouslySetInnerHTML={{ __html: col.richBodyHtml as string }}
                    />
                  ) : (
                    <>
                      {col.body && <p className={styles.body}>{col.body}</p>}
                      {col.highlight && (
                        <p className={`${styles.body} ${styles.highlightPara}`}>
                          <span className={styles.highlight}>{col.highlight}</span>
                        </p>
                      )}
                    </>
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
