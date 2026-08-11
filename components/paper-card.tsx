"use client";

import * as React from "react";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TechCatBadge } from "@/components/tech-cat-badge";
import type { Paper } from "@/lib/types";

interface Section {
  key: string;
  label: string;
  value: string;
}

function buildSections(p: Paper): Section[] {
  const sections: Section[] = [];
  if (p.abstract_cn) sections.push({ key: "cn", label: "中文摘要 / 意译", value: p.abstract_cn });
  if (p.background) sections.push({ key: "bg", label: "背景介绍", value: p.background });
  if (p.tech_principle) sections.push({ key: "tp", label: "技术原理", value: p.tech_principle });
  if (p.main_conclusion) sections.push({ key: "mc", label: "主要结论", value: p.main_conclusion });
  if (p.interpretation) sections.push({ key: "it", label: "简要解读", value: p.interpretation });
  if (p.abstract) sections.push({ key: "en", label: "英文原文摘要", value: p.abstract });
  return sections;
}

export function PaperCard({ paper, index }: { paper: Paper; index?: number }) {
  const [open, setOpen] = React.useState(false);
  const sections = buildSections(paper);
  const primary = sections[0]; // 默认展示的中文摘要
  const rest = sections.slice(1);

  return (
    <Card>
      <CardHeader className="gap-2">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base leading-snug">
            {index !== undefined && (
              <span className="mr-2 text-muted-foreground">{index}.</span>
            )}
            {paper.title}
          </CardTitle>
          {paper.link && (
            <a
              href={paper.link}
              target="_blank"
              rel="noreferrer noopener"
              className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
              aria-label="打开原文"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <TechCatBadge cat={paper.tech_cat} />
          {paper.journal && <span>{paper.journal}</span>}
          {paper.if_label && paper.if_label !== "0.0" && (
            <span>IF≈{paper.if_label}</span>
          )}
          {typeof paper.score === "number" && (
            <span>相关度 {paper.score.toFixed(1)}</span>
          )}
          {paper.date && <span>{paper.date}</span>}
          {paper.source && <span>· {paper.source}</span>}
        </div>
        {paper.authors && (
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {paper.authors}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-3 text-sm leading-relaxed">
        {primary && (
          <div>
            <p className="mb-1 font-medium text-foreground/90">{primary.label}</p>
            <p className="whitespace-pre-line text-foreground/80">
              {primary.value}
            </p>
          </div>
        )}

        {rest.length > 0 && (
          <>
            {!open ? (
              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                展开全文（背景 / 原理 / 结论 / 解读）
                <ChevronDown className="h-4 w-4" />
              </button>
            ) : (
              <>
                <Separator />
                <div className="space-y-4">
                  {rest.map((s) => (
                    <div key={s.key}>
                      <p className="mb-1 font-medium text-foreground/90">
                        {s.label}
                      </p>
                      <p className="whitespace-pre-line text-foreground/80">
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  收起
                  <ChevronUp className="h-4 w-4" />
                </button>
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
