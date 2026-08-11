import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import { IndustryBlock } from "@/components/industry-block";
import { allWeeksOf, getIndustryWeek, weekLabel, dateRange, docUrl } from "@/lib/hub";

export function generateStaticParams() {
  return allWeeksOf("industry").map((week) => ({ week }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ week: string }>;
}) {
  const { week } = await params;
  const w = getIndustryWeek(week);
  return {
    title: w
      ? `${weekLabel(week)} 行业周报 · 测序周报`
      : "行业周报 · 测序周报",
  };
}

export default async function IndustryWeekPage({
  params,
}: {
  params: Promise<{ week: string }>;
}) {
  const { week } = await params;
  const w = getIndustryWeek(week);
  if (!w) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Link
        href="/industry"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> 返回行业周报列表
      </Link>

      <header className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">{weekLabel(week)} 行业周报</h1>
          <a
            href={docUrl("industry", week)}
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm hover:bg-accent"
          >
            <Download className="h-4 w-4" /> 下载 Word 原件
          </a>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {dateRange(w.meta.weekStart, w.meta.weekEnding)}
        </p>
      </header>

      <IndustryBlock content={w.content} />
    </div>
  );
}
