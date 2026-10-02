import React from "react";

type Level = "h1" | "h2" | "h3";

interface Props {
  /** Raw title text; "|" becomes a line break. */
  text?: string;
  /** Semantic tag from the CMS (headingLevel). Defaults to h2. */
  level?: Level | string | null;
  /** Desktop size in px from the CMS (titleSizePx). Empty/0 = block default. */
  sizePx?: number | null;
  /** The block's existing title class, so the default look is preserved. */
  className?: string;
}

function renderLines(text: string) {
  const parts = text.split("|");
  return parts.map((line, i) => (
    <React.Fragment key={i}>
      {line.trim()}
      {i < parts.length - 1 && <br />}
    </React.Fragment>
  ));
}

const LEVELS: Record<string, Level> = { h1: "h1", h2: "h2", h3: "h3" };

/**
 * Turn a desktop px size into a responsive font-size. The value the editor
 * types is the DESKTOP size; on smaller screens it scales down via clamp() so
 * a large title can never overflow its container.
 *
 *   clamp( floor , fluid , desktop )
 *   - desktop: the exact px the editor wants (upper bound)
 *   - floor:   ~48% of that, but never below 20px (keeps it readable on phones)
 *   - fluid:   viewport-based value that grows between the two
 */
export function responsiveFontSize(px: number): string {
  const desktop = px;
  const floor = Math.max(20, Math.round(px * 0.48));
  // ~ vw factor chosen so it reaches the desktop size around a 1200px viewport.
  const vw = Math.round((px / 12) * 10) / 10;
  return `clamp(${floor}px, ${vw}vw, ${desktop}px)`;
}

/**
 * Shared section heading. The CMS chooses the semantic tag (H1/H2/H3) and an
 * optional desktop px size. When no size is set the block's own title class
 * controls the look, so existing pages are unchanged.
 */
export default function Heading({ text, level, sizePx, className }: Props) {
  if (!text) return null;

  const Tag = (LEVELS[String(level)] || "h2") as Level;
  const hasSize = typeof sizePx === "number" && sizePx > 0;
  const style = hasSize ? { fontSize: responsiveFontSize(sizePx as number) } : undefined;

  return (
    <Tag className={className} style={style}>
      {renderLines(text)}
    </Tag>
  );
}
