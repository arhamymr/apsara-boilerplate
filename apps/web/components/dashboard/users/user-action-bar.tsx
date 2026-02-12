"use client";

import * as React from "react";
import { Input } from "@workspace/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";

export type VerifiedFilter = "all" | "verified" | "unverified";

export interface AttributeOption {
  value: string;
  label: string;
}

interface UserActionBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;

  verified: VerifiedFilter;
  onVerifiedChange: (value: VerifiedFilter) => void;

  attribute: string | "all";
  onAttributeChange: (value: string | "all") => void;

  attributeOptions: AttributeOption[];
}

export function UserActionBar({
  searchTerm,
  onSearchChange,
  verified,
  onVerifiedChange,
  attribute,
  onAttributeChange,
  attributeOptions,
}: UserActionBarProps) {
  return (
    <div className="flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        <label htmlFor="user-search" className="sr-only">
          Search users
        </label>
        <Input
          id="user-search"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-[280px]"
        />
      </div>

      <div className="flex items-center gap-2">
        <Select
          value={verified}
          onValueChange={(v) => onVerifiedChange(v as VerifiedFilter)}
        >
          <SelectTrigger aria-label="Filter by verification status" className="w-[180px]">
            <SelectValue placeholder="Verified: All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="unverified">Unverified</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={attribute}
          onValueChange={(v) => onAttributeChange(v as string | "all")}
        >
          <SelectTrigger aria-label="Filter by attribute" className="w-[220px]">
            <SelectValue placeholder="Attribute: All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All attributes</SelectItem>
            {attributeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
