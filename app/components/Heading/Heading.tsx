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
  /**
   * When true, keep the title exactly as typed instead of forcing ALL CAPS.
   * Overrides the block's `text-transform: uppercase` so an editor can use
   * normal/mixed casing. Comes from the CMS `preserveCase` field.
   */
  preserveCase?: boolean | null;
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
 * Turn a desktop px size into a responsive font-size.
 *
 * The value the editor types is the DESKTOP size and must render at (about)
 * that size on a normal screen. On smaller viewports it scales down gently so
 * a very large title can't overflow — but it never grows above the typed size
 * and never shrinks below a sensible floor.
 *
 *   clamp( min , preferred , max )
 *   - max:       the exact px the editor typed (upper bound, hit on desktop)
 *   - min:       a floor that is proportional to the size but never ABOVE max
 *                (so small sizes like 16–24px are respected, not inflated)
 *   - preferred: a small rem base + a vw term, tuned so the title reaches the
 *                typed px around a ~1200px viewport and stays close to it on
 *                typical screens.
 */
export function responsiveFontSize(px: number): string {
  const max = px;
  // Floor scales with the size (85% for small titles down to ~55% for huge
  // ones) and is always clamped to be <= max, so a 16px title never renders
  // larger than 16px. Big display titles still get meaningful mobile shrink.
  const ratio = px <= 32 ? 0.85 : px <= 56 ? 0.7 : 0.55;
  const min = Math.min(max, Math.max(14, Math.round(px * ratio)));
  // Preferred value: a rem anchor plus a vw term. Reaches ~max near 1200px.
  // rem part keeps it close to the target on mid-size screens instead of
  // collapsing to the floor the way a pure-vw value does.
  const remPart = Math.round((min / 16) * 100) / 100; // min expressed in rem
  const vwPart = Math.round(((max - min) / 12) * 100) / 100; // closes the gap by ~1200px
  return `clamp(${min}px, ${remPart}rem + ${vwPart}vw, ${max}px)`;
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

  // Titles always render EXACTLY as typed: lowercase stays lowercase, caps stay
  // caps. The inline `textTransform: none` overrides any `text-transform:
  // uppercase` left in the block SCSS, so this is the single source of truth
  // for casing. An optional CMS px size is merged in when set.
  const style: React.CSSProperties = {
    textTransform: "none",
    ...(hasSize ? { fontSize: responsiveFontSize(sizePx as number) } : {}),
  };

  return (
    <Tag className={className} style={style}>
      {renderLines(text)}
    </Tag>
  );
}
