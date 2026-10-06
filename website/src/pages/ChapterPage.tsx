import { Suspense, useEffect, useRef } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router";
import { LevelBadge, TierBadge } from "../components/Badges";
import { ScrollToHash, Toc } from "../components/Toc";
import { getChapterComponent } from "../lib/content";
import {
  chapterFromSlug,
  chapterPath,
  getBookForPart,
  getChapter,
  getPart,
  partPath,
  readingMinutes,
  type Chapter,
} from "../lib/manifest";
import { rememberChapter, useProgress } from "../lib/preferences";
import { NotFound } from "./NotFound";

export function ChapterPage() {
  const { slug } = useParams();
  const { hash } = useLocation();
  const chapter = chapterFromSlug(slug);
  const articleRef = useRef<HTMLElement>(null);
  const { isComplete, toggle } = useProgress();

  useEffect(() => {
    if (chapter) {
      rememberChapter(chapter.num);
      document.title = `${chapter.num}. ${chapter.title} · Typed Interfaces`;
    }
  }, [chapter]);

  if (!chapter) return <NotFound />;
  if (slug !== chapter.folder) return <Navigate replace to={`${chapterPath(chapter)}${hash}`} />;

  const part = getPart(chapter.partId)!;
  const book = getBookForPart(part.id)!;
  const Content = getChapterComponent(chapter);
  const prev = getChapter(chapter.num - 1);
  const next = getChapter(chapter.num + 1);
  const done = isComplete(chapter.num);

  return (
    <div className="page page--with-toc">
      <article className="article" ref={articleRef}>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">{book.title}</Link>
          <span aria-hidden>›</span>
          <Link to={partPath(part)}>
            Part {part.id} — {part.title}
          </Link>
        </nav>

        <header className="chapter-header">
          <p className="chapter-header__eyebrow">Chapter {chapter.num}</p>
          <h1>{chapter.title}</h1>
          <div className="chapter-header__meta">
            <LevelBadge level={chapter.level} />
            <TierBadge tier={chapter.tier} />
            <span className="meta-pill">⏱ ~{readingMinutes(chapter)} min</span>
            <span className="meta-pill">{chapter.sections.length} topics</span>
            {done && <span className="meta-pill meta-pill--done">✓ Completed</span>}
          </div>
        </header>

        <div className="prose" key={chapter.num}>
          {Content ? (
            <Suspense fallback={<p className="loading">Loading chapter…</p>}>
              <Content />
              <ScrollToHash />
            </Suspense>
          ) : (
            <ChapterOutline chapter={chapter} />
          )}
        </div>

        <footer className="chapter-footer">
          <button type="button" className={`complete-button ${done ? "is-done" : ""}`} onClick={() => toggle(chapter.num)}>
            {done ? "✓ Marked as complete (undo)" : "Mark chapter as complete"}
          </button>
          <div className="pager">
            {prev ? (
              <Link className="pager__link" to={chapterPath(prev)}>
                <span>← Previous</span>
                <strong>
                  {prev.num}. {prev.title}
                </strong>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link className="pager__link pager__link--next" to={chapterPath(next)}>
                <span>Next →</span>
                <strong>
                  {next.num}. {next.title}
                </strong>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </footer>
      </article>
      <aside className="page__toc">
        <Toc containerRef={articleRef} />
      </aside>
    </div>
  );
}

/** Shown for chapters whose MDX file hasn't been written yet: the curriculum outline. */
function ChapterOutline({ chapter }: { chapter: Chapter }) {
  return (
    <>
      <blockquote className="callout callout--note">
        <p>
          <strong>This chapter's lesson text is still being written.</strong> Here is its outline from the curriculum.
        </p>
      </blockquote>
      {chapter.opensWith && (
        <blockquote className="callout callout--story">
          <p>📖 <strong>The problem.</strong> {chapter.opensWith.replace(/[`*]/g, "")}</p>
        </blockquote>
      )}
      {chapter.mentalModel && (
        <blockquote className="callout callout--mental">
          <p>🧠 <strong>Mental model.</strong> {chapter.mentalModel.replace(/[`*]/g, "")}</p>
        </blockquote>
      )}
      <ol className="outline">
        {chapter.sections.map((s) => (
          <li key={s.n}>
            <strong>{s.title.replace(/`/g, "")}</strong>
            {s.summary && <span> — {s.summary.replace(/[`*]/g, "")}</span>}
          </li>
        ))}
      </ol>
    </>
  );
}
