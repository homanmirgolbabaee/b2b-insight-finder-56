import { useState } from "react";
import { Search, Grid3X3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  showCardMode: boolean;
  onToggleMode: (cardMode: boolean) => void;
}

export function SearchBar({ onSearch, isLoading, showCardMode, onToggleMode }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

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
                  className="pl-20 pr-40 h-20 text-lg bg-transparent border-0 rounded-3xl focus:ring-0 focus:outline-none placeholder:text-neutral-500 font-medium"
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
        )}
    </div>
  );
}