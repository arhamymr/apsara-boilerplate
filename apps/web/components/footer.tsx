"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col items-center justify-center">
          <Link
            href="https://apsaradigital.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            build by apsaradigital.com
          </Link>
        </div>
      </div>
    </footer>
  );
}
