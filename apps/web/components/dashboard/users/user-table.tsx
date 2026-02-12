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
import { UserRowActions } from "./user-row-actions";

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
  onViewDetails?: (user: User) => void;
  onVerifyEmail?: (user: User) => void;
  onUnverifyEmail?: (user: User) => void;
  onDeleteUser?: (user: User) => void;
}

export function UserTable({
  users,
  attributeDescriptions,
  onAssignAttribute,
  onViewDetails,
  onVerifyEmail,
  onUnverifyEmail,
  onDeleteUser,
}: UserTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Attributes</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="text-right">Actions</TableHead>
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
              {(() => {
                const d = new Date(user.createdAt as any);
                return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
              })()}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <AttributeAssigner
                  user={user}
                  attributeDescriptions={attributeDescriptions}
                  onAssignAttribute={onAssignAttribute}
                />
                <UserRowActions
                  user={user}
                  onViewDetails={onViewDetails ? (u) => onViewDetails(u as any) : undefined}
                  onVerifyEmail={onVerifyEmail ? (u) => onVerifyEmail(u as any) : undefined}
                  onUnverifyEmail={onUnverifyEmail ? (u) => onUnverifyEmail(u as any) : undefined}
                  onDeleteUser={onDeleteUser ? (u) => onDeleteUser(u as any) : undefined}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
