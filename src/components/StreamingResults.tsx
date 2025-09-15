import { useEffect, useState } from "react";
import { CompanyCard } from "@/components/CompanyCard";

interface Company {
  name: string;
  description: string;
  funding_or_launch_news: string;
  funding_amount: string;
  funding_stage: string;
  valuation: string;
  revenue_range: string;
  team_size: number;
  founded: string;
  location: string;
  last_updated: string;
  investors: string[];
  logo: string;
  links: {
    news?: string | null;
    linkedin: string;
    website: string;
  };
}

interface StreamingResultsProps {
  companies: Company[];
  isLoading: boolean;
}

export function StreamingResults({ companies, isLoading }: StreamingResultsProps) {
  const [displayedCompanies, setDisplayedCompanies] = useState<Company[]>([]);
  const [newCompanyCount, setNewCompanyCount] = useState(0);

  useEffect(() => {
    if (companies.length > displayedCompanies.length) {
      // New companies have arrived
      const newCompanies = companies.slice(displayedCompanies.length);
      setNewCompanyCount(prev => prev + newCompanies.length);
      
      // Add companies one by one with a small delay for smooth animation
      newCompanies.forEach((company, index) => {
        setTimeout(() => {
          setDisplayedCompanies(prev => [...prev, company]);
        }, index * 200); // Stagger by 200ms
      });
    }
  }, [companies, displayedCompanies.length]);

  useEffect(() => {
    if (!isLoading) {
      // Reset when search starts
      setDisplayedCompanies([]);
      setNewCompanyCount(0);
    }
  }, [isLoading]);

  if (displayedCompanies.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className="space-y-4">
      {displayedCompanies.length > 0 && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Search Results
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {displayedCompanies.length} companies found
            </span>
            {isLoading && (
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                <span className="text-xs text-primary">Streaming...</span>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedCompanies.map((company, index) => (
          <div
            key={`${company.name}-${index}`}
            className="relative opacity-0 animate-fade-in"
            style={{ 
              animationDelay: `${index * 50}ms`,
              animationFillMode: 'forwards'
            }}
          >
            <CompanyCard company={company} />
            {/* New indicator for recently added companies */}
            {index >= displayedCompanies.length - newCompanyCount && isLoading && (
              <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full shadow-lg animate-pulse">
                New
              </div>
            )}
          </div>
        ))}
      </div>
      
      {isLoading && displayedCompanies.length > 0 && (
        <div className="text-center py-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex space-x-1">
              <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" />
            </div>
            <span>Loading more results...</span>
          </div>
        </div>
      )}
    </div>
  );
}