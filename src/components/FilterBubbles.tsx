import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, RefreshCw } from "lucide-react";

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

const filterBubbleSets = [
  [
    // Set 1: Popular Industries & Stages
    { id: "ai", label: "AI Companies", category: "industry", searchTerm: "AI companies with recent funding" },
    { id: "fintech", label: "Fintech", category: "industry", searchTerm: "fintech startups" },
    { id: "saas", label: "SaaS", category: "industry", searchTerm: "SaaS companies" },
    { id: "seed", label: "Seed Stage", category: "funding", searchTerm: "seed funding companies" },
    { id: "series-a", label: "Series A", category: "funding", searchTerm: "Series A companies" },
    { id: "unicorn", label: "Unicorns", category: "size", searchTerm: "unicorn companies" },
    { id: "usa", label: "USA", category: "location", searchTerm: "companies in USA" },
    { id: "2024", label: "2024", category: "timeline", searchTerm: "companies founded in 2024" },
  ],
  [
    // Set 2: Emerging Tech & Growth
    { id: "healthcare", label: "HealthTech", category: "industry", searchTerm: "healthcare technology companies" },
    { id: "crypto", label: "Web3", category: "industry", searchTerm: "web3 and crypto companies" },
    { id: "climate", label: "Climate Tech", category: "industry", searchTerm: "climate technology companies" },
    { id: "series-b", label: "Series B", category: "funding", searchTerm: "Series B funding companies" },
    { id: "growth", label: "Growth Stage", category: "funding", searchTerm: "growth stage companies" },
    { id: "europe", label: "Europe", category: "location", searchTerm: "European companies" },
    { id: "remote", label: "Remote", category: "location", searchTerm: "remote-first companies" },
    { id: "recent", label: "Recent", category: "timeline", searchTerm: "recently funded companies" },
  ],
  [
    // Set 3: Specialized Sectors
    { id: "ecommerce", label: "E-commerce", category: "industry", searchTerm: "e-commerce companies" },
    { id: "edtech", label: "EdTech", category: "industry", searchTerm: "education technology companies" },
    { id: "logistics", label: "Logistics", category: "industry", searchTerm: "logistics and supply chain companies" },
    { id: "biotech", label: "Biotech", category: "industry", searchTerm: "biotechnology companies" },
    { id: "enterprise", label: "Enterprise", category: "size", searchTerm: "enterprise software companies" },
    { id: "asia", label: "Asia", category: "location", searchTerm: "Asian companies" },
    { id: "acquired", label: "Acquired", category: "timeline", searchTerm: "recently acquired companies" },
    { id: "ipo", label: "IPO Ready", category: "timeline", searchTerm: "IPO ready companies" },
  ]
];

export function FilterBubbles({ onFilterSelect, selectedFilters, onFilterRemove, onClearAll }: FilterBubblesProps) {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hoveredBubble, setHoveredBubble] = useState<string | null>(null);

  const currentBubbles = filterBubbleSets[currentSetIndex];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Animation delay
    setCurrentSetIndex((prev) => (prev + 1) % filterBubbleSets.length);
    setIsRefreshing(false);
  };

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
    <div className="w-full max-w-6xl mx-auto mt-8">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-text-primary">Quick Search Ideas</h3>
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-muted transition-all duration-200"
          >
            <RefreshCw className={`h-4 w-4 transition-all duration-500 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <span className="text-sm text-text-secondary">
          Click on tags to build your search query
        </span>
      </div>

      {/* Selected Filters */}
      {selectedFilters.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-text-secondary">Applied filters:</span>
          {selectedFilters.map((filter) => (
            <Badge
              key={filter.id}
              variant="secondary"
              className="flex items-center gap-2 py-1 px-3 bg-primary/10 text-primary border-primary/20 animate-fade-in"
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
        {currentBubbles.map((bubble, index) => (
          <Button
            key={`${currentSetIndex}-${bubble.id}`}
            onClick={() => handleBubbleClick(bubble)}
            onMouseEnter={() => setHoveredBubble(bubble.id)}
            onMouseLeave={() => setHoveredBubble(null)}
            variant="outline"
            className={`
              relative h-auto py-3 px-4 text-sm font-medium rounded-full transition-all duration-300
              ${isSelected(bubble.id) 
                ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105' 
                : 'bg-background hover:bg-muted border-muted-foreground/20 hover:border-muted-foreground/40 hover:scale-105'
              }
              ${hoveredBubble === bubble.id ? 'shadow-lg' : ''}
              animate-fade-in
            `}
            style={{
              animationDelay: `${index * 80}ms`,
              animationDuration: isRefreshing ? '0.3s' : '0.5s'
            }}
          >
            <span className="whitespace-nowrap">{bubble.label}</span>
            {isSelected(bubble.id) && (
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full border-2 border-background animate-scale-in" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}