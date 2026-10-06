import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { Markdown } from "../components/Markdown";
import { getPart, getProject, partPath, projectPath, projects } from "../lib/manifest";
import { NotFound } from "./NotFound";

const difficultyOf = (body: string) => body.match(/\*\*Difficulty:\*\* ([^·\n]+)/)?.[1]?.trim() ?? "";

export function ProjectsPage() {
  useEffect(() => {
    document.title = "Projects · Typed Interfaces";
  }, []);
  const groups = [
    { title: "Projects", items: projects.filter((p) => p.id.startsWith("P")) },
    { title: "Capstones", items: projects.filter((p) => p.id.startsWith("C")) },
  ];
  return (
    <div className="page">
      <article className="article">
        <header className="chapter-header">
          <p className="chapter-header__eyebrow">Build something in every part</p>
          <h1>Projects</h1>
        </header>
        <p className="lead">
          Projects climb a ladder from a typed calculator to a production-quality capstone. The running <strong>TaskFlow</strong>{" "}
          project evolves across six parts: domain model → API → API client → vanilla UI → React → full app with auth and tests.
        </p>
        {groups.map((g) => (
          <section key={g.title}>
            <h2>{g.title}</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>ID</th><th>Project</th><th>Part</th><th>Difficulty</th></tr>
                </thead>
                <tbody>
                  {g.items.map((p) => {
                    const part = getPart(p.partId);
                    return (
                      <tr key={p.id}>
                        <td><Link to={projectPath(p)}>{p.id}</Link></td>
                        <td><Link to={projectPath(p)}>{p.title}</Link></td>
                        <td>{part && <Link to={partPath(part)}>Part {part.id}</Link>}</td>
                        <td>{difficultyOf(p.body)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </article>
    </div>
  );
}

export function ProjectPage() {
  const { projectId } = useParams();
  const project = getProject(projectId);
  useEffect(() => {
    if (project) document.title = `${project.id}: ${project.title} · Typed Interfaces`;
  }, [project]);
  if (!project) return <NotFound />;
  const part = getPart(project.partId);
  const index = projects.indexOf(project);
  const prev = projects[index - 1];
  const next = projects[index + 1];
  return (
    <div className="page">
      <article className="article">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/projects">Projects</Link>
          {part && (
            <>
              <span aria-hidden>›</span>
              <Link to={partPath(part)}>Part {part.id} — {part.title}</Link>
            </>
          )}
        </nav>
        <header className="chapter-header">
          <p className="chapter-header__eyebrow">{project.id.startsWith("C") ? "Capstone" : "Project"} {project.id}</p>
          <h1>{project.title}</h1>
        </header>
        <div className="prose">
          <Markdown source={project.body} />
        </div>
        <div className="pager">
          {prev ? (
            <Link className="pager__link" to={projectPath(prev)}>
              <span>← Previous</span>
              <strong>{prev.id} — {prev.title}</strong>
            </Link>
          ) : <span />}
          {next ? (
            <Link className="pager__link pager__link--next" to={projectPath(next)}>
              <span>Next →</span>
              <strong>{next.id} — {next.title}</strong>
            </Link>
          ) : <span />}
        </div>
      </article>
    </div>
  );
}
