"use client";

import * as React from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import type { User } from "../types";

export function useUserSearch(users: User[]) {
  const [searchValue, setSearchValue] = React.useState("");
  const [displayUsers, setDisplayUsers] = React.useState<User[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);

  React.useEffect(() => {
    setDisplayUsers(users);
  }, [users]);

  const search = React.useCallback(async () => {
    const term = searchValue.trim();
    if (!term) {
      setDisplayUsers(users);
      return;
    }

    try {
      setIsSearching(true);
      const { data, error } = await authClient.admin.listUsers({
        query: {
          searchValue: term,
          searchField: "name",
          searchOperator: "contains",
          limit: 100,
          offset: 0,
          sortBy: "name",
          sortDirection: "desc",
        },
      });

      if (error) {
        toast.error("Search failed");
        return;
      }

      setDisplayUsers(data?.users ?? []);
    } catch (err) {
      console.error("Search error:", err);
      toast.error("Search error");
    } finally {
      setIsSearching(false);
    }
  }, [searchValue, users]);

  const clearSearch = React.useCallback(() => {
    setSearchValue("");
    setDisplayUsers(users);
  }, [users]);

  return {
    searchValue,
    setSearchValue,
    displayUsers,
    isSearching,
    search,
    clearSearch,
  };
}
