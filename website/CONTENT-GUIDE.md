# Content Guide: Writing a Chapter

Every chapter of the book is one MDX file (Markdown that compiles to a React component):

```
src/content/chapters/<part-folder>/<chapter-folder>.mdx
e.g. src/content/chapters/04-generics-and-type-transformations/16-why-generics.mdx
```

Folder names, chapter numbers, titles, difficulty, tier, and **section titles** come from the curriculum
(`../curriculum/05,07,08,09,10-*.md`, the "chapter cards") via `src/generated/manifest.json`. The site
renders the chapter's title and badges itself, so **don't** repeat the chapter title as an `#` heading.

The reference example is **Chapter 16** (`16-why-generics.mdx`). Match its depth, tone, and structure.

---

## 1. Structure

```md
> 📖 **The problem.** <the chapter's opening scenario, as a short story the reader recognizes>

<1–2 short paragraphs: why this chapter exists, and what the reader will be able to do afterward>

> 🧠 **Mental model.** <the one picture to keep in your head>

## 16.1 <Exact section title from the chapter card>
<explanation + at least one code example>

## 16.2 <Exact section title>
…one "##" per section, in order, numbered <chapter>.<section>…

## Common mistakes            (omit only for story/checkpoint chapters with no code pitfalls)
## When to use it, and when not to   (concept and pattern chapters)
## How it connects
## Exercises
### Level 1 — Recall
### Level 2 — Application
### Level 3 — Challenge
### Level 4 — Real-world
## Key takeaways
## What comes next
```

**Section headings must be exactly** `## <chapter>.<n> <title>`, using the section title from the chapter
card character for character (backticks may be added around code words). `npm run check:content` enforces this.

## 2. Each section (subtopic)

- **Explain first, then show.** 1–4 short paragraphs (~80–200 words) in plain language. Lead with the
  problem or the intuition, then the rule. Define every term at first use.
- **At least one code example per section. This is required.** Use a fenced block with a language:
  ` ```ts `, ` ```tsx `, ` ```js `, ` ```json `, ` ```sh `.
- Climb the ladder across a chapter: **tiny** (3–10 lines) → **larger** (10–25) → **realistic**
  (recognizable app code). Keep any single block to about 40 lines or fewer.
- Show what TypeScript infers with hover comments: `const n = first([1, 2]); // n: number | undefined`.
- Mark lines that fail to compile, or crash, with `// ❌ …` and the real error message, and good lines with `// ✅`.
  The site highlights these lines red and green.
  ```ts
  addTax("100", 0.2); // ❌ Argument of type 'string' is not assignable to parameter of type 'number'.
  ```
- Examples must be **correct for modern TypeScript (strict mode) and React 19**: `ref` as a prop,
  no `defaultProps` on function components, `useRef` with an initial value, ES modules. If showing legacy code,
  say so.
- Prefer the book's running domain where natural: **TaskFlow** (tasks, projects, users; statuses
  `"todo" | "doing" | "done"`, priorities, due dates).
- Non-code sections (history, concepts) still get an example: a code snippet that illustrates the idea
  (a 1996-style script, a bug, a before/after, a config file, a terminal session).
- Add a short sentence after a code block when the takeaway isn't obvious.

## 3. Callouts

Write callouts as blockquotes that start with an emoji. The site styles them automatically.

| Start with | Use for |
|---|---|
| `> 📖 **The problem.**` | The opening scenario |
| `> 🧠 **Mental model.**` | The picture to remember |
| `> ⚠️ **Common mistake.**` | A pitfall (inside a section) |
| `> 🚫 **When not to.**` | Simpler alternatives, costs |
| `> ✅ **Use it when**` | Good uses |
| `> 🔗 **Connection.**` | Links to other chapters |
| `> 🌍 **Real world.**` | How production code or libraries do it |
| `> 💡 **Tip.**` | Short practical advice |
| `> ⏭ **Safe to skip.**` | Specialist detail |
| `> 🆕 **Modern note.**` / `> 🕰 **Legacy note.**` | Version-specific behavior |

## 4. Exercises

Use the four levels from the chapter card (expand them into clear tasks). **No solutions.**
Level 3 may include one hint line in italics. Level 4 is written like a work ticket with 2–4 acceptance criteria.

## 5. Links

- To another chapter: `[Chapter 14](/chapter/14)` (the number is enough).
- To a part: `[Part IV](/part/iv)`. To a project: `[P04](/projects/p04)`.

## 6. MDX safety rules (the build breaks otherwise)

MDX treats some characters in **prose** as JSX or JavaScript. Inside code spans and code fences, anything goes.

1. **Never write `<`, `{`, or `}` in prose.** Put all code and type syntax in backticks:
   write `` `Array<T>` ``, `` `{ id: string }` ``, `` `<Button>` ``, never bare.
2. **No line may start with `import ` or `export `** outside code fences. Rephrase:
   "The `import type` form…", not "import type is…".
3. **No HTML**: no `<br>`, `<details>`, or `<!-- comments -->`.
4. **No autolinks** like `<https://…>`; use `[text](https://…)`.
5. Tables (GitHub style), bold, italics, lists, and emoji are all fine.

Run the checker on your chapters before finishing:

```sh
npm run check:content -- 16 17 18
```

It compiles each file and verifies headings, examples per section, exercises, and takeaways.
