import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Lightweight README renderer                                         */
/* Supports: #/##/### headings, `- ` bullet lists, blank-line          */
/* paragraphs, **bold**, _italic_, `inline code` and [links](url).     */
/* ------------------------------------------------------------------ */

export default function Readme({ text }: { text: string }) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];
  let paragraph: string[] = [];
  let key = 0;

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(
        <p key={key++} className="mb-4 text-[17px] leading-relaxed text-muted">
          {renderInline(paragraph.join(" "))}
        </p>
      );
      paragraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length) {
      blocks.push(
        <ul key={key++} className="mb-4 space-y-1.5 pl-1">
          {listItems.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[17px] leading-relaxed text-muted">
              <span className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (line.trim() === "") {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      const content = renderInline(heading[2]);
      if (level === 1) {
        blocks.push(
          <h2 key={key++} className="mb-4 text-[24px] font-extrabold tracking-tight text-ink">
            {content}
          </h2>
        );
      } else if (level === 2) {
        blocks.push(
          <h3 key={key++} className="mb-3 mt-8 text-[18px] font-bold tracking-tight text-ink">
            {content}
          </h3>
        );
      } else {
        blocks.push(
          <h4 key={key++} className="mb-2 mt-6 font-mono text-[13px] uppercase tracking-wide text-accent">
            {content}
          </h4>
        );
      }
      continue;
    }

    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    if (bullet) {
      flushParagraph();
      listItems.push(bullet[1]);
      continue;
    }

    flushList();
    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();

  return <>{blocks}</>;
}

// Render [links](url), **bold**, `inline code`, and _italic_ within a line of text.
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`|_[^_]+_)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const token = match[0];
    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      nodes.push(
        <a
          key={key++}
          href={link[2]}
          target="_blank"
          rel="noreferrer"
          className="text-accent underline-offset-2 hover:underline"
        >
          {link[1]}
        </a>
      );
    } else if (token.startsWith("**")) {
      nodes.push(
        <strong key={key++} className="font-semibold text-ink">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("`")) {
      nodes.push(
        <code key={key++} className="rounded bg-surface2 px-1.5 py-0.5 font-mono text-[13px] text-accent">
          {token.slice(1, -1)}
        </code>
      );
    } else {
      nodes.push(
        <em key={key++} className="italic">
          {token.slice(1, -1)}
        </em>
      );
    }
    last = match.index + token.length;
  }

  if (last < text.length) {
    nodes.push(text.slice(last));
  }
  return nodes;
}
