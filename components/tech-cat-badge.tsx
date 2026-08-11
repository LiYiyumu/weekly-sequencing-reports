import { Badge } from "@/components/ui/badge";
import type { TechCat } from "@/lib/types";

const MAP: Record<string, { label: string; variant: "info" | "warning" | "success" | "muted" }> = {
  second_gen: { label: "二代 / 短读长", variant: "info" },
  third_gen: { label: "三代 / 长读长", variant: "warning" },
  spatial: { label: "空间转录组", variant: "success" },
  other: { label: "其他", variant: "muted" },
};

export function TechCatBadge({ cat }: { cat: TechCat | string }) {
  const key = typeof cat === "string" && cat in MAP ? cat : "other";
  const { label, variant } = MAP[key] ?? MAP.other;
  return <Badge variant={variant}>{label}</Badge>;
}
