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

## 12.3 Complete tree: parts and chapters

```
typescript-react-book/
├── README.md
├── package.json, tsconfig.base.json, …             # root tooling (see 12.6)
├── curriculum/                                     # this design document (Sections 1–16)
├── front-matter/                                   # preface, how-to-read, reading paths, setup
├── 01-why-typescript/                              # Part I — Why TypeScript?
│   ├── README.md                                   # part introduction
│   ├── checkpoint/                                 # part checkpoint
│   ├── 01-the-story-so-far/                        # Ch 1 · 7 lessons
│   ├── 02-why-typescript/                          # Ch 2 · 11 lessons
│   ├── 03-how-typescript-works/                    # Ch 3 · 8 lessons
│   └── 04-javascript-checkpoint/                   # Ch 4 · 10 lessons
├── 02-typescript-foundations/                      # Part II — TypeScript Foundations
│   ├── README.md                                   # part introduction
│   ├── checkpoint/                                 # part checkpoint
│   ├── 05-first-program/                           # Ch 5 · 8 lessons
│   ├── 06-annotations-and-inference/               # Ch 6 · 7 lessons
│   ├── 07-arrays-tuples-objects/                   # Ch 7 · 7 lessons
│   ├── 08-naming-types/                            # Ch 8 · 7 lessons
│   └── 09-edge-types/                              # Ch 9 · 7 lessons
├── 03-thinking-in-types/                           # Part III — Thinking in Types
│   ├── README.md                                   # part introduction
│   ├── checkpoint/                                 # part checkpoint
│   ├── 10-the-type-system/                         # Ch 10 · 8 lessons
│   ├── 11-functions/                               # Ch 11 · 11 lessons
│   ├── 12-objects-and-interfaces/                  # Ch 12 · 8 lessons
│   ├── 13-unions-and-intersections/                # Ch 13 · 7 lessons
│   ├── 14-narrowing/                               # Ch 14 · 11 lessons
│   └── 15-classes/                                 # Ch 15 · 12 lessons
├── 04-generics-and-type-transformations/           # Part IV — Generics & Type Transformations
│   ├── README.md                                   # part introduction
│   ├── checkpoint/                                 # part checkpoint
│   ├── 16-why-generics/                            # Ch 16 · 6 lessons
│   ├── 17-generic-functions-and-constraints/       # Ch 17 · 7 lessons
│   ├── 18-generic-types/                           # Ch 18 · 7 lessons
│   ├── 19-reusable-generic-apis/                   # Ch 19 · 6 lessons
│   ├── 20-deriving-types/                          # Ch 20 · 7 lessons
│   ├── 21-utility-types/                           # Ch 21 · 10 lessons
│   ├── 22-mapped-types/                            # Ch 22 · 6 lessons
│   ├── 23-conditional-types/                       # Ch 23 · 6 lessons
│   └── 24-template-literals-and-custom-utilities/  # Ch 24 · 6 lessons
├── 05-toolchain-and-ecosystem/                     # Part V — The TypeScript Toolchain & Ecosystem
│   ├── README.md                                   # part introduction
│   ├── checkpoint/                                 # part checkpoint
│   ├── 25-modules/                                 # Ch 25 · 7 lessons
│   ├── 26-tsconfig/                                # Ch 26 · 9 lessons
│   ├── 27-everyday-toolchain/                      # Ch 27 · 7 lessons
│   ├── 28-declaration-files/                       # Ch 28 · 8 lessons
│   └── 29-js-interop-and-migration/                # Ch 29 · 7 lessons
├── 06-server-and-boundaries/                       # Part VI — TypeScript on the Server & at the Boundaries
│   ├── README.md                                   # part introduction
│   ├── checkpoint/                                 # part checkpoint
│   ├── 30-typescript-on-node/                      # Ch 30 · 7 lessons
│   ├── 31-typed-http-api/                          # Ch 31 · 8 lessons
│   ├── 32-runtime-safety/                          # Ch 32 · 10 lessons
│   └── 33-error-handling/                          # Ch 33 · 8 lessons
├── 07-from-language-to-interfaces/                 # Part VII — From Language to Interfaces
│   ├── README.md                                   # part introduction
│   ├── checkpoint/                                 # part checkpoint
│   ├── 34-the-bridge/                              # Ch 34 · 10 lessons
│   ├── 35-typing-the-dom/                          # Ch 35 · 9 lessons
│   └── 36-why-react/                               # Ch 36 · 10 lessons
├── 08-thinking-in-react/                           # Part VIII — Thinking in React
│   ├── README.md                                   # part introduction
│   ├── checkpoint/                                 # part checkpoint
│   ├── 37-react-mental-model/                      # Ch 37 · 8 lessons
│   ├── 38-jsx/                                     # Ch 38 · 7 lessons
│   ├── 39-components-props-composition/            # Ch 39 · 8 lessons
│   ├── 40-conditionals-lists-keys/                 # Ch 40 · 7 lessons
│   ├── 41-events-and-state/                        # Ch 41 · 8 lessons
│   ├── 42-thinking-in-state/                       # Ch 42 · 9 lessons
│   ├── 43-hooks-mental-model/                      # Ch 43 · 7 lessons
│   ├── 44-effects/                                 # Ch 44 · 9 lessons
│   ├── 45-refs/                                    # Ch 45 · 6 lessons
│   ├── 46-context/                                 # Ch 46 · 7 lessons
│   ├── 47-memoization/                             # Ch 47 · 8 lessons
│   └── 48-custom-hooks/                            # Ch 48 · 7 lessons
├── 09-react-typescript/                            # Part IX — React + TypeScript
│   ├── README.md                                   # part introduction
│   ├── checkpoint/                                 # part checkpoint
│   ├── 49-how-typescript-sees-react/               # Ch 49 · 7 lessons
│   ├── 50-typing-props/                            # Ch 50 · 8 lessons
│   ├── 51-typing-events/                           # Ch 51 · 10 lessons
│   ├── 52-typing-state/                            # Ch 52 · 8 lessons
│   ├── 53-typing-refs/                             # Ch 53 · 8 lessons
│   ├── 54-typed-context/                           # Ch 54 · 8 lessons
│   ├── 55-reducers/                                # Ch 55 · 8 lessons
│   ├── 56-typing-custom-hooks/                     # Ch 56 · 8 lessons
│   └── 57-generic-components/                      # Ch 57 · 7 lessons
├── 10-building-real-applications/                  # Part X — Building Real Applications
│   ├── README.md                                   # part introduction
│   ├── checkpoint/                                 # part checkpoint
│   ├── 58-application-architecture/                # Ch 58 · 10 lessons
│   ├── 59-routing/                                 # Ch 59 · 8 lessons
│   ├── 60-state-management/                        # Ch 60 · 7 lessons
│   ├── 61-data-fetching/                           # Ch 61 · 9 lessons
│   ├── 62-server-state/                            # Ch 62 · 8 lessons
│   ├── 63-typed-forms/                             # Ch 63 · 8 lessons
│   ├── 64-validation-and-form-abstractions/        # Ch 64 · 8 lessons
│   └── 65-auth/                                    # Ch 65 · 8 lessons
├── 11-testing/                                     # Part XI — Testing
│   ├── README.md                                   # part introduction
│   ├── checkpoint/                                 # part checkpoint
│   ├── 66-types-vs-tests/                          # Ch 66 · 7 lessons
│   ├── 67-unit-testing/                            # Ch 67 · 8 lessons
│   ├── 68-component-testing/                       # Ch 68 · 8 lessons
│   └── 69-integration-and-e2e/                     # Ch 69 · 8 lessons
├── 12-production/                                  # Part XII — Production-Ready React
│   ├── README.md                                   # part introduction
│   ├── checkpoint/                                 # part checkpoint
│   ├── 70-builds-and-code-splitting/               # Ch 70 · 8 lessons
│   ├── 71-error-boundaries/                        # Ch 71 · 8 lessons
│   ├── 72-rendering-performance/                   # Ch 72 · 8 lessons
│   ├── 73-accessibility/                           # Ch 73 · 8 lessons
│   ├── 74-security/                                # Ch 74 · 8 lessons
│   ├── 75-observability/                           # Ch 75 · 7 lessons
│   └── 76-ci-cd-and-maintainability/               # Ch 76 · 8 lessons
├── 13-advanced-typescript/                         # Part XIII — Advanced TypeScript
│   ├── README.md                                   # part introduction
│   ├── checkpoint/                                 # part checkpoint
│   ├── 77-variance-and-soundness/                  # Ch 77 · 8 lessons
│   ├── 78-branded-types/                           # Ch 78 · 8 lessons
│   ├── 79-advanced-conditional-types/              # Ch 79 · 8 lessons
│   ├── 80-advanced-mapped-and-recursive-types/     # Ch 80 · 7 lessons
│   ├── 81-template-literal-types-in-depth/         # Ch 81 · 7 lessons
│   ├── 82-advanced-generic-patterns/               # Ch 82 · 8 lessons
│   └── 83-type-level-programming/                  # Ch 83 · 8 lessons
├── 14-advanced-react-patterns/                     # Part XIV — Advanced React + TypeScript Patterns
│   ├── README.md                                   # part introduction
│   ├── checkpoint/                                 # part checkpoint
│   ├── 84-advanced-generic-components/             # Ch 84 · 7 lessons
│   ├── 85-discriminated-props/                     # Ch 85 · 7 lessons
│   ├── 86-polymorphic-components/                  # Ch 86 · 7 lessons
│   ├── 87-compound-components/                     # Ch 87 · 7 lessons
│   ├── 88-render-props-and-headless/               # Ch 88 · 7 lessons
│   └── 89-component-api-design/                    # Ch 89 · 8 lessons
├── 15-professional-engineering/                    # Part XV — Professional TypeScript & React Engineering
│   ├── README.md                                   # part introduction
│   ├── checkpoint/                                 # part checkpoint
│   ├── 90-architecture-at-scale/                   # Ch 90 · 8 lessons
│   ├── 91-reusable-types-and-public-apis/          # Ch 91 · 7 lessons
│   ├── 92-library-authoring/                       # Ch 92 · 9 lessons
│   ├── 93-design-systems/                          # Ch 93 · 8 lessons
│   ├── 94-monorepos/                               # Ch 94 · 8 lessons
│   ├── 95-compiler-performance/                    # Ch 95 · 8 lessons
│   ├── 96-frameworks-and-server-components/        # Ch 96 · 8 lessons
│   └── 97-team-practices/                          # Ch 97 · 8 lessons
├── 16-capstone/                                    # Part XVI — Capstone
│   ├── README.md                                   # part introduction
│   ├── checkpoint/                                 # part checkpoint
│   ├── 98-capstone-planning/                       # Ch 98 · 8 lessons
│   └── 99-capstone-build-and-review/               # Ch 99 · 9 lessons
├── projects/                                       # P01–P20 + capstones (see 12.5)
├── appendices/                                     # A–H
├── solutions/                                      # mirrors the tree above; kept on a separate branch
├── shared/                                         # configs, test utils, fixtures used across lessons
└── tools/                                          # scaffolding, exercise checker, book builder, link checker
```

## 12.4 Complete tree: every lesson folder

Each lesson folder below contains `README.md`, `examples/`, and `exercises/` (§12.2). Expand a part to see its lessons.

<details>
<summary><b>01-why-typescript/</b> — Part I: Why TypeScript? (4 chapters, 36 lessons)</summary>

```
01-why-typescript/
├── README.md
├── checkpoint/
├── 01-the-story-so-far/
│   ├── README.md
│   ├── 01-a-language-for-small-jobs/
│   ├── 02-javascript-escapes-the-browser-page/
│   ├── 03-the-cost-of-growth/
│   ├── 04-static-analysis-arrives/
│   ├── 05-the-ui-crisis-and-react/
│   ├── 06-why-typescript-plus-react-today/
│   ├── 07-the-map-of-this-book/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 02-why-typescript/
│   ├── README.md
│   ├── 01-what-javascript-was-designed-for/
│   ├── 02-dynamic-typing-at-scale/
│   ├── 03-runtime-type-errors/
│   ├── 04-silent-wrong-values/
│   ├── 05-refactoring-without-a-safety-net/
│   ├── 06-large-teams-and-invisible-contracts/
│   ├── 07-api-discoverability/
│   ├── 08-maintainability-over-years/
│   ├── 09-static-analysis/
│   ├── 10-why-microsoft-created-typescript/
│   ├── 11-a-superset-of-javascript/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 03-how-typescript-works/
│   ├── README.md
│   ├── 01-the-compiler-pipeline/
│   ├── 02-type-erasure/
│   ├── 03-compile-time-vs-runtime/
│   ├── 04-what-typescript-can-catch/
│   ├── 05-what-typescript-cannot-catch/
│   ├── 06-the-language-service/
│   ├── 07-why-javascript-is-still-fundamental/
│   ├── 08-the-layered-safety-model-preview/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
└── 04-javascript-checkpoint/
    ├── README.md
    ├── 01-variables-and-primitive-values/
    ├── 02-objects-and-arrays/
    ├── 03-functions-scope-and-closures/
    ├── 04-destructuring-rest-and-spread/
    ├── 05-classes-and-prototypes/
    ├── 06-modules-es-modules/
    ├── 07-promises-and-async-await/
    ├── 08-error-handling/
    ├── 09-dom-basics-and-browser-apis/
    ├── 10-your-readiness-verdict/
    └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
```

</details>

<details>
<summary><b>02-typescript-foundations/</b> — Part II: TypeScript Foundations (5 chapters, 36 lessons)</summary>

```
02-typescript-foundations/
├── README.md
├── checkpoint/
├── 05-first-program/
│   ├── README.md
│   ├── 01-installing-typescript/
│   ├── 02-running-tsc/
│   ├── 03-a-starter-tsconfig/
│   ├── 04-running-typescript-directly/
│   ├── 05-the-editor-as-your-teacher/
│   ├── 06-reading-typescript-error-messages/
│   ├── 07-the-typescript-playground/
│   ├── 08-project-typed-calculator-kickoff/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 06-annotations-and-inference/
│   ├── README.md
│   ├── 01-what-a-type-is/
│   ├── 02-primitive-types/
│   ├── 03-type-annotations/
│   ├── 04-type-inference/
│   ├── 05-const-vs-let-inference/
│   ├── 06-when-to-annotate/
│   ├── 07-type-errors-as-conversations/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 07-arrays-tuples-objects/
│   ├── README.md
│   ├── 01-array-types/
│   ├── 02-readonly-arrays/
│   ├── 03-tuples/
│   ├── 04-object-types/
│   ├── 05-optional-properties/
│   ├── 06-readonly-properties/
│   ├── 07-indexing-safely/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 08-naming-types/
│   ├── README.md
│   ├── 01-type-aliases/
│   ├── 02-interfaces/
│   ├── 03-literal-types/
│   ├── 04-literal-unions-as-vocabulary/
│   ├── 05-enums-and-why-many-teams-avoid-them/
│   ├── 06-as-const-first-look/
│   ├── 07-naming-conventions/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
└── 09-edge-types/
    ├── README.md
    ├── 01-any-the-escape-hatch/
    ├── 02-unknown-the-safe-anything/
    ├── 03-null-and-undefined/
    ├── 04-the-non-null-assertion/
    ├── 05-void/
    ├── 06-never/
    ├── 07-object-and-object/
    └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
```

</details>

<details>
<summary><b>03-thinking-in-types/</b> — Part III: Thinking in Types (6 chapters, 57 lessons)</summary>

```
03-thinking-in-types/
├── README.md
├── checkpoint/
├── 10-the-type-system/
│   ├── README.md
│   ├── 01-types-as-sets-of-values/
│   ├── 02-assignability/
│   ├── 03-structural-typing/
│   ├── 04-excess-property-checks/
│   ├── 05-widening-and-literal-inference/
│   ├── 06-two-worlds-type-space-and-value-space/
│   ├── 07-type-assertions-as/
│   ├── 08-unknown-and-never-revisited/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 11-functions/
│   ├── README.md
│   ├── 01-parameter-and-return-types/
│   ├── 02-optional-and-default-parameters/
│   ├── 03-rest-parameters-and-spread-arguments/
│   ├── 04-function-type-expressions/
│   ├── 05-callbacks/
│   ├── 06-higher-order-functions/
│   ├── 07-call-signatures-and-construct-signatures/
│   ├── 08-overloads/
│   ├── 09-typing-this/
│   ├── 10-async-functions/
│   ├── 11-generic-functions-preview/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 12-objects-and-interfaces/
│   ├── README.md
│   ├── 01-object-types-in-depth/
│   ├── 02-index-signatures-and-record/
│   ├── 03-interfaces-vs-type-aliases/
│   ├── 04-extending-interfaces/
│   ├── 05-composition-with-intersections/
│   ├── 06-declaration-merging/
│   ├── 07-recursive-types/
│   ├── 08-modeling-a-domain/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 13-unions-and-intersections/
│   ├── README.md
│   ├── 01-union-types/
│   ├── 02-literal-unions/
│   ├── 03-intersection-types/
│   ├── 04-the-set-view/
│   ├── 05-discriminated-unions/
│   ├── 06-making-illegal-states-unrepresentable/
│   ├── 07-designing-union-types/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 14-narrowing/
│   ├── README.md
│   ├── 01-typeof-narrowing/
│   ├── 02-truthiness-narrowing/
│   ├── 03-equality-narrowing/
│   ├── 04-the-in-operator/
│   ├── 05-instanceof/
│   ├── 06-narrowing-discriminated-unions/
│   ├── 07-control-flow-analysis/
│   ├── 08-user-defined-type-guards/
│   ├── 09-assertion-functions/
│   ├── 10-exhaustiveness-checking-with-never/
│   ├── 11-narrowing-unknown-errors/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
└── 15-classes/
    ├── README.md
    ├── 01-classes-and-constructors/
    ├── 02-access-modifiers/
    ├── 03-readonly-and-parameter-properties/
    ├── 04-getters-and-setters/
    ├── 05-static-members/
    ├── 06-implements/
    ├── 07-inheritance/
    ├── 08-abstract-classes/
    ├── 09-polymorphism/
    ├── 10-custom-error-classes/
    ├── 11-classes-vs-functions-and-types/
    ├── 12-decorators-orientation/
    └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
```

</details>

<details>
<summary><b>04-generics-and-type-transformations/</b> — Part IV: Generics & Type Transformations (9 chapters, 61 lessons)</summary>

```
04-generics-and-type-transformations/
├── README.md
├── checkpoint/
├── 16-why-generics/
│   ├── README.md
│   ├── 01-the-duplication-problem/
│   ├── 02-youve-used-generics-already/
│   ├── 03-type-parameters/
│   ├── 04-inference-at-the-call-site/
│   ├── 05-the-golden-rule/
│   ├── 06-generics-vs-unions-vs-unknown/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 17-generic-functions-and-constraints/
│   ├── README.md
│   ├── 01-multiple-type-parameters/
│   ├── 02-generic-constraints/
│   ├── 03-keyof/
│   ├── 04-keyof-with-generics/
│   ├── 05-indexed-access-in-generics/
│   ├── 06-constraints-that-reference-other-parameters/
│   ├── 07-when-constraints-make-apis-worse/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 18-generic-types/
│   ├── README.md
│   ├── 01-generic-type-aliases/
│   ├── 02-generic-interfaces/
│   ├── 03-generic-classes/
│   ├── 04-generic-defaults/
│   ├── 05-result-t-e/
│   ├── 06-generic-inference-in-depth/
│   ├── 07-variance-intuition-preview/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 19-reusable-generic-apis/
│   ├── README.md
│   ├── 01-inference-first-design/
│   ├── 02-practical-generic-patterns/
│   ├── 03-typed-key-value-registries/
│   ├── 04-testing-generic-code/
│   ├── 05-over-generic-smells/
│   ├── 06-documenting-generic-apis/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 20-deriving-types/
│   ├── README.md
│   ├── 01-typeof-in-type-position/
│   ├── 02-keyof-typeof/
│   ├── 03-indexed-access-types/
│   ├── 04-as-const-in-depth/
│   ├── 05-satisfies/
│   ├── 06-lookup-tables-instead-of-overloads/
│   ├── 07-deriving-types-from-config/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 21-utility-types/
│   ├── README.md
│   ├── 01-partial-and-required/
│   ├── 02-readonly/
│   ├── 03-pick-and-omit/
│   ├── 04-record/
│   ├── 05-exclude-extract-and-nonnullable/
│   ├── 06-returntype-and-parameters/
│   ├── 07-constructorparameters-and-instancetype/
│   ├── 08-awaited/
│   ├── 09-combining-utilities/
│   ├── 10-utility-types-in-the-wild/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 22-mapped-types/
│   ├── README.md
│   ├── 01-the-mapping-syntax/
│   ├── 02-rebuilding-partial-required-readonly-pick-and-record/
│   ├── 03-modifiers/
│   ├── 04-key-remapping-with-as/
│   ├── 05-homomorphic-mapped-types/
│   ├── 06-mapping-over-unions-of-keys/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 23-conditional-types/
│   ├── README.md
│   ├── 01-conditional-type-syntax/
│   ├── 02-distributive-conditional-types/
│   ├── 03-turning-distribution-off/
│   ├── 04-infer/
│   ├── 05-rebuilding-nonnullable-returntype-parameters-and-awaited/
│   ├── 06-conditional-types-in-function-signatures/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
└── 24-template-literals-and-custom-utilities/
    ├── README.md
    ├── 01-template-literal-types/
    ├── 02-intrinsic-string-types/
    ├── 03-key-remapping-with-template-literals/
    ├── 04-building-custom-utility-types/
    ├── 05-testing-custom-types/
    ├── 06-the-complexity-budget/
    └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
```

</details>

<details>
<summary><b>05-toolchain-and-ecosystem/</b> — Part V: The TypeScript Toolchain & Ecosystem (5 chapters, 38 lessons)</summary>

```
05-toolchain-and-ecosystem/
├── README.md
├── checkpoint/
├── 25-modules/
│   ├── README.md
│   ├── 01-why-two-module-systems-exist/
│   ├── 02-how-typescript-sees-a-module/
│   ├── 03-type-only-imports-and-exports/
│   ├── 04-verbatimmodulesyntax/
│   ├── 05-module-resolution/
│   ├── 06-esm-cjs-interoperability/
│   ├── 07-barrel-files/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 26-tsconfig/
│   ├── README.md
│   ├── 01-which-files-include-exclude-files-rootdir/
│   ├── 02-how-strict-the-strict-family/
│   ├── 03-what-comes-out-target-outdir-sourcemap-declaration/
│   ├── 04-what-environment-lib-types-module-moduleresolution/
│   ├── 05-transpiler-friendly-flags/
│   ├── 06-path-aliases/
│   ├── 07-extending-configs/
│   ├── 08-project-references-introduction/
│   ├── 09-recommended-configs/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 27-everyday-toolchain/
│   ├── README.md
│   ├── 01-running-ts-in-development/
│   ├── 02-eslint-with-typescript-eslint/
│   ├── 03-formatting-with-prettier/
│   ├── 04-vitest-in-depth/
│   ├── 05-type-tests-in-depth/
│   ├── 06-editor-integration-and-scripts/
│   ├── 07-git-hooks-orientation/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 28-declaration-files/
│   ├── README.md
│   ├── 01-what-declaration-files-are/
│   ├── 02-types-and-definitelytyped/
│   ├── 03-declare-and-ambient-declarations/
│   ├── 04-typing-an-untyped-library/
│   ├── 05-global-declarations/
│   ├── 06-module-augmentation/
│   ├── 07-declaration-merging-revisited/
│   ├── 08-generating-declarations/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
└── 29-js-interop-and-migration/
    ├── README.md
    ├── 01-allowjs-and-checkjs/
    ├── 02-jsdoc-types/
    ├── 03-mixed-js-ts-projects/
    ├── 04-a-gradual-migration-strategy/
    ├── 05-taming-legacy-code/
    ├── 06-strictness-migration/
    ├── 07-reducing-any/
    └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
```

</details>

<details>
<summary><b>06-server-and-boundaries/</b> — Part VI: TypeScript on the Server & at the Boundaries (4 chapters, 33 lessons)</summary>

```
06-server-and-boundaries/
├── README.md
├── checkpoint/
├── 30-typescript-on-node/
│   ├── README.md
│   ├── 01-setting-up-node-plus-typescript/
│   ├── 02-nodes-type-definitions/
│   ├── 03-environment-variables/
│   ├── 04-the-file-system/
│   ├── 05-async-patterns/
│   ├── 06-configuration-modules/
│   ├── 07-scripts-and-clis/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 31-typed-http-api/
│   ├── README.md
│   ├── 01-http-from-first-principles/
│   ├── 02-choosing-a-framework/
│   ├── 03-api-models-and-dtos/
│   ├── 04-typing-requests-and-responses/
│   ├── 05-service-layer/
│   ├── 06-repository-pattern/
│   ├── 07-database-types/
│   ├── 08-api-contracts/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 32-runtime-safety/
│   ├── README.md
│   ├── 01-what-typescript-believes-vs-what-runtime-receives/
│   ├── 02-mapping-your-applications-boundaries/
│   ├── 03-unknown-as-the-boundary-type/
│   ├── 04-hand-written-validation/
│   ├── 05-schema-validation/
│   ├── 06-types-inferred-from-schemas/
│   ├── 07-api-validation/
│   ├── 08-environment-validation/
│   ├── 09-user-input-and-external-files/
│   ├── 10-where-to-validate-and-where-not-to/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
└── 33-error-handling/
    ├── README.md
    ├── 01-expected-vs-unexpected-failures/
    ├── 02-exceptions-in-typescript/
    ├── 03-custom-error-hierarchies/
    ├── 04-result-types/
    ├── 05-translating-errors-between-layers/
    ├── 06-async-error-handling/
    ├── 07-logging-errors-usefully/
    ├── 08-designing-error-responses/
    └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
```

</details>

<details>
<summary><b>07-from-language-to-interfaces/</b> — Part VII: From Language to Interfaces (3 chapters, 29 lessons)</summary>

```
07-from-language-to-interfaces/
├── README.md
├── checkpoint/
├── 34-the-bridge/
│   ├── README.md
│   ├── 01-from-language-to-interfaces/
│   ├── 02-functions-become-components/
│   ├── 03-objects-and-destructuring-become-props/
│   ├── 04-modules-become-component-files/
│   ├── 05-interfaces-and-aliases-become-contracts/
│   ├── 06-unions-and-narrowing-become-ui-states/
│   ├── 07-generics-appear-in-hooks-and-components/
│   ├── 08-utility-types-shape-props/
│   ├── 09-inference-does-the-heavy-lifting/
│   ├── 10-bridge-self-check/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 35-typing-the-dom/
│   ├── README.md
│   ├── 01-lib-dom-d-ts/
│   ├── 02-the-element-hierarchy/
│   ├── 03-selecting-elements-safely/
│   ├── 04-typed-dom-events/
│   ├── 05-target-vs-currenttarget/
│   ├── 06-forms-and-inputs/
│   ├── 07-browser-apis-at-the-boundary/
│   ├── 08-building-vanilla-taskflow/
│   ├── 09-the-pain-log/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
└── 36-why-react/
    ├── README.md
    ├── 01-traditional-dom-manipulation/
    ├── 02-when-uis-get-complex/
    ├── 03-what-ui-state-is/
    ├── 04-synchronizing-state-with-the-dom/
    ├── 05-declarative-ui/
    ├── 06-component-based-thinking/
    ├── 07-reacts-core-idea/
    ├── 08-components-props-state-and-rendering/
    ├── 09-why-react-became-popular/
    ├── 10-why-typescript-plus-react/
    └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
```

</details>

<details>
<summary><b>08-thinking-in-react/</b> — Part VIII: Thinking in React (12 chapters, 91 lessons)</summary>

```
08-thinking-in-react/
├── README.md
├── checkpoint/
├── 37-react-mental-model/
│   ├── README.md
│   ├── 01-setting-up-react-with-vite-and-typescript/
│   ├── 02-ui-as-a-function-of-state/
│   ├── 03-components-return-descriptions/
│   ├── 04-trigger-render-commit/
│   ├── 05-the-render-tree/
│   ├── 06-purity/
│   ├── 07-what-react-is-and-isnt/
│   ├── 08-react-devtools/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 38-jsx/
│   ├── README.md
│   ├── 01-jsx-is-javascript/
│   ├── 02-expressions-in-braces/
│   ├── 03-attributes-become-props/
│   ├── 04-fragments/
│   ├── 05-what-renders-and-what-doesnt/
│   ├── 06-jsx-and-safety/
│   ├── 07-tsx-specifics/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 39-components-props-composition/
│   ├── README.md
│   ├── 01-defining-components/
│   ├── 02-props-as-parameters/
│   ├── 03-children/
│   ├── 04-composition-over-configuration/
│   ├── 05-passing-callbacks/
│   ├── 06-one-way-data-flow/
│   ├── 07-splitting-a-ui-into-components/
│   ├── 08-styling-components-orientation/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 40-conditionals-lists-keys/
│   ├── README.md
│   ├── 01-conditional-rendering-patterns/
│   ├── 02-the-and-and-pitfall/
│   ├── 03-rendering-lists/
│   ├── 04-keys-and-identity/
│   ├── 05-key-mistakes/
│   ├── 06-keys-as-a-reset-tool/
│   ├── 07-empty-states/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 41-events-and-state/
│   ├── README.md
│   ├── 01-responding-to-events/
│   ├── 02-why-local-variables-dont-work/
│   ├── 03-usestate/
│   ├── 04-state-as-a-snapshot/
│   ├── 05-batching-and-updater-functions/
│   ├── 06-updating-objects-in-state/
│   ├── 07-updating-arrays-in-state/
│   ├── 08-event-propagation/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 42-thinking-in-state/
│   ├── README.md
│   ├── 01-minimal-state/
│   ├── 02-derived-values/
│   ├── 03-principles-of-state-structure/
│   ├── 04-controlled-and-uncontrolled-inputs/
│   ├── 05-lifting-state-up/
│   ├── 06-sharing-state-between-siblings/
│   ├── 07-state-colocation/
│   ├── 08-preserving-and-resetting-state/
│   ├── 09-thinking-in-react-end-to-end/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 43-hooks-mental-model/
│   ├── README.md
│   ├── 01-what-a-hook-is/
│   ├── 02-the-rules-of-hooks-and-why/
│   ├── 03-the-question-hook-map/
│   ├── 04-hooks-compose/
│   ├── 05-hooks-and-the-render-cycle/
│   ├── 06-linting-the-rules/
│   ├── 07-the-react-compiler-briefly/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 44-effects/
│   ├── README.md
│   ├── 01-effects-are-for-synchronization/
│   ├── 02-anatomy-of-an-effect/
│   ├── 03-the-dependency-array/
│   ├── 04-cleanup/
│   ├── 05-strict-modes-double-effect/
│   ├── 06-fetching-in-an-effect/
│   ├── 07-you-might-not-need-an-effect/
│   ├── 08-separating-events-from-effects/
│   ├── 09-common-effect-bugs/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 45-refs/
│   ├── README.md
│   ├── 01-refs-vs-state/
│   ├── 02-storing-values-across-renders/
│   ├── 03-referencing-dom-elements/
│   ├── 04-managing-focus/
│   ├── 05-ref-pitfalls/
│   ├── 06-refs-as-props/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 46-context/
│   ├── README.md
│   ├── 01-the-prop-drilling-problem/
│   ├── 02-creating-and-providing-context/
│   ├── 03-consuming-context/
│   ├── 04-context-with-state/
│   ├── 05-when-to-use-context/
│   ├── 06-context-and-re-renders/
│   ├── 07-composition-before-context/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 47-memoization/
│   ├── README.md
│   ├── 01-referential-identity/
│   ├── 02-when-re-renders-are-a-problem/
│   ├── 03-memo/
│   ├── 04-usememo/
│   ├── 05-usecallback/
│   ├── 06-the-cost-of-memoization/
│   ├── 07-the-react-compiler/
│   ├── 08-a-decision-checklist/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
└── 48-custom-hooks/
    ├── README.md
    ├── 01-extracting-a-custom-hook/
    ├── 02-naming-and-rules/
    ├── 03-logic-not-state/
    ├── 04-designing-a-hooks-interface/
    ├── 05-common-custom-hooks/
    ├── 06-when-not-to-make-a-hook/
    ├── 07-testing-hooks-preview/
    └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
```

</details>

<details>
<summary><b>09-react-typescript/</b> — Part IX: React + TypeScript (9 chapters, 72 lessons)</summary>

```
09-react-typescript/
├── README.md
├── checkpoint/
├── 49-how-typescript-sees-react/
│   ├── README.md
│   ├── 01-how-jsx-is-type-checked/
│   ├── 02-where-reacts-types-come-from/
│   ├── 03-reactnode-vs-reactelement-vs-jsx-element/
│   ├── 04-typing-function-components/
│   ├── 05-intrinsic-element-props/
│   ├── 06-reading-reacts-type-definitions/
│   ├── 07-legacy-types-youll-meet/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 50-typing-props/
│   ├── README.md
│   ├── 01-props-types/
│   ├── 02-optional-props-and-defaults/
│   ├── 03-typing-children/
│   ├── 04-callback-props/
│   ├── 05-slot-props/
│   ├── 06-extending-native-elements/
│   ├── 07-discriminated-props-first-look/
│   ├── 08-designing-component-apis/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 51-typing-events/
│   ├── README.md
│   ├── 01-synthetic-events/
│   ├── 02-inline-handlers-and-contextual-typing/
│   ├── 03-extracted-handlers/
│   ├── 04-mouse-and-pointer-events/
│   ├── 05-keyboard-events/
│   ├── 06-change-events/
│   ├── 07-form-and-submit-events/
│   ├── 08-focus-events/
│   ├── 09-target-vs-currenttarget-in-react/
│   ├── 10-discovering-event-types/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 52-typing-state/
│   ├── README.md
│   ├── 01-usestate-inference/
│   ├── 02-explicit-state-types/
│   ├── 03-nullable-state/
│   ├── 04-union-state/
│   ├── 05-object-and-array-state/
│   ├── 06-discriminated-state/
│   ├── 07-lazy-initial-state/
│   ├── 08-from-boolean-soup-to-a-state-machine/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 53-typing-refs/
│   ├── README.md
│   ├── 01-dom-refs/
│   ├── 02-mutable-value-refs/
│   ├── 03-modern-ref-typings/
│   ├── 04-refs-as-props/
│   ├── 05-callback-refs/
│   ├── 06-forwardref-in-existing-code/
│   ├── 07-useimperativehandle/
│   ├── 08-merging-refs/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 54-typed-context/
│   ├── README.md
│   ├── 01-createcontext-typing/
│   ├── 02-the-default-value-problem/
│   ├── 03-the-safe-context-pattern/
│   ├── 04-typed-provider-components/
│   ├── 05-consumers-through-hooks/
│   ├── 06-context-plus-reducer/
│   ├── 07-splitting-contexts/
│   ├── 08-modern-context-syntax/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 55-reducers/
│   ├── README.md
│   ├── 01-when-transitions-get-complex/
│   ├── 02-usereducer/
│   ├── 03-actions-as-discriminated-unions/
│   ├── 04-exhaustive-reducers/
│   ├── 05-modeling-state-and-actions-together/
│   ├── 06-typed-dispatch-helpers/
│   ├── 07-reducer-plus-context/
│   ├── 08-testing-reducers/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 56-typing-custom-hooks/
│   ├── README.md
│   ├── 01-typed-parameters/
│   ├── 02-typed-return-values/
│   ├── 03-inferred-vs-explicit-return-types/
│   ├── 04-generic-custom-hooks/
│   ├── 05-parsers-instead-of-lies/
│   ├── 06-reusable-hook-apis/
│   ├── 07-typing-hooks-that-wrap-libraries/
│   ├── 08-type-tests-for-hooks/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
└── 57-generic-components/
    ├── README.md
    ├── 01-why-generic-components/
    ├── 02-declaring-a-generic-component/
    ├── 03-inference-from-props/
    ├── 04-constraining-t/
    ├── 05-a-generic-select/
    ├── 06-limits-and-pitfalls/
    ├── 07-when-not-to/
    └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
```

</details>

<details>
<summary><b>10-building-real-applications/</b> — Part X: Building Real Applications (8 chapters, 66 lessons)</summary>

```
10-building-real-applications/
├── README.md
├── checkpoint/
├── 58-application-architecture/
│   ├── README.md
│   ├── 01-why-structure-matters/
│   ├── 02-by-type-vs-by-feature/
│   ├── 03-feature-modules/
│   ├── 04-layers-in-a-frontend/
│   ├── 05-where-types-live/
│   ├── 06-dependency-rules/
│   ├── 07-shared-components/
│   ├── 08-environment-configuration/
│   ├── 09-a-styling-strategy/
│   ├── 10-scaffolding-taskflow-web/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 59-routing/
│   ├── README.md
│   ├── 01-why-routing/
│   ├── 02-routes-nested-routes-and-layouts/
│   ├── 03-route-params-and-their-types/
│   ├── 04-search-params-as-state/
│   ├── 05-navigation/
│   ├── 06-not-found-and-error-routes/
│   ├── 07-lazy-routes/
│   ├── 08-type-safe-routing/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 60-state-management/
│   ├── README.md
│   ├── 01-the-five-kinds-of-state/
│   ├── 02-server-state-is-not-client-state/
│   ├── 03-choosing-a-home/
│   ├── 04-context-plus-reducer-at-app-scale/
│   ├── 05-external-stores/
│   ├── 06-derived-state-across-features/
│   ├── 07-avoiding-global-state-sprawl/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 61-data-fetching/
│   ├── README.md
│   ├── 01-what-typescript-believes-vs-what-the-server-returned/
│   ├── 02-dtos-vs-domain-models-on-the-client/
│   ├── 03-reusing-the-typed-api-client/
│   ├── 04-validating-responses/
│   ├── 05-transforming-api-responses/
│   ├── 06-typing-api-errors/
│   ├── 07-loading-error-empty-and-success-states/
│   ├── 08-a-hand-rolled-usequery/
│   ├── 09-request-types-and-mutations/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 62-server-state/
│   ├── README.md
│   ├── 01-what-a-server-state-library-solves/
│   ├── 02-queries/
│   ├── 03-query-keys/
│   ├── 04-mutations/
│   ├── 05-optimistic-updates/
│   ├── 06-suspense-queries-and-error-boundaries/
│   ├── 07-pagination-and-infinite-queries/
│   ├── 08-devtools-and-testing/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 63-typed-forms/
│   ├── README.md
│   ├── 01-typed-form-state/
│   ├── 02-form-events/
│   ├── 03-a-typed-change-handler/
│   ├── 04-submission/
│   ├── 05-client-side-validation/
│   ├── 06-touched-dirty-and-error-display/
│   ├── 07-accessible-forms/
│   ├── 08-building-useform-t/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 64-validation-and-form-abstractions/
│   ├── README.md
│   ├── 01-one-schema-two-sides/
│   ├── 02-runtime-schemas-for-forms/
│   ├── 03-server-validation-errors/
│   ├── 04-error-typing/
│   ├── 05-form-libraries/
│   ├── 06-react-actions/
│   ├── 07-reusable-form-components/
│   ├── 08-type-safe-form-abstractions/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
└── 65-auth/
    ├── README.md
    ├── 01-authentication-concepts/
    ├── 02-where-credentials-live/
    ├── 03-auth-state-as-a-discriminated-union/
    ├── 04-authprovider-and-useauth/
    ├── 05-protected-routes-and-redirects/
    ├── 06-modeling-authorization/
    ├── 07-401-and-403-in-the-api-client/
    ├── 08-ui-authorization-is-not-security/
    └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
```

</details>

<details>
<summary><b>11-testing/</b> — Part XI: Testing (4 chapters, 31 lessons)</summary>

```
11-testing/
├── README.md
├── checkpoint/
├── 66-types-vs-tests/
│   ├── README.md
│   ├── 01-the-layered-safety-model/
│   ├── 02-what-types-prove/
│   ├── 03-what-only-tests-prove/
│   ├── 04-what-only-runtime-validation-proves/
│   ├── 05-choosing-test-levels/
│   ├── 06-a-test-strategy-for-taskflow-web/
│   ├── 07-dont-test-what-the-compiler-guarantees/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 67-unit-testing/
│   ├── README.md
│   ├── 01-testing-pure-logic/
│   ├── 02-testing-reducers/
│   ├── 03-testing-custom-hooks/
│   ├── 04-hooks-that-need-context/
│   ├── 05-fake-timers-and-async-logic/
│   ├── 06-type-safe-mocks/
│   ├── 07-test-data-factories/
│   ├── 08-type-tests-for-app-code/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 68-component-testing/
│   ├── README.md
│   ├── 01-testing-like-a-user/
│   ├── 02-rendering-with-providers/
│   ├── 03-user-interactions/
│   ├── 04-async-ui/
│   ├── 05-testing-loading-and-error-states/
│   ├── 06-testing-forms/
│   ├── 07-accessibility-in-tests/
│   ├── 08-what-not-to-test/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
└── 69-integration-and-e2e/
    ├── README.md
    ├── 01-integration-tests/
    ├── 02-api-mocking-with-msw/
    ├── 03-preventing-contract-drift/
    ├── 04-error-and-edge-cases/
    ├── 05-testing-routing-and-auth-flows/
    ├── 06-end-to-end-tests-with-playwright/
    ├── 07-flaky-tests/
    ├── 08-tests-in-ci/
    └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
```

</details>

<details>
<summary><b>12-production/</b> — Part XII: Production-Ready React (7 chapters, 55 lessons)</summary>

```
12-production/
├── README.md
├── checkpoint/
├── 70-builds-and-code-splitting/
│   ├── README.md
│   ├── 01-what-a-production-build-does/
│   ├── 02-build-configuration/
│   ├── 03-source-maps-in-production/
│   ├── 04-analyzing-bundles/
│   ├── 05-code-splitting/
│   ├── 06-route-based-splitting-and-preloading/
│   ├── 07-bundle-considerations/
│   ├── 08-deploying-a-static-spa/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 71-error-boundaries/
│   ├── README.md
│   ├── 01-what-happens-when-a-component-throws/
│   ├── 02-error-boundaries/
│   ├── 03-using-a-boundary-library/
│   ├── 04-where-to-place-boundaries/
│   ├── 05-what-boundaries-dont-catch/
│   ├── 06-route-level-errors/
│   ├── 07-reporting-errors/
│   ├── 08-designing-fallback-ui/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 72-rendering-performance/
│   ├── README.md
│   ├── 01-measuring-first/
│   ├── 02-why-components-re-render/
│   ├── 03-structural-fixes/
│   ├── 04-memoization-with-evidence/
│   ├── 05-transitions/
│   ├── 06-virtualizing-long-lists/
│   ├── 07-context-performance/
│   ├── 08-performance-budgets/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 73-accessibility/
│   ├── README.md
│   ├── 01-why-accessibility-is-a-requirement/
│   ├── 02-semantic-html-first/
│   ├── 03-keyboard-navigation/
│   ├── 04-focus-management/
│   ├── 05-aria-when-needed/
│   ├── 06-accessible-forms-and-errors/
│   ├── 07-color-motion-and-preferences/
│   ├── 08-testing-accessibility/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 74-security/
│   ├── README.md
│   ├── 01-the-frontend-threat-model/
│   ├── 02-xss/
│   ├── 03-url-and-attribute-injection/
│   ├── 04-tokens-and-sessions/
│   ├── 05-secrets-and-env-vars/
│   ├── 06-dependency-and-supply-chain-risk/
│   ├── 07-content-security-policy/
│   ├── 08-never-trust-the-client/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 75-observability/
│   ├── README.md
│   ├── 01-why-observability/
│   ├── 02-structured-logging-in-the-browser/
│   ├── 03-error-tracking/
│   ├── 04-typed-analytics-events/
│   ├── 05-performance-monitoring/
│   ├── 06-feature-flags/
│   ├── 07-privacy-and-consent/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
└── 76-ci-cd-and-maintainability/
    ├── README.md
    ├── 01-a-ci-pipeline-for-typescript-plus-react/
    ├── 02-speed-and-caching/
    ├── 03-preview-deployments-and-required-checks/
    ├── 04-continuous-delivery/
    ├── 05-dependency-updates/
    ├── 06-maintainability-practices/
    ├── 07-documentation-that-stays-current/
    ├── 08-the-production-checklist/
    └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
```

</details>

<details>
<summary><b>13-advanced-typescript/</b> — Part XIII: Advanced TypeScript (7 chapters, 54 lessons)</summary>

```
13-advanced-typescript/
├── README.md
├── checkpoint/
├── 77-variance-and-soundness/
│   ├── README.md
│   ├── 01-assignability-revisited/
│   ├── 02-covariance/
│   ├── 03-contravariance/
│   ├── 04-bivariance-and-method-shorthand/
│   ├── 05-invariance/
│   ├── 06-variance-annotations/
│   ├── 07-where-typescript-is-unsound-on-purpose/
│   ├── 08-variance-in-api-design/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 78-branded-types/
│   ├── README.md
│   ├── 01-when-structural-identity-hurts/
│   ├── 02-branding-with-intersections/
│   ├── 03-unique-symbol-brands/
│   ├── 04-smart-constructors/
│   ├── 05-units-and-value-objects/
│   ├── 06-opaque-types-across-modules/
│   ├── 07-brands-at-the-boundary/
│   ├── 08-when-brands-are-overkill/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 79-advanced-conditional-types/
│   ├── README.md
│   ├── 01-conditional-types-through-the-set-model/
│   ├── 02-controlling-distribution/
│   ├── 03-infer-in-every-position/
│   ├── 04-infer-with-constraints/
│   ├── 05-recursive-conditional-types/
│   ├── 06-generics-in-implementations/
│   ├── 07-reading-library-grade-types/
│   ├── 08-friendlier-type-errors/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 80-advanced-mapped-and-recursive-types/
│   ├── README.md
│   ├── 01-key-remapping-in-depth/
│   ├── 02-mapping-over-unions-of-objects/
│   ├── 03-recursive-types-revisited/
│   ├── 04-recursive-utility-types/
│   ├── 05-path-types/
│   ├── 06-recursion-limits-and-performance/
│   ├── 07-when-deep-types-are-a-smell/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 81-template-literal-types-in-depth/
│   ├── README.md
│   ├── 01-review-and-composition/
│   ├── 02-parsing-strings-with-infer/
│   ├── 03-typed-routes/
│   ├── 04-typed-event-and-message-names/
│   ├── 05-css-and-design-token-strings/
│   ├── 06-limits/
│   ├── 07-when-to-stop/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 82-advanced-generic-patterns/
│   ├── README.md
│   ├── 01-const-type-parameters/
│   ├── 02-noinfer-and-inference-control/
│   ├── 03-builder-patterns/
│   ├── 04-higher-order-generics/
│   ├── 05-typed-factories-and-dependency-injection/
│   ├── 06-overloads-vs-conditional-return-types/
│   ├── 07-designing-for-inference/
│   ├── 08-case-study-a-typed-filter-query-api/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
└── 83-type-level-programming/
    ├── README.md
    ├── 01-types-as-a-programming-language/
    ├── 02-tuple-manipulation/
    ├── 03-type-level-arithmetic/
    ├── 04-how-schema-libraries-infer-types/
    ├── 05-how-end-to-end-typed-apis-work/
    ├── 06-how-typed-query-builders-work/
    ├── 07-designing-a-small-type-safe-dsl/
    ├── 08-the-cost-of-cleverness/
    └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
```

</details>

<details>
<summary><b>14-advanced-react-patterns/</b> — Part XIV: Advanced React + TypeScript Patterns (6 chapters, 43 lessons)</summary>

```
14-advanced-react-patterns/
├── README.md
├── checkpoint/
├── 84-advanced-generic-components/
│   ├── README.md
│   ├── 01-generic-components-revisited/
│   ├── 02-typed-column-definitions/
│   ├── 03-generic-hooks-for-tables/
│   ├── 04-generic-components-with-refs/
│   ├── 05-generics-and-wrappers/
│   ├── 06-controlled-and-uncontrolled-generic-components/
│   ├── 07-useful-unnecessary/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 85-discriminated-props/
│   ├── README.md
│   ├── 01-props-that-depend-on-each-other/
│   ├── 02-discriminated-props/
│   ├── 03-mutually-exclusive-props/
│   ├── 04-xor-helper-types/
│   ├── 05-controlled-vs-uncontrolled-props/
│   ├── 06-narrowing-destructured-props/
│   ├── 07-useful-unnecessary/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 86-polymorphic-components/
│   ├── README.md
│   ├── 01-the-problem/
│   ├── 02-the-as-prop/
│   ├── 03-typing-polymorphic-props/
│   ├── 04-refs-in-polymorphic-components/
│   ├── 05-the-aschild-slot-pattern/
│   ├── 06-costs/
│   ├── 07-useful-unnecessary/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 87-compound-components/
│   ├── README.md
│   ├── 01-the-configuration-object-problem/
│   ├── 02-compound-components/
│   ├── 03-shared-state-via-typed-context/
│   ├── 04-typing-the-namespace/
│   ├── 05-controlled-compound-components/
│   ├── 06-accessibility/
│   ├── 07-useful-unnecessary/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 88-render-props-and-headless/
│   ├── README.md
│   ├── 01-inversion-of-control/
│   ├── 02-typed-render-props/
│   ├── 03-hooks-replaced-most-render-props/
│   ├── 04-headless-components/
│   ├── 05-prop-getters/
│   ├── 06-slots-revisited/
│   ├── 07-useful-unnecessary/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
└── 89-component-api-design/
    ├── README.md
    ├── 01-the-complexity-ladder/
    ├── 02-a-decision-guide/
    ├── 03-consistency-across-a-component-set/
    ├── 04-refs-native-props-and-accessibility/
    ├── 05-typing-variants/
    ├── 06-documenting-component-apis/
    ├── 07-de-abstraction/
    ├── 08-principles-of-type-safe-component-libraries/
    └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
```

</details>

<details>
<summary><b>15-professional-engineering/</b> — Part XV: Professional TypeScript & React Engineering (8 chapters, 64 lessons)</summary>

```
15-professional-engineering/
├── README.md
├── checkpoint/
├── 90-architecture-at-scale/
│   ├── README.md
│   ├── 01-what-changes-at-scale/
│   ├── 02-domain-modeling-with-types/
│   ├── 03-bounded-contexts-in-a-frontend/
│   ├── 04-ports-and-adapters-for-ui-apps/
│   ├── 05-state-architecture-at-scale/
│   ├── 06-shared-types-vs-coupling/
│   ├── 07-enforcing-architecture/
│   ├── 08-architecture-decision-records/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 91-reusable-types-and-public-apis/
│   ├── README.md
│   ├── 01-types-as-api-surface/
│   ├── 02-inference-first-public-apis/
│   ├── 03-accept-wide-return-narrow/
│   ├── 04-managing-complex-generics/
│   ├── 05-avoiding-over-engineering/
│   ├── 06-evolving-types-safely/
│   ├── 07-documenting-types/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 92-library-authoring/
│   ├── README.md
│   ├── 01-anatomy-of-a-typescript-package/
│   ├── 02-esm-first-and-dual-publishing/
│   ├── 03-declaration-output/
│   ├── 04-build-tools-for-libraries/
│   ├── 05-validating-packages/
│   ├── 06-semantic-versioning-for-types/
│   ├── 07-api-reports-and-compatibility/
│   ├── 08-release-automation/
│   ├── 09-maintaining-declarations/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 93-design-systems/
│   ├── README.md
│   ├── 01-what-a-design-system-is/
│   ├── 02-design-tokens-as-typed-data/
│   ├── 03-primitives-vs-composites/
│   ├── 04-building-on-accessible-headless-primitives/
│   ├── 05-theming-with-types/
│   ├── 06-documentation/
│   ├── 07-testing-a-component-library/
│   ├── 08-versioning-migration-and-adoption/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 94-monorepos/
│   ├── README.md
│   ├── 01-why-monorepos/
│   ├── 02-workspaces/
│   ├── 03-internal-packages/
│   ├── 04-project-references-at-scale/
│   ├── 05-shared-configs/
│   ├── 06-shared-contract-packages/
│   ├── 07-task-orchestration-and-caching/
│   ├── 08-enforcing-package-boundaries/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 95-compiler-performance/
│   ├── README.md
│   ├── 01-where-the-checker-spends-time/
│   ├── 02-measuring/
│   ├── 03-expensive-types/
│   ├── 04-cheaper-patterns/
│   ├── 05-project-structure-for-speed/
│   ├── 06-editor-performance/
│   ├── 07-the-native-compiler/
│   ├── 08-type-performance-budgets/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
├── 96-frameworks-and-server-components/
│   ├── README.md
│   ├── 01-rendering-strategies/
│   ├── 02-why-frameworks/
│   ├── 03-server-components/
│   ├── 04-client-components-and-the-boundary/
│   ├── 05-the-serialization-boundary/
│   ├── 06-server-functions-and-actions/
│   ├── 07-data-fetching-on-the-server/
│   ├── 08-choosing-spa-or-framework/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
└── 97-team-practices/
    ├── README.md
    ├── 01-reviewing-typescript-plus-react-code/
    ├── 02-type-smells-in-review/
    ├── 03-reviewing-for-simplicity/
    ├── 04-team-conventions/
    ├── 05-documentation/
    ├── 06-trade-offs-as-team-decisions/
    ├── 07-maintaining-large-codebases/
    ├── 08-growing-as-an-engineer/
    └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
```

</details>

<details>
<summary><b>16-capstone/</b> — Part XVI: Capstone (2 chapters, 17 lessons)</summary>

```
16-capstone/
├── README.md
├── checkpoint/
├── 98-capstone-planning/
│   ├── README.md
│   ├── 01-choosing-your-track/
│   ├── 02-from-brief-to-user-stories/
│   ├── 03-modeling-the-domain-in-types/
│   ├── 04-designing-the-api-contract/
│   ├── 05-architecture-and-package-boundaries/
│   ├── 06-planning-state-data-and-errors/
│   ├── 07-quality-strategy/
│   ├── 08-milestones-and-scope-control/
│   └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
└── 99-capstone-build-and-review/
    ├── README.md
    ├── 01-the-walking-skeleton/
    ├── 02-building-feature-slices-end-to-end/
    ├── 03-hardening/
    ├── 04-performance-and-accessibility-passes/
    ├── 05-observability-and-operations/
    ├── 06-documentation-and-the-architecture-review/
    ├── 07-self-review-against-the-rubric/
    ├── 08-presenting-your-work/
    ├── 09-whats-next/
    └── exercises/  (l1-recall · l2-application · l3-challenge · l4-real-world)
```

</details>

## 12.5 Projects folder

```
projects/
├── p01-typed-calculator/                     # Typed Calculator
├── p02-taskflow-core/                        # TaskFlow Core
├── p03-utility-toolkit/                      # Utility Toolkit
├── p04-generic-utility-library/              # Generic Utility Library
├── p05-type-safe-event-emitter/              # Type-Safe Event Emitter
├── p06-legacy-js-to-ts-migration/            # Legacy JS → TS Migration
├── p07-taskflow-api/                         # TaskFlow API
├── p08-typed-api-client/                     # Typed API Client
├── p09-vanilla-taskflow/                     # Vanilla TaskFlow
├── p10-component-gallery/                    # Component Gallery
├── p11-taskflow-react/                       # TaskFlow in React
├── p12-react-dashboard/                      # React Dashboard
├── p13-typed-forms-kit/                      # Typed Forms Kit
├── p14-taskflow-web/                         # TaskFlow Web
├── p15-authentication-system/                # Authentication System
├── p16-taskflow-web-test-suite/              # TaskFlow Web Test Suite
├── p17-complex-dashboard/                    # Complex Dashboard (Production)
├── p18-runtime-validation-library/           # Runtime Validation Library
├── p19-generic-data-table/                   # Generic Data Table
├── p20-component-library/                    # Component Library
├── capstones/c1-teamboard/                   # Capstone: Teamboard
├── capstones/c2-ledgerly/                    # Capstone: Ledgerly
└── capstones/c3-library-track/               # Capstone: Library track
```

## 12.6 Root, shared, and tooling folders

```
typescript-react-book/
├── package.json               # workspace scripts: test, typecheck, lint, check:exercise <path>
├── pnpm-workspace.yaml        # projects/*, projects/capstones/*, shared/* (lessons run from the root package)
├── tsconfig.base.json         # strict + noUncheckedIndexedAccess + verbatimModuleSyntax
├── eslint.config.js           # typescript-eslint (type-aware) + react-hooks + jsx-a11y
├── vitest.workspace.ts        # one runner for all lessons and projects
├── shared/
│   ├── tsconfig/              # node.json · react.json · library.json (Ch 26 templates)
│   ├── test-utils/            # typed custom render, MSW server, factories (Part XI)
│   └── fixtures/              # schema-validated sample data (TaskFlow, dashboards)
├── appendices/                # A–H (see the table of contents)
├── front-matter/              # preface, how-to-read, reading paths, setup
├── solutions/                 # mirrors parts/ and projects/; separate branch recommended
└── tools/
    ├── scaffold.ts            # creates part/chapter/lesson folders from the curriculum
    ├── check-exercise.ts      # runs one exercise's runtime + type tests with friendly output
    ├── build-book.ts          # concatenates READMEs in order → e-book (EPUB/PDF/web)
    └── lint-links.ts          # verifies cross-chapter links ("🔗 Ch 32") resolve
```

## 12.7 How the repository becomes the e-book

```
lesson README.md files ──┐
chapter README.md files ─┼──► tools/build-book.ts ──► ordered manuscript ──► web book / EPUB / PDF
part README.md files ────┘        (numbering, callout styling, cross-links, code from examples/)
examples/*.ts ───────────────► embedded into the manuscript by reference, so code in the book is
                               always the code that compiles and passes tests in CI
```

**Why this matters:** every code sample in the published book is type-checked and tested on every commit, so the book can't ship a snippet that doesn't compile.

---
**Previous:** [← 11. Table of Contents](11-table-of-contents.md) · **Next:** [13. Roadmap → Book → Folder Mapping →](13-roadmap-book-folder-mapping.md)
