import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { ATTRIBUTE_TYPES } from "@/lib/auth/attribute-types";

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

interface AttributeAssignerProps {
  user: User;
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

export function AttributeAssigner({
  user,
  attributeDescriptions,
  onAssignAttribute,
}: AttributeAssignerProps) {
  return (
    <Select
      onValueChange={(value) => {
        if (value) {
          onAssignAttribute(user.id, value);
        }
      }}
    >
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Assign attribute" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(attributeDescriptions).map(([key, config]) => {
          const hasAttribute = user.attributes.some(
            (attr) => attr.name === key,
          );
          return (
            <SelectItem key={key} value={key} disabled={hasAttribute}>
              <div className="flex items-center gap-2">
                <config.icon className="h-4 w-4" />
                {config.name}
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
