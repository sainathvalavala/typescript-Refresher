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

## 13.4 Part-level mapping

| Roadmap stage | Book | Part | Chapters | Part folder | Projects | Checkpoint |
|---|---|---|---|---|---|---|
| Stage 0 — Orientation | Book One | I — Why TypeScript? | 1–4 | `01-why-typescript/` | — | `01-why-typescript/checkpoint/` |
| Stage 1 — Language Foundations | Book One | II — TypeScript Foundations | 5–9 | `02-typescript-foundations/` | P01 | `02-typescript-foundations/checkpoint/` |
| Stage 2 — Thinking in Types | Book One | III — Thinking in Types | 10–15 | `03-thinking-in-types/` | P02, P03 | `03-thinking-in-types/checkpoint/` |
| Stage 3 — Abstraction with Types | Book One | IV — Generics & Type Transformations | 16–24 | `04-generics-and-type-transformations/` | P04, P05 | `04-generics-and-type-transformations/checkpoint/` |
| Stage 4 — TypeScript in Real Projects | Book One | V — The TypeScript Toolchain & Ecosystem | 25–29 | `05-toolchain-and-ecosystem/` | P06 | `05-toolchain-and-ecosystem/checkpoint/` |
| Stage 4 — TypeScript in Real Projects | Book One | VI — TypeScript on the Server & at the Boundaries | 30–33 | `06-server-and-boundaries/` | P07, P08 | `06-server-and-boundaries/checkpoint/` |
| Stage 5 — From Language to Interfaces | Book Two | VII — From Language to Interfaces | 34–36 | `07-from-language-to-interfaces/` | P09 | `07-from-language-to-interfaces/checkpoint/` |
| Stage 6 — Thinking in React | Book Two | VIII — Thinking in React | 37–48 | `08-thinking-in-react/` | P10, P11 | `08-thinking-in-react/checkpoint/` |
| Stage 7 — React with TypeScript | Book Two | IX — React + TypeScript | 49–57 | `09-react-typescript/` | P12 | `09-react-typescript/checkpoint/` |
| Stage 8 — Real Applications | Book Two | X — Building Real Applications | 58–65 | `10-building-real-applications/` | P13, P14, P15 | `10-building-real-applications/checkpoint/` |
| Stage 8 — Real Applications | Book Two | XI — Testing | 66–69 | `11-testing/` | P16 | `11-testing/checkpoint/` |
| Stage 9 — Production | Book Two | XII — Production-Ready React | 70–76 | `12-production/` | P17 | `12-production/checkpoint/` |
| Stage 10 — Advanced Types & Patterns | Book Three | XIII — Advanced TypeScript | 77–83 | `13-advanced-typescript/` | P18 | `13-advanced-typescript/checkpoint/` |
| Stage 10 — Advanced Types & Patterns | Book Three | XIV — Advanced React + TypeScript Patterns | 84–89 | `14-advanced-react-patterns/` | P19, P20 | `14-advanced-react-patterns/checkpoint/` |
| Stage 11 — Professional Engineering | Book Three | XV — Professional TypeScript & React Engineering | 90–97 | `15-professional-engineering/` | P20 | `15-professional-engineering/checkpoint/` |
| Stage 12 — Capstone | Book Three | XVI — Capstone | 98–99 | `16-capstone/` | C1, C2, C3 | `16-capstone/checkpoint/` |

## 13.5 Chapter-level index (all chapters)

Folder paths are relative to the repository root. *Lessons* is the number of lesson folders (one per section). *Project* lists the project started or extended in that chapter.

| Ch | Title | Part | Level | Tier | Folder | Lessons | Project |
|---|---|---|---|---|---|---|---|
| 1 | The Story So Far: JavaScript → TypeScript → React | I | 🟢 Beginner | Essential | `01-why-typescript/01-the-story-so-far/` | 7 | — |
| 2 | Why TypeScript? The Problems of Large JavaScript | I | 🟢 Beginner | Essential | `01-why-typescript/02-why-typescript/` | 11 | — |
| 3 | How TypeScript Works: Compile Time, Runtime & Type Erasure | I | 🟢 Beginner | Essential | `01-why-typescript/03-how-typescript-works/` | 8 | — |
| 4 | JavaScript Readiness Checkpoint | I | 🟢 Beginner | Essential | `01-why-typescript/04-javascript-checkpoint/` | 10 | — |
| 5 | Your First TypeScript Program | II | 🟢 Beginner | Essential | `02-typescript-foundations/05-first-program/` | 8 | — |
| 6 | Types, Annotations & Inference | II | 🟢 Beginner | Essential | `02-typescript-foundations/06-annotations-and-inference/` | 7 | — |
| 7 | Arrays, Tuples & Objects | II | 🟢 Beginner | Essential | `02-typescript-foundations/07-arrays-tuples-objects/` | 7 | — |
| 8 | Naming Types: Aliases, Interfaces & Literal Types | II | 🟢 Beginner | Essential | `02-typescript-foundations/08-naming-types/` | 7 | — |
| 9 | The Edge Types: any, unknown, never, void, null & undefined | II | 🟢 Beginner | Essential | `02-typescript-foundations/09-edge-types/` | 7 | — |
| 10 | Understanding the Type System | III | 🟡 Intermediate | Essential | `03-thinking-in-types/10-the-type-system/` | 8 | — |
| 11 | Typing Functions | III | 🟡 Intermediate | Essential | `03-thinking-in-types/11-functions/` | 11 | P03 |
| 12 | Objects, Interfaces & Composition | III | 🟡 Intermediate | Essential | `03-thinking-in-types/12-objects-and-interfaces/` | 8 | P02 |
| 13 | Unions & Intersections: The Algebra of Types | III | 🟡 Intermediate | Essential | `03-thinking-in-types/13-unions-and-intersections/` | 7 | — |
| 14 | Narrowing & Control-Flow Analysis | III | 🟡 Intermediate | Essential | `03-thinking-in-types/14-narrowing/` | 11 | — |
| 15 | Classes in TypeScript | III | 🟡 Intermediate | Essential | `03-thinking-in-types/15-classes/` | 12 | — |
| 16 | Why Generics? | IV | 🟡 Intermediate | Essential | `04-generics-and-type-transformations/16-why-generics/` | 6 | — |
| 17 | Generic Functions, Constraints & keyof | IV | 🟡 Intermediate | Essential | `04-generics-and-type-transformations/17-generic-functions-and-constraints/` | 7 | — |
| 18 | Generic Types, Interfaces, Classes & Defaults | IV | 🟡 Intermediate | Essential | `04-generics-and-type-transformations/18-generic-types/` | 7 | — |
| 19 | Designing Reusable Generic APIs | IV | 🟠 Advanced | Essential | `04-generics-and-type-transformations/19-reusable-generic-apis/` | 6 | P04 |
| 20 | Deriving Types from Values: keyof, typeof, Indexed Access, as const & satisfies | IV | 🟡 Intermediate | Essential | `04-generics-and-type-transformations/20-deriving-types/` | 7 | — |
| 21 | Utility Types: TypeScript's Standard Library | IV | 🟡 Intermediate | Essential | `04-generics-and-type-transformations/21-utility-types/` | 10 | — |
| 22 | Mapped Types: Transforming Object Types | IV | 🟠 Advanced | Essential | `04-generics-and-type-transformations/22-mapped-types/` | 6 | — |
| 23 | Conditional Types & infer | IV | 🟠 Advanced | Advanced | `04-generics-and-type-transformations/23-conditional-types/` | 6 | — |
| 24 | Template Literal Types & Custom Utility Types | IV | 🟠 Advanced | Advanced | `04-generics-and-type-transformations/24-template-literals-and-custom-utilities/` | 6 | P05 |
| 25 | Modules: ESM, CommonJS & Type-Only Imports | V | 🟡 Intermediate | Essential | `05-toolchain-and-ecosystem/25-modules/` | 7 | — |
| 26 | tsconfig Demystified | V | 🟡 Intermediate | Essential | `05-toolchain-and-ecosystem/26-tsconfig/` | 9 | — |
| 27 | The Everyday Toolchain: Run, Lint, Format & Test | V | 🟡 Intermediate | Essential | `05-toolchain-and-ecosystem/27-everyday-toolchain/` | 7 | — |
| 28 | Declaration Files & the Type Ecosystem | V | 🟡 Intermediate | Essential | `05-toolchain-and-ecosystem/28-declaration-files/` | 8 | — |
| 29 | From JavaScript to TypeScript: Interop & Migration | V | 🟡 Intermediate | Advanced | `05-toolchain-and-ecosystem/29-js-interop-and-migration/` | 7 | P06 |
| 30 | TypeScript on Node.js | VI | 🟡 Intermediate | Essential | `06-server-and-boundaries/30-typescript-on-node/` | 7 | — |
| 31 | Building a Typed HTTP API | VI | 🟡 Intermediate | Essential | `06-server-and-boundaries/31-typed-http-api/` | 8 | P07 |
| 32 | Runtime Safety: Trust Nothing at the Boundary | VI | 🟠 Advanced | Essential | `06-server-and-boundaries/32-runtime-safety/` | 10 | P07, P08 |
| 33 | Error Handling Across Layers | VI | 🟠 Advanced | Essential | `06-server-and-boundaries/33-error-handling/` | 8 | — |
| 34 | The Bridge: TypeScript Concepts You'll Use in React | VII | 🟢 Beginner | Essential | `07-from-language-to-interfaces/34-the-bridge/` | 10 | — |
| 35 | TypeScript in the Browser: Typing the DOM | VII | 🟡 Intermediate | Essential | `07-from-language-to-interfaces/35-typing-the-dom/` | 9 | P09 |
| 36 | Why React? | VII | 🟢 Beginner | Essential | `07-from-language-to-interfaces/36-why-react/` | 10 | — |
| 37 | The React Mental Model | VIII | 🟢 Beginner | Essential | `08-thinking-in-react/37-react-mental-model/` | 8 | — |
| 38 | JSX: Describing UI with JavaScript | VIII | 🟢 Beginner | Essential | `08-thinking-in-react/38-jsx/` | 7 | — |
| 39 | Components, Props & Composition | VIII | 🟢 Beginner | Essential | `08-thinking-in-react/39-components-props-composition/` | 8 | P10 |
| 40 | Conditional Rendering, Lists & Keys | VIII | 🟢 Beginner | Essential | `08-thinking-in-react/40-conditionals-lists-keys/` | 7 | — |
| 41 | Interactivity: Events & State | VIII | 🟢 Beginner | Essential | `08-thinking-in-react/41-events-and-state/` | 8 | — |
| 42 | Thinking in State: Structure, Derivation & Lifting | VIII | 🟡 Intermediate | Essential | `08-thinking-in-react/42-thinking-in-state/` | 9 | — |
| 43 | Hooks: The Mental Model | VIII | 🟡 Intermediate | Essential | `08-thinking-in-react/43-hooks-mental-model/` | 7 | — |
| 44 | useEffect: Synchronizing with the Outside World | VIII | 🟡 Intermediate | Essential | `08-thinking-in-react/44-effects/` | 9 | — |
| 45 | useRef: Remembering Without Re-rendering | VIII | 🟡 Intermediate | Essential | `08-thinking-in-react/45-refs/` | 6 | — |
| 46 | useContext: Sharing Data Through the Tree | VIII | 🟡 Intermediate | Essential | `08-thinking-in-react/46-context/` | 7 | — |
| 47 | useMemo, useCallback & memo: Identity and Performance | VIII | 🟡 Intermediate | Essential | `08-thinking-in-react/47-memoization/` | 8 | — |
| 48 | Custom Hooks: Reusing Stateful Logic | VIII | 🟡 Intermediate | Essential | `08-thinking-in-react/48-custom-hooks/` | 7 | — |
| 49 | How TypeScript Sees React: JSX, Elements & Component Types | IX | 🟡 Intermediate | Essential | `09-react-typescript/49-how-typescript-sees-react/` | 7 | — |
| 50 | Typing Props & Component APIs | IX | 🟡 Intermediate | Essential | `09-react-typescript/50-typing-props/` | 8 | — |
| 51 | Typing Events | IX | 🟡 Intermediate | Essential | `09-react-typescript/51-typing-events/` | 10 | — |
| 52 | Typing State: Modeling UI States | IX | 🟡 Intermediate | Essential | `09-react-typescript/52-typing-state/` | 8 | — |
| 53 | Typing Refs | IX | 🟡 Intermediate | Essential | `09-react-typescript/53-typing-refs/` | 8 | — |
| 54 | Typed Context | IX | 🟡 Intermediate | Essential | `09-react-typescript/54-typed-context/` | 8 | — |
| 55 | Reducers & State Machines with Discriminated Unions | IX | 🟡 Intermediate | Essential | `09-react-typescript/55-reducers/` | 8 | — |
| 56 | Typing Custom Hooks | IX | 🟡 Intermediate | Essential | `09-react-typescript/56-typing-custom-hooks/` | 8 | — |
| 57 | Generic Components: The Essentials | IX | 🟠 Advanced | Essential | `09-react-typescript/57-generic-components/` | 7 | — |
| 58 | Architecting a React Application | X | 🟡 Intermediate | Essential | `10-building-real-applications/58-application-architecture/` | 10 | — |
| 59 | Routing & Navigation | X | 🟡 Intermediate | Essential | `10-building-real-applications/59-routing/` | 8 | — |
| 60 | Where State Lives: State Management Architecture | X | 🟡 Intermediate | Essential | `10-building-real-applications/60-state-management/` | 7 | — |
| 61 | Data Fetching & the API Boundary | X | 🟠 Advanced | Essential | `10-building-real-applications/61-data-fetching/` | 9 | — |
| 62 | Server State with TanStack Query | X | 🟠 Advanced | Essential | `10-building-real-applications/62-server-state/` | 8 | — |
| 63 | Typed Forms from Scratch | X | 🟡 Intermediate | Essential | `10-building-real-applications/63-typed-forms/` | 8 | — |
| 64 | Validation, Schemas & Form Abstractions | X | 🟠 Advanced | Essential | `10-building-real-applications/64-validation-and-form-abstractions/` | 8 | — |
| 65 | Authentication & Authorization | X | 🟠 Advanced | Essential | `10-building-real-applications/65-auth/` | 8 | — |
| 66 | What TypeScript Catches vs What Tests Catch | XI | 🟡 Intermediate | Essential | `11-testing/66-types-vs-tests/` | 7 | — |
| 67 | Unit Testing Logic, Reducers & Hooks | XI | 🟡 Intermediate | Essential | `11-testing/67-unit-testing/` | 8 | — |
| 68 | Component Testing with Testing Library | XI | 🟡 Intermediate | Essential | `11-testing/68-component-testing/` | 8 | — |
| 69 | Integration Testing, API Mocking & E2E | XI | 🟠 Advanced | Essential | `11-testing/69-integration-and-e2e/` | 8 | — |
| 70 | Production Builds, Bundles & Code Splitting | XII | 🟡 Intermediate | Essential | `12-production/70-builds-and-code-splitting/` | 8 | — |
| 71 | Error Boundaries & Resilient UIs | XII | 🟡 Intermediate | Essential | `12-production/71-error-boundaries/` | 8 | — |
| 72 | Rendering Performance | XII | 🟠 Advanced | Essential | `12-production/72-rendering-performance/` | 8 | — |
| 73 | Accessibility | XII | 🟡 Intermediate | Essential | `12-production/73-accessibility/` | 8 | — |
| 74 | Security for Frontend Developers | XII | 🟠 Advanced | Essential | `12-production/74-security/` | 8 | — |
| 75 | Observability: Logging, Monitoring & Analytics | XII | 🟡 Intermediate | Essential | `12-production/75-observability/` | 7 | — |
| 76 | CI/CD & Long-Term Maintainability | XII | 🟡 Intermediate | Essential | `12-production/76-ci-cd-and-maintainability/` | 8 | — |
| 77 | Type Compatibility, Variance & Soundness | XIII | 🟠 Advanced | Advanced | `13-advanced-typescript/77-variance-and-soundness/` | 8 | — |
| 78 | Branded Types & Nominal Typing Patterns | XIII | 🟠 Advanced | Advanced | `13-advanced-typescript/78-branded-types/` | 8 | — |
| 79 | Advanced Conditional Types & infer | XIII | 🟠 Advanced | Advanced | `13-advanced-typescript/79-advanced-conditional-types/` | 8 | — |
| 80 | Advanced Mapped & Recursive Types | XIII | 🟠 Advanced | Advanced | `13-advanced-typescript/80-advanced-mapped-and-recursive-types/` | 7 | — |
| 81 | Template Literal Types in Depth | XIII | 🟠 Advanced | Advanced | `13-advanced-typescript/81-template-literal-types-in-depth/` | 7 | — |
| 82 | Advanced Generic Patterns & API Type Design | XIII | 🟠 Advanced | Advanced | `13-advanced-typescript/82-advanced-generic-patterns/` | 8 | — |
| 83 | Type-Level Programming & Type-Safe DSLs | XIII | 🔴 Expert | Specialist | `13-advanced-typescript/83-type-level-programming/` | 8 | — |
| 84 | Advanced Generic Components & Hooks | XIV | 🟠 Advanced | Advanced | `14-advanced-react-patterns/84-advanced-generic-components/` | 7 | — |
| 85 | Discriminated & Conditional Props | XIV | 🟠 Advanced | Advanced | `14-advanced-react-patterns/85-discriminated-props/` | 7 | — |
| 86 | Polymorphic Components & the asChild Pattern | XIV | 🟠 Advanced | Advanced | `14-advanced-react-patterns/86-polymorphic-components/` | 7 | — |
| 87 | Compound Components | XIV | 🟠 Advanced | Advanced | `14-advanced-react-patterns/87-compound-components/` | 7 | — |
| 88 | Render Props, Headless Components & Inversion of Control | XIV | 🟠 Advanced | Advanced | `14-advanced-react-patterns/88-render-props-and-headless/` | 7 | — |
| 89 | Reusable Component API Design: Choosing the Right Pattern | XIV | 🟠 Advanced | Advanced | `14-advanced-react-patterns/89-component-api-design/` | 8 | — |
| 90 | Architecture at Scale: Boundaries, Layers & Domain Modeling | XV | 🟠 Advanced | Advanced | `15-professional-engineering/90-architecture-at-scale/` | 8 | — |
| 91 | Designing Reusable Types & Public APIs | XV | 🟠 Advanced | Advanced | `15-professional-engineering/91-reusable-types-and-public-apis/` | 7 | — |
| 92 | Library Authoring, Publishing & Semantic Versioning | XV | 🔴 Expert | Advanced | `15-professional-engineering/92-library-authoring/` | 9 | — |
| 93 | Design Systems & Component Libraries | XV | 🟠 Advanced | Advanced | `15-professional-engineering/93-design-systems/` | 8 | — |
| 94 | Monorepos & Package Boundaries | XV | 🟠 Advanced | Advanced | `15-professional-engineering/94-monorepos/` | 8 | — |
| 95 | TypeScript at Scale: Compiler & Type-Checking Performance | XV | 🔴 Expert | Specialist | `15-professional-engineering/95-compiler-performance/` | 8 | — |
| 96 | React Frameworks, Server Rendering & Server Components | XV | 🟠 Advanced | Advanced | `15-professional-engineering/96-frameworks-and-server-components/` | 8 | — |
| 97 | Working on a Team: Code Review, Documentation & Conventions | XV | 🟡 Intermediate | Essential | `15-professional-engineering/97-team-practices/` | 8 | — |
| 98 | Capstone Planning: From Requirements to Architecture | XVI | 🟠 Advanced | Essential | `16-capstone/98-capstone-planning/` | 8 | — |
| 99 | Building, Shipping & Reviewing Your Capstone | XVI | 🔴 Expert | Essential | `16-capstone/99-capstone-build-and-review/` | 9 | — |

## 13.6 Where roadmap and book intentionally differ

| Difference | Reason |
|---|---|
| Stage 4 spans **two** parts (V and VI) | Toolchain chapters (settings, tools) and boundary chapters (concepts, architecture) need different chapter archetypes, even though they're learned together. |
| Stage 8 spans **two** parts (X and XI) | Testing is learned alongside app-building, but gets its own part so it is never buried or skipped. |
| Stage 10 spans **two** parts (XIII and XIV) | Type-level skills and component patterns are learned together, but taught separately so each can be skipped independently. |
| The JavaScript checkpoint is a **chapter** (Ch 4), not a stage of its own | It's a readiness gate, not new learning. |
| Ch 97 (team practices) is `Essential` but sits in Book Three | It reads best after real projects. Fast-track readers are routed to it directly after Part XII. |
| Projects don't map 1:1 to parts | Projects span chapters (P07 grows across Ch 31–33; P20 across Parts XIV–XV), so they live in `projects/`, not in chapter folders. |

---
**Previous:** [← 12. Folder Structure](12-folder-structure.md) · **Next:** [14. Difficulty Curve →](14-difficulty-curve.md)
