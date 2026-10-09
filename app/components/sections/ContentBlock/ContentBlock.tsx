import React from "react";
import Heading from "@/app/components/Heading/Heading";
import styles from "./ContentBlock.module.scss";

interface Props {
  content?: {
    eyebrow?: string;
    title?: string;
    headingLevel?: string;
    titleSizePx?: number;
    preserveCase?: boolean;
    /** Server-rendered HTML from the rich-text richBody (done in lib/payload.ts). */
    richBodyHtml?: string;
    align?: "left" | "center";
    theme?: "light" | "dark";
  };
}

/**
 * "Contentblok zonder foto" — a reusable text section. Optional eyebrow + title
 * (with heading-level/size controls) and an optional rich-text body (H2/H3,
 * bold, links, lists). Everything is optional, so it adapts to short or long copy.
 */
export default function ContentBlock({ content }: Props) {
  const eyebrow = content?.eyebrow?.trim();
  const title = content?.title?.trim();
  const bodyHtml = content?.richBodyHtml?.trim();

  // Nothing to show → render nothing (never leave an empty gap).
  if (!eyebrow && !title && !bodyHtml) return null;

  const theme = content?.theme === "dark" ? styles.dark : styles.light;
  const align = content?.align === "center" ? styles.center : styles.left;

  return (
    <section className={`${styles.section} ${theme} ${align}`}>
      <div className={styles.inner}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        {title && (
          <Heading
            text={title}
            level={content?.headingLevel}
            sizePx={content?.titleSizePx}
            preserveCase={content?.preserveCase}
            className={styles.title}
          />
        )}
        {bodyHtml && (
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        )}
      </div>
    </section>
  );
}
