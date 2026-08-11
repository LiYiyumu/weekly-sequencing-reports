import Link from "next/link";
import { Dna, FlaskConical, Newspaper, Archive, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/tech", label: "技术周报", icon: FlaskConical },
  { href: "/industry", label: "行业周报", icon: Newspaper },
  { href: "/archive", label: "归档", icon: Archive },
  { href: "/search", label: "检索", icon: Search },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Dna className="h-5 w-5" />
          </span>
          <span className="hidden sm:inline">测序周报</span>
        </Link>

        <nav className="ml-2 flex flex-1 items-center gap-1 overflow-x-auto">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
