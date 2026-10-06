import { useEffect } from "react";
import { Link } from "react-router";
import { LevelDot } from "../components/Badges";
import { hasChapterContent } from "../lib/content";
import { books, chapterPath, chapters, getChapter, getPart, partPath, projects } from "../lib/manifest";
import { useLastChapter, useProgress } from "../lib/preferences";

const LOOP = [
  ["Feel the problem", "Every chapter opens with code that breaks, repeats, or lies."],
  ["Build a mental model", "One picture that predicts behavior, before any syntax."],
  ["See examples", "Tiny → realistic → production-style code for every topic."],
  ["Practice", "Four levels of exercises: recall, application, challenge, real-world."],
  ["Build something", "A project in every part, plus three capstone tracks."],
];

export function HomePage() {
  const { completed } = useProgress();
  const lastNum = useLastChapter();
  const last = lastNum ? getChapter(lastNum) : undefined;
  const firstChapter = chapters[0]!;
  const written = chapters.filter(hasChapterContent).length;
  const pct = Math.round((completed.length / chapters.length) * 100);

  useEffect(() => {
    document.title = "Typed Interfaces: TypeScript + React, from why to professional";
  }, []);

  return (
    <div className="page home">
      <section className="hero">
        <p className="hero__eyebrow">A book-style learning journey</p>
        <h1>
          Typed Interfaces
          <span>From “Why TypeScript?” to professional TypeScript + React</span>
        </h1>
        <p className="hero__lead">
          A JavaScript developer's path to designing, building, testing, and shipping production TypeScript + React
          applications, and understanding <em>why</em> every tool and pattern exists.
        </p>
        <div className="hero__actions">
          <Link className="button button--primary" to={chapterPath(last ?? firstChapter)}>
            {last ? `Continue: Chapter ${last.num}` : "Start reading: Chapter 1"}
          </Link>
          <Link className="button" to="/design/04-learning-roadmap">See the roadmap</Link>
        </div>
        <dl className="stats">
          <div><dt>Parts</dt><dd>16</dd></div>
          <div><dt>Chapters</dt><dd>{chapters.length}</dd></div>
          <div><dt>Topics</dt><dd>{chapters.reduce((n, c) => n + c.sections.length, 0)}</dd></div>
          <div><dt>Projects</dt><dd>{projects.length}</dd></div>
        </dl>
        {completed.length > 0 && (
          <div className="home-progress">
            <div className="progress" aria-hidden><span style={{ width: `${pct}%` }} /></div>
            <p>{completed.length} of {chapters.length} chapters complete ({pct}%)</p>
          </div>
        )}
        {written < chapters.length && (
          <p className="hero__note">{written} of {chapters.length} chapters have full lesson text; the rest show their outline.</p>
        )}
      </section>

      <section className="loop" aria-labelledby="how">
        <h2 id="how">How every chapter teaches</h2>
        <ol>
          {LOOP.map(([title, text]) => (
            <li key={title}>
              <strong>{title}</strong>
              <span>{text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="books">
        <h2 id="books">The three Books</h2>
        <div className="books">
          {books.map((book) => (
            <article key={book.id} className="book-card">
              <header>
                <p className="book-card__title">{book.title}</p>
                <h3>{book.subtitle}</h3>
                <p className="book-card__tagline">“{book.tagline}”</p>
              </header>
              <ul>
                {book.parts.map((id) => {
                  const part = getPart(id)!;
                  const done = part.chapters.filter((c) => completed.includes(c.num)).length;
                  const first = part.chapters[0]!;
                  const lastCh = part.chapters.at(-1)!;
                  return (
                    <li key={id}>
                      <Link to={partPath(part)}>
                        <span className="book-card__part-id">{part.id}</span>
                        <span className="book-card__part-title">
                          {part.title}
                          <small>
                            Ch {first.num}–{lastCh.num}
                            {done > 0 ? ` · ${done}/${part.chapters.length} done` : ""}
                          </small>
                        </span>
                        <span className="book-card__dots" aria-hidden>
                          {part.chapters.map((c) => (
                            <LevelDot key={c.num} level={c.level} />
                          ))}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="legend" aria-labelledby="legend">
        <h2 id="legend">Reading the badges</h2>
        <p>
          <LevelDot level="Beginner" /> Beginner &nbsp; <LevelDot level="Intermediate" /> Intermediate &nbsp;
          <LevelDot level="Advanced" /> Advanced &nbsp; <LevelDot level="Expert" /> Expert
        </p>
        <p>
          <strong>Essential</strong>: every TypeScript + React developer should know it. <strong>Advanced</strong>:
          for experienced developers and larger apps. <strong>Specialist</strong>: for library and framework authors,
          and safe to postpone. Books One and Two together are the Essential core.
        </p>
      </section>
    </div>
  );
}
