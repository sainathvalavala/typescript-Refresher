// Builds src/generated/manifest.json from the curriculum Markdown in ../curriculum.
// The curriculum stays the single source of truth for books, parts, chapters, sections,
// checkpoints, and project specs; the chapter *content* lives in src/content/chapters/**.mdx.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const CURRICULUM = join(HERE, "..", "..", "curriculum");
const OUT = join(HERE, "..", "src", "generated", "manifest.json");

const CARD_FILES = [
  "05-typescript-curriculum.md",
  "07-react-curriculum.md",
  "08-react-typescript-curriculum.md",
  "09-advanced-and-professional.md",
  "10-capstone-projects.md",
];
const BLOCK_FILES = [
  "06-typescript-projects-and-checkpoints.md",
  "07-react-curriculum.md",
  "08-react-typescript-curriculum.md",
  "09-advanced-and-professional.md",
  "10-capstone-projects.md",
];

const BOOKS = [
  { id: "one", title: "Book One", subtitle: "The TypeScript Language", tagline: "I can think in types.", parts: ["I", "II", "III", "IV", "V", "VI"] },
  { id: "two", title: "Book Two", subtitle: "Building Interfaces with React + TypeScript", tagline: "I can ship a real app.", parts: ["VII", "VIII", "IX", "X", "XI", "XII"] },
  { id: "three", title: "Book Three", subtitle: "Mastery", tagline: "I can lead, design, and scale.", parts: ["XIII", "XIV", "XV", "XVI"] },
];

const PROJECT_PARTS = {
  P01: "II", P02: "III", P03: "III", P04: "IV", P05: "IV", P06: "V", P07: "VI", P08: "VI", P09: "VII",
  P10: "VIII", P11: "VIII", P12: "IX", P13: "X", P14: "X", P15: "X", P16: "XI", P17: "XII",
  P18: "XIII", P19: "XIV", P20: "XV", C1: "XVI", C2: "XVI", C3: "XVI",
};

const read = (f) => readFileSync(join(CURRICULUM, f), "utf8").replace(/\r\n/g, "\n");
const stripMd = (s) => s.replace(/\*\*/g, "").replace(/`/g, "").trim();

// ---------- parts, chapters, sections ----------
const parts = [];
for (const file of CARD_FILES) {
  const lines = read(file).split("\n");
  let part = null;
  let chapter = null;
  let inFence = false;
  let inPurpose = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trimStart().startsWith("```")) { inFence = !inFence; continue; }
    if (inFence) continue;

    const pm = line.match(/^### Part ([IVXL]+) — (.+)$/);
    if (pm) {
      const meta = lines[i + 1] ?? "";
      part = {
        id: pm[1],
        title: pm[2].trim(),
        folder: (meta.match(/\*\*Folder:\*\* `([^`]+)`/) ?? [])[1]?.replace(/\/$/, ""),
        stage: (meta.match(/\*\*Roadmap:\*\* ([^·]+)/) ?? [])[1]?.trim(),
        difficulty: (meta.match(/\*\*Difficulty:\*\* ([^·]+)/) ?? [])[1]?.trim(),
        milestone: meta.includes("Major milestone"),
        purpose: "",
        chapters: [],
      };
      parts.push(part);
      chapter = null;
      inPurpose = false;
      continue;
    }
    if (part && line.startsWith("**Purpose of the part.**")) {
      part.purpose = line.replace("**Purpose of the part.**", "").trim();
      inPurpose = true;
      continue;
    }
    if (inPurpose) {
      if (line.trim() === "" || line.startsWith("#") || line.startsWith("|") || line.startsWith(">")) inPurpose = false;
      else part.purpose += " " + line.trim();
    }

    const cm = line.match(/^#### Chapter (\d+) — (.+)$/);
    if (cm) {
      const badge = lines[i + 1] ?? "";
      const b = badge.match(/`(\S+) ([^`]+)` · `([^`]+)` · 📁 `([^`]+)`/);
      if (!b) throw new Error(`Bad badge line for chapter ${cm[1]}: ${badge}`);
      chapter = {
        num: Number(cm[1]),
        title: cm[2].trim(),
        emoji: b[1],
        level: b[2],
        tier: b[3],
        folder: b[4].replace(/\/$/, ""),
        partId: part.id,
        opensWith: "",
        mentalModel: "",
        sections: [],
      };
      part.chapters.push(chapter);
      continue;
    }
    if (/^#{1,4} /.test(line)) { chapter = null; continue; }
    if (!chapter) continue;

    const opens = line.match(/\*\*Opens with:\*\* (.+)$/);
    if (opens) chapter.opensWith = opens[1].trim();
    const mm = line.match(/^\*\*Mental model:\*\* (.+)$/);
    if (mm) chapter.mentalModel = mm[1].replace(/^🧠\s*/, "").trim();
    const sec = line.match(/^(\d+)\. \*\*(.+?)\*\*(?: — (.+))?$/);
    if (sec) chapter.sections.push({ n: Number(sec[1]), title: sec[2].trim(), summary: (sec[3] ?? "").trim() });
  }
}

// ---------- checkpoint and project blocks ----------
const checkpoints = {};
const projects = {};
for (const file of BLOCK_FILES) {
  const lines = read(file).split("\n");
  let current = null;
  let inFence = false;
  const flush = () => {
    if (!current) return;
    const body = current.lines.join("\n").replace(/\n+---\s*$/, "").trim();
    if (current.kind === "checkpoint") checkpoints[current.id] = { title: current.title, body };
    else projects[current.id] = { id: current.id, title: current.title, partId: PROJECT_PARTS[current.id], body };
    current = null;
  };
  for (const line of lines) {
    if (line.trimStart().startsWith("```")) inFence = !inFence;
    if (!inFence) {
      const ck = line.match(/^### ✅ Checkpoint — Part ([IVXL]+)(?: · (.+))?$/);
      const pj = line.match(/^### (?:🛠 )?(P\d\d) — (.+)$/);
      const cap = line.match(/^## 10\.\d Capstone (C\d) — (.+)$/);
      if (ck) { flush(); current = { kind: "checkpoint", id: ck[1], title: stripMd(ck[2] ?? ""), lines: [] }; continue; }
      if (pj) { flush(); current = { kind: "project", id: pj[1], title: stripMd(pj[2]), lines: [] }; continue; }
      if (cap) { flush(); current = { kind: "project", id: cap[1], title: stripMd(cap[2]).replace(/\*/g, ""), lines: [] }; continue; }
      // A block ends at a horizontal rule, at the end-of-book banners, or at the next heading
      // (capstone specs, which start at "##", only end at the next "##").
      const isCapstone = current?.id?.startsWith("C");
      const endsBlock =
        /^---\s*$/.test(line) ||
        /^> 🎓|^> ★/.test(line) ||
        (isCapstone ? /^## /.test(line) : /^#{2,4} /.test(line));
      if (current && endsBlock) flush();
    }
    if (current) current.lines.push(line);
  }
  flush();
}

// ---------- validate & write ----------
const chapters = parts.flatMap((p) => p.chapters);
const problems = [];
chapters.forEach((c, i) => { if (c.num !== i + 1) problems.push(`chapter numbering gap at ${c.num}`); });
for (const p of parts) if (!checkpoints[p.id]) problems.push(`missing checkpoint for Part ${p.id}`);
for (const id of Object.keys(PROJECT_PARTS)) if (!projects[id]) problems.push(`missing project spec ${id}`);
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }

const manifest = {
  generatedFrom: "curriculum/*.md",
  books: BOOKS,
  parts: parts.map((p) => ({ ...p, checkpoint: checkpoints[p.id] })),
  projects: Object.values(projects).sort((a, b) => (a.id[0] === b.id[0] ? a.id.localeCompare(b.id) : a.id[0] === "P" ? -1 : 1)),
};
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(manifest, null, 1));
console.log(`manifest: ${parts.length} parts, ${chapters.length} chapters, ${chapters.reduce((n, c) => n + c.sections.length, 0)} sections, ${Object.keys(projects).length} projects`);
