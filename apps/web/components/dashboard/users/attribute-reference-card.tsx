import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

interface AttributeReferenceCardProps {
  attributeDescriptions: Record<
    string,
    {
      name: string;
      description: string;
      icon: React.ComponentType<{ className?: string }>;
      color: string;
    }
  >;
}

export function AttributeReferenceCard({
  attributeDescriptions,
}: AttributeReferenceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attribute Reference</CardTitle>
        <CardDescription>
          Overview of all available attributes and their permissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(attributeDescriptions).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <div
                key={key}
                className="flex items-start space-x-3 p-4 border rounded-lg"
              >
                <div className={`p-2 rounded-lg ${config.color}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">{config.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {config.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
