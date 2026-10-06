import { Highlight, themes } from "prism-react-renderer";
import { isValidElement, useState, type ReactNode } from "react";
import { useTheme } from "../lib/preferences";

const LANGUAGE_ALIASES: Record<string, string> = {
  ts: "typescript",
  typescript: "typescript",
  tsx: "tsx",
  js: "javascript",
  javascript: "javascript",
  mjs: "javascript",
  jsx: "jsx",
  json: "json",
  jsonc: "json",
  css: "css",
  html: "markup",
  xml: "markup",
  yaml: "yaml",
  yml: "yaml",
  md: "markdown",
  markdown: "markdown",
  sql: "sql",
};

const LABELS: Record<string, string> = {
  typescript: "TypeScript",
  tsx: "TSX",
  javascript: "JavaScript",
  jsx: "JSX",
  json: "JSON",
  css: "CSS",
  markup: "HTML",
  yaml: "YAML",
  markdown: "Markdown",
  sql: "SQL",
};

function lineTone(text: string) {
  if (/(\/\/|#)\s*(❌|💥)/.test(text)) return "line-bad";
  if (/(\/\/|#)\s*✅/.test(text)) return "line-good";
  return "";
}

export function CodeBlock({ code, language }: { code: string; language: string | undefined }) {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const raw = (language ?? "").toLowerCase();
  const prismLanguage = LANGUAGE_ALIASES[raw] ?? "plain";
  const label = LABELS[prismLanguage] ?? (["sh", "bash", "shell", "powershell", "ps1", "console"].includes(raw) ? "Terminal" : raw ? raw.charAt(0).toUpperCase() + raw.slice(1) : "Text");
  const source = code.replace(/\n$/, "");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="code-block">
      <div className="code-block__bar">
        <span className="code-block__lang">{label}</span>
        <button type="button" className="code-block__copy" onClick={copy} aria-label="Copy code">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <Highlight theme={theme === "dark" ? themes.oneDark : themes.github} code={source} language={prismLanguage}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style, background: "transparent" }} tabIndex={0}>
            {tokens.map((line, i) => {
              const text = line.map((t) => t.content).join("");
              const lineProps = getLineProps({ line });
              return (
                <div key={i} {...lineProps} className={`${lineProps.className} ${lineTone(text)}`}>
                  {line.map((token, j) => (
                    <span key={j} {...getTokenProps({ token })} />
                  ))}
                  {line.length === 1 && line[0]?.content === "" ? "\n" : null}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

/** Renders a Markdown/MDX `pre > code` pair through CodeBlock. */
export function Pre({ children }: { children?: ReactNode }) {
  if (isValidElement<{ className?: string; children?: ReactNode }>(children)) {
    const className = children.props.className ?? "";
    const language = className.match(/language-([\w-]+)/)?.[1];
    return <CodeBlock code={String(children.props.children ?? "")} language={language} />;
  }
  return <pre>{children}</pre>;
}
