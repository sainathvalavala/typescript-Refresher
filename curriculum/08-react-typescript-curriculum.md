# 8. React + TypeScript Curriculum

> **Book Two, continued** · Parts IX–XII · Chapters 49–76
>
> Part IX is the dedicated integration: how to **design types** for components, events, state, refs, context, reducers, and hooks. Parts X–XII apply it to complete applications: architecture, routing, data, forms, auth, testing, and production. Together with Book One, this is the **Essential core** ("job-ready").

---

### Part IX — React + TypeScript
> **Folder:** `09-react-typescript/` · **Roadmap:** Stage 7 — React with TypeScript · **Difficulty:** 🟡 · ⭐ **Major milestone**

**Purpose of the part.** Part VIII taught *what* props, state, and hooks are. Part IX teaches *how to type them well*: contracts that catch misuse, model UI states precisely, and keep inference doing the work. Every chapter revisits a Book One concept in its React form.

#### Chapter 49 — How TypeScript Sees React: JSX, Elements & Component Types
`🟡 Intermediate` · `Essential` · 📁 `49-how-typescript-sees-react/`

**Opens with:** three components returning `JSX.Element`, `ReactElement`, and `ReactNode`, and a `children` prop that rejects a string. What do these types actually mean?
**Mental model:** 🧠 *JSX type-checking is ordinary type-checking: `<Button kind="x" />` is a function call, and TypeScript checks the attributes against the component's props type like any other argument.*

1. **How JSX is type-checked** — the `jsx` setting, the `React.JSX` namespace, intrinsic elements.
2. **Where React's types come from** — `@types/react`, keeping it aligned with your React version.
3. **ReactNode vs ReactElement vs JSX.Element** — what a component can return and what `children` can hold.
4. **Typing function components** — plain functions with typed props; `React.FC` and why this book doesn't use it.
5. **Intrinsic element props** — `ComponentProps<"button">`, `ComponentPropsWithoutRef`, `ComponentPropsWithRef`.
6. **Reading React's type definitions** — go-to-definition into `@types/react`; reading what you find.
7. **🕰 Legacy types you'll meet** — implicit `children` in `React.FC` (pre-18), `defaultProps`, `PropTypes`, `forwardRef`, the global `JSX` namespace.

**Exercises:**
- **L1 Recall:** Classify ten values as valid `ReactNode`, `ReactElement`, both, or neither.
- **L2 Application:** Retype the P10 components without `React.FC`.
- **L3 Challenge:** Find the props type of `<input>` in `@types/react` and list five props you didn't know existed.
- **L4 Real-world:** Upgrade a small React 17-era component file to modern types; document each change.

#### Chapter 50 — Typing Props & Component APIs
`🟡 Intermediate` · `Essential` · 📁 `50-typing-props/`

**Opens with:** a `Button` that accepts `onClick`, but not `type="submit"`, `disabled`, or `aria-label`, until someone adds `[key: string]: any` and loses everything.
**Mental model:** 🧠 *A component's props type is its public API. Design it like a function signature: small, consistent, hard to misuse, and extending native elements wherever the component *is* one.*

1. **Props types** — alias vs interface for props; naming conventions.
2. **Optional props and defaults** — default values in destructuring (`defaultProps` is gone for function components).
3. **Typing children** — `ReactNode`, required vs optional children, `PropsWithChildren`, and why you can't constrain children types usefully.
4. **Callback props** — `onSelect: (id: TaskId) => void`; `onX` vs `handleX` naming.
5. **Slot props** — `icon?: ReactNode`, `header: ReactNode`, and render-function props (preview).
6. **Extending native elements** — `ComponentProps<"button"> & {…}`, `Omit` for overrides, spreading `...rest`.
7. **Discriminated props (first look)** — `variant: "link"` requires `href` (deep dive in Ch 85).
8. **Designing component APIs** — consistency, controlled vs uncontrolled, sensible defaults; redesigning P10's APIs.

**Common mistakes:** index signatures on props · re-declaring native props by hand · boolean flags that should be a union (`size: "sm" | "md" | "lg"`).
**When not to:** don't extend every native prop for components that aren't wrappers of a native element.

**Exercises:**
- **L1 Recall:** Type props for five components from their descriptions.
- **L2 Application:** Build a `Button` that accepts all native button props plus `variant` and `size`.
- **L3 Challenge:** Build a `TextField` with `label`, `error`, `hint`, and all native input props, with correct `id` wiring.
- **L4 Real-world:** Write an API review of three P10 components and ship the improved versions.

#### Chapter 51 — Typing Events
`🟡 Intermediate` · `Essential` · 📁 `51-typing-events/`

**Opens with:** `function handleChange(e: any)` copied across a codebase, and a bug where `e.target.value` was read from the wrong element.
**Mental model:** *React events are typed wrappers around DOM events: `React.ChangeEvent<HTMLInputElement>` = "a change event whose `currentTarget` is an input". Inline handlers get their types for free through contextual typing.*

1. **Synthetic events** — React's event system and where its types live.
2. **Inline handlers and contextual typing** — why inline needs no annotation.
3. **Extracted handlers** — `(e: React.MouseEvent<HTMLButtonElement>) => void` vs `MouseEventHandler<HTMLButtonElement>`.
4. **Mouse and pointer events**
5. **Keyboard events** — `e.key`, typed key unions for shortcuts.
6. **Change events** — inputs, selects, textareas, checkboxes (`checked`).
7. **Form and submit events** — `SubmitEvent<HTMLFormElement>` (the older `FormEvent` is deprecated in current React types), `preventDefault`, `FormData` from `currentTarget`.
8. **Focus events** — `onFocus`, `onBlur`, `relatedTarget`.
9. **target vs currentTarget in React** — the Ch 35 lesson, in its React form.
10. **Discovering event types** — hover the prop; `ComponentProps<"input">["onChange"]`.

**Exercises:**
- **L1 Recall:** Write the handler type for eight elements/events.
- **L2 Application:** Implement keyboard shortcuts (`n`, `/`, `Escape`) with a typed key map.
- **L3 Challenge:** Write one handler that serves several inputs using `name` and a typed state object.
- **L4 Real-world:** Remove every `any`-typed handler from a provided legacy component set.

#### Chapter 52 — Typing State: Modeling UI States
`🟡 Intermediate` · `Essential` · 📁 `52-typing-state/`

**Opens with:** `const [user, setUser] = useState(null)`, and every later `setUser(data)` fails with `Argument of type 'User' is not assignable to parameter of type 'null'`.
**Mental model:** *`useState` is a generic function: TypeScript infers `T` from the initial value, so when the initial value doesn't represent every future value, tell it `T`.*

1. **useState inference** — primitives, objects, arrays.
2. **Explicit state types** — `useState<Task[]>([])`; when inference is too narrow.
3. **Nullable state** — `useState<User | null>(null)` and narrowing before use.
4. **Union state** — `useState<"idle" | "saving" | "saved">("idle")`.
5. **Object and array state** — typed immutable updates, `Partial<T>` update helpers.
6. **Discriminated state** — async status as a union, rendered exhaustively.
7. **Lazy initial state** — `useState(() => loadDraft())` with typed loaders.
8. **From boolean soup to a state machine** — refactoring `isLoading`/`isError`/`data`.

**Exercises:**
- **L1 Recall:** Give the inferred `T` for eight `useState` calls.
- **L2 Application:** Type a file-upload component's state as a discriminated union.
- **L3 Challenge:** Refactor a component with five boolean flags into one union state.
- **L4 Real-world:** Model a multi-step checkout's state so you can't reach "payment" without a shipping address.

#### Chapter 53 — Typing Refs
`🟡 Intermediate` · `Essential` · 📁 `53-typing-refs/`

**Opens with:** `inputRef.current.focus()` → `'inputRef.current' is possibly 'null'`. Why can't a ref just be the element?
**Mental model:** *A DOM ref is empty during the first render and filled in after commit, so its type honestly includes `null`. A value ref holds whatever you put in it.*

1. **DOM refs** — `useRef<HTMLInputElement>(null)` and narrowing before use.
2. **Mutable value refs** — `useRef<number | null>(null)` for timer IDs, `useRef(0)` for counters.
3. **Modern ref typings** — `useRef` requires an argument; `RefObject` is mutable.
4. **Refs as props** — passing `ref` to your own function components; `Ref<HTMLInputElement>` and `ComponentProps<"input">`.
5. **Callback refs** — `(node: HTMLDivElement | null) => void`, and cleanup functions.
6. **🕰 forwardRef in existing code** — reading and typing `forwardRef<HTMLInputElement, Props>`, then migrating away.
7. **useImperativeHandle** — exposing a small typed handle (`{ focus(): void; reset(): void }`).
8. **Merging refs** — combining an internal ref with one passed in.

**Exercises:**
- **L1 Recall:** Write the correct `useRef` call for six uses.
- **L2 Application:** Build a `TextField` that accepts a `ref` and forwards it to the input.
- **L3 Challenge:** Expose a typed `scrollToItem(id)` handle from a list component.
- **L4 Real-world:** Migrate three `forwardRef` components to ref-as-prop, keeping their public types identical.

#### Chapter 54 — Typed Context
`🟡 Intermediate` · `Essential` · 📁 `54-typed-context/`

**Opens with:** `createContext<AuthValue>({} as AuthValue)`, a lie that compiles and then crashes when someone forgets the provider.
**Mental model:** 🧠 *A context's type should tell the truth about the case where no provider exists. Make "no provider" impossible to ignore by funneling all access through a custom hook that throws.*

1. **createContext typing** — the type parameter and the default value.
2. **The default value problem** — fake defaults vs honest `null`/`undefined`.
3. **The safe context pattern** — `createContext<Value | null>(null)` plus `useAuth()` that throws outside its provider.
4. **Typed provider components** — provider props, memoized values.
5. **Consumers through hooks** — the custom hook as the only consumer API.
6. **Context + reducer** — typed `state` and `dispatch` contexts.
7. **Splitting contexts** — separating state from actions for fewer re-renders.
8. **Modern context syntax** — `<Context value={…}>` as the provider, and reading context with `use`.

**Exercises:**
- **L1 Recall:** Identify the unsafe pattern in four context definitions.
- **L2 Application:** Build a typed `ThemeContext` with the safe pattern.
- **L3 Challenge:** Write a `createSafeContext<T>(name)` helper returning `[Provider, useValue]`.
- **L4 Real-world:** Build TaskFlow's `NotificationsContext` (toasts) with a typed API: `notify({ kind, message })`.

#### Chapter 55 — Reducers & State Machines with Discriminated Unions
`🟡 Intermediate` · `Essential` · 📁 `55-reducers/`

**Opens with:** a task board with seven `useState` calls and update logic spread across eleven handlers. One handler forgets to reset `selectedId`.
**Mental model:** 🧠 *A reducer is a pure function `(state, action) => newState`. Actions are a discriminated union, the "events" that can happen. Exhaustive `switch` means adding an event forces you to handle it.*

1. **When transitions get complex** — the signals that you need a reducer.
2. **useReducer** — state, action, dispatch; reducers as pure functions.
3. **Actions as discriminated unions** — `{ type: "taskAdded"; task } | { type: "taskRemoved"; id }`.
4. **Exhaustive reducers** — `switch` + `assertNever`; compile errors for unhandled actions.
5. **Modeling state and actions together** — state machines with status-dependent data.
6. **Typed dispatch helpers** — action creators, `Dispatch<Action>`.
7. **Reducer + context** — app-level state without a library.
8. **Testing reducers** — pure functions are the easiest code to test.

**Common mistakes:** actions with optional payload fields instead of separate members · reducers with side effects · one mega-reducer for the whole app.

**Exercises:**
- **L1 Recall:** Write the action union for a counter with step, reset, and set.
- **L2 Application:** Convert P11's task state to a reducer with exhaustive handling.
- **L3 Challenge:** Model a media player (idle, loading, playing, paused, error) where invalid transitions are ignored by design.
- **L4 Real-world:** Add undo/redo to the reducer generically (`withUndo(reducer)`).

#### Chapter 56 — Typing Custom Hooks
`🟡 Intermediate` · `Essential` · 📁 `56-typing-custom-hooks/`

**Opens with:** `const [value, setValue] = useToggle()` where `value` is inferred as `boolean | (() => void)`. Why did the tuple fall apart?
**Mental model:** *A custom hook is a function, so type it like a public function: precise parameters, deliberate return types, and generics only where a caller's type must flow through.*

1. **Typed parameters** — options objects and their defaults.
2. **Typed return values** — tuples with `as const` vs objects; when to use each.
3. **Inferred vs explicit return types** — hooks as public APIs.
4. **Generic custom hooks** — `useLocalStorage<T>(key, initial)`, with `T` inferred from `initial`.
5. **Parsers instead of lies** — `useFetch<T>(url)` is a lying generic; require `parse: (data: unknown) => T`.
6. **Reusable hook APIs** — stable callbacks, options objects, documentation.
7. **Typing hooks that wrap libraries** — deriving types from library functions (`Parameters`, `ReturnType`).
8. **Type tests for hooks** — locking down a hook's public types.

**Exercises:**
- **L1 Recall:** Fix the tuple inference in three hooks.
- **L2 Application:** Write `useLocalStorage<T>` with a parser and schema support.
- **L3 Challenge:** Write `useAsync<T>(fn)` returning a discriminated state union.
- **L4 Real-world:** Build `useKeyboardShortcuts(map)` with a typed shortcut map and cleanup, with tests.

#### Chapter 57 — Generic Components: The Essentials
`🟠 Advanced` · `Essential` · 📁 `57-generic-components/`

**Opens with:** a `Select` whose `onChange` gives back `string`, so every caller re-finds the object it already had.
**Mental model:** *A generic component is a generic function that returns UI: the `items` you pass decide `T`, and every callback receives `T` back.*

1. **Why generic components** — keeping the caller's type through the component.
2. **Declaring a generic component** — `function List<T>(props: ListProps<T>)`; `<T,>` in arrow functions.
3. **Inference from props** — `items` decides `T`; render callbacks receive `T`.
4. **Constraining T** — `T extends { id: string }` for keys.
5. **A generic Select** — `getLabel`, `getKey`, `onChange(value: T)`.
6. **Limits and pitfalls** — generics with `memo`, with context, and explicit `<List<Task> … />` arguments.
7. **When not to** — single-use components; when a simple union of props suffices.

**Exercises:**
- **L1 Recall:** Make a `List` generic so `renderItem` receives the right type.
- **L2 Application:** Build `Select<T>` used for both projects and users.
- **L3 Challenge:** Make a generic `Table<T>` with typed `columns` (the start of P19).
- **L4 Real-world:** Replace three near-duplicate list components in P12 with one generic component.

### ✅ Checkpoint — Part IX · React + TypeScript ⭐
- **Know:** JSX type-checking; `ReactNode` vs `ReactElement`; props design; native prop extension; event types; state inference vs explicit types; union and discriminated state; ref typing (DOM, value, ref-as-prop, callback refs); safe context; reducers with exhaustive actions; custom hook typing; generic components.
- **Build:** P12 React Dashboard.
- **Answer:**
  1. Why is `ReactNode` the right type for `children` in most components?
  2. How do you type a component that should accept every native `<button>` prop plus your own?
  3. Why does `useState(null)` cause problems, and what are two fixes?
  4. Why does a DOM ref's type include `null`?
  5. What's wrong with `createContext({} as Value)`?
  6. What does exhaustiveness checking buy you in a reducer?
- **Small challenge:** build a fully typed `Modal` (open state, `onClose`, focus on open, `Escape` to close, a ref to the dialog) in 45 minutes.
- **Optional project:** retype and redesign all of P10 as a mini design system.
- **Ready signs:** you no longer write `any` in components; your props types read like documentation.
- **If you struggle, revisit:** Ch 13–14 (unions and narrowing, which most React typing problems come down to), Ch 16–18 (generics), Ch 50, 52, 54.

### 🛠 P12 — React Dashboard
- **Difficulty:** 🟡 Intermediate · **When:** end of Part IX · **Prerequisites:** Part IX
- **Concepts used:** typed props, events, union state, refs, safe context, reducer + context, typed custom hooks, generic components.
- **Requirements:**
  1. A dashboard shell: sidebar, header, theme toggle, responsive grid.
  2. Four widgets: KPI cards, a task-status chart (any chart library), a recent-activity list, and a team-workload table.
  3. Global filters (date range, project, assignee) managed by a typed reducer + context.
  4. Each widget renders `loading | error | empty | ready` from a discriminated union (data from validated static JSON with simulated latency).
  5. Generic `Select<T>` and `List<T>` used by at least two widgets each.
  6. No `any`, no `as` outside a single documented boundary module.
- **Suggested architecture:**
  ```
  src/
    app/            # shell, providers, theme
    features/dashboard/{widgets,filters,hooks,types}/
    shared/{ui,hooks,lib}/
    data/           # static JSON + schemas (boundary)
  ```
- **Stretch goals:** filters synced to the URL; a draggable widget layout; keyboard-accessible chart summaries.
- **You should understand afterward:** typed component APIs at small-app scale; context + reducer architecture. **P17 evolves this into a production dashboard.**

---

### Part X — Building Real Applications
> **Folder:** `10-building-real-applications/` · **Roadmap:** Stage 8 — Real Applications · **Difficulty:** 🟡→🟠

**Purpose of the part.** From components to applications. The reader structures a multi-page app, decides where every piece of state lives, crosses the network boundary safely, builds forms with shared schemas, and adds authentication. Throughout, **TypeScript is the tool that makes layer boundaries explicit**: DTOs at the network edge, domain types in the middle, and view props at the UI.

```
 UI components ──props──► feature hooks ──domain types──► services ──DTOs──► API client ──► network
      ▲                         ▲                              ▲                    ▲
  view models             query/mutation hooks          mappers (DTO → domain)  schemas (unknown → DTO)
```

#### Chapter 58 — Architecting a React Application
`🟡 Intermediate` · `Essential` · 📁 `58-application-architecture/`

**Opens with:** TaskFlow at 60 components in a flat `components/` folder. Every change touches five unrelated files, and two developers keep editing the same ones.
**Mental model:** 🧠 *Organize by feature, depend in one direction, and expose each feature through a small public API. Types are the contracts at each seam.*

1. **Why structure matters** — change cost, ownership, onboarding.
2. **By type vs by feature** — trade-offs and a recommended hybrid.
3. **Feature modules** — `components/`, `hooks/`, `api/`, `types.ts`, and an `index.ts` public API.
4. **Layers in a frontend** — UI → hooks → services → API client → network.
5. **Where types live** — domain types, DTOs, view models; what goes in `shared/types`.
6. **Dependency rules** — features don't import each other's internals; enforced with lint rules.
7. **Shared components** — `shared/ui` primitives vs feature components.
8. **Environment configuration** — typing `import.meta.env` (declaration merging, Ch 28), a validated env module, and which variables are exposed to the browser.
9. **A styling strategy** — choosing CSS Modules or utility CSS for the app, and why consistency matters more than the choice.
10. **Scaffolding TaskFlow Web** — the structure for P14.

**Exercises:**
- **L1 Recall:** Sort twelve files into a feature-based structure.
- **L2 Application:** Add a lint rule that forbids importing another feature's internals.
- **L3 Challenge:** Refactor P11 from a flat layout into features without breaking tests.
- **L4 Real-world:** Write an architecture decision record for TaskFlow Web's structure.

#### Chapter 59 — Routing & Navigation
`🟡 Intermediate` · `Essential` · 📁 `59-routing/`

**Opens with:** a "single-page" app where refresh loses your place, the back button exits the site, and nothing can be bookmarked.
**Mental model:** *The URL is state, and the most shareable state you have. Routes map URL patterns to UI; params and search params are untrusted input.*

1. **Why routing** — URLs as state; SPA navigation.
2. **Routes, nested routes, and layouts** — with React Router.
3. **Route params and their types** — `string | undefined`; parsing and validating params.
4. **Search params as state** — filters and pagination in the URL, validated with schemas.
5. **Navigation** — links, programmatic navigation, redirects.
6. **Not-found and error routes**
7. **Lazy routes** — splitting by route (preview of Ch 70).
8. **Type-safe routing** — typed route helpers from an `as const` route map; type-safe routers (TanStack Router) and route type generation as alternatives.

**Exercises:**
- **L1 Recall:** Define routes for a 6-page app with nested layouts.
- **L2 Application:** Parse `/projects/:projectId/tasks/:taskId` params with a schema and render a not-found state for invalid IDs.
- **L3 Challenge:** Keep table filters in search params with validation and defaults.
- **L4 Real-world:** Build TaskFlow Web's routing with a typed `href()` helper that rejects unknown routes.

#### Chapter 60 — Where State Lives: State Management Architecture
`🟡 Intermediate` · `Essential` · 📁 `60-state-management/`

**Opens with:** a global store containing the current user, every task from the server, the open modal, and the text in a search box. One update triggers hundreds of re-renders and a stale-data bug.
**Mental model:** 🧠 *There are five kinds of state, and each has a natural home:* **local UI** (component), **shared client** (context/store), **URL** (router), **server cache** (a server-state library), **form** (form state).

1. **The five kinds of state** — examples of each from TaskFlow.
2. **Server state is not client state** — it's a cache of someone else's data: staleness, refetching, ownership.
3. **Choosing a home** — a decision flowchart.
4. **Context + reducer at app scale** — where it works and where it strains.
5. **External stores** — a typed Zustand store with selectors; an overview of Redux Toolkit.
6. **Derived state across features** — selectors and computed values.
7. **Avoiding global-state sprawl** — colocate first, promote only when needed.

**Exercises:**
- **L1 Recall:** Classify fifteen pieces of TaskFlow state into the five kinds.
- **L2 Application:** Move the "open modal" state out of a global store into local state.
- **L3 Challenge:** Implement a typed Zustand store with slices and selectors, with tests.
- **L4 Real-world:** Write TaskFlow Web's state map: every piece of state, its home, and its reason.

#### Chapter 61 — Data Fetching & the API Boundary
`🟠 Advanced` · `Essential` · 📁 `61-data-fetching/`

**Opens with:** a component typed `useState<Task[]>`, a `fetch` with `as Task[]`, and a production crash because the server started returning `{ items: Task[], nextCursor }`.
**Mental model:** 🧠 *"What TypeScript believes" is your types. "What the server actually returned" is `unknown`. The only bridge between them is a parser at the boundary.*

```
             what TypeScript believes          what the server actually returned
  const tasks: Task[] = await res.json();     { "items": [...], "nextCursor": "abc" }
                         ▲                                   │
                         └──── any → Task[]  (no check!) ────┘     ✗ crash later, far away

  const tasks = TaskListSchema.parse(await res.json());          ✓ fails here, loudly, with details
```

1. **What TypeScript believes vs what the server returned** — the crash, reproduced.
2. **DTOs vs domain models on the client** — why the UI shouldn't depend on the wire format.
3. **Reusing the typed API client** — P08 inside a React app.
4. **Validating responses** — schemas at the boundary; what to do when validation fails.
5. **Transforming API responses** — mappers (string dates → `Date`, cents → money, nested → flat).
6. **Typing API errors** — the `ApiError` union mapped to user-facing messages.
7. **Loading, error, empty, and success states** — one union, rendered exhaustively; skeletons.
8. **A hand-rolled useQuery** — and the pain it reveals: caching, deduplication, races, refetching.
9. **Request types and mutations** — typed bodies, pending states, and a first look at optimistic UI.

**Common mistakes:** `as` on responses · DTO types leaking into components · treating "empty" as "error".

**Exercises:**
- **L1 Recall:** Mark every boundary in a provided data-flow diagram.
- **L2 Application:** Add response validation and a mapper to one TaskFlow endpoint.
- **L3 Challenge:** Build `useQuery`-lite with abort-on-change and a tiny cache; list what's still missing.
- **L4 Real-world:** Handle a breaking API change (field renamed) so it shows a clear error state instead of a white screen.

#### Chapter 62 — Server State with TanStack Query
`🟠 Advanced` · `Essential` · 📁 `62-server-state/`

**Opens with:** the hand-rolled hook from Ch 61, now with three cache bugs and a stale list after creating a task.
**Mental model:** *A server-state library is a cache with rules: queries read and share data by key; mutations change the server and invalidate keys.*

1. **What a server-state library solves** — the Ch 61 pain list, item by item.
2. **Queries** — `useQuery` types inferred from the query function.
3. **Query keys** — typed key factories and `queryOptions` for reuse.
4. **Mutations** — `useMutation` and invalidation.
5. **Optimistic updates** — typed rollback context.
6. **Suspense queries and error boundaries** — `useSuspenseQuery`.
7. **Pagination and infinite queries**
8. **Devtools and testing** — inspecting the cache; testing with a fresh client.

**Exercises:**
- **L1 Recall:** Design query keys for tasks, task detail, and filtered lists.
- **L2 Application:** Replace the hand-rolled hook with queries and mutations.
- **L3 Challenge:** Implement optimistic task completion with rollback on failure.
- **L4 Real-world:** Add cursor-based infinite scrolling to the task list.

#### Chapter 63 — Typed Forms from Scratch
`🟡 Intermediate` · `Essential` · 📁 `63-typed-forms/`

**Opens with:** a sign-up form with six `useState` calls, a `handleChange(e: any)`, and validation logic duplicated in three places.
**Mental model:** *A form is a small state machine over a typed values object: values, touched, errors, and submission status. Field names are `keyof Values`, so a typo is a compile error.*

1. **Typed form state** — a `FormValues` type and initial values.
2. **Form events** — change, blur, and submit, typed (from Ch 51).
3. **A typed change handler** — `name` as `keyof FormValues`.
4. **Submission** — async submit, disabling, and preventing double submission.
5. **Client-side validation** — validators returning `FormErrors<T>` (the mapped type from Ch 22).
6. **Touched, dirty, and error display** — when to show which message.
7. **Accessible forms** — labels, `aria-invalid`, `aria-describedby`, focusing the first error.
8. **Building useForm<T>** — a type-safe form hook by hand.

**Exercises:**
- **L1 Recall:** Type the values and errors for a login form.
- **L2 Application:** Build a create-task form with validation and accessible errors.
- **L3 Challenge:** Implement `useForm<T>` with `register(name)` returning typed input props.
- **L4 Real-world:** Build a multi-step project wizard with per-step validation and a summary step.

#### Chapter 64 — Validation, Schemas & Form Abstractions
`🟠 Advanced` · `Essential` · 📁 `64-validation-and-form-abstractions/`

**Opens with:** client validation that says "valid", a server that says `400`, and a form that shows a generic toast instead of highlighting the bad field.
**Mental model:** 🧠 *One schema, two sides: the same schema validates on the client (for experience) and on the server (for safety), and the server always has the final word.*

1. **One schema, two sides** — sharing schemas between client and server.
2. **Runtime schemas for forms** — parsing on submit; coercing form strings.
3. **Server validation errors** — mapping API field errors into form errors.
4. **Error typing** — field errors, form-level errors, typed error codes.
5. **Form libraries** — React Hook Form with a schema resolver; when a library pays off.
6. **React Actions** — `<form action>`, `useActionState`, `useFormStatus`, `useOptimistic`.
7. **Reusable form components** — `TextField` and `SelectField` bound to typed field names.
8. **Type-safe form abstractions** — their limits, and why not to build your own form framework.

**Exercises:**
- **L1 Recall:** Write a schema for the create-task form and infer its type.
- **L2 Application:** Map a `400` response's field errors into the form.
- **L3 Challenge:** Build `<Field name="…">` components that only accept valid field names.
- **L4 Real-world:** Rebuild the project wizard with a form library and shared schemas; compare the code size and edge-case handling.

#### Chapter 65 — Authentication & Authorization
`🟠 Advanced` · `Essential` · 📁 `65-auth/`

**Opens with:** a "protected" admin page that anyone can reach by typing the URL, and an API that trusts an `isAdmin` flag sent by the client.
**Mental model:** 🧠 *Authentication answers "who are you?"; authorization answers "what may you do?". The UI can **hide** things for usability, but only the server can **forbid** them.*

1. **Authentication concepts** — sessions vs tokens, cookies, refresh.
2. **Where credentials live** — httpOnly cookies vs browser storage, and the security trade-offs.
3. **Auth state as a discriminated union** — `loading | anonymous | authenticated`.
4. **AuthProvider and useAuth** — the safe-context pattern from Ch 54, applied.
5. **Protected routes and redirects** — including "return to where you were".
6. **Modeling authorization** — roles and permissions as literal unions (`"task:delete"`), derived from a config object (Ch 20) and optionally generated with template literal types (Ch 24); a typed `can(user, permission)`.
7. **401 and 403 in the API client** — refresh flows and forced logout.
8. **UI authorization is not security** — enforcing the same rules on the server.

**Exercises:**
- **L1 Recall:** Classify ten checks as authentication or authorization.
- **L2 Application:** Implement a typed `useAuth()` and a `RequireAuth` route guard.
- **L3 Challenge:** Generate a `Permission` union from a role → permissions config object.
- **L4 Real-world:** Add role-based permissions to TaskFlow (owner/admin/member/viewer), enforced in both the UI and the API.

### ✅ Checkpoint — Part X · Building Real Applications
- **Know:** feature-based architecture and dependency rules; typed env config; routing with validated params and search params; the five kinds of state; server state vs client state; DTO → domain mapping; response validation; `ApiError` modeling; every UI state; TanStack Query; typed forms; shared schemas; server error mapping; React Actions; auth and authorization modeling.
- **Build:** P13 Typed Forms Kit, P14 TaskFlow Web, P15 Authentication System.
- **Answer:**
  1. Why shouldn't components depend on DTO types?
  2. Where should the current filter, the logged-in user, the task list, and a half-typed comment each live? Why?
  3. Show the difference between "what TypeScript believes" and "what the server returned" with code.
  4. Why do you still need server validation if the client validates with the same schema?
  5. Why is UI-only authorization not security?
- **Small challenge:** add a "tags" feature end to end (API schema → client → query → form → filter in the URL) in one sitting.
- **Optional project:** add real-time updates (server-sent events) to TaskFlow Web with cache updates.
- **Ready signs:** you can sketch a feature's layers and types before writing code; external data never reaches components unvalidated.
- **If you struggle, revisit:** Ch 32 (runtime safety), Ch 58 (architecture), Ch 60 (state homes), Ch 61 (the boundary).

### 🛠 P13 — Typed Forms Kit
- **Difficulty:** 🟡 Intermediate · **When:** Ch 63–64 · **Prerequisites:** Ch 22, 51, 63–64
- **Concepts used:** typed form state, mapped error types, `keyof` field names, schemas, server error mapping, accessibility.
- **Requirements:**
  1. A `useForm<T>` hook: values, errors, touched, dirty, `register(name)`, `handleSubmit`.
  2. `TextField`, `SelectField`, `CheckboxField`, and `FormError` components wired to typed field names.
  3. Three forms built with it: sign-up, create task, and a three-step project wizard.
  4. Schema validation on submit and field-level validation on blur.
  5. Server `400` errors are mapped onto fields.
  6. Fully keyboard- and screen-reader-accessible.
- **Suggested architecture:** `src/forms/{useForm.ts,fields/,errors.ts,schema-adapter.ts}` + `src/examples/`.
- **Stretch goals:** field arrays (dynamic subtasks); async validation (name availability) with debounce and abort.
- **You should understand afterward:** what a type-safe form abstraction can and can't guarantee, and when to reach for a library instead.

### 🛠 P14 — TaskFlow Web (React + API application)
- **Difficulty:** 🟡→🟠 · **When:** across Part X · **Prerequisites:** Ch 58–64, P07, P08
- **Concepts used:** feature architecture, routing, state architecture, the API boundary, server state, forms, schemas.
- **Requirements:**
  1. Pages: projects list, project board, task detail, and settings.
  2. Data from the P07 API through the P08 client and TanStack Query; every response validated.
  3. Filters, sorting, and pagination live in validated search params.
  4. Create and edit tasks with schema-validated forms; optimistic completion.
  5. Every view handles loading, empty, error, and success; there are no white screens.
  6. Feature-based structure with lint-enforced boundaries.
- **Suggested architecture:**
  ```
  apps/web/src/
    app/        # router, providers, layout
    features/   # projects/, tasks/, settings/ — each with components, hooks, api, types, index.ts
    shared/     # ui/, lib/, config/ (validated env)
  ```
- **Stretch goals:** a command palette; offline banner with retry; server-sent-event updates.
- **You should understand afterward:** how a complete, typed, validated React application fits together.

### 🛠 P15 — Authentication System
- **Difficulty:** 🟠 Advanced · **When:** Ch 65 · **Prerequisites:** Ch 65, P07, P14
- **Concepts used:** auth flows, httpOnly cookies, discriminated auth state, safe context, route guards, typed permissions, API error handling.
- **Requirements:**
  1. Sign-up, sign-in, sign-out, and session persistence (httpOnly cookie sessions on the P07 API).
  2. A password-reset flow with a mocked email transport.
  3. Roles (owner/admin/member/viewer) mapped to a typed permission set, enforced by the API *and* reflected in the UI.
  4. Protected routes with return-to redirects; global 401 handling; a friendly 403 page.
  5. Rate limiting and lockout on the sign-in endpoint.
- **Suggested architecture:** API `auth/` module (routes, service, session store, permission policy); web `features/auth/` (provider, hooks, guards, forms); permissions defined once in a shared module.
- **Stretch goals:** OAuth sign-in via a provider; an audit log of permission-sensitive actions.
- **You should understand afterward:** auth as a cross-layer concern, and why the type system helps *model* authorization but never *enforces* it.

---

### Part XI — Testing
> **Folder:** `11-testing/` · **Roadmap:** Stage 8 — Real Applications · **Difficulty:** 🟡

**Purpose of the part.** Testing was introduced in Ch 19 and Ch 27 for plain TypeScript. This part makes it a professional practice for React applications, starting from the question that organizes everything: **what does TypeScript already guarantee, and what must tests prove?**

#### Chapter 66 — What TypeScript Catches vs What Tests Catch
`🟡 Intermediate` · `Essential` · 📁 `66-types-vs-tests/`

**Opens with:** a fully typed, zero-error codebase whose "complete task" button marks the *wrong* task as done.
**Mental model:** 🧠 *Layers of safety, each catching a different class of failure:*

```
 Types ............ consistency: shapes, nullability, exhaustiveness, contracts between modules
 Lint ............. suspicious patterns: floating promises, hook rules, unsafe any
 Runtime validation  the outside world: API data, env, storage, input
 Unit tests ....... logic: "given this input, this output"
 Component tests .. behavior from the user's view: "clicking X shows Y"
 Integration tests  features working together, with mocked network
 E2E tests ........ the real app, real browser, critical paths
 Monitoring ....... what actually happens to real users in production
```

1. **The layered safety model** — the diagram above, with a real bug for each layer.
2. **What types prove** — and what "it compiles" really means.
3. **What only tests prove** — behavior, logic, integration, accessibility.
4. **What only runtime validation proves** — external data, again.
5. **Choosing test levels** — pyramid vs trophy; confidence per minute of effort.
6. **A test strategy for TaskFlow Web** — what to test at each level.
7. **Don't test what the compiler guarantees** — redundant tests vs valuable ones.

**Exercises:**
- **L1 Recall:** For twelve bugs, name the cheapest layer that catches each.
- **L2 Application:** Delete five redundant tests from a provided suite (they test what types guarantee).
- **L3 Challenge:** Write the bug that every layer *except* E2E misses.
- **L4 Real-world:** Write TaskFlow Web's `TESTING.md` strategy document.

#### Chapter 67 — Unit Testing Logic, Reducers & Hooks
`🟡 Intermediate` · `Essential` · 📁 `67-unit-testing/`

**Opens with:** a reducer with nine action types and zero tests, and a custom hook that only fails when two timers overlap.
**Mental model:** *Pure functions are the easiest things to test, so push logic into them. Hooks are tested by rendering them in a tiny harness.*

1. **Testing pure logic** — domain functions, mappers, formatters.
2. **Testing reducers** — table-driven tests over the action union.
3. **Testing custom hooks** — `renderHook`, `act`, `rerender`.
4. **Hooks that need context** — typed wrapper providers.
5. **Fake timers and async logic** — debounce, retry, polling.
6. **Type-safe mocks** — `vi.fn<typeof fn>()`, `vi.mocked`, `satisfies` for fixtures.
7. **Test data factories** — `buildTask(overrides?: Partial<Task>)`.
8. **Type tests for app code** — locking the public types of hooks and utilities.

**Exercises:**
- **L1 Recall:** Write table-driven tests for a three-action reducer.
- **L2 Application:** Test `useDebouncedValue` with fake timers.
- **L3 Challenge:** Build a typed factory library for TaskFlow (`buildTask`, `buildProject`, `buildUser`) with sensible defaults.
- **L4 Real-world:** Raise P14's domain and hook coverage to 90% with meaningful tests, not line-chasing.

#### Chapter 68 — Component Testing with Testing Library
`🟡 Intermediate` · `Essential` · 📁 `68-component-testing/`

**Opens with:** a test suite that breaks every time a `div` becomes a `section`, because it tested implementation, not behavior.
**Mental model:** 🧠 *Test like a user: find things by role and label, interact the way a person would, and assert on what's visible.*

1. **Testing like a user** — queries by role, label, and text; the query priority.
2. **Rendering with providers** — a typed custom `render` with router, query client, and auth.
3. **User interactions** — `user-event` for typing, clicking, and keyboard.
4. **Async UI** — `findBy*`, `waitFor`, and avoiding `act` warnings.
5. **Testing loading and error states** — controlling time and data.
6. **Testing forms** — validation messages and submission.
7. **Accessibility in tests** — roles as an accessibility signal; automated checks.
8. **What not to test** — implementation details and snapshot overuse.

**Exercises:**
- **L1 Recall:** Rewrite five fragile queries as role-based ones.
- **L2 Application:** Test the create-task form: validation, submission, server error display.
- **L3 Challenge:** Test a combobox's keyboard interaction completely.
- **L4 Real-world:** Write component tests for every state of the task board (loading/empty/error/ready).

#### Chapter 69 — Integration Testing, API Mocking & E2E
`🟠 Advanced` · `Essential` · 📁 `69-integration-and-e2e/`

**Opens with:** tests that mock `fetch` with hand-written objects that drifted from the real API months ago. All green, all lying.
**Mental model:** *Mock at the network boundary, not inside your code. Keep mocks honest by building them from the same schemas and types as the real API.*

1. **Integration tests** — testing a whole feature inside the app.
2. **API mocking with MSW** — typed handlers using DTO types.
3. **Preventing contract drift** — validating fixtures against API schemas; shared fixtures.
4. **Error and edge cases** — network failures, `500`s, slow responses, empty data.
5. **Testing routing and auth flows** — redirects, guards, and expired sessions.
6. **End-to-end tests with Playwright** — critical paths, test environments, selectors.
7. **Flaky tests** — causes and cures.
8. **Tests in CI** — fast feedback, sharding, and artifacts (deepened in Ch 76).

**Exercises:**
- **L1 Recall:** Write a typed MSW handler for `GET /tasks`.
- **L2 Application:** Test the "complete task" feature end to end with MSW, including rollback on failure.
- **L3 Challenge:** Make every MSW fixture fail its test if it stops matching the API schema.
- **L4 Real-world:** Write Playwright tests for sign-in → create project → add task → complete task.

### ✅ Checkpoint — Part XI · Testing
- **Know:** the layered safety model; test-level trade-offs; unit, hook, component, integration, and E2E testing; typed mocks and factories; network-level mocking; contract drift; flaky-test causes.
- **Build:** P16 TaskFlow Web Test Suite.
- **Answer:**
  1. Give three bugs TypeScript can't catch and the test level that catches each.
  2. Why prefer role-based queries?
  3. Why mock at the network level instead of mocking your API module?
  4. How do you keep mocks from drifting away from the real API?
  5. When is an E2E test worth its cost?
- **Small challenge:** find and fix a flaky test in a provided suite, explaining the root cause.
- **Optional project:** add visual regression tests for the component gallery.
- **Ready signs:** you write tests *while* building features, and refactors don't break your tests.
- **If you struggle, revisit:** Ch 66 (strategy), Ch 68 §1–4 (user-centric testing), Ch 69 §2–3 (typed mocking).

### 🛠 P16 — TaskFlow Web Test Suite
- **Difficulty:** 🟡 Intermediate · **When:** across Part XI · **Prerequisites:** Ch 66–69, P14 (and P15)
- **Concepts used:** every testing technique in Part XI.
- **Requirements:**
  1. Unit tests: domain functions, mappers, reducers, and hooks.
  2. Component tests: forms, lists, and every UI state of every page.
  3. Integration tests with typed MSW handlers for the main features.
  4. Fixtures validated against API schemas.
  5. Four Playwright E2E tests covering the critical paths.
  6. A CI job that runs everything, with coverage thresholds focused on domain and features.
- **Suggested architecture:** tests colocated with features (`*.test.tsx`), `test/` for utilities (custom render, factories, MSW server), `e2e/` for Playwright.
- **Stretch goals:** contract tests run against the real API in CI; visual regression snapshots.
- **You should understand afterward:** how to build confidence efficiently, and exactly which risks your types, tests, and validation each cover.

---

### Part XII — Production-Ready React
> **Folder:** `12-production/` · **Roadmap:** Stage 9 — Production · **Difficulty:** 🟡→🟠

**Purpose of the part.** An app that works on your machine is not an app that works for users. This part covers what changes in production: builds, failures, speed, accessibility, security, visibility, and delivery. **It ends the Essential core.**

#### Chapter 70 — Production Builds, Bundles & Code Splitting
`🟡 Intermediate` · `Essential` · 📁 `70-builds-and-code-splitting/`

**Opens with:** a 2.4 MB JavaScript bundle, a 6-second first load on a mid-range phone, and a build that passed even though the code had type errors.
**Mental model:** *A production build transforms, bundles, and minifies, but it does **not** type-check. Code splitting means users download only the code for what they're looking at.*

1. **What a production build does** — transpile, bundle, minify, tree-shake; why the bundler skips type-checking.
2. **Build configuration** — modes, env files, `tsc -b && vite build`.
3. **Source maps in production** — debugging without exposing source publicly.
4. **Analyzing bundles** — visualizers and dependency cost.
5. **Code splitting** — dynamic `import()`, `React.lazy`, `Suspense`.
6. **Route-based splitting and preloading**
7. **Bundle considerations** — heavy dependencies, icons, polyfills, browser targets.
8. **Deploying a static SPA** — hashed assets, caching headers, SPA fallback routing.

**Exercises:**
- **L1 Recall:** Explain why `vite build` succeeds with type errors, and fix the pipeline.
- **L2 Application:** Split TaskFlow Web by route and measure the difference.
- **L3 Challenge:** Cut the bundle by 30% by replacing or lazy-loading two dependencies.
- **L4 Real-world:** Deploy TaskFlow Web to a static host with correct caching and routing.

#### Chapter 71 — Error Boundaries & Resilient UIs
`🟡 Intermediate` · `Essential` · 📁 `71-error-boundaries/`

**Opens with:** one widget throws on a `null` field, and the whole dashboard goes blank.
**Mental model:** *An error boundary is a `try/catch` for a subtree's rendering. Place boundaries so a failure takes down the smallest useful piece of UI.*

1. **What happens when a component throws** — unmounting the tree.
2. **Error boundaries** — the one class component you'll still write, and how to type it.
3. **Using a boundary library** — typed fallback props and resetting.
4. **Where to place boundaries** — app, route, and widget levels.
5. **What boundaries don't catch** — event handlers and async code, and how to handle those.
6. **Route-level errors** — the router's error elements.
7. **Reporting errors** — connecting to monitoring (Ch 75).
8. **Designing fallback UI** — retry, degrade gracefully, keep users oriented.

**Exercises:**
- **L1 Recall:** Mark which errors a boundary catches in six snippets.
- **L2 Application:** Write a typed `ErrorBoundary` class with reset support.
- **L3 Challenge:** Add widget-level boundaries to P12 with retry.
- **L4 Real-world:** Design the error-handling map for TaskFlow Web (which errors, where caught, what users see).

#### Chapter 72 — Rendering Performance
`🟠 Advanced` · `Essential` · 📁 `72-rendering-performance/`

**Opens with:** typing in a filter box lags by 300 ms on a 2,000-row table.
**Mental model:** 🧠 *Measure, find the cause, then apply the smallest fix. Most render problems are about state placement, not missing `useMemo`.*

1. **Measuring first** — the React Profiler, the browser performance panel, web vitals.
2. **Why components re-render** — state, parent renders, context.
3. **Structural fixes** — state colocation, splitting components, passing children.
4. **Memoization with evidence** — `memo`, `useMemo`, `useCallback`, and the React Compiler in production.
5. **Transitions** — `useTransition` and `useDeferredValue` for responsiveness.
6. **Virtualizing long lists**
7. **Context performance** — splitting providers and selecting state.
8. **Performance budgets** — making performance a requirement.

**Exercises:**
- **L1 Recall:** Diagnose the cause of re-renders in four Profiler screenshots.
- **L2 Application:** Fix the laggy filter with `useDeferredValue`.
- **L3 Challenge:** Virtualize a 10,000-row table while keeping keyboard navigation.
- **L4 Real-world:** Set and enforce a performance budget for TaskFlow Web in CI.

#### Chapter 73 — Accessibility
`🟡 Intermediate` · `Essential` · 📁 `73-accessibility/`

**Opens with:** a screen-reader recording of the TaskFlow board: "button, button, button, clickable, clickable".
**Mental model:** *Accessibility is correctness for every user. Start with semantic HTML (it's accessible for free), then add keyboard support, focus management, and ARIA only where HTML runs out.*

1. **Why accessibility is a requirement** — users, legal standards, quality.
2. **Semantic HTML first** — buttons, links, landmarks, headings.
3. **Keyboard navigation** — focus order and keyboard interactions.
4. **Focus management** — modals, route changes, and after actions (refs from Ch 45/53).
5. **ARIA when needed** — roles, states, and properties; typed `aria-*` props.
6. **Accessible forms and errors**
7. **Color, motion, and preferences** — contrast, `prefers-reduced-motion`.
8. **Testing accessibility** — lint rules, role queries, automated audits, and a manual screen-reader pass.

**Exercises:**
- **L1 Recall:** Replace five `div` buttons with semantic elements.
- **L2 Application:** Make the task board fully keyboard-operable.
- **L3 Challenge:** Build an accessible modal: focus trap, `Escape`, focus return.
- **L4 Real-world:** Audit TaskFlow Web against WCAG AA and fix every critical issue.

#### Chapter 74 — Security for Frontend Developers
`🟠 Advanced` · `Essential` · 📁 `74-security/`

**Opens with:** a comment field that renders markdown with `dangerouslySetInnerHTML`, and a proof-of-concept that steals a token from `localStorage`.
**Mental model:** 🧠 *The browser is enemy territory: anything you ship is public, anything you render may be hostile, and anything the client says must be verified by the server.*

1. **The frontend threat model** — what attackers can and can't do.
2. **XSS** — React's escaping, `dangerouslySetInnerHTML`, and sanitization.
3. **URL and attribute injection** — `javascript:` URLs and validating `href`s.
4. **Tokens and sessions** — storage choices, CSRF, cookie flags.
5. **Secrets and env vars** — anything bundled into the browser is public.
6. **Dependency and supply-chain risk** — lockfiles, audits, update policies.
7. **Content Security Policy** — the basics, and how to roll one out.
8. **Never trust the client** — server-side validation and authorization (Ch 32, Ch 65).

**Exercises:**
- **L1 Recall:** Identify the vulnerability in six snippets.
- **L2 Application:** Safely render user-supplied markdown.
- **L3 Challenge:** Write a `safeHref(url: string)` helper with tests covering attack payloads.
- **L4 Real-world:** Write a security checklist for TaskFlow Web and add a CSP.

#### Chapter 75 — Observability: Logging, Monitoring & Analytics
`🟡 Intermediate` · `Essential` · 📁 `75-observability/`

**Opens with:** a user reports "the app broke"; there are no logs, no stack traces, and no way to know which version they were on.
**Mental model:** *You can't fix what you can't see. Make errors, performance, and product events visible, with typed event definitions so the data stays trustworthy.*

1. **Why observability** — the feedback loop from production.
2. **Structured logging in the browser** — levels, context, and no personal data.
3. **Error tracking** — capturing errors with context, release versions, and source maps.
4. **Typed analytics events** — a discriminated-union event catalog and a `track()` function keyed by event name (reuse P05's emitter if you built it).
5. **Performance monitoring** — web vitals and real-user monitoring.
6. **Feature flags** — typed flag definitions and safe rollouts.
7. **Privacy and consent**

**Exercises:**
- **L1 Recall:** Design the event union for five product events.
- **L2 Application:** Report boundary-caught errors with release and route context.
- **L3 Challenge:** Make `track()` reject events whose payloads don't match the catalog, at compile time.
- **L4 Real-world:** Build an observability plan for TaskFlow Web: what's logged, tracked, and alerted on.

#### Chapter 76 — CI/CD & Long-Term Maintainability
`🟡 Intermediate` · `Essential` · 📁 `76-ci-cd-and-maintainability/`

**Opens with:** a release that broke production because the type-check step only ran on the author's laptop.
**Mental model:** *CI is the team's shared memory of "what must always be true". If it isn't checked automatically, it isn't guaranteed.*

1. **A CI pipeline for TypeScript + React** — install, type-check, lint, test, build, E2E.
2. **Speed and caching**
3. **Preview deployments and required checks**
4. **Continuous delivery** — environments, promotion, rollback.
5. **Dependency updates** — automated update PRs and type-breaking upgrades.
6. **Maintainability practices** — strictness ratchets, dead-code detection, type coverage.
7. **Documentation that stays current** — READMEs and architecture decision records.
8. **The production checklist** — everything in Part XII, in one list.

**Exercises:**
- **L1 Recall:** Order the pipeline steps and justify the order.
- **L2 Application:** Write a CI workflow for TaskFlow Web.
- **L3 Challenge:** Cut CI time in half with caching and parallelism.
- **L4 Real-world:** Run the production checklist against P17 and fix every gap.

### ✅ Checkpoint — Part XII · Production-Ready React
- **Know:** what production builds do (and don't); code splitting; error boundaries and their limits; profiling and render fixes; transitions; virtualization; accessibility fundamentals; frontend security; observability; CI/CD; maintainability practices.
- **Build:** P17 Complex Dashboard (Production Edition).
- **Answer:**
  1. Why doesn't your bundler catch type errors, and how do you make sure they're caught?
  2. Where would you place error boundaries in a dashboard, and why?
  3. What's the first thing to do when a page feels slow?
  4. Name three XSS vectors in a React app.
  5. What belongs in a CI pipeline for this stack?
- **Small challenge:** take a provided slow, inaccessible page and fix its worst performance issue and its three worst accessibility issues.
- **Optional project:** add internationalization to P17.
- **Ready signs:** you think about failure modes, performance, and accessibility while designing features, not after.
- **If you struggle, revisit:** Ch 71 (boundaries), Ch 72 §1–3 (measure first), Ch 73 §2–4, Ch 74 §2 and §4.

> ★ **Essential core complete.** A reader who has finished Parts I–XII, with their checkpoints and projects, is a productive, job-ready TypeScript + React developer. Book Three is about mastery.

### 🛠 P17 — Complex Dashboard: Production Edition
- **Difficulty:** 🟠 Advanced · **When:** across Part XII · **Prerequisites:** Part XII, P12, P14
- **Concepts used:** everything in Parts IX–XII.
- **Requirements:**
  1. Evolve P12 into a multi-page analytics dashboard fed by the P07 API and one public API, with every response validated.
  2. Route-based code splitting with a measured bundle budget.
  3. Error boundaries per widget and per route, reporting to an error tracker.
  4. A virtualized 10,000-row table; filters made responsive with transitions.
  5. Meets WCAG AA (audited), with keyboard-only operation.
  6. A CSP, no `dangerouslySetInnerHTML`, and validated env config.
  7. Typed analytics events and web-vitals reporting.
  8. A CI/CD pipeline with preview deploys and required checks.
- **Suggested architecture:** P14's structure plus `shared/observability/`, `shared/errors/`, per-route lazy modules, and a `budgets.json` checked in CI.
- **Stretch goals:** a web worker for heavy aggregations; internationalization; offline caching.
- **You should understand afterward:** what "production quality" means in concrete, checkable terms.

---
**Previous:** [← 7. React Curriculum](07-react-curriculum.md) · **Next:** [9. Advanced & Professional Development →](09-advanced-and-professional.md)
