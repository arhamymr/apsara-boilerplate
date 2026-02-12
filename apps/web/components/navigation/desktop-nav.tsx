"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Github, User, LogOut } from "lucide-react";
import { useSession, authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";

const navItems: { name: string; href: string }[] = [];

export function DesktopNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

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
        <Button variant="ghost" size="sm" asChild>
          <Link
            href="https://github.com/arhamymr/apsara-devkit"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </Link>
        </Button>

        {session?.user ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={session.user.image || undefined}
                      alt={session.user.name || "User"}
                    />
                    <AvatarFallback>
                      {session.user.name ? getInitials(session.user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {session.user.name || "User"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {session.user.email || "user@example.com"}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button asChild>
            <Link href="/login">Sign in (Demo Feature)</Link>
          </Button>
        )}

        <ThemeToggle />
      </div>
    </>
  );
}
