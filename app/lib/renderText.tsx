import React from "react";

/**
 * Splits a string on "|" and renders each part on its own line with <br />.
 * Used for CMS title fields where editors use | for line breaks.
 */
export function withLineBreaks(text: string): React.ReactNode {
  const parts = text.split("|");
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {part.trim()}
      {i < parts.length - 1 && <br />}
    </React.Fragment>
  ));
}
