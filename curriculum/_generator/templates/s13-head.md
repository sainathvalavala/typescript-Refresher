# 13. Roadmap → Book → Folder Mapping

> How the three structures (the learning roadmap, the book, and the repository) line up, so a learner can always answer: *Where am I? What am I reading? What should I practice? What should I build?*

---

## 13.1 The chain

```
Learning Roadmap      Stage 3 — Abstraction with Types              "what I'm learning to do"
      ↓
Book Part             Book One · Part IV — Generics & Type Transformations
      ↓
Chapter               Chapter 17 — Generic Functions, Constraints & keyof
      ↓
Lesson (= section)    17.4 keyof with generics
      ↓
Folder                04-generics-and-type-transformations/17-generic-functions-and-constraints/04-keyof-with-generics/
      ↓
Examples              …/04-keyof-with-generics/examples/01-tiny.ts · 02-larger.ts · 03-realistic.ts
      ↓
Exercises             …/04-keyof-with-generics/exercises/   (lesson drills)
                      …/17-generic-functions-and-constraints/exercises/l1-recall … l4-real-world
      ↓
Project               projects/p04-generic-utility-library/   (milestone: sortBy, pick, groupBy)
      ↓
Checkpoint            04-generics-and-type-transformations/checkpoint/
```

## 13.2 The five questions, and where each is answered

| Learner's question | Answered by | Where to look |
|---|---|---|
| "Where am I in the roadmap?" | Stage | The breadcrumb at the top of every README (§13.3); Section 4 |
| "Which chapter am I reading?" | Chapter number + title | Chapter `README.md`; Section 11 |
| "Which lesson am I studying?" | Section number (e.g., 17.4) | Lesson `README.md`; lesson folder name |
| "What should I practice?" | Lesson drills, then chapter L1–L4 | `exercises/` in the lesson, then in the chapter |
| "What project should I build?" | Part project(s) | Part `README.md`; §13.4; `projects/` |

## 13.3 The breadcrumb header

Every part, chapter, and lesson README starts with the same breadcrumb, so position is never ambiguous:

```markdown
> 🧭 **Stage 3 — Abstraction with Types** › Book One › **Part IV — Generics & Type Transformations**
> › **Ch 17 — Generic Functions, Constraints & keyof** › **17.4 keyof with generics**
> 🟡 Intermediate · Essential · ⏱ ~40 min · Prereqs: 17.3, Ch 12
> 🛠 Practice: `exercises/` → chapter `l2-application` · Project: P04 (sortBy milestone)
```

Below the breadcrumb, each lesson ends with **"Next: 17.5 Indexed access in generics →"**, and the last lesson of a chapter links to the chapter exercises and then the next chapter.
