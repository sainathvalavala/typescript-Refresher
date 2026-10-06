// Prepares dist/ for static hosts without server-side routing (GitHub Pages):
// - 404.html is a copy of index.html, so a refresh or shared link to /chapter/16-… still loads the app,
//   and the client-side router renders the right page.
// - .nojekyll stops GitHub Pages from running Jekyll over the build output.
import { copyFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dist = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
copyFileSync(join(dist, "index.html"), join(dist, "404.html"));
writeFileSync(join(dist, ".nojekyll"), "");
console.log("postbuild: wrote dist/404.html and dist/.nojekyll");
