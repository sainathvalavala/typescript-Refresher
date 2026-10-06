// Builds the curriculum website from curriculum/*.md into one self-contained page:
//   curriculum/_site/index.html — open it directly in any browser (no server needed).
// Setup once:  cd curriculum/_generator && npm install
// Build:       npm run site   (run from curriculum/_generator)
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Marked } from "marked";
import hljs from "highlight.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = process.env.CURRICULUM_DIR ?? join(HERE, "..");
const OUT = process.env.SITE_OUT ?? join(ROOT, "_site");
const TEMPLATE = readFileSync(join(HERE, "templates", "site.html"), "utf8");

const files = ["README.md", ...readdirSync(ROOT).filter((f) => /^\d\d-.+\.md$/.test(f)).sort()];
const sidOf = (file) => (file === "README.md" ? "home" : `s${file.slice(0, 2)}`);

const NAV = {
  home: { label: "Overview" },
  s01: { label: "Book Vision" },
  s02: { label: "Learning Philosophy" },
  s03: { label: "The Story: JS → TS → React" },
  s04: { label: "Learning Roadmap" },
  s05: { label: "TypeScript Curriculum", meta: "Ch 1–33" },
  s06: { label: "TypeScript Projects & Checkpoints", meta: "P01–P08" },
  s07: { label: "React Curriculum", meta: "Ch 34–48" },
  s08: { label: "React + TypeScript Curriculum", meta: "Ch 49–76" },
  s09: { label: "Advanced & Professional", meta: "Ch 77–97" },
  s10: { label: "Capstone Projects", meta: "Ch 98–99" },
  s11: { label: "Table of Contents" },
  s12: { label: "Folder Structure" },
  s13: { label: "Roadmap → Book → Folder" },
  s14: { label: "Difficulty Curve" },
  s15: { label: "Essential · Advanced · Specialist" },
  s16: { label: "Final Review" },
};
const GROUPS = [
  { label: "Start", ids: ["home"] },
  { label: "The design", ids: ["s01", "s02", "s03", "s04"] },
  { label: "The curriculum", ids: ["s05", "s06", "s07", "s08", "s09", "s10"] },
  { label: "Structure", ids: ["s11", "s12", "s13"] },
  { label: "Analysis", ids: ["s14", "s15", "s16"] },
];

// ---------- helpers ----------
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
// GitHub-style heading slug: the cross-file links in the Markdown were written against these.
const slug = (text) => text.trim().toLowerCase().replace(/<[^>]+>/g, "").replace(/[^\p{L}\p{N}\s-]/gu, "").replace(/\s/g, "-");
const plain = (md) => md.replace(/`/g, "").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
const LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];
const DOTS = ["🟢", "🟡", "🟠", "🔴"];
const LANGS = { ts: "typescript", tsx: "typescript", typescript: "typescript", js: "javascript", jsx: "javascript", javascript: "javascript", sh: "bash", bash: "bash", shell: "bash", css: "css", json: "json", md: "markdown", markdown: "markdown", html: "xml" };

const warnings = [];
let ctx = null; // per-file render state

function rewriteHref(href) {
  if (/^(https?:|mailto:)/i.test(href)) return href;
  if (href.startsWith("#")) return `#${ctx.sid}-${href.slice(1)}`;
  const m = href.match(/^(?:\.\/)?([\w.-]+\.md)(?:#(.*))?$/);
  if (m && files.includes(m[1])) return m[2] ? `#${sidOf(m[1])}-${m[2]}` : `#${sidOf(m[1])}`;
  warnings.push(`${ctx.file}: unresolved link ${href}`);
  return href;
}

const marked = new Marked({ gfm: true });
marked.use({
  renderer: {
    heading({ tokens, depth, text }) {
      const raw = plain(text);
      let id = `${ctx.sid}-${slug(raw)}`;
      const seen = ctx.ids.get(id) ?? 0;
      ctx.ids.set(id, seen + 1);
      if (seen) id = `${id}-${seen}`;

      let inner = this.parser.parseInline(tokens);
      let cls = "";
      let kind = "heading";
      let tocText = raw;
      const sec = depth === 1 && raw.match(/^(\d+)\.\s+(.+)$/);
      const part = depth === 3 && raw.match(/^Part ([IVXL]+) — (.+)$/);
      const chapter = depth === 4 && raw.match(/^Chapter (\d+) — (.+)$/);
      if (depth === 1 && ctx.sid === "home") {
        inner = `<span class="eyebrow">Curriculum design</span>${esc(raw.replace(/:.*$/, ""))}`;
      } else if (sec) {
        inner = `<span class="eyebrow">Section ${sec[1]}</span>${esc(sec[2])}`;
      } else if (part) {
        cls = "part-head";
        kind = "part";
        inner = `<span class="eyebrow">Part ${part[1]}</span>${esc(part[2])}`;
        tocText = `Part ${part[1]} · ${part[2]}`;
      } else if (chapter) {
        cls = "chapter-head";
        kind = "chapter";
        inner = `<span class="ch-num">Chapter ${chapter[1]}</span><span>${esc(chapter[2])}</span>`;
        tocText = `${chapter[1]} · ${chapter[2]}`;
      } else if (depth === 3 && /^✅ Checkpoint/u.test(raw)) {
        cls = "block-head checkpoint";
        kind = "checkpoint";
      } else if (depth === 3 && /^(🛠 )?P\d\d — /u.test(raw)) {
        cls = "block-head project";
        kind = "project";
      }
      ctx.headings.push({ depth, id, text: tocText, raw, kind, n: chapter ? Number(chapter[1]) : undefined });
      return `<h${depth} id="${id}"${cls ? ` class="${cls}"` : ""}>${inner}</h${depth}>\n`;
    },
    code({ text, lang }) {
      const key = (lang ?? "").trim().split(/\s+/)[0].toLowerCase();
      const language = LANGS[key];
      if (key && !language) warnings.push(`${ctx.file}: unhighlighted code language "${key}"`);
      if (!language) return `<pre class="plain"><code>${esc(text)}</code></pre>\n`;
      const html = hljs.highlight(text, { language, ignoreIllegals: true }).value;
      return `<pre class="code"><code class="hljs language-${key}">${html}</code></pre>\n`;
    },
    codespan({ text }) {
      const level = text.match(/^(🟢|🟡|🟠|🔴) (Beginner|Intermediate|Advanced|Expert)$/u);
      if (level) return chipLevel(LEVELS.indexOf(level[2]));
      const dot = text.match(/^(🟢|🟡|🟠|🔴)$/u);
      if (dot) return chipLevel(DOTS.indexOf(dot[1]));
      if (/^(Essential|Advanced|Specialist)$/.test(text)) return `<span class="chip tier tier-${text.toLowerCase()}">${text}</span>`;
      return `<code>${esc(text)}</code>`;
    },
    link({ href, title, tokens }) {
      const inner = this.parser.parseInline(tokens);
      const target = rewriteHref(href);
      const external = /^https?:/i.test(target);
      return `<a href="${esc(target)}"${title ? ` title="${esc(title)}"` : ""}${external ? ' target="_blank" rel="noopener"' : ""}>${inner}</a>`;
    },
  },
});
const chipLevel = (i) => `<span class="chip level lvl-${i + 1}"><span class="dot" aria-hidden="true"></span>${LEVELS[i]}</span>`;

// Wrap chapter cards, checkpoints, and project briefs into their own blocks, and tidy their metadata lines.
function structure(html) {
  const segments = html.split(/(?=<h[1-4][\s>])|(?=<hr>)/);
  return segments
    .map((seg) => {
      if (seg.startsWith('<h4 id="') && seg.includes('class="chapter-head"')) {
        const tidy = seg.replace(/(<\/h4>\s*)<p>([\s\S]*?)<\/p>/, (_, pre, inner) =>
          `${pre}<p class="card-meta">${inner
            .replace(/\s·\s/g, " ")
            .replace(/📁\s*<code>([^<]+)<\/code>/u, '<span class="chip folder"><code>$1</code></span>')}</p>`);
        return `<article class="chapter-card">\n${tidy}</article>\n`;
      }
      if (seg.includes('class="block-head checkpoint"') && seg.startsWith("<h3")) return `<section class="block block-checkpoint">\n${seg}</section>\n`;
      if (seg.includes('class="block-head project"') && seg.startsWith("<h3")) return `<section class="block block-project">\n${seg}</section>\n`;
      if (seg.startsWith("<h3") && seg.includes('class="part-head"')) return seg.replace(/(<\/h3>\s*)<blockquote>/, '$1<blockquote class="part-meta">');
      return seg;
    })
    .join("");
}

function pager(html) {
  return html.replace(/<p><strong>(?:Previous|Next|Back to):<\/strong>[\s\S]*?<\/p>/, (p) => {
    const links = [...p.matchAll(/<strong>(Previous|Next|Back to):<\/strong>\s*<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
    const items = links.map(([, label, href, title]) => {
      const side = label === "Previous" ? "prev" : "next";
      const clean = title.replace(/^←\s*/, "").replace(/\s*→$/, "");
      return `<a class="${side}" href="${href}"><span class="lbl">${label}</span><span class="ttl">${clean}</span></a>`;
    });
    return `<nav class="pager" aria-label="Section navigation">${items.join("")}</nav>`;
  });
}

function tocHtml(headings) {
  const items = headings
    .filter((h) => h.depth >= 2 && h.depth <= 4)
    .map((h) => `<li class="d${h.depth}${h.kind === "part" ? " is-part" : ""}"><a href="#${h.id}">${esc(h.text)}</a></li>`);
  return items.length >= 3 ? `<ul>${items.join("")}</ul>` : "";
}

// ---------- render every file ----------
const pages = [];
const searchIndex = [];
for (const file of files) {
  const sid = sidOf(file);
  ctx = { file, sid, headings: [], ids: new Map() };
  const source = readFileSync(join(ROOT, file), "utf8");
  let html = marked.parse(source);
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, "</table></div>");
  html = pager(structure(html));

  const toc = tocHtml(ctx.headings);
  const tocBlock = toc ? `<details class="toc-inline"><summary>On this page</summary><nav class="toc">${toc}</nav></details>\n` : "";
  const resume = sid === "home"
    ? `<p class="resume" id="resume" hidden><a href="#home"><span class="lbl">Continue reading</span><span class="ttl"></span></a></p>\n`
    : "";
  // Put the inline contents block right after the page's title (h1 + its intro blockquote, if any).
  const body = html.replace(/(<h1[\s\S]*?<\/h1>\s*(?:<blockquote>[\s\S]*?<\/blockquote>\s*)?)/, `$1${tocBlock}`);
  pages.push({ sid, html: `<article class="page doc" id="${sid}"${sid === "home" ? "" : " hidden"}>\n${resume}${body}</article>`, headings: ctx.headings });

  const label = NAV[sid].label;
  const sectionNum = sid === "home" ? "" : String(Number(sid.slice(1)));
  searchIndex.push({ k: "Section", l: sectionNum ? `${sectionNum} · ${label}` : label, id: sid, s: `${sectionNum} ${label} section`.toLowerCase() });
  for (const h of ctx.headings) {
    if (h.kind === "part") searchIndex.push({ k: "Part", l: h.text, id: h.id, s: h.text.toLowerCase() });
    if (h.kind === "checkpoint") searchIndex.push({ k: "Checkpoint", l: h.raw.replace(/^✅\s*Checkpoint\s*—\s*/u, ""), id: h.id, s: h.raw.toLowerCase() });
    if (h.kind === "project") searchIndex.push({ k: "Project", l: h.raw.replace(/^🛠\s*/u, ""), id: h.id, s: h.raw.toLowerCase() });
  }
  // Chapters: index the chapter title plus every lesson title in its card, so topics are searchable.
  for (const card of html.matchAll(/<article class="chapter-card">([\s\S]*?)<\/article>/g)) {
    const head = card[1].match(/<h4 id="([^"]+)"[^>]*><span class="ch-num">Chapter (\d+)<\/span><span>([\s\S]*?)<\/span><\/h4>/);
    if (!head) continue;
    const lessons = [...card[1].matchAll(/<li><strong>([\s\S]*?)<\/strong>/g)].map((m) => m[1].replace(/<[^>]+>/g, ""));
    const title = head[3].replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    searchIndex.push({ k: "Chapter", n: Number(head[2]), l: `${head[2]} · ${title}`, id: head[1], s: `chapter ${head[2]} ${title} ${lessons.join(" ")}`.toLowerCase() });
  }
}

// ---------- navigation ----------
const navHtml = GROUPS.map((g) => {
  const items = g.ids.map((sid) => {
    const page = pages.find((p) => p.sid === sid);
    const parts = page.headings.filter((h) => h.kind === "part");
    const subs = parts.length ? parts : page.headings.filter((h) => h.depth === 2);
    const n = sid === "home" ? "·" : String(Number(sid.slice(1)));
    const meta = NAV[sid].meta ? `<span class="meta">${esc(NAV[sid].meta)}</span>` : "<span></span>";
    const sub = subs.length && sid !== "home"
      ? `<ul class="sub">${subs.map((h) => `<li><a href="#${h.id}">${esc(h.text)}</a></li>`).join("")}</ul>`
      : "";
    return `<li class="nav-item" data-page="${sid}"><a href="#${sid}"><span class="n">${n}</span><span class="t">${esc(NAV[sid].label)}</span>${meta}</a>${sub}</li>`;
  });
  return `<div class="nav-group"><p class="nav-label">${esc(g.label)}</p><ul>${items.join("")}</ul></div>`;
}).join("\n");

const built = `Built ${new Date().toISOString().slice(0, 10)} from ${files.length} Markdown files in <code>curriculum/</code>.`;
const page = TEMPLATE
  .replace("<!--@NAV-->", navHtml)
  .replace("<!--@PAGES-->", pages.map((p) => p.html).join("\n"))
  .replace("<!--@INDEX-->", JSON.stringify(searchIndex).replace(/</g, "\\u003c"))
  .replace("<!--@BUILT-->", built);

mkdirSync(OUT, { recursive: true });
// The published (hosted) version must not carry its own document skeleton; set ARTIFACT_OUT to write it.
if (process.env.ARTIFACT_OUT) writeFileSync(process.env.ARTIFACT_OUT, page);
writeFileSync(
  join(OUT, "index.html"),
  `<!doctype html>\n<html lang="en">\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n${page}\n</html>\n`,
);

const chapters = searchIndex.filter((e) => e.k === "Chapter").length;
console.log(`pages ${pages.length} · chapters indexed ${chapters} · index entries ${searchIndex.length} · ${(Buffer.byteLength(page) / 1024).toFixed(0)} KB`);
if (warnings.length) console.log("warnings:\n  " + [...new Set(warnings)].join("\n  "));
