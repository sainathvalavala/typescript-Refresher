# 7. Detailed React Curriculum

> **Book Two — Building Interfaces with React + TypeScript** · Parts VII–VIII · Chapters 34–48
>
> React is taught **as its own conceptual system** in Part VIII. All code is written in `.tsx` from the first component, but with *deliberately simple* types (props as a small type alias, inferred state). This keeps attention on React's model. Part IX (Section 8) is where component types are *designed*. Chapter cards follow the format described at the top of [Section 5](05-typescript-curriculum.md).

---

### Part VII — From Language to Interfaces
> **Folder:** `07-from-language-to-interfaces/` · **Roadmap:** Stage 5 — From Language to Interfaces · **Difficulty:** 🟡

**Purpose of the part.** *"You now understand the TypeScript language. Now let's use it to build interfaces."* This part connects TypeScript to the browser, has the reader build a real UI **without** React, and turns the resulting pain into the motivation for React.

#### Chapter 34 — The Bridge: TypeScript Concepts You'll Use in React
`🟢 Beginner` · `Essential` · 📁 `34-the-bridge/`

**Opens with:** a 25-line React component shown on day one, with every TypeScript concept in it highlighted. Readers discover they already understand most of it.
**Mental model:** *React is "just" TypeScript: components are functions, props are parameter objects, hooks are generic functions, and UI states are unions.*

1. **From language to interfaces** — what changes when code produces UI instead of values.
2. **Functions become components** — a component is a function from props to UI.
3. **Objects and destructuring become props** — the parameter-object pattern you already know.
4. **Modules become component files** — one concept per file, type-only imports for props types.
5. **Interfaces and aliases become contracts** — props types as the component's public API.
6. **Unions and narrowing become UI states** — conditional rendering is narrowing.
7. **Generics appear in hooks and components** — `useState<T>`, `useRef<T>`, generic lists.
8. **Utility types shape props** — `Omit`, `Partial`, `Pick`, and `ComponentProps`.
9. **Inference does the heavy lifting** — `useState(0)` needs no annotation.
10. **Bridge self-check** — a quiz mapping each TypeScript chapter to its React use.

| TypeScript concept | Where it appears in React | Chapter |
|---|---|---|
| Functions, callbacks | Components, event handlers, callback props | 39, 41, 51 |
| Objects, destructuring | Props, state objects | 39, 50 |
| Modules, `import type` | Component files, shared types | 38, 58 |
| Interfaces / aliases | Props contracts, context values | 50, 54 |
| Unions, narrowing | Conditional rendering, UI states, reducers | 40, 52, 55 |
| Generics | `useState<T>`, `useRef<T>`, custom hooks, generic components | 52, 53, 56, 57 |
| Utility types | `ComponentProps`, `Omit` for wrappers, `Partial` for updates | 50, 52 |
| Inference | Hooks, inline handlers (contextual typing) | 51, 52 |

**Exercises:**
- **L1 Recall:** Annotate a provided component, labeling every TypeScript concept it uses.
- **L2 Application:** Rewrite a function-based "render to string" helper as a component-like function with typed props.
- **L3 Challenge:** Predict the inferred types in a component that uses `useState`, `map`, and an inline handler.
- **L4 Real-world:** Read a small open-source React + TS component and write a "what I recognize vs what's new" list.

#### Chapter 35 — TypeScript in the Browser: Typing the DOM
`🟡 Intermediate` · `Essential` · 📁 `35-typing-the-dom/`

**Opens with:** `document.querySelector("#email").value` gives `Object is possibly 'null'` and then `Property 'value' does not exist on type 'Element'`. Two errors in one line, and both are *right*.
**Mental model:** 🧠 *The DOM is a typed class hierarchy described by `lib.dom.d.ts`: `EventTarget → Node → Element → HTMLElement → HTMLInputElement`. Selecting an element only tells TypeScript the most general thing it can prove.*

1. **lib.dom.d.ts** — the browser described in types; the `lib` setting.
2. **The element hierarchy** — reading the inheritance chain; tag-name maps.
3. **Selecting elements safely** — `querySelector` with tag names vs selectors; `instanceof` checks vs `as` vs generic arguments.
4. **Typed DOM events** — `addEventListener` inference via event maps; `MouseEvent`, `KeyboardEvent`, `InputEvent`, `SubmitEvent`.
5. **target vs currentTarget** — why `e.target` is just `EventTarget | null`.
6. **Forms and inputs** — string values, `valueAsNumber`, `FormData`.
7. **Browser APIs at the boundary** — `fetch`, `localStorage` (`string | null` → JSON → `unknown`), URL parameters.
8. **Building Vanilla TaskFlow** — rendering a list, adding, toggling, filtering, counting, with no framework.
9. **The pain log** — recording every state/DOM synchronization bug you hit (this feeds Ch 36).

**Common mistakes:** `as HTMLInputElement` everywhere · ignoring `null` from selectors · reading `e.target.value` without narrowing.
**Project:** P09 Vanilla TaskFlow.

**Exercises:**
- **L1 Recall:** Give the type returned by six different `querySelector` calls.
- **L2 Application:** Write `getRequiredElement<T extends Element>(selector, ctor)` that throws helpfully if missing.
- **L3 Challenge:** Add keyboard navigation to the vanilla task list.
- **L4 Real-world:** Add a "filter + counter + empty state" feature to P09 and log how many places needed manual updates.

#### Chapter 36 — Why React?
`🟢 Beginner` · `Essential` · 📁 `36-why-react/`

**Archetype:** Story chapter. **Opens with:** the reader's own pain log from P09: "Counter wrong after delete", "empty state shown with 2 items", "filter tab not highlighted after reload".
**Mental model:** 🧠 *UI = f(state).* Stop writing instructions for *changing* the screen; write a description of what the screen *should be* for any given state, and let React work out the changes.

1. **Traditional DOM manipulation** — imperative updates: find, patch, repeat.
2. **When UIs get complex** — n pieces of state × m displays = n × m update paths.
3. **What UI state is** — data that changes over time and affects what's shown.
4. **Synchronizing state with the DOM** — duplicated truth, stale displays, ordering bugs.
5. **Declarative UI** — describing outcomes instead of steps; the spreadsheet analogy.
6. **Component-based thinking** — decomposition, encapsulation, reuse.
7. **React's core idea** — render a description, compare, update the DOM.
8. **Components, props, state, and rendering** — a first conceptual pass at all four.
9. **Why React became popular** — composition, one-way data flow, ecosystem, React Native, longevity; honest trade-offs and alternatives (Vue, Svelte, Solid, Angular).
10. **Why TypeScript + React** — typed contracts between every piece of UI (§3.7).

**Exercises:**
- **L1 Recall:** Explain declarative vs imperative using a non-programming analogy.
- **L2 Application:** Sketch the component tree for P09's UI.
- **L3 Challenge:** For three bugs in your pain log, explain why they cannot happen when the UI is derived from state.
- **L4 Real-world:** Write a one-page technology decision record: "React for TaskFlow Web", with alternatives considered.

### ✅ Checkpoint — Part VII · From Language to Interfaces
- **Know:** how DOM types are organized; safe element selection; typed DOM events; why `e.target` is loosely typed; the state/DOM synchronization problem; declarative UI.
- **Build:** P09 Vanilla TaskFlow, plus your pain log.
- **Answer:**
  1. Why does `querySelector("#id")` return `Element | null` while `querySelector("input")` returns `HTMLInputElement | null`?
  2. What's the difference between `target` and `currentTarget`?
  3. Why does manual DOM synchronization scale badly?
  4. In one sentence, what is React's core idea?
- **Small challenge:** add an "undo last delete" feature to P09. Notice how many update paths it touches.
- **Optional project:** extend P09 with localStorage persistence that validates what it loads.
- **Ready signs:** you can explain *why* React exists from your own experience, not just from the book.
- **If you struggle, revisit:** Ch 35 §3–5 (selection and events), Ch 36 §2–5 (the synchronization problem).

### 🛠 P09 — Vanilla TaskFlow (the pain project)
- **Difficulty:** 🟡 Intermediate · **When:** Ch 35 · **Prerequisites:** Ch 35, P02
- **Concepts used:** DOM types, typed events, `instanceof` narrowing, `FormData`, localStorage at a boundary, P02's domain model.
- **Requirements:**
  1. A task list rendered from an in-memory array, with add, toggle, edit, and delete.
  2. Filter tabs (all/active/done), a "N left" counter, an empty state, and a "clear completed" button.
  3. Persist to localStorage; validate on load.
  4. No frameworks, and **no `as` on DOM lookups**: use narrowing helpers.
  5. Keep a `PAIN-LOG.md`: every synchronization bug, with how long it took to find.
- **Suggested architecture:** `src/state.ts` (array + mutations), `src/render.ts` (DOM updates), `src/events.ts` (wiring), `src/storage.ts` (boundary). Try a "re-render everything" approach and a "patch only what changed" approach, and compare them.
- **Stretch goals:** keyboard shortcuts; drag-to-reorder; a minimal `render(state)` function, discovering React's idea yourself.
- **You should understand afterward:** exactly what problems React will solve for you, and what the DOM types look like underneath React's types.

---

### Part VIII — Thinking in React
> **Folder:** `08-thinking-in-react/` · **Roadmap:** Stage 6 — Thinking in React · **Difficulty:** 🟢→🟡

**Purpose of the part.** React as a *way of thinking*: rendering, snapshots, state ownership, and synchronization. Hooks are **not** taught as a list of APIs. State comes first (Ch 41–42), then a mental model frames every hook as the answer to a question (Ch 43), then each hook gets a chapter.

#### Chapter 37 — The React Mental Model
`🟢 Beginner` · `Essential` · 📁 `37-react-mental-model/`

**Opens with:** P09's "toggle a task" handler (35 lines of DOM patching) next to the React version (8 lines, zero DOM calls).
**Mental model:** 🧠 *UI = f(state). A **render** is React calling your component function to get a description; a **commit** is React applying the differences to the DOM. You describe; React updates.*

1. **Setting up React with Vite and TypeScript** — the `react-ts` template, file tour, dev server.
2. **UI as a function of state** — the core equation, demonstrated.
3. **Components return descriptions** — elements are plain objects, not DOM nodes.
4. **Trigger, render, commit** — the three steps of every update.
5. **The render tree** — parents re-render children; what "re-render" does *not* mean (DOM replacement).
6. **Purity** — components must be pure during render; why Strict Mode renders twice in development.
7. **What React is and isn't** — a UI library, not a framework; where routing and data fit later.
8. **React DevTools** — inspecting components, props, and state.

**Common mistakes:** thinking a re-render rewrites the DOM · side effects during render · mutating props.

**Exercises:**
- **L1 Recall:** Label trigger/render/commit in three scenarios.
- **L2 Application:** Port P09's static task list markup into a component tree.
- **L3 Challenge:** Write an impure component, observe the Strict Mode double render, and fix it.
- **L4 Real-world:** Explore a production React site with DevTools and sketch its component hierarchy.

#### Chapter 38 — JSX: Describing UI with JavaScript
`🟢 Beginner` · `Essential` · 📁 `38-jsx/`

**Opens with:** "Is JSX HTML?" The compiled output of `<Button kind="primary">Save</Button>`, shown as a function call.
**Mental model:** *JSX is syntax for creating element objects. Anything you can do with JavaScript expressions, you can do in braces.*

1. **JSX is JavaScript** — compilation to `jsx()` calls; why one root element.
2. **Expressions in braces** — values, function calls, conditionals.
3. **Attributes become props** — `className`, `htmlFor`, `style` objects, camelCase handlers.
4. **Fragments** — grouping without wrapper elements.
5. **What renders and what doesn't** — `null`, `undefined`, and `false` render nothing; `0` renders "0".
6. **JSX and safety** — automatic escaping; why `dangerouslySetInnerHTML` is named that way.
7. **TSX specifics** — `.tsx` files, no angle-bracket assertions, `<T,>` for generic arrow functions.

**Exercises:**
- **L1 Recall:** Translate five JSX snippets to `jsx()` calls and back.
- **L2 Application:** Convert an HTML template to JSX, fixing every attribute.
- **L3 Challenge:** Explain why `{items.length && <List />}` can render a stray `0`.
- **L4 Real-world:** Build a static product page from a design mockup.

#### Chapter 39 — Components, Props & Composition
`🟢 Beginner` · `Essential` · 📁 `39-components-props-composition/`

**Opens with:** one 300-line `App` component that does everything.
**Mental model:** *Components are functions; props are their arguments; children are a special argument that holds nested UI. Data flows down and events flow up.*

1. **Defining components** — naming, one concept per component, files.
2. **Props as parameters** — destructuring, a simple props type, defaults.
3. **Children** — nesting UI, wrapper components.
4. **Composition over configuration** — small composable parts vs "mega-prop" components.
5. **Passing callbacks** — child-to-parent communication.
6. **One-way data flow** — data down, events up.
7. **Splitting a UI into components** — from mockup to hierarchy (Thinking in React, step 1).
8. **Styling components (orientation)** — CSS Modules, utility CSS, inline styles; the decision is deferred to Ch 58 and Ch 93.

**Common mistakes:** components that are too big or too small · copying props into state · boolean-prop explosion (`isPrimary isLarge isRounded…`).
**Project:** P10 Component Gallery (begins here).

**Exercises:**
- **L1 Recall:** Extract three components from a provided page.
- **L2 Application:** Build a `Card` that composes `Card.Header`-style children through props and `children`.
- **L3 Challenge:** Refactor a 12-prop component into composable pieces.
- **L4 Real-world:** Decompose a real app screen (e.g., an email client) into a component tree with data flow arrows.

#### Chapter 40 — Conditional Rendering, Lists & Keys
`🟢 Beginner` · `Essential` · 📁 `40-conditionals-lists-keys/`

**Opens with:** deleting the second item in a list, after which the *third* item's half-typed input text jumps into the second row.
**Mental model:** 🧠 *A key is an item's identity across renders. React matches elements by position and key, not by content.*

1. **Conditional rendering patterns** — early return, ternary, `&&`, lookup objects.
2. **The && pitfall** — numbers and empty strings.
3. **Rendering lists** — `map`, filtering and sorting before rendering.
4. **Keys and identity** — what React does with keys during reconciliation.
5. **Key mistakes** — index keys, random keys, unstable keys.
6. **Keys as a reset tool** — `key={userId}` to reset a subtree's state.
7. **Empty states** — designing for "nothing to show" from the start.

**Exercises:**
- **L1 Recall:** Choose correct keys for five data sets.
- **L2 Application:** Render TaskFlow tasks grouped by status with headings and empty states.
- **L3 Challenge:** Reproduce the "jumping input" bug with index keys, then fix it.
- **L4 Real-world:** Build a searchable, sortable contact list with highlighted matches.

#### Chapter 41 — Interactivity: Events & State
`🟢 Beginner` · `Essential` · 📁 `41-events-and-state/`

**Opens with:** `let count = 0; <button onClick={() => count++}>` that never updates the screen.
**Mental model:** 🧠 *State is a component's memory, and every render sees a **snapshot** of it. Setting state doesn't change the current snapshot; it schedules a new render with a new one.*

1. **Responding to events** — handlers, passing vs calling, the event object.
2. **Why local variables don't work** — they reset each render and don't trigger renders.
3. **useState** — declaring state; the `[value, setValue]` tuple.
4. **State as a snapshot** — why `console.log(count)` after `setCount` shows the old value.
5. **Batching and updater functions** — `setCount(c => c + 1)` and when you need it.
6. **Updating objects in state** — immutability, spreading, nested updates.
7. **Updating arrays in state** — `map`, `filter`, and spread instead of `push`/`splice`.
8. **Event propagation** — bubbling, `stopPropagation`, `preventDefault`.

**Common mistakes:** mutating state · expecting synchronous updates · calling the handler instead of passing it (`onClick={save()}`).

**Exercises:**
- **L1 Recall:** Predict the displayed value after three `setCount` patterns.
- **L2 Application:** Build add/toggle/delete for tasks with immutable updates.
- **L3 Challenge:** Implement "move task up/down" without mutation.
- **L4 Real-world:** Build a shopping cart with quantities, removal, and a computed total.

#### Chapter 42 — Thinking in State: Structure, Derivation & Lifting
`🟡 Intermediate` · `Essential` · 📁 `42-thinking-in-state/`

**Opens with:** a component storing `tasks`, `doneTasks`, `doneCount`, and `hasTasks`. Four pieces of state that disagree after one bug.
**Mental model:** 🧠 *Store the minimum; derive the rest. Every piece of data has exactly one owner, the closest common parent of everything that needs it.*

1. **Minimal state** — what *not* to store.
2. **Derived values** — computing during render instead of syncing.
3. **Principles of state structure** — group related state, avoid contradictions, redundancy, duplication, and deep nesting.
4. **Controlled and uncontrolled inputs** — `value` + `onChange` vs `defaultValue`.
5. **Lifting state up** — moving state to the common parent.
6. **Sharing state between siblings** — via the parent.
7. **State colocation** — keep state as low as possible, as high as necessary.
8. **Preserving and resetting state** — how tree position and keys decide it.
9. **Thinking in React, end to end** — the five steps applied to a filterable task board.

**Common mistakes:** syncing derived state with effects · duplicating server data into local state · lifting everything to `App`.

**Exercises:**
- **L1 Recall:** Identify redundant state in four components.
- **L2 Application:** Lift the filter state so both the tabs and the counter use it.
- **L3 Challenge:** Refactor a "state soup" component to minimal state with derived values.
- **L4 Real-world:** Build a two-pane email-style UI (list + detail) with correct state ownership.

#### Chapter 43 — Hooks: The Mental Model
`🟡 Intermediate` · `Essential` · 📁 `43-hooks-mental-model/`

**Opens with:** a hook called inside an `if`, and the bizarre bug where one state variable shows another's value.
**Mental model:** 🧠 *React gives each component instance a list of memory slots, and hooks claim them **in call order** on every render. That is why the rules exist.*

| Question you're asking | Hook that answers it | Chapter |
|---|---|---|
| "I need to remember something that affects what's shown." | `useState` | 41 |
| "I need to remember something that *doesn't* affect what's shown." | `useRef` | 45 |
| "I need to synchronize with something outside React." | `useEffect` | 44 |
| "I need data from far up the tree." | `useContext` | 46 |
| "My state changes follow complex rules." | `useReducer` | 55 |
| "I need to skip expensive work or keep identity stable." | `useMemo` / `useCallback` | 47 |
| "I want to reuse a combination of the above." | A custom hook | 48 |

1. **What a hook is** — a function that hooks into React's per-component memory.
2. **The rules of hooks, and why** — call-order slots; top level only; React functions only.
3. **The question → hook map** — the table above, with one tiny example each.
4. **Hooks compose** — custom hooks are made of hooks.
5. **Hooks and the render cycle** — what runs during render vs after commit.
6. **Linting the rules** — `eslint-plugin-react-hooks` errors as teachers.
7. **The React Compiler, briefly** — what it automates and what you still need to understand.

**Exercises:**
- **L1 Recall:** Match ten scenarios to the right hook.
- **L2 Application:** Find and fix three rules-of-hooks violations.
- **L3 Challenge:** Explain, with a diagram of memory slots, why a conditional hook breaks.
- **L4 Real-world:** Annotate an existing component: for each hook, the "question" it answers.

#### Chapter 44 — useEffect: Synchronizing with the Outside World
`🟡 Intermediate` · `Essential` · 📁 `44-effects/`

**Opens with:** a chat room component that connects twice, never disconnects, and shows messages from the previous room after switching.
**Mental model:** 🧠 *An effect is a synchronization: "while this component is on screen with these values, keep this external thing in sync". Setup starts it, cleanup stops it, and dependencies decide when to restart.*

1. **Effects are for synchronization** — not "lifecycle methods".
2. **Anatomy of an effect** — setup, cleanup, dependencies.
3. **The dependency array** — reactive values; the lint rule as the source of truth.
4. **Cleanup** — subscriptions, timers, and aborting requests.
5. **Strict Mode's double effect** — why mount → unmount → mount exposes missing cleanups.
6. **Fetching in an effect** — race conditions, `AbortController`, stale responses.
7. **You might not need an effect** — derived values, event handlers, resetting with keys.
8. **Separating events from effects** — non-reactive logic with `useEffectEvent`.
9. **Common effect bugs** — infinite loops, stale closures, object dependencies.

**Common mistakes:** suppressing the dependency lint · effects that set derived state · fetching without cleanup.
**When not to:** anything triggered by a user action belongs in an event handler.

**Exercises:**
- **L1 Recall:** Classify eight pieces of logic as "render", "event handler", or "effect".
- **L2 Application:** Sync `document.title` with the number of open tasks.
- **L3 Challenge:** Fix a racing search-as-you-type fetch with `AbortController`.
- **L4 Real-world:** Build a reconnecting WebSocket status indicator with correct cleanup.

#### Chapter 45 — useRef: Remembering Without Re-rendering
`🟡 Intermediate` · `Essential` · 📁 `45-refs/`

**Opens with:** a stopwatch whose `setInterval` ID is stored in state, causing extra renders, or in a variable, so it's lost on the next render.
**Mental model:** *A ref is a mutable box that survives renders but doesn't trigger them. React gives you the same box every render.*

1. **Refs vs state** — when changes should and shouldn't re-render.
2. **Storing values across renders** — timer IDs, previous values, instance counters.
3. **Referencing DOM elements** — focus, scroll, measure.
4. **Managing focus** — accessible focus after actions (deepened in Ch 73).
5. **Ref pitfalls** — reading or writing refs during render.
6. **Refs as props** — passing refs to your own components (typed in Ch 53).

**Exercises:**
- **L1 Recall:** Choose state or ref for six values.
- **L2 Application:** Focus the "new task" input after adding a task.
- **L3 Challenge:** Build `usePrevious(value)` and explain its timing.
- **L4 Real-world:** Build a stopwatch with lap times and no unnecessary renders.

#### Chapter 46 — useContext: Sharing Data Through the Tree
`🟡 Intermediate` · `Essential` · 📁 `46-context/`

**Opens with:** `theme` and `currentUser` threaded through six layers of components that don't use them.
**Mental model:** *Context is a broadcast channel scoped to a subtree: a provider sends, and any descendant can tune in.*

1. **The prop-drilling problem** — when it's fine and when it hurts.
2. **Creating and providing context** — `createContext`, providers.
3. **Consuming context** — `useContext`, the nearest provider wins.
4. **Context with state** — provider components that own state.
5. **When to use context** — theme, auth, locale, feature-level state; not "everything global".
6. **Context and re-renders** — splitting contexts, stable values.
7. **Composition before context** — passing components as children to avoid drilling.

**Exercises:**
- **L1 Recall:** Decide context vs props for six data items.
- **L2 Application:** Add a theme context with a toggle.
- **L3 Challenge:** Remove a prop-drilling chain using composition alone, with no context.
- **L4 Real-world:** Design the context map for TaskFlow (what lives where, and why).

#### Chapter 47 — useMemo, useCallback & memo: Identity and Performance
`🟡 Intermediate` · `Essential` · 📁 `47-memoization/`

**Opens with:** a memoized child that re-renders anyway, because its `onSelect` prop is a new function every render.
**Mental model:** 🧠 *Every render creates new objects and functions. Memoization keeps the previous one when inputs haven't changed, trading memory and complexity for skipped work.*

1. **Referential identity** — `{}` !== `{}`; functions are new every render.
2. **When re-renders are a problem** — and when they aren't; measure first.
3. **memo** — skipping a child's render when its props are equal.
4. **useMemo** — caching expensive computations and stable objects.
5. **useCallback** — stable function identities.
6. **The cost of memoization** — complexity, dependency bugs, wasted comparisons.
7. **The React Compiler** — automatic memoization and how it changes the defaults.
8. **A decision checklist** — profile, then memoize the proven bottleneck.

**When not to:** by default, don't. Add memoization when a profiler shows a problem, or when identity matters (effect dependencies, memoized children).

**Exercises:**
- **L1 Recall:** Predict which children re-render in four scenarios.
- **L2 Application:** Make a memoized list item actually skip renders.
- **L3 Challenge:** Remove unnecessary `useMemo`/`useCallback` from a component without changing behavior or performance.
- **L4 Real-world:** Profile a slow filterable list of 5,000 items and fix the real bottleneck.

#### Chapter 48 — Custom Hooks: Reusing Stateful Logic
`🟡 Intermediate` · `Essential` · 📁 `48-custom-hooks/`

**Opens with:** the same "sync with localStorage" logic copy-pasted into four components, each with a slightly different bug.
**Mental model:** *A custom hook is a function that uses hooks, so it gets its own state slots in each component that calls it. Hooks share **logic**, not **state**.*

1. **Extracting a custom hook** — from duplication to `useSomething`.
2. **Naming and rules** — the `use` prefix and why the linter cares.
3. **Logic, not state** — two components using the same hook get independent state.
4. **Designing a hook's interface** — inputs, outputs, tuple vs object returns (typed deeply in Ch 56).
5. **Common custom hooks** — `useLocalStorage`, `useDebouncedValue`, `useMediaQuery`, `useOnlineStatus`.
6. **When not to make a hook** — premature extraction; hooks that hide simple code.
7. **Testing hooks (preview)** — why hooks are testable units (Ch 67).

**Exercises:**
- **L1 Recall:** Identify logic in three components that could become a hook.
- **L2 Application:** Write `useToggle` and `useDebouncedValue`.
- **L3 Challenge:** Write `useLocalStorage` that handles invalid stored JSON safely (runtime safety, again).
- **L4 Real-world:** Extract TaskFlow's filtering and keyboard-shortcut logic into hooks.

### ✅ Checkpoint — Part VIII · Thinking in React
- **Know:** render vs commit; purity; JSX; components, props, children, composition; conditional rendering; keys; state snapshots; immutable updates; minimal and derived state; lifting state; the hooks mental model; effects as synchronization; refs; context; memoization trade-offs; custom hooks.
- **Build:** P10 Component Gallery and P11 TaskFlow in React.
- **Answer:**
  1. Why does `console.log(state)` right after `setState` print the old value?
  2. What problem do keys solve, and why are index keys risky?
  3. Give two examples of logic that should *not* be in an effect.
  4. Why do the rules of hooks exist?
  5. When is `useMemo` worth it?
  6. What's the difference between sharing logic (custom hooks) and sharing state (lifting, context)?
- **Small challenge:** build a debounced search box over a list, with correct effect cleanup and no unnecessary state.
- **Optional project:** add undo/redo to P11.
- **Ready signs:** you design state ownership *before* writing components; you rarely write effects for derived data.
- **If you struggle, revisit:** Ch 41 §4 (snapshots), Ch 42 (state structure), Ch 44 §1–7 (effects), Ch 43 (the hooks model).

### 🛠 P10 — Component Gallery (basic React components)
- **Difficulty:** 🟢 Beginner · **When:** Ch 39–42 · **Prerequisites:** Ch 37–42
- **Concepts used:** components, props, children, composition, conditional rendering, lists and keys, state, events, controlled inputs.
- **Requirements:**
  1. Eight components: `Button`, `Badge`, `Avatar` (image with initials fallback), `Card`, `Toggle`, `Counter`, `Tabs`, `Accordion`.
  2. A gallery page with a sidebar listing every component and 2–3 variants each.
  3. Props typed with simple type aliases; no `any`.
  4. Tabs and Accordion manage their own state; the gallery's selected component lives in the URL hash.
- **Suggested architecture:** `src/components/<Name>/<Name>.tsx` + `index.ts`; `src/gallery/GalleryPage.tsx`.
- **Stretch goals:** keyboard support for Tabs (arrow keys); a theme toggle (to be replaced by context after Ch 46).
- **You should understand afterward:** decomposition, composition, and component-level state ownership. These components get redesigned with proper API types in Ch 50 and again as a library in P20.

### 🛠 P11 — TaskFlow in React
- **Difficulty:** 🟡 Intermediate · **When:** end of Part VIII · **Prerequisites:** Part VIII, P02, P09
- **Concepts used:** everything in Part VIII.
- **Requirements:**
  1. Re-implement all of P09's features in React.
  2. Persist with a validated `useLocalStorage` hook.
  3. Keyboard shortcuts via an effect with cleanup; focus management via refs.
  4. A theme context.
  5. Write a `RETRO.md` comparing P09 and P11: lines of code, number of sync bugs, time to add the "clear completed" feature.
- **Suggested architecture:**
  ```
  src/
    features/tasks/{components,hooks}/
    domain/          # reused from P02
    shared/{components,hooks,context}/
  ```
- **Stretch goals:** drag-and-drop reordering; undo; a Profiler experiment before and after memoization.
- **You should understand afterward:** the measured payoff of declarative UI, in your own numbers.

---
**Previous:** [← 6. TypeScript Projects & Checkpoints](06-typescript-projects-and-checkpoints.md) · **Next:** [8. React + TypeScript Curriculum →](08-react-typescript-curriculum.md)
