import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { FilterBubble, filterBubbleSets } from "@/data/filterBubbles";

interface FilterBubblesProps {
  onFilterSelect: (searchTerm: string) => void;
  selectedFilters: FilterBubble[];
  onFilterRemove: (filterId: string) => void;
  onClearAll: () => void;
}

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