import type { MDXComponents } from "mdx/types";
import { Children, isValidElement, type ComponentProps, type ReactNode } from "react";
import { Link } from "react-router";
import { Pre } from "./CodeBlock";

// Shared renderers for MDX chapters and Markdown design pages.

const CALLOUTS: [string, string][] = [
  ["🧠", "mental"],
  ["⚠️", "warning"],
  ["🚫", "avoid"],
  ["✅", "good"],
  ["🔗", "connection"],
  ["🌍", "world"],
  ["💡", "tip"],
  ["📖", "story"],
  ["🆕", "modern"],
  ["🕰", "legacy"],
  ["⏭", "skip"],
  ["🧪", "try"],
  ["🔬", "deep"],
  ["🎯", "goal"],
  ["★", "milestone"],
  ["🎓", "milestone"],
];

function firstText(node: ReactNode): string {
  for (const child of Children.toArray(node)) {
    if (typeof child === "string") {
      if (child.trim()) return child.trim();
    } else if (isValidElement<{ children?: ReactNode }>(child)) {
      const text = firstText(child.props.children);
      if (text) return text;
    }
  }
  return "";
}

export function Callout({ children }: { children?: ReactNode }) {
  const text = firstText(children);
  const kind = CALLOUTS.find(([emoji]) => text.startsWith(emoji))?.[1] ?? "note";
  return <blockquote className={`callout callout--${kind}`}>{children}</blockquote>;
}

/** Maps curriculum-relative links (e.g. "05-typescript-curriculum.md#x") to site routes. */
export function resolveHref(href: string): { internal: boolean; to: string } {
  if (/^(https?:|mailto:)/.test(href)) return { internal: false, to: href };
  if (href.startsWith("#")) return { internal: false, to: href };
  const md = href.match(/^(?:\.\/)?([\w-]+)\.md(#.*)?$/);
  if (md) {
    const [, file, hash = ""] = md;
    return { internal: true, to: file === "README" ? `/design${hash}` : `/design/${file}${hash}` };
  }
  if (href.startsWith("/")) return { internal: true, to: href };
  return { internal: false, to: href };
}

export function SmartLink({ href = "", children, ...rest }: ComponentProps<"a">) {
  const { internal, to } = resolveHref(href);
  if (internal) return <Link to={to}>{children}</Link>;
  const external = /^https?:/.test(to);
  return (
    <a href={to} {...rest} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {children}
    </a>
  );
}

function Table(props: ComponentProps<"table">) {
  return (
    <div className="table-wrap">
      <table {...props} />
    </div>
  );
}

export const proseComponents = {
  pre: Pre,
  blockquote: Callout,
  a: SmartLink,
  table: Table,
} satisfies MDXComponents;
