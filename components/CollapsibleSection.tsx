"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CollapsibleSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-6 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950/60 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="font-semibold text-zinc-900 dark:text-white">
          {title}
        </span>

        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`transition-all duration-500 ease-in-out${
         open ? "max-h-96 px-5 pb-5 opacity-100" : "max-h-0 opacity-0"

        }`}
      >
        {open && (
          <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
