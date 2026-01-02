"use client"

import type React from "react"

import { Card, CardContent } from "@workspace/ui/components/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { CodeBlock } from "@workspace/ui/components/code-block"
import { CopyButton } from "@workspace/ui/components/copy-button"

interface ComponentPreviewProps {
  component: React.ReactNode
  code: string
}

export function ComponentPreview({ component, code }: ComponentPreviewProps) {
  return (
    <Tabs defaultValue="preview" className="w-full">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="mt-4">
        <Card>
          <CardContent className="p-6 min-h-[200px] flex items-center justify-center">{component}</CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="code" className="mt-4">
        <div className="relative">
          <div className="absolute right-2 top-2 z-10">
            <CopyButton code={code} className="h-8 px-2" />
          </div>
          <CodeBlock code={code || "// No code available"} language="tsx" />
        </div>
      </TabsContent>
    </Tabs>
  )
}
