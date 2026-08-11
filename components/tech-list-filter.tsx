"use client";

import * as React from "react";
import { PaperCard } from "@/components/paper-card";
import { cn } from "@/lib/utils";
import type { Paper } from "@/lib/types";

const CATS: { key: string; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "second_gen", label: "二代 / 短读长" },
  { key: "third_gen", label: "三代 / 长读长" },
  { key: "spatial", label: "空间转录组" },
  { key: "other", label: "其他 / 未分类" },
];

function norm(cat: string): string {
  return cat === "" ? "other" : cat;
}

export function TechListFilter({ papers }: { papers: Paper[] }) {
  const [cat, setCat] = React.useState("all");

  const filtered = React.useMemo(
    () => (cat === "all" ? papers : papers.filter((p) => norm(p.tech_cat) === cat)),
    [cat, papers]
  );

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {CATS.map((c) => {
          const n =
            c.key === "all"
              ? papers.length
              : papers.filter((p) => norm(p.tech_cat) === c.key).length;
          return (
            <button
              key={c.key}
              onClick={() => setCat(c.key)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition-colors",
                cat === c.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent"
              )}
            >
              {c.label}
              <span className="ml-1 opacity-70">({n})</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          该分类下暂无文献。
        </p>
      ) : (
        <div className="space-y-4">
          {filtered.map((p, i) => (
            <PaperCard key={p.title} paper={p} index={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
