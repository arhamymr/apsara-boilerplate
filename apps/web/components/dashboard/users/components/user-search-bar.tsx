"use client";

import * as React from "react";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Search } from "lucide-react";

interface UserSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  disabled?: boolean;
}

export function UserSearchBar({
  value,
  onChange,
  onSearch,
  disabled,
}: UserSearchBarProps) {
  return (
    <div className="flex items-center gap-2 w-full sm:w-auto">
      <div className="relative w-full sm:w-[260px]">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          className="pl-9 w-full"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
          disabled={disabled}
        />
      </div>
      <Button variant="secondary" onClick={onSearch} disabled={disabled}>
        Search
      </Button>
    </div>
  );
}
