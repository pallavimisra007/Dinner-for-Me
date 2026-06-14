import Link from "next/link";
import React from "react";

/**
 * Parses [[display text|/url/]] markers in recipe strings and returns
 * a mix of plain text and Next.js Link elements.
 */
export function renderText(text: string): React.ReactNode {
  const parts = text.split(/\[\[(.+?)\|(.+?)\]\]/);
  if (parts.length === 1) return text;

  const nodes: React.ReactNode[] = [];
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) nodes.push(parts[i]);
    if (i + 1 < parts.length) {
      nodes.push(
        <Link key={i} href={parts[i + 2]} className="inline-link">
          {parts[i + 1]}
        </Link>
      );
    }
  }
  return nodes;
}
