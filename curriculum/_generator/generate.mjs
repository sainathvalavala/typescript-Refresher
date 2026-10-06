// Regenerates Sections 11 (TOC), 12 (folder tree) and 13 (mapping index) from the chapter cards
// in Sections 5, 7, 8, 9 and 10. Run after editing any chapter card:  node curriculum/_generator/generate.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const TEMPLATES = join(HERE, "templates");
const SOURCES = [
  "05-typescript-curriculum.md",
  "07-react-curriculum.md",
  "08-react-typescript-curriculum.md",
  "09-advanced-and-professional.md",
  "10-capstone-projects.md",
];

const BOOKS = [
  { title: "BOOK ONE — THE TYPESCRIPT LANGUAGE", tagline: "I can think in types.", parts: ["I", "II", "III", "IV", "V", "VI"] },
  { title: "BOOK TWO — BUILDING INTERFACES WITH REACT + TYPESCRIPT", tagline: "I can ship a real app.", parts: ["VII", "VIII", "IX", "X", "XI", "XII"] },
  { title: "BOOK THREE — MASTERY", tagline: "I can lead, design, and scale.", parts: ["XIII", "XIV", "XV", "XVI"] },
];

const PART_PROJECTS = {
  I: [], II: ["P01"], III: ["P02", "P03"], IV: ["P04", "P05"], V: ["P06"], VI: ["P07", "P08"],
  VII: ["P09"], VIII: ["P10", "P11"], IX: ["P12"], X: ["P13", "P14", "P15"], XI: ["P16"], XII: ["P17"],
  XIII: ["P18"], XIV: ["P19", "P20"], XV: ["P20"], XVI: ["C1", "C2", "C3"],
};

const PROJECT_FOLDERS = {
  P01: "p01-typed-calculator", P02: "p02-taskflow-core", P03: "p03-utility-toolkit",
  P04: "p04-generic-utility-library", P05: "p05-type-safe-event-emitter", P06: "p06-legacy-js-to-ts-migration",
  P07: "p07-taskflow-api", P08: "p08-typed-api-client", P09: "p09-vanilla-taskflow",
  P10: "p10-component-gallery", P11: "p11-taskflow-react", P12: "p12-react-dashboard",
  P13: "p13-typed-forms-kit", P14: "p14-taskflow-web", P15: "p15-authentication-system",
  P16: "p16-taskflow-web-test-suite", P17: "p17-complex-dashboard", P18: "p18-runtime-validation-library",
  P19: "p19-generic-data-table", P20: "p20-component-library",
  C1: "c1-teamboard", C2: "c2-ledgerly", C3: "c3-library-track",
};
const PROJECT_NAMES = {
  P01: "Typed Calculator", P02: "TaskFlow Core", P03: "Utility Toolkit", P04: "Generic Utility Library",
  P05: "Type-Safe Event Emitter", P06: "Legacy JS → TS Migration", P07: "TaskFlow API", P08: "Typed API Client",
  P09: "Vanilla TaskFlow", P10: "Component Gallery", P11: "TaskFlow in React", P12: "React Dashboard",
  P13: "Typed Forms Kit", P14: "TaskFlow Web", P15: "Authentication System", P16: "TaskFlow Web Test Suite",
  P17: "Complex Dashboard (Production)", P18: "Runtime Validation Library", P19: "Generic Data Table",
  P20: "Component Library", C1: "Capstone: Teamboard", C2: "Capstone: Ledgerly", C3: "Capstone: Library track",
};

// ---------- parse ----------
const parts = [];
let part = null;
let chapter = null;

for (const file of SOURCES) {
  const lines = readFileSync(join(ROOT, file), "utf8").split(/\r?\n/);
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trimStart().startsWith("```")) { inFence = !inFence; continue; }
    if (inFence) continue;

    const partMatch = line.match(/^### Part ([IVXL]+) — (.+)$/);
    if (partMatch) {
      const meta = lines[i + 1] ?? "";
      part = {
        id: partMatch[1],
        title: partMatch[2].trim(),
        folder: (meta.match(/\*\*Folder:\*\* `([^`]+)`/) ?? [])[1]?.replace(/\/$/, ""),
        stage: (meta.match(/\*\*Roadmap:\*\* ([^·]+)/) ?? [])[1]?.trim(),
        difficulty: (meta.match(/\*\*Difficulty:\*\* ([^·]+)/) ?? [])[1]?.trim(),
        milestone: meta.includes("Major milestone"),
        chapters: [],
        source: file,
      };
      parts.push(part);
      chapter = null;
      continue;
    }

    const chMatch = line.match(/^#### Chapter (\d+) — (.+)$/);
    if (chMatch) {
      const badge = lines[i + 1] ?? "";
      const b = badge.match(/`(\S+) ([^`]+)` · `([^`]+)` · 📁 `([^`]+)`/);
      if (!b) throw new Error(`Bad badge line for chapter ${chMatch[1]}: ${badge}`);
      chapter = {
        num: Number(chMatch[1]),
        title: chMatch[2].trim(),
        emoji: b[1], level: b[2], tier: b[3],
        folder: b[4].replace(/\/$/, ""),
        sections: [],
        projects: [],
        part,
      };
      part.chapters.push(chapter);
      continue;
    }

    if (/^#{1,4} /.test(line)) { chapter = null; continue; }
    if (!chapter) continue;

    const sec = line.match(/^(\d+)\. \*\*(.+?)\*\*/);
    if (sec) chapter.sections.push({ n: Number(sec[1]), title: sec[2].trim() });

    if (line.startsWith("**Project:**")) {
      for (const m of line.matchAll(/\bP\d\d\b/g)) if (!chapter.projects.includes(m[0])) chapter.projects.push(m[0]);
    }
  }
}

// ---------- validate ----------
const chapters = parts.flatMap((p) => p.chapters);
const errors = [];
chapters.forEach((c, idx) => {
  if (c.num !== idx + 1) errors.push(`Chapter numbering gap at ${c.num} (expected ${idx + 1})`);
  if (!c.folder.startsWith(String(c.num).padStart(2, "0") + "-")) errors.push(`Folder/number mismatch: Ch ${c.num} → ${c.folder}`);
  c.sections.forEach((s, j) => { if (s.n !== j + 1) errors.push(`Ch ${c.num}: section numbering ${s.n} at position ${j + 1}`); });
  if (c.sections.length === 0) errors.push(`Ch ${c.num} has no sections`);
});
parts.forEach((p, idx) => { if (!p.folder || !p.stage) errors.push(`Part ${p.id} missing folder/stage`); });
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }

// ---------- helpers ----------
const slugify = (title) => {
  let s = title
    .replace(/`/g, "")
    .replace(/&/g, " and ")
    .replace(/[’']/g, "")
    .replace(/\+/g, " plus ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const words = s.split("-");
  let out = "";
  for (const w of words) {
    const next = out ? `${out}-${w}` : w;
    if (next.length > 56) break;
    out = next;
  }
  return out || s.slice(0, 56);
};
const fullSlug = (title) => slugify.full(title);
slugify.full = (title) => title.replace(/`/g, "").replace(/&/g, " and ").replace(/[’']/g, "").replace(/\+/g, " plus ")
  .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const pad = (n) => String(n).padStart(2, "0");
const plainTitle = (t) => t.replace(/`/g, "");
const bookOf = (partId) => BOOKS.find((b) => b.parts.includes(partId));
const lessonFolders = (c) => c.sections.map((s) => `${pad(s.n)}-${slugify(s.title)}`);

// ---------- Section 11: TOC ----------
let toc = readFileSync(join(TEMPLATES, "s11-head.md"), "utf8");
for (const book of BOOKS) {
  toc += `\n---\n\n## ${book.title}\n*"${book.tagline}"*\n`;
  for (const pid of book.parts) {
    const p = parts.find((x) => x.id === pid);
    const first = p.chapters[0].num, last = p.chapters.at(-1).num;
    toc += `\n### Part ${p.id} — ${p.title}${p.milestone ? " ⭐" : ""}\n`;
    toc += `*${p.stage} · ${p.difficulty} · Chapters ${first}–${last}*\n\n`;
    for (const c of p.chapters) {
      toc += `**${c.num} · ${c.title}** \`${c.emoji}\` \`${c.tier}\`  \n`;
      toc += c.sections.map((s) => `${c.num}.${s.n} ${s.title}`).join(" · ") + "\n\n";
    }
    const projects = PART_PROJECTS[p.id];
    toc += `✅ *Checkpoint — Part ${p.id}*`;
    if (projects.length) toc += ` · 🛠 *Projects:* ${projects.map((id) => `${id} ${PROJECT_NAMES[id]}`).join(", ")}`;
    toc += "\n";
    if (p.id === "XII") toc += `\n> ★ **End of the Essential core:** the job-ready milestone.\n`;
  }
}
toc += readFileSync(join(TEMPLATES, "s11-tail.md"), "utf8");
writeFileSync(join(ROOT, "11-table-of-contents.md"), toc);

// ---------- Section 12: folder tree ----------
let tree = readFileSync(join(TEMPLATES, "s12-head.md"), "utf8");
tree += "\n## 12.3 Complete tree: parts and chapters\n\n```\n";
const rows = [
  ["typescript-react-book/", ""],
  ["├── README.md", ""],
  ["├── package.json, tsconfig.base.json, …", "root tooling (see 12.6)"],
  ["├── curriculum/", "this design document (Sections 1–16)"],
  ["├── front-matter/", "preface, how-to-read, reading paths, setup"],
];
parts.forEach((p) => {
  rows.push([`├── ${p.folder}/`, `Part ${p.id} — ${plainTitle(p.title)}`]);
  rows.push(["│   ├── README.md", "part introduction"]);
  rows.push(["│   ├── checkpoint/", "part checkpoint"]);
  p.chapters.forEach((c, j) => {
    const branch = j === p.chapters.length - 1 ? "└──" : "├──";
    rows.push([`│   ${branch} ${c.folder}/`, `Ch ${c.num} · ${c.sections.length} lessons`]);
  });
});
rows.push(
  ["├── projects/", "P01–P20 + capstones (see 12.5)"],
  ["├── appendices/", "A–H"],
  ["├── solutions/", "mirrors the tree above; kept on a separate branch"],
  ["├── shared/", "configs, test utils, fixtures used across lessons"],
  ["└── tools/", "scaffolding, exercise checker, book builder, link checker"],
);
const width = Math.max(...rows.filter(([, c]) => c).map(([t]) => [...t].length)) + 2;
for (const [text, comment] of rows) {
  tree += comment ? `${text}${" ".repeat(width - [...text].length)}# ${comment}\n` : `${text}\n`;
}
tree += "```\n";

tree += "\n## 12.4 Complete tree: every lesson folder\n\n";
tree += "Each lesson folder below contains `README.md`, `examples/`, and `exercises/` (§12.2). Expand a part to see its lessons.\n";
parts.forEach((p) => {
  const lessonCount = p.chapters.reduce((n, c) => n + c.sections.length, 0);
  tree += `\n<details>\n<summary><b>${p.folder}/</b> — Part ${p.id}: ${plainTitle(p.title)} (${p.chapters.length} chapters, ${lessonCount} lessons)</summary>\n\n\`\`\`\n${p.folder}/\n├── README.md\n├── checkpoint/\n`;
  p.chapters.forEach((c, j) => {
    const lastCh = j === p.chapters.length - 1;
    const cb = lastCh ? "└──" : "├──";
    const cont = lastCh ? "    " : "│   ";
    tree += `${cb} ${c.folder}/\n${cont}├── README.md\n`;
    lessonFolders(c).forEach((lf) => { tree += `${cont}├── ${lf}/\n`; });
    tree += `${cont}└── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)\n`;
  });
  tree += "```\n\n</details>\n";
});

tree += "\n## 12.5 Projects folder\n\n```\nprojects/\n";
const ids = Object.keys(PROJECT_FOLDERS);
ids.forEach((id, j) => {
  const last = j === ids.length - 1;
  const isCap = id.startsWith("C");
  const name = isCap ? `capstones/${PROJECT_FOLDERS[id]}` : PROJECT_FOLDERS[id];
  tree += `${last ? "└──" : "├──"} ${name}/`.padEnd(46) + `# ${PROJECT_NAMES[id]}\n`;
});
tree += "```\n";
tree += readFileSync(join(TEMPLATES, "s12-tail.md"), "utf8");
writeFileSync(join(ROOT, "12-folder-structure.md"), tree);

// ---------- Section 13: mapping index ----------
let map = readFileSync(join(TEMPLATES, "s13-head.md"), "utf8");
map += "\n## 13.4 Part-level mapping\n\n| Roadmap stage | Book | Part | Chapters | Part folder | Projects | Checkpoint |\n|---|---|---|---|---|---|---|\n";
parts.forEach((p) => {
  const book = bookOf(p.id).title.split(" — ")[0].replace("BOOK ", "Book ").replace(/\b(ONE|TWO|THREE)\b/, (w) => w[0] + w.slice(1).toLowerCase());
  map += `| ${p.stage} | ${book} | ${p.id} — ${p.title} | ${p.chapters[0].num}–${p.chapters.at(-1).num} | \`${p.folder}/\` | ${PART_PROJECTS[p.id].join(", ") || "—"} | \`${p.folder}/checkpoint/\` |\n`;
});
map += "\n## 13.5 Chapter-level index (all chapters)\n\n";
map += "Folder paths are relative to the repository root. *Lessons* is the number of lesson folders (one per section). *Project* lists the project started or extended in that chapter.\n\n";
map += "| Ch | Title | Part | Level | Tier | Folder | Lessons | Project |\n|---|---|---|---|---|---|---|---|\n";
chapters.forEach((c) => {
  map += `| ${c.num} | ${c.title} | ${c.part.id} | ${c.emoji} ${c.level} | ${c.tier} | \`${c.part.folder}/${c.folder}/\` | ${c.sections.length} | ${c.projects.join(", ") || "—"} |\n`;
});
map += readFileSync(join(TEMPLATES, "s13-tail.md"), "utf8");
writeFileSync(join(ROOT, "13-roadmap-book-folder-mapping.md"), map);

// ---------- stats for Sections 14/15 ----------
const count = (key) => chapters.reduce((acc, c) => ((acc[c[key]] = (acc[c[key]] ?? 0) + 1), acc), {});
console.log("parts", parts.length, "chapters", chapters.length, "lessons", chapters.reduce((n, c) => n + c.sections.length, 0));
console.log("levels", JSON.stringify(count("level")));
console.log("tiers", JSON.stringify(count("tier")));
for (const p of parts) {
  console.log(`Part ${p.id}: ` + p.chapters.map((c) => `${c.num}${c.emoji}${c.tier[0]}`).join(" "));
}
const truncated = chapters.flatMap((c) =>
  c.sections.filter((x) => slugify(x.title) !== fullSlug(x.title)).map((x) => `${c.num}.${x.n}: ${slugify(x.title)}  ⟵  ${fullSlug(x.title)}`));
if (truncated.length) console.log("truncated slugs:\n  " + truncated.join("\n  "));
