"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Github } from "lucide-react";

const navItems: { name: string; href: string }[] = [];

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <>
      <nav className="hidden md:flex items-center gap-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "text-foreground bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="hidden md:flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="sm" asChild>
          <Link
            href="https://github.com/arhamymr/apsara-devkit"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </Link>
        </Button>
        <Button asChild>
          <Link href="/login">Login (Demo Feature)</Link>
        </Button>
      </div>
    </>
  );
}
