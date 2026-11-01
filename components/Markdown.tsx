import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { safeHref } from "../lib/safe-href";
import CodeBlock from "./CodeBlock";

export default function Markdown({ children }: { children: string }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children, ...props }) => {
            const safe = safeHref(href);
            const external = /^https?:/i.test(safe);
            return (
              <a
                href={safe}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-accent underline hover:text-fg transition-colors underline-offset-4"
                {...props}
              >
                {children}
              </a>
            );
          },
          pre: ({ children }) => <>{children}</>,
          code: ({ className, children, ...props }) => {
            const isMultiline = String(children).includes("\n") || Boolean(className);
            if (isMultiline) {
              return <CodeBlock className={className}>{children}</CodeBlock>;
            }
            return (
              <code
                className="rounded bg-line/60 px-1.5 py-0.5 font-mono text-[0.875em] text-fg"
                {...props}
              >
                {children}
              </code>
            );
          },
          table: ({ children }) => (
            <div className="my-6 w-full overflow-x-auto rounded-xl border border-line">
              <table className="w-full text-left text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-line bg-surface/80 px-4 py-2.5 font-serif font-semibold text-fg text-xs uppercase tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-line/60 px-4 py-2.5 text-muted text-sm tabular-nums">
              {children}
            </td>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-2 border-accent pl-4 font-serif italic text-lg text-fg/90">
              {children}
            </blockquote>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
