"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Spinner } from "@workspace/ui/components/spinner";
import { useUsers } from "./hooks/use-users";
import { useUserSearch } from "./hooks/use-user-search";
import { UserSearchBar } from "./components/user-search-bar";
import { UsersTable } from "./components/users-table";
import { UserCreateDialog } from "./components/user-create-dialog";
import { UserDetailsSheet } from "./components/user-details-sheet";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import type { User } from "./types";

export function UserManagementPage() {
  const { users, loading, refetch } = useUsers();
  const { searchValue, setSearchValue, displayUsers, isSearching, search } =
    useUserSearch(users);

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = React.useState(false);

  const openUserDrawer = React.useCallback(async (userId: string) => {
    try {
      setIsDrawerOpen(true);
      setIsUserLoading(true);
      setSelectedUser(null);

      const { data, error } = await authClient.admin.getUser({
        query: {
          id: userId,
        },
      });

      if (error) {
        toast.error("Failed to load user details");
        return;
      }

      const detail = (data as any)?.user ?? (data as any);
      setSelectedUser(detail ?? null);
    } catch (err) {
      console.error("Get user error:", err);
      toast.error("Error loading user details");
    } finally {
      setIsUserLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-3xl tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage user roles and permissions
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <UserSearchBar
            value={searchValue}
            onChange={setSearchValue}
            onSearch={search}
            disabled={isSearching}
          />
          <UserCreateDialog onCreate={refetch} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>List of all users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <UsersTable users={displayUsers} onUserClick={openUserDrawer} />
        </CardContent>
      </Card>

      <UserDetailsSheet
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        user={selectedUser}
        isLoading={isUserLoading}
      />
    </div>
  );
}
