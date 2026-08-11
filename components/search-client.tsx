"use client";

import * as React from "react";
import Link from "next/link";
import { Search as SearchIcon, FileText, Newspaper } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface SearchEntry {
  type: "tech" | "industry";
  week: string;
  weekLabel: string;
  title: string;
  body: string;
  href: string;
  cat?: string;
}

const TYPE_FILTERS = [
  { key: "all", label: "全部" },
  { key: "tech", label: "技术周报" },
  { key: "industry", label: "行业周报" },
];

function normCat(cat?: string): string {
  return !cat ? "other" : cat;
}

function snippet(body: string, q: string): string {
  const text = body.replace(/\s+/g, " ").trim();
  if (!q) return text.slice(0, 160);
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx < 0) return text.slice(0, 160);
  const start = Math.max(0, idx - 40);
  return (start > 0 ? "…" : "") + text.slice(start, start + 160);
}

export function SearchClient({ data }: { data: SearchEntry[] }) {
  const [q, setQ] = React.useState("");
  const [type, setType] = React.useState("all");

  const results = React.useMemo(() => {
    const query = q.trim().toLowerCase();
    return data
      .filter((e) => (type === "all" ? true : e.type === type))
      .filter((e) => {
        if (!query) return true;
        return (
          e.title.toLowerCase().includes(query) ||
          e.body.toLowerCase().includes(query)
        );
      })
      .slice(0, 60);
  }, [q, type, data]);

  return (
    <div>
      <div className="relative mb-4">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜索标题、摘要、企业、动态关键词…"
          className="pl-9"
        />
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {TYPE_FILTERS.map((t) => {
          const n =
            t.key === "all"
              ? data.length
              : data.filter((e) => e.type === t.key).length;
          return (
            <button
              key={t.key}
              onClick={() => setType(t.key)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition-colors",
                type === t.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent"
              )}
            >
              {t.label}
              <span className="ml-1 opacity-70">({n})</span>
            </button>
          );
        })}
      </div>

      <p className="mb-3 text-sm text-muted-foreground">
        命中 {results.length} 条
        {q && `（关键词「${q}」）`}
      </p>

      {results.length === 0 ? (
        <p className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          没有匹配的结果，换个关键词试试。
        </p>
      ) : (
        <div className="space-y-3">
          {results.map((r, i) => (
            <Link
              key={i}
              href={r.href}
              className="block rounded-lg border p-4 transition-colors hover:bg-accent/30"
            >
              <div className="flex items-center gap-2">
                {r.type === "tech" ? (
                  <Badge variant="info">
                    <FileText className="mr-1 h-3 w-3" /> 技术
                  </Badge>
                ) : (
                  <Badge variant="warning">
                    <Newspaper className="mr-1 h-3 w-3" /> 行业
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground">
                  {r.weekLabel}
                </span>
                {r.type === "tech" && r.cat && r.cat !== "other" && (
                  <Badge variant="muted">{r.cat}</Badge>
                )}
              </div>
              <p className="mt-1.5 font-medium leading-snug">{r.title}</p>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {snippet(r.body, q)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
