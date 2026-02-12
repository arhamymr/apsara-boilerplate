"use client";

import * as React from "react";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog";
import { MoreHorizontal, Eye, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

export interface Attribute {
  id: string;
  name: string;
  description: string | null;
}

export interface UserRowModel {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  attributes: Attribute[];
}

interface UserRowActionsProps {
  user: UserRowModel;
  onViewDetails?: (user: UserRowModel) => void;
  onVerifyEmail?: (user: UserRowModel) => void;
  onUnverifyEmail?: (user: UserRowModel) => void;
  onDeleteUser?: (user: UserRowModel) => void;
}

export function UserRowActions({
  user,
  onViewDetails,
  onVerifyEmail,
  onUnverifyEmail,
  onDeleteUser,
}: UserRowActionsProps) {
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const handleView = () => {
    onViewDetails?.(user);
  };

  const handleVerifyToggle = () => {
    if (user.emailVerified) {
      onUnverifyEmail?.(user);
      toast.success("Email marked as unverified");
    } else {
      onVerifyEmail?.(user);
      toast.success("Email verified");
    }
  };

  const handleDelete = () => {
    onDeleteUser?.(user);
    toast.success("User deleted (placeholder)");
    setConfirmOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open row actions">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onSelect={handleView} className="gap-2">
            <Eye className="h-4 w-4" />
            View details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleVerifyToggle} className="gap-2">
            {user.emailVerified ? (
              <>
                <XCircle className="h-4 w-4" /> Unverify email
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" /> Verify email
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setConfirmOpen(true);
                }}
                className="gap-2 text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4" /> Delete user
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this user?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the user
                  "{user.email}" and remove their data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:opacity-90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
