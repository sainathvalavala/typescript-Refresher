import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { books, chapterFromSlug, chapterPath, getPart, partPath } from "../lib/manifest";
import { useProgress } from "../lib/preferences";
import { LevelDot } from "./Badges";

function currentPartId(pathname: string): string | undefined {
  const chapterMatch = pathname.match(/^\/chapter\/([^/]+)/);
  if (chapterMatch) return chapterFromSlug(chapterMatch[1])?.partId;
  const partMatch = pathname.match(/^\/part\/([^/]+)/);
  if (partMatch) return getPart(partMatch[1])?.id;
  return undefined;
}

export function Sidebar({ onNavigate }: { onNavigate: () => void }) {
  const { pathname } = useLocation();
  const { isComplete } = useProgress();
  const activePart = currentPartId(pathname);
  const [open, setOpen] = useState<Set<string>>(() => new Set(activePart ? [activePart] : ["I"]));

  // Expand the part you navigate into (without collapsing the ones you opened yourself).
  useEffect(() => {
    if (activePart) setOpen((prev) => (prev.has(activePart) ? prev : new Set(prev).add(activePart)));
  }, [activePart]);

  const togglePart = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <nav className="sidebar" aria-label="Book contents">
      <ul className="sidebar__top">
        <li><NavLink to="/" end onClick={onNavigate}>🏠 Home</NavLink></li>
        <li><NavLink to="/projects" onClick={onNavigate}>🛠 Projects</NavLink></li>
        <li><NavLink to="/design" onClick={onNavigate}>🧭 Curriculum design</NavLink></li>
      </ul>

      {books.map((book) => (
        <section key={book.id} className="sidebar__book">
          <p className="sidebar__book-title">
            {book.title}
            <span>{book.subtitle}</span>
          </p>
          <ul>
            {book.parts.map((partId) => {
              const part = getPart(partId)!;
              const expanded = open.has(part.id);
              const done = part.chapters.filter((c) => isComplete(c.num)).length;
              return (
                <li key={part.id} className="sidebar__part">
                  <div className="sidebar__part-row">
                    <button
                      type="button"
                      className="sidebar__toggle"
                      aria-expanded={expanded}
                      aria-label={`${expanded ? "Collapse" : "Expand"} Part ${part.id}`}
                      onClick={() => togglePart(part.id)}
                    >
                      <span aria-hidden>{expanded ? "▾" : "▸"}</span>
                    </button>
                    <NavLink to={partPath(part)} onClick={onNavigate} className="sidebar__part-link">
                      <span className="sidebar__part-id">{part.id}</span>
                      <span className="sidebar__part-title">{part.title}</span>
                      {done > 0 && (
                        <span className="sidebar__count" title={`${done} of ${part.chapters.length} chapters complete`}>
                          {done}/{part.chapters.length}
                        </span>
                      )}
                    </NavLink>
                  </div>
                  {expanded && (
                    <ul className="sidebar__chapters">
                      {part.chapters.map((c) => (
                        <li key={c.num}>
                          <NavLink to={chapterPath(c)} onClick={onNavigate}>
                            <LevelDot level={c.level} />
                            <span className="sidebar__num">{c.num}</span>
                            <span className="sidebar__chapter-title">{c.title}</span>
                            {isComplete(c.num) && <span className="sidebar__check" aria-label="completed">✓</span>}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </nav>
  );
}

