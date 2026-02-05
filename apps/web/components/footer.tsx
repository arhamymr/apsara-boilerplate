"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = mounted
    ? theme === "dark"
      ? "https://assets.apsaradigital.com/devkit-logo-white.png"
      : "https://assets.apsaradigital.com/devkit-logo.png"
    : "https://assets.apsaradigital.com/devkit-logo.png";

  return (
    <footer className="border-t bg-card mt-auto">
      <div className="px-4 md:px-6 py-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <Link
            href="https://apsaradigital.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3"
          >
            
            <span className="text-sm mb-1 text-muted-foreground hover:text-foreground transition-colors">
              build by
            </span>
            <img
              src={logoSrc}
              alt="Apsara React Boilerplate Logo"
              className="h-4 w-auto object-contain"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
