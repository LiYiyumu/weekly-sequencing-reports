import { Megaphone, Building2, Coins, Landmark, LineChart } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { IndustryContent } from "@/lib/types";

function SectionShell({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-2 space-y-0 pb-3">
        <Icon className="h-5 w-5 text-primary" />
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function IndustryBlock({ content }: { content: IndustryContent }) {
  const { headlines, company, financing, regulation, market } = content;

  return (
    <div className="space-y-6">
      {headlines?.length > 0 && (
        <SectionShell icon={Megaphone} title="本周头条">
          <ul className="space-y-2">
            {headlines.map((h, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </SectionShell>
      )}

      {company?.length > 0 && (
        <SectionShell icon={Building2} title="企业动态">
          <div className="space-y-5">
            {company.map((group, gi) => (
              <div key={gi}>
                <Badge variant="secondary" className="mb-2">
                  {group.cat}
                </Badge>
                <div className="space-y-4">
                  {group.items?.map((item, ii) => (
                    <div
                      key={ii}
                      className="rounded-lg border bg-muted/30 p-4"
                    >
                      <p className="font-medium">{item.prod}</p>
                      {item.highlights?.length > 0 && (
                        <ul className="mt-2 space-y-1.5">
                          {item.highlights.map((hl, hi) => (
                            <li
                              key={hi}
                              className="flex gap-2 text-sm leading-relaxed text-foreground/80"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {item.principle && (
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          <span className="font-medium text-foreground/90">
                            技术原理：
                          </span>
                          {item.principle}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionShell>
      )}

      {financing?.length > 0 && (
        <SectionShell icon={Coins} title="融资动态">
          <div className="space-y-3">
            {financing.map((row, i) => (
              <div key={i} className="rounded-lg border p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium">{row[0]}</span>
                  <Badge variant="success">{row[1]}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{row[2]}</p>
              </div>
            ))}
          </div>
        </SectionShell>
      )}

      {regulation?.length > 0 && (
        <SectionShell icon={Landmark} title="政策 / 监管">
          <div className="space-y-3">
            {regulation.map((row, i) => (
              <div key={i} className="rounded-lg border p-3">
                <p className="font-medium">{row[0]}</p>
                <p className="mt-1 text-sm text-muted-foreground">{row[1]}</p>
              </div>
            ))}
          </div>
        </SectionShell>
      )}

      {market?.length > 0 && (
        <SectionShell icon={LineChart} title="市场动态">
          <div className="space-y-3">
            {market.map((row, i) => (
              <div key={i} className="rounded-lg border p-3">
                <p className="font-medium">{row[0]}</p>
                <p className="mt-1 text-sm text-muted-foreground">{row[1]}</p>
              </div>
            ))}
          </div>
        </SectionShell>
      )}
    </div>
  );
}
