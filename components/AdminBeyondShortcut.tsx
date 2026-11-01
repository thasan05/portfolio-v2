"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function AdminBeyondShortcut() {
  const pathname = usePathname();
  if (pathname !== "/admin") return null;

  return (
    <Link
      href="/admin/beyond"
      aria-label="Open Beyond CMS"
      title="Open Beyond CMS"
      className="fixed right-6 bottom-6 z-[100] w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-500/30 flex items-center justify-center transition-all hover:scale-105"
    >
      <Plus size={22} strokeWidth={2.5} />
    </Link>
  );
}
