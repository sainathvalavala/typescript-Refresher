# Typed Interfaces: Curriculum Design

> **The complete design for a book-style TypeScript + React curriculum**, taking a JavaScript developer from *"Why does TypeScript exist?"* to professional TypeScript + React engineering.

**16 parts · 99 chapters · 783 lessons · 16 checkpoints · 20 projects · 3 capstone tracks**, published as three Books:

| Book | Parts | Chapters | Outcome |
|---|---|---|---|
| **One: The TypeScript Language** | I–VI | 1–33 | "I can think in types." |
| **Two: Building Interfaces with React + TypeScript** | VII–XII | 34–76 | "I can ship a real app." ★ *Essential core complete* |
| **Three: Mastery** | XIII–XVI | 77–99 | "I can lead, design, and scale." |

---

## Read in this order

| # | Section | What's in it |
|---|---|---|
| 1 | [Book Vision](01-book-vision.md) | Goals, audience, the three Books, the five threads, the TaskFlow project, tooling baseline |
| 2 | [Learning Philosophy](02-learning-philosophy.md) | The learning loop, the eight questions, chapter archetypes, style guide, code ladder, exercise levels, a fully blueprinted sample chapter |
| 3 | [Why JavaScript → TypeScript → React](03-the-story.md) | The story and motivation, in the book's own voice |
| 4 | [Complete Learning Roadmap](04-learning-roadmap.md) | Roadmap v1 → critical review → final roadmap; spirals; reading paths; time budget |
| 5 | [Detailed TypeScript Curriculum](05-typescript-curriculum.md) | Parts I–VI, chapters 1–33, as chapter cards |
| 6 | [TypeScript Projects & Checkpoints](06-typescript-projects-and-checkpoints.md) | Projects P01–P08 and checkpoints for Parts I–VI |
| 7 | [Detailed React Curriculum](07-react-curriculum.md) | Parts VII–VIII: the bridge, "Why React?", React fundamentals (Ch 34–48) |
| 8 | [React + TypeScript Curriculum](08-react-typescript-curriculum.md) | Parts IX–XII: React + TS, real apps, testing, production (Ch 49–76) |
| 9 | [Advanced & Professional Development](09-advanced-and-professional.md) | Parts XIII–XV: advanced TS, advanced React patterns, professional engineering (Ch 77–97) |
| 10 | [Capstone Projects](10-capstone-projects.md) | The project ladder, Part XVI, capstones C1–C3, evaluation rubric |
| 11 | [Complete E-Book Table of Contents](11-table-of-contents.md) | The reader's view: every part, chapter, and section |
| 12 | [Complete Lessons Folder Structure](12-folder-structure.md) | Repository anatomy and the full tree, down to every lesson folder |
| 13 | [Roadmap → Book → Folder Mapping](13-roadmap-book-folder-mapping.md) | The chain from stage to lesson to project, plus a full chapter index |
| 14 | [Difficulty Curve](14-difficulty-curve.md) | Distribution, the sawtooth curve, conceptual jumps, struggle points, what to skip |
| 15 | [Essential vs Advanced vs Specialist](15-essential-advanced-specialist.md) | Topic-level classification across every domain |
| 16 | [Final Curriculum Review](16-final-review.md) | Checklist findings, coverage traceability, additions, exclusions, risks |

## Legend

- **Difficulty:** 🟢 Beginner · 🟡 Intermediate · 🟠 Advanced · 🔴 Expert/Specialist
- **Tier:** `Essential` (every TS + React developer) · `Advanced` (experienced developers, larger apps) · `Specialist` (library/framework authors)
- **Callouts:** 🧠 mental model · ⚠️ common mistake · 🚫 when not to · 🔗 connection · 🌍 real world · ⏭ safe to skip · 🆕 modern note · 🕰 legacy note
- **Exercises:** L1 Recall · L2 Application · L3 Challenge · L4 Real-world

## Keeping it consistent

Sections 11, 12, and 13 are **generated** from the chapter cards in Sections 5, 7, 8, 9, and 10. After editing a chapter card (title, sections, difficulty, tier, or folder), regenerate them:

```sh
node curriculum/_generator/generate.mjs
```

The generator also checks that chapter and section numbering is contiguous and that folder names match chapter numbers, and it fails loudly if anything drifts.

## Reading it as a website

`curriculum/_site/index.html` is the whole curriculum as one self-contained web page, with section navigation, chapter search, and an "on this page" list. Open it in any browser; no server is needed. After editing any Markdown file, rebuild it:

```sh
cd curriculum/_generator
npm install      # first time only
npm run site
```

### The full interactive book (React)

The design documents describe the book; [`../website`](../website/README.md) *is* the book: a React site where every chapter is its own MDX file and every subtopic is explained with a code example. It also has search, progress tracking, and dark mode.

```sh
cd website
npm install      # first time only
npm run dev      # open http://localhost:5173
```
