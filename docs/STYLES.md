# Styling Guide

## Overview

This project uses Tailwind CSS v4 with a centralized design token system. Global styles are defined in the UI package and shared across all apps.

## Global Styles Location

```
packages/ui/src/styles/globals.css
```

This file is the single source of truth for:

- CSS custom properties (design tokens)
- Light/dark theme color schemes
- Tailwind theme configuration
- Base layer styles

## Importing Global Styles

In your app's layout file:

```tsx
// apps/web/app/layout.tsx
import "@workspace/ui/styles/globals.css";
```

## Design Tokens

### Colors

The following color tokens are available:

| Token                      | Light Value               | Dark Value                |
| -------------------------- | ------------------------- | ------------------------- |
| `--background`             | oklch(1 0 0)              | oklch(0.145 0 0)          |
| `--foreground`             | oklch(0.145 0 0)          | oklch(0.985 0 0)          |
| `--primary`                | oklch(0.205 0 0)          | oklch(0.985 0 0)          |
| `--primary-foreground`     | oklch(0.985 0 0)          | oklch(0.205 0 0)          |
| `--secondary`              | oklch(0.97 0 0)           | oklch(0.269 0 0)          |
| `--secondary-foreground`   | oklch(0.205 0 0)          | oklch(0.985 0 0)          |
| `--muted`                  | oklch(0.97 0 0)           | oklch(0.269 0 0)          |
| `--muted-foreground`       | oklch(0.556 0 0)          | oklch(0.708 0 0)          |
| `--accent`                 | oklch(0.97 0 0)           | oklch(0.269 0 0)          |
| `--accent-foreground`      | oklch(0.205 0 0)          | oklch(0.985 0 0)          |
| `--destructive`            | oklch(0.577 0.245 27.325) | oklch(0.396 0.141 25.723) |
| `--destructive-foreground` | oklch(0.577 0.245 27.325) | oklch(0.637 0.237 25.331) |
| `--border`                 | oklch(0.922 0 0)          | oklch(0.269 0 0)          |
| `--input`                  | oklch(0.922 0 0)          | oklch(0.269 0 0)          |
| `--ring`                   | oklch(0.708 0 0)          | oklch(0.556 0 0)          |

### Chart Colors

Five chart colors are available for data visualizations:

| Token       | Light Value               | Dark Value                 |
| ----------- | ------------------------- | -------------------------- |
| `--chart-1` | oklch(0.646 0.222 41.116) | oklch(0.488 0.243 264.376) |
| `--chart-2` | oklch(0.6 0.118 184.704)  | oklch(0.696 0.17 162.48)   |
| `--chart-3` | oklch(0.398 0.07 227.392) | oklch(0.769 0.188 70.08)   |
| `--chart-4` | oklch(0.828 0.189 84.429) | oklch(0.627 0.265 303.9)   |
| `--chart-5` | oklch(0.769 0.188 70.08)  | oklch(0.645 0.246 16.439)  |

### Sidebar Colors

Dedicated tokens for dashboard sidebar styling:

| Token                          | Light Value      | Dark Value                 |
| ------------------------------ | ---------------- | -------------------------- |
| `--sidebar`                    | oklch(0.985 0 0) | oklch(0.205 0 0)           |
| `--sidebar-foreground`         | oklch(0.145 0 0) | oklch(0.985 0 0)           |
| `--sidebar-primary`            | oklch(0.205 0 0) | oklch(0.488 0.243 264.376) |
| `--sidebar-primary-foreground` | oklch(0.985 0 0) | oklch(0.985 0 0)           |
| `--sidebar-accent`             | oklch(0.97 0 0)  | oklch(0.269 0 0)           |
| `--sidebar-accent-foreground`  | oklch(0.205 0 0) | oklch(0.985 0 0)           |
| `--sidebar-border`             | oklch(0.922 0 0) | oklch(0.269 0 0)           |
| `--sidebar-ring`               | oklch(0.708 0 0) | oklch(0.439 0 0)           |

### Other Tokens

| Token         | Value                     |
| ------------- | ------------------------- |
| `--radius`    | 0.625rem                  |
| `--radius-sm` | calc(var(--radius) - 4px) |
| `--radius-md` | calc(var(--radius) - 2px) |
| `--radius-lg` | var(--radius)             |
| `--radius-xl` | calc(var(--radius) + 4px) |

## Tailwind Theme Mapping

CSS variables are mapped to Tailwind utility classes:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  /* ... more mappings */
}
```

This allows using utility classes like `bg-background`, `text-foreground`, `border-border`, etc.

## Component Scanning

The globals.css uses `@source` directives to automatically scan for Tailwind classes:

```css
@source "../../../apps/**/*.{ts,tsx}";
@source "../../../components/**/*.{ts,tsx}";
@source "../../../packages/**/*.{ts,tsx}";
@source "../**/*.{ts,tsx}";
```

This ensures all components across the monorepo are included in Tailwind's JIT compilation.

## Dark Mode

Dark mode is handled via the `.dark` class on the html element:

```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... other dark theme tokens */
}
```

The `ThemeProvider` component handles adding/removing this class:

```tsx
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
  {children}
</ThemeProvider>
```

## Custom Variants

A custom dark variant is available for complex selectors:

```css
@custom-variant dark (&:is(.dark *));
```

This enables syntax like `dark:bg-background` for nested dark mode styling.

## Base Styles

The `@layer base` section applies default styles:

```css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## Adding New Tokens

To add new design tokens:

1. Add the token to `:root` for light mode
2. Add the token to `.dark` for dark mode
3. Add to `@theme inline` mapping (if using with Tailwind utilities)

Example:

```css
:root {
  --my-new-token: oklch(0.5 0.1 200);
}

.dark {
  --my-new-token: oklch(0.6 0.1 200);
}

@theme inline {
  --color-my-new-token: var(--my-new-token);
}
```

Then use in components:

```tsx
<div className="bg-my-new-token text-my-new-token">Content</div>
```
