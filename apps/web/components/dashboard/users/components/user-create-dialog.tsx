"use client";

import * as React from "react";
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
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useUserForm } from "../hooks/use-user-form";

interface UserCreateDialogProps {
  onCreate: () => void;
}

export function UserCreateDialog({ onCreate }: UserCreateDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const {
    name,
    email,
    password,
    role,
    setName,
    setEmail,
    setPassword,
    setRole,
    reset,
    isValid,
    getRoleValue,
  } = useUserForm();

  const handleCreate = React.useCallback(async () => {
    if (!isValid) {
      toast.error("Name, email, and password are required");
      return;
    }

    try {
      setIsSubmitting(true);

      const { data: newUser, error } = await authClient.admin.createUser({
        email,
        password,
        name,
        role: getRoleValue(),
        data: {},
      });

      if (error) {
        toast.error("Failed to create user");
        return;
      }

      toast.success("User created");
      setOpen(false);
      reset();
      await onCreate();
    } catch (err) {
      console.error("Create user error:", err);
      toast.error("Error creating user");
    } finally {
      setIsSubmitting(false);
    }
  }, [email, name, password, getRoleValue, isValid, reset, onCreate]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create user</DialogTitle>
          <DialogDescription>
            Add a new user to your workspace.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              placeholder="user or admin"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleCreate} disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
