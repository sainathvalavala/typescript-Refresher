import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { Markdown } from "../components/Markdown";
import { ScrollToHash, Toc } from "../components/Toc";
import { designDocs, getDesignDoc } from "../lib/content";
import { NotFound } from "./NotFound";

/** The curriculum design documents (../curriculum/*.md), rendered as pages. */
export function DesignPage() {
  const { slug } = useParams();
  const doc = getDesignDoc(slug);
  const [source, setSource] = useState<string | null>(null);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!doc) return;
    let cancelled = false;
    setSource(null);
    document.title = `${doc.title} · Curriculum design · Typed Interfaces`;
    doc.load().then((text) => {
      // Drop the documents' own "Previous / Next" footers; the site provides navigation.
      if (!cancelled) setSource(text.replace(/\n---\n\*\*(Previous|Next|Back to)[^\n]*\n?$/m, "\n"));
    });
    return () => {
      cancelled = true;
    };
  }, [doc]);

  if (!doc) return <NotFound />;
  const index = designDocs.indexOf(doc);
  const prev = designDocs[index - 1];
  const next = designDocs[index + 1];
  const href = (d: (typeof designDocs)[number]) => (d.slug === "README" ? "/design" : `/design/${d.slug}`);

  return (
    <div className="page page--with-toc">
      <article className="article" ref={articleRef}>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/design">Curriculum design</Link>
        </nav>
        <nav className="design-tabs" aria-label="Design documents">
          {designDocs.map((d) => (
            <Link key={d.slug} to={href(d)} className={d === doc ? "is-active" : undefined}>
              {d.slug === "README" ? "Overview" : d.title.split(". ")[0]}
            </Link>
          ))}
        </nav>
        <div className="prose design-doc">
          {source === null ? (
            <p className="loading">Loading…</p>
          ) : (
            <>
              <Markdown source={source} />
              <ScrollToHash />
            </>
          )}
        </div>
        <div className="pager">
          {prev ? (
            <Link className="pager__link" to={href(prev)}>
              <span>← Previous</span>
              <strong>{prev.title}</strong>
            </Link>
          ) : <span />}
          {next ? (
            <Link className="pager__link pager__link--next" to={href(next)}>
              <span>Next →</span>
              <strong>{next.title}</strong>
            </Link>
          ) : <span />}
        </div>
      </article>
      <aside className="page__toc">
        <Toc containerRef={articleRef} />
      </aside>
    </div>
  );
}
