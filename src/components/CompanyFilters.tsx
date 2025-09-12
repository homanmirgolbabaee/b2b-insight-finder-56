import { useState } from "react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FilterOptions {
  industries: string[];
  stages: string[];
  geographies: string[];
}

interface ActiveFilters {
  industries: string[];
  stages: string[];
  geographies: string[];
}

interface CompanyFiltersProps {
  onFiltersChange: (filters: ActiveFilters) => void;
  activeFilters: ActiveFilters;
}

const filterOptions: FilterOptions = {
  industries: ["AI", "Fintech", "Biotech", "SaaS", "E-commerce", "Healthcare", "EdTech", "CleanTech"],
  stages: ["Pre-Seed", "Seed", "Series A", "Series B+", "Recently Funded", "Recently Launched"],
  geographies: ["Global", "North America", "Europe", "Asia", "Latin America", "Africa", "Oceania"]
};

export function CompanyFilters({ onFiltersChange, activeFilters }: CompanyFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = (category: keyof ActiveFilters, value: string) => {
    const currentFilters = activeFilters[category];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(f => f !== value)
      : [...currentFilters, value];
    
    onFiltersChange({
      ...activeFilters,
      [category]: newFilters
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      industries: [],
      stages: [],
      geographies: []
    });
  };

  const totalActiveFilters = activeFilters.industries.length + activeFilters.stages.length + activeFilters.geographies.length;

  return (
    <div className="w-full max-w-6xl mx-auto mb-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto bg-surface border-gray-200 text-text-primary hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {totalActiveFilters > 0 && (
              <Badge variant="secondary" className="ml-2 bg-brand-blue text-white">
                {totalActiveFilters}
              </Badge>
            )}
            {isOpen ? (
              <ChevronUp className="h-4 w-4 ml-2" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2" />
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-4">
          <div className="bg-surface border border-gray-200 rounded-lg p-6 space-y-6">
            {/* Industries */}
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3">Industry</h3>
              <div className="flex flex-wrap gap-2">
                {filterOptions.industries.map((industry) => (
                  <Button
                    key={industry}
                    variant={activeFilters.industries.includes(industry) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFilter("industries", industry)}
                    className={`rounded-full ${
                      activeFilters.industries.includes(industry)
                        ? "bg-brand-blue text-white hover:bg-brand-blue-hover"
                        : "bg-surface border-gray-200 text-text-secondary hover:bg-gray-50 hover:border-brand-blue hover:text-brand-blue"
                    }`}
                  >
                    {industry}
                  </Button>
                ))}
              </div>
            </div>

            {/* Stages */}
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3">Stage</h3>
              <div className="flex flex-wrap gap-2">
                {filterOptions.stages.map((stage) => (
                  <Button
                    key={stage}
                    variant={activeFilters.stages.includes(stage) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFilter("stages", stage)}
                    className={`rounded-full ${
                      activeFilters.stages.includes(stage)
                        ? "bg-accent-green text-white hover:bg-accent-green/90"
                        : "bg-surface border-gray-200 text-text-secondary hover:bg-gray-50 hover:border-accent-green hover:text-accent-green"
                    }`}
                  >
                    {stage}
                  </Button>
                ))}
              </div>
            </div>

            {/* Geography */}
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3">Geography</h3>
              <div className="flex flex-wrap gap-2">
                {filterOptions.geographies.map((geography) => (
                  <Button
                    key={geography}
                    variant={activeFilters.geographies.includes(geography) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFilter("geographies", geography)}
                    className={`rounded-full ${
                      activeFilters.geographies.includes(geography)
                        ? "bg-gray-400 text-white hover:bg-gray-500"
                        : "bg-surface border-gray-200 text-text-secondary hover:bg-gray-50 hover:border-gray-400 hover:text-gray-400"
                    }`}
                  >
                    {geography}
                  </Button>
                ))}
              </div>
            </div>

            {/* Clear filters */}
            {totalActiveFilters > 0 && (
              <div className="pt-4 border-t border-gray-200">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-text-secondary hover:text-text-primary"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}