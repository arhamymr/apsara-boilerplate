"use client";

import * as React from "react";
import { RequireAttribute } from "@/lib/auth/require-attribute";
import { ATTRIBUTE_TYPES } from "@/lib/auth/attribute-types";
import { Button } from "@workspace/ui/components/button";
import { Lock } from "lucide-react";
import { SettingsSectionCard } from "./settings-section-card";
import { SystemInfoCard } from "./system-info-card";

const settingsSections = [
  {
    id: "general",
    title: "General Settings",
    description: "Basic system configuration",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 1.54l4.24 4.24M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 1.54l4.24 4.24"></path>
      </svg>
    ),
    items: [
      { name: "Site Name", description: "The name of your application" },
      { name: "Site URL", description: "The base URL of your application" },
      { name: "Time Zone", description: "Set your local time zone" },
    ],
  },
  {
    id: "security",
    title: "Security Settings",
    description: "Security and authentication configuration",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
    items: [
      {
        name: "Session Timeout",
        description: "Configure user session duration",
      },
      { name: "Password Policy", description: "Set password requirements" },
      { name: "Two-Factor Auth", description: "Enable 2FA for all users" },
    ],
  },
  {
    id: "database",
    title: "Database Settings",
    description: "Database connection and maintenance",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
      </svg>
    ),
    items: [
      {
        name: "Connection Pool",
        description: "Configure database connection pool",
      },
      { name: "Backup Schedule", description: "Set automatic backup schedule" },
      {
        name: "Maintenance Mode",
        description: "Enable/disable maintenance mode",
      },
    ],
  },
  {
    id: "notifications",
    title: "Notification Settings",
    description: "Configure email and push notifications",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    ),
    items: [
      { name: "SMTP Settings", description: "Configure email server settings" },
      { name: "Email Templates", description: "Customize notification emails" },
      {
        name: "Notification Frequency",
        description: "Set default notification frequency",
      },
    ],
  },
  {
    id: "api",
    title: "API Settings",
    description: "API configuration and access control",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 6v6l4 2"></path>
      </svg>
    ),
    items: [
      { name: "Rate Limiting", description: "Configure API rate limits" },
      { name: "API Keys", description: "Manage API access keys" },
      { name: "Webhooks", description: "Configure webhook endpoints" },
    ],
  },
  {
    id: "logging",
    title: "Logging & Monitoring",
    description: "System logs and monitoring configuration",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
    ),
    items: [
      { name: "Log Level", description: "Set logging verbosity" },
      { name: "Log Retention", description: "Configure log retention period" },
      { name: "Error Reporting", description: "Configure error notifications" },
    ],
  },
];

export function SettingsPage() {
  return (
    <RequireAttribute attribute={ATTRIBUTE_TYPES.SYSTEM_SETTINGS}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage system configuration and preferences
            </p>
          </div>
          <Button variant="outline">
            <Lock className="mr-2 h-4 w-4" />
            Export Configuration
          </Button>
        </div>

        <div className="grid gap-6">
          {settingsSections.map((section) => (
            <SettingsSectionCard key={section.id} section={section} />
          ))}
        </div>

        <SystemInfoCard />
      </div>
    </RequireAttribute>
  );
}
