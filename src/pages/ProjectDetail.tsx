import { useEffect, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getProject } from "../data/projects";
import { logoFor } from "../data/stack";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;

  // React Router preserves scroll position across routes; open detail pages at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="mx-auto max-w-[900px] px-6 py-24 text-center">
          <h1 className="mb-3 text-[26px] font-extrabold tracking-tight text-ink">
            Project not found
          </h1>
          <p className="mb-6 text-[17px] text-muted">
            There's no project at this address.
          </p>
          <a
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-[18px] py-2.5 font-mono text-[12.5px] font-semibold text-[#08221D] transition-transform hover:-translate-y-px"
          >
            ← Back to projects
          </a>
        </div>
      </>
    );
  }

  const hasLive = project.liveUrl && project.liveUrl !== "#";

  return (
    <>
      <Navbar />

      <article className="mx-auto max-w-[900px] px-6 pb-20 pt-10">
        <a
          href="/#projects"
          className="inline-flex items-center gap-1.5 font-mono text-[12.5px] text-muted transition-colors hover:text-accent"
        >
          ← back to work
        </a>

        {/* Hero image */}
        <div className="mt-5 overflow-hidden rounded-[10px] border border-border bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
          <img
            src={project.heroImage}
            alt={`${project.title} banner`}
            className="aspect-[2/1] w-full object-cover"
          />
        </div>

        {/* Title + actions */}
        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-[32px] font-extrabold tracking-tight text-ink sm:text-[38px]">
              {project.title}
            </h1>
            <p className="mt-2 max-w-[560px] text-[17px] text-muted">{project.description}</p>
          </div>

          <div className="flex flex-shrink-0 flex-wrap gap-2">
            {hasLive ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-[18px] py-2.5 font-mono text-[12.5px] font-semibold text-[#08221D] transition-transform hover:-translate-y-px"
              >
                Live site ↗
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-md border border-border px-[18px] py-2.5 font-mono text-[12.5px] font-medium text-[#4A5560]">
                Live site coming soon
              </span>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border px-[18px] py-2.5 font-mono text-[12.5px] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
              >
Repo ↗
              </a>
            )}
          </div>
        </div>

        {/* Tech used */}
        <h2 className="mb-3 mt-10 font-mono text-xs uppercase tracking-wide text-muted">
          built with
        </h2>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-border bg-border sm:grid-cols-3">
          {project.tech.map((name) => (
            <div key={name} className="flex items-center gap-3 bg-surface p-4">
              <img
                src={logoFor(name)}
                alt={`${name} logo`}
                className="h-6 w-6 flex-shrink-0 object-contain"
                loading="lazy"
              />
              <span className="font-mono text-[13px] font-semibold text-ink">{name}</span>
            </div>
          ))}
        </div>

        {/* Write-up */}
        <div className="mt-12 border-t border-border pt-10">
          <Readme text={project.readme} />
        </div>
      </article>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Lightweight README renderer                                         */
/* Supports: #/##/### headings, `- ` bullet lists, blank-line          */
/* paragraphs, **bold** and `inline code`.                             */
/* ------------------------------------------------------------------ */

function Readme({ text }: { text: string }) {
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

// Render **bold**, `inline code`, and _italic_ within a line of text.
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|_[^_]+_)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const token = match[0];
    if (token.startsWith("**")) {
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
