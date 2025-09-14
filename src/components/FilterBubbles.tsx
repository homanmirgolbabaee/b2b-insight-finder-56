import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilterBubble {
  id: string;
  label: string;
  category: string;
  searchTerm: string;
}

interface FilterBubblesProps {
  onFilterSelect: (searchTerm: string) => void;
  selectedFilters: FilterBubble[];
  onFilterRemove: (filterId: string) => void;
  onClearAll: () => void;
}

const filterBubbles: FilterBubble[] = [
  // Industries
  { id: "ai", label: "AI", category: "industry", searchTerm: "AI companies" },
  { id: "fintech", label: "Fintech", category: "industry", searchTerm: "fintech startups" },
  { id: "healthcare", label: "Healthcare", category: "industry", searchTerm: "healthcare companies" },
  { id: "saas", label: "SaaS", category: "industry", searchTerm: "SaaS companies" },
  { id: "ecommerce", label: "E-commerce", category: "industry", searchTerm: "e-commerce companies" },
  
  // Funding Stages
  { id: "seed", label: "Seed", category: "funding", searchTerm: "seed funding" },
  { id: "series-a", label: "Series A", category: "funding", searchTerm: "Series A funding" },
  { id: "series-b", label: "Series B", category: "funding", searchTerm: "Series B funding" },
  { id: "growth", label: "Growth", category: "funding", searchTerm: "growth stage companies" },
  
  // Size
  { id: "startup", label: "Startup", category: "size", searchTerm: "early stage startups" },
  { id: "scaleup", label: "Scale-up", category: "size", searchTerm: "scale-up companies" },
  { id: "unicorn", label: "Unicorn", category: "size", searchTerm: "unicorn companies" },
  
  // Location
  { id: "usa", label: "USA", category: "location", searchTerm: "companies in USA" },
  { id: "europe", label: "Europe", category: "location", searchTerm: "European companies" },
  { id: "asia", label: "Asia", category: "location", searchTerm: "Asian companies" },
  
  // Timeline
  { id: "2024", label: "2024", category: "timeline", searchTerm: "companies in 2024" },
  { id: "2023", label: "2023", category: "timeline", searchTerm: "companies in 2023" },
  { id: "recent", label: "Recent", category: "timeline", searchTerm: "recent companies" },
];

export function FilterBubbles({ onFilterSelect, selectedFilters, onFilterRemove, onClearAll }: FilterBubblesProps) {
  const [hoveredBubble, setHoveredBubble] = useState<string | null>(null);

  const handleBubbleClick = (bubble: FilterBubble) => {
    const isSelected = selectedFilters.some(f => f.id === bubble.id);
    if (isSelected) {
      onFilterRemove(bubble.id);
    } else {
      onFilterSelect(bubble.searchTerm);
    }
  };

  const isSelected = (bubbleId: string) => selectedFilters.some(f => f.id === bubbleId);

  return (
    <div className="w-full max-w-5xl mx-auto mb-8">
      {/* Selected Filters */}
      {selectedFilters.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-text-secondary">Applied filters:</span>
          {selectedFilters.map((filter) => (
            <Badge
              key={filter.id}
              variant="secondary"
              className="flex items-center gap-2 py-1 px-3 bg-primary/10 text-primary border-primary/20"
            >
              {filter.label}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onFilterRemove(filter.id)}
                className="h-4 w-4 p-0 hover:bg-transparent"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          <Button
            size="sm"
            variant="ghost"
            onClick={onClearAll}
            className="text-xs text-text-secondary hover:text-text-primary"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Filter Bubbles Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
        {filterBubbles.map((bubble, index) => (
          <Button
            key={bubble.id}
            onClick={() => handleBubbleClick(bubble)}
            onMouseEnter={() => setHoveredBubble(bubble.id)}
            onMouseLeave={() => setHoveredBubble(null)}
            variant="outline"
            className={`
              relative h-auto py-3 px-4 text-xs font-medium rounded-full transition-all duration-200
              ${isSelected(bubble.id) 
                ? 'bg-primary text-primary-foreground border-primary shadow-sm' 
                : 'bg-background hover:bg-muted border-muted-foreground/20 hover:border-muted-foreground/40'
              }
              ${hoveredBubble === bubble.id ? 'scale-105' : ''}
              animate-fade-in
            `}
            style={{
              animationDelay: `${index * 50}ms`
            }}
          >
            <span className="whitespace-nowrap">{bubble.label}</span>
            {isSelected(bubble.id) && (
              <div className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full border-2 border-background" />
            )}
          </Button>
        ))}
      </div>

      {/* Helper Text */}
      <p className="text-xs text-text-secondary mt-4 text-center">
        Click on tags to build your search query, or type directly in the search bar
      </p>
    </div>
  );
}