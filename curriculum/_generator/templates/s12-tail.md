
## 12.6 Root, shared, and tooling folders

```
typescript-react-book/
├── package.json               # workspace scripts: test, typecheck, lint, check:exercise <path>
├── pnpm-workspace.yaml        # projects/*, projects/capstones/*, shared/* (lessons run from the root package)
├── tsconfig.base.json         # strict + noUncheckedIndexedAccess + verbatimModuleSyntax
├── eslint.config.js           # typescript-eslint (type-aware) + react-hooks + jsx-a11y
├── vitest.workspace.ts        # one runner for all lessons and projects
├── shared/
│   ├── tsconfig/              # node.json · react.json · library.json (Ch 26 templates)
│   ├── test-utils/            # typed custom render, MSW server, factories (Part XI)
│   └── fixtures/              # schema-validated sample data (TaskFlow, dashboards)
├── appendices/                # A–H (see the table of contents)
├── front-matter/              # preface, how-to-read, reading paths, setup
├── solutions/                 # mirrors parts/ and projects/; separate branch recommended
└── tools/
    ├── scaffold.ts            # creates part/chapter/lesson folders from the curriculum
    ├── check-exercise.ts      # runs one exercise's runtime + type tests with friendly output
    ├── build-book.ts          # concatenates READMEs in order → e-book (EPUB/PDF/web)
    └── lint-links.ts          # verifies cross-chapter links ("🔗 Ch 32") resolve
```

## 12.7 How the repository becomes the e-book

```
lesson README.md files ──┐
chapter README.md files ─┼──► tools/build-book.ts ──► ordered manuscript ──► web book / EPUB / PDF
part README.md files ────┘        (numbering, callout styling, cross-links, code from examples/)
examples/*.ts ───────────────► embedded into the manuscript by reference, so code in the book is
                               always the code that compiles and passes tests in CI
```

**Why this matters:** every code sample in the published book is type-checked and tested on every commit, so the book can't ship a snippet that doesn't compile.

---
**Previous:** [← 11. Table of Contents](11-table-of-contents.md) · **Next:** [13. Roadmap → Book → Folder Mapping →](13-roadmap-book-folder-mapping.md)
