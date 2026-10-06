import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./components/Layout";
import { ChapterPage } from "./pages/ChapterPage";
import { HomePage } from "./pages/HomePage";
import { NotFound } from "./pages/NotFound";
import "./styles.css";

// Pages that render curriculum Markdown are split out, so the Markdown parser
// only downloads when one of them is opened.
const PartPage = lazy(() => import("./pages/PartPage").then((m) => ({ default: m.PartPage })));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage").then((m) => ({ default: m.ProjectsPage })));
const ProjectPage = lazy(() => import("./pages/ProjectsPage").then((m) => ({ default: m.ProjectPage })));
const DesignPage = lazy(() => import("./pages/DesignPage").then((m) => ({ default: m.DesignPage })));

// Matches Vite's `base` ("/" locally, "/<repo-name>/" on GitHub Pages).
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "part/:partId", element: <PartPage /> },
      { path: "chapter/:slug", element: <ChapterPage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "projects/:projectId", element: <ProjectPage /> },
      { path: "design", element: <DesignPage /> },
      { path: "design/:slug", element: <DesignPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
], { basename });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
