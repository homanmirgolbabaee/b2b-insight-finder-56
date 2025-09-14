import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

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
    // Set 1: Investment Focus
    { id: "ai", label: "AI", category: "industry", searchTerm: "AI companies" },
    { id: "fintech", label: "Fintech", category: "industry", searchTerm: "fintech startups" },
    { id: "saas", label: "SaaS", category: "industry", searchTerm: "SaaS companies" },
    { id: "seed", label: "Seed", category: "funding", searchTerm: "seed stage companies" },
    { id: "series-a", label: "Series A", category: "funding", searchTerm: "Series A companies" },
    { id: "growth", label: "Growth", category: "funding", searchTerm: "growth stage companies" },
  ],
  [
    // Set 2: Market Segments
    { id: "healthcare", label: "Healthcare", category: "industry", searchTerm: "healthcare companies" },
    { id: "enterprise", label: "Enterprise", category: "industry", searchTerm: "enterprise software" },
    { id: "consumer", label: "Consumer", category: "industry", searchTerm: "consumer companies" },
    { id: "series-b", label: "Series B", category: "funding", searchTerm: "Series B companies" },
    { id: "unicorn", label: "Unicorn", category: "size", searchTerm: "unicorn companies" },
    { id: "profitable", label: "Profitable", category: "size", searchTerm: "profitable companies" },
  ],
  [
    // Set 3: Geography & Timing
    { id: "usa", label: "USA", category: "location", searchTerm: "US companies" },
    { id: "europe", label: "Europe", category: "location", searchTerm: "European companies" },
    { id: "climate", label: "Climate", category: "industry", searchTerm: "climate tech companies" },
    { id: "biotech", label: "Biotech", category: "industry", searchTerm: "biotech companies" },
    { id: "recent", label: "Recent", category: "timeline", searchTerm: "recently funded" },
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
    <div className="w-full max-w-4xl mx-auto">
      {/* Simple Filter Bubbles */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto relative">
        {currentBubbles.map((bubble, index) => (
          <Button
            key={`${currentSetIndex}-${bubble.id}`}
            onClick={() => handleBubbleClick(bubble)}
            variant="outline"
            size="sm"
            className={`
              h-7 px-3 text-xs font-medium rounded-full transition-all duration-300 border-muted-foreground/20
              ${isSelected(bubble.id) 
                ? 'bg-primary text-primary-foreground border-primary' 
                : 'bg-background hover:bg-muted/50 hover:border-muted-foreground/30'
              }
              animate-fade-in
            `}
            style={{
              animationDelay: `${index * 60}ms`,
              animationDuration: isRefreshing ? '0.2s' : '0.4s'
            }}
          >
            {bubble.label}
          </Button>
        ))}
        
        {/* Refresh button */}
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          variant="ghost"
          size="sm"
          className="h-5 w-5 p-0 hover:bg-muted/50 transition-all duration-200 ml-2"
        >
          <RefreshCw className={`h-2.5 w-2.5 transition-all duration-500 ${isRefreshing ? 'animate-spin' : ''}`} />
        </Button>
      </div>
    </div>
  );
}