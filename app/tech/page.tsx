import { FlaskConical } from "lucide-react";
import { WeekCard } from "@/components/week-card";
import { allWeeksOf, getTechWeek } from "@/lib/hub";

export const metadata = { title: "技术周报 · 测序周报" };

export default function TechListPage() {
  const weeks = allWeeksOf("tech");
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="mb-6">
        <div className="flex items-center gap-2 text-primary">
          <FlaskConical className="h-5 w-5" />
          <h1 className="text-2xl font-bold">测序技术周报</h1>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          每周 Top10 测序技术开发文献，含中文意译摘要、背景、技术原理、结论与解读。
        </p>
      </header>

      {weeks.length === 0 ? (
        <p className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          暂无技术周报数据，请先运行内容同步。
        </p>
      ) : (
        <div className="space-y-3">
          {weeks.map((iso) => {
            const w = getTechWeek(iso);
            return (
              <WeekCard
                key={iso}
                type="tech"
                iso={iso}
                start={w?.meta.weekStart ?? ""}
                end={w?.meta.weekEnding ?? ""}
                count={w?.content.length ?? 0}
                summary={w?.content[0]?.title}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
