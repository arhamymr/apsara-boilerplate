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
import { Users, Settings, Shield, Eye, FolderOpen } from "lucide-react";
import { toast } from "sonner";
import { UserSearch } from "./user-search";
import { UserTable } from "./user-table";
import { AttributeReferenceCard } from "./attribute-reference-card";

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

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      // This would be an API call to fetch users with attributes
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

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <RequireAttribute attribute={ATTRIBUTE_TYPES.MANAGE_USERS}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl tracking-tight">User Management</h1>
            <p className="text-muted-foreground">
              Manage user roles and permissions
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Assign attributes to control user access to different parts of the
              system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserSearch
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <UserTable
              users={filteredUsers}
              attributeDescriptions={attributeDescriptions}
              onAssignAttribute={assignAttribute}
            />
          </CardContent>
        </Card>

        <AttributeReferenceCard attributeDescriptions={attributeDescriptions} />
      </div>
    </RequireAttribute>
  );
}
