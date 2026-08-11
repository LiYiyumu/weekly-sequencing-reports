export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            测序周报 · 周更平台 — 自动汇集「测序技术周报」与「测序行业周报」。
          </p>
          <p className="text-xs">
            数据来源：本地自动化产出 · 静态生成 · 仅供内部参阅
          </p>
        </div>
      </div>
    </footer>
  );
}
