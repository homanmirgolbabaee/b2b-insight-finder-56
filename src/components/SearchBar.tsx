import { useState, useRef, useEffect } from "react";
import { Search, Grid3X3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { FilterBubbles } from "./FilterBubbles";
import { FilterBubble, allFilterBubbles } from "@/data/filterBubbles";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  showCardMode: boolean;
  onToggleMode: (cardMode: boolean) => void;
  heroMode?: boolean;
}

export function SearchBar({ onSearch, isLoading, showCardMode, onToggleMode, heroMode = false }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<FilterBubble[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);


  const handleFilterSelect = (searchTerm: string) => {
    const bubble = allFilterBubbles.find(b => b.searchTerm === searchTerm);
    
    if (bubble && !selectedFilters.some(f => f.id === bubble.id)) {
      const newFilters = [...selectedFilters, bubble];
      setSelectedFilters(newFilters);
      
      // Build combined query
      const filterTerms = newFilters.map(f => f.searchTerm);
      const combinedQuery = filterTerms.join(" and ");
      setQuery(combinedQuery);
    }
  };

  const handleFilterRemove = (filterId: string) => {
    const updatedFilters = selectedFilters.filter(f => f.id !== filterId);
    setSelectedFilters(updatedFilters);
    
    // Update query
    if (updatedFilters.length === 0) {
      setQuery("");
    } else {
      const combinedQuery = updatedFilters.map(f => f.searchTerm).join(" and ");
      setQuery(combinedQuery);
    }
  };

  const handleClearAllFilters = () => {
    setSelectedFilters([]);
    setQuery("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  if (heroMode) {
    return (
      <div className="space-y-8">
        <div className="relative" ref={dropdownRef}>
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative group">
              <div className="relative bg-background rounded-xl border border-border shadow-card hover:shadow-card-hover transition-all duration-200 group-focus-within:border-ring group-focus-within:shadow-glow">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary h-5 w-5 transition-colors duration-200" />
                
                {/* Toolhouse logo in the middle */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-15 group-focus-within:opacity-8 transition-opacity duration-200">
                  <img 
                    src="/toolhouse-logo.png" 
                    alt="Toolhouse" 
                    className="h-6 w-auto opacity-60" 
                  />
                </div>
                
                <Input
                  type="text"
                  placeholder="Search companies, founders, industries..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={isLoading}
                  className="pl-12 pr-20 sm:pr-32 h-12 sm:h-14 text-sm sm:text-base bg-background border-0 rounded-xl focus:ring-0 focus:outline-none placeholder:text-muted-foreground"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 sm:h-10 px-2 sm:px-4 rounded-lg shadow-card hover:shadow-card-hover disabled:opacity-50 disabled:cursor-not-allowed transition-smooth font-medium text-xs sm:text-sm"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="w-3 h-3 border border-neutral-400 border-t-transparent rounded-full animate-spin" />
                      <span className="hidden sm:inline">Searching...</span>
                    </div>
                  ) : (
                    "Search"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* Filter Bubbles for Hero Mode */}
        <FilterBubbles 
          onFilterSelect={handleFilterSelect}
          selectedFilters={selectedFilters}
          onFilterRemove={handleFilterRemove}
          onClearAll={handleClearAllFilters}
        />
      </div>
    );
  }

  return (
      <div className="w-full max-w-5xl mx-auto">
        {/* Mode Toggle */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2 p-2 bg-gradient-glass backdrop-blur-premium rounded-2xl border border-neutral-200/60 shadow-premium">
            <Toggle
              pressed={!showCardMode}
              onPressedChange={(pressed) => onToggleMode(!pressed)}
              className="rounded-xl px-6 py-3 font-medium transition-premium data-[state=on]:bg-gradient-primary data-[state=on]:text-white data-[state=on]:shadow-glow"
            >
              <Search className="h-5 w-5 mr-3" />
              Advanced Search
            </Toggle>
            <Toggle
              pressed={showCardMode}
              onPressedChange={onToggleMode}
              className="rounded-xl px-6 py-3 font-medium transition-premium data-[state=on]:bg-gradient-primary data-[state=on]:text-white data-[state=on]:shadow-glow"
            >
              <Grid3X3 className="h-5 w-5 mr-3" />
              Quick Search
            </Toggle>
          </div>
        </div>
        
        {!showCardMode && (
          <div className="relative" ref={dropdownRef}>
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-primary rounded-3xl opacity-20 blur-xl transition-premium group-focus-within:opacity-30" />
                <div className="relative bg-gradient-glass backdrop-blur-premium rounded-3xl border border-neutral-200/60 shadow-premium hover:shadow-premium-hover transition-premium">
                  <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-neutral-400 group-focus-within:text-brand-primary h-6 w-6 transition-premium" />
                  <Input
                    type="text"
                    placeholder="Search AI startups, fintech, competitors, or any industry..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={isLoading}
                    className="pl-20 pr-52 h-20 text-lg bg-transparent border-0 rounded-3xl focus:ring-0 focus:outline-none placeholder:text-neutral-500 font-medium"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !query.trim()}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 h-12 px-8 bg-gradient-primary text-white rounded-2xl shadow-glow hover:shadow-premium-hover disabled:opacity-50 disabled:cursor-not-allowed transition-premium font-semibold"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Searching...
                      </div>
                    ) : (
                      "Search Now"
                    )}
                  </Button>
                </div>
              </div>
            </form>

            {/* Filter Bubbles - positioned below search bar */}
            <FilterBubbles 
              onFilterSelect={handleFilterSelect}
              selectedFilters={selectedFilters}
              onFilterRemove={handleFilterRemove}
              onClearAll={handleClearAllFilters}
            />
          </div>
        )}
    </div>
  );
}