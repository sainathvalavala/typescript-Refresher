# 12. Complete Lessons Folder Structure

> The repository *is* the book in source form: every part, chapter, and section has a folder, so the codebase can grow into the published e-book without restructuring. The trees in §12.3–12.5 are generated from the chapter cards, so they always match the curriculum.

---

## 12.1 Design principles

1. **The folder hierarchy mirrors the book.** Part → Chapter → Lesson (= section). Nobody has to translate between "where am I in the book" and "where am I in the repo".
2. **Numbers carry order; names carry meaning.** Parts are `01`–`16`, chapters are numbered globally `01`–`99` (matching the book), and lessons restart at `01` inside each chapter.
3. **Every lesson is runnable.** Examples run with one command; exercises have tests that check them automatically (including type tests).
4. **Solutions are separated.** They mirror the tree but live on a separate branch (or a `solutions/` tree excluded from the default view), so learners must opt in.
5. **Projects live outside chapters.** Projects span several chapters, so they get their own `projects/` tree, and chapters link to them.
6. **One workspace.** A single pnpm workspace with shared configs means `pnpm test` works from anywhere, and each lesson needs no setup of its own.

## 12.2 Folder anatomy

### A part folder

```
08-thinking-in-react/
├── README.md              # Part intro: purpose, roadmap stage, chapter list, prerequisites
├── checkpoint/
│   ├── README.md          # Know · Build · Answer · Challenge · Ready signs · Revisit-if
│   ├── questions.md       # self-assessment questions (answers in solutions/)
│   └── challenge/         # the timed small challenge (starter + tests)
└── 37-react-mental-model/ … 48-custom-hooks/
```

### A chapter folder

```
16-why-generics/
├── README.md              # Chapter text: opening problem, mental model, connections,
│                          #   summary, key takeaways, what comes next
├── 01-the-duplication-problem/      # one folder per section (= lesson)
├── 02-youve-used-generics-already/
├── …
└── exercises/
    ├── l1-recall/         # each: README.md (task) · starter/ · tests/ (runtime + type tests)
    ├── l2-application/
    ├── l3-challenge/      # hints folded inside README
    └── l4-real-world/     # ticket-style brief with acceptance criteria
```

### A lesson folder

```
03-type-parameters/
├── README.md              # The section text (book prose, ≤ ~1,500 words)
├── examples/
│   ├── 01-tiny.ts         # rung 1: one idea, 3–10 lines
│   ├── 02-larger.ts       # rung 2: combined with one earlier idea
│   └── 03-realistic.ts    # rung 3: recognizable app code (rung 4 lives in projects/)
└── exercises/
    ├── 01-predict-the-type.ts       # quick L1/L2 drills for this lesson
    └── 01-predict-the-type.test.ts
```

React lessons use `.tsx` and include a tiny Vite entry so examples run in the browser.

### A project folder

```
projects/p07-taskflow-api/
├── README.md              # Prerequisites · Difficulty · Concepts · Requirements ·
│                          #   Architecture · Stretch goals · What you should understand
├── starter/               # skeleton with tests for acceptance criteria
├── milestones/            # v1 (Ch 31), v2 (Ch 32–33): briefs + checkpoint tests
└── REVIEW.md              # self-review checklist
```

### Naming conventions

| Thing | Pattern | Example |
|---|---|---|
| Part | `NN-kebab-title` | `04-generics-and-type-transformations` |
| Chapter | `NN-kebab-short-title` (global number) | `17-generic-functions-and-constraints` |
| Lesson | `NN-kebab-section-title` (local number) | `04-keyof-with-generics` |
| Exercise | `l1-recall` … `l4-real-world` | `l3-challenge` |
| Project | `pNN-kebab-name`, `capstones/cN-name` | `p19-generic-data-table` |
| Example file | `NN-rung.ts(x)` | `02-larger.ts` |
