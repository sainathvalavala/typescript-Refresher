# 10. Capstone Projects

> The complete project ladder, Part XVI (Ch 98–99), and three capstone tracks. A capstone is not "one more project". It is the reader doing, unassisted, everything the book taught: from vague requirements to a production-quality, documented, defended system.

---

## 10.1 The project ladder

Projects appear in **every part**. Each one reuses earlier work and stretches one level further.

| ID | Project | Part | Level | Difficulty | Key concepts | Reused by |
|---|---|---|---|---|---|---|
| P01 | Typed Calculator | II | Beginner | 🟢 | Basic types, literal unions, input boundary | — |
| P02 | TaskFlow Core | III | Beginner | 🟢 | Domain modeling, discriminated unions, narrowing | P07, P09, P11 |
| P03 | Utility Toolkit | III | Beginner | 🟢 | Function typing, overloads, async (deliberately non-generic) | P04 |
| P10 | Component Gallery | VIII | Beginner | 🟢 | Components, props, state, composition | Ch 50, P20 |
| P04 | Generic Utility Library | IV | Intermediate | 🟡 | Generics, constraints, type tests | Everything after |
| P06 | Legacy JS → TS Migration | V | Intermediate | 🟡 | `allowJs`, `checkJs`, JSDoc, strictness ratchet | — |
| P07 | TaskFlow API (Node.js) | VI | Intermediate | 🟡 | Layers, DTOs, schemas, error contracts | P08, P14, P15, C1 |
| P08 | Typed API Client | VI | Intermediate | 🟡 | Validated responses, `Result`, error unions | P14 |
| P09 | Vanilla TaskFlow | VII | Intermediate | 🟡 | DOM types, the pain of manual sync | P11 (contrast) |
| P11 | TaskFlow in React | VIII | Intermediate | 🟡 | All React fundamentals | P14 |
| P12 | React Dashboard | IX | Intermediate | 🟡 | Typed props, state, context, reducers, generics | P17 |
| P13 | Typed Forms Kit | X | Intermediate | 🟡 | Typed forms, schemas, server errors | P14, C1, C2 |
| P14 | TaskFlow Web (React + API) | X | Intermediate → Advanced | 🟡→🟠 | Architecture, routing, server state, forms | P15, P16, C1 |
| P16 | TaskFlow Web Test Suite | XI | Intermediate | 🟡 | Unit, component, integration, E2E | C1, C2 |
| P05 | Type-Safe Event Emitter | IV | Advanced | 🟠 | Type-level key → value mapping, template literals | P17 (analytics) |
| P15 | Authentication System | X | Advanced | 🟠 | Auth flows, typed permissions, server enforcement | C1 |
| P17 | Complex Dashboard (Production) | XII | Advanced | 🟠 | Performance, resilience, a11y, security, observability | C2 |
| P18 | Runtime Validation Library | XIII | Advanced | 🟠→🔴 | Type inference from runtime schemas | C3 |
| P19 | Generic Data Table | XIV | Advanced | 🟠 | Generic components, headless core | P20, C1, C2 |
| P20 | Component Library | XIV–XV | Advanced | 🟠 | API design, packaging, semver, docs | C1, C3 |
| **C1** | **Teamboard** (full-stack) | XVI | Professional | 🔴 | Everything | — |
| **C2** | **Ledgerly** (frontend-focused) | XVI | Professional | 🟠→🔴 | Everything except the backend chapters | — |
| **C3** | **Library track** | XVI | Professional / Specialist | 🔴 | Book Three in depth | — |

> The project levels follow the brief's categories. **Beginner:** calculator, todo, utilities, basic components. **Intermediate:** generic library, dashboard, API client, forms, Node API, React + API app. **Advanced:** validation system, event emitter, data table, component library, auth, complex dashboard. **Professional:** the capstones.

---

### Part XVI — Capstone
> **Folder:** `16-capstone/` · **Roadmap:** Stage 12 — Capstone · **Difficulty:** 🟠→🔴

**Purpose of the part.** Two chapters guide the capstone from requirements to a reviewed, shipped system. The book's voice changes from teacher to senior colleague: it asks questions, gives checklists, and reviews decisions, but no longer gives instructions step by step.

#### Chapter 98 — Capstone Planning: From Requirements to Architecture
`🟠 Advanced` · `Essential` · 📁 `98-capstone-planning/`

**Opens with:** a one-paragraph product brief, deliberately vague, from a fictional product manager.
**Mental model:** *Design from the inside out: domain types first, then contracts, then architecture, then UI. Types are the cheapest place to discover a bad design.*

1. **Choosing your track** — C1, C2, or C3, based on your goals and reading path.
2. **From brief to user stories** — acceptance criteria, scope, non-goals.
3. **Modeling the domain in types** — entities, states, transitions, branded IDs, *before* any UI.
4. **Designing the API contract** — schemas as the shared source of truth.
5. **Architecture and package boundaries** — the monorepo layout and dependency rules.
6. **Planning state, data, and errors** — the state map, the error contract, and the UI-states inventory.
7. **Quality strategy** — test plan, accessibility targets, performance and type-check budgets, security checklist.
8. **Milestones and scope control** — a walking skeleton first; cutting scope without cutting quality.

**Exercises:**
- **L1 Recall:** Turn the brief into ten user stories with acceptance criteria.
- **L2 Application:** Write the domain types and state machines; review them against the stories.
- **L3 Challenge:** Write the contract package (schemas + inferred types) before any implementation.
- **L4 Real-world:** Produce the capstone design document: domain, contract, architecture diagram, state map, quality plan, milestones, and three ADRs.

#### Chapter 99 — Building, Shipping & Reviewing Your Capstone
`🔴 Expert` · `Essential` · 📁 `99-capstone-build-and-review/`

**Opens with:** "Deploy something on day one." A walking skeleton that does almost nothing, all the way to production.
**Mental model:** *Ship thin vertical slices. Each slice crosses every layer (contract, API, client, UI, tests) and leaves the system deployable.*

1. **The walking skeleton** — CI, deploy, env validation, and one end-to-end request.
2. **Building feature slices end to end** — contract → API → client → UI → tests.
3. **Hardening** — error paths, edge cases, security review.
4. **Performance and accessibility passes** — measured against your budgets.
5. **Observability and operations** — error tracking, analytics events, runbooks.
6. **Documentation and the architecture review** — README, ADRs, contributing guide.
7. **Self-review against the rubric** — §10.6, scored honestly.
8. **Presenting your work** — demo, write-up, portfolio.
9. **What's next** — where to go after the book.

**Exercises:**
- **L1 Recall:** Write the definition of done for one feature slice.
- **L2 Application:** Ship the walking skeleton with CI and a deployed preview.
- **L3 Challenge:** Run a full self-review against the rubric and fix the three weakest areas.
- **L4 Real-world:** Get a code review from another developer, address it, and write a short retrospective.

---

## 10.2 Capstone C1 — *Teamboard* (full-stack, recommended)

**A multi-tenant project and issue tracker for small teams: the TaskFlow thread at professional scale.**

- **Difficulty:** 🔴 Expert / Professional
- **Prerequisites:** Essential core (Parts I–XII) + Ch 90–94 + Ch 97 (recommended: Ch 78, 84–89)
- **Concepts used:** domain modeling, branded IDs, discriminated unions and state machines, schemas as contracts, layered Node API, repository pattern, runtime validation at every boundary, typed env, auth sessions and typed permissions, feature-based React architecture, routing with validated search params, server state, forms with shared schemas, generic data table, component library, error boundaries, performance, accessibility, security, observability, testing at all levels, monorepo, CI/CD.

**Functional requirements**
1. **Workspaces:** create a workspace; invite members by email (mock transport); roles: owner/admin/member/guest.
2. **Projects and issues:** an issue lifecycle modeled as a state machine (`backlog → todo → in_progress → in_review → done`, plus `cancelled`) with per-state data (e.g., `in_review` requires a reviewer).
3. **Board and list views:** drag between columns; a list view using the P19 data table with sorting, filtering, and saved views.
4. **Filters in the URL:** shareable, validated, with sensible defaults.
5. **Comments:** markdown (sanitized), `@mentions`, and edit history.
6. **Activity feed and notifications:** in-app notifications; real-time updates via server-sent events or WebSockets.
7. **Attachments:** validated file type and size, stored with metadata.
8. **Dashboards:** throughput, cycle time, and workload charts (from P17).
9. **Permissions:** enforced by the API, reflected in the UI, with typed `can(user, permission)`.
10. **Audit log** for permission-sensitive actions.

**Non-functional requirements**
- Every network, storage, env, file, and URL boundary is validated, and `as` appears only in a documented allowlist.
- No `any` in application code (lint-enforced); exhaustive handling of every union.
- Tests: domain ≥ 90%, every feature has integration tests, four E2E critical paths.
- WCAG AA, keyboard-complete board.
- Performance budgets: initial JS budget, interaction latency, type-check time.
- A security checklist completed, CSP enabled, httpOnly sessions, rate-limited auth.
- Error tracking with source maps; a typed analytics event catalog.
- CI: type-check, lint, unit/component/integration tests, build, E2E, preview deploy.

**Suggested architecture**

```
teamboard/
├── apps/
│   ├── web/                  # React SPA (feature-based: features/{issues,projects,workspaces,auth,…})
│   └── api/                  # Node API (config, http, services, repositories, domain, errors)
├── packages/
│   ├── contracts/            # schemas + inferred types + error contract (single source of truth)
│   ├── domain/               # pure domain logic shared by api and web (state machines, rules)
│   ├── ui/                   # component library (P20)
│   ├── tokens/               # design tokens
│   └── config/               # shared tsconfig / eslint / prettier
├── e2e/                      # Playwright
├── docs/adr/                 # architecture decision records
└── .github/workflows/        # CI/CD
```

**Milestones:** M1 walking skeleton → M2 auth and workspaces → M3 projects and issues (API + list) → M4 board and state machine → M5 comments, activity, and real-time → M6 dashboards → M7 hardening (security, a11y, performance) → M8 docs, review, and presentation.

**Stretch goals:** offline support with a sync queue; a public REST API with generated client SDK; an end-to-end typed RPC layer as an alternative to REST; a server-rendered marketing site using a framework (Ch 96); internationalization.

**You should understand afterward:** how every concept in the book contributes to a real system, and how to defend the system's design to a senior engineer.

---

## 10.3 Capstone C2 — *Ledgerly* (frontend-focused)

**A personal-finance analytics app. Ideal for readers on the fast-track path or who skipped the backend chapters.**

- **Difficulty:** 🟠→🔴
- **Prerequisites:** Essential core (Parts I–XII; Part VI optional), recommended Ch 78 and 84
- **Concepts used:** branded `Money` and multi-currency safety, CSV parsing pipelines with `Result` types, rule DSL typing, runtime validation at file/storage/API boundaries, generic data table, typed forms, state architecture, offline storage, charts, performance, accessibility, testing with MSW.

**Functional requirements**
1. **Import** bank transactions from CSV with column mapping; every row is parsed, and failures are reported per row (no silent drops).
2. **Categorize** with user-defined rules (a small typed rule DSL: field, operator, value), plus manual overrides.
3. **Budgets** per category with progress, alerts, and rollover.
4. **Recurring payment detection** and an upcoming-bills view.
5. **Multi-currency** with branded `Money` (adding different currencies is a compile error) and exchange rates from a public API, validated and cached.
6. **Analytics:** spending over time, category breakdown, net worth; a 50,000-row virtualized transaction table.
7. **Offline-first:** data stored in IndexedDB (a validated storage boundary), with import/export backups.
8. **Mocked backend** for sync, via MSW, for multi-device simulation.

**Non-functional requirements:** as C1 for types, tests, accessibility, performance, and security. In addition, the CSV import pipeline must have property-based or table-driven tests for malformed input.

**Suggested architecture**

```
ledgerly/
├── src/
│   ├── app/                  # router, providers, layout
│   ├── features/{import,transactions,budgets,rules,analytics,settings}/
│   ├── domain/               # Money, Currency, Transaction, Rule DSL (pure, heavily tested)
│   ├── boundaries/           # csv/, storage/ (IndexedDB), rates-api/ — all parse unknown → domain
│   └── shared/{ui,hooks,lib,observability}/
├── mocks/                    # MSW handlers built from schemas
└── e2e/
```

**Milestones:** M1 skeleton + storage boundary → M2 CSV import pipeline → M3 transactions table → M4 rules engine → M5 budgets → M6 multi-currency → M7 analytics → M8 hardening, docs, and review.

**Stretch goals:** installable progressive web app; web worker for analytics; encrypted backups; a plugin system for importers (typed plugin contract).

**You should understand afterward:** how far careful types and boundary design can take a frontend-only application, and how to keep complex client-side logic correct.

---

## 10.4 Capstone C3 — Library track (Specialist)

**Publish and maintain a TypeScript library used by a real consumer.** For readers heading toward library, platform, or tooling work.

- **Difficulty:** 🔴 Expert / Specialist
- **Prerequisites:** Parts XIII–XV (all), P18 or P20
- **Choose one:**
  - **(a)** P18 grown into a production validation library;
  - **(b)** P20 grown into a public design system;
  - **(c)** a typed SDK generator: given a contract definition, generate a fully typed client.
- **Concepts used:** type-level programming, inference-first API design, declaration output, `exports` maps, dual-module publishing, type tests, API reports, semver for types, release automation, compiler performance, documentation.

**Requirements**
1. A documentation site with guides, API reference, and runnable examples.
2. Runtime tests, type tests, and (for UI) interaction, accessibility, and visual tests.
3. Package validation in CI for every supported module mode; an API report checked on every PR.
4. Changesets-driven releases with changelogs and provenance.
5. Benchmarks, plus type-check performance measurements for large inputs.
6. One deliberate breaking change shipped with a migration guide (and a codemod for UI libraries).
7. A real consumer: Teamboard, Ledgerly, or TaskFlow uses the library from the registry, not from source.
8. `CONTRIBUTING.md`, issue templates, and a support policy for TypeScript versions.

**Suggested architecture**

```
your-library/
├── packages/core/       # the library
├── packages/<adapters>/ # optional integrations (e.g., react bindings)
├── docs/                # documentation site
├── bench/               # runtime + type-check benchmarks
├── examples/            # consumer apps (ESM, CJS, bundler)
└── .changeset/
```

**Stretch goals:** implement an interoperability standard (e.g., the Standard Schema interface for a validation library); support multiple TypeScript versions; build an ESLint plugin that accompanies the library.

**You should understand afterward:** the full lifecycle of software built for other developers: design, types, documentation, compatibility, and maintenance.

---

## 10.5 Capstone milestones and review cadence

| Milestone | Deliverable | Review question |
|---|---|---|
| Design | Design doc, domain types, contract, ADRs | "Could someone build this from your types alone?" |
| Skeleton | Deployed end-to-end request with CI | "Is every quality gate automated from day one?" |
| Each slice | Contract → API → UI → tests | "Is every UI state handled? Is every boundary parsed?" |
| Hardening | Security, a11y, performance passes | "What breaks first under hostile input, slow networks, or a screen reader?" |
| Final | Docs, demo, rubric self-score | "What did you choose *not* to build, and why?" |

## 10.6 Capstone evaluation rubric

Score each dimension 1–4. A professional-quality capstone scores **3+ in every dimension**.

| Dimension | 1 — Emerging | 2 — Developing | 3 — Professional | 4 — Exemplary |
|---|---|---|---|---|
| **Domain types** | Loose objects, booleans | Some unions | Illegal states unrepresentable; branded IDs | Types read as the domain's documentation |
| **Boundaries** | `as` on external data | Some validation | Every boundary parsed; one source of truth | Contracts shared, drift-proof, tested |
| **Architecture** | Flat, tangled | Folders by type | Features + layers + enforced rules | Ports/adapters, ADRs, clean package graph |
| **React design** | Prop drilling, effect soup | Mostly correct state homes | Correct state homes, minimal effects, typed APIs | Reusable patterns used only where justified |
| **UI states** | Happy path only | Loading and error | Loading, empty, error, partial, success everywhere | Graceful degradation and recovery |
| **Testing** | Few tests | Unit tests only | Unit + component + integration + E2E paths | Contract tests; no flaky tests; fast CI |
| **Accessibility** | Mouse-only | Semantic HTML | WCAG AA, keyboard-complete | Screen-reader tested, focus choreography |
| **Performance** | Unmeasured | Measured | Budgets met and enforced in CI | Profiling-driven optimizations documented |
| **Security** | Unconsidered | Basic escaping | Checklist complete, CSP, safe sessions | Threat model documented |
| **Operability** | Console logs | Error tracking | Tracking + typed analytics + runbook | Dashboards and alerts on real signals |
| **Simplicity** | Over- or under-engineered | Inconsistent | Abstractions justified | Documented "not built" decisions |
| **Documentation** | None | README | README, ADRs, CONTRIBUTING | New developer productive in an hour |

### ✅ Checkpoint — Part XVI · The Journey
- **Know:** how every part of the book fits into one system.
- **Build:** one capstone (C1, C2, or C3) scoring 3+ in every rubric dimension.
- **Answer:**
  1. Walk through one feature from domain type to deployed UI, naming every boundary.
  2. Which three design decisions would you defend in an interview, and which one would you change?
  3. What did TypeScript catch in your capstone that tests wouldn't have, and the reverse?
  4. What did you choose not to abstract?
- **Small challenge:** onboard another developer onto your capstone using only its documentation.
- **Ready signs:** you can take a vague requirement to production on your own, and explain every choice.
- **If you struggle, revisit:** the rubric's lowest dimension maps directly back to a part: types → III–IV, boundaries → VI and Ch 61, architecture → Ch 58 and 90, React → VIII–IX, testing → XI, production → XII, simplicity → Ch 89 and 97.

---
**Previous:** [← 9. Advanced & Professional](09-advanced-and-professional.md) · **Next:** [11. Complete E-Book Table of Contents →](11-table-of-contents.md)
