"use client";

import * as React from "react";
import { useUserAttributes, hasAttribute } from "@/lib/auth/auth-client";
import { ATTRIBUTE_TYPES } from "@/lib/auth/attribute-types";

interface RequireAttributeProps {
  attribute: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RequireAttribute({
  attribute,
  children,
  fallback = null,
}: RequireAttributeProps) {
  const { user, hasAttribute: checkAttribute, isLoading } = useUserAttributes();
  const [canAccess, setCanAccess] = React.useState(false);
  const [checking, setChecking] = React.useState(true);

  React.useEffect(() => {
    if (!user) {
      setCanAccess(false);
      setChecking(false);
      return;
    }

    const checkPermission = async () => {
      if (!user) {
        setCanAccess(false);
        setChecking(false);
        return;
      }
      const hasAttr = await checkAttribute(attribute);
      setCanAccess(hasAttr);
      setChecking(false);
    };

    checkPermission();
  }, [user, attribute, checkAttribute]);

  if (isLoading || checking) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!canAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

interface RequireAnyAttributeProps {
  attributes: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RequireAnyAttribute({
  attributes,
  children,
  fallback = null,
}: RequireAnyAttributeProps) {
  const { user, hasAttribute: checkAttribute, isLoading } = useUserAttributes();
  const [canAccess, setCanAccess] = React.useState(false);
  const [checking, setChecking] = React.useState(true);

  React.useEffect(() => {
    if (!user) {
      setCanAccess(false);
      setChecking(false);
      return;
    }

    const checkPermissions = async () => {
      const results = await Promise.all(
        attributes.map((attr) => checkAttribute(attr)),
      );
      const hasAny = results.some((result) => result);
      setCanAccess(hasAny);
      setChecking(false);
    };

    checkPermissions();
  }, [user, attributes, checkAttribute]);

  if (isLoading || checking) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!canAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

interface RequireAllAttributesProps {
  attributes: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RequireAllAttributes({
  attributes,
  children,
  fallback = null,
}: RequireAllAttributesProps) {
  const { user, hasAttribute: checkAttribute, isLoading } = useUserAttributes();
  const [canAccess, setCanAccess] = React.useState(false);
  const [checking, setChecking] = React.useState(true);

  React.useEffect(() => {
    if (!user) {
      setCanAccess(false);
      setChecking(false);
      return;
    }

    const checkPermissions = async () => {
      const results = await Promise.all(
        attributes.map((attr) => checkAttribute(attr)),
      );
      const hasAll = results.every((result) => result);
      setCanAccess(hasAll);
      setChecking(false);
    };

    checkPermissions();
  }, [user, attributes, checkAttribute]);

  if (isLoading || checking) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!canAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Custom hooks for specific attributes
export function useCanViewAnalytics() {
  const { user, hasAttribute: checkAttribute } = useUserAttributes();
  const [canView, setCanView] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const check = async () => {
      const result = await checkAttribute(ATTRIBUTE_TYPES.VIEW_ANALYTICS);
      setCanView(result);
      setLoading(false);
    };
    check();
  }, [checkAttribute]);

  return { canView, loading };
}

export function useCanManageProjects() {
  const { user, hasAttribute: checkAttribute } = useUserAttributes();
  const [canManage, setCanManage] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const check = async () => {
      const result = await checkAttribute(ATTRIBUTE_TYPES.MANAGE_PROJECTS);
      setCanManage(result);
      setLoading(false);
    };
    check();
  }, [checkAttribute]);

  return { canManage, loading };
}

export function useCanManageUsers() {
  const { user, hasAttribute: checkAttribute } = useUserAttributes();
  const [canManage, setCanManage] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const check = async () => {
      const result = await checkAttribute(ATTRIBUTE_TYPES.MANAGE_USERS);
      setCanManage(result);
      setLoading(false);
    };
    check();
  }, [checkAttribute]);

  return { canManage, loading };
}

export function useCanAccessSettings() {
  const { user, hasAttribute: checkAttribute } = useUserAttributes();
  const [canAccess, setCanAccess] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const check = async () => {
      const result = await checkAttribute(ATTRIBUTE_TYPES.SYSTEM_SETTINGS);
      setCanAccess(result);
      setLoading(false);
    };
    check();
  }, [checkAttribute]);

  return { canAccess, loading };
}
