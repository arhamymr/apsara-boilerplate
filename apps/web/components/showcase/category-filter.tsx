"use client"

import { Button } from "@workspace/ui/components/button"

interface Category {
  id: string
  name: string
  count?: number
}

interface CategoryFilterProps {
  categories: Category[]
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          variant={activeCategory === category.id ? "default" : "outline"}
          size="sm"
        >
          {category.name}
        </Button>
      ))}
    </div>
  )
}
