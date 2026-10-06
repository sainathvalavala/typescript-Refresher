import { MDXProvider } from "@mdx-js/react";
import { Suspense, useEffect, useState } from "react";
import { Link, Outlet, ScrollRestoration, useLocation } from "react-router";
import { useTheme } from "../lib/preferences";
import { proseComponents } from "./Prose";
import { Search } from "./Search";
import { Sidebar } from "./Sidebar";

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <MDXProvider components={proseComponents}>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="topbar">
        <button
          type="button"
          className="topbar__menu"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          ☰
        </button>
        <Link to="/" className="brand">
          <span className="brand__mark" aria-hidden>TI</span>
          <span className="brand__name">Typed Interfaces</span>
        </Link>
        <Search />
        <button type="button" className="topbar__theme" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </header>

      <div className={`shell ${menuOpen ? "shell--menu-open" : ""}`}>
        <aside className="shell__sidebar">
          <Sidebar onNavigate={() => setMenuOpen(false)} />
        </aside>
        {menuOpen && <div className="shell__scrim" onClick={() => setMenuOpen(false)} aria-hidden />}
        <main id="main" className="shell__main">
          <Suspense fallback={<p className="page loading">Loading…</p>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
      <ScrollRestoration />
    </MDXProvider>
  );
}
