export type TechCat = "second_gen" | "third_gen" | "spatial" | "other";

export interface Paper {
  title: string;
  link: string;
  abstract: string;
  abstract_cn: string;
  interpretation: string;
  background: string;
  tech_principle: string;
  main_conclusion: string;
  source: string;
  journal: string;
  authors: string;
  date: string;
  doi: string;
  pmid: string;
  score: number;
  if_label: string;
  tech_cat: TechCat | string;
}

export interface WeekMeta {
  type: "tech" | "industry";
  isoWeek: string;
  year: number;
  week: number;
  weekStart: string;
  weekEnding: string;
  generatedAt: string;
  source?: Record<string, string | null>;
}

export interface TechWeek {
  meta: WeekMeta;
  content: Paper[];
}

export interface IndustryCompanyItem {
  prod: string;
  highlights: string[];
  principle: string;
}

export interface IndustryCompanyGroup {
  cat: string;
  items: IndustryCompanyItem[];
}

export interface IndustryContent {
  headlines: string[];
  company: IndustryCompanyGroup[];
  financing: [string, string, string][];
  regulation: [string, string][];
  market: [string, string][];
}

export interface IndustryWeek {
  meta: WeekMeta;
  content: IndustryContent;
}

export interface WeekStatus {
  isoWeek: string;
  industry: { docx: boolean; json: boolean };
  tech: { docx: boolean; json: boolean };
}

export interface HubIndex {
  generatedAt: string;
  hub: string;
  weeks: WeekStatus[];
  gaps: string[];
}

export type ReportType = "tech" | "industry";
