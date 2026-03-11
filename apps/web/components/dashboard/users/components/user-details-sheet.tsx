"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader as SheetHeaderUI,
  SheetTitle as SheetTitleUI,
  SheetDescription as SheetDescriptionUI,
} from "@workspace/ui/components/sheet";
import { Spinner } from "@workspace/ui/components/spinner";
import type { User } from "../types";
import { formatUserDateTime } from "../lib/user-utils";

interface UserDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  isLoading: boolean;
}

export function UserDetailsSheet({
  open,
  onOpenChange,
  user,
  isLoading,
}: UserDetailsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[380px] sm:w-[460px]">
        <SheetHeaderUI>
          <SheetTitleUI>User Details</SheetTitleUI>
          <SheetDescriptionUI>
            Detailed information for the selected user
          </SheetDescriptionUI>
        </SheetHeaderUI>

        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <Spinner className="h-6 w-6" />
          </div>
        ) : user ? (
          <div className="space-y-4 py-2">
            <div>
              <div className="text-sm text-muted-foreground">Name</div>
              <div className="text-base font-medium">{user.name}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="text-base font-medium">{user.email}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Verified</div>
              <div className="text-base font-medium">
                {user.emailVerified ? "Yes" : "No"}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Created</div>
              <div className="text-base font-medium">
                {formatUserDateTime(user.createdAt)}
              </div>
            </div>
            {user?.id && (
              <div>
                <div className="text-sm text-muted-foreground">User ID</div>
                <div className="text-xs font-mono break-all">{user.id}</div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">No user selected.</div>
        )}
      </SheetContent>
    </Sheet>
  );
}
