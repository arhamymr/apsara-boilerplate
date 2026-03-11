"use client";

import * as React from "react";
import { normalizeUserRole } from "../lib/user-utils";

export function useUserForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("");

  const reset = React.useCallback(() => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
  }, []);

  const isValid = React.useMemo(() => {
    return name.trim() !== "" && email.trim() !== "" && password.trim() !== "";
  }, [name, email, password]);

  const getRoleValue = React.useCallback(() => {
    return normalizeUserRole(role);
  }, [role]);

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole,
    reset,
    isValid,
    getRoleValue,
  };
}
