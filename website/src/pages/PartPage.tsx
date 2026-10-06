import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router";
import { LevelBadge, TierBadge } from "../components/Badges";
import { Markdown } from "../components/Markdown";
import { InlineMarkdown } from "../components/InlineMarkdown";
import { partIntros } from "../content/part-intros";
import { Toc } from "../components/Toc";
import { chapterPath, getBookForPart, getPart, partPath, parts, projectPath, projectsForPart, readingMinutes } from "../lib/manifest";
import { useProgress } from "../lib/preferences";
import { NotFound } from "./NotFound";

export function PartPage() {
  const { partId } = useParams();
  const part = getPart(partId);
  const { isComplete } = useProgress();
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (part) document.title = `Part ${part.id}: ${part.title} · Typed Interfaces`;
  }, [part]);

  if (!part) return <NotFound />;
  const book = getBookForPart(part.id)!;
  const index = parts.indexOf(part);
  const prev = parts[index - 1];
  const next = parts[index + 1];
  const done = part.chapters.filter((c) => isComplete(c.num)).length;
  const partProjects = projectsForPart(part.id);

  return (
    <div className="page page--with-toc">
      <article className="article" ref={articleRef}>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">{book.title} · {book.subtitle}</Link>
        </nav>
        <header className="chapter-header">
          <p className="chapter-header__eyebrow">
            Part {part.id} {part.milestone && <span title="Major milestone">⭐ Major milestone</span>}
          </p>
          <h1>{part.title}</h1>
          <div className="chapter-header__meta">
            <span className="meta-pill">🧭 {part.stage}</span>
            <span className="meta-pill">Difficulty {part.difficulty}</span>
            <span className="meta-pill">
              {done}/{part.chapters.length} chapters complete
            </span>
          </div>
          <div className="progress" aria-hidden>
            <span style={{ width: `${(done / part.chapters.length) * 100}%` }} />
          </div>
        </header>

        <p className="lead">
          <InlineMarkdown source={partIntros[part.id] ?? part.purpose} />
        </p>

        <h2 id="chapters">Chapters</h2>
        <ol className="chapter-cards">
          {part.chapters.map((c) => (
            <li key={c.num} className={`chapter-card ${isComplete(c.num) ? "is-done" : ""}`}>
              <Link to={chapterPath(c)} className="chapter-card__link">
                <span className="chapter-card__num">{c.num}</span>
                <span className="chapter-card__body">
                  <span className="chapter-card__title">
                    {c.title} {isComplete(c.num) && <span className="sidebar__check">✓</span>}
                  </span>
                  <span className="chapter-card__meta">
                    <LevelBadge level={c.level} />
                    <TierBadge tier={c.tier} />
                    <span className="meta-pill">⏱ ~{readingMinutes(c)} min</span>
                  </span>
                  <span className="chapter-card__topics">
                    {c.sections.map((s) => (
                      <span key={s.n} className="topic-chip">
                        {c.num}.{s.n} {s.title.replace(/`/g, "")}
                      </span>
                    ))}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        {partProjects.length > 0 && (
          <>
            <h2 id="projects">Projects in this part</h2>
            <ul className="project-list">
              {partProjects.map((p) => (
                <li key={p.id}>
                  <Link to={projectPath(p)}>
                    <strong>{p.id}</strong> {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        <h2 id="checkpoint">✅ Checkpoint{part.checkpoint.title ? `: ${part.checkpoint.title}` : ""}</h2>
        <div className="prose checkpoint">
          <Markdown source={part.checkpoint.body} />
        </div>

        <div className="pager">
          {prev ? (
            <Link className="pager__link" to={partPath(prev)}>
              <span>← Previous part</span>
              <strong>Part {prev.id} — {prev.title}</strong>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link className="pager__link pager__link--next" to={partPath(next)}>
              <span>Next part →</span>
              <strong>Part {next.id} — {next.title}</strong>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </article>
      <aside className="page__toc">
        <Toc containerRef={articleRef} />
      </aside>
    </div>
  );
}
