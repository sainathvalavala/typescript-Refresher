import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { defineConfig } from "vite";

export default defineConfig({
  // GitHub Pages serves a project site from /<repo-name>/. The deploy workflow sets BASE_PATH;
  // locally the site lives at the root.
  base: process.env.BASE_PATH ?? "/",
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
        providerImportSource: "@mdx-js/react",
        // Only .mdx is MDX. The curriculum .md files are imported as raw text.
        mdExtensions: [],
      }),
    },
    react({ include: /\.(mdx|tsx?|jsx?)$/ }),
  ],
  // React, the router, Prism, and the book manifest form the ~200 kB (gzip) app shell.
  build: { chunkSizeWarningLimit: 700 },
  // The design pages read the curriculum Markdown from ../curriculum.
  server: { fs: { allow: [".."] } },
});
