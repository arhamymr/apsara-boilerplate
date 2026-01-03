"use client";

import * as React from "react";
import { Button } from "@workspace/ui/components/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { Menu } from "lucide-react";
import { codeSnippets } from "@/lib/showcase-code-snippets";
import {
  sectionsData,
  buttonsData,
  formsData,
  cardsData,
  overlaysData,
} from "@/lib/showcase-data";
import {
  ComponentsSidebar,
  categories,
} from "@/components/showcase/components-sidebar";
import { CategoryFilter } from "@/components/showcase/category-filter";
import { ComponentGrid } from "@/components/showcase/component-grid";

export function ComponentsShowcase() {
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [activeComponent, setActiveComponent] = React.useState<string | null>(
    null,
  );
  const componentRefs = React.useRef<Record<string, HTMLDivElement | null>>({});

  const components = React.useMemo(
    () => [
      ...sectionsData,
      ...buttonsData,
      ...formsData,
      ...cardsData,
      ...overlaysData,
    ],
    [],
  );

  const handleComponentSelect = (id: string) => {
    setActiveComponent(id);
    setActiveCategory("all");
    componentRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleRef = (id: string, el: HTMLDivElement | null) => {
    componentRefs.current[id] = el;
  };

  const filteredComponents =
    activeCategory === "all"
      ? components
      : components.filter((c) => c.category === activeCategory);

  return (
    <div className="flex gap-6">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-20 h-[calc(100vh-6rem)]">
        <ComponentsSidebar
          components={components}
          activeComponent={activeComponent}
          onSelect={handleComponentSelect}
        />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full shadow-lg bg-transparent"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <ComponentsSidebar
            components={components}
            activeComponent={activeComponent}
            onSelect={handleComponentSelect}
            className="h-full"
          />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 space-y-8">
        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Components Grid */}
        <ComponentGrid
          components={filteredComponents}
          codeSnippets={codeSnippets}
          onRef={handleRef}
        />
      </div>
    </div>
  );
}
