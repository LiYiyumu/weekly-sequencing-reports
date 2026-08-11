import { Newspaper } from "lucide-react";
import { WeekCard } from "@/components/week-card";
import { allWeeksOf, getIndustryWeek } from "@/lib/hub";

export const metadata = { title: "行业周报 · 测序周报" };

export default function IndustryListPage() {
  const weeks = allWeeksOf("industry");
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="mb-6">
        <div className="flex items-center gap-2 text-amber-600">
          <Newspaper className="h-5 w-5" />
          <h1 className="text-2xl font-bold">测序行业周报</h1>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          每周测序产业动态：企业动向、融资、政策监管与市场表现。
        </p>
      </header>

      {weeks.length === 0 ? (
        <p className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          暂无行业周报数据，请先运行内容同步。
        </p>
      ) : (
        <div className="space-y-3">
          {weeks.map((iso) => {
            const w = getIndustryWeek(iso);
            return (
              <WeekCard
                key={iso}
                type="industry"
                iso={iso}
                start={w?.meta.weekStart ?? ""}
                end={w?.meta.weekEnding ?? ""}
                count={
                  (w?.content.headlines?.length ?? 0) +
                  (w?.content.financing?.length ?? 0) +
                  (w?.content.regulation?.length ?? 0) +
                  (w?.content.market?.length ?? 0)
                }
                summary={w?.content.headlines?.[0]}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
