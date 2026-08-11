import { SearchClient, type SearchEntry } from "@/components/search-client";
import {
  allWeeksOf,
  getTechWeek,
  getIndustryWeek,
  weekLabel,
} from "@/lib/hub";

export const metadata = { title: "检索 · 测序周报" };

export default function SearchPage() {
  const entries: SearchEntry[] = [];

  for (const week of allWeeksOf("tech")) {
    const w = getTechWeek(week);
    if (!w) continue;
    const wl = weekLabel(week);
    for (const p of w.content) {
      const body = [
        p.abstract_cn,
        p.interpretation,
        p.background,
        p.tech_principle,
        p.main_conclusion,
        p.abstract,
      ]
        .filter(Boolean)
        .join(" ");
      entries.push({
        type: "tech",
        week,
        weekLabel: wl,
        title: p.title,
        body,
        href: `/tech/${week}`,
        cat: p.tech_cat,
      });
    }
  }

  for (const week of allWeeksOf("industry")) {
    const w = getIndustryWeek(week);
    if (!w) continue;
    const wl = weekLabel(week);
    const c = w.content;
    for (const h of c.headlines ?? []) {
      entries.push({
        type: "industry",
        week,
        weekLabel: wl,
        title: h,
        body: h,
        href: `/industry/${week}`,
      });
    }
    for (const g of c.company ?? []) {
      for (const item of g.items ?? []) {
        entries.push({
          type: "industry",
          week,
          weekLabel: wl,
          title: item.prod,
          body: [...(item.highlights ?? []), item.principle].filter(Boolean).join(" "),
          href: `/industry/${week}`,
        });
      }
    }
    for (const row of c.financing ?? []) {
      entries.push({
        type: "industry",
        week,
        weekLabel: wl,
        title: row[0],
        body: `${row[1]} ${row[2]}`,
        href: `/industry/${week}`,
      });
    }
    for (const row of c.regulation ?? []) {
      entries.push({
        type: "industry",
        week,
        weekLabel: wl,
        title: row[0],
        body: row[1],
        href: `/industry/${week}`,
      });
    }
    for (const row of c.market ?? []) {
      entries.push({
        type: "industry",
        week,
        weekLabel: wl,
        title: row[0],
        body: row[1],
        href: `/industry/${week}`,
      });
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">全文检索</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          跨全部技术周报与行业周报检索关键词（标题 / 摘要 / 企业 / 动态）。
        </p>
      </header>
      <SearchClient data={entries} />
    </div>
  );
}
