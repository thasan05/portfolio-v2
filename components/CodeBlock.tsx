"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
}

export default function CodeBlock({ children, className = "" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const match = /language-(\w+)/.exec(className || "");
  const lang = match ? match[1] : "";
  const codeContent = String(children).replace(/\n$/, "");

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="relative my-6 rounded-xl border border-line bg-zinc-950 dark:bg-[#121215] overflow-hidden text-[#f4f4f5] shadow-sm">
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 text-xs text-zinc-400">
        <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-medium">
          {lang || "Code"}
        </span>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-accent" />
              <span className="text-accent text-[11px] font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span className="text-[11px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <div className="overflow-x-auto p-4 text-[13px] leading-relaxed font-mono">
        <code>{children}</code>
      </div>
    </div>
  );
}
