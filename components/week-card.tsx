import Link from "next/link";
import { ArrowRight, FileText, Newspaper } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { weekLabel, dateRange } from "@/lib/hub";
import type { ReportType } from "@/lib/types";

export function WeekCard({
  type,
  iso,
  start,
  end,
  count,
  summary,
}: {
  type: ReportType;
  iso: string;
  start: string;
  end: string;
  count: number;
  summary?: string;
}) {
  const href = `/${type}/${iso}`;
  return (
    <Link href={href} className="group block">
      <Card className="transition-colors group-hover:border-primary/60 group-hover:bg-accent/30">
        <CardContent className="flex items-start gap-4 p-5">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
              type === "tech"
                ? "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300"
                : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
            }`}
          >
            {type === "tech" ? (
              <FileText className="h-5 w-5" />
            ) : (
              <Newspaper className="h-5 w-5" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold">{weekLabel(iso)}</span>
              <Badge variant="muted">{count} 篇</Badge>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {dateRange(start, end)}
            </p>
            {summary && (
              <p className="mt-2 line-clamp-2 text-sm text-foreground/80">
                {summary}
              </p>
            )}
          </div>
          <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
        </CardContent>
      </Card>
    </Link>
  );
}
