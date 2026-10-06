import type { MDXContent } from "mdx/types";
import { lazy, type LazyExoticComponent } from "react";
import type { Chapter } from "./manifest";

// Each chapter is one MDX file: src/content/chapters/<part-folder>/<chapter-folder>.mdx
const chapterModules = import.meta.glob<{ default: MDXContent }>("../content/chapters/**/*.mdx");

const chapterKeyByFolder = new Map(
  Object.keys(chapterModules).map((key) => [key.split("/").at(-1)!.replace(/\.mdx$/, ""), key]),
);

const lazyCache = new Map<string, LazyExoticComponent<MDXContent>>();

export const hasChapterContent = (c: Chapter) => chapterKeyByFolder.has(c.folder);

export function getChapterComponent(c: Chapter): LazyExoticComponent<MDXContent> | undefined {
  const key = chapterKeyByFolder.get(c.folder);
  if (!key) return undefined;
  let component = lazyCache.get(key);
  if (!component) {
    component = lazy(chapterModules[key]!);
    lazyCache.set(key, component);
  }
  return component;
}

// The curriculum design documents, read straight from ../curriculum so they never drift.
const designModules = import.meta.glob<string>("../../../curriculum/*.md", { query: "?raw", import: "default" });

export interface DesignDoc {
  slug: string;
  title: string;
  load: () => Promise<string>;
}

const DESIGN_TITLES: Record<string, string> = {
  README: "Curriculum Overview",
  "01-book-vision": "1. Book Vision",
  "02-learning-philosophy": "2. Learning Philosophy",
  "03-the-story": "3. Why JavaScript → TypeScript → React",
  "04-learning-roadmap": "4. Learning Roadmap",
  "05-typescript-curriculum": "5. TypeScript Curriculum",
  "06-typescript-projects-and-checkpoints": "6. TypeScript Projects & Checkpoints",
  "07-react-curriculum": "7. React Curriculum",
  "08-react-typescript-curriculum": "8. React + TypeScript Curriculum",
  "09-advanced-and-professional": "9. Advanced & Professional",
  "10-capstone-projects": "10. Capstone Projects",
  "11-table-of-contents": "11. Table of Contents",
  "12-folder-structure": "12. Folder Structure",
  "13-roadmap-book-folder-mapping": "13. Roadmap → Book → Folder",
  "14-difficulty-curve": "14. Difficulty Curve",
  "15-essential-advanced-specialist": "15. Essential vs Advanced vs Specialist",
  "16-final-review": "16. Final Curriculum Review",
};

export const designDocs: DesignDoc[] = Object.entries(designModules)
  .map(([key, load]) => {
    const slug = key.split("/").at(-1)!.replace(/\.md$/, "");
    return { slug, title: DESIGN_TITLES[slug] ?? slug, load };
  })
  .sort((a, b) => (a.slug === "README" ? -1 : b.slug === "README" ? 1 : a.slug.localeCompare(b.slug)));

export const getDesignDoc = (slug: string | undefined) => designDocs.find((d) => d.slug === (slug ?? "README"));
