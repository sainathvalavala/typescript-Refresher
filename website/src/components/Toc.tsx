import { useEffect, useState, type RefObject } from "react";

interface Heading {
  id: string;
  text: string;
  depth: number;
}

/** "On this page": built from the rendered headings, so it works for MDX and Markdown alike. */
export function Toc({ containerRef, depth = 2 }: { containerRef: RefObject<HTMLElement | null>; depth?: 2 | 3 }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const selector = depth === 3 ? "h2[id], h3[id]" : "h2[id]";
    const collect = () => {
      // Documents that skip "##" (e.g. curriculum files organized as ### Part / #### Chapter)
      // fall back to their next heading level.
      let elements = [...container.querySelectorAll<HTMLElement>(selector)];
      if (depth === 2 && elements.length < 2) elements = [...container.querySelectorAll<HTMLElement>(".prose h3[id]")];
      const found = elements.map((el) => ({
        id: el.id,
        text: el.textContent ?? "",
        depth: el.tagName === "H3" ? 3 : 2,
      }));
      setHeadings((prev) => (prev.length === found.length && prev.every((h, i) => h.id === found[i]?.id) ? prev : found));
    };
    collect();
    const mutations = new MutationObserver(collect);
    mutations.observe(container, { childList: true, subtree: true });
    return () => mutations.disconnect();
  }, [containerRef, depth]);

  useEffect(() => {
    if (headings.length === 0) return;
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        const firstVisible = headings.find((h) => visible.get(h.id));
        if (firstVisible) setActive(firstVisible.id);
      },
      { rootMargin: "-72px 0px -65% 0px" },
    );
    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;
  return (
    <nav className="toc" aria-label="On this page">
      <p className="toc__title">On this page</p>
      <ul>
        {headings.map((h) => (
          <li key={h.id} className={`toc__item toc__item--d${h.depth}`}>
            <a href={`#${h.id}`} className={active === h.id ? "is-active" : undefined}>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Scrolls to location.hash once lazily loaded content has rendered. Render it after the content. */
export function ScrollToHash() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const el = document.getElementById(id);
    if (el) requestAnimationFrame(() => el.scrollIntoView());
  }, []);
  return null;
}
