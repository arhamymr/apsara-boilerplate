import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { Badge } from "@workspace/ui/components/badge";
import { AttributeAssigner } from "./attribute-assigner";

interface Attribute {
  id: string;
  name: string;
  description: string | null;
}

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  attributes: Attribute[];
}

interface UserTableProps {
  users: User[];
  attributeDescriptions: Record<
    string,
    {
      name: string;
      description: string;
      icon: React.ComponentType<{ className?: string }>;
      color: string;
    }
  >;
  onAssignAttribute: (userId: string, attributeName: string) => void;
}

export function UserTable({
  users,
  attributeDescriptions,
  onAssignAttribute,
}: UserTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Attributes</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {user.attributes.map((attr) => {
                  const config =
                    attributeDescriptions[
                      attr.name as keyof typeof attributeDescriptions
                    ];
                  if (!config) return null;
                  const Icon = config.icon;
                  return (
                    <Badge
                      key={attr.id}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Icon className="h-3 w-3" />
                      {config.name}
                    </Badge>
                  );
                })}
                {user.attributes.length === 0 && (
                  <Badge variant="outline">No attributes</Badge>
                )}
              </div>
            </TableCell>
            <TableCell>
              <AttributeAssigner
                user={user}
                attributeDescriptions={attributeDescriptions}
                onAssignAttribute={onAssignAttribute}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
