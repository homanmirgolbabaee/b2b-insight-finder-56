import { useState } from "react";
import { Filter, X, DollarSign, Building, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterOptions {
  fundingStages: string[];
  fundingRanges: string[];
  sectors: string[];
  locations: string[];
}

interface ActiveFilters {
  fundingStages: string[];
  fundingRanges: string[];
  sectors: string[];
  locations: string[];
}

interface InvestmentFiltersProps {
  activeFilters: ActiveFilters;
  onFiltersChange: (filters: ActiveFilters) => void;
}

export function InvestmentFilters({ activeFilters, onFiltersChange }: InvestmentFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const filterOptions: FilterOptions = {
    fundingStages: ["Pre-seed", "Seed", "Series A", "Series B", "Series C", "Series D+"],
    fundingRanges: ["<$1M", "$1M-$10M", "$10M-$50M", "$50M-$100M", "$100M+"],
    sectors: ["AI/ML", "FinTech", "HealthTech", "EdTech", "SaaS", "E-commerce", "Crypto"],
    locations: ["San Francisco", "New York", "London", "Berlin", "Tel Aviv", "Singapore", "Toronto"]
  };

  const updateFilter = (category: keyof ActiveFilters, value: string, checked: boolean) => {
    const updatedFilters = { ...activeFilters };
    if (checked) {
      updatedFilters[category] = [...updatedFilters[category], value];
    } else {
      updatedFilters[category] = updatedFilters[category].filter(item => item !== value);
    }
    onFiltersChange(updatedFilters);
  };

  const removeFilter = (category: keyof ActiveFilters, value: string) => {
    const updatedFilters = { ...activeFilters };
    updatedFilters[category] = updatedFilters[category].filter(item => item !== value);
    onFiltersChange(updatedFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      fundingStages: [],
      fundingRanges: [],
      sectors: [],
      locations: []
    });
  };

  const totalActiveFilters = Object.values(activeFilters).flat().length;

  const renderFilterSection = (title: string, icon: React.ReactNode, category: keyof ActiveFilters, options: string[]) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2 font-medium text-neutral-800">
        {icon}
        {title}
      </div>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`${category}-${option}`}
              checked={activeFilters[category].includes(option)}
              onCheckedChange={(checked) => updateFilter(category, option, !!checked)}
            />
            <label
              htmlFor={`${category}-${option}`}
              className="text-sm text-neutral-700 cursor-pointer hover:text-neutral-900"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="h-9 bg-white border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {totalActiveFilters > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 px-2 text-xs">
                  {totalActiveFilters}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="start">
            <div className="p-4 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-neutral-900">Investment Filters</h3>
                {totalActiveFilters > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="h-7 px-2 text-xs text-neutral-600 hover:text-neutral-900"
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto p-4 space-y-6">
              {renderFilterSection(
                "Funding Stage",
                <Building className="h-4 w-4 text-brand-primary" />,
                "fundingStages",
                filterOptions.fundingStages
              )}
              {renderFilterSection(
                "Funding Range",
                <DollarSign className="h-4 w-4 text-brand-success" />,
                "fundingRanges",
                filterOptions.fundingRanges
              )}
              {renderFilterSection(
                "Location",
                <MapPin className="h-4 w-4 text-brand-accent" />,
                "locations",
                filterOptions.locations
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active filters display */}
      {totalActiveFilters > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([category, filters]) =>
            filters.map((filter) => (
              <Badge
                key={`${category}-${filter}`}
                variant="secondary"
                className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 hover:bg-brand-primary/20 transition-colors"
              >
                {filter}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFilter(category as keyof ActiveFilters, filter)}
                  className="h-4 w-4 p-0 ml-1 hover:bg-brand-primary/20"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))
          )}
        </div>
      )}
    </div>
  );
}