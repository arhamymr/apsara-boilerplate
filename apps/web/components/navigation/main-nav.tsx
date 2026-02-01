"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { DesktopNav } from "@/components/navigation/desktop-nav";
import { MobileNav } from "@/components/navigation/mobile-nav";

export function MainNav() {
  const pathname = usePathname();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? resolvedTheme || theme : "light";
  const logoSrc =
    currentTheme === "dark"
      ? "https://assets.apsaradigital.com/devkit-logo-white.png"
      : "https://assets.apsaradigital.com/devkit-logo.png";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <img
            src={logoSrc || "https://assets.apsaradigital.com/devkit-logo.png"}
            alt="Apsara React Boilerplate Logo"
            className="h-4 w-auto object-contain"
          />
        </Link>

        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  );
}
