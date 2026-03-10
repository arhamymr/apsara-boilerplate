"use client";

import * as React from "react";
import type { User } from "./types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Spinner } from "@workspace/ui/components/spinner";
import { useUsers } from "./hooks/use-users";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@workspace/ui/components/dialog";
import { Label } from "@workspace/ui/components/label";
import { Search, Plus } from "lucide-react";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia } from "@workspace/ui/components/empty";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { Badge } from "@workspace/ui/components/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader as SheetHeaderUI,
  SheetTitle as SheetTitleUI,
  SheetDescription as SheetDescriptionUI,
} from "@workspace/ui/components/sheet";

export function UserManagementPage() {
  const { users, loading, refetch } = useUsers();

  const [displayUsers, setDisplayUsers] = React.useState<User[]>([]);
  const [searchValue, setSearchValue] = React.useState("");

  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = React.useState(false);

  React.useEffect(() => {
    setDisplayUsers(users);
  }, [users]);

  const handleSearch = React.useCallback(async () => {
    try {
      const term = searchValue.trim();
      if (!term) {
        setDisplayUsers(users);
        return;
      }

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
    }
  }, [searchValue, users]);

  const handleCreate = React.useCallback(async () => {
    try {
      if (!name.trim() || !email.trim() || !password.trim()) {
        toast.error("Name, email, and password are required");
        return;
      }

      setIsSubmitting(true);

      const normalizedRole = role.trim().toLowerCase();
      const roleValue = normalizedRole === "admin" ? "admin" : "user" as "user" | "admin";

      const { data: newUser, error } = await authClient.admin.createUser({
        email,
        password,
        name,
        role: roleValue,
        data: {},
      });

      if (error) {
        toast.error("Failed to create user");
        setIsSubmitting(false);
        return;
      }

      toast.success("User created");
      setIsCreateOpen(false);
      setName("");
      setEmail("");
      setRole("");
      setPassword("");

      await refetch();
    } catch (err) {
      console.error("Create user error:", err);
      toast.error("Error creating user");
    } finally {
      setIsSubmitting(false);
    }
  }, [name, email, role, password, refetch]);

  const openUserDrawer = React.useCallback(async (userId: string) => {
    try {
      setIsDrawerOpen(true);
      setIsUserLoading(true);
      setSelectedUser(null);
      setSelectedUserId(userId);

      const { data, error } = await authClient.admin.getUser({
        query: {
          id: userId,
        },
      });

      if (error) {
        toast.error("Failed to load user details");
        return;
      }

      // Some APIs return { user }, others return the user directly; normalize
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
          <p className="text-muted-foreground">Manage user roles and permissions</p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-[260px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-9 w-full"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  void handleSearch();
                }
              }}
            />
          </div>
          <Button variant="secondary" onClick={() => void handleSearch()}>Search</Button>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create user</DialogTitle>
                <DialogDescription>Add a new user to your workspace.</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" placeholder="user or admin" value={role} onChange={(e) => setRole(e.target.value)} />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={() => void handleCreate()} disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>List of all users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          {displayUsers.length === 0 ? (
            <Empty className="border">
              <EmptyHeader>
                <EmptyMedia variant="icon" />
                <EmptyTitle>No users found</EmptyTitle>
                <EmptyDescription>
                  Try adjusting your search or create a new user.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent />
            </Empty>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="cursor-pointer hover:bg-muted/40"
                    onClick={() => openUserDrawer(user.id)}
                  >
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.emailVerified ? (
                        <Badge variant="secondary">Verified</Badge>
                      ) : (
                        <Badge variant="outline">Unverified</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {(() => {
                        const d = new Date(user.createdAt as any);
                        return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
                      })()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent side="right" className="w-[380px] sm:w-[460px]">
          <SheetHeaderUI>
            <SheetTitleUI>User Details</SheetTitleUI>
            <SheetDescriptionUI>
              Detailed information for the selected user
            </SheetDescriptionUI>
          </SheetHeaderUI>

          {isUserLoading ? (
            <div className="flex items-center justify-center h-48">
              <Spinner className="h-6 w-6" />
            </div>
          ) : selectedUser ? (
            <div className="space-y-4 py-2">
              <div>
                <div className="text-sm text-muted-foreground">Name</div>
                <div className="text-base font-medium">{selectedUser.name}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <div className="text-base font-medium">{selectedUser.email}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Verified</div>
                <div className="text-base font-medium">
                  {selectedUser.emailVerified ? "Yes" : "No"}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Created</div>
                <div className="text-base font-medium">
                  {(() => {
                    const d = new Date(selectedUser.createdAt as any);
                    return isNaN(d.getTime()) ? "-" : d.toLocaleString();
                  })()}
                </div>
              </div>
              {selectedUser?.id && (
                <div>
                  <div className="text-sm text-muted-foreground">User ID</div>
                  <div className="text-xs font-mono break-all">{selectedUser.id}</div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No user selected.</div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
