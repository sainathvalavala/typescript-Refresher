# 5. Detailed TypeScript Curriculum

> **Book One — The TypeScript Language** · Parts I–VI · Chapters 1–33
>
> **How to read a chapter card.** Each card shows difficulty (🟢 Beginner · 🟡 Intermediate · 🟠 Advanced · 🔴 Expert), tier (`Essential` · `Advanced` · `Specialist`), and the chapter's folder. **Opens with** is the problem that starts the chapter. The numbered list is the chapter's **sections**, and each section is one lesson folder in the repository. Exercises follow the L1–L4 levels from §2.8. The full anatomy (why, mental model, examples, mistakes, when/when-not, connections, summary, takeaways, next) applies to every concept chapter; cards list only what is specific to that chapter.

---

### Part I — Why TypeScript?
> **Folder:** `01-why-typescript/` · **Roadmap:** Stage 0 — Orientation · **Difficulty:** 🟢

**Purpose of the part.** Before a single annotation, the reader understands the problem TypeScript solves, the mechanism it uses (static analysis plus erasure), and its limit (it cannot see runtime data). The part ends by verifying JavaScript readiness.

#### Chapter 1 — The Story So Far: JavaScript → TypeScript → React
`🟢 Beginner` · `Essential` · 📁 `01-the-story-so-far/`

**Archetype:** Story chapter. **Opens with:** a 1996 web page with a form-validation script next to a 2026 web app with 400,000 lines of code. Same language, different universe.
**Mental model:** *Tools are fossils of problems.* Every technology in this book exists because a specific pain became unbearable.

1. **A language for small jobs** — 1995, ten days, a forgiving dynamic language for form checks and hover effects.
2. **JavaScript escapes the browser page** — Ajax, Gmail, V8, Node.js, npm: from scripts to applications.
3. **The cost of growth** — more code, more people, longer lifetimes; a preview of Chapter 2's problems.
4. **Static analysis arrives** — Closure annotations, Flow, CoffeeScript, Dart, and why TypeScript's superset approach won.
5. **The UI crisis and React** — imperative DOM updates vs declarative UI, as a two-paragraph teaser for Ch 36.
6. **Why TypeScript + React today** — the default stack, and what "professional" means in this book.
7. **The map of this book** — the three Books, the five threads, the TaskFlow project, reading paths.

**Exercises:**
- **L1 Recall:** Put eight milestones (Node.js, TypeScript 1.0, React open-sourced…) in order and name the problem each addressed.
- **L2 Application:** Find a JavaScript bug you have personally written; classify it (typo, wrong type, null, refactor miss, API misuse).
- **L3 Challenge:** Write a one-page "why we're adopting TypeScript" memo for a fictional 5-person team.
- **L4 Real-world:** Interview (or read the engineering blog of) a company that migrated to TypeScript; summarize their reasons and costs.

#### Chapter 2 — Why TypeScript? The Problems of Large JavaScript
`🟢 Beginner` · `Essential` · 📁 `02-why-typescript/`

**Archetype:** Story + demonstration. **Opens with:** a 40-line JavaScript module with five hidden bugs. The reader hunts them by hand, then watches TypeScript find all five in under a second.
**Mental model:** *Types are machine-checked documentation of the contracts between pieces of code.*

1. **What JavaScript was designed for** — dynamic typing as a feature for small, single-author programs.
2. **Dynamic typing at scale** — the same freedom becomes ambiguity when nobody holds the whole program in their head.
3. **Runtime type errors** — `undefined is not a function`, typos, wrong shapes; why "late" errors are expensive.
4. **Silent wrong values** — coercion bugs (`"100" + 20`) that never crash and just corrupt data.
5. **Refactoring without a safety net** — renames, signature changes, and the fear that freezes codebases.
6. **Large teams and invisible contracts** — every function call is an agreement between two people who may never meet.
7. **API discoverability** — "what does `options` accept?"; autocomplete as documentation.
8. **Maintainability over years** — code is read far more often than it is written.
9. **Static analysis** — reading code without running it; linters vs type checkers.
10. **Why Microsoft created TypeScript** — Anders Hejlsberg, internal pain, the 2012 announcement, design goals and *non-goals* (not a new runtime, not fully sound by design).
11. **A superset of JavaScript** — gradual adoption, one file at a time; "JavaScript with syntax for types".

**Exercises:**
- **L1 Recall:** For six snippets, say whether the bug would be caught by a type checker, a linter, a test, or none.
- **L2 Application:** Paste the opening module into the TypeScript Playground; annotate just the parameters and observe which bugs surface.
- **L3 Challenge:** Construct a bug that TypeScript *cannot* catch even with perfect annotations, and explain why.
- **L4 Real-world:** Take a small JS repository you own; list the five riskiest refactors you'd avoid today, and explain how types would change that.

#### Chapter 3 — How TypeScript Works: Compile Time, Runtime & Type Erasure
`🟢 Beginner` · `Essential` · 📁 `03-how-typescript-works/`

**Opens with:** "If TypeScript checks types, why did my app crash on a `User` with no `email`?"
**Mental model:** 🧠 *Two worlds.* **Compile time:** TypeScript reads your code and checks its internal consistency. **Runtime:** JavaScript executes with *no types at all*. The `tsc` pipeline is *check → erase → emit*, and the checker never touches running data.

1. **The compiler pipeline** — parse → type-check → emit; checking and emitting are independent (errors don't block output by default).
2. **Type erasure** — side-by-side TS input and JS output; annotations, interfaces, and type aliases vanish.
3. **Compile time vs runtime** — what exists in each world; why `if (x instanceof User)` works but `if (x is User-type)` can't.
4. **What TypeScript can catch** — typos, wrong arguments, missing properties, nullability, unhandled union cases, refactor misses.
5. **What TypeScript cannot catch** — bad network data, wrong business logic, `as` lies, `any`, runtime-only failures, performance.
6. **The language service** — the same checker powers your editor: autocomplete, rename, quick fixes.
7. **Why JavaScript is still fundamental** — debugging, runtime behavior, `this`, closures, the event loop: TypeScript changes none of it.
8. **The layered safety model (preview)** — types + lint + tests + runtime validation; each catches what others miss.

**Common mistakes:** believing annotations validate data · thinking TS makes code faster · expecting types to exist at runtime (`typeof T`).
**Connects:** forward to Ch 9 (`unknown`), Ch 32 (runtime safety), Ch 66 (types vs tests).

**Exercises:**
- **L1 Recall:** Given five TS snippets, write the JavaScript `tsc` would emit.
- **L2 Application:** Produce a program that type-checks but crashes at runtime, using only JSON input.
- **L3 Challenge:** Explain why `enum` and parameter properties are *not* simple erasure (preview of `erasableSyntaxOnly`).
- **L4 Real-world:** Draw the runtime boundaries of an app you use daily (network, storage, URL, user input) and mark where types end.

#### Chapter 4 — JavaScript Readiness Checkpoint
`🟢 Beginner` · `Essential` · 📁 `04-javascript-checkpoint/`

**Archetype:** Self-assessment chapter (not a JavaScript tutorial). Each concept gets a 3-question self-test, **why it matters later**, and an external resource if the reader needs to review it.

1. **Variables & primitive values** — `let`/`const`, the seven primitives; *later:* inference and literal types depend on `const` vs `let` (Ch 6, 8).
2. **Objects & arrays** — literals, property access, mutation vs copying; *later:* object types, readonly, immutable React state (Ch 7, 41).
3. **Functions, scope & closures** — arrow functions, lexical scope, captured variables; *later:* typed callbacks (Ch 11), stale closures in effects (Ch 44).
4. **Destructuring, rest & spread** — *later:* typing props destructuring (Ch 50), immutable updates (Ch 41), rest parameters (Ch 11).
5. **Classes & prototypes** — `class`, `extends`, `this`, the prototype chain; *later:* TS classes (Ch 15), `instanceof` narrowing (Ch 14).
6. **Modules (ES Modules)** — `import`/`export`, default vs named; *later:* type-only imports and module resolution (Ch 25).
7. **Promises & async/await** — chaining, error propagation, `Promise.all`; *later:* `Promise<T>` and `Awaited` (Ch 11, 21), data fetching (Ch 61).
8. **Error handling** — `try`/`catch`/`finally`, throwing, `Error` objects; *later:* `unknown` in `catch` (Ch 14), error design (Ch 33).
9. **DOM basics & browser APIs** — selecting elements, events, `fetch`, `localStorage`; *later:* DOM types (Ch 35), React events (Ch 51).
10. **Your readiness verdict** — scoring rubric; which external resources to use for gaps; when to proceed.

**Exercises:**
- **L1 Recall:** Twenty-question JavaScript quiz (predict-the-output).
- **L2 Application:** Refactor a callback-based script to `async`/`await` with proper error handling.
- **L3 Challenge:** Explain a stale-closure bug in plain JavaScript (sets up Ch 44).
- **L4 Real-world:** Build a tiny `fetch` + DOM page that loads and renders a list, in plain JavaScript. It returns in Ch 35.

---

### Part II — TypeScript Foundations
> **Folder:** `02-typescript-foundations/` · **Roadmap:** Stage 1 — Language Foundations · **Difficulty:** 🟢

**Purpose of the part.** The reader installs TypeScript, writes and runs programs, learns to *read* compiler errors, and acquires the basic vocabulary of types. Strict mode is on from the first line.

#### Chapter 5 — Your First TypeScript Program
`🟢 Beginner` · `Essential` · 📁 `05-first-program/`

**Archetype:** Tooling chapter. **Opens with:** a JavaScript file that runs fine, renamed to `.ts`, and immediately shows three red squiggles. Are they bugs, or noise?
**Mental model:** *The compiler is a pessimistic code reviewer who reads every line, never runs anything, and only reports what it can prove might go wrong.*

1. **Installing TypeScript** — per-project install (`npm i -D typescript`), why not global, versions.
2. **Running tsc** — compile a file, inspect the emitted `.js`, `--watch`, `--noEmit` as "check only".
3. **A starter tsconfig** — a minimal strict config, each line commented "explained in Ch 26".
4. **Running TypeScript directly** — `tsx`, and Node's built-in type stripping; why these *skip* type-checking (callback to erasure).
5. **The editor as your teacher** — hover types, quick fixes, go-to-definition, rename symbol.
6. **Reading TypeScript error messages** — anatomy of an error (code, location, the "is not assignable" chain), reading nested errors bottom-up.
7. **The TypeScript Playground** — sharing repros, viewing emitted JS, switching versions.
8. **Project: Typed Calculator (kickoff)** — introduces P01.

**Common mistakes:** installing globally and drifting versions · treating every red squiggle as noise · confusing "it runs" (tsx) with "it type-checks" (tsc).

**Exercises:**
- **L1 Recall:** Compile a file and identify which lines in the output came from which lines in the input.
- **L2 Application:** Decode three real error messages and fix the code without looking at the solution.
- **L3 Challenge:** Make a program that `tsx` runs happily but `tsc` rejects; explain why both behaviors are correct.
- **L4 Real-world:** Set up a reusable starter repo (scripts: `dev`, `typecheck`, `test`, `build`; Vitest preconfigured and explained in Ch 27) that you'll use for Parts II–IV.

#### Chapter 6 — Types, Annotations & Inference
`🟢 Beginner` · `Essential` · 📁 `06-annotations-and-inference/`

**Opens with:** a beginner who annotates *everything* (`const x: number = 5`) next to one who annotates *nothing*. Both are wrong, in different ways.
**Mental model:** 🧠 *Inference flows forward from values; annotations are promises you make at boundaries.* Annotate where information enters (parameters) or leaves (public returns); let TypeScript infer the rest.

1. **What a type is** — a description of which values are allowed (set intuition, formalized in Ch 10).
2. **Primitive types** — `string`, `number`, `boolean`, `bigint`, `symbol`, `null`, `undefined`; lowercase vs `String`/`Number` wrappers.
3. **Type annotations** — syntax on variables, parameters, and returns.
4. **Type inference** — how TypeScript infers from initializers and returns; hovering to see inferred types.
5. **const vs let inference** — literal types vs widened types (`"GET"` vs `string`), a first look.
6. **When to annotate** — the boundary rule: parameters always, exported returns usually, locals rarely.
7. **Type errors as conversations** — assignability errors decoded; fixing code vs fixing types.

**Common mistakes:** redundant annotations · annotating a variable more widely than its value (`let s: string | number = "a"` used only as string) · using wrapper types (`String`).
**Real world:** code-review comments that say "let this be inferred".

**Exercises:**
- **L1 Recall:** Predict the inferred type of ten declarations, including `let`/`const` pairs.
- **L2 Application:** Remove every unnecessary annotation from a provided file without changing any inferred types.
- **L3 Challenge:** Find a case where inference produces a type that's *too wide* for your intent, and fix it with an annotation.
- **L4 Real-world:** Write a style guide paragraph for your team: "When we annotate".

#### Chapter 7 — Arrays, Tuples & Objects
`🟢 Beginner` · `Essential` · 📁 `07-arrays-tuples-objects/`

**Opens with:** a CSV row parsed into `[string, string, number]`, then accidentally treated as `string[]`, and a `user` object missing a field nobody noticed.
**Mental model:** *Arrays describe "many of the same"; tuples describe "a fixed sequence of specific things"; object types describe "a shape with named slots".*

1. **Array types** — `string[]` vs `Array<string>` (first sighting of generic syntax), arrays of objects.
2. **Readonly arrays** — `readonly string[]` / `ReadonlyArray`, why functions should accept readonly.
3. **Tuples** — fixed-length, labeled tuples, optional and rest elements; when to prefer an object.
4. **Object types** — inline object types, property access, nested objects.
5. **Optional properties** — `?`, `undefined` checks, and the difference from `prop: T | undefined`.
6. **Readonly properties** — shallow immutability, what readonly does *not* protect.
7. **Indexing safely** — `noUncheckedIndexedAccess` and why `arr[0]` might be `undefined`.

**Common mistakes:** tuples where an object would be clearer · assuming `readonly` is deep · trusting `arr[i]` without bounds checks.
**Connects:** tuples return in React hooks (`useState` returns a tuple, Ch 41/56); readonly arrays return in Ch 77 (variance).

**Exercises:**
- **L1 Recall:** Write types for five data samples (coordinates, an RGB tuple, a product, a cart).
- **L2 Application:** Type a function that accepts `readonly` arrays and returns a new array without mutation.
- **L3 Challenge:** Model a chessboard square and a move as types; justify tuple vs object choices.
- **L4 Real-world:** Type a real JSON sample from a public API (e.g., a weather response) by hand.

#### Chapter 8 — Naming Types: Aliases, Interfaces & Literal Types
`🟢 Beginner` · `Essential` · 📁 `08-naming-types/`

**Opens with:** the same 6-property object type copy-pasted into eight function signatures, then one copy drifts.
**Mental model:** *Naming a type is like naming a function: it creates a reusable concept with a single place to change it.*

1. **Type aliases** — `type User = {…}`, naming unions and primitives.
2. **Interfaces** — `interface User {…}`; first comparison with aliases (deep dive in Ch 12).
3. **Literal types** — `"todo" | "doing" | "done"`, numeric and boolean literals.
4. **Literal unions as vocabulary** — replacing magic strings, autocomplete for allowed values.
5. **Enums, and why many teams avoid them** — numeric vs string enums, emitted runtime code, `erasableSyntaxOnly`; literal unions and `as const` objects as alternatives.
6. **as const, first look** — freezing literal types (full treatment in Ch 20).
7. **Naming conventions** — PascalCase types, avoiding `I` prefixes, domain-driven names.

**Common mistakes:** stringly-typed status fields · numeric enums accepting surprising values in older TS versions · duplicate inline types.
**When not to:** don't name a type used exactly once in a local scope.

**Exercises:**
- **L1 Recall:** Convert three inline types into named aliases or interfaces.
- **L2 Application:** Replace magic strings in a provided order-processing module with literal unions.
- **L3 Challenge:** Rewrite an enum-based module three ways (enum, union, `as const` object); compare emitted JS and ergonomics.
- **L4 Real-world:** Define the TaskFlow vocabulary: `TaskStatus`, `Priority`, `Task`, `Project`. These are used by P02.

#### Chapter 9 — The Edge Types: any, unknown, never, void, null & undefined
`🟢 Beginner` · `Essential` · 📁 `09-edge-types/`

**Opens with:** a function returning `any` that slowly "infects" a whole module, so that every downstream value becomes `any` and errors stop appearing.
**Mental model:** 🧠 *`unknown` = "could be anything, prove it before use". `any` = "stop checking". `never` = "this cannot happen". `void` = "ignore the result".* (These become precise as set extremes in Ch 10.)

1. **any: the escape hatch** — what it disables, how it spreads, `noImplicitAny`.
2. **unknown: the safe "anything"** — you must narrow before use; the right type for untrusted input.
3. **null and undefined** — `strictNullChecks`, optional chaining `?.`, nullish coalescing `??`.
4. **The non-null assertion (!)** — what it promises, when it's acceptable, why it's a code smell.
5. **void** — functions that return nothing; `void` in callback types.
6. **never** — functions that never return, impossible branches (exhaustiveness preview).
7. **object, {} and Object** — why `{}` means "any non-nullish value" and what to use instead.

**Common mistakes:** `any` for convenience · `!` to silence nullability · `{}` meaning "an object".
**Connects:** `unknown` → narrowing (Ch 14) → runtime safety (Ch 32); `never` → exhaustiveness (Ch 14, 55).

**Exercises:**
- **L1 Recall:** Label each value's best type: `JSON.parse` result, `alert()` return, `throw`-only function.
- **L2 Application:** Replace every `any` in a small module with `unknown` plus checks, or with real types.
- **L3 Challenge:** Demonstrate how one `any` disables type-checking three function calls away.
- **L4 Real-world:** Audit an open-source TS file for `any` and `!`; propose safer alternatives in a mock PR comment.

> ✅ **Checkpoints:** in the book, each part ends with a checkpoint. For Parts I–VI they are collected in [Section 6](06-typescript-projects-and-checkpoints.md).

---

### Part III — Thinking in Types
> **Folder:** `03-thinking-in-types/` · **Roadmap:** Stage 2 — Thinking in Types · **Difficulty:** 🟢→🟡

**Purpose of the part.** The shift from "adding types to JavaScript" to *designing with types*. The reader acquires the master mental model (types as sets), learns to type functions and objects properly, and discovers the book's central modeling technique: **discriminated unions + narrowing = illegal states made unrepresentable.**

#### Chapter 10 — Understanding the Type System
`🟡 Intermediate` · `Essential` · 📁 `10-the-type-system/`

**Opens with:** three puzzles. Why can a `Dog` be passed where an `Animal` is expected even though they never mention each other? Why does an object literal with an extra property fail when the same object in a variable passes? Why is `"GET"` not a `string` variable's type?
**Mental model:** 🧠 **Types are sets of values.** `string` is the set of all strings; `"GET"` is a set with one member; `unknown` contains everything; `never` is empty. **Assignability means "fits inside"**: A is assignable to B when every value of A is also in B.

1. **Types as sets of values** — singleton, finite, and infinite sets; diagrams that return all book long.
2. **Assignability** — "is assignable to" as subset; reading errors through this lens.
3. **Structural typing** — compatibility by shape, not by name; contrast with nominal languages (Java/C#).
4. **Excess property checks** — why fresh object literals get stricter checks; the one place TS acts "nominal-ish".
5. **Widening and literal inference** — `let` vs `const`, widening in arrays and objects.
6. **Two worlds: type space and value space** — names that exist as types, values, or both (classes, enums); why `typeof x` means different things in each world.
7. **Type assertions (as)** — telling the compiler you know better; when it's legitimate (DOM, tests) and when it's a lie.
8. **unknown and never revisited** — the top and bottom of the set hierarchy.

**Common mistakes:** expecting nominal behavior · using `as` to "fix" an error instead of understanding it · confusing type-space `typeof` with JS `typeof`.
**Connects:** unions = set union (Ch 13), `extends` = subset (Ch 17), conditional types = "if subset" (Ch 23), variance (Ch 77).

**Exercises:**
- **L1 Recall:** For ten pairs of types, predict assignability in each direction.
- **L2 Application:** Draw set diagrams for `string`, `"a" | "b"`, `unknown`, `never`, and an object type with an optional property.
- **L3 Challenge:** Construct two structurally identical types that represent different concepts and show the bug this allows (sets up branded types, Ch 78).
- **L4 Real-world:** Review a PR snippet containing four `as` assertions; justify or replace each.

#### Chapter 11 — Typing Functions
`🟡 Intermediate` · `Essential` · 📁 `11-functions/`

**Opens with:** a team utility `formatPrice(value, opts)` called incorrectly in 14 places, because nothing told anyone what `opts` was, what it returned, or which arguments were optional.
**Mental model:** *A function type is a contract with two sides: what the caller must provide (parameters) and what the caller can rely on (return).*

1. **Parameter and return types** — annotations, inferred returns, when to annotate returns explicitly.
2. **Optional and default parameters** — `?`, defaults, inference from defaults, ordering rules.
3. **Rest parameters and spread arguments** — typed rest arrays and tuples.
4. **Function type expressions** — `(a: number) => string`, naming function types.
5. **Callbacks** — typing callbacks, `void` return in callbacks, contextual typing of inline callbacks.
6. **Higher-order functions** — functions that take or return functions; a typed `debounce`.
7. **Call signatures and construct signatures** — object types that are callable; functions with properties; `new` signatures.
8. **Overloads** — multiple call signatures, implementation signature, when a union is simpler.
9. **Typing this** — `this` parameters, arrow functions vs methods.
10. **Async functions** — `Promise<T>` return types, `async` inference, `Promise.all` with tuples.
11. **Generic functions (preview)** — "what if the return type depends on the argument type?" Cliffhanger for Ch 16.

**Common mistakes:** overloads where a union would do · `Function` as a type · forgetting that optional params must come last · `async` functions declared as returning `T` instead of `Promise<T>`.
**When not to:** avoid overloads unless return types genuinely differ by input; avoid explicit `this` typing in new code (prefer plain functions).
**Real world:** typing an event handler registry and a `fetch` wrapper.
**Project:** P03 Utility Toolkit (string, array, and async helpers).

**Exercises:**
- **L1 Recall:** Write function types for five described functions (a comparator, a predicate, an async loader…).
- **L2 Application:** Type a `debounce(fn, ms)` that preserves the callback's parameter types (non-generic version, accepting the limitation).
- **L3 Challenge:** Design overloads for `createElement("input" | "a" | "div")` returning different element types; then replace them with a lookup approach later (revisited in Ch 20).
- **L4 Real-world:** Type an existing untyped `api.js` module with eight functions, including callbacks and async functions.

#### Chapter 12 — Objects, Interfaces & Composition
`🟡 Intermediate` · `Essential` · 📁 `12-objects-and-interfaces/`

**Opens with:** `AdminUser`, `GuestUser`, and `Customer` types with 70% overlapping properties, and a change to `email` that has to be made in three places.
**Mental model:** *Build object types like LEGO: small named pieces composed into larger ones. Prefer composition (`&`, `extends`) over copy-paste.*

1. **Object types in depth** — nested types, methods vs function properties, optional methods.
2. **Index signatures and Record** — dictionaries, `{ [key: string]: T }`, `Record<string, T>` preview, `noUncheckedIndexedAccess` revisited.
3. **Interfaces vs type aliases** — the real differences (declaration merging, unions, error messages, performance); a decision rule.
4. **Extending interfaces** — `extends`, multiple inheritance of shapes, overriding property types.
5. **Composition with intersections** — `A & B` for mixing shapes; preview of the set view in Ch 13.
6. **Declaration merging** — interfaces that reopen; why this matters for library augmentation (Ch 28).
7. **Recursive types** — trees, nested comments, a `Json` type.
8. **Modeling a domain** — entities, value objects, and relationships for TaskFlow.

**Common mistakes:** index signatures that make every property optional-in-disguise · deep inheritance hierarchies · interfaces accidentally merging.
**When not to:** don't create a base interface for two types that merely *look* alike today.
**Project:** P02 TaskFlow Core (model + in-memory operations).

**Exercises:**
- **L1 Recall:** Convert three overlapping types into a base type plus extensions.
- **L2 Application:** Type a configuration object that mixes known keys with arbitrary string keys.
- **L3 Challenge:** Write a recursive `Json` type and a function that counts all leaf values in a `Json` value.
- **L4 Real-world:** Model the domain of a library-lending system (members, books, loans, holds) and defend each design decision.

#### Chapter 13 — Unions & Intersections: The Algebra of Types
`🟡 Intermediate` · `Essential` · 📁 `13-unions-and-intersections/`

**Opens with:** a request-state object with `isLoading`, `error`, and `data` booleans and nullables: 8 possible combinations, of which only 3 make sense. A bug ships where `isLoading` and `error` are both set.
**Mental model:** 🧠 *A union is OR (set union): a value is one of several alternatives. An intersection is AND (set intersection): a value satisfies all constraints at once.* The counterintuitive part: intersecting object types yields *more* properties, because the set of values that satisfy both shapes is smaller.

1. **Union types** — `string | number`; what you can do with a union (only what's common to all members).
2. **Literal unions** — finite vocabularies; unions of unions.
3. **Intersection types** — combining shapes; intersecting incompatible primitives yields `never`.
4. **The set view** — diagrams that explain why unions narrow capabilities and intersections widen properties.
5. **Discriminated unions** — a shared literal tag (`kind`, `status`, `type`); the most important modeling tool in this book.
6. **Making illegal states unrepresentable** — the boolean-soup refactor: `{ status: "loading" } | { status: "error"; error } | { status: "success"; data }`.
7. **Designing union types** — choosing a discriminant, flat vs nested unions, unions of objects vs objects of unions.

**Common mistakes:** "optional everything" objects instead of unions · discriminants that aren't literal types · using intersections to merge conflicting properties.
**Connects:** narrowing (Ch 14); UI state (Ch 52); reducer actions (Ch 55); API errors (Ch 61); discriminated props (Ch 85).

**Exercises:**
- **L1 Recall:** Rewrite three boolean-flag objects as discriminated unions.
- **L2 Application:** Model payment methods (card, bank transfer, wallet), each with its own required fields.
- **L3 Challenge:** Model a traffic light's states *and* allowed transitions so invalid transitions don't type-check.
- **L4 Real-world:** Model TaskFlow's task lifecycle (draft → active → blocked → done → archived) with the data each state requires.

#### Chapter 14 — Narrowing & Control-Flow Analysis
`🟡 Intermediate` · `Essential` · 📁 `14-narrowing/`

**Opens with:** a `string | number | null` parameter and the question every TS developer asks: "TypeScript knows it *could* be a number; how do I tell it that it *is* one, right here?"
**Mental model:** 🧠 *TypeScript reads your code like a detective. Every `if`, `return`, and `throw` is evidence, and the type of a variable is what's still possible at that point in the code.*

1. **typeof narrowing** — primitives, the `typeof null === "object"` trap.
2. **Truthiness narrowing** — and its pitfalls (`0`, `""`, `NaN`).
3. **Equality narrowing** — `===`, `!==`, `== null` for both null and undefined.
4. **The in operator** — narrowing by property presence.
5. **instanceof** — class-based narrowing; errors and dates.
6. **Narrowing discriminated unions** — `switch` on the tag; the payoff of Ch 13.
7. **Control-flow analysis** — early returns, assignments, how narrowing is lost across callbacks.
8. **User-defined type guards** — `x is T` predicates; inferred type predicates in newer TS (e.g., `.filter(x => x !== undefined)`).
9. **Assertion functions** — `asserts x is T`, `asserts condition`; invariants.
10. **Exhaustiveness checking with never** — `assertNever`, `satisfies never`; making the compiler tell you about new union members.
11. **Narrowing unknown errors** — `catch (e)` is `unknown`; narrowing to `Error`.

**Common mistakes:** type guards that lie (the predicate isn't actually checked) · narrowing lost inside callbacks · truthiness checks that drop `0`.
**When not to:** don't write a type guard where `in`/`typeof`/a discriminant already works.
**Real world:** handling a union of API error shapes; exhaustive reducers (Ch 55).

**Exercises:**
- **L1 Recall:** For eight code points, write the narrowed type (predict-the-type).
- **L2 Application:** Write `isTask(value: unknown): value is Task` for TaskFlow and use it to filter parsed JSON.
- **L3 Challenge:** Add a new union member to a 3-file codebase and use exhaustiveness checks so the compiler lists every place to update.
- **L4 Real-world:** Write an `assertIsDefined` helper and refactor a file that uses six `!` assertions.

#### Chapter 15 — Classes in TypeScript
`🟡 Intermediate` · `Essential` · 📁 `15-classes/`

**Opens with:** a `BankAccount` whose `balance` can be set to `-1000` by any caller, and a team debating whether to use classes at all.
**Mental model:** *A class is a factory for objects that bundles data and behavior, plus a type of the same name. TypeScript adds compile-time access control and contracts; JavaScript (with `#private`) adds runtime privacy.*

1. **Classes and constructors** — fields, initialization, `strictPropertyInitialization`.
2. **Access modifiers** — `public`, `private`, `protected`; compile-time vs runtime privacy (`private` vs `#field`).
3. **readonly and parameter properties** — shorthand constructors and why `erasableSyntaxOnly` discourages them.
4. **Getters and setters** — computed and validated properties.
5. **Static members** — factories, registries, constants.
6. **implements** — classes satisfying interfaces; programming to an interface.
7. **Inheritance** — `extends`, `super`, `override` (and `noImplicitOverride`).
8. **Abstract classes** — template methods; abstract vs interface.
9. **Polymorphism** — substituting implementations (in-memory vs persistent repositories).
10. **Custom error classes** — `class NotFoundError extends Error`; `instanceof` narrowing; `cause`.
11. **Classes vs functions and types** — practical design decisions; when classes shine (stateful services, errors, SDKs) and when plain objects + functions are simpler (most React code).
12. **Decorators (orientation)** — ⏭ *Safe to skip:* standard decorators exist and appear in frameworks like Angular and NestJS.

**Common mistakes:** deep inheritance trees · `private` mistaken for runtime security · classes holding React UI state.
**When not to:** don't wrap stateless functions in a class "for organization".

**Exercises:**
- **L1 Recall:** Convert a constructor function to a class with proper modifiers.
- **L2 Application:** Implement `TaskRepository` as an interface with an `InMemoryTaskRepository` class.
- **L3 Challenge:** Build an error hierarchy (`AppError` → `ValidationError`, `NotFoundError`) and a function that maps them to user messages exhaustively.
- **L4 Real-world:** Refactor a 200-line "god class" into composed objects and functions; explain what got simpler.

> 🛠 **Part III project:** P02 TaskFlow Core and P03 Utility Toolkit (specs in Section 6).

---

### Part IV — Generics & Type Transformations
> **Folder:** `04-generics-and-type-transformations/` · **Roadmap:** Stage 3 — Abstraction with Types · **Difficulty:** 🟡→🟠 · ⭐ **Major milestone**

**Purpose of the part.** The reader learns to write code that is *reusable without being vague*. Generics are taught slowly, from `first<T>` to designing generic APIs. Then the reader learns to **derive types from other types and values**, which removes duplication. The order is deliberate: **use** utility types (Ch 21) before **building** them with mapped and conditional types (Ch 22–23).

#### Chapter 16 — Why Generics?
`🟡 Intermediate` · `Essential` · 📁 `16-why-generics/`

**Opens with:** `firstString`, `firstNumber`, `firstUser`… then `first(items: any[]): any`, which "works" and destroys every guarantee. (Full blueprint in §2.9.)
**Mental model:** 🧠 *A type parameter is a function parameter for types, usually filled in by inference at the call site.*

1. **The duplication problem** — copy-paste functions vs `any`; what each costs.
2. **You've used generics already** — `Array<T>`, `Promise<T>`, `Map<K, V>`, `Set<T>` decoded.
3. **Type parameters** — declaring `<T>`, using `T` to connect input and output.
4. **Inference at the call site** — how TypeScript fills in `T`; explicit type arguments and when they're needed.
5. **The golden rule** — a type parameter must appear at least twice; the "lying generic" (`fetchJson<T>`) as a disguised assertion.
6. **Generics vs unions vs unknown** — choosing the right tool.

**Common mistakes:** single-use type parameters · explicit type arguments everywhere · generics where a union is clearer.

**Exercises:**
- **L1 Recall:** Predict `T` for six calls of a generic function.
- **L2 Application:** Collapse three duplicated utilities from P03 into one generic each.
- **L3 Challenge:** Write `zip<A, B>(as: A[], bs: B[]): [A, B][]`.
- **L4 Real-world:** Implement `retry<T>(fn: () => Promise<T>, attempts: number): Promise<T>` with tests.

#### Chapter 17 — Generic Functions, Constraints & keyof
`🟡 Intermediate` · `Essential` · 📁 `17-generic-functions-and-constraints/`

**Opens with:** `getProperty(obj, key)` returns `unknown` for everything, and accepts keys that don't exist.
**Mental model:** 🧠 *A constraint (`T extends X`) is a minimum requirement: "T can be anything that fits inside X". `keyof T` is the set of T's property names.*

1. **Multiple type parameters** — `map<T, U>`, relating parameters to each other.
2. **Generic constraints** — `T extends { length: number }`; what you may do with a constrained `T`.
3. **keyof** — the union of property names; `keyof` on interfaces, records, arrays.
4. **keyof with generics** — `<T, K extends keyof T>(obj: T, key: K): T[K]`.
5. **Indexed access in generics** — `T[K]` as "the type of property K of T".
6. **Constraints that reference other parameters** — `pluck`, `sortBy`, `groupBy` with `PropertyKey`.
7. **When constraints make APIs worse** — over-constrained vs under-constrained signatures.

**Common mistakes:** `T extends any` · constraining to `object` when a specific shape is needed · returning `T` when the function actually returns the constraint type.

**Exercises:**
- **L1 Recall:** Write the constraint for "anything with an `id: string`".
- **L2 Application:** Implement `sortBy<T, K extends keyof T>(items, key)` with correct comparisons.
- **L3 Challenge:** Implement `pick<T, K extends keyof T>(obj, keys: K[])` and get the precise return type (preview of `Pick`).
- **L4 Real-world:** Write a typed `findById<T extends { id: string }>` and `upsert` for TaskFlow's store, with tests.

#### Chapter 18 — Generic Types, Interfaces, Classes & Defaults
`🟡 Intermediate` · `Essential` · 📁 `18-generic-types/`

**Opens with:** `TaskResponse`, `UserResponse`, and `ProjectResponse` are identical except for their `data` property.
**Mental model:** *A generic type is a type-level function: give it a type, get a type back. `ApiResponse<User>` is "ApiResponse applied to User".*

1. **Generic type aliases** — `type ApiResponse<T> = { data: T; meta: Meta }`.
2. **Generic interfaces** — `interface Repository<T> { … }`.
3. **Generic classes** — `class Stack<T>`, `class TypedCache<K, V>`.
4. **Generic defaults** — `<T = unknown>`, ordering rules, when defaults help library users.
5. **Result<T, E>** — modeling success and failure as data (feeds Ch 33).
6. **Generic inference in depth** — inference from multiple sites, contextual typing, `const` type parameters, `NoInfer`.
7. **Variance intuition (preview)** — why `Box<Dog>` vs `Box<Animal>` can be subtle; full treatment in Ch 77.

**Common mistakes:** generic types with unused parameters · defaults that hide errors · confusing generic *types* with generic *functions*.

**Exercises:**
- **L1 Recall:** Define `Paginated<T>` and use it for two entities.
- **L2 Application:** Implement `Stack<T>` and `Queue<T>` with tests.
- **L3 Challenge:** Implement `Result<T, E>` with `map`, `mapError`, and `unwrapOr` helpers.
- **L4 Real-world:** Design `Repository<T, Id>` and implement it for tasks and projects.

#### Chapter 19 — Designing Reusable Generic APIs
`🟠 Advanced` · `Essential` · 📁 `19-reusable-generic-apis/`

**Archetype:** Pattern / integration chapter. **Opens with:** a "flexible" utility with five type parameters that nobody on the team can call correctly.
**Mental model:** *Good generic APIs are inference-first: callers never write angle brackets. Complexity lives inside; simplicity is the interface.*

1. **Inference-first design** — design the call site first, then the signature.
2. **Practical generic patterns** — collection helpers, typed store, factory functions, `pipe` (bounded arity).
3. **Typed key-value registries** — mapping string keys to value types (event-emitter preview).
4. **Testing generic code** — runtime tests plus type tests (`expectTypeOf`, `@ts-expect-error`).
5. **Over-generic smells** — too many parameters, unreadable errors, abstraction for a single caller.
6. **Documenting generic APIs** — TSDoc for type parameters, usage examples.

**When not to:** generalize the second time you need something, not the first; "rule of three".
**Project:** P04 Generic Utility Library.

**Exercises:**
- **L1 Recall:** Identify which of five signatures violate the golden rule.
- **L2 Application:** Write type tests for three helpers from Ch 16–18.
- **L3 Challenge:** Design a typed `createStore<State>()` with `get`, `set`, and `subscribe`.
- **L4 Real-world:** Review an over-generic PR and propose a simpler API with the same safety.

#### Chapter 20 — Deriving Types from Values: keyof, typeof, Indexed Access, as const & satisfies
`🟡 Intermediate` · `Essential` · 📁 `20-deriving-types/`

**Opens with:** a `ROLES` array and a `Role` union defined separately. Someone adds `"auditor"` to the array but not to the type.
**Mental model:** 🧠 *Single source of truth: write the value once, and derive its type. Types should follow data, not shadow it.*

1. **typeof in type position** — capturing the type of a value or function.
2. **keyof typeof** — deriving key unions from objects.
3. **Indexed access types** — `User["address"]`, `Tasks[number]`, nested lookups.
4. **as const in depth** — readonly literal inference for objects and arrays; `typeof ROLES[number]`.
5. **satisfies** — validate a value against a type *without* widening it; `as` vs annotation vs `satisfies`.
6. **Lookup tables instead of overloads** — the Ch 11 `createElement` challenge, solved with a map type.
7. **Deriving types from config** — routes, feature flags, and permissions from one object.

**Common mistakes:** annotating config objects (losing literal types) when `satisfies` was needed · confusing `typeof` worlds · `as const` on mutable state.

**Exercises:**
- **L1 Recall:** Derive `Status` from a `STATUSES` array.
- **L2 Application:** Turn a hand-written route list and its `RouteName` union into a single `as const` object.
- **L3 Challenge:** Use `satisfies` to validate a theme object while preserving exact token names.
- **L4 Real-world:** Refactor TaskFlow so every literal union is derived from a runtime constant (useful for dropdown options later).

#### Chapter 21 — Utility Types: TypeScript's Standard Library
`🟡 Intermediate` · `Essential` · 📁 `21-utility-types/`

**Opens with:** `UpdateTaskInput`, `CreateTaskInput`, `TaskPreview`, and `TaskWithoutId` all hand-copied from `Task`, and all slowly drifting.
**Mental model:** *Utility types are functions from types to types, shipped with the language. Learn them as tools first; Chapters 22–23 open the box.*

Every utility follows **Problem → Naive solution → Utility type → Why it is better**:

1. **Partial and Required** — update payloads; "all fields optional" vs "all fields required".
2. **Readonly** — freezing configuration and state at the type level.
3. **Pick and Omit** — previews and DTOs; `Omit`'s looseness (keys aren't checked against `T`).
4. **Record** — dictionaries keyed by unions (`Record<Status, Task[]>`).
5. **Exclude, Extract and NonNullable** — filtering unions.
6. **ReturnType and Parameters** — deriving from functions you don't own.
7. **ConstructorParameters and InstanceType** — deriving from classes.
8. **Awaited** — unwrapping promises (including nested ones).
9. **Combining utilities** — `Partial<Omit<Task, "id">> & Pick<Task, "id">`; readability limits.
10. **Utility types in the wild** — reading library types that use them.

**Common mistakes:** `Partial` on everything (losing required fields) · stacked utilities nobody can read · `Omit` with typos in keys.

**Exercises:**
- **L1 Recall:** Name the utility for eight described transformations.
- **L2 Application:** Replace four hand-copied TaskFlow types with derived ones.
- **L3 Challenge:** Type a third-party function's callback using `Parameters<typeof lib.on>[1]`.
- **L4 Real-world:** Define `CreateTaskDto`, `UpdateTaskDto`, and `TaskSummary` from `Task` for the upcoming API.

#### Chapter 22 — Mapped Types: Transforming Object Types
`🟠 Advanced` · `Essential` · 📁 `22-mapped-types/`

**Opens with:** "How does `Partial` actually work? And how would I make a type where every property becomes a getter function?"
**Mental model:** 🧠 *A mapped type is a `for…in` loop over keys at the type level: for each key K, produce a new property.*

1. **The mapping syntax** — `{ [K in keyof T]: T[K] }`, identity mapping.
2. **Rebuilding Partial, Required, Readonly, Pick and Record** — the box, opened.
3. **Modifiers** — `?`, `readonly`, and removing them with `-?` and `-readonly`.
4. **Key remapping with as** — renaming keys (`getName`), filtering keys out.
5. **Homomorphic mapped types** — why mapping `keyof T` preserves modifiers.
6. **Mapping over unions of keys** — creating handler maps and flags objects.

**Common mistakes:** mapping over `string` instead of `keyof T` · losing optionality unknowingly · unreadable one-liners.

**Exercises:**
- **L1 Recall:** Rebuild `Readonly<T>` and `Partial<T>` from memory.
- **L2 Application:** Write `Nullable<T>` (every property `| null`) and `Mutable<T>`.
- **L3 Challenge:** Write `Getters<T>` producing `getName(): string` for each property.
- **L4 Real-world:** Generate a `FormErrors<T>` type (each field: `string | undefined`) for the forms chapters ahead.

#### Chapter 23 — Conditional Types & infer
`🟠 Advanced` · `Advanced` · 📁 `23-conditional-types/`

**Opens with:** "How does `ReturnType` extract a return type? And how does `Exclude` remove members from a union?"
**Mental model:** 🧠 *A conditional type is a type-level ternary: `T extends U ? X : Y` asks "does T fit inside U?". `infer` is pattern matching: "if T looks like this shape, capture the part I mark."*

1. **Conditional type syntax** — `T extends U ? X : Y` read through the set model.
2. **Distributive conditional types** — conditionals over unions apply per member; rebuilding `Exclude` and `Extract`.
3. **Turning distribution off** — `[T] extends [U]`; why it matters.
4. **infer** — pattern matching on function, array, and promise shapes.
5. **Rebuilding NonNullable, ReturnType, Parameters and Awaited** — the box, opened.
6. **Conditional types in function signatures** — and the limits of narrowing generic return types.

**Common mistakes:** surprise distribution · conditional types where overloads are clearer · writing what a built-in already does.
**When not to:** if a mapped type or a utility type expresses it, prefer that.

**Exercises:**
- **L1 Recall:** Evaluate six conditional types by hand, including distributive cases.
- **L2 Application:** Write `ElementType<T>` that extracts the element type of an array (or returns `T`).
- **L3 Challenge:** Write `UnwrapPromiseDeep<T>` and compare it with `Awaited`.
- **L4 Real-world:** Extract the payload type of every action creator in a provided module (sets up Ch 55).

#### Chapter 24 — Template Literal Types & Custom Utility Types
`🟠 Advanced` · `Advanced` · 📁 `24-template-literals-and-custom-utilities/`

**Opens with:** an event system where `"task:created"` and `"task:create"` are both accepted, and only one actually fires.
**Mental model:** *Template literal types are string templates evaluated by the type checker. Combined with mapped and conditional types, they let you build your own type tools, and they create the responsibility to stop before it gets clever.*

1. **Template literal types** — `` `task:${Action}` ``; combining unions produces cross products.
2. **Intrinsic string types** — `Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize`.
3. **Key remapping with template literals** — `onClick`-style handler names from keys.
4. **Building custom utility types** — `ValueOf<T>`, `PartialBy<T, K>`, `RequireAtLeastOne<T>`, `DeepPartial` (recursive preview).
5. **Testing custom types** — type tests as specifications.
6. **The complexity budget** — when a custom utility pays for itself; readability for teammates.

**When not to:** if a teammate can't read it in 30 seconds, it needs a name, a comment, a test, or deletion.
**Project:** P05 Type-Safe Event Emitter.

**Exercises:**
- **L1 Recall:** Generate `"get" | "set"` × `"Name" | "Age"` method names with a template literal type.
- **L2 Application:** Write `PartialBy<T, K>` with type tests.
- **L3 Challenge:** Build a typed `on("task:created", handler)` where the handler payload depends on the event name.
- **L4 Real-world:** Create the `types/` utility module for TaskFlow with five documented, tested custom utilities.

---

### Part V — The TypeScript Toolchain & Ecosystem
> **Folder:** `05-toolchain-and-ecosystem/` · **Roadmap:** Stage 4 — TypeScript in Real Projects · **Difficulty:** 🟡

**Purpose of the part.** The language is in place; now the reader learns the *environment* it lives in: modules, configuration, the daily toolchain (run, lint, format, test), the declaration-file ecosystem, and how to bring TypeScript into existing JavaScript. Every setting is taught by **what it changes**, not by listing options.

#### Chapter 25 — Modules: ESM, CommonJS & Type-Only Imports
`🟡 Intermediate` · `Essential` · 📁 `25-modules/`

**Opens with:** `ERR_REQUIRE_ESM`, `Cannot use import statement outside a module`, and a type import that crashes at runtime because it was compiled into a real `require`.
**Mental model:** 🧠 *Two module systems (ESM, CommonJS), one compiler that must know which one your runtime expects, and type imports that must disappear cleanly during erasure.*

1. **Why two module systems exist** — CommonJS history (Node), ES Modules (the standard), `"type": "module"`.
2. **How TypeScript sees a module** — files with imports/exports vs global scripts.
3. **Type-only imports and exports** — `import type`, inline `type` modifiers, why single-file transpilers need them.
4. **verbatimModuleSyntax** — "what you write is what you get" for imports.
5. **Module resolution** — `bundler` vs `nodenext`; file extensions in imports; `package.json` `exports`.
6. **ESM/CJS interoperability** — default-export confusion, `esModuleInterop`, requiring ESM from CJS in modern Node.
7. **Barrel files** — convenience vs cycles, slower builds, and tree-shaking costs.

**Common mistakes:** mixing module systems accidentally · missing `.js` extensions under `nodenext` · barrel files that create circular imports.

**Exercises:**
- **L1 Recall:** For six import statements, say what survives erasure.
- **L2 Application:** Convert a small CJS package to ESM; fix every resulting error.
- **L3 Challenge:** Reproduce and fix a circular-import bug caused by a barrel file.
- **L4 Real-world:** Write the module strategy (resolution, extensions, barrels policy) for the TaskFlow repository.

#### Chapter 26 — tsconfig Demystified
`🟡 Intermediate` · `Essential` · 📁 `26-tsconfig/`

**Archetype:** Tooling chapter. **Opens with:** two developers on one repo seeing different errors, because one editor picked up a different `tsconfig.json`.
**Mental model:** *A tsconfig answers four questions: Which files? How strict? What JavaScript comes out? What environment does the code run in?*

1. **Which files: include, exclude, files, rootDir** — and why your tests are (or aren't) type-checked.
2. **How strict: the strict family** — `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes` and friends; plus `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`.
3. **What comes out: target, outDir, sourceMap, declaration** — before/after output for each.
4. **What environment: lib, types, module, moduleResolution** — DOM vs Node globals; why `document` "doesn't exist".
5. **Transpiler-friendly flags** — `isolatedModules`, `verbatimModuleSyntax`, `erasableSyntaxOnly`.
6. **Path aliases** — `paths`, and why the runtime or bundler must agree with them.
7. **Extending configs** — base configs, `@tsconfig/*` presets, per-folder overrides.
8. **Project references (introduction)** — `composite`, `tsc -b`; full treatment in Ch 94.
9. **Recommended configs** — app (bundler), Node service, and library templates, each line justified.

**Common mistakes:** `skipLibCheck` hiding real problems (and when it's fine) · path aliases that compile but fail at runtime · enabling `allowJs` without `checkJs` and wondering why nothing is checked.

**Exercises:**
- **L1 Recall:** Match ten options to what they change (output, checking, file set, environment).
- **L2 Application:** Turn on `noUncheckedIndexedAccess` in TaskFlow and fix every new error.
- **L3 Challenge:** Configure a repo where `src/` targets the browser and `scripts/` targets Node, with no global type leakage.
- **L4 Real-world:** Write a tsconfig "decision record" for the TaskFlow monorepo-to-be.

#### Chapter 27 — The Everyday Toolchain: Run, Lint, Format & Test
`🟡 Intermediate` · `Essential` · 📁 `27-everyday-toolchain/`

**Opens with:** a pull request that type-checks but contains a floating promise, inconsistent formatting, and a regression no one tested.
**Mental model:** 🧠 *Each tool owns one question.* `tsc`: "is it consistent?" ESLint: "is it suspicious?" Prettier: "is it formatted?" Vitest: "does it behave?"

1. **Running TS in development** — `tsx` and Node type stripping vs `tsc` builds; `typecheck` as a separate script.
2. **ESLint with typescript-eslint** — flat config, type-aware rules (`no-floating-promises`, `no-unsafe-*`, `switch-exhaustiveness-check`).
3. **Formatting with Prettier** — why formatting is not a code-review topic.
4. **Vitest in depth** — configuration, test organization, test doubles, watch mode, coverage (building on the preconfigured runner used since Ch 19).
5. **Type tests in depth** — `expectTypeOf`, `@ts-expect-error` as a test, testing the utility types from Ch 21–22 (and your own from Ch 24, if you've read it).
6. **Editor integration and scripts** — format-on-save, lint-on-save, `npm run check` combining all tools.
7. **Git hooks (orientation)** — pre-commit checks and their trade-offs.

**Common mistakes:** relying on the bundler to type-check · disabling lint rules instead of fixing causes · tests that pass because they're typed `any`.

**Exercises:**
- **L1 Recall:** For six problems, name the tool that should catch each one.
- **L2 Application:** Add ESLint (type-aware) and Prettier to the P04 utility library, fix what they find, and raise its test coverage to 90%.
- **L3 Challenge:** Write type tests that fail if someone loosens a utility type's return type.
- **L4 Real-world:** Create a `check` script and a pre-commit hook for TaskFlow; document it in the README.

#### Chapter 28 — Declaration Files & the Type Ecosystem
`🟡 Intermediate` · `Essential` · 📁 `28-declaration-files/`

**Opens with:** `Could not find a declaration file for module 'legacy-charts'. Implicitly has an 'any' type.`
**Mental model:** 🧠 *A `.d.ts` file is a type-only description of JavaScript that exists elsewhere: a contract with no implementation.*

1. **What declaration files are** — `.d.ts`, how `lib.dom.d.ts` and `@types/node` describe environments.
2. **@types and DefinitelyTyped** — where third-party types come from; bundled types vs `@types/*`; version alignment.
3. **declare and ambient declarations** — `declare const`, `declare function`, `declare module`.
4. **Typing an untyped library** — a minimal declaration first, refined over time.
5. **Global declarations** — `declare global`, `window` extensions, and why globals are a last resort.
6. **Module augmentation** — adding fields to a library's types (e.g., a theme or a request object).
7. **Declaration merging, revisited** — interfaces and namespaces merging across files.
8. **Generating declarations** — `declaration`, `declarationMap`, and the basics of library authoring (deepened in Ch 92).

**Common mistakes:** a `declare module "*"` catch-all hiding everything · editing files in `node_modules/@types` · augmentations that don't apply because the file isn't a module.

**Exercises:**
- **L1 Recall:** Write declarations for a provided three-function JS file.
- **L2 Application:** Augment `Window` with a typed analytics global.
- **L3 Challenge:** Type an untyped event-based JS library, including callback overloads.
- **L4 Real-world:** Publish-ready `.d.ts` output for P04, verified by consuming it from another package.

#### Chapter 29 — From JavaScript to TypeScript: Interop & Migration
`🟡 Intermediate` · `Advanced` · 📁 `29-js-interop-and-migration/`

**Opens with:** a 15,000-line JavaScript app, a team that can't stop shipping features, and a mandate to "move to TypeScript".
**Mental model:** *Migration is a ratchet, not a rewrite: each step makes the codebase strictly safer and is shippable on its own.*

1. **allowJs and checkJs** — mixing JS and TS; type-checking JavaScript files.
2. **JSDoc types** — `@type`, `@param`, `@typedef` in JS; JSDoc as a migration stepping stone.
3. **Mixed JS/TS projects** — imports across languages, declaration boundaries.
4. **A gradual migration strategy** — leaf-first vs core-first, rename passes, migration tracking.
5. **Taming legacy code** — typing dynamic patterns (mixins, string-keyed lookups, config blobs).
6. **Strictness migration** — enabling strict flags one at a time; per-file escape hatches.
7. **Reducing any** — measuring type coverage, lint rules, codemods, a burn-down chart.

**Project:** P06 Legacy JS → TS Migration (realistic multi-stage migration).

**Exercises:**
- **L1 Recall:** Annotate a JS function with JSDoc so `checkJs` catches a bug.
- **L2 Application:** Enable `checkJs` on the migration project and fix the first ten errors.
- **L3 Challenge:** Type a legacy mixin-based module without rewriting its design.
- **L4 Real-world:** Write a migration plan (phases, metrics, risks) for a team of five over one quarter.

---

### Part VI — TypeScript on the Server & at the Boundaries
> **Folder:** `06-server-and-boundaries/` · **Roadmap:** Stage 4 — TypeScript in Real Projects · **Difficulty:** 🟡→🟠

**Purpose of the part.** The reader builds a real backend and confronts the book's most important lesson head-on: **a compile-time guarantee is not runtime safety.** The API is first built trusting its inputs, then broken by real-world data, then rebuilt with validated boundaries.

```
TypeScript ───► compile-time guarantee about YOUR code
            ✗   does NOT mean
External data ─► automatically safe at runtime
```

#### Chapter 30 — TypeScript on Node.js
`🟡 Intermediate` · `Essential` · 📁 `30-typescript-on-node/`

**Opens with:** a script that reads `config.json`, uses `process.env.PORT`, and crashes in production because `PORT` was `undefined` and the JSON had a typo.
**Mental model:** *Node gives you a typed standard library (via `@types/node`) and an untyped outside world (files, env, network).*

1. **Setting up Node + TypeScript** — `@types/node`, `module: nodenext`, running with `tsx` or type stripping, building with `tsc`.
2. **Node's type definitions** — `process`, `Buffer`, `node:` imports, globals vs browser globals.
3. **Environment variables** — `process.env` is `string | undefined`; a naive config module (revisited in Ch 32).
4. **The file system** — `node:fs/promises`, paths, reading JSON (`JSON.parse` returns `any`, and that's a trap).
5. **Async patterns** — `Promise.all`, `AbortSignal` and timeouts, streams in brief.
6. **Configuration modules** — centralizing config with typed exports.
7. **Scripts and CLIs** — typed argument parsing, exit codes.

**Exercises:**
- **L1 Recall:** Type a function that reads and parses a JSON file, returning `unknown`.
- **L2 Application:** Write a typed CLI that summarizes a CSV file.
- **L3 Challenge:** Add timeouts and cancellation to a batch file processor with `AbortSignal`.
- **L4 Real-world:** Build TaskFlow's import/export CLI (JSON ↔ CSV).

#### Chapter 31 — Building a Typed HTTP API
`🟡 Intermediate` · `Essential` · 📁 `31-typed-http-api/`

**Opens with:** a single 600-line `server.ts` where routes, SQL, validation, and business rules are tangled together.
**Mental model:** 🧠 *Layers with typed seams.* Routes (HTTP) → Services (business rules) → Repositories (data). Each layer speaks its own types, and types make the seams visible.

1. **HTTP from first principles** — `node:http`: the body arrives as bytes, not as a `User`.
2. **Choosing a framework** — Express (ubiquitous; `req.body` is `any`), with Fastify and Hono as type-first alternatives.
3. **API models and DTOs** — domain types vs request/response types; why they differ.
4. **Typing requests and responses** — route params, query strings, bodies, and status codes.
5. **Service layer** — business rules as plain typed functions or classes; no HTTP inside.
6. **Repository pattern** — `TaskRepository` interface; in-memory first, then SQLite.
7. **Database types** — schema-first types with a TS-first query layer; mapping rows to domain types.
8. **API contracts** — documenting the contract, versioning, and the idea of shared types (deepened in Ch 94).

**Common mistakes:** leaking DB rows to API responses · business logic in route handlers · trusting `req.body` (deliberately left in, for Ch 32 to break).
**Project:** P07 TaskFlow API (this chapter builds v1).

**Exercises:**
- **L1 Recall:** Write `CreateTaskRequest` and `TaskResponse` DTOs derived from `Task`.
- **L2 Application:** Implement the service layer with an in-memory repository and unit tests.
- **L3 Challenge:** Swap the repository to SQLite without touching services or routes.
- **L4 Real-world:** Add pagination, filtering, and sorting endpoints with typed query parameters.

#### Chapter 32 — Runtime Safety: Trust Nothing at the Boundary
`🟠 Advanced` · `Essential` · 📁 `32-runtime-safety/`

**Opens with:** the Ch 31 API receives `{ "title": 42, "priority": "urgent!!" }` and stores it happily. TypeScript said `CreateTaskRequest`; the network said otherwise.
**Mental model:** 🧠 *Parse, don't validate (or cast).* At every boundary, data enters as `unknown` and leaves as a trusted type **only** through a parser that checks it. Inside the boundary, types can be trusted; outside, nothing can.

1. **What TypeScript believes vs what runtime receives** — the `as` lie demonstrated end to end.
2. **Mapping your application's boundaries** — network, files, env, storage, URLs, user input, third-party code.
3. **unknown as the boundary type** — making untrusted data *unusable* until checked.
4. **Hand-written validation** — type guards for a real DTO, and why they're tedious and drift-prone.
5. **Schema validation** — Zod schemas; parse vs safeParse; error formatting.
6. **Types inferred from schemas** — `z.infer`: one source of truth for runtime checks *and* static types.
7. **API validation** — validating requests (400s with useful messages) and *responses* from upstream services.
8. **Environment validation** — failing fast at startup with a validated config object.
9. **User input and external files** — CSV imports, uploaded JSON, query strings and coercion.
10. **Where to validate (and where not to)** — validate at edges, not in every function; cost and performance.

**Common mistakes:** validating then casting anyway · validating deep inside business logic · duplicate types alongside schemas · forgetting to validate responses from "trusted" services.
**When not to:** don't re-validate data that never crossed a boundary.
**Project:** P07 TaskFlow API v2 (validated) and P08 Typed API Client.

**Exercises:**
- **L1 Recall:** Mark the trust boundaries in a provided architecture diagram.
- **L2 Application:** Replace every `as` in TaskFlow API with schema parsing.
- **L3 Challenge:** Write a hand-rolled `parseTask(value: unknown): Result<Task, ParseError>` and compare it with the schema version.
- **L4 Real-world:** Add env validation so the server refuses to boot with a missing or invalid `DATABASE_URL`.

#### Chapter 33 — Error Handling Across Layers
`🟠 Advanced` · `Essential` · 📁 `33-error-handling/`

**Opens with:** a production log full of `Error: Something went wrong` and a 500 response for what was actually a "task not found".
**Mental model:** *Errors are part of your API.* Expected failures (not found, invalid input, conflict) are **data**; unexpected ones (bugs, outages) are **exceptions**. Each layer translates errors into the language of the layer above.

1. **Expected vs unexpected failures** — the distinction that drives every design decision.
2. **Exceptions in TypeScript** — `throw` is untyped; `catch (e: unknown)`; narrowing.
3. **Custom error hierarchies** — domain errors with codes and `cause`.
4. **Result types** — `Result<T, E>` from Ch 18 applied to services; when Results beat exceptions.
5. **Translating errors between layers** — repository → service → HTTP status and response body.
6. **Async error handling** — unhandled rejections, error middleware, `Promise.allSettled`.
7. **Logging errors usefully** — structured logs, context, no secrets.
8. **Designing error responses** — a typed, consistent error contract that the frontend will consume (Ch 61).

**Common mistakes:** swallowing errors · string-matching error messages · exposing stack traces to clients · `Result` for genuinely exceptional cases.

**Exercises:**
- **L1 Recall:** Classify ten failures as expected or unexpected.
- **L2 Application:** Implement an error middleware mapping domain errors to HTTP responses exhaustively.
- **L3 Challenge:** Convert one service from exceptions to `Result` and compare the call sites.
- **L4 Real-world:** Define TaskFlow's public error contract (`code`, `message`, `details`) and implement it end to end.

> 🛠 **Part VI projects:** P07 TaskFlow API and P08 Typed API Client (specs in Section 6).

---
**Previous:** [← 4. Learning Roadmap](04-learning-roadmap.md) · **Next:** [6. TypeScript Projects & Checkpoints →](06-typescript-projects-and-checkpoints.md)
