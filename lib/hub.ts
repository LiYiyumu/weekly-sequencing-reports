import fs from "fs";
import path from "path";
import type {
  HubIndex,
  TechWeek,
  IndustryWeek,
  WeekStatus,
  ReportType,
} from "./types";

// 内容仓库位置：默认读取站点内的 content/（由 npm run sync 从统一仓库同步而来，
// 可自包含部署）；如需直接消费 D 盘统一仓库，可设置 HUB_DIR 环境变量。
const HUB = process.env.HUB_DIR || path.join(process.cwd(), "content");

function readJson<T>(rel: string): T | null {
  const p = path.join(HUB, rel);
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, "utf-8")) as T;
  } catch {
    return null;
  }
}

export function getIndex(): HubIndex {
  const idx = readJson<HubIndex>("index.json");
  if (!idx) {
    return {
      generatedAt: "",
      hub: HUB,
      weeks: [],
      gaps: ["content/ 缺失：请先运行 `npm run sync` 从统一内容仓库同步"],
    };
  }
  return idx;
}

export function getTechWeek(iso: string): TechWeek | null {
  return readJson<TechWeek>(`tech/${iso}.json`);
}

export function getIndustryWeek(iso: string): IndustryWeek | null {
  return readJson<IndustryWeek>(`industry/${iso}.json`);
}

/** 周次列表，按 ISO 周降序（最新在前） */
export function getWeeks(): WeekStatus[] {
  return [...getIndex().weeks].sort((a, b) => b.isoWeek.localeCompare(a.isoWeek));
}

export function latestWeek(type: ReportType): WeekStatus | null {
  return getWeeks().find((w) => w[type].json) ?? null;
}

export function allWeeksOf(type: ReportType): string[] {
  return getWeeks()
    .filter((w) => w[type].json)
    .map((w) => w.isoWeek);
}

export function weekLabel(iso: string): string {
  const m = iso.match(/(\d{4})-W(\d{2})/);
  if (!m) return iso;
  return `${m[1]} 第 ${parseInt(m[2], 10)} 周`;
}

export function dateRange(start: string, end: string): string {
  return `${start} ～ ${end}`;
}

export function docUrl(type: ReportType, iso: string): string {
  return `/docs/${type}/${iso}.docx`;
}
