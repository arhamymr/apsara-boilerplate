export const ATTRIBUTE_TYPES = {
  VIEW_ANALYTICS: "view_analytics",
  MANAGE_PROJECTS: "manage_projects",
  MANAGE_USERS: "manage_users",
  SYSTEM_SETTINGS: "system_settings",
} as const;

export type AttributeType =
  (typeof ATTRIBUTE_TYPES)[keyof typeof ATTRIBUTE_TYPES];

export interface Attribute {
  id: string;
  name: AttributeType;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithAttributes {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  attributes: Attribute[];
}

export interface EnhancedUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  attributes: Attribute[];
}

export interface EnhancedSession {
  user: EnhancedUser;
  expiresAt: Date;
}

export interface CreateAttributeRequest {
  name: AttributeType;
  description?: string;
}

export interface AssignAttributeRequest {
  userId: string;
  attributeId: string;
  assignedBy?: string;
}

export interface APIResponse<T = any> {
  status: string;
  message?: string;
  data?: T;
  endpoints?: Record<string, string>;
}
