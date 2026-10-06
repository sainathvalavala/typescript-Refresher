# 11. Complete E-Book Table of Contents

> *Typed Interfaces — From "Why TypeScript?" to Professional TypeScript + React*
>
> The reader's view of the book: Parts → Chapters → Sections. Section numbers (e.g., **16.3**) are the book's numbering, and each section is one lesson folder in the repository (Section 12). Badges show difficulty (🟢 🟡 🟠 🔴) and tier (`Essential` · `Advanced` · `Specialist`).
>
> *This table of contents is generated from the chapter cards in Sections 5, 7, 8, 9 and 10, so it always matches them exactly.*

---

## Front Matter

- **Preface** — Who this book is for, what it promises, and how it was designed
- **How to Read This Book** — Chapter anatomy, callouts (🧠 ⚠️ 🚫 🔗 🌍 🔬 ⏭ 🆕 🕰 🧪), exercise levels L1–L4, the solutions policy
- **Reading Paths** — A. Full journey · B. Fast track to productive · C. TypeScript-first · D. React developer adding TypeScript · E. Returning specialist
- **The Five Threads** — Compile time vs runtime · Illegal states unrepresentable · Single source of truth · Annotate boundaries, infer the rest · Abstraction has a cost
- **Meet TaskFlow** — The running project, and how it evolves across six parts
- **Setting Up Your Workshop** — Node.js, editor, the companion repository, running examples and exercise tests

---

## BOOK ONE — THE TYPESCRIPT LANGUAGE
*"I can think in types."*

### Part I — Why TypeScript?
*Stage 0 — Orientation · 🟢 · Chapters 1–4*

**1 · The Story So Far: JavaScript → TypeScript → React** `🟢` `Essential`  
1.1 A language for small jobs · 1.2 JavaScript escapes the browser page · 1.3 The cost of growth · 1.4 Static analysis arrives · 1.5 The UI crisis and React · 1.6 Why TypeScript + React today · 1.7 The map of this book

**2 · Why TypeScript? The Problems of Large JavaScript** `🟢` `Essential`  
2.1 What JavaScript was designed for · 2.2 Dynamic typing at scale · 2.3 Runtime type errors · 2.4 Silent wrong values · 2.5 Refactoring without a safety net · 2.6 Large teams and invisible contracts · 2.7 API discoverability · 2.8 Maintainability over years · 2.9 Static analysis · 2.10 Why Microsoft created TypeScript · 2.11 A superset of JavaScript

**3 · How TypeScript Works: Compile Time, Runtime & Type Erasure** `🟢` `Essential`  
3.1 The compiler pipeline · 3.2 Type erasure · 3.3 Compile time vs runtime · 3.4 What TypeScript can catch · 3.5 What TypeScript cannot catch · 3.6 The language service · 3.7 Why JavaScript is still fundamental · 3.8 The layered safety model (preview)

**4 · JavaScript Readiness Checkpoint** `🟢` `Essential`  
4.1 Variables & primitive values · 4.2 Objects & arrays · 4.3 Functions, scope & closures · 4.4 Destructuring, rest & spread · 4.5 Classes & prototypes · 4.6 Modules (ES Modules) · 4.7 Promises & async/await · 4.8 Error handling · 4.9 DOM basics & browser APIs · 4.10 Your readiness verdict

✅ *Checkpoint — Part I*

### Part II — TypeScript Foundations
*Stage 1 — Language Foundations · 🟢 · Chapters 5–9*

**5 · Your First TypeScript Program** `🟢` `Essential`  
5.1 Installing TypeScript · 5.2 Running tsc · 5.3 A starter tsconfig · 5.4 Running TypeScript directly · 5.5 The editor as your teacher · 5.6 Reading TypeScript error messages · 5.7 The TypeScript Playground · 5.8 Project: Typed Calculator (kickoff)

**6 · Types, Annotations & Inference** `🟢` `Essential`  
6.1 What a type is · 6.2 Primitive types · 6.3 Type annotations · 6.4 Type inference · 6.5 const vs let inference · 6.6 When to annotate · 6.7 Type errors as conversations

**7 · Arrays, Tuples & Objects** `🟢` `Essential`  
7.1 Array types · 7.2 Readonly arrays · 7.3 Tuples · 7.4 Object types · 7.5 Optional properties · 7.6 Readonly properties · 7.7 Indexing safely

**8 · Naming Types: Aliases, Interfaces & Literal Types** `🟢` `Essential`  
8.1 Type aliases · 8.2 Interfaces · 8.3 Literal types · 8.4 Literal unions as vocabulary · 8.5 Enums, and why many teams avoid them · 8.6 as const, first look · 8.7 Naming conventions

**9 · The Edge Types: any, unknown, never, void, null & undefined** `🟢` `Essential`  
9.1 any: the escape hatch · 9.2 unknown: the safe "anything" · 9.3 null and undefined · 9.4 The non-null assertion (!) · 9.5 void · 9.6 never · 9.7 object, {} and Object

✅ *Checkpoint — Part II* · 🛠 *Projects:* P01 Typed Calculator

### Part III — Thinking in Types
*Stage 2 — Thinking in Types · 🟢→🟡 · Chapters 10–15*

**10 · Understanding the Type System** `🟡` `Essential`  
10.1 Types as sets of values · 10.2 Assignability · 10.3 Structural typing · 10.4 Excess property checks · 10.5 Widening and literal inference · 10.6 Two worlds: type space and value space · 10.7 Type assertions (as) · 10.8 unknown and never revisited

**11 · Typing Functions** `🟡` `Essential`  
11.1 Parameter and return types · 11.2 Optional and default parameters · 11.3 Rest parameters and spread arguments · 11.4 Function type expressions · 11.5 Callbacks · 11.6 Higher-order functions · 11.7 Call signatures and construct signatures · 11.8 Overloads · 11.9 Typing this · 11.10 Async functions · 11.11 Generic functions (preview)

**12 · Objects, Interfaces & Composition** `🟡` `Essential`  
12.1 Object types in depth · 12.2 Index signatures and Record · 12.3 Interfaces vs type aliases · 12.4 Extending interfaces · 12.5 Composition with intersections · 12.6 Declaration merging · 12.7 Recursive types · 12.8 Modeling a domain

**13 · Unions & Intersections: The Algebra of Types** `🟡` `Essential`  
13.1 Union types · 13.2 Literal unions · 13.3 Intersection types · 13.4 The set view · 13.5 Discriminated unions · 13.6 Making illegal states unrepresentable · 13.7 Designing union types

**14 · Narrowing & Control-Flow Analysis** `🟡` `Essential`  
14.1 typeof narrowing · 14.2 Truthiness narrowing · 14.3 Equality narrowing · 14.4 The in operator · 14.5 instanceof · 14.6 Narrowing discriminated unions · 14.7 Control-flow analysis · 14.8 User-defined type guards · 14.9 Assertion functions · 14.10 Exhaustiveness checking with never · 14.11 Narrowing unknown errors

**15 · Classes in TypeScript** `🟡` `Essential`  
15.1 Classes and constructors · 15.2 Access modifiers · 15.3 readonly and parameter properties · 15.4 Getters and setters · 15.5 Static members · 15.6 implements · 15.7 Inheritance · 15.8 Abstract classes · 15.9 Polymorphism · 15.10 Custom error classes · 15.11 Classes vs functions and types · 15.12 Decorators (orientation)

✅ *Checkpoint — Part III* · 🛠 *Projects:* P02 TaskFlow Core, P03 Utility Toolkit

### Part IV — Generics & Type Transformations ⭐
*Stage 3 — Abstraction with Types · 🟡→🟠 · Chapters 16–24*

**16 · Why Generics?** `🟡` `Essential`  
16.1 The duplication problem · 16.2 You've used generics already · 16.3 Type parameters · 16.4 Inference at the call site · 16.5 The golden rule · 16.6 Generics vs unions vs unknown

**17 · Generic Functions, Constraints & keyof** `🟡` `Essential`  
17.1 Multiple type parameters · 17.2 Generic constraints · 17.3 keyof · 17.4 keyof with generics · 17.5 Indexed access in generics · 17.6 Constraints that reference other parameters · 17.7 When constraints make APIs worse

**18 · Generic Types, Interfaces, Classes & Defaults** `🟡` `Essential`  
18.1 Generic type aliases · 18.2 Generic interfaces · 18.3 Generic classes · 18.4 Generic defaults · 18.5 Result<T, E> · 18.6 Generic inference in depth · 18.7 Variance intuition (preview)

**19 · Designing Reusable Generic APIs** `🟠` `Essential`  
19.1 Inference-first design · 19.2 Practical generic patterns · 19.3 Typed key-value registries · 19.4 Testing generic code · 19.5 Over-generic smells · 19.6 Documenting generic APIs

**20 · Deriving Types from Values: keyof, typeof, Indexed Access, as const & satisfies** `🟡` `Essential`  
20.1 typeof in type position · 20.2 keyof typeof · 20.3 Indexed access types · 20.4 as const in depth · 20.5 satisfies · 20.6 Lookup tables instead of overloads · 20.7 Deriving types from config

**21 · Utility Types: TypeScript's Standard Library** `🟡` `Essential`  
21.1 Partial and Required · 21.2 Readonly · 21.3 Pick and Omit · 21.4 Record · 21.5 Exclude, Extract and NonNullable · 21.6 ReturnType and Parameters · 21.7 ConstructorParameters and InstanceType · 21.8 Awaited · 21.9 Combining utilities · 21.10 Utility types in the wild

**22 · Mapped Types: Transforming Object Types** `🟠` `Essential`  
22.1 The mapping syntax · 22.2 Rebuilding Partial, Required, Readonly, Pick and Record · 22.3 Modifiers · 22.4 Key remapping with as · 22.5 Homomorphic mapped types · 22.6 Mapping over unions of keys

**23 · Conditional Types & infer** `🟠` `Advanced`  
23.1 Conditional type syntax · 23.2 Distributive conditional types · 23.3 Turning distribution off · 23.4 infer · 23.5 Rebuilding NonNullable, ReturnType, Parameters and Awaited · 23.6 Conditional types in function signatures

**24 · Template Literal Types & Custom Utility Types** `🟠` `Advanced`  
24.1 Template literal types · 24.2 Intrinsic string types · 24.3 Key remapping with template literals · 24.4 Building custom utility types · 24.5 Testing custom types · 24.6 The complexity budget

✅ *Checkpoint — Part IV* · 🛠 *Projects:* P04 Generic Utility Library, P05 Type-Safe Event Emitter

### Part V — The TypeScript Toolchain & Ecosystem
*Stage 4 — TypeScript in Real Projects · 🟡 · Chapters 25–29*

**25 · Modules: ESM, CommonJS & Type-Only Imports** `🟡` `Essential`  
25.1 Why two module systems exist · 25.2 How TypeScript sees a module · 25.3 Type-only imports and exports · 25.4 verbatimModuleSyntax · 25.5 Module resolution · 25.6 ESM/CJS interoperability · 25.7 Barrel files

**26 · tsconfig Demystified** `🟡` `Essential`  
26.1 Which files: include, exclude, files, rootDir · 26.2 How strict: the strict family · 26.3 What comes out: target, outDir, sourceMap, declaration · 26.4 What environment: lib, types, module, moduleResolution · 26.5 Transpiler-friendly flags · 26.6 Path aliases · 26.7 Extending configs · 26.8 Project references (introduction) · 26.9 Recommended configs

**27 · The Everyday Toolchain: Run, Lint, Format & Test** `🟡` `Essential`  
27.1 Running TS in development · 27.2 ESLint with typescript-eslint · 27.3 Formatting with Prettier · 27.4 Vitest in depth · 27.5 Type tests in depth · 27.6 Editor integration and scripts · 27.7 Git hooks (orientation)

**28 · Declaration Files & the Type Ecosystem** `🟡` `Essential`  
28.1 What declaration files are · 28.2 @types and DefinitelyTyped · 28.3 declare and ambient declarations · 28.4 Typing an untyped library · 28.5 Global declarations · 28.6 Module augmentation · 28.7 Declaration merging, revisited · 28.8 Generating declarations

**29 · From JavaScript to TypeScript: Interop & Migration** `🟡` `Advanced`  
29.1 allowJs and checkJs · 29.2 JSDoc types · 29.3 Mixed JS/TS projects · 29.4 A gradual migration strategy · 29.5 Taming legacy code · 29.6 Strictness migration · 29.7 Reducing any

✅ *Checkpoint — Part V* · 🛠 *Projects:* P06 Legacy JS → TS Migration

### Part VI — TypeScript on the Server & at the Boundaries
*Stage 4 — TypeScript in Real Projects · 🟡→🟠 · Chapters 30–33*

**30 · TypeScript on Node.js** `🟡` `Essential`  
30.1 Setting up Node + TypeScript · 30.2 Node's type definitions · 30.3 Environment variables · 30.4 The file system · 30.5 Async patterns · 30.6 Configuration modules · 30.7 Scripts and CLIs

**31 · Building a Typed HTTP API** `🟡` `Essential`  
31.1 HTTP from first principles · 31.2 Choosing a framework · 31.3 API models and DTOs · 31.4 Typing requests and responses · 31.5 Service layer · 31.6 Repository pattern · 31.7 Database types · 31.8 API contracts

**32 · Runtime Safety: Trust Nothing at the Boundary** `🟠` `Essential`  
32.1 What TypeScript believes vs what runtime receives · 32.2 Mapping your application's boundaries · 32.3 unknown as the boundary type · 32.4 Hand-written validation · 32.5 Schema validation · 32.6 Types inferred from schemas · 32.7 API validation · 32.8 Environment validation · 32.9 User input and external files · 32.10 Where to validate (and where not to)

**33 · Error Handling Across Layers** `🟠` `Essential`  
33.1 Expected vs unexpected failures · 33.2 Exceptions in TypeScript · 33.3 Custom error hierarchies · 33.4 Result types · 33.5 Translating errors between layers · 33.6 Async error handling · 33.7 Logging errors usefully · 33.8 Designing error responses

✅ *Checkpoint — Part VI* · 🛠 *Projects:* P07 TaskFlow API, P08 Typed API Client

---

## BOOK TWO — BUILDING INTERFACES WITH REACT + TYPESCRIPT
*"I can ship a real app."*

### Part VII — From Language to Interfaces
*Stage 5 — From Language to Interfaces · 🟡 · Chapters 34–36*

**34 · The Bridge: TypeScript Concepts You'll Use in React** `🟢` `Essential`  
34.1 From language to interfaces · 34.2 Functions become components · 34.3 Objects and destructuring become props · 34.4 Modules become component files · 34.5 Interfaces and aliases become contracts · 34.6 Unions and narrowing become UI states · 34.7 Generics appear in hooks and components · 34.8 Utility types shape props · 34.9 Inference does the heavy lifting · 34.10 Bridge self-check

**35 · TypeScript in the Browser: Typing the DOM** `🟡` `Essential`  
35.1 lib.dom.d.ts · 35.2 The element hierarchy · 35.3 Selecting elements safely · 35.4 Typed DOM events · 35.5 target vs currentTarget · 35.6 Forms and inputs · 35.7 Browser APIs at the boundary · 35.8 Building Vanilla TaskFlow · 35.9 The pain log

**36 · Why React?** `🟢` `Essential`  
36.1 Traditional DOM manipulation · 36.2 When UIs get complex · 36.3 What UI state is · 36.4 Synchronizing state with the DOM · 36.5 Declarative UI · 36.6 Component-based thinking · 36.7 React's core idea · 36.8 Components, props, state, and rendering · 36.9 Why React became popular · 36.10 Why TypeScript + React

✅ *Checkpoint — Part VII* · 🛠 *Projects:* P09 Vanilla TaskFlow

### Part VIII — Thinking in React
*Stage 6 — Thinking in React · 🟢→🟡 · Chapters 37–48*

**37 · The React Mental Model** `🟢` `Essential`  
37.1 Setting up React with Vite and TypeScript · 37.2 UI as a function of state · 37.3 Components return descriptions · 37.4 Trigger, render, commit · 37.5 The render tree · 37.6 Purity · 37.7 What React is and isn't · 37.8 React DevTools

**38 · JSX: Describing UI with JavaScript** `🟢` `Essential`  
38.1 JSX is JavaScript · 38.2 Expressions in braces · 38.3 Attributes become props · 38.4 Fragments · 38.5 What renders and what doesn't · 38.6 JSX and safety · 38.7 TSX specifics

**39 · Components, Props & Composition** `🟢` `Essential`  
39.1 Defining components · 39.2 Props as parameters · 39.3 Children · 39.4 Composition over configuration · 39.5 Passing callbacks · 39.6 One-way data flow · 39.7 Splitting a UI into components · 39.8 Styling components (orientation)

**40 · Conditional Rendering, Lists & Keys** `🟢` `Essential`  
40.1 Conditional rendering patterns · 40.2 The && pitfall · 40.3 Rendering lists · 40.4 Keys and identity · 40.5 Key mistakes · 40.6 Keys as a reset tool · 40.7 Empty states

**41 · Interactivity: Events & State** `🟢` `Essential`  
41.1 Responding to events · 41.2 Why local variables don't work · 41.3 useState · 41.4 State as a snapshot · 41.5 Batching and updater functions · 41.6 Updating objects in state · 41.7 Updating arrays in state · 41.8 Event propagation

**42 · Thinking in State: Structure, Derivation & Lifting** `🟡` `Essential`  
42.1 Minimal state · 42.2 Derived values · 42.3 Principles of state structure · 42.4 Controlled and uncontrolled inputs · 42.5 Lifting state up · 42.6 Sharing state between siblings · 42.7 State colocation · 42.8 Preserving and resetting state · 42.9 Thinking in React, end to end

**43 · Hooks: The Mental Model** `🟡` `Essential`  
43.1 What a hook is · 43.2 The rules of hooks, and why · 43.3 The question → hook map · 43.4 Hooks compose · 43.5 Hooks and the render cycle · 43.6 Linting the rules · 43.7 The React Compiler, briefly

**44 · useEffect: Synchronizing with the Outside World** `🟡` `Essential`  
44.1 Effects are for synchronization · 44.2 Anatomy of an effect · 44.3 The dependency array · 44.4 Cleanup · 44.5 Strict Mode's double effect · 44.6 Fetching in an effect · 44.7 You might not need an effect · 44.8 Separating events from effects · 44.9 Common effect bugs

**45 · useRef: Remembering Without Re-rendering** `🟡` `Essential`  
45.1 Refs vs state · 45.2 Storing values across renders · 45.3 Referencing DOM elements · 45.4 Managing focus · 45.5 Ref pitfalls · 45.6 Refs as props

**46 · useContext: Sharing Data Through the Tree** `🟡` `Essential`  
46.1 The prop-drilling problem · 46.2 Creating and providing context · 46.3 Consuming context · 46.4 Context with state · 46.5 When to use context · 46.6 Context and re-renders · 46.7 Composition before context

**47 · useMemo, useCallback & memo: Identity and Performance** `🟡` `Essential`  
47.1 Referential identity · 47.2 When re-renders are a problem · 47.3 memo · 47.4 useMemo · 47.5 useCallback · 47.6 The cost of memoization · 47.7 The React Compiler · 47.8 A decision checklist

**48 · Custom Hooks: Reusing Stateful Logic** `🟡` `Essential`  
48.1 Extracting a custom hook · 48.2 Naming and rules · 48.3 Logic, not state · 48.4 Designing a hook's interface · 48.5 Common custom hooks · 48.6 When not to make a hook · 48.7 Testing hooks (preview)

✅ *Checkpoint — Part VIII* · 🛠 *Projects:* P10 Component Gallery, P11 TaskFlow in React

### Part IX — React + TypeScript ⭐
*Stage 7 — React with TypeScript · 🟡 · Chapters 49–57*

**49 · How TypeScript Sees React: JSX, Elements & Component Types** `🟡` `Essential`  
49.1 How JSX is type-checked · 49.2 Where React's types come from · 49.3 ReactNode vs ReactElement vs JSX.Element · 49.4 Typing function components · 49.5 Intrinsic element props · 49.6 Reading React's type definitions · 49.7 🕰 Legacy types you'll meet

**50 · Typing Props & Component APIs** `🟡` `Essential`  
50.1 Props types · 50.2 Optional props and defaults · 50.3 Typing children · 50.4 Callback props · 50.5 Slot props · 50.6 Extending native elements · 50.7 Discriminated props (first look) · 50.8 Designing component APIs

**51 · Typing Events** `🟡` `Essential`  
51.1 Synthetic events · 51.2 Inline handlers and contextual typing · 51.3 Extracted handlers · 51.4 Mouse and pointer events · 51.5 Keyboard events · 51.6 Change events · 51.7 Form and submit events · 51.8 Focus events · 51.9 target vs currentTarget in React · 51.10 Discovering event types

**52 · Typing State: Modeling UI States** `🟡` `Essential`  
52.1 useState inference · 52.2 Explicit state types · 52.3 Nullable state · 52.4 Union state · 52.5 Object and array state · 52.6 Discriminated state · 52.7 Lazy initial state · 52.8 From boolean soup to a state machine

**53 · Typing Refs** `🟡` `Essential`  
53.1 DOM refs · 53.2 Mutable value refs · 53.3 Modern ref typings · 53.4 Refs as props · 53.5 Callback refs · 53.6 🕰 forwardRef in existing code · 53.7 useImperativeHandle · 53.8 Merging refs

**54 · Typed Context** `🟡` `Essential`  
54.1 createContext typing · 54.2 The default value problem · 54.3 The safe context pattern · 54.4 Typed provider components · 54.5 Consumers through hooks · 54.6 Context + reducer · 54.7 Splitting contexts · 54.8 Modern context syntax

**55 · Reducers & State Machines with Discriminated Unions** `🟡` `Essential`  
55.1 When transitions get complex · 55.2 useReducer · 55.3 Actions as discriminated unions · 55.4 Exhaustive reducers · 55.5 Modeling state and actions together · 55.6 Typed dispatch helpers · 55.7 Reducer + context · 55.8 Testing reducers

**56 · Typing Custom Hooks** `🟡` `Essential`  
56.1 Typed parameters · 56.2 Typed return values · 56.3 Inferred vs explicit return types · 56.4 Generic custom hooks · 56.5 Parsers instead of lies · 56.6 Reusable hook APIs · 56.7 Typing hooks that wrap libraries · 56.8 Type tests for hooks

**57 · Generic Components: The Essentials** `🟠` `Essential`  
57.1 Why generic components · 57.2 Declaring a generic component · 57.3 Inference from props · 57.4 Constraining T · 57.5 A generic Select · 57.6 Limits and pitfalls · 57.7 When not to

✅ *Checkpoint — Part IX* · 🛠 *Projects:* P12 React Dashboard

### Part X — Building Real Applications
*Stage 8 — Real Applications · 🟡→🟠 · Chapters 58–65*

**58 · Architecting a React Application** `🟡` `Essential`  
58.1 Why structure matters · 58.2 By type vs by feature · 58.3 Feature modules · 58.4 Layers in a frontend · 58.5 Where types live · 58.6 Dependency rules · 58.7 Shared components · 58.8 Environment configuration · 58.9 A styling strategy · 58.10 Scaffolding TaskFlow Web

**59 · Routing & Navigation** `🟡` `Essential`  
59.1 Why routing · 59.2 Routes, nested routes, and layouts · 59.3 Route params and their types · 59.4 Search params as state · 59.5 Navigation · 59.6 Not-found and error routes · 59.7 Lazy routes · 59.8 Type-safe routing

**60 · Where State Lives: State Management Architecture** `🟡` `Essential`  
60.1 The five kinds of state · 60.2 Server state is not client state · 60.3 Choosing a home · 60.4 Context + reducer at app scale · 60.5 External stores · 60.6 Derived state across features · 60.7 Avoiding global-state sprawl

**61 · Data Fetching & the API Boundary** `🟠` `Essential`  
61.1 What TypeScript believes vs what the server returned · 61.2 DTOs vs domain models on the client · 61.3 Reusing the typed API client · 61.4 Validating responses · 61.5 Transforming API responses · 61.6 Typing API errors · 61.7 Loading, error, empty, and success states · 61.8 A hand-rolled useQuery · 61.9 Request types and mutations

**62 · Server State with TanStack Query** `🟠` `Essential`  
62.1 What a server-state library solves · 62.2 Queries · 62.3 Query keys · 62.4 Mutations · 62.5 Optimistic updates · 62.6 Suspense queries and error boundaries · 62.7 Pagination and infinite queries · 62.8 Devtools and testing

**63 · Typed Forms from Scratch** `🟡` `Essential`  
63.1 Typed form state · 63.2 Form events · 63.3 A typed change handler · 63.4 Submission · 63.5 Client-side validation · 63.6 Touched, dirty, and error display · 63.7 Accessible forms · 63.8 Building useForm<T>

**64 · Validation, Schemas & Form Abstractions** `🟠` `Essential`  
64.1 One schema, two sides · 64.2 Runtime schemas for forms · 64.3 Server validation errors · 64.4 Error typing · 64.5 Form libraries · 64.6 React Actions · 64.7 Reusable form components · 64.8 Type-safe form abstractions

**65 · Authentication & Authorization** `🟠` `Essential`  
65.1 Authentication concepts · 65.2 Where credentials live · 65.3 Auth state as a discriminated union · 65.4 AuthProvider and useAuth · 65.5 Protected routes and redirects · 65.6 Modeling authorization · 65.7 401 and 403 in the API client · 65.8 UI authorization is not security

✅ *Checkpoint — Part X* · 🛠 *Projects:* P13 Typed Forms Kit, P14 TaskFlow Web, P15 Authentication System

### Part XI — Testing
*Stage 8 — Real Applications · 🟡 · Chapters 66–69*

**66 · What TypeScript Catches vs What Tests Catch** `🟡` `Essential`  
66.1 The layered safety model · 66.2 What types prove · 66.3 What only tests prove · 66.4 What only runtime validation proves · 66.5 Choosing test levels · 66.6 A test strategy for TaskFlow Web · 66.7 Don't test what the compiler guarantees

**67 · Unit Testing Logic, Reducers & Hooks** `🟡` `Essential`  
67.1 Testing pure logic · 67.2 Testing reducers · 67.3 Testing custom hooks · 67.4 Hooks that need context · 67.5 Fake timers and async logic · 67.6 Type-safe mocks · 67.7 Test data factories · 67.8 Type tests for app code

**68 · Component Testing with Testing Library** `🟡` `Essential`  
68.1 Testing like a user · 68.2 Rendering with providers · 68.3 User interactions · 68.4 Async UI · 68.5 Testing loading and error states · 68.6 Testing forms · 68.7 Accessibility in tests · 68.8 What not to test

**69 · Integration Testing, API Mocking & E2E** `🟠` `Essential`  
69.1 Integration tests · 69.2 API mocking with MSW · 69.3 Preventing contract drift · 69.4 Error and edge cases · 69.5 Testing routing and auth flows · 69.6 End-to-end tests with Playwright · 69.7 Flaky tests · 69.8 Tests in CI

✅ *Checkpoint — Part XI* · 🛠 *Projects:* P16 TaskFlow Web Test Suite

### Part XII — Production-Ready React
*Stage 9 — Production · 🟡→🟠 · Chapters 70–76*

**70 · Production Builds, Bundles & Code Splitting** `🟡` `Essential`  
70.1 What a production build does · 70.2 Build configuration · 70.3 Source maps in production · 70.4 Analyzing bundles · 70.5 Code splitting · 70.6 Route-based splitting and preloading · 70.7 Bundle considerations · 70.8 Deploying a static SPA

**71 · Error Boundaries & Resilient UIs** `🟡` `Essential`  
71.1 What happens when a component throws · 71.2 Error boundaries · 71.3 Using a boundary library · 71.4 Where to place boundaries · 71.5 What boundaries don't catch · 71.6 Route-level errors · 71.7 Reporting errors · 71.8 Designing fallback UI

**72 · Rendering Performance** `🟠` `Essential`  
72.1 Measuring first · 72.2 Why components re-render · 72.3 Structural fixes · 72.4 Memoization with evidence · 72.5 Transitions · 72.6 Virtualizing long lists · 72.7 Context performance · 72.8 Performance budgets

**73 · Accessibility** `🟡` `Essential`  
73.1 Why accessibility is a requirement · 73.2 Semantic HTML first · 73.3 Keyboard navigation · 73.4 Focus management · 73.5 ARIA when needed · 73.6 Accessible forms and errors · 73.7 Color, motion, and preferences · 73.8 Testing accessibility

**74 · Security for Frontend Developers** `🟠` `Essential`  
74.1 The frontend threat model · 74.2 XSS · 74.3 URL and attribute injection · 74.4 Tokens and sessions · 74.5 Secrets and env vars · 74.6 Dependency and supply-chain risk · 74.7 Content Security Policy · 74.8 Never trust the client

**75 · Observability: Logging, Monitoring & Analytics** `🟡` `Essential`  
75.1 Why observability · 75.2 Structured logging in the browser · 75.3 Error tracking · 75.4 Typed analytics events · 75.5 Performance monitoring · 75.6 Feature flags · 75.7 Privacy and consent

**76 · CI/CD & Long-Term Maintainability** `🟡` `Essential`  
76.1 A CI pipeline for TypeScript + React · 76.2 Speed and caching · 76.3 Preview deployments and required checks · 76.4 Continuous delivery · 76.5 Dependency updates · 76.6 Maintainability practices · 76.7 Documentation that stays current · 76.8 The production checklist

✅ *Checkpoint — Part XII* · 🛠 *Projects:* P17 Complex Dashboard (Production)

> ★ **End of the Essential core:** the job-ready milestone.

---

## BOOK THREE — MASTERY
*"I can lead, design, and scale."*

### Part XIII — Advanced TypeScript
*Stage 10 — Advanced Types & Patterns · 🟠→🔴 · Chapters 77–83*

**77 · Type Compatibility, Variance & Soundness** `🟠` `Advanced`  
77.1 Assignability revisited · 77.2 Covariance · 77.3 Contravariance · 77.4 Bivariance and method shorthand · 77.5 Invariance · 77.6 Variance annotations · 77.7 Where TypeScript is unsound on purpose · 77.8 Variance in API design

**78 · Branded Types & Nominal Typing Patterns** `🟠` `Advanced`  
78.1 When structural identity hurts · 78.2 Branding with intersections · 78.3 Unique-symbol brands · 78.4 Smart constructors · 78.5 Units and value objects · 78.6 Opaque types across modules · 78.7 Brands at the boundary · 78.8 When brands are overkill

**79 · Advanced Conditional Types & infer** `🟠` `Advanced`  
79.1 Conditional types through the set model · 79.2 Controlling distribution · 79.3 infer in every position · 79.4 infer with constraints · 79.5 Recursive conditional types · 79.6 Generics in implementations · 79.7 Reading library-grade types · 79.8 Friendlier type errors

**80 · Advanced Mapped & Recursive Types** `🟠` `Advanced`  
80.1 Key remapping in depth · 80.2 Mapping over unions of objects · 80.3 Recursive types revisited · 80.4 Recursive utility types · 80.5 Path types · 80.6 Recursion limits and performance · 80.7 When deep types are a smell

**81 · Template Literal Types in Depth** `🟠` `Advanced`  
81.1 Review and composition · 81.2 Parsing strings with infer · 81.3 Typed routes · 81.4 Typed event and message names · 81.5 CSS and design-token strings · 81.6 Limits · 81.7 When to stop

**82 · Advanced Generic Patterns & API Type Design** `🟠` `Advanced`  
82.1 const type parameters · 82.2 NoInfer and inference control · 82.3 Builder patterns · 82.4 Higher-order generics · 82.5 Typed factories and dependency injection · 82.6 Overloads vs conditional return types · 82.7 Designing for inference · 82.8 Case study: a typed filter/query API

**83 · Type-Level Programming & Type-Safe DSLs** `🔴` `Specialist`  
83.1 Types as a programming language · 83.2 Tuple manipulation · 83.3 Type-level arithmetic · 83.4 How schema libraries infer types · 83.5 How end-to-end typed APIs work · 83.6 How typed query builders work · 83.7 Designing a small type-safe DSL · 83.8 The cost of cleverness

✅ *Checkpoint — Part XIII* · 🛠 *Projects:* P18 Runtime Validation Library

### Part XIV — Advanced React + TypeScript Patterns
*Stage 10 — Advanced Types & Patterns · 🟠 · Chapters 84–89*

**84 · Advanced Generic Components & Hooks** `🟠` `Advanced`  
84.1 Generic components, revisited · 84.2 Typed column definitions · 84.3 Generic hooks for tables · 84.4 Generic components with refs · 84.5 Generics and wrappers · 84.6 Controlled and uncontrolled generic components · 84.7 ✅ Useful / 🚫 Unnecessary

**85 · Discriminated & Conditional Props** `🟠` `Advanced`  
85.1 Props that depend on each other · 85.2 Discriminated props · 85.3 Mutually exclusive props · 85.4 XOR helper types · 85.5 Controlled vs uncontrolled props · 85.6 Narrowing destructured props · 85.7 ✅ Useful / 🚫 Unnecessary

**86 · Polymorphic Components & the asChild Pattern** `🟠` `Advanced`  
86.1 The problem · 86.2 The `as` prop · 86.3 Typing polymorphic props · 86.4 Refs in polymorphic components · 86.5 The asChild / Slot pattern · 86.6 Costs · 86.7 ✅ Useful / 🚫 Unnecessary

**87 · Compound Components** `🟠` `Advanced`  
87.1 The configuration-object problem · 87.2 Compound components · 87.3 Shared state via typed context · 87.4 Typing the namespace · 87.5 Controlled compound components · 87.6 Accessibility · 87.7 ✅ Useful / 🚫 Unnecessary

**88 · Render Props, Headless Components & Inversion of Control** `🟠` `Advanced`  
88.1 Inversion of control · 88.2 Typed render props · 88.3 Hooks replaced most render props · 88.4 Headless components · 88.5 Prop getters · 88.6 Slots, revisited · 88.7 ✅ Useful / 🚫 Unnecessary

**89 · Reusable Component API Design: Choosing the Right Pattern** `🟠` `Advanced`  
89.1 The complexity ladder · 89.2 A decision guide · 89.3 Consistency across a component set · 89.4 Refs, native props, and accessibility · 89.5 Typing variants · 89.6 Documenting component APIs · 89.7 De-abstraction · 89.8 Principles of type-safe component libraries

✅ *Checkpoint — Part XIV* · 🛠 *Projects:* P19 Generic Data Table, P20 Component Library

### Part XV — Professional TypeScript & React Engineering
*Stage 11 — Professional Engineering · 🟠→🔴 · Chapters 90–97*

**90 · Architecture at Scale: Boundaries, Layers & Domain Modeling** `🟠` `Advanced`  
90.1 What changes at scale · 90.2 Domain modeling with types · 90.3 Bounded contexts in a frontend · 90.4 Ports and adapters for UI apps · 90.5 State architecture at scale · 90.6 Shared types vs coupling · 90.7 Enforcing architecture · 90.8 Architecture decision records

**91 · Designing Reusable Types & Public APIs** `🟠` `Advanced`  
91.1 Types as API surface · 91.2 Inference-first public APIs · 91.3 Accept wide, return narrow · 91.4 Managing complex generics · 91.5 Avoiding over-engineering · 91.6 Evolving types safely · 91.7 Documenting types

**92 · Library Authoring, Publishing & Semantic Versioning** `🔴` `Advanced`  
92.1 Anatomy of a TypeScript package · 92.2 ESM-first and dual publishing · 92.3 Declaration output · 92.4 Build tools for libraries · 92.5 Validating packages · 92.6 Semantic versioning for types · 92.7 API reports and compatibility · 92.8 Release automation · 92.9 Maintaining declarations

**93 · Design Systems & Component Libraries** `🟠` `Advanced`  
93.1 What a design system is · 93.2 Design tokens as typed data · 93.3 Primitives vs composites · 93.4 Building on accessible headless primitives · 93.5 Theming with types · 93.6 Documentation · 93.7 Testing a component library · 93.8 Versioning, migration, and adoption

**94 · Monorepos & Package Boundaries** `🟠` `Advanced`  
94.1 Why monorepos · 94.2 Workspaces · 94.3 Internal packages · 94.4 Project references at scale · 94.5 Shared configs · 94.6 Shared contract packages · 94.7 Task orchestration and caching · 94.8 Enforcing package boundaries

**95 · TypeScript at Scale: Compiler & Type-Checking Performance** `🔴` `Specialist`  
95.1 Where the checker spends time · 95.2 Measuring · 95.3 Expensive types · 95.4 Cheaper patterns · 95.5 Project structure for speed · 95.6 Editor performance · 95.7 The native compiler · 95.8 Type performance budgets

**96 · React Frameworks, Server Rendering & Server Components** `🟠` `Advanced`  
96.1 Rendering strategies · 96.2 Why frameworks · 96.3 Server Components · 96.4 Client components and the boundary · 96.5 The serialization boundary · 96.6 Server Functions and Actions · 96.7 Data fetching on the server · 96.8 Choosing SPA or framework

**97 · Working on a Team: Code Review, Documentation & Conventions** `🟡` `Essential`  
97.1 Reviewing TypeScript + React code · 97.2 Type smells in review · 97.3 Reviewing for simplicity · 97.4 Team conventions · 97.5 Documentation · 97.6 Trade-offs as team decisions · 97.7 Maintaining large codebases · 97.8 Growing as an engineer

✅ *Checkpoint — Part XV* · 🛠 *Projects:* P20 Component Library

### Part XVI — Capstone
*Stage 12 — Capstone · 🟠→🔴 · Chapters 98–99*

**98 · Capstone Planning: From Requirements to Architecture** `🟠` `Essential`  
98.1 Choosing your track · 98.2 From brief to user stories · 98.3 Modeling the domain in types · 98.4 Designing the API contract · 98.5 Architecture and package boundaries · 98.6 Planning state, data, and errors · 98.7 Quality strategy · 98.8 Milestones and scope control

**99 · Building, Shipping & Reviewing Your Capstone** `🔴` `Essential`  
99.1 The walking skeleton · 99.2 Building feature slices end to end · 99.3 Hardening · 99.4 Performance and accessibility passes · 99.5 Observability and operations · 99.6 Documentation and the architecture review · 99.7 Self-review against the rubric · 99.8 Presenting your work · 99.9 What's next

✅ *Checkpoint — Part XVI* · 🛠 *Projects:* C1 Capstone: Teamboard, C2 Capstone: Ledgerly, C3 Capstone: Library track

---

## Back Matter

- **Afterword — The Journey Continues:** staying current, contributing to open source, teaching what you know
- **Appendix A — JavaScript Refresher Map:** each Chapter 4 topic with curated external resources
- **Appendix B — tsconfig Field Guide:** app, Node service, and library configurations, every line explained
- **Appendix C — Reading TypeScript Errors:** the 40 most common error messages, decoded, with fixes
- **Appendix D — React + TypeScript Type Reference:** `ReactNode`, `ComponentProps`, event types, ref types, context and reducer patterns on one page
- **Appendix E — Utility & Custom Type Catalog:** every built-in utility type and the book's custom utilities, with type tests
- **Appendix F — Patterns Decision Guides:** choosing state homes, effect vs handler, generic vs union, the component complexity ladder
- **Appendix G — Production & Code-Review Checklists:** production readiness, security, accessibility, and the TypeScript + React review checklist
- **Appendix H — Tooling Alternatives:** Biome, Jest, Cypress, Fastify, Hono, Prisma, Valibot, TanStack Router, Redux Toolkit, and when to choose them
- **Glossary** — every term defined at first use, collected
- **Index of Mental Models** — every 🧠 box, in one place
- **Solutions** — published separately (see the solutions policy)

---
**Previous:** [← 10. Capstone Projects](10-capstone-projects.md) · **Next:** [12. Complete Lessons Folder Structure →](12-folder-structure.md)
