import Link from "next/link";
import { ArrowRight, FileText, Newspaper, CalendarDays, FlaskConical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getIndex,
  getWeeks,
  latestWeek,
  getTechWeek,
  getIndustryWeek,
  allWeeksOf,
  weekLabel,
  dateRange,
} from "@/lib/hub";

export default function HomePage() {
  const idx = getIndex();
  const techLatest = latestWeek("tech");
  const indLatest = latestWeek("industry");
  const techWeek = techLatest ? getTechWeek(techLatest.isoWeek) : null;
  const indWeek = indLatest ? getIndustryWeek(indLatest.isoWeek) : null;

  const techWeeks = allWeeksOf("tech");
  const indWeeks = allWeeksOf("industry");
  let totalTech = 0;
  let totalIndustry = 0;
  for (const w of techWeeks) totalTech += getTechWeek(w)?.content.length ?? 0;
  for (const w of indWeeks) {
    const c = getIndustryWeek(w)?.content;
    if (c)
      totalIndustry +=
        (c.headlines?.length ?? 0) +
        (c.financing?.length ?? 0) +
        (c.regulation?.length ?? 0) +
        (c.market?.length ?? 0);
  }

  const recent = getWeeks().slice(0, 8);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Hero */}
      <section className="mb-10">
        <Badge variant="secondary" className="mb-3">
          每周一自动更新
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          测序周报 · 周更平台
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          自动汇集「测序技术周报 Top10」与「测序行业周报」，按周归档、支持全文检索，
          一站式回顾测序领域每周的技术进展与产业动态。
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/tech" className={cn(buttonVariants({ variant: "default" }))}>
            <FlaskConical className="h-4 w-4" /> 浏览技术周报
          </Link>
          <Link
            href="/industry"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <Newspaper className="h-4 w-4" /> 浏览行业周报
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "技术周报", value: techWeeks.length, unit: "期", icon: FlaskConical },
          { label: "行业周报", value: indWeeks.length, unit: "期", icon: Newspaper },
          { label: "技术论文", value: totalTech, unit: "篇", icon: FileText },
          { label: "行业动态", value: totalIndustry, unit: "条", icon: CalendarDays },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <s.icon className="h-5 w-5 text-primary" />
              <p className="mt-2 text-2xl font-bold">
                {s.value}
                <span className="ml-1 text-sm font-normal text-muted-foreground">
                  {s.unit}
                </span>
              </p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Latest two reports */}
      <section className="mb-10 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="flex items-center gap-2 text-base">
              <FlaskConical className="h-5 w-5 text-sky-600" /> 最新技术周报
            </CardTitle>
            {techLatest && (
              <Link
                href={`/tech/${techLatest.isoWeek}`}
                className="text-sm text-primary hover:underline"
              >
                查看
              </Link>
            )}
          </CardHeader>
          <CardContent>
            {techWeek ? (
              <>
                <p className="font-medium">{weekLabel(techWeek.meta.isoWeek)}</p>
                <p className="text-sm text-muted-foreground">
                  {dateRange(techWeek.meta.weekStart, techWeek.meta.weekEnding)} ·{" "}
                  {techWeek.content.length} 篇
                </p>
                <ul className="mt-3 space-y-2">
                  {techWeek.content.slice(0, 4).map((p, i) => (
                    <li
                      key={i}
                      className="line-clamp-1 text-sm text-foreground/80"
                    >
                      {i + 1}. {p.title}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">暂无数据</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="flex items-center gap-2 text-base">
              <Newspaper className="h-5 w-5 text-amber-600" /> 最新行业周报
            </CardTitle>
            {indLatest && (
              <Link
                href={`/industry/${indLatest.isoWeek}`}
                className="text-sm text-primary hover:underline"
              >
                查看
              </Link>
            )}
          </CardHeader>
          <CardContent>
            {indWeek ? (
              <>
                <p className="font-medium">{weekLabel(indWeek.meta.isoWeek)}</p>
                <p className="text-sm text-muted-foreground">
                  {dateRange(indWeek.meta.weekStart, indWeek.meta.weekEnding)}
                </p>
                <ul className="mt-3 space-y-2">
                  {indWeek.content.headlines.slice(0, 4).map((h, i) => (
                    <li
                      key={i}
                      className="line-clamp-1 text-sm text-foreground/80"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">暂无数据</p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Recent weeks */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">最近周次</h2>
          <Link
            href="/archive"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            全部归档 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {recent.map((w) => (
            <div
              key={w.isoWeek}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <p className="font-medium">{weekLabel(w.isoWeek)}</p>
                <div className="mt-1 flex gap-2">
                  <Badge variant={w.tech.json ? "info" : "muted"}>
                    技术{w.tech.json ? "✓" : "—"}
                  </Badge>
                  <Badge variant={w.industry.json ? "warning" : "muted"}>
                    行业{w.industry.json ? "✓" : "—"}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                {w.tech.json && (
                  <Link
                    href={`/tech/${w.isoWeek}`}
                    className="text-sm text-primary hover:underline"
                  >
                    技术
                  </Link>
                )}
                {w.industry.json && (
                  <Link
                    href={`/industry/${w.isoWeek}`}
                    className="text-sm text-primary hover:underline"
                  >
                    行业
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {idx.gaps.length > 0 && (
        <p className="mt-8 text-xs text-muted-foreground">
          提示：{idx.gaps.join("；")}
        </p>
      )}
    </div>
  );
}
