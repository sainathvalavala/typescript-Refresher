# 4. Complete Learning Roadmap

> The roadmap is about **learning progression**: what a learner must be able to do, in what order. The book (Section 11) is about **teaching** that progression. The two correspond closely but not one-to-one.
>
> This section shows the first-draft roadmap, a critical review of it, and the final roadmap that the book is built on.

---

## 4.1 Roadmap v1 (first draft, following the brief's suggested order)

```
Why TypeScript → JS checkpoint → TS fundamentals → type system → functions → objects & interfaces
→ unions & narrowing → classes → generics → type manipulation → utility types → modules & config
→ declarations → JS interop → Node.js → runtime safety → ADVANCED TS → PROFESSIONAL TS
→ Why React → React fundamentals → hooks → React + TS → ADVANCED REACT + TS → architecture
→ API integration → forms → testing → production → professional React → capstone
```

## 4.2 Critical review of v1

| # | Problem found | Why it hurts learning | Fix applied in v2 |
|---|---|---|---|
| 1 | **Advanced and Professional TypeScript come before any UI work** | Creates a motivation cliff: weeks of type-level programming before building anything visible. Variance and branded types are abstract until you've *felt* the bugs they prevent, and publishing a library is meaningless with nothing to publish. | Moved to **Book Three** (after real apps). A **TypeScript-first reading path** (§4.6) still lets backend-minded readers go straight there. |
| 2 | **Utility types come after mapped/conditional types** | Backwards for learners. `Partial<T>` is useful on day one; requiring mapped types first delays a practical tool for an abstract one. | **Use, then open the box:** Deriving types (Ch 20) → *using* utility types (Ch 21) → mapped types *rebuild* `Partial`/`Pick` (Ch 22) → conditional types *rebuild* `Exclude`/`ReturnType` (Ch 23) → custom utilities (Ch 24). |
| 3 | **Testing only appears near the end** | Teaches "testing is an afterthought". Every project before it is untested. | Testing starts in **Part IV**. The starter repo from Ch 5 ships with Vitest preconfigured, and Ch 19 teaches testing generic code (runtime tests + **type tests**). Ch 27 explains and extends the toolchain. Every project from P04 onward ships with tests, and Part XI deepens testing for React. |
| 4 | **"Why React?" is told, not felt** | Readers who never fought manual DOM synchronization don't appreciate declarative UI. | New bridge part: **typing the DOM** (Ch 35) and building **Vanilla TaskFlow** (P09). The pain becomes the motivation for Ch 36. This also previews DOM and event types that React uses. |
| 5 | **Advanced React patterns come before building a real app** | Compound and polymorphic components solve *library-scale* duplication the learner hasn't met yet, so they become premature abstraction. | Real apps → testing → production first. Advanced patterns move to Part XIV. **Generic components essentials** stay in core (Ch 57) because forms and data features need them. |
| 6 | **Runtime safety is a single late stop** | The compile-time/runtime boundary is *the* most misunderstood idea, and one chapter is not enough. | It becomes a **spiral thread**: erasure (Ch 3) → `unknown` (Ch 9) → narrowing (Ch 14) → runtime safety (Ch 32) → API data (Ch 61) → forms (Ch 64) → server/client boundary (Ch 96). |
| 7 | **Hooks are a list of APIs** | Learners memorize hooks without knowing which problem each solves. | State first (Ch 41), then a **hooks mental model** (Ch 43) that frames each hook as the answer to a question. |
| 8 | **Missing real-world skills** | Reading compiler errors, DOM typing, enums vs unions, error-handling design, routing, server state vs client state, accessibility, security, observability, E2E testing, styling, and frameworks/Server Components are all absent or implicit. | Each now has a home: Ch 5, 35, 8, 33, 59, 60/62, 73, 74, 75, 69, 58/93, 96. |
| 9 | **Config is taught late, but needed from day one** | Readers would run code with settings they don't understand. | Ch 5 gives a **starter config** with explicit "explained in Ch 26" forward references. Strict mode is on from the first program. |
| 10 | **Professional TS and Professional React overlap** | Architecture, documentation, and team practices would be taught twice. | Merged into one **Professional Engineering** part (Part XV), organized by concern rather than by technology. |
| 11 | **Projects cluster at the end** | Long stretches without building anything. | At least one project per part, plus the running **TaskFlow** thread that evolves across six parts. |
| 12 | **Duplicate concept risk: props, state, reducers** | React fundamentals and React + TS would both "teach props". | Clear split: Part VIII teaches *what props/state are* (concept, light types); Part IX teaches *how to design their types* (contracts). `useReducer` is taught once, in Ch 55, where discriminated unions make it shine. |

## 4.3 Roadmap v2 (final)

The final roadmap has **13 stages** grouped into **three phases**.

```
PHASE 1 · THE LANGUAGE ─────────────────────────────────────────────────────────────────────────
 Stage 0  Orientation                Why JS → TS → React? Are you ready?
 Stage 1  Language Foundations       Tools, basic types, inference, objects, special types
 Stage 2  Thinking in Types          Type system model, functions, interfaces, unions, narrowing, classes
 Stage 3  Abstraction with Types     Generics, deriving types, utility/mapped/conditional/template types
 Stage 4  TypeScript in Real Projects Modules, config, toolchain, declarations, migration, Node, runtime safety

PHASE 2 · INTERFACES & APPLICATIONS ────────────────────────────────────────────────────────────
 Stage 5  From Language to Interfaces Typed DOM, the pain of manual UI, why React
 Stage 6  Thinking in React          Mental model, components, props, state, hooks, effects
 Stage 7  React with TypeScript      Typed props, events, state, refs, context, reducers, hooks, generics
 Stage 8  Real Applications          Architecture, routing, state architecture, data, forms, auth, testing
 Stage 9  Production                 Builds, errors, performance, a11y, security, observability, CI/CD
          ★ ESSENTIAL CORE COMPLETE → "job-ready TypeScript + React developer"

PHASE 3 · MASTERY ──────────────────────────────────────────────────────────────────────────────
 Stage 10 Advanced Types & Patterns  Variance, brands, type-level programming; advanced component patterns
 Stage 11 Professional Engineering   Architecture at scale, libraries, design systems, monorepos, teams
 Stage 12 Capstone                   Integrate everything in a production-quality application
```

### Stage details

| Stage | Goal: the learner can… | Key concepts | Milestone project | Book |
|---|---|---|---|---|
| **0 Orientation** | Explain why TS and React exist and what TS can/can't do | Dynamic vs static typing, erasure, compile time vs runtime | — | Part I |
| **1 Foundations** | Write and run small typed programs; read compiler errors | `tsc`, annotations, inference, primitives, arrays, tuples, objects, aliases, interfaces, literal types, `any`/`unknown`/`never`/`void` | P01 Typed Calculator | Part II |
| **2 Thinking in Types** | Model a domain so illegal states can't be represented | Types-as-sets, structural typing, functions, interfaces, unions, discriminated unions, narrowing, type guards, classes | P02 TaskFlow Core · P03 Utility Toolkit | Part III |
| **3 Abstraction** | Write reusable, type-safe APIs and derive types instead of duplicating them | Generics, constraints, `keyof`, `typeof`, indexed access, `as const`, `satisfies`, utility/mapped/conditional/template literal types | P04 Generic Utility Library · P05 Type-Safe Event Emitter | Part IV |
| **4 Real Projects** | Configure, lint, test, and ship TS; type the ecosystem; migrate JS; build a typed, validated Node API | ESM/CJS, `tsconfig`, ESLint, Vitest, `.d.ts`, `@types`, `allowJs`/`checkJs`, Node, layered APIs, `unknown`, schemas, error design | P06 JS→TS Migration · P07 TaskFlow API · P08 Typed API Client | Parts V–VI |
| **5 To Interfaces** | Manipulate a typed DOM, and explain *why* declarative UI exists | `lib.dom`, element types, DOM events, state–DOM sync problem | P09 Vanilla TaskFlow | Part VII |
| **6 Thinking in React** | Build interactive UIs with correct state ownership and effects | Declarative UI, JSX, components, props, composition, lists/keys, state snapshots, lifting state, hooks model, effects, refs, context, memoization, custom hooks | P10 Component Gallery · P11 TaskFlow in React | Part VIII |
| **7 React + TS** | Design typed component APIs and hooks; model UI state with unions | Props/children types, `ComponentProps`, event types, state modeling, refs, typed context, reducers + exhaustiveness, custom hooks, generic components | P12 React Dashboard | Part IX |
| **8 Real Apps** | Build a multi-page app against a real API with forms, auth, and tests | Feature architecture, routing, state architecture, DTOs, validation at the API boundary, server state, forms + schemas, auth, unit/component/integration tests | P13 Typed Forms Kit · P14 TaskFlow Web · P15 Auth System · P16 Test Suite | Parts X–XI |
| **9 Production** | Ship and operate a fast, accessible, secure, observable app | Builds, code splitting, error boundaries, profiling, React Compiler, a11y, XSS/token security, monitoring, CI/CD | P17 Complex Dashboard | Part XII |
| **10 Advanced** | Use advanced types and component patterns *and* judge when they're overkill | Variance, soundness, branded types, advanced conditional/mapped/recursive/template types, type-level DSLs; generic/polymorphic/compound/headless components | P18 Validation Library · P19 Generic Data Table · P20 Component Library | Parts XIII–XIV |
| **11 Professional** | Design architecture, libraries, and packages for teams | Domain modeling, public API design, publishing + semver, design systems, monorepos, compiler performance, frameworks/RSC, code review | P20 (published) | Part XV |
| **12 Capstone** | Deliver a production-quality application end to end | Everything | C1 / C2 / C3 | Part XVI |

## 4.4 The roadmap as a dependency graph

```
                          ┌──────────────── Stage 0: Why? ────────────────┐
                          ▼                                               │
                   Stage 1: Foundations                                   │
                          ▼                                               │
                   Stage 2: Thinking in Types ─────────────┐              │
                          ▼                                │              │
                   Stage 3: Abstraction (Generics) ──┐     │              │
                          ▼                          │     │              │
                   Stage 4: Real Projects            │     │              │
                   (toolchain · Node · runtime safety)     │              │
                          ▼                          │     │              │
                   Stage 5: To Interfaces ◄──────────┼─────┘ (DOM types)  │
                          ▼                          │                    │
                   Stage 6: Thinking in React        │                    │
                          ▼                          │                    │
                   Stage 7: React + TS ◄─────────────┘ (generics, unions) │
                          ▼                                               │
                   Stage 8: Real Apps ◄──── runtime safety from Stage 4   │
                          ▼                                               │
                   Stage 9: Production   ★ ESSENTIAL CORE                 │
                          ▼                                               │
          ┌──── Stage 10: Advanced Types & Patterns ────┐                 │
          ▼                                             ▼                 │
 Stage 11: Professional Engineering ───────────► Stage 12: Capstone ◄─────┘
```

## 4.5 Concept spirals: the threads that recur

| Concept | Introduced | Deepened | Applied | Mastered |
|---|---|---|---|---|
| Compile time vs runtime | Ch 3 | Ch 9, 14 | Ch 32, 61, 64 | Ch 78 (brands), 96 (RSC boundary) |
| Discriminated unions | Ch 13 | Ch 14 | Ch 52, 55, 61 | Ch 85, 90 |
| Inference | Ch 6 | Ch 16–18 | Ch 52, 56 | Ch 82 |
| Structural typing | Ch 10 | Ch 12 | Ch 50 (prop compatibility) | Ch 77–78 |
| Generics | Ch 16 | Ch 17–19 | Ch 56–57 | Ch 82, 84 |
| Deriving types | Ch 20 | Ch 21–24 | Ch 58, 62 (query keys) | Ch 80–83 |
| Errors and failure | Ch 14 (`unknown` in `catch`) | Ch 15, 33 | Ch 61, 71 | Ch 75, 90 |
| Testing | Ch 19 (first runtime + type tests) | Ch 27, 66–69 | Every project from P04 | Ch 92 (type tests for libraries) |
| Abstraction cost | Ch 16, 19 | Ch 24 | Ch 57 | Ch 89, 91, 97 |

## 4.6 Reading paths

The book is linear, but readers aren't. Each path below is an explicit, supported route.

| Path | For | Route | Approx. time |
|---|---|---|---|
| **A. The full journey** | Most readers | Ch 1 → 99 in order | ~450 h |
| **B. Fast track to productive** | Job-seekers on a deadline | All **Essential** chapters in Parts I–XII (see Section 15), then P14 and capstone C2 | ~260 h |
| **C. TypeScript-first** | Backend / library developers | Parts I–VI → Part XIII → Ch 90–92, 94–95 → capstone C3 | ~220 h |
| **D. React developer adding TypeScript** | Already ships React in JS | Parts I–VI (checkpoints let you skim) → skim VII–VIII → Part IX onward | ~300 h |
| **E. Returning specialist** | Senior engineers | Checkpoints of Parts I–XII as tests → Parts XIII–XV | ~120 h |

> **Rule for every path:** if you fail a checkpoint, follow its "revisit" list before moving on. The checkpoints are the safety net that makes skipping safe.

## 4.7 Time budget (full journey)

| Phase | Stages | Reading + exercises | Projects | Total |
|---|---|---|---|---|
| 1 · The Language | 0–4 | ~120 h | ~50 h | **~170 h** |
| 2 · Interfaces & Applications | 5–9 | ~110 h | ~70 h | **~180 h** |
| 3 · Mastery | 10–12 | ~50 h | ~50 h (+ capstone) | **~100 h** |

At ~10 hours a week, the essential core (Phases 1–2) takes about 8 months, and the full journey about 11.

## 4.8 How the roadmap becomes the book

| Roadmap stage | Book part(s) | Note on the difference |
|---|---|---|
| 0 Orientation | Part I | The JavaScript checkpoint is Ch 4, inside Part I, so the "are you ready?" gate sits right before hands-on work. |
| 1–3 | Parts II–IV | One stage each. |
| 4 Real Projects | Parts V + VI | One learning stage, but two teaching parts: the *toolchain/ecosystem* and *server/boundaries* are different kinds of chapters (tooling vs concept). |
| 5–7 | Parts VII–IX | One stage each. |
| 8 Real Apps | Parts X + XI | Testing gets its own part so it isn't buried, even though it is learned alongside app-building. |
| 9 Production | Part XII | — |
| 10 Advanced | Parts XIII + XIV | Types and component patterns are taught separately but learned together. |
| 11–12 | Parts XV–XVI | — |

---
**Previous:** [← 3. The Story](03-the-story.md) · **Next:** [5. Detailed TypeScript Curriculum →](05-typescript-curriculum.md)
