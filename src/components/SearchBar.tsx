import { useState, useRef, useEffect } from "react";
import { Search, Grid3X3, ChevronDown, Lightbulb, Building, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  showCardMode: boolean;
  onToggleMode: (cardMode: boolean) => void;
  heroMode?: boolean;
}

export function SearchBar({ onSearch, isLoading, showCardMode, onToggleMode, heroMode = false }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showExamples, setShowExamples] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const searchExamples = [
    "Search for successful AI companies in recent months in 2025. From May 2025 onwards",
    "Find fintech startups that raised Series A in 2024",
    "Companies in healthcare AI with $10M+ funding",
    "European SaaS companies founded after 2020",
    "B2B startups in California with 50+ employees",
    "Climate tech companies with recent partnerships"
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowExamples(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExampleClick = (example: string) => {
    setQuery(example);
    setShowExamples(false);
    onSearch(example);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  if (heroMode) {
    return (
      <div className="relative" ref={dropdownRef}>
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative group">
            <div className="relative bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-200 group-focus-within:border-neutral-400 group-focus-within:shadow-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 group-focus-within:text-neutral-600 h-5 w-5 transition-colors duration-200" />
              
              {/* Toolhouse logo in the middle */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 group-focus-within:opacity-10 transition-opacity duration-200">
                <div className="flex items-center gap-1">
                  <div className="relative">
                    <Building className="h-4 w-4 text-neutral-400" />
                    <Zap className="h-2 w-2 text-brand-primary absolute -top-0.5 -right-0.5" />
                  </div>
                  <span className="text-xs font-medium text-neutral-400">Toolhouse</span>
                </div>
              </div>
              
              <Input
                type="text"
                placeholder='Search companies, founders, industries...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowExamples(true)}
                disabled={isLoading}
                className="pl-12 pr-20 sm:pr-32 h-12 sm:h-14 text-sm sm:text-base bg-transparent border-0 rounded-xl focus:ring-0 focus:outline-none placeholder:text-neutral-500"
              />
              <Button
                type="button"
                onClick={() => setShowExamples(!showExamples)}
                className="absolute right-12 sm:right-16 top-1/2 transform -translate-y-1/2 h-6 w-6 sm:h-8 sm:w-8 p-0 bg-transparent hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                <ChevronDown className={`h-3 w-3 sm:h-4 sm:w-4 transition-transform ${showExamples ? 'rotate-180' : ''}`} />
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 sm:h-10 px-2 sm:px-4 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-xs sm:text-sm"
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
        
        {/* Examples Dropdown */}
        {showExamples && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-neutral-200 shadow-lg z-50 max-h-80 overflow-y-auto">
            <div className="p-3 border-b border-neutral-100 bg-neutral-50 rounded-t-xl">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium text-neutral-700">Search Examples</span>
              </div>
            </div>
            <div className="py-2">
              {searchExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className="w-full text-left px-4 py-3 hover:bg-neutral-50 transition-colors text-sm text-neutral-700 hover:text-neutral-900 border-b border-neutral-50 last:border-b-0"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}
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
                    onFocus={() => setShowExamples(true)}
                    disabled={isLoading}
                    className="pl-20 pr-52 h-20 text-lg bg-transparent border-0 rounded-3xl focus:ring-0 focus:outline-none placeholder:text-neutral-500 font-medium"
                  />
                  <Button
                    type="button"
                    onClick={() => setShowExamples(!showExamples)}
                    className="absolute right-44 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 bg-white/10 hover:bg-white/20 text-neutral-600 hover:text-brand-primary rounded-xl transition-all"
                  >
                    <ChevronDown className={`h-5 w-5 transition-transform ${showExamples ? 'rotate-180' : ''}`} />
                  </Button>
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
            
            {/* Examples Dropdown */}
            {showExamples && (
              <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-2xl border border-neutral-200/60 shadow-premium z-50 max-h-80 overflow-y-auto backdrop-blur-premium">
                <div className="p-4 border-b border-neutral-100 bg-gradient-subtle rounded-t-2xl">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-amber-500" />
                    <span className="text-base font-semibold text-neutral-800">Search Examples</span>
                  </div>
                </div>
                <div className="py-2">
                  {searchExamples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleClick(example)}
                      className="w-full text-left px-6 py-4 hover:bg-gradient-subtle transition-all text-base text-neutral-700 hover:text-neutral-900 border-b border-neutral-50 last:border-b-0 font-medium"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
    </div>
  );
}