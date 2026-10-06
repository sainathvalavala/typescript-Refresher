import manifestJson from "../generated/manifest.json";

export type Level = "Beginner" | "Intermediate" | "Advanced" | "Expert";
export type Tier = "Essential" | "Advanced" | "Specialist";

export interface Section {
  n: number;
  title: string;
  summary: string;
}

export interface Chapter {
  num: number;
  title: string;
  emoji: string;
  level: Level;
  tier: Tier;
  folder: string;
  partId: string;
  opensWith: string;
  mentalModel: string;
  sections: Section[];
}

export interface Part {
  id: string;
  title: string;
  folder: string;
  stage: string;
  difficulty: string;
  milestone: boolean;
  purpose: string;
  chapters: Chapter[];
  checkpoint: { title: string; body: string };
}

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  parts: string[];
}

export interface Project {
  id: string;
  title: string;
  partId: string;
  body: string;
}

interface Manifest {
  books: Book[];
  parts: Part[];
  projects: Project[];
}

export const manifest = manifestJson as unknown as Manifest;

export const books = manifest.books;
export const parts = manifest.parts;
export const projects = manifest.projects;
export const chapters: Chapter[] = parts.flatMap((p) => p.chapters);

const partById = new Map(parts.map((p) => [p.id, p]));
const chapterByNum = new Map(chapters.map((c) => [c.num, c]));

export const getPart = (id: string | undefined) => (id ? partById.get(id.toUpperCase()) : undefined);
export const getChapter = (num: number) => chapterByNum.get(num);
export const getBookForPart = (partId: string) => books.find((b) => b.parts.includes(partId));
export const getProject = (id: string | undefined) => projects.find((p) => p.id.toLowerCase() === id?.toLowerCase());
export const projectsForPart = (partId: string) => projects.filter((p) => p.partId === partId);

/** URL helpers keep every route shape in one place. */
export const chapterPath = (c: Chapter) => `/chapter/${c.folder}`;
export const partPath = (p: Part) => `/part/${p.id.toLowerCase()}`;
export const projectPath = (p: Project) => `/projects/${p.id.toLowerCase()}`;

/** Accepts "16", "16-why-generics", or any slug that starts with the chapter number. */
export function chapterFromSlug(slug: string | undefined): Chapter | undefined {
  const num = Number.parseInt(slug ?? "", 10);
  return Number.isNaN(num) ? undefined : getChapter(num);
}

export const levelClass = (level: Level) => `level-${level.toLowerCase()}`;

/** Rough reading time: ~4 minutes per section plus exercises. */
export const readingMinutes = (c: Chapter) => c.sections.length * 4 + 10;
