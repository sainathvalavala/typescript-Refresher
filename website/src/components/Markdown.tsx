import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { proseComponents } from "./Prose";

/** Renders curriculum Markdown (design pages, checkpoints, project specs). */
export function Markdown({ source }: { source: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSlug]} components={proseComponents}>
      {source}
    </ReactMarkdown>
  );
}
