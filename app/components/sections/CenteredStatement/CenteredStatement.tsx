import React from "react";
import Heading from "@/app/components/Heading/Heading";
import styles from "./CenteredStatement.module.scss";

interface Props {
  content?: {
    title?: string;
    headingLevel?: string;
    titleSizePx?: number;
    preserveCase?: boolean;
    /** Server-rendered HTML from rich-text richBody (preferred). */
    richBodyHtml?: string;
    /** Legacy paragraph array. */
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
  const hasRich = typeof content?.richBodyHtml === "string" && content.richBodyHtml.trim() !== "";
  if (!content?.title && paragraphs.length === 0 && !hasRich) return null;

  const theme = content?.theme === "dark" ? styles.dark : styles.light;

  return (
    <section className={`${styles.section} ${theme}`}>
      <div className={styles.inner}>
        <Heading
          text={content?.title}
          level={content?.headingLevel}
          sizePx={content?.titleSizePx}
          preserveCase={content?.preserveCase}
          className={styles.title}
        />

        {hasRich ? (
          <div
            className={`${styles.body} ${styles.richText}`}
            dangerouslySetInnerHTML={{ __html: content!.richBodyHtml as string }}
          />
        ) : (
          paragraphs.length > 0 && (
            <div className={styles.body}>
              {paragraphs.map((p, i) => (p.text ? <p key={i}>{p.text}</p> : null))}
            </div>
          )
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
