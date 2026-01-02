"use client"

import { Card, CardContent } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { FileText, ImageIcon, Video, Music, Download } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface FileItem {
  name: string
  type: "document" | "image" | "video" | "audio"
  size: string
  date: string
}

interface FileManagerProps {
  files: FileItem[]
  onDownload?: (file: FileItem) => void
}

export function FileManager({ files, onDownload }: FileManagerProps) {
  const getFileIcon = (type: FileItem["type"]): LucideIcon => {
    switch (type) {
      case "document":
        return FileText
      case "image":
        return ImageIcon
      case "video":
        return Video
      case "audio":
        return Music
      default:
        return FileText
    }
  }

  const getFileColor = (type: FileItem["type"]) => {
    switch (type) {
      case "document":
        return "text-blue-500"
      case "image":
        return "text-green-500"
      case "video":
        return "text-purple-500"
      case "audio":
        return "text-orange-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {files.map((file, idx) => {
        const Icon = getFileIcon(file.type)
        return (
          <Card key={idx}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`${getFileColor(file.type)}`}>
                  <Icon className="h-8 w-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {file.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{file.size}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{file.date}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => onDownload?.(file)}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
