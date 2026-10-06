# 9. Advanced & Professional Development

> **Book Three — Mastery** · Parts XIII–XV · Chapters 77–97
>
> Everything here builds on the Essential core, and **none of it is required to be productive.** Each chapter carries a tier label (`Advanced` or `Specialist`), and specialist sections inside Advanced chapters are marked ⏭ *Safe to skip*. Book Three is where the reader learns to **design for others**, through libraries, design systems, and team-scale architecture, and to recognize when advanced tools are unnecessary.
>
> **Why this material comes after building real apps:** variance makes sense once you've been puzzled by a callback-prop error; branded types once you've swapped two IDs; template literal types once you've typed routes and permissions; polymorphic components once you've written five button-link hybrids. Book Three answers questions Book Two made you ask.

---

### Part XIII — Advanced TypeScript
> **Folder:** `13-advanced-typescript/` · **Roadmap:** Stage 10 — Advanced Types & Patterns · **Difficulty:** 🟠→🔴

**Purpose of the part.** The type system's deep end: compatibility rules and their deliberate holes, nominal patterns in a structural world, and type-level programming. Each chapter separates what an experienced application developer should know (`Advanced`) from what library and framework authors need (`Specialist`).

| Chapter | Tier | Who needs it |
|---|---|---|
| 77 Variance & Soundness | Advanced | Anyone designing callback-heavy APIs |
| 78 Branded Types | Advanced | Large apps with many ID and unit types |
| 79 Advanced Conditional Types | Advanced (§5–8 Specialist) | Library consumers reading `.d.ts`; library authors |
| 80 Advanced Mapped & Recursive Types | Advanced | Form, config, and API libraries |
| 81 Template Literal Types in Depth | Advanced (§2, §6 Specialist) | Routing, i18n, event systems |
| 82 Advanced Generic Patterns | Advanced | API and SDK designers |
| 83 Type-Level Programming & DSLs | Specialist | Library and framework authors, the curious |

#### Chapter 77 — Type Compatibility, Variance & Soundness
`🟠 Advanced` · `Advanced` · 📁 `77-variance-and-soundness/`

**Opens with:** a `Dog[]` passed where an `Animal[]` is expected, then a `Cat` pushed into it, with no error. Next to it, a button click handler rejected where an "any element" handler is expected. Why is TypeScript lenient in one case and strict in the other?
**Mental model:** 🧠 *Producers are covariant; consumers are contravariant.* Things you **read from** can be narrower (a box of dogs works where a box of animals is read). Things you **write to or call** must accept at least as much (a handler for any element works where a button handler is needed, but not the reverse).

1. **Assignability revisited** — the precise rules behind "fits inside".
2. **Covariance** — return types, read-only properties, readonly arrays.
3. **Contravariance** — function parameters, and why handlers are checked "backwards".
4. **Bivariance and method shorthand** — why methods are exempt from `strictFunctionTypes`.
5. **Invariance** — mutable containers; why `Dog[] → Animal[]` is technically unsound.
6. **Variance annotations** — ⏭ `in`/`out` on type parameters, for library authors.
7. **Where TypeScript is unsound on purpose** — array covariance, method bivariance, `any`, assertions, unchecked indexing, optional vs missing properties (`exactOptionalPropertyTypes`).
8. **Variance in API design** — readonly inputs, callback parameter types, safe defaults.

**Exercises:**
- **L1 Recall:** Mark each position in five types as covariant, contravariant, or invariant.
- **L2 Application:** Make a function's array parameter `readonly` and show which unsound calls disappear.
- **L3 Challenge:** Write a program that exploits method bivariance to cause a runtime crash, then fix it with function-property syntax.
- **L4 Real-world:** Explain (in a PR comment) why a component's `onChange` type rejects a teammate's handler, and propose the correct type.

#### Chapter 78 — Branded Types & Nominal Typing Patterns
`🟠 Advanced` · `Advanced` · 📁 `78-branded-types/`

**Opens with:** `assignTask(projectId, taskId)` called as `assignTask(taskId, projectId)`. Both are strings, so it compiles and corrupts data for a week.
**Mental model:** 🧠 *A brand is a compile-time tag that makes structurally identical types incompatible. It costs nothing at runtime, and the only way to get one is through a function that checks the value.*

1. **When structural identity hurts** — IDs, units, validated strings.
2. **Branding with intersections** — `string & { readonly __brand: "TaskId" }`.
3. **Unique-symbol brands** — stronger, unforgeable tags.
4. **Smart constructors** — brands earned through validation (Ch 32 again); schema-produced brands.
5. **Units and value objects** — `Meters` vs `Feet`, `Money`, `Email`.
6. **Opaque types across modules** — hiding construction behind a module boundary.
7. **Brands at the boundary** — parse at the edge, carry brands through the app.
8. **When brands are overkill** — friction vs the bugs actually prevented.

**Exercises:**
- **L1 Recall:** Define `TaskId` and `ProjectId` brands and show that swapping them fails to compile.
- **L2 Application:** Add a smart constructor `parseEmail(input: string): Result<Email, string>`.
- **L3 Challenge:** Implement `Money` with currency safety (adding USD to EUR is a compile error).
- **L4 Real-world:** Introduce branded IDs across TaskFlow's API client and frontend; measure the churn and report whether it was worth it.

#### Chapter 79 — Advanced Conditional Types & infer
`🟠 Advanced` · `Advanced` · 📁 `79-advanced-conditional-types/`

**Opens with:** a utility type from a popular library's `.d.ts` that is twelve lines of nested conditionals. By the end of the chapter, the reader can read it, and write one.
**Mental model:** *Conditional types are type-level pattern matching. `infer` captures, distribution maps over unions, and recursion loops. Together they form a small functional language.*

1. **Conditional types through the set model** — a recap at full precision.
2. **Controlling distribution** — naked vs wrapped type parameters and when each is right.
3. **infer in every position** — parameters, returns, constructors, tuple elements, promises, template strings.
4. **infer with constraints** — `infer U extends string`.
5. **Recursive conditional types** — ⏭ tail recursion and depth limits.
6. **Generics in implementations** — why TypeScript can't narrow `T` inside a generic function body; overloads vs internal assertions.
7. **Reading library-grade types** — decoding a real-world declaration file step by step.
8. **Friendlier type errors** — ⏭ making failed constraints readable for your users.

**Exercises:**
- **L1 Recall:** Evaluate eight conditional types, including distribution edge cases.
- **L2 Application:** Write `FirstParam<F>` and `LastElement<T>` with `infer`.
- **L3 Challenge:** Write `IsUnion<T>` and explain why it works.
- **L4 Real-world:** Document, line by line, the conditional types in a library your project depends on.

#### Chapter 80 — Advanced Mapped & Recursive Types
`🟠 Advanced` · `Advanced` · 📁 `80-advanced-mapped-and-recursive-types/`

**Opens with:** a form library that type-checks `register("address.street")` and rejects `register("address.stret")`. How?
**Mental model:** *Mapped types transform shapes; recursion lets the transformation descend into nested shapes. Together they can describe every path through an object.*

1. **Key remapping in depth** — filtering keys by value type (`KeysOfType<T, V>`).
2. **Mapping over unions of objects** — distribution in mapped types.
3. **Recursive types revisited** — trees, JSON, nested route configs.
4. **Recursive utility types** — `DeepPartial`, `DeepReadonly`, `DeepRequired`, and their edge cases (arrays, functions, dates).
5. **Path types** — `Paths<T>` (`"a.b.c"`) and `PathValue<T, P>`.
6. **Recursion limits and performance** — "type instantiation is excessively deep" and what to do.
7. **When deep types are a smell** — flattening data instead of typing depth.

**Exercises:**
- **L1 Recall:** Write `DeepReadonly<T>` handling arrays.
- **L2 Application:** Write `KeysOfType<T, V>` and use it to type a `sortBy` that only accepts numeric keys.
- **L3 Challenge:** Implement `Paths<T>` and `PathValue<T, P>` with type tests.
- **L4 Real-world:** Upgrade P13's form kit so field names are typed paths into nested values.

#### Chapter 81 — Template Literal Types in Depth
`🟠 Advanced` · `Advanced` · 📁 `81-template-literal-types-in-depth/`

**Opens with:** `navigate("/projects/:projectId/tasks/:taskId", { projectId })`, with the missing `taskId` caught at compile time.
**Mental model:** *Template literal types plus `infer` turn string formats into structured types: the type checker can parse the strings your app relies on.*

1. **Review and composition** — unions in templates, intrinsic string types.
2. **Parsing strings with infer** — ⏭ split, trim, and replace at the type level.
3. **Typed routes** — extracting `:params` from path patterns.
4. **Typed event and message names** — namespaces and wildcards (P05, revisited).
5. **CSS and design-token strings** — `` `${number}px` ``, token paths.
6. **Limits** — ⏭ performance, recursion depth, error readability.
7. **When to stop** — where a code generator or a plain object map is the better tool.

**Exercises:**
- **L1 Recall:** Write ``type EventName = `${Entity}:${Action}` `` for three entities and four actions.
- **L2 Application:** Write `RouteParams<"/users/:id/posts/:postId">` → `{ id: string; postId: string }`.
- **L3 Challenge:** Build a typed `href(route, params)` helper rejecting missing and extra params.
- **L4 Real-world:** Replace TaskFlow Web's route helper (Ch 59) with template-literal-powered types; compare the error messages.

#### Chapter 82 — Advanced Generic Patterns & API Type Design
`🟠 Advanced` · `Advanced` · 📁 `82-advanced-generic-patterns/`

**Opens with:** a query-builder API where `where("status", "dun")` compiles, because the value type isn't connected to the field.
**Mental model:** *The call site is the specification. Design what callers write first, then make inference produce exactly the types that call site needs, and no more.*

1. **const type parameters** — preserving literal types without `as const` at call sites.
2. **NoInfer and inference control** — choosing which argument "wins" inference.
3. **Builder patterns** — types that accumulate through method chains.
4. **Higher-order generics** — functions that return generic functions; currying.
5. **Typed factories and dependency injection** — typed service containers.
6. **Overloads vs conditional return types** — choosing for the caller's experience.
7. **Designing for inference** — error ergonomics and discoverability.
8. **Case study: a typed filter/query API** — field-aware operators and values.

**Exercises:**
- **L1 Recall:** Use `NoInfer` to fix a provided inference bug.
- **L2 Application:** Write `defineRoutes(config)` with `const` type parameters.
- **L3 Challenge:** Build a typed `createQuery<T>().where(field, op, value)` where `value`'s type depends on `field` and `op`.
- **L4 Real-world:** Design and implement TaskFlow API's typed filter DSL shared by client and server.

#### Chapter 83 — Type-Level Programming & Type-Safe DSLs
`🔴 Expert` · `Specialist` · 📁 `83-type-level-programming/`

**Opens with:** a schema library where you write runtime code, and a fully precise static type appears. Where did it come from?
**Mental model:** *The type system is a small, pure, functional programming language that runs inside the compiler, where tuples are lists, conditionals are `if`, and recursion is the only loop. Treat it like code: name things, test things, and know its costs.*

1. **Types as a programming language** — conditionals, recursion, tuples as lists.
2. **Tuple manipulation** — head, tail, reverse, length.
3. **Type-level arithmetic** — ⏭ counting with tuples, and why it's mostly a curiosity.
4. **How schema libraries infer types** — building `Infer<typeof schema>`.
5. **How end-to-end typed APIs work** — sharing router types between server and client.
6. **How typed query builders work** — inferred result rows from queries.
7. **Designing a small type-safe DSL** — a typed config or state-machine DSL.
8. **The cost of cleverness** — compile time, error messages, maintainability.

**Exercises:**
- **L1 Recall:** Implement `Length<T>` and `Reverse<T>` for tuples.
- **L2 Application:** Implement a minimal `Infer<Schema>` for object and string schemas.
- **L3 Challenge:** Type a state-machine DSL where `send(event)` only accepts events valid in the current state.
- **L4 Real-world:** Write a design note on whether a type-level DSL is right for a feature in your capstone, including compile-time measurements.

### ✅ Checkpoint — Part XIII · Advanced TypeScript
- **Know:** covariance, contravariance, bivariance, invariance; TypeScript's deliberate unsoundness; branded and opaque types; advanced `infer` and distribution control; recursive and path types; template literal parsing; `const` type parameters and `NoInfer`; builder and DSL patterns; the costs of type-level code.
- **Build:** P18 Runtime Validation Library.
- **Answer:**
  1. Why are function parameters checked contravariantly, and why are methods an exception?
  2. How do you create a brand that can only be obtained through validation?
  3. What does wrapping a type parameter in `[T]` change in a conditional type?
  4. How does `Paths<T>` work, and what are its limits?
  5. When is a type-level DSL the wrong choice?
- **Small challenge:** type `get(obj, "a.b.c")` with a precise return type and a readable error for invalid paths.
- **Optional project:** solve ten medium-difficulty type challenges and write explanations, not just solutions.
- **Ready signs:** you can read any library's `.d.ts` and explain it, and you can say no to a clever type.
- **If you struggle, revisit:** Ch 22–23 (the foundations of mapped and conditional types), Ch 10 (set model), Ch 77 §1–5.

### 🛠 P18 — Runtime Validation Library (a mini-Zod)
- **Difficulty:** 🟠→🔴 · **When:** end of Part XIII · **Prerequisites:** Ch 32, 78–83
- **Concepts used:** generics, mapped types for object shapes, conditional types, `infer`, branded types, `Result<T, E>`, type tests.
- **Requirements:**
  1. Schema builders: `string`, `number`, `boolean`, `literal`, `object`, `array`, `union`, `optional`, `nullable`, `record`.
  2. `parse` (throws) and `safeParse` (returns `Result`); errors carry paths such as `["tasks", 3, "title"]`.
  3. `Infer<typeof schema>` produces the precise static type, including optional keys.
  4. `.refine(predicate, message)` and `.transform(fn)`, where transform changes the *output* type (input and output types are tracked separately).
  5. `.brand<"TaskId">()` produces branded output types.
  6. Exhaustive type tests and runtime tests; it replaces the schema library in P07 for one module as a proof.
- **Suggested architecture:** `src/schema.ts` (base `Schema<Output, Input>`), `src/primitives/`, `src/object.ts`, `src/union.ts`, `src/errors.ts`, `src/infer.ts`, `test/`.
- **Stretch goals:** implement the Standard Schema interface so other libraries can accept your schemas; discriminated-union fast paths; JSON Schema export.
- **You should understand afterward:** how runtime code and static types can be designed together, which is the foundation of modern TypeScript libraries.

---

### Part XIV — Advanced React + TypeScript Patterns
> **Folder:** `14-advanced-react-patterns/` · **Roadmap:** Stage 10 — Advanced Types & Patterns · **Difficulty:** 🟠

**Purpose of the part.** Patterns for building components *other developers* use: generic, polymorphic, compound, and headless components. Every pattern chapter has two mandatory boxes, and they carry equal weight:

> ✅ **When is this useful?** · 🚫 **When is this unnecessary complexity?**

Each chapter also ends with a **de-abstraction exercise**: take an over-engineered component and simplify it.

#### Chapter 84 — Advanced Generic Components & Hooks
`🟠 Advanced` · `Advanced` · 📁 `84-advanced-generic-components/`

**Opens with:** the Ch 57 `Table<T>` grows sorting, filtering, selection, and custom cells, and its column type becomes `any` "temporarily".
**Mental model:** *Column definitions are a typed contract between the row type and the cells: each column's accessor fixes the value type its cell renderer receives.*

1. **Generic components, revisited** — what changes at library scale.
2. **Typed column definitions** — accessor keys (`keyof Row`) and accessor functions; cells receive the right value type.
3. **Generic hooks for tables** — `useSort<T>`, `useFilter<T>`, `useSelection<T>`, `usePagination`.
4. **Generic components with refs** — ref-as-prop in generic components.
5. **Generics and wrappers** — preserving generics through `memo` and other higher-order components.
6. **Controlled and uncontrolled generic components** — `selected`/`onSelectedChange` vs `defaultSelected`.
7. **✅ Useful / 🚫 Unnecessary** — generic tables, selects, and lists vs one-off components.

**Exercises:**
- **L1 Recall:** Type a `ColumnDef<Row>` with key accessors.
- **L2 Application:** Add typed sorting where only sortable value types are allowed.
- **L3 Challenge:** Support accessor functions with a correctly typed cell value.
- **L4 Real-world (de-abstraction):** A generic `<Anything<T>>` component is used in exactly one place. Inline it and justify the deletion.

#### Chapter 85 — Discriminated & Conditional Props
`🟠 Advanced` · `Advanced` · 📁 `85-discriminated-props/`

**Opens with:** a `Button` that accepts `href` *and* `onClick` *and* `type="submit"` all at once, and nobody knows what happens.
**Mental model:** 🧠 *When props depend on each other, the props type is a union of valid configurations. `never` marks props that are forbidden in a configuration.*

1. **Props that depend on each other** — recognizing the smell.
2. **Discriminated props** — variant unions.
3. **Mutually exclusive props** — `{ href: string; onClick?: never } | { onClick: () => void; href?: never }`.
4. **XOR helper types** — a reusable `XOR<A, B>`.
5. **Controlled vs uncontrolled props** — typing `value` + `onChange` vs `defaultValue`.
6. **Narrowing destructured props** — what works and what loses narrowing.
7. **✅ Useful / 🚫 Unnecessary** — when two components are simpler than one union.

**Exercises:**
- **L1 Recall:** Type an `Alert` whose `onDismiss` is required only when `dismissible: true`.
- **L2 Application:** Type an `Input` that's either controlled or uncontrolled, never both.
- **L3 Challenge:** Write `XOR<A, B>` and use it for three components.
- **L4 Real-world (de-abstraction):** Split a five-variant "mega-component" into separate components and compare the call sites.

#### Chapter 86 — Polymorphic Components & the asChild Pattern
`🟠 Advanced` · `Advanced` · 📁 `86-polymorphic-components/`

**Opens with:** `Button`, `LinkButton`, `RouterLinkButton`, and `SubmitButton`: four copies of the same styles.
**Mental model:** *A polymorphic component lets the caller choose the rendered element, and its props type follows that choice. The `asChild` (slot) pattern avoids most of this type complexity through composition.*

1. **The problem** — one look, many elements.
2. **The `as` prop** — `ElementType` and props of the chosen element.
3. **Typing polymorphic props** — own props merged with `ComponentPropsWithoutRef<C>` via `Omit`.
4. **Refs in polymorphic components** — typing the element's ref.
5. **The asChild / Slot pattern** — merging props onto the child; much simpler types.
6. **Costs** — type-checking speed and error-message quality.
7. **✅ Useful / 🚫 Unnecessary** — design-system primitives vs app components.

**Exercises:**
- **L1 Recall:** Type `Text as="h1" | "p" | "span"` with a restricted union.
- **L2 Application:** Implement a fully polymorphic `Box<C>`.
- **L3 Challenge:** Implement `Button asChild` with a `Slot` that merges classes, handlers, and refs.
- **L4 Real-world (de-abstraction):** Replace a polymorphic component used in two places with two plain components.

#### Chapter 87 — Compound Components
`🟠 Advanced` · `Advanced` · 📁 `87-compound-components/`

**Opens with:** `<Tabs tabs={[{ label, content, disabled, icon, badge }]} />`. Every new requirement adds a field to the config object.
**Mental model:** *Compound components are a family of components sharing hidden state through context, which gives callers markup-level control while the parent keeps behavior consistent.*

1. **The configuration-object problem**
2. **Compound components** — `<Tabs>`, `<Tabs.List>`, `<Tabs.Tab>`, `<Tabs.Panel>`.
3. **Shared state via typed context** — the safe-context pattern, internal to the family.
4. **Typing the namespace** — static properties on function components vs named exports.
5. **Controlled compound components** — `value` / `onValueChange`.
6. **Accessibility** — roles, keyboard support, and ID wiring across children.
7. **✅ Useful / 🚫 Unnecessary** — markup flexibility vs a simple props API.

**Exercises:**
- **L1 Recall:** Build `Accordion` with `Accordion.Item`, `Accordion.Trigger`, and `Accordion.Content`.
- **L2 Application:** Make `Tabs` controllable and uncontrollable.
- **L3 Challenge:** Build an accessible `Menu` compound component with keyboard navigation.
- **L4 Real-world (de-abstraction):** Convert a compound component that's always used the same way back into a single component.

#### Chapter 88 — Render Props, Headless Components & Inversion of Control
`🟠 Advanced` · `Advanced` · 📁 `88-render-props-and-headless/`

**Opens with:** a combobox library whose markup can't be changed, which forces a fork to change one icon.
**Mental model:** *Inversion of control means the component provides behavior and the caller provides rendering. Headless components are the extreme: all behavior, zero markup.*

1. **Inversion of control** — who decides what renders.
2. **Typed render props** — `render: (state: T) => ReactNode`, function-as-children.
3. **Hooks replaced most render props** — and where render props still win (virtualization, measured layouts).
4. **Headless components** — logic hooks plus caller-owned markup.
5. **Prop getters** — `getItemProps()` returning correctly typed native props.
6. **Slots, revisited** — named `ReactNode` props as lightweight inversion.
7. **✅ Useful / 🚫 Unnecessary** — libraries vs app code.

**Exercises:**
- **L1 Recall:** Convert a render-prop component into a hook.
- **L2 Application:** Build a headless `useDisclosure` with typed prop getters.
- **L3 Challenge:** Build a headless `useCombobox<T>` and two different UIs on top of it.
- **L4 Real-world (de-abstraction):** Replace a headless component in app code with a plain component, and document when you'd go back.

#### Chapter 89 — Reusable Component API Design: Choosing the Right Pattern
`🟠 Advanced` · `Advanced` · 📁 `89-component-api-design/`

**Archetype:** Pattern-decision chapter. **Opens with:** two engineers arguing for compound components vs props for a `Card`. Both are right in different situations.
**Mental model:** 🧠 *The complexity ladder. Start at the bottom and climb only when a real requirement forces you:*

```
 1. Props            <Card title="…" />
 2. Children         <Card>…</Card>
 3. Slots            <Card header={…} footer={…} />
 4. Compound         <Card><Card.Header/>…</Card>
 5. Render props /   <Card renderHeader={(state) => …} /> · useCard()
    headless
 6. Polymorphic      <Card as="article" /> · asChild
```

1. **The complexity ladder** — what each rung buys and costs.
2. **A decision guide** — questions that point to the right rung.
3. **Consistency across a component set** — naming, variants, sizes, controlled APIs.
4. **Refs, native props, and accessibility** — the non-negotiables for reusable components.
5. **Typing variants** — variant maps and derived variant prop types.
6. **Documenting component APIs** — TSDoc, examples, stories.
7. **De-abstraction** — refactoring a component *down* the ladder.
8. **Principles of type-safe component libraries** — a bridge to Ch 93.

**Exercises:**
- **L1 Recall:** Place eight components on the ladder.
- **L2 Application:** Write an API review for three P20 components.
- **L3 Challenge:** Design a `DatePicker` API on paper, at two different rungs, with a recommendation.
- **L4 Real-world (de-abstraction):** Simplify the most over-engineered component in your codebase.

### ✅ Checkpoint — Part XIV · Advanced React + TypeScript Patterns
- **Know:** advanced generic components and typed column definitions; discriminated, exclusive, and controlled/uncontrolled props; polymorphic components and `asChild`; compound components; render props, headless components, prop getters; the complexity ladder.
- **Build:** P19 Generic Data Table, and P20 Component Library (first release).
- **Answer:**
  1. When is a polymorphic component worth its type complexity?
  2. Why does `asChild` usually lead to simpler types than `as`?
  3. When are compound components better than a props API, and when are they worse?
  4. What problem do headless components solve?
  5. Describe a time you would climb *down* the complexity ladder.
- **Small challenge:** design and implement an accessible, typed `Popover` compound component in 90 minutes.
- **Optional project:** build a headless `useCombobox<T>` and publish it inside P20.
- **Ready signs:** you justify each pattern with a requirement, and you've deleted at least one abstraction.
- **If you struggle, revisit:** Ch 50 (props design), Ch 54 (typed context), Ch 57 (generic components), Ch 13 (unions).

### 🛠 P19 — Generic Data Table
- **Difficulty:** 🟠 Advanced · **When:** Ch 84 onward · **Prerequisites:** Ch 57, 84–88
- **Concepts used:** generic components and hooks, typed column definitions, headless architecture, controlled/uncontrolled props, virtualization, accessibility.
- **Requirements:**
  1. `<DataTable<Row>>` with typed `columns`: key or function accessors, with typed cell renderers.
  2. Sorting, per-column filtering (typed by value type), pagination, row selection, and column visibility.
  3. A headless core hook (`useDataTable<Row>`) and a default UI built on it.
  4. Client-side and server-side modes (server mode integrates with TanStack Query).
  5. Virtualization for 10,000+ rows; full keyboard navigation; correct ARIA grid semantics.
  6. Type tests proving misuse fails (wrong accessor keys, mismatched cell types).
- **Suggested architecture:** `core/` (state, sorting, filtering, types), `react/` (hook + components), `stories/`, `test/`.
- **Stretch goals:** column resizing and reordering; grouping; typed CSV export.
- **You should understand afterward:** generic component design at library quality, and why headless cores make components reusable.

---

### Part XV — Professional TypeScript & React Engineering
> **Folder:** `15-professional-engineering/` · **Roadmap:** Stage 11 — Professional Engineering · **Difficulty:** 🟠→🔴

**Purpose of the part.** Professional TypeScript and professional React are taught **together, organized by concern**: architecture, public APIs, libraries, design systems, monorepos, compiler performance, frameworks, and teamwork. This is the engineering that happens *around* code: making it last, scale, and serve other people.

| Concern | TypeScript side | React side |
|---|---|---|
| Architecture | Domain types, layers, boundaries (Ch 90) | Feature and state architecture at scale (Ch 90) |
| Public APIs | Reusable types, generics management (Ch 91) | Component APIs (Ch 89 → 93) |
| Distribution | Library authoring, publishing, semver (Ch 92) | Design systems and component libraries (Ch 93) |
| Code organization | Project references (Ch 94) | Shared packages and package boundaries (Ch 94) |
| Performance | Type-checking performance (Ch 95) | Rendering strategy, frameworks (Ch 96) |
| People | Type conventions and review (Ch 97) | Component conventions and review (Ch 97) |

#### Chapter 90 — Architecture at Scale: Boundaries, Layers & Domain Modeling
`🟠 Advanced` · `Advanced` · 📁 `90-architecture-at-scale/`

**Opens with:** TaskFlow, two years later: eight teams, 400 components, and a "shared" folder everyone depends on and nobody owns.
**Mental model:** 🧠 *Architecture is the set of decisions that are expensive to change. Make boundaries explicit, make dependencies point one way, and let types describe each boundary's contract.*

1. **What changes at scale** — teams, code volume, lifetimes, coordination cost.
2. **Domain modeling with types** — entities, value objects, branded IDs, state machines.
3. **Bounded contexts in a frontend** — features as domains with their own language.
4. **Ports and adapters for UI apps** — interfaces for API, storage, and analytics; swappable adapters.
5. **State architecture at scale** — ownership of state across many features.
6. **Shared types vs coupling** — what to share, and what to duplicate deliberately.
7. **Enforcing architecture** — lint rules, dependency graphs, package boundaries.
8. **Architecture decision records** — capturing why, not only what.

**Exercises:**
- **L1 Recall:** Identify the ports and adapters in TaskFlow Web.
- **L2 Application:** Replace direct `localStorage` usage with a typed `Storage` port and two adapters.
- **L3 Challenge:** Draw TaskFlow's dependency graph and remove one cycle.
- **L4 Real-world:** Write three ADRs for your capstone's riskiest decisions.

#### Chapter 91 — Designing Reusable Types & Public APIs
`🟠 Advanced` · `Advanced` · 📁 `91-reusable-types-and-public-apis/`

**Opens with:** a minor release that "only changed types" and broke 40 downstream projects.
**Mental model:** *Every exported type is a promise. Make promises you can keep: accept wide inputs, return precise outputs, and hide complexity behind simple names.*

1. **Types as API surface** — everything exported is a contract.
2. **Inference-first public APIs** — callers shouldn't need to write type arguments.
3. **Accept wide, return narrow** — readonly inputs, precise outputs.
4. **Managing complex generics** — named intermediate types, hiding helpers, simple surfaces.
5. **Avoiding over-engineering** — the complexity budget, revisited.
6. **Evolving types safely** — `@deprecated`, overload transitions, additive changes.
7. **Documenting types** — TSDoc, examples, and type tests as documentation.

**Exercises:**
- **L1 Recall:** For eight type changes, decide whether each is breaking.
- **L2 Application:** Make a library function's inputs `readonly` and its outputs more precise without breaking callers.
- **L3 Challenge:** Refactor an exported 30-line conditional type into named, documented, tested pieces.
- **L4 Real-world:** Write the public-API guidelines for your component library (P20).

#### Chapter 92 — Library Authoring, Publishing & Semantic Versioning
`🔴 Expert` · `Advanced` · 📁 `92-library-authoring/`

**Opens with:** a published package that works in one bundler, fails in Node ESM, and shows `any` for every import in a CommonJS project.
**Mental model:** 🧠 *A package is a contract with every possible consumer environment. `exports` decides what they can load; declaration files decide what they see; semver decides what they can trust.*

1. **Anatomy of a TypeScript package** — `package.json` `exports` and `types` conditions.
2. **ESM-first and dual publishing** — trade-offs and modern defaults.
3. **Declaration output** — `declaration`, `declarationMap`, `isolatedDeclarations`.
4. **Build tools for libraries** — bundling vs plain `tsc` output.
5. **Validating packages** — checking type resolution across module modes; package linting.
6. **Semantic versioning for types** — what counts as a breaking type change.
7. **API reports and compatibility** — tracking public API diffs in CI.
8. **Release automation** — changesets, CI publishing, provenance.
9. **Maintaining declarations** — ⏭ supporting multiple TypeScript versions.

**Exercises:**
- **L1 Recall:** Write an `exports` map for a package with ESM, CJS, and types.
- **L2 Application:** Publish P04 to a local registry and consume it from ESM and CJS projects.
- **L3 Challenge:** Set up an API report that fails CI on unreviewed public API changes.
- **L4 Real-world:** Ship a release of P20 with changesets, generated changelog, and validated package types.

#### Chapter 93 — Design Systems & Component Libraries
`🟠 Advanced` · `Advanced` · 📁 `93-design-systems/`

**Opens with:** five slightly different blues, three modal implementations, and a redesign estimated at six months because styles are copy-pasted everywhere.
**Mental model:** *A design system is a product for other developers: tokens (decisions), components (implementations), patterns (guidance), and governance (how it evolves).*

1. **What a design system is** — tokens, components, patterns, governance.
2. **Design tokens as typed data** — one source, exported to CSS variables and TypeScript.
3. **Primitives vs composites**
4. **Building on accessible headless primitives** — buy vs build.
5. **Theming with types** — theme contracts and module augmentation.
6. **Documentation** — interactive docs with typed stories.
7. **Testing a component library** — interaction, accessibility, and visual regression.
8. **Versioning, migration, and adoption** — deprecation policy, codemods, measuring adoption.

**Exercises:**
- **L1 Recall:** Split ten style values into tokens and component-specific values.
- **L2 Application:** Generate CSS variables and a typed token object from one token file.
- **L3 Challenge:** Support light/dark/high-contrast themes with a typed theme contract.
- **L4 Real-world:** Write a codemod that migrates `<Button kind="…">` to `<Button variant="…">` across TaskFlow Web.

#### Chapter 94 — Monorepos & Package Boundaries
`🟠 Advanced` · `Advanced` · 📁 `94-monorepos/`

**Opens with:** the web app and the API each have their own copy of `Task`, and they've drifted. A field rename shipped to one side only.
**Mental model:** *A monorepo makes shared code cheap and boundaries optional, so you must make them explicit. Packages are boundaries with public entry points; project references make TypeScript respect them.*

1. **Why monorepos** — shared code, atomic changes, consistent tooling.
2. **Workspaces** — package-manager workspaces and internal dependencies.
3. **Internal packages** — source-shared vs compiled packages.
4. **Project references at scale** — `composite`, `tsc -b`, incremental builds.
5. **Shared configs** — tsconfig, ESLint, and Prettier packages.
6. **Shared contract packages** — API schemas and types consumed by both web and api.
7. **Task orchestration and caching** — running only what changed.
8. **Enforcing package boundaries** — dependency rules and public entry points.

**Exercises:**
- **L1 Recall:** Draw the package graph for the capstone monorepo.
- **L2 Application:** Extract TaskFlow's schemas into `packages/contracts`, used by both apps.
- **L3 Challenge:** Configure project references so editing `contracts` re-checks only dependents.
- **L4 Real-world:** Migrate P07 and P14 into one monorepo without breaking CI.

#### Chapter 95 — TypeScript at Scale: Compiler & Type-Checking Performance
`🔴 Expert` · `Specialist` · 📁 `95-compiler-performance/`

**Opens with:** a 90-second type-check, an editor that freezes on hover, and one exported conditional type responsible for half of it.
**Mental model:** *Type-checking is computation. Some types are expensive to compute, especially big unions, deep recursion, and complex intersections. Measure before optimizing, just like runtime code.*

1. **Where the checker spends time** — parsing, binding, checking, instantiation.
2. **Measuring** — `--extendedDiagnostics` and `--generateTrace`, and reading a trace.
3. **Expensive types** — large unions, deep recursion, intersection chains, heavy conditionals.
4. **Cheaper patterns** — interfaces over intersections, named types, explicit return annotations.
5. **Project structure for speed** — references, incremental builds, `skipLibCheck` trade-offs.
6. **Editor performance** — the language server in large repositories.
7. **The native compiler** — what a much faster checker changes, and what it doesn't.
8. **Type performance budgets** — tracking check time in CI.

**Exercises:**
- **L1 Recall:** Read an `--extendedDiagnostics` report and name the top cost.
- **L2 Application:** Speed up a provided slow type by restructuring it.
- **L3 Challenge:** Use a trace to find the slowest file in a provided repo and fix it.
- **L4 Real-world:** Add a type-check time budget to the capstone's CI.

#### Chapter 96 — React Frameworks, Server Rendering & Server Components
`🟠 Advanced` · `Advanced` · 📁 `96-frameworks-and-server-components/`

**Opens with:** TaskFlow's marketing pages need SEO and fast first paint, and the team asks whether to rewrite the SPA "in a framework".
**Mental model:** 🧠 *Frameworks move work to the server: rendering (SSR/SSG), data fetching, and with Server Components, entire components. Every server → client crossing is a **serialization boundary**, which means it is also a **trust boundary**.*

1. **Rendering strategies** — client rendering, SSR, SSG, streaming.
2. **Why frameworks** — routing, data loading, bundling, and server integration in one model.
3. **Server Components** — components that run only on the server.
4. **Client components and the boundary** — `"use client"` and what crosses it.
5. **The serialization boundary** — props crossing to the client must be serializable; using types to enforce it.
6. **Server Functions and Actions** — typed *and* validated, because they're public endpoints (Ch 32, once more).
7. **Data fetching on the server** — caching and revalidation concepts.
8. **Choosing SPA or framework** — the trade-offs, applied to TaskFlow.

**Exercises:**
- **L1 Recall:** Classify ten components as server, client, or either.
- **L2 Application:** Build one TaskFlow page with a server component and a client island.
- **L3 Challenge:** Write a Server Action with schema validation and typed field errors returned to a form.
- **L4 Real-world:** Write a decision record: should TaskFlow Web move to a framework?

#### Chapter 97 — Working on a Team: Code Review, Documentation & Conventions
`🟡 Intermediate` · `Essential` · 📁 `97-team-practices/`

**Opens with:** a 1,200-line PR with a new generic abstraction layer, three `as unknown as` casts, and the comment "trust me, it's cleaner".
**Mental model:** *Code is read by people more than by compilers. Conventions remove decisions, reviews spread knowledge, and simplicity is a feature you defend.*

1. **Reviewing TypeScript + React code** — a practical checklist.
2. **Type smells in review** — `any`, `as`, `!`, non-exhaustive switches, lying generics, fake context defaults.
3. **Reviewing for simplicity** — challenging unnecessary abstraction kindly.
4. **Team conventions** — naming, file structure, and lint rules as executable conventions.
5. **Documentation** — READMEs, ADRs, TSDoc, onboarding guides.
6. **Trade-offs as team decisions** — performance vs complexity, safety vs speed.
7. **Maintaining large codebases** — strictness ratchets, codemods, deprecations, upgrade playbooks.
8. **Growing as an engineer** — mentoring, writing, and teaching what you know.

> This chapter is `Essential` despite its position. Any developer on a team needs it, and readers on the fast-track path read it right after Part XII.

**Exercises:**
- **L1 Recall:** Find every type smell in a provided diff.
- **L2 Application:** Write review comments for a PR that are specific, kind, and actionable.
- **L3 Challenge:** Turn three of your team's unwritten rules into lint rules or config.
- **L4 Real-world:** Write the `CONTRIBUTING.md` and an onboarding guide for your capstone repository.

### ✅ Checkpoint — Part XV · Professional Engineering
- **Know:** domain modeling and boundaries at scale; ports and adapters; public type design and evolution; package anatomy, `exports`, declaration output, type-level semver, release automation; design-system structure and theming; monorepo workspaces, references, shared contracts; type-check performance; rendering strategies and Server Components; review and conventions.
- **Build:** P20 Component Library (published), and the capstone architecture (Ch 98).
- **Answer:**
  1. What makes a type change breaking? Give three examples.
  2. Why should a shared contracts package exist, and what should *not* go in it?
  3. How do you find out why type-checking is slow?
  4. What crosses the server/client boundary in Server Components, and why is it a trust boundary?
  5. What's on your code-review checklist for TypeScript + React?
- **Small challenge:** review a provided PR and write the review as you would at work.
- **Optional project:** contribute a typed fix or documentation improvement to an open-source TypeScript project.
- **Ready signs:** you can explain *and defend* the architecture of a codebase, including what you chose not to build.
- **If you struggle, revisit:** Ch 58 (app architecture), Ch 89 (component API design), Ch 91 (public types), Ch 94 (package boundaries).

### 🛠 P20 — Reusable Component Library (`@taskflow/ui`)
- **Difficulty:** 🟠 Advanced · **When:** starts in Part XIV, published in Part XV · **Prerequisites:** Ch 84–89, 91–94
- **Concepts used:** component API design, polymorphism/`asChild`, compound components, headless hooks, typed tokens and themes, accessibility, library packaging, semver, documentation, testing.
- **Requirements:**
  1. Tokens package (typed source → CSS variables) and themes (light/dark) with a typed theme contract.
  2. Components: `Button` (`asChild`), `TextField`, `Select<T>`, `Dialog` (compound), `Tabs` (compound), `Tooltip`, `Toast` (context API), and the P19 `DataTable`.
  3. Every component: native props extension, ref support, keyboard and screen-reader support, TSDoc, stories.
  4. Interaction, accessibility, and visual-regression tests.
  5. Published (local registry or npm) with an `exports` map, validated types, changesets, and a changelog.
  6. Consumed by TaskFlow Web inside the monorepo.
- **Suggested architecture:**
  ```
  packages/
    tokens/        # source of truth → css vars + typed tokens
    ui/            # components (src/<component>/), index.ts public API
    ui-docs/       # interactive documentation site
  ```
- **Stretch goals:** a codemod for one deliberate breaking change; server-component-compatible entry points (`"use client"` boundaries); a theme builder.
- **You should understand afterward:** what it takes to build software *for other developers*, and how types, docs, tests, and versioning make that trustworthy.

---
**Previous:** [← 8. React + TypeScript Curriculum](08-react-typescript-curriculum.md) · **Next:** [10. Capstone Projects →](10-capstone-projects.md)
