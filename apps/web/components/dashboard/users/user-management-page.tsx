"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { RequireAttribute } from "@/lib/auth/require-attribute";
import { ATTRIBUTE_TYPES } from "@/lib/auth/attribute-types";
import { Users, Settings, Shield, Eye, FolderOpen, MailCheck, MailX } from "lucide-react";
import { toast } from "sonner";
import { UserTable } from "./user-table";
import { AttributeReferenceCard } from "./attribute-reference-card";
import { UserActionBar, type VerifiedFilter } from "./user-action-bar";
import { Badge } from "@workspace/ui/components/badge";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@workspace/ui/components/empty";
import { Spinner } from "@workspace/ui/components/spinner";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@workspace/ui/components/drawer";
import { AttributeAssigner } from "./attribute-assigner";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  attributes: Array<{
    id: string;
    name: string;
    description: string | null;
  }>;
}

const attributeDescriptions = {
  [ATTRIBUTE_TYPES.VIEW_ANALYTICS]: {
    name: "View Analytics",
    description: "Can view analytics and reports",
    icon: Eye,
    color: "bg-blue-500",
  },
  [ATTRIBUTE_TYPES.MANAGE_PROJECTS]: {
    name: "Manage Projects",
    description: "Can create, edit, and manage projects",
    icon: FolderOpen,
    color: "bg-green-500",
  },
  [ATTRIBUTE_TYPES.MANAGE_USERS]: {
    name: "Manage Users",
    description: "Can manage user accounts and permissions",
    icon: Users,
    color: "bg-purple-500",
  },
  [ATTRIBUTE_TYPES.SYSTEM_SETTINGS]: {
    name: "System Settings",
    description: "Can access and modify system settings",
    icon: Settings,
    color: "bg-red-500",
  },
};

export function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [verified, setVerified] = useState<VerifiedFilter>("all");
  const [attribute, setAttribute] = useState<string | "all">("all");

  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:2222"}/api/users/with-attributes`,
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data.data || []);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  // Assign attribute to user
  const assignAttribute = async (userId: string, attributeName: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:2222"}/api/user-attributes/assign-by-name`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            attributeName,
          }),
        },
      );

      if (response.ok) {
        toast.success("Attribute assigned successfully");
        await fetchUsers();
      } else {
        toast.error("Failed to assign attribute");
      }
    } catch (error) {
      console.error("Error assigning attribute:", error);
      toast.error("Error assigning attribute");
    }
  };

  // Remove attribute from user
  const removeAttribute = async (userId: string, attributeId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:2222"}/api/user-attributes/unassign`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            attributeId,
          }),
        },
      );

      if (response.ok) {
        toast.success("Attribute removed successfully");
        await fetchUsers();
      } else {
        toast.error("Failed to remove attribute");
      }
    } catch (error) {
      console.error("Error removing attribute:", error);
      toast.error("Error removing attribute");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filters
  const attributeOptions = React.useMemo(
    () =>
      Object.entries(attributeDescriptions).map(([key, cfg]) => ({
        value: key,
        label: cfg.name,
      })),
    [],
  );

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((user) => {
      if (verified === "verified") return user.emailVerified;
      if (verified === "unverified") return !user.emailVerified;
      return true;
    })
    .filter((user) => {
      if (attribute === "all") return true;
      return user.attributes.some((attr) => attr.name === attribute);
    });

  // Row actions handlers (UI-only placeholders)
  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setDetailOpen(true);
  };

  const handleVerifyEmail = (user: User) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, emailVerified: true } : u)),
    );
    toast.success("Email verified");
  };

  const handleUnverifyEmail = (user: User) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, emailVerified: false } : u)),
    );
    toast.success("Email marked as unverified");
  };

  const handleDeleteUser = (user: User) => {
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
    toast.success("User deleted (placeholder)");
    if (selectedUser?.id === user.id) {
      setDetailOpen(false);
      setSelectedUser(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <RequireAttribute attribute={ATTRIBUTE_TYPES.MANAGE_USERS}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl tracking-tight">User Management</h1>
            <p className="text-muted-foreground">Manage user roles and permissions</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Assign attributes and manage verification state. Filters do not change server data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <UserActionBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                verified={verified}
                onVerifiedChange={setVerified}
                attribute={attribute}
                onAttributeChange={setAttribute}
                attributeOptions={attributeOptions}
              />

              {filteredUsers.length === 0 ? (
                <Empty>
                  <EmptyHeader>
                    <EmptyTitle>No users found</EmptyTitle>
                    <EmptyDescription>Try adjusting your search or filters.</EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : (
                <UserTable
                  users={filteredUsers}
                  attributeDescriptions={attributeDescriptions}
                  onAssignAttribute={assignAttribute}
                  onViewDetails={handleViewDetails}
                  onVerifyEmail={handleVerifyEmail}
                  onUnverifyEmail={handleUnverifyEmail}
                  onDeleteUser={handleDeleteUser}
                />
              )}
            </div>
          </CardContent>
        </Card>

        <AttributeReferenceCard attributeDescriptions={attributeDescriptions} />

        <Drawer open={detailOpen} onOpenChange={setDetailOpen}>
          <DrawerContent>
            {selectedUser ? (
              <div className="space-y-6">
                <DrawerHeader>
                  <DrawerTitle>{selectedUser.name}</DrawerTitle>
                  <DrawerDescription>{selectedUser.email}</DrawerDescription>
                </DrawerHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Account</h3>
                    <div className="flex items-center gap-2 text-sm">
                      {selectedUser.emailVerified ? (
                        <Badge variant="secondary" className="gap-1">
                          <MailCheck className="h-3 w-3" /> Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          <MailX className="h-3 w-3" /> Unverified
                        </Badge>
                      )}
                      <span className="text-muted-foreground">
                        Joined {new Date(selectedUser.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Attributes</h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedUser.attributes.length > 0 ? (
                        selectedUser.attributes.map((attr) => {
                          const cfg = (attributeDescriptions as Record<string, any>)[
                            attr.name
                          ];
                          if (!cfg) return null;
                          const Icon = cfg.icon;
                          return (
                            <Badge key={attr.id} variant="secondary" className="gap-1">
                              <Icon className="h-3 w-3" /> {cfg.name}
                            </Badge>
                          );
                        })
                      ) : (
                        <Badge variant="outline">No attributes</Badge>
                      )}
                    </div>

                    <AttributeAssigner
                      user={selectedUser}
                      attributeDescriptions={attributeDescriptions}
                      onAssignAttribute={(uId, attrName) => {
                        assignAttribute(uId, attrName);
                      }}
                    />
                  </div>
                </div>

                <DrawerFooter>
                  <DrawerClose className="btn btn-secondary">Close</DrawerClose>
                </DrawerFooter>
              </div>
            ) : null}
          </DrawerContent>
        </Drawer>
      </div>
    </RequireAttribute>
  );
}
