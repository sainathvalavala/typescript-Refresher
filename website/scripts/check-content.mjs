// Validates chapter MDX files: they compile, every curriculum section has a matching heading
// with at least one code example, and the required closing sections exist.
//
//   node scripts/check-content.mjs            # check every chapter file that exists
//   node scripts/check-content.mjs 16 17 18   # check specific chapters (missing files are errors)
import { compile } from "@mdx-js/mdx";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { execFileSync } from "node:child_process";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const MANIFEST = join(ROOT, "src", "generated", "manifest.json");
if (!existsSync(MANIFEST)) execFileSync(process.execPath, [join(HERE, "build-manifest.mjs")], { stdio: "ignore" });
const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));

const wanted = process.argv.slice(2).map(Number).filter(Boolean);
const chapters = manifest.parts.flatMap((p) => p.chapters.map((c) => ({ ...c, partFolder: p.folder })));
const targets = wanted.length ? chapters.filter((c) => wanted.includes(c.num)) : chapters;
const norm = (s) => s.replace(/`/g, "").replace(/\s+/g, " ").trim();

let failures = 0;
let checked = 0;
let missing = [];

for (const c of targets) {
  const rel = `src/content/chapters/${c.partFolder}/${c.folder}.mdx`;
  const file = join(ROOT, rel);
  if (!existsSync(file)) {
    missing.push(c.num);
    continue;
  }
  checked++;
  const errors = [];
  const source = readFileSync(file, "utf8").replace(/\r\n/g, "\n");

  try {
    await compile(source, { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] });
  } catch (err) {
    const where = err.line ? `line ${err.line}${err.column ? `:${err.column}` : ""}` : "";
    errors.push(`MDX compile error ${where}: ${err.reason ?? err.message}`);
  }

  // Walk the file outside code fences.
  const lines = source.split("\n");
  let inFence = false;
  const h2 = []; // { text, line, codeBlocks }
  const h3 = [];
  lines.forEach((line, i) => {
    if (/^\s*(```|~~~)/.test(line)) {
      if (!inFence && h2.length) h2[h2.length - 1].codeBlocks++;
      inFence = !inFence;
      return;
    }
    if (inFence) return;
    if (/^(import|export)\s/.test(line)) errors.push(`line ${i + 1}: prose line starts with "${line.split(" ")[0]}" (MDX treats it as code). Rephrase the sentence.`);
    if (line.includes("<!--")) errors.push(`line ${i + 1}: HTML comments are not allowed in MDX; use {/* … */} or remove it.`);
    if (line.includes("{/* CONTINUE */}")) errors.push(`line ${i + 1}: unfinished chapter: the {/* CONTINUE */} marker is still present.`);
    const m2 = line.match(/^## (.+)$/);
    if (m2) h2.push({ text: norm(m2[1]), line: i + 1, codeBlocks: 0 });
    const m3 = line.match(/^### (.+)$/);
    if (m3) h3.push(norm(m3[1]));
  });
  if (inFence) errors.push("unclosed code fence");

  for (const s of c.sections) {
    const expected = norm(`${c.num}.${s.n} ${s.title}`);
    const heading = h2.find((h) => h.text === expected);
    if (!heading) errors.push(`missing section heading: "## ${c.num}.${s.n} ${s.title}"`);
    else if (heading.codeBlocks === 0) errors.push(`section ${c.num}.${s.n} has no code example (line ${heading.line})`);
  }
  for (const required of ["Exercises", "Key takeaways"]) {
    if (!h2.some((h) => h.text === required)) errors.push(`missing "## ${required}"`);
  }
  for (let level = 1; level <= 4; level++) {
    if (!h3.some((t) => t.startsWith(`Level ${level}`))) errors.push(`missing "### Level ${level} — …" exercise`);
  }

  if (errors.length) {
    failures++;
    console.log(`✗ Ch ${c.num} ${rel}`);
    for (const e of errors) console.log(`    ${e}`);
  } else {
    console.log(`✓ Ch ${c.num} ${c.title}`);
  }
}

if (wanted.length && missing.length) {
  failures += missing.length;
  console.log(`✗ missing files for chapters: ${missing.join(", ")}`);
}
console.log(`\n${checked} checked, ${failures} with problems${!wanted.length ? `, ${missing.length} not yet written` : ""}.`);
process.exit(failures ? 1 : 0);
