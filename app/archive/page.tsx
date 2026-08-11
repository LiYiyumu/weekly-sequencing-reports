import Link from "next/link";
import { Archive, FileText, Newspaper, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  getWeeks,
  getTechWeek,
  getIndustryWeek,
  weekLabel,
  dateRange,
  docUrl,
} from "@/lib/hub";

export const metadata = { title: "归档 · 测序周报" };

export default function ArchivePage() {
  const weeks = getWeeks();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="mb-6">
        <div className="flex items-center gap-2 text-primary">
          <Archive className="h-5 w-5" />
          <h1 className="text-2xl font-bold">归档浏览</h1>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          按 ISO 周次归档全部周报，可逐周查看或下载 Word 原件。
        </p>
      </header>

      {weeks.length === 0 ? (
        <p className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          暂无归档数据。
        </p>
      ) : (
        <div className="space-y-3">
          {weeks.map((w) => {
            const tw = w.tech.json ? getTechWeek(w.isoWeek) : null;
            const iw = w.industry.json ? getIndustryWeek(w.isoWeek) : null;
            const start = tw?.meta.weekStart || iw?.meta.weekStart || "";
            const end = tw?.meta.weekEnding || iw?.meta.weekEnding || "";
            return (
              <div
                key={w.isoWeek}
                className="rounded-lg border p-4 transition-colors hover:bg-accent/30"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{weekLabel(w.isoWeek)}</span>
                  {w.tech.json && <Badge variant="info">技术</Badge>}
                  {w.industry.json && <Badge variant="warning">行业</Badge>}
                  <span className="text-sm text-muted-foreground">
                    {dateRange(start, end)}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {w.tech.json && (
                    <Link
                      href={`/tech/${w.isoWeek}`}
                      className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm hover:bg-background"
                    >
                      <FileText className="h-4 w-4" /> 技术
                    </Link>
                  )}
                  {w.tech.json && (
                    <a
                      href={docUrl("tech", w.isoWeek)}
                      className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm text-muted-foreground hover:bg-background"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  )}
                  {w.industry.json && (
                    <Link
                      href={`/industry/${w.isoWeek}`}
                      className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm hover:bg-background"
                    >
                      <Newspaper className="h-4 w-4" /> 行业
                    </Link>
                  )}
                  {w.industry.json && (
                    <a
                      href={docUrl("industry", w.isoWeek)}
                      className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm text-muted-foreground hover:bg-background"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
