import type { ReactNode } from "react";

/** Renders one line of Markdown (`code`, **bold**, *italic*) without pulling in a full Markdown parser. */
export function InlineMarkdown({ source }: { source: string }) {
  const nodes: ReactNode[] = [];
  source.split(/(`[^`]+`)/g).forEach((chunk, i) => {
    if (chunk.startsWith("`") && chunk.endsWith("`") && chunk.length > 1) {
      nodes.push(<code key={i}>{chunk.slice(1, -1)}</code>);
      return;
    }
    chunk.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).forEach((piece, j) => {
      const key = `${i}-${j}`;
      if (piece.startsWith("**") && piece.endsWith("**")) nodes.push(<strong key={key}>{piece.slice(2, -2)}</strong>);
      else if (piece.startsWith("*") && piece.endsWith("*") && piece.length > 2) nodes.push(<em key={key}>{piece.slice(1, -1)}</em>);
      else if (piece) nodes.push(piece);
    });
  });
  return <>{nodes}</>;
}
