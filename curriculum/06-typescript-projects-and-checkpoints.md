# 6. TypeScript Projects & Checkpoints

> Projects P01–P08 (Book One) and the checkpoints for Parts I–VI. Projects P09 onward are specified in Sections 7–9, and the capstones in Section 10. The full project ladder is in [§10.1](10-capstone-projects.md#101-the-project-ladder).

---

## 6.1 Project overview (Book One)

| ID | Project | Part | Difficulty | Builds on | Feeds into |
|---|---|---|---|---|---|
| P01 | Typed Calculator | II | 🟢 | — | — |
| P02 | TaskFlow Core | III | 🟢 | Ch 8 vocabulary | P07, P09, P11 |
| P03 | Utility Toolkit | III | 🟢 | — | P04 (made generic) |
| P04 | Generic Utility Library | IV | 🟡 | P03 | P05, used everywhere after |
| P05 | Type-Safe Event Emitter | IV | 🟠 | P04 | P17 (analytics bus) |
| P06 | Legacy JS → TS Migration | V | 🟡 | Part V | — |
| P07 | TaskFlow API | VI | 🟡 | P02 | P08, P14, P15, C1 |
| P08 | Typed API Client | VI | 🟡 | P07 | P14 (reused in React) |

> 🧵 **TaskFlow thread:** P02 (domain model) → P07 (API) → P08 (client) → P09 (vanilla UI) → P11 (React) → P14 (full app) → P15 (auth) → P16 (tests). One domain, six levels of sophistication.

---

## 6.2 Project specifications

### P01 — Typed Calculator
- **Difficulty:** 🟢 Beginner · **When:** end of Part II · **Prerequisites:** Ch 5–9
- **Concepts used:** primitives, annotations vs inference, literal unions (`Operator`), tuples, functions, `unknown` for raw input, `null`/`undefined` handling.
- **Requirements:**
  1. A terminal REPL that evaluates `a <op> b` for `+ - * / % **`.
  2. Rejects invalid input with a helpful message (never crashes).
  3. Handles division by zero explicitly (no `Infinity` shown to the user).
  4. Keeps a history of the last 10 results and supports `history` and `clear`.
  5. Memory commands: `M+`, `M-`, `MR`, `MC`.
- **Suggested architecture:**
  ```
  p01-typed-calculator/
    src/parse.ts      # string → { left, operator, right } | ParseError
    src/evaluate.ts   # pure arithmetic, no I/O
    src/memory.ts     # history + memory state
    src/cli.ts        # the only file that touches stdin/stdout (a boundary!)
  ```
- **Stretch goals:** operator precedence and parentheses (a recursive-descent parser); a `bigint` mode; return later to add Vitest tests (after Ch 19).
- **You should understand afterward:** annotate boundaries and infer locals; literal unions as a vocabulary; raw input is untrusted text, the first glimpse of "boundaries".

### P02 — TaskFlow Core (typed todo domain)
- **Difficulty:** 🟢 Beginner · **When:** Part III, after Ch 14 (extended after Ch 15) · **Prerequisites:** Ch 8, 10–14
- **Concepts used:** interfaces and aliases, discriminated unions for the task lifecycle, narrowing, exhaustiveness, readonly data, option objects, custom errors (Ch 15).
- **Requirements:**
  1. Create, edit, complete, reopen, and archive tasks; tasks belong to projects.
  2. The lifecycle is modeled as a discriminated union: an archived task *cannot* be completed, and a blocked task *must* have a reason. The type system enforces this, not runtime `if`s alone.
  3. Filter by status, priority, tag, and due date; compute "overdue".
  4. Pure domain functions (`completeTask(task): DoneTask`) return new objects; no mutation.
  5. Save to and load from a JSON file; loading treats the file content as `unknown`.
- **Suggested architecture:**
  ```
  p02-taskflow-core/
    src/domain/task.ts        # types + pure transition functions
    src/domain/project.ts
    src/domain/filters.ts
    src/store/task-store.ts   # in-memory collection
    src/persistence/file.ts   # boundary: JSON in/out
    src/cli.ts
  ```
- **Stretch goals:** an undo stack; recurring tasks; a `TaskRepository` interface with an `InMemoryTaskRepository` class (Ch 15).
- **You should understand afterward:** how to make illegal states unrepresentable; why domain logic is pure and separate from I/O. This core is reused in P07 and P11.

### P03 — Utility Toolkit
- **Difficulty:** 🟢 Beginner · **When:** Part III, after Ch 11 · **Prerequisites:** Ch 11
- **Concepts used:** parameter/return types, optional/default/rest parameters, callbacks, higher-order functions, overloads, async functions.
- **Requirements:**
  1. String helpers: `slugify`, `truncate`, `capitalize`, `formatCurrency(amount, options?)`.
  2. Function helpers: `debounce`, `throttle`, `once`.
  3. Async helpers: `sleep`, `withTimeout`, `retry`.
  4. Array helpers written **for specific types only** (`chunkNumbers`, `uniqueStrings`, `firstTask`). *This is deliberate.*
  5. A README documenting each function's contract.
- **Suggested architecture:** `src/string.ts`, `src/function.ts`, `src/async.ts`, `src/array.ts`, `src/index.ts`.
- **Stretch goals:** overloads for `formatDate(date)` vs `formatDate(date, pattern)`; cancellable `debounce`.
- **You should understand afterward:** function contracts, and **the pain of type-specific duplication**, which Chapter 16 resolves. The reader should *feel* the need for generics before learning them.

### P04 — Generic Utility Library
- **Difficulty:** 🟡 Intermediate · **When:** Part IV, Ch 19 (tooling added in Ch 27) · **Prerequisites:** Ch 16–19 (and P03)
- **Concepts used:** generic functions, constraints, `keyof`, indexed access, generic types (`Result<T, E>`), inference-first design, runtime tests and type tests.
- **Requirements:**
  1. Make P03's array helpers generic: `chunk<T>`, `unique<T>`, `uniqueBy<T, K>`, `groupBy<T, K>`, `partition<T>`, `sortBy<T, K extends keyof T>`, `pick`, `omit`.
  2. Generic async helpers: `retry<T>`, `withTimeout<T>`, `pLimit` (concurrency limit).
  3. `Result<T, E>` with `ok`, `err`, `map`, `mapError`, `unwrapOr`.
  4. Every function has runtime tests and type tests; **no explicit type arguments** are needed at any call site in the tests.
  5. Published locally as a package consumed by later projects (with `.d.ts` output after Ch 28).
- **Suggested architecture:**
  ```
  p04-generic-utils/
    src/array/   src/object/   src/async/   src/result/
    src/index.ts                 # explicit public API
    test/*.test.ts  test/*.test-d.ts (type tests)
  ```
- **Stretch goals:** a typed `pipe` up to 8 functions; `debounce` that preserves parameter types via generics; benchmark `groupBy` against `Object.groupBy`.
- **You should understand afterward:** inference-first API design, the golden rule of generics, and testing types as specifications.

### P05 — Type-Safe Event Emitter
- **Difficulty:** 🟠 Advanced · **When:** end of Part IV · **Prerequisites:** Ch 16–24
- **Concepts used:** generic constraints with `keyof`, indexed access, mapped types, template literal types, function types, type tests.
- **Requirements:**
  1. `createEmitter<Events>()` where `Events` maps event names to payload types, e.g. `{ "task:created": Task; "task:deleted": { id: string } }`.
  2. `on`, `off`, `once`, and `emit` are fully typed: wrong event names and wrong payloads are compile errors.
  3. `on` returns an unsubscribe function.
  4. One failing listener doesn't stop the others; errors are reported to an `onError` hook.
  5. Type tests prove that misuse fails to compile (`@ts-expect-error`).
- **Suggested architecture:** `src/types.ts` (`EventMap`, `Listener<T>`), `src/emitter.ts`, `test/emitter.test.ts`, `test/emitter.test-d.ts`.
- **Stretch goals:** namespace wildcards (`on("task:*", …)` receives a union of all `task:` payloads, using template literal types); `waitFor(event): Promise<Payload>`; async listeners with `emitAsync`.
- **You should understand afterward:** type-level key → value mapping, and how libraries achieve "autocomplete everything" APIs.

### P06 — Legacy JS → TS Migration
- **Difficulty:** 🟡 Intermediate · **When:** Part V, Ch 29 · **Prerequisites:** Ch 25–29
- **Concepts used:** `allowJs`, `checkJs`, JSDoc types, declaration files for untyped dependencies, ESM conversion, strict flags, `any` reduction, type coverage.
- **Provided:** *Shelfie*, a ~3,000-line legacy Node + Express bookstore written in CommonJS with callbacks, a dynamic config blob, a mixin, a hand-rolled event bus, an untyped vendored library, and a passing test suite.
- **Requirements (one stage per pull request; tests must pass after every stage):**
  1. Add TypeScript with `allowJs`; the build and tests pass with zero behavior change.
  2. Turn on `checkJs` and add JSDoc to the three core modules.
  3. Write a `.d.ts` for the vendored library.
  4. Convert leaf modules to `.ts`, then the core.
  5. Convert to ES Modules.
  6. Enable strict flags one at a time.
  7. Reduce explicit and implicit `any` below a target, measured by a type-coverage tool.
- **Suggested architecture:** keep the original structure. Add `MIGRATION.md` with a per-stage log of errors fixed, `any` count, and decisions made.
- **Stretch goals:** a CI gate that fails if type coverage drops; a small codemod for a repetitive conversion.
- **You should understand afterward:** migration as a ratchet; risk management on a live codebase; how to *measure* type safety.

### P07 — TaskFlow API (Node.js)
- **Difficulty:** 🟡 Intermediate · **When:** Part VI (v1 in Ch 31, v2 in Ch 32–33) · **Prerequisites:** Ch 30–33, P02
- **Concepts used:** Node + TypeScript, Express, DTOs vs domain types, service and repository layers, SQLite, schema validation with inferred types, env validation, error contracts, tests.
- **Requirements:**
  1. REST endpoints for projects and tasks: CRUD, filtering, sorting, and pagination.
  2. A lifecycle transition endpoint (`POST /tasks/:id/transitions`) that reuses P02's domain rules.
  3. Every request body, params object, and query string is parsed by a schema; failures return `400` with field-level errors.
  4. A consistent error contract (`{ error: { code, message, details? } }`), mapped exhaustively from domain errors.
  5. Validated environment config; the server refuses to start when it's misconfigured.
  6. Integration tests against a test database.
- **Suggested architecture:**
  ```
  p07-taskflow-api/src/
    config/        # env schema → typed config
    domain/        # from P02 (pure)
    schemas/       # request/response schemas (types inferred)
    repositories/  # TaskRepository interface + sqlite + in-memory
    services/      # business rules, no HTTP
    http/          # routes, middleware, error mapping
    errors/        # domain error hierarchy
  ```
- **Stretch goals:** an OpenAPI document generated from schemas; request IDs in logs; optimistic concurrency with a `version` field.
- **You should understand afterward:** layered architecture with typed seams; DTO vs domain; "parse, don't validate"; error translation across layers. **This API is the backend for Book Two.**

### P08 — Typed API Client
- **Difficulty:** 🟡 Intermediate · **When:** end of Part VI · **Prerequisites:** Ch 32–33, P04, P07
- **Concepts used:** generics, `fetch`, schemas, `Result<T, E>`, discriminated error unions, `AbortSignal`, retries.
- **Requirements:**
  1. `createApiClient({ baseUrl, fetch? })` exposes typed methods for every TaskFlow endpoint.
  2. Every response is validated, so server drift becomes a typed `validation` error rather than a crash.
  3. Methods return `Result<T, ApiError>`, where `ApiError` is `network | timeout | http | validation`.
  4. Timeouts and cancellation through `AbortSignal`; retry with backoff for idempotent methods only.
  5. Works in both Node and the browser (no Node-only imports).
- **Suggested architecture:** `src/http.ts` (one request function), `src/endpoints/tasks.ts`, `src/endpoints/projects.ts`, `src/errors.ts`, `src/index.ts`. Schemas are imported from the API's contract module.
- **Stretch goals:** derive all methods from a single endpoint-definition object using mapped types; auth interceptors (needed in P15).
- **You should understand afterward:** the client side of the boundary. Ch 61 builds React data fetching on top of this client.

---

## 6.3 Checkpoints — Parts I–VI

Each checkpoint has the same structure: **Know · Build · Answer · Small challenge · Optional project · Ready signs · If you struggle, revisit.**

### ✅ Checkpoint — Part I · Why TypeScript?
- **Know:** why dynamic typing struggles at scale; what "superset" and "type erasure" mean; the compile-time/runtime split.
- **Build:** nothing yet. You should be able to *explain*.
- **Answer:**
  1. Name four problems large JavaScript codebases face and how types address each.
  2. What does `tsc` output for a file containing only interfaces?
  3. Why can't TypeScript guarantee that `await res.json()` is a `User`?
  4. What *cannot* TypeScript catch? Give three examples.
- **Small challenge:** write a 10-line program that type-checks and still crashes. Explain why that is not a TypeScript bug.
- **Optional project:** the L4 exercise from Ch 4 (a plain-JS fetch + DOM page).
- **Ready signs:** you can explain erasure to a non-TypeScript developer in under a minute; the JavaScript checkpoint (Ch 4) scored ≥ 80%.
- **If you struggle, revisit:** Ch 3 (erasure, boundaries); Ch 4 recommended JavaScript resources for any topic scoring below 2/3.

### ✅ Checkpoint — Part II · TypeScript Foundations
- **Know:** annotations vs inference; primitives, arrays, tuples, object types, optional/readonly; aliases, interfaces, literal types; `any` vs `unknown`; `void`, `never`, `null`, `undefined`.
- **Build:** P01 Typed Calculator.
- **Answer:**
  1. When should you annotate, and when should you rely on inference?
  2. What's the difference between `prop?: string` and `prop: string | undefined`?
  3. Why is `unknown` safer than `any`?
  4. What does `noUncheckedIndexedAccess` change, and why does this book enable it?
  5. Why do many teams prefer literal unions over enums?
- **Small challenge:** remove every `any` from a provided 60-line file without adding a single `as`.
- **Optional project:** extend P01 with operator precedence.
- **Ready signs:** you read a compiler error and know where to look; you rarely write redundant annotations.
- **If you struggle, revisit:** Ch 5 §6 (reading errors), Ch 6 (inference), Ch 9 (edge types).

### ✅ Checkpoint — Part III · Thinking in Types
- **Know:** types as sets; assignability; structural typing and excess property checks; typing functions, overloads, and `this`; interfaces vs aliases; unions and intersections; discriminated unions; every narrowing technique; type guards and assertion functions; exhaustiveness; classes and when not to use them.
- **Build:** P02 TaskFlow Core and P03 Utility Toolkit.
- **Answer:**
  1. Explain assignability using the set model, with an example in each direction.
  2. Why does an object literal with an extra property fail, when the same object in a variable passes?
  3. Turn `{ isLoading: boolean; error?: Error; data?: T }` into a discriminated union and explain what bugs disappear.
  4. Why can narrowing be lost inside a callback?
  5. What's the difference between `private` and `#private`?
  6. When would you choose an interface over a type alias?
- **Small challenge:** add a `"cancelled"` status to TaskFlow and let exhaustiveness errors guide you to every place that needs updating.
- **Optional project:** model a vending machine's states and transitions.
- **Ready signs:** your first instinct for "several possible states" is a discriminated union; you can predict narrowed types without hovering.
- **If you struggle, revisit:** Ch 10 (set model), Ch 13 §5–6 (discriminated unions), Ch 14 §6–10 (narrowing and exhaustiveness).

### ✅ Checkpoint — Part IV · Generics & Type Transformations ⭐
- **Know:** generic functions, types, interfaces, and classes; constraints; `keyof`; indexed access; generic defaults and inference; `typeof`, `as const`, `satisfies`; all built-in utility types; mapped types; conditional types; `infer`; distributivity; template literal types; custom utility types and their cost.
- **Build:** P04 Generic Utility Library and P05 Type-Safe Event Emitter.
- **Answer:**
  1. What is the golden rule of generics, and what is a "lying generic"?
  2. Explain `<T, K extends keyof T>(obj: T, key: K): T[K]` in plain English.
  3. When would you use `satisfies` instead of a type annotation?
  4. Implement `Partial<T>` and `Exclude<T, U>` from memory.
  5. Why does `Exclude<"a" | "b", "a">` work "per member"?
  6. When should you *not* write a custom utility type?
- **Small challenge:** write `ValueOf<T>` and `PartialBy<T, K>` with type tests, in 20 minutes.
- **Optional project:** add namespace wildcards to P05.
- **Ready signs:** call sites of your generic code never need explicit type arguments; you can read the type signature of a utility in a library's `.d.ts`.
- **If you struggle, revisit:** Ch 16–17 (if generics feel magical), Ch 20 (if you duplicate types), Ch 22–23 (if utility types feel like black boxes). **Do not skip this checkpoint.** Parts IX, XIII, and XIV depend on it heavily.
- **Fast-track note:** Ch 23–24 are `Advanced` tier. On reading path B you may skip them, along with questions 4 (the `Exclude` half), 5, and 6 and with P05, and return before Part XIII.

### ✅ Checkpoint — Part V · Toolchain & Ecosystem
- **Know:** ESM vs CommonJS; type-only imports; module resolution modes; the purpose of each major tsconfig group; ESLint, Prettier, and Vitest roles; type tests; declaration files; `@types`; module augmentation; JS → TS migration strategy.
- **Build:** P06 Legacy Migration (at least stages 1–4).
- **Answer:**
  1. Why do single-file transpilers need `isolatedModules` / `verbatimModuleSyntax`?
  2. What's the difference between `moduleResolution: "bundler"` and `"nodenext"`?
  3. What does `declare module "x"` do, and when is it dangerous?
  4. Which tool should catch a floating promise, and why not `tsc`?
  5. Describe a safe order for enabling strict flags in a legacy codebase.
- **Small challenge:** make a path alias that works in `tsc`, Vitest, and the runtime.
- **Optional project:** finish P06 stages 5–7.
- **Ready signs:** you can set up a new project from scratch without copying a config you don't understand.
- **If you struggle, revisit:** Ch 25 (if import errors confuse you), Ch 26 (if config is copy-paste), Ch 28 (if `.d.ts` files feel mysterious).
- **Fast-track note:** Ch 29 and P06 are `Advanced` tier. On reading path B, skip question 5 and P06, and return when you first join a mixed JS/TS codebase.

### ✅ Checkpoint — Part VI · Server & Boundaries
- **Know:** Node + TypeScript setup; `@types/node`; env and file-system boundaries; layered API design; DTOs; repository and service patterns; database typing; `unknown` at boundaries; schema validation and inferred types; env validation; error design across layers.
- **Build:** P07 TaskFlow API and P08 Typed API Client.
- **Answer:**
  1. Explain "what TypeScript believes vs what the runtime receives" with an example from your API.
  2. List every boundary in P07 and how each is protected.
  3. Why are DTOs and domain types different types?
  4. When is a `Result` type better than throwing?
  5. Why validate *responses* from a service you control?
- **Small challenge:** send ten malicious or malformed payloads to your API; every one should produce a clean `400` with no crash and no stack trace.
- **Optional project:** generate OpenAPI docs from your schemas.
- **Ready signs:** writing `as SomeType` on external data now feels *wrong* to you.
- **If you struggle, revisit:** Ch 32 (all of it, as it is the most important chapter in Book One), Ch 31 §3–6 (layers), Ch 33 §1 and §5 (error translation).

> 🎓 **End of Book One.** You can now think in types, design typed APIs, configure and test TypeScript projects, and protect runtime boundaries. Next: using all of it to build interfaces.

---
**Previous:** [← 5. TypeScript Curriculum](05-typescript-curriculum.md) · **Next:** [7. React Curriculum →](07-react-curriculum.md)
