import GithubSlugger from "github-slugger";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { designDocs } from "../lib/content";
import { chapterPath, chapters, getPart, partPath, parts, projectPath, projects } from "../lib/manifest";

interface Entry {
  kind: "Chapter" | "Section" | "Part" | "Project" | "Design";
  title: string;
  context: string;
  to: string;
  haystack: string;
}

function buildIndex(): Entry[] {
  const entries: Entry[] = [];
  for (const p of parts) {
    entries.push({ kind: "Part", title: `Part ${p.id} — ${p.title}`, context: p.stage, to: partPath(p), haystack: "" });
  }
  for (const c of chapters) {
    const part = getPart(c.partId)!;
    entries.push({ kind: "Chapter", title: `${c.num}. ${c.title}`, context: `Part ${part.id} · ${c.level}`, to: chapterPath(c), haystack: "" });
    const slugger = new GithubSlugger();
    for (const s of c.sections) {
      const heading = `${c.num}.${s.n} ${s.title}`.replace(/`/g, "");
      entries.push({
        kind: "Section",
        title: heading,
        context: `Ch ${c.num} · ${c.title}`,
        to: `${chapterPath(c)}#${slugger.slug(heading)}`,
        haystack: s.summary,
      });
    }
  }
  for (const pr of projects) entries.push({ kind: "Project", title: `${pr.id} — ${pr.title}`, context: `Part ${pr.partId}`, to: projectPath(pr), haystack: "" });
  for (const d of designDocs) entries.push({ kind: "Design", title: d.title, context: "Curriculum design", to: d.slug === "README" ? "/design" : `/design/${d.slug}`, haystack: "" });
  for (const e of entries) e.haystack = `${e.title} ${e.context} ${e.haystack}`.toLowerCase();
  return entries;
}

const KIND_RANK: Record<Entry["kind"], number> = { Chapter: 0, Part: 1, Project: 2, Section: 3, Design: 4 };

export function Search() {
  const index = useMemo(buildIndex, []);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return [];
    return index
      .filter((e) => terms.every((t) => e.haystack.includes(t)))
      .map((e) => ({ e, score: (e.title.toLowerCase().includes(terms.join(" ")) ? 0 : 10) + KIND_RANK[e.kind] }))
      .sort((a, b) => a.score - b.score)
      .slice(0, 12)
      .map((r) => r.e);
  }, [index, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && /^(INPUT|TEXTAREA)$/.test(e.target.tagName);
      if ((e.key === "/" && !typing) || (e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey))) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (entry: Entry | undefined) => {
    if (!entry) return;
    navigate(entry.to);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div className="search" role="search">
      <input
        ref={inputRef}
        type="search"
        className="search__input"
        placeholder="Search chapters, topics, projects…  ( / )"
        aria-label="Search the book"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, results.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, 0));
          } else if (e.key === "Enter") {
            go(results[activeIndex]);
          } else if (e.key === "Escape") {
            setQuery("");
            inputRef.current?.blur();
          }
        }}
      />
      {open && query && (
        <ul className="search__results" role="listbox">
          {results.length === 0 && <li className="search__empty">No matches for "{query}"</li>}
          {results.map((r, i) => (
            <li key={`${r.kind}-${r.to}`} role="option" aria-selected={i === activeIndex}>
              <button
                type="button"
                className={i === activeIndex ? "is-active" : undefined}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => go(r)}
              >
                <span className={`search__kind search__kind--${r.kind.toLowerCase()}`}>{r.kind}</span>
                <span className="search__title">{r.title}</span>
                <span className="search__context">{r.context}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
