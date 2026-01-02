"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Label } from "@workspace/ui/components/label"
import { Input } from "@workspace/ui/components/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { Badge } from "@workspace/ui/components/badge"
import { Download, Copy, Check, Palette, Type, Sparkles, RotateCcw, ChevronDown } from "lucide-react"
import { Separator } from "@workspace/ui/components/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui/components/collapsible"

const PALETTES = {
  default: {
    name: "Default",
    description: "Clean monochrome with teal accent",
    light: {
      background: "#ffffff",
      foreground: "#09090b",
      card: "#ffffff",
      cardForeground: "#09090b",
      primary: "#18181b",
      primaryForeground: "#fafafa",
      secondary: "#f4f4f5",
      secondaryForeground: "#18181b",
      accent: "#f4f4f5",
      accentForeground: "#18181b",
      muted: "#f4f4f5",
      mutedForeground: "#71717a",
      border: "#e4e4e7",
      input: "#e4e4e7",
      ring: "#a1a1aa",
    },
    dark: {
      background: "#09090b",
      foreground: "#fafafa",
      card: "#18181b",
      cardForeground: "#fafafa",
      primary: "#e4e4e7",
      primaryForeground: "#18181b",
      secondary: "#27272a",
      secondaryForeground: "#fafafa",
      accent: "#3f3f46",
      accentForeground: "#fafafa",
      muted: "#27272a",
      mutedForeground: "#a1a1aa",
      border: "rgba(255, 255, 255, 0.1)",
      input: "rgba(255, 255, 255, 0.15)",
      ring: "#71717a",
    },
  },
  ocean: {
    name: "Ocean Blue",
    description: "Calming blue tones",
    light: {
      background: "#ffffff",
      foreground: "#0f172a",
      card: "#ffffff",
      cardForeground: "#0f172a",
      primary: "#0ea5e9",
      primaryForeground: "#f0f9ff",
      secondary: "#e0f2fe",
      secondaryForeground: "#075985",
      accent: "#bae6fd",
      accentForeground: "#0c4a6e",
      muted: "#f1f5f9",
      mutedForeground: "#64748b",
      border: "#cbd5e1",
      input: "#e2e8f0",
      ring: "#0ea5e9",
    },
    dark: {
      background: "#020617",
      foreground: "#f8fafc",
      card: "#0f172a",
      cardForeground: "#f8fafc",
      primary: "#38bdf8",
      primaryForeground: "#0c4a6e",
      secondary: "#1e293b",
      secondaryForeground: "#f8fafc",
      accent: "#334155",
      accentForeground: "#f8fafc",
      muted: "#1e293b",
      mutedForeground: "#94a3b8",
      border: "#334155",
      input: "#1e293b",
      ring: "#38bdf8",
    },
  },
  forest: {
    name: "Forest Green",
    description: "Natural green palette",
    light: {
      background: "#ffffff",
      foreground: "#14532d",
      card: "#ffffff",
      cardForeground: "#14532d",
      primary: "#16a34a",
      primaryForeground: "#f0fdf4",
      secondary: "#dcfce7",
      secondaryForeground: "#15803d",
      accent: "#bbf7d0",
      accentForeground: "#166534",
      muted: "#f7fee7",
      mutedForeground: "#65a30d",
      border: "#d4d4d8",
      input: "#e4e4e7",
      ring: "#16a34a",
    },
    dark: {
      background: "#0a0f0a",
      foreground: "#f0fdf4",
      card: "#14532d",
      cardForeground: "#f0fdf4",
      primary: "#4ade80",
      primaryForeground: "#052e16",
      secondary: "#1a2e1a",
      secondaryForeground: "#f0fdf4",
      accent: "#16a34a",
      accentForeground: "#f0fdf4",
      muted: "#1a2e1a",
      mutedForeground: "#86efac",
      border: "#365314",
      input: "#1a2e1a",
      ring: "#4ade80",
    },
  },
  sunset: {
    name: "Sunset Orange",
    description: "Warm orange and amber",
    light: {
      background: "#ffffff",
      foreground: "#431407",
      card: "#ffffff",
      cardForeground: "#431407",
      primary: "#ea580c",
      primaryForeground: "#fff7ed",
      secondary: "#fed7aa",
      secondaryForeground: "#9a3412",
      accent: "#fdba74",
      accentForeground: "#7c2d12",
      muted: "#fef3c7",
      mutedForeground: "#92400e",
      border: "#e5e7eb",
      input: "#f3f4f6",
      ring: "#ea580c",
    },
    dark: {
      background: "#0f0a08",
      foreground: "#fff7ed",
      card: "#1c1917",
      cardForeground: "#fff7ed",
      primary: "#fb923c",
      primaryForeground: "#431407",
      secondary: "#292524",
      secondaryForeground: "#fff7ed",
      accent: "#44403c",
      accentForeground: "#fff7ed",
      muted: "#292524",
      mutedForeground: "#fdba74",
      border: "#44403c",
      input: "#292524",
      ring: "#fb923c",
    },
  },
  purple: {
    name: "Royal Purple",
    description: "Rich purple tones",
    light: {
      background: "#ffffff",
      foreground: "#3b0764",
      card: "#ffffff",
      cardForeground: "#3b0764",
      primary: "#9333ea",
      primaryForeground: "#faf5ff",
      secondary: "#f3e8ff",
      secondaryForeground: "#6b21a8",
      accent: "#e9d5ff",
      accentForeground: "#581c87",
      muted: "#f5f3ff",
      mutedForeground: "#7c3aed",
      border: "#e5e7eb",
      input: "#f3f4f6",
      ring: "#9333ea",
    },
    dark: {
      background: "#0a0414",
      foreground: "#faf5ff",
      card: "#1e1b4b",
      cardForeground: "#faf5ff",
      primary: "#a855f7",
      primaryForeground: "#3b0764",
      secondary: "#312e81",
      secondaryForeground: "#faf5ff",
      accent: "#4c1d95",
      accentForeground: "#faf5ff",
      muted: "#312e81",
      mutedForeground: "#c4b5fd",
      border: "#4c1d95",
      input: "#312e81",
      ring: "#a855f7",
    },
  },
  rose: {
    name: "Rose Pink",
    description: "Elegant rose and pink",
    light: {
      background: "#ffffff",
      foreground: "#4c0519",
      card: "#ffffff",
      cardForeground: "#4c0519",
      primary: "#e11d48",
      primaryForeground: "#fff1f2",
      secondary: "#fecdd3",
      secondaryForeground: "#9f1239",
      accent: "#fda4af",
      accentForeground: "#881337",
      muted: "#ffe4e6",
      mutedForeground: "#be123c",
      border: "#e5e7eb",
      input: "#f3f4f6",
      ring: "#e11d48",
    },
    dark: {
      background: "#0a0509",
      foreground: "#fff1f2",
      card: "#1f0a13",
      cardForeground: "#fff1f2",
      primary: "#fb7185",
      primaryForeground: "#4c0519",
      secondary: "#27141c",
      secondaryForeground: "#fff1f2",
      accent: "#4c1d24",
      accentForeground: "#fff1f2",
      muted: "#27141c",
      mutedForeground: "#fda4af",
      border: "#4c1d24",
      input: "#27141c",
      ring: "#fb7185",
    },
  },
  slate: {
    name: "Slate Gray",
    description: "Professional slate tones",
    light: {
      background: "#ffffff",
      foreground: "#0f172a",
      card: "#ffffff",
      cardForeground: "#0f172a",
      primary: "#475569",
      primaryForeground: "#f8fafc",
      secondary: "#e2e8f0",
      secondaryForeground: "#1e293b",
      accent: "#cbd5e1",
      accentForeground: "#334155",
      muted: "#f1f5f9",
      mutedForeground: "#64748b",
      border: "#cbd5e1",
      input: "#e2e8f0",
      ring: "#475569",
    },
    dark: {
      background: "#020617",
      foreground: "#f8fafc",
      card: "#0f172a",
      cardForeground: "#f8fafc",
      primary: "#94a3b8",
      primaryForeground: "#0f172a",
      secondary: "#1e293b",
      secondaryForeground: "#f8fafc",
      accent: "#334155",
      accentForeground: "#f8fafc",
      muted: "#1e293b",
      mutedForeground: "#94a3b8",
      border: "#334155",
      input: "#1e293b",
      ring: "#94a3b8",
    },
  },
  amber: {
    name: "Amber Gold",
    description: "Warm amber and gold",
    light: {
      background: "#ffffff",
      foreground: "#451a03",
      card: "#ffffff",
      cardForeground: "#451a03",
      primary: "#f59e0b",
      primaryForeground: "#fffbeb",
      secondary: "#fef3c7",
      secondaryForeground: "#78350f",
      accent: "#fde68a",
      accentForeground: "#92400e",
      muted: "#fef9c3",
      mutedForeground: "#a16207",
      border: "#e5e7eb",
      input: "#f3f4f6",
      ring: "#f59e0b",
    },
    dark: {
      background: "#0c0a09",
      foreground: "#fffbeb",
      card: "#1c1917",
      cardForeground: "#fffbeb",
      primary: "#fbbf24",
      primaryForeground: "#451a03",
      secondary: "#292524",
      secondaryForeground: "#fffbeb",
      accent: "#44403c",
      accentForeground: "#fffbeb",
      muted: "#292524",
      mutedForeground: "#fde68a",
      border: "#44403c",
      input: "#292524",
      ring: "#fbbf24",
    },
  },
  teal: {
    name: "Teal Aqua",
    description: "Fresh teal and aqua",
    light: {
      background: "#ffffff",
      foreground: "#134e4a",
      card: "#ffffff",
      cardForeground: "#134e4a",
      primary: "#14b8a6",
      primaryForeground: "#f0fdfa",
      secondary: "#ccfbf1",
      secondaryForeground: "#115e59",
      accent: "#99f6e4",
      accentForeground: "#0f766e",
      muted: "#f0fdfa",
      mutedForeground: "#0d9488",
      border: "#e5e7eb",
      input: "#f3f4f6",
      ring: "#14b8a6",
    },
    dark: {
      background: "#041716",
      foreground: "#f0fdfa",
      card: "#134e4a",
      cardForeground: "#f0fdfa",
      primary: "#5eead4",
      primaryForeground: "#042f2e",
      secondary: "#1a3a39",
      secondaryForeground: "#f0fdfa",
      accent: "#115e59",
      accentForeground: "#f0fdfa",
      muted: "#1a3a39",
      mutedForeground: "#99f6e4",
      border: "#134e4a",
      input: "#1a3a39",
      ring: "#5eead4",
    },
  },
  indigo: {
    name: "Indigo Blue",
    description: "Deep indigo and blue",
    light: {
      background: "#ffffff",
      foreground: "#1e1b4b",
      card: "#ffffff",
      cardForeground: "#1e1b4b",
      primary: "#6366f1",
      primaryForeground: "#eef2ff",
      secondary: "#e0e7ff",
      secondaryForeground: "#312e81",
      accent: "#c7d2fe",
      accentForeground: "#3730a3",
      muted: "#f5f3ff",
      mutedForeground: "#4f46e5",
      border: "#e5e7eb",
      input: "#f3f4f6",
      ring: "#6366f1",
    },
    dark: {
      background: "#0a0a1e",
      foreground: "#eef2ff",
      card: "#1e1b4b",
      cardForeground: "#eef2ff",
      primary: "#818cf8",
      primaryForeground: "#1e1b4b",
      secondary: "#312e81",
      secondaryForeground: "#eef2ff",
      accent: "#3730a3",
      accentForeground: "#eef2ff",
      muted: "#312e81",
      mutedForeground: "#c7d2fe",
      border: "#3730a3",
      input: "#312e81",
      ring: "#818cf8",
    },
  },
  emerald: {
    name: "Emerald Green",
    description: "Vibrant emerald and green",
    light: {
      background: "#ffffff",
      foreground: "#064e3b",
      card: "#ffffff",
      cardForeground: "#064e3b",
      primary: "#10b981",
      primaryForeground: "#ecfdf5",
      secondary: "#d1fae5",
      secondaryForeground: "#065f46",
      accent: "#a7f3d0",
      accentForeground: "#047857",
      muted: "#f0fdf4",
      mutedForeground: "#059669",
      border: "#e5e7eb",
      input: "#f3f4f6",
      ring: "#10b981",
    },
    dark: {
      background: "#021713",
      foreground: "#ecfdf5",
      card: "#064e3b",
      cardForeground: "#ecfdf5",
      primary: "#34d399",
      primaryForeground: "#022c22",
      secondary: "#1a3a32",
      secondaryForeground: "#ecfdf5",
      accent: "#065f46",
      accentForeground: "#ecfdf5",
      muted: "#1a3a32",
      mutedForeground: "#a7f3d0",
      border: "#065f46",
      input: "#1a3a32",
      ring: "#34d399",
    },
  },
  crimson: {
    name: "Crimson Red",
    description: "Bold crimson and red",
    light: {
      background: "#ffffff",
      foreground: "#450a0a",
      card: "#ffffff",
      cardForeground: "#450a0a",
      primary: "#dc2626",
      primaryForeground: "#fef2f2",
      secondary: "#fecaca",
      secondaryForeground: "#7f1d1d",
      accent: "#fca5a5",
      accentForeground: "#991b1b",
      muted: "#fee2e2",
      mutedForeground: "#b91c1c",
      border: "#e5e7eb",
      input: "#f3f4f6",
      ring: "#dc2626",
    },
    dark: {
      background: "#0a0404",
      foreground: "#fef2f2",
      card: "#450a0a",
      cardForeground: "#fef2f2",
      primary: "#f87171",
      primaryForeground: "#450a0a",
      secondary: "#27141c",
      secondaryForeground: "#fef2f2",
      accent: "#7f1d1d",
      accentForeground: "#fef2f2",
      muted: "#27141c",
      mutedForeground: "#fca5a5",
      border: "#7f1d1d",
      input: "#27141c",
      ring: "#f87171",
    },
  },
}

const DEFAULT_FONTS = {
  sans: "Geist",
  mono: "Geist Mono",
  serif: "Source Serif 4",
}

const DEFAULT_RADIUS = "0.625rem"

export default function ThemePage() {
  const [copied, setCopied] = useState(false)
  const [lightColors, setLightColors] = useState(PALETTES.default.light)
  const [darkColors, setDarkColors] = useState(PALETTES.default.dark)
  const [fonts, setFonts] = useState(DEFAULT_FONTS)
  const [radius, setRadius] = useState(DEFAULT_RADIUS)
  const [advancedOpen, setAdvancedOpen] = useState(false)

  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    const currentTheme = resolvedTheme || theme
    const isLight = currentTheme === "light"

    const colorsToApply = isLight ? lightColors : darkColors

    Object.entries(colorsToApply).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`
      root.style.setProperty(cssVar, value)
    })

    root.style.setProperty("--radius", radius)
  }, [lightColors, darkColors, radius, theme, resolvedTheme, mounted])

  const hexToOklch = (hex: string) => {
    return hex
  }

  const resetToDefault = () => {
    setLightColors(PALETTES.default.light)
    setDarkColors(PALETTES.default.dark)
    setFonts(DEFAULT_FONTS)
    setRadius(DEFAULT_RADIUS)

    const root = document.documentElement
    const currentTheme = resolvedTheme || theme
    const isLight = currentTheme === "light"
    const colorsToApply = isLight ? PALETTES.default.light : PALETTES.default.dark

    Object.entries(colorsToApply).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`
      root.style.setProperty(cssVar, value)
    })
  }

  const applyPalette = (paletteKey: keyof typeof PALETTES) => {
    const palette = PALETTES[paletteKey]
    setLightColors(palette.light)
    setDarkColors(palette.dark)

    const root = document.documentElement
    const currentTheme = resolvedTheme || theme
    const isLight = currentTheme === "light"
    const colorsToApply = isLight ? palette.light : palette.dark

    Object.entries(colorsToApply).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`
      root.style.setProperty(cssVar, value)
    })
  }

  const generateCSS = () => {
    return `@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: ${hexToOklch(lightColors.background)};
  --foreground: ${hexToOklch(lightColors.foreground)};
  --card: ${hexToOklch(lightColors.card)};
  --card-foreground: ${hexToOklch(lightColors.cardForeground)};
  --primary: ${hexToOklch(lightColors.primary)};
  --primary-foreground: ${hexToOklch(lightColors.primaryForeground)};
  --secondary: ${hexToOklch(lightColors.secondary)};
  --secondary-foreground: ${hexToOklch(lightColors.secondaryForeground)};
  --muted: ${hexToOklch(lightColors.muted)};
  --muted-foreground: ${hexToOklch(lightColors.mutedForeground)};
  --accent: ${hexToOklch(lightColors.accent)};
  --accent-foreground: ${hexToOklch(lightColors.accentForeground)};
  --border: ${hexToOklch(lightColors.border)};
  --input: ${hexToOklch(lightColors.input)};
  --ring: ${hexToOklch(lightColors.ring)};
  --radius: ${radius};
}

.dark {
  --background: ${hexToOklch(darkColors.background)};
  --foreground: ${hexToOklch(darkColors.foreground)};
  --card: ${hexToOklch(darkColors.card)};
  --card-foreground: ${hexToOklch(darkColors.cardForeground)};
  --primary: ${hexToOklch(darkColors.primary)};
  --primary-foreground: ${hexToOklch(darkColors.primaryForeground)};
  --secondary: ${hexToOklch(darkColors.secondary)};
  --secondary-foreground: ${hexToOklch(darkColors.secondaryForeground)};
  --muted: ${hexToOklch(darkColors.muted)};
  --muted-foreground: ${hexToOklch(darkColors.mutedForeground)};
  --accent: ${hexToOklch(darkColors.accent)};
  --accent-foreground: ${hexToOklch(darkColors.accentForeground)};
  --border: ${hexToOklch(darkColors.border)};
  --input: ${hexToOklch(darkColors.input)};
  --ring: ${hexToOklch(darkColors.ring)};
}

@theme inline {
  --font-sans: '${fonts.sans}', '${fonts.sans} Fallback';
  --font-mono: '${fonts.mono}', '${fonts.mono} Fallback';
  --font-serif: '${fonts.serif}', '${fonts.serif} Fallback';
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --radius-lg: var(--radius);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCSS())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadCSS = () => {
    const blob = new Blob([generateCSS()], { type: "text/css" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "globals.css"
    a.click()
    URL.revokeObjectURL(url)
  }

  const ColorInput = ({
    label,
    value,
    onChange,
  }: { label: string; value: string; onChange: (value: string) => void }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pr-12 font-mono text-sm"
          />
          <div
            className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded border border-border"
            style={{ backgroundColor: value }}
          />
        </div>
        <Input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-10 cursor-pointer"
        />
      </div>
    </div>
  )

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center">Loading theme customizer...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <Badge variant="secondary" className="mb-4">
          <Sparkles className="mr-1 h-3 w-3" />
          Theme Customizer
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Customize Your Theme</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Choose from pre-made palettes or customize colors, fonts, and styling. Changes apply to the entire website in
          real-time and respect your light/dark mode preference.
        </p>
      </div>

      {/* Theme Mode Indicator */}
      <div className="mb-6 text-center">
        <Badge variant="outline" className="text-sm">
          Currently editing: <strong className="ml-1">{resolvedTheme === "dark" ? "Dark" : "Light"} Mode</strong>
        </Badge>
        <p className="text-xs text-muted-foreground mt-2">
          Toggle dark/light mode in the navigation to see your customizations in both themes
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Generated CSS Output</CardTitle>
          <CardDescription>Copy or download your customized globals.css file</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm max-h-[400px] overflow-y-auto">
              <code>{generateCSS()}</code>
            </pre>
          </div>
          <div className="flex gap-2">
            <Button onClick={copyToClipboard} className="flex-1">
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy CSS
                </>
              )}
            </Button>
            <Button onClick={downloadCSS} variant="outline" className="flex-1 bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              Download CSS
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Pre-made Palettes</CardTitle>
              <CardDescription>Choose a palette to instantly transform your theme</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={resetToDefault}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset to Default
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(PALETTES).map(([key, palette]) => (
              <button
                key={key}
                onClick={() => applyPalette(key as keyof typeof PALETTES)}
                className="text-left p-4 rounded-lg border-2 hover:border-primary transition-colors group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{palette.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{palette.description}</p>
                  </div>
                  <Palette className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded border" style={{ backgroundColor: palette.light.primary }} />
                  <div className="h-8 w-8 rounded border" style={{ backgroundColor: palette.light.secondary }} />
                  <div className="h-8 w-8 rounded border" style={{ backgroundColor: palette.light.accent }} />
                  <div className="h-8 w-8 rounded border" style={{ backgroundColor: palette.light.muted }} />
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen} className="mb-6">
        <Card>
          <CardHeader>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <CardTitle>Advanced Customization</CardTitle>
                  <CardDescription>Fine-tune colors, typography, and styles manually</CardDescription>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${advancedOpen ? "rotate-180" : ""}`} />
              </div>
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent>
              <div className="grid lg:grid-cols-[1fr,400px] gap-6">
                {/* Customization Panel */}
                <div className="space-y-6">
                  <Tabs defaultValue="colors" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="colors">
                        <Palette className="mr-2 h-4 w-4" />
                        Colors
                      </TabsTrigger>
                      <TabsTrigger value="typography">
                        <Type className="mr-2 h-4 w-4" />
                        Typography
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="colors" className="space-y-6 mt-6">
                      {/* Light Mode Colors */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Light Mode Colors</CardTitle>
                          <CardDescription>Customize colors for light mode</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <ColorInput
                              label="Background"
                              value={lightColors.background}
                              onChange={(v) => setLightColors({ ...lightColors, background: v })}
                            />
                            <ColorInput
                              label="Foreground"
                              value={lightColors.foreground}
                              onChange={(v) => setLightColors({ ...lightColors, foreground: v })}
                            />
                            <ColorInput
                              label="Primary"
                              value={lightColors.primary}
                              onChange={(v) => setLightColors({ ...lightColors, primary: v })}
                            />
                            <ColorInput
                              label="Primary Foreground"
                              value={lightColors.primaryForeground}
                              onChange={(v) => setLightColors({ ...lightColors, primaryForeground: v })}
                            />
                            <ColorInput
                              label="Secondary"
                              value={lightColors.secondary}
                              onChange={(v) => setLightColors({ ...lightColors, secondary: v })}
                            />
                            <ColorInput
                              label="Accent"
                              value={lightColors.accent}
                              onChange={(v) => setLightColors({ ...lightColors, accent: v })}
                            />
                            <ColorInput
                              label="Muted"
                              value={lightColors.muted}
                              onChange={(v) => setLightColors({ ...lightColors, muted: v })}
                            />
                            <ColorInput
                              label="Border"
                              value={lightColors.border}
                              onChange={(v) => setLightColors({ ...lightColors, border: v })}
                            />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Dark Mode Colors */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Dark Mode Colors</CardTitle>
                          <CardDescription>Customize colors for dark mode</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <ColorInput
                              label="Background"
                              value={darkColors.background}
                              onChange={(v) => setDarkColors({ ...darkColors, background: v })}
                            />
                            <ColorInput
                              label="Foreground"
                              value={darkColors.foreground}
                              onChange={(v) => setDarkColors({ ...darkColors, foreground: v })}
                            />
                            <ColorInput
                              label="Primary"
                              value={darkColors.primary}
                              onChange={(v) => setDarkColors({ ...darkColors, primary: v })}
                            />
                            <ColorInput
                              label="Primary Foreground"
                              value={darkColors.primaryForeground}
                              onChange={(v) => setDarkColors({ ...darkColors, primaryForeground: v })}
                            />
                            <ColorInput
                              label="Secondary"
                              value={darkColors.secondary}
                              onChange={(v) => setDarkColors({ ...darkColors, secondary: v })}
                            />
                            <ColorInput
                              label="Accent"
                              value={darkColors.accent}
                              onChange={(v) => setDarkColors({ ...darkColors, accent: v })}
                            />
                            <ColorInput
                              label="Muted"
                              value={darkColors.muted}
                              onChange={(v) => setDarkColors({ ...darkColors, muted: v })}
                            />
                            <ColorInput
                              label="Border"
                              value={darkColors.border}
                              onChange={(v) => setDarkColors({ ...darkColors, border: v })}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="typography" className="space-y-6 mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Font Families</CardTitle>
                          <CardDescription>Customize font families for your theme</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>Sans Serif Font</Label>
                            <Input
                              value={fonts.sans}
                              onChange={(e) => setFonts({ ...fonts, sans: e.target.value })}
                              placeholder="e.g., Inter, Geist"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Monospace Font</Label>
                            <Input
                              value={fonts.mono}
                              onChange={(e) => setFonts({ ...fonts, mono: e.target.value })}
                              placeholder="e.g., Fira Code, Geist Mono"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Serif Font</Label>
                            <Input
                              value={fonts.serif}
                              onChange={(e) => setFonts({ ...fonts, serif: e.target.value })}
                              placeholder="e.g., Merriweather, Source Serif"
                            />
                          </div>
                          <Separator className="my-6" />
                          <div className="space-y-2">
                            <Label>Border Radius</Label>
                            <Input
                              value={radius}
                              onChange={(e) => setRadius(e.target.value)}
                              placeholder="e.g., 0.5rem, 8px"
                            />
                            <p className="text-xs text-muted-foreground">
                              Controls the roundness of UI elements (buttons, cards, inputs)
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Preview Panel */}
                <div className="lg:sticky lg:top-20 h-fit">
                  <Card>
                    <CardHeader>
                      <CardTitle>Live Preview</CardTitle>
                      <CardDescription>See how your theme looks</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div
                          className="p-4 rounded-lg border"
                          style={{
                            backgroundColor: resolvedTheme === "dark" ? darkColors.background : lightColors.background,
                            color: resolvedTheme === "dark" ? darkColors.foreground : lightColors.foreground,
                          }}
                        >
                          <p className="font-semibold mb-2">Background & Foreground</p>
                          <p className="text-sm opacity-75">This is how your text looks</p>
                        </div>
                        <div
                          className="p-4 rounded-lg"
                          style={{
                            backgroundColor: resolvedTheme === "dark" ? darkColors.primary : lightColors.primary,
                            color:
                              resolvedTheme === "dark" ? darkColors.primaryForeground : lightColors.primaryForeground,
                          }}
                        >
                          <p className="font-semibold">Primary</p>
                        </div>
                        <div
                          className="p-4 rounded-lg"
                          style={{
                            backgroundColor: resolvedTheme === "dark" ? darkColors.secondary : lightColors.secondary,
                            color:
                              resolvedTheme === "dark"
                                ? darkColors.secondaryForeground
                                : lightColors.secondaryForeground,
                          }}
                        >
                          <p className="font-semibold">Secondary</p>
                        </div>
                        <div
                          className="p-4 rounded-lg"
                          style={{
                            backgroundColor: resolvedTheme === "dark" ? darkColors.accent : lightColors.accent,
                            color:
                              resolvedTheme === "dark" ? darkColors.accentForeground : lightColors.accentForeground,
                          }}
                        >
                          <p className="font-semibold">Accent</p>
                        </div>
                        <div
                          className="p-4 rounded-lg"
                          style={{
                            backgroundColor: resolvedTheme === "dark" ? darkColors.muted : lightColors.muted,
                            color: resolvedTheme === "dark" ? darkColors.mutedForeground : lightColors.mutedForeground,
                          }}
                        >
                          <p className="font-semibold">Muted</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Font Preview</p>
                        <div className="space-y-1">
                          <p className="text-sm" style={{ fontFamily: fonts.sans }}>
                            Sans: The quick brown fox
                          </p>
                          <p className="text-sm" style={{ fontFamily: fonts.mono }}>
                            Mono: The quick brown fox
                          </p>
                          <p className="text-sm" style={{ fontFamily: fonts.serif }}>
                            Serif: The quick brown fox
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  )
}
