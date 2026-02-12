import * as React from "react";
import { ATTRIBUTE_TYPES } from "./attribute-types";

interface RequireAttributeProps {
  attribute: (typeof ATTRIBUTE_TYPES)[keyof typeof ATTRIBUTE_TYPES];
  children: React.ReactNode;
}

export function RequireAttribute({ children }: RequireAttributeProps) {
  return <>{children}</>;
}
