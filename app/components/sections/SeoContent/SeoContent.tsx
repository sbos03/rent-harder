import React from "react";
import styles from "./SeoContent.module.scss";

interface Article {
  title?: string;
  /** Pre-rendered HTML from the Lexical richText body (done server-side). */
  bodyHtml?: string;
}

interface Props {
  content?: {
    articles?: Article[];
  };
}

/**
 * Renders the "SEO Content" CMS block: a list of articles, each with a title
 * and richText body. The body is converted to HTML server-side in
 * lib/payload.ts (renderRichTextSections), so here we only display it.
 */
export default function SeoContent({ content }: Props) {
  const articles = content?.articles ?? [];
  if (articles.length === 0) return null;

  return (
    <section className={styles.seoSection}>
      <div className={styles.seoInner}>
        {articles.map((article, i) => (
          <article key={i} className={styles.article}>
            {article.title && (
              <h2 className={styles.seoTitle}>{article.title}</h2>
            )}
            {article.bodyHtml && (
              <div
                className={styles.seoBody}
                dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
              />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
