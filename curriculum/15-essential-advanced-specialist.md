# 15. Essential vs Advanced vs Specialist

> **Essential:** every TypeScript + React developer should know it. **Advanced:** important for experienced developers and larger applications. **Specialist:** for library authors, framework developers, type-system enthusiasts, or highly advanced engineers.
>
> **The rule this book follows:** nothing Specialist is a prerequisite for anything Essential. A reader who masters only the Essential tier is a productive professional.

---

## 15.1 Chapter-level summary

| Tier | Chapters | Where |
|---|---|---|
| **Essential** | 76 | Parts I–XII (except Ch 23, 24, 29), plus Ch 97, 98, 99 |
| **Advanced** | 21 | Ch 23, 24, 29; Parts XIII–XIV (except Ch 83); Ch 90–94, 96 |
| **Specialist** | 2 | Ch 83 (type-level programming & DSLs), Ch 95 (compiler performance) |

Chapter tiers describe the *chapter as a whole*. Inside Essential and Advanced chapters, individual Specialist sections are fenced with ⏭ *Safe to skip* (e.g., decorators in Ch 15, variance annotations in Ch 77). The topic-level classification below is the precise version.

## 15.2 Topic-level classification

### TypeScript language

| Essential | Advanced | Specialist |
|---|---|---|
| Annotations vs inference; primitives; arrays, tuples, objects; optional/readonly | Mapped types with key remapping (`as`) | Variance annotations (`in`/`out`) |
| Type aliases, interfaces, literal types; literal unions over enums | Conditional types, `infer`, distributivity | Tail-recursive conditional types |
| `any` vs `unknown`; `never`, `void`, `null`, `undefined`; strict null checks | Template literal types and intrinsic string types | Type-level string parsing |
| Types as sets; assignability; structural typing; excess property checks | Custom utility types (`PartialBy`, `ValueOf`, `DeepPartial`) | Type-level arithmetic and tuple manipulation |
| Function typing: optional/default/rest, callbacks, function types, async | Overloads beyond simple cases; `this` parameters | Type-safe DSL design |
| Unions, intersections, discriminated unions | Variance: covariance, contravariance, bivariance | Building inference engines (schema-to-type) |
| Every narrowing form; type predicates; assertion functions; exhaustiveness | Branded/opaque types and smart constructors | Friendly custom type errors for library users |
| Classes, modifiers, `implements`, custom errors; when *not* to use classes | Recursive and path types (`Paths<T>`) | Decorators (framework-specific) |
| Generics: functions, types, constraints, `keyof`, `T[K]`, defaults | `const` type parameters, `NoInfer`, builder patterns | |
| `typeof`, indexed access, `as const`, `satisfies` | Declaration merging beyond augmentation | |
| All built-in utility types; basic mapped types | Deliberate unsoundness in TypeScript | |

### TypeScript tooling and ecosystem

| Essential | Advanced | Specialist |
|---|---|---|
| Running TS (`tsc`, `tsx`, Node type stripping) | Project references and `composite` builds | Compiler traces and type-check performance tuning |
| The `strict` family, `noUncheckedIndexedAccess` | JS → TS migration, `checkJs`, JSDoc types | Supporting multiple TypeScript versions (`typesVersions`) |
| ESM vs CJS; `import type`; `verbatimModuleSyntax`; `bundler` vs `nodenext` | Module augmentation and global declarations | API reports and extractor tooling |
| The key `tsconfig` groups; path aliases | Library `exports` maps; dual publishing; declaration output | |
| ESLint (type-aware), Prettier, Vitest, type tests | Changesets, semver for types, package validation | |
| `@types`, reading `.d.ts`, typing an untyped library minimally | | |

### Runtime safety and the server

| Essential | Advanced | Specialist |
|---|---|---|
| Compile time vs runtime; type erasure | Validating responses from internal services | Writing a schema library (P18) |
| `unknown` at boundaries; parse, don't validate | Branded outputs from schemas | Standard Schema interoperability |
| Schema validation with inferred types | OpenAPI generation from schemas | |
| Env validation; user-input and file validation | End-to-end typed RPC layers | |
| Node + TypeScript basics; layered APIs; DTOs vs domain types | Ports-and-adapters architecture | |
| Error modeling: expected vs unexpected; `Result`; error contracts | | |

### React

| Essential | Advanced | Specialist |
|---|---|---|
| UI = f(state); render vs commit; purity; JSX | Transitions (`useTransition`, `useDeferredValue`) | React internals (fiber, scheduler) |
| Components, props, children, composition | Server Components and Server Functions | Custom renderers |
| Conditional rendering; lists; keys as identity | Framework rendering strategies (SSR/SSG/streaming) | |
| State as a snapshot; immutable updates; minimal and derived state; lifting state | `useImperativeHandle`; ref merging | |
| The hooks mental model; `useEffect` as synchronization; cleanup | `useEffectEvent` | |
| `useRef`, `useContext`, `useReducer`, custom hooks | | |
| `memo`/`useMemo`/`useCallback` trade-offs; the React Compiler's role | | |

### React + TypeScript

| Essential | Advanced | Specialist |
|---|---|---|
| `ReactNode` vs `ReactElement`; typing function components | Advanced generic components (typed column definitions) | Fully generic polymorphic primitives for public libraries |
| Props design; `ComponentProps<"button">`; extending native props | Discriminated, exclusive, and XOR props | |
| Event types and handler types | Polymorphic components (`as`) and `asChild` | |
| State typing: inference, explicit `T`, nullable, union, discriminated state | Compound components with typed context | |
| DOM and value refs; ref as a prop; callback refs | Render props, headless components, prop getters | |
| Safe typed context (no fake defaults) | Typed theming via module augmentation | |
| Reducers with discriminated actions and exhaustiveness | | |
| Typed custom hooks; generic hooks with parsers | | |
| Generic components: the essentials (`List<T>`, `Select<T>`) | | |

### Applications, testing, and production

| Essential | Advanced | Specialist |
|---|---|---|
| Feature-based structure; layers; dependency rules; typed env config | Typed routers and route type generation | |
| Routing with validated params and search params | External stores at scale (slices, selectors) | |
| The five kinds of state; server state vs client state | Optimistic updates with rollback | |
| API boundary: validation, mappers, `ApiError` unions, every UI state | Infinite queries; real-time cache updates | |
| TanStack Query basics: queries, keys, mutations, invalidation | Form libraries' advanced features (field arrays, async validation) | |
| Typed forms; shared schemas; server error mapping; React Actions basics | OAuth flows | |
| Auth state as a union; protected routes; typed permissions; server enforcement | Visual regression testing; contract tests | |
| Types vs tests; unit, hook, component, integration tests; MSW; typed mocks; E2E basics | Performance budgets in CI; web workers | |
| Production builds; code splitting; error boundaries; profiling | CSP rollout strategies | |
| Accessibility fundamentals; frontend security; error tracking; CI/CD | Feature-flag platforms; real-user monitoring | |

### Architecture and professional practice

| Essential | Advanced | Specialist |
|---|---|---|
| Code review for TS + React; type smells | Domain modeling at scale; bounded contexts | Compiler performance engineering |
| Avoiding unnecessary abstraction | Designing public types and API evolution | Framework or type-level tooling design |
| Team conventions as lint rules; documentation (README, ADRs) | Library authoring, publishing, semver | |
| Maintaining large codebases: strictness ratchets, codemods | Design systems and component libraries | |
| | Monorepos, shared contract packages, package boundaries | |

## 15.3 How the book keeps Specialist knowledge from feeling mandatory

1. **Tier badges on every chapter**, explained in the front matter, plus ⏭ fences on Specialist sections inside other chapters.
2. **Book Three framing:** "Everything here is optional for being productive."
3. **Reading path B** (fast track) is defined as "the Essential tier", and the book explicitly says that finishing it means you're job-ready.
4. **Checkpoints mark optional questions** for Advanced chapters (e.g., the Part IV and Part V fast-track notes).
5. **No Essential chapter depends on a Specialist one.** This is checked as part of the curriculum review (Section 16): every forward reference from Essential material points to an Essential chapter or is marked "optional".
6. **"When not to" sections** in every Advanced chapter normalize *not* using the feature.

## 15.4 A quick self-placement guide

| If you can… | You are… | Focus next on… |
|---|---|---|
| Ship Book Two's projects alone, with tests | Productive (Essential) | Ch 97, then Part XIV or XIII as your work demands |
| Design reusable components and type-safe APIs for teammates | Experienced (Advanced) | Part XV, capstone C1 |
| Read and write library-grade types, and publish packages | Specialist | Ch 83, 95, capstone C3 |

---
**Previous:** [← 14. Difficulty Curve](14-difficulty-curve.md) · **Next:** [16. Final Curriculum Review →](16-final-review.md)
