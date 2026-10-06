# Typed Interfaces: the website

The book-style TypeScript + React curriculum as a React website: 16 parts, 99 chapters, and every subtopic explained with a code example. It includes sidebar navigation, search, an "on this page" outline, previous/next links, reading progress, and light and dark themes.

## Run it

You need Node.js 20 or newer.

```sh
cd website
npm install        # first time only
npm run dev        # then open http://localhost:5173
```

Other commands:

| Command | What it does |
|---|---|
| `npm run build` | Type-checks, then builds the static site into `dist/` |
| `npm run preview` | Serves the built site at http://localhost:4173 |
| `npm run check:content` | Validates every chapter file (see below) |
| `npm run manifest` | Regenerates the book structure from `../curriculum` (runs automatically before `dev` and `build`) |

## How it's organized

```
website/
├── src/
│   ├── content/
│   │   ├── chapters/                 ← the book: one MDX file per chapter
│   │   │   ├── 01-why-typescript/
│   │   │   │   ├── 01-the-story-so-far.mdx
│   │   │   │   └── …
│   │   │   ├── 04-generics-and-type-transformations/
│   │   │   │   ├── 16-why-generics.mdx
│   │   │   │   └── …
│   │   │   └── …                     (16 part folders, 99 chapter files)
│   │   └── part-intros.ts            ← reader-facing introduction for each part
│   ├── components/                   ← layout, sidebar, search, code blocks, callouts, TOC
│   ├── pages/                        ← home, part, chapter, projects, curriculum-design pages
│   ├── lib/                          ← manifest access, content loading, progress/theme storage
│   └── generated/manifest.json       ← built from ../curriculum (don't edit)
├── scripts/
│   ├── build-manifest.mjs            ← parses ../curriculum/*.md into the manifest
│   └── check-content.mjs             ← validates chapter MDX files
└── CONTENT-GUIDE.md                  ← how to write or edit a chapter
```

- **Structure comes from the curriculum.** Parts, chapter titles, difficulty and tier badges, subtopic (section) titles, checkpoints, and project specs are read from `../curriculum/*.md`, so the website and the curriculum design can't drift apart.
- **Lesson text lives in MDX.** Each chapter file is Markdown that compiles to a React component. Every subtopic is a `## 16.3 Title` heading with an explanation and at least one code example.
- **Curriculum design pages.** The 16 design documents in `../curriculum` appear under **Curriculum design**, rendered directly from the Markdown.

## Editing a chapter

Open the chapter's `.mdx` file, edit, and save. The dev server reloads instantly. Then run:

```sh
npm run check:content -- 16      # check one chapter (or several: -- 16 17 18)
```

The checker compiles the MDX and verifies that every subtopic from the curriculum has its heading and a code example, and that the exercises and takeaways are present. The writing rules (structure, callouts, the MDX characters to avoid) are in [CONTENT-GUIDE.md](CONTENT-GUIDE.md).

## Deploying to GitHub Pages

The repository includes a workflow ([.github/workflows/deploy-pages.yml](../.github/workflows/deploy-pages.yml)) that validates every chapter, builds the site, and publishes it on every push to `main`.

One-time setup on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The site is then served at `https://<username>.github.io/<repository>/`. The workflow passes that `/<repository>/` prefix to the build as `BASE_PATH`, so links and assets work under it. GitHub Pages has no server-side routing, so the build also writes `404.html` (a copy of `index.html`). Refreshing or sharing a link like `/chapter/16-why-generics` therefore still opens the right page.

To try a Pages-style build locally (PowerShell):

```powershell
$env:BASE_PATH = "/typescript-react-book/"; npm run build; Remove-Item Env:BASE_PATH
```
