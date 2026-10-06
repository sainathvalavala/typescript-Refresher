# 14. Difficulty Curve

> 🟢 Beginner · 🟡 Intermediate · 🟠 Advanced · 🔴 Expert/Specialist. Per-chapter ratings are in the chapter cards and in the full index ([§13.5](13-roadmap-book-folder-mapping.md#135-chapter-level-index-all-chapters)).

---

## 14.1 Distribution

| Difficulty | Chapters | Share | Where they cluster |
|---|---|---|---|
| 🟢 Beginner | 16 | 16% | Parts I–II, the start of Parts VII–VIII |
| 🟡 Intermediate | 47 | 48% | Parts III, V, VIII–XII |
| 🟠 Advanced | 32 | 32% | Part IV (second half), Parts VI, X, XIII–XV |
| 🔴 Expert | 4 | 4% | Ch 83, 92, 95, 99 |

## 14.2 The shape of the curve: a sawtooth, not a ramp

The curve is deliberately a **sawtooth**. Each new domain (the language, React, mastery) restarts at a gentler slope, so the learner's *confidence* resets upward even as their *skill* keeps climbing.

```
Average chapter difficulty per part        1 = 🟢   2 = 🟡   3 = 🟠   4 = 🔴
                                           |         |         |         |
BOOK ONE    Part I     Why TypeScript?     █                                  1.0
            Part II    Foundations         █                                  1.0
            Part III   Thinking in Types   ███████████                        2.0
            Part IV    Generics & Types    ███████████████                    2.4
            Part V     Toolchain           ███████████                        2.0
            Part VI    Server & Boundaries ████████████████                   2.5
BOOK TWO    Part VII   To Interfaces       ████                               1.3  ◄ new domain:
            Part VIII  Thinking in React   ███████                            1.6    the slope restarts
            Part IX    React + TS          ████████████                       2.1
            Part X     Real Applications   ████████████████                   2.5
            Part XI    Testing             ██████████████                     2.3
            Part XII   Production          ██████████████                     2.3
BOOK THREE  Part XIII  Advanced TS         ██████████████████████             3.1  ◄ mastery
            Part XIV   Advanced Patterns   █████████████████████              3.0
            Part XV    Professional        ██████████████████████             3.1
            Part XVI   Capstone            ██████████████████████████         3.5
```

**Why the dip at Parts VII–VIII is intentional:** learning React's model is a new kind of thinking (rendering, snapshots, synchronization). Combining it with hard TypeScript at the same time overloads learners, so Part VIII keeps types simple on purpose and Part IX brings the TypeScript difficulty back.

## 14.3 The biggest conceptual jumps

These are the eight places where learners most often stall. Each has dedicated preparation and extra support built in.

| # | Jump | Why it's hard | Preparation before it | Extra support at it |
|---|---|---|---|---|
| 1 | **Ch 10: types as sets** | Moves from "labels on values" to reasoning about *relationships* between types | Ch 6–9 build intuition with concrete types | Set-diagram drills; 20 assignability predictions; the model is reused in every later part |
| 2 | **Ch 13–14: discriminated unions + narrowing** | Requires modeling *states*, not just shapes | Ch 8 literal types; Ch 9 `never` | "Boolean soup" refactor kata; predict-the-narrowed-type drills; P02 is built around it |
| 3 | **Ch 16–18: generics** | Abstracting over types is a new level of abstraction | P03 deliberately creates the duplication pain; Ch 7 introduces `Array<T>` syntax | Six-chapter slow ramp; "predict T" drills; golden-rule checklist |
| 4 | **Ch 22–23: mapped and conditional types** | Programming *with* types; distributivity surprises | Ch 21 uses utility types as black boxes first | Rebuild-the-built-in exercises; evaluate-by-hand worksheets |
| 5 | **Ch 32: runtime safety** | Unlearning "types protect me"; a design shift to boundaries | Ch 3 (erasure), Ch 9 (`unknown`), Ch 14 (guards), Ch 31 (built naively on purpose) | Break-your-own-API exercise; boundary-mapping diagrams |
| 6 | **Ch 41 + 44: snapshots and effects** | Stale closures and synchronization defy imperative intuition | Ch 4 closures self-check; Ch 37 render model; Ch 43 hooks model | Render-timeline diagrams; "event or effect?" classification drills |
| 7 | **Ch 61–62: the network boundary and server state** | Two ideas at once: untrusted data *and* caching | Ch 32–33, P08, Ch 60 (state kinds) | Hand-rolled `useQuery` first, so the library solves felt problems |
| 8 | **Ch 77 + 83: variance and type-level programming** | Formal reasoning; recursion at the type level | Ch 10, 22–24, and real callback-prop puzzles from Book Two | Explicit `Specialist` fencing; "when to stop" sections |

## 14.4 Where learners are likely to struggle (and the built-in mitigation)

| Struggle | Typical symptom | Mitigation |
|---|---|---|
| Reading compiler errors | "The error makes no sense", so they reach for `as` | Ch 5 §6 teaches error anatomy; Appendix C decodes the 40 most common errors; every ⚠️ box quotes real errors |
| The `as` habit | Assertions used to silence errors | Ch 10 §7 frames `as` as a promise; Ch 32 shows the cost; Ch 97 makes it a review smell |
| `tsconfig` and module resolution | Import errors, "works in tsx, fails in tsc" | Ch 5 starter config with forward references; Ch 25–26 teach by before/after output |
| Over-annotation, or under-annotation | Redundant types, or `any` leaking | Ch 6 "annotate boundaries" rule, repeated in Ch 50 and 91 |
| Generic inference | Explicit type arguments everywhere | Ch 16 §4, Ch 18 §6, the golden rule, and "no angle brackets at call sites" test rules in P04 |
| Effect dependencies | Infinite loops; lint suppression | Ch 44 §3 and §7; the "you might not need an effect" decision table |
| Keys and state identity | State jumps between list items | Ch 40's reproduce-the-bug exercise |
| Context defaults | Crashes outside providers | Ch 54's safe-context pattern, reused in Ch 65 and 87 |
| Async tests | Flaky tests, `act` warnings | Ch 68 §4 and Ch 69 §7 |
| Architecture paralysis | "Where does this file go?" | Ch 58's feature template; P14's prescribed structure |

## 14.5 Chapters that need extra exercises

These chapters get **double the usual exercise volume** (two sets per level plus drill worksheets), because they are both hard and foundational:

| Chapter | Extra material |
|---|---|
| 10 The Type System | 40 assignability and excess-property drills |
| 14 Narrowing | 30 predict-the-narrowed-type drills |
| 16–17 Generics | 25 "predict T" drills; 10 constraint-design problems |
| 22–23 Mapped and conditional types | Evaluate-by-hand worksheets; rebuild every built-in |
| 32 Runtime Safety | A malformed-payload corpus for testing your own API |
| 41 Events and State | Snapshot prediction drills |
| 44 Effects | 30 "render, handler, or effect?" classification items |
| 52 + 55 State modeling and reducers | A state-modeling kata series (checkout, uploads, media player, wizard) |
| 61 Data Fetching | Boundary drills with deliberately drifting fake APIs |
| 77 Variance | Covariant/contravariant position worksheets |

## 14.6 Heavy dependencies

If a learner is weak in the right-hand column, the left-hand chapter will hurt.

| Chapter | Depends heavily on |
|---|---|
| 17 Constraints & `keyof` | 12 (object types), 16 (generics) |
| 21 Utility types | 17, 20 |
| 22 Mapped types | 17, 20, 21 |
| 23 Conditional types | 10 (set model), 13 (unions), 22 |
| 32 Runtime safety | 3, 9, 14, 31 |
| 52 Typing state | 13, 14, 16 |
| 55 Reducers | 13, 14 (exhaustiveness) |
| 57 Generic components | 16–18, 50 |
| 61 Data fetching | 32, 33, P08 |
| 64 Validation & form abstractions | 32, 63 |
| 77–83 Advanced TypeScript | 10, 22–24 |
| 84 Advanced generic components | 17, 20, 57 |
| 86 Polymorphic components | 17, 21, 49 |
| 92 Library authoring | 25, 26, 28 |

## 14.7 What can safely be skipped initially

| Skip for now | Come back when… |
|---|---|
| Ch 23–24 (conditional, template literal, custom utility types) | You need to read complex library types, or before Part XIII |
| Ch 29 (JS → TS migration) and P06 | You join a mixed JS/TS codebase |
| Ch 15 §12 (decorators) | You work with a decorator-based framework |
| Ch 77 §6, 79 §5 and §8, 81 §2 and §6, 83 (all) | You author libraries or type-level tooling |
| Part XIII (all) | Advanced types start appearing in your code reviews |
| Part XIV (all) | You build shared components for other teams |
| Ch 90–96 | You work on a large codebase, a library, a monorepo, or a framework-based app |
| Ch 95 (compiler performance) | Type-checking takes more than about 30 seconds |
| Capstone C3 | You want to pursue library or platform work |

**Never skip:** the checkpoints, Ch 10, Ch 13–14, Ch 16–17, Ch 32, Ch 41–44, Ch 52, Ch 61, and Ch 97.

## 14.8 Pacing guidance

- After each 🟠 cluster (Part IV's second half, Ch 32–33, Ch 61–65), schedule a **consolidation week**: no new chapters, only the part's project.
- Chapters marked 🔴 should be read twice: once for the shape of the ideas, and again with the exercises.
- If a checkpoint takes more than twice the expected time, follow its *revisit* list before continuing.

---
**Previous:** [← 13. Mapping](13-roadmap-book-folder-mapping.md) · **Next:** [15. Essential vs Advanced vs Specialist →](15-essential-advanced-specialist.md)
