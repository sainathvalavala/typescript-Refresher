import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="page">
      <article className="article">
        <header className="chapter-header">
          <p className="chapter-header__eyebrow">404</p>
          <h1>Page not found</h1>
        </header>
        <p className="lead">That page doesn't exist. Maybe the chapter number is off?</p>
        <p>
          <Link className="button button--primary" to="/">Back to the book</Link>
        </p>
      </article>
    </div>
  );
}
