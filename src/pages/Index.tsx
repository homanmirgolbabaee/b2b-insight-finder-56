import { useState } from "react";
import { Search, Building2, TrendingUp, Target } from "lucide-react";
import { InvestmentSummary } from "@/components/InvestmentSummary";
import { SearchBar } from "@/components/SearchBar";
import { SearchCards } from "@/components/SearchCards";
import { ExampleQueries } from "@/components/ExampleQueries";
import { CompanyTable } from "@/components/CompanyTable";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CompanyDetailPanel } from "@/components/CompanyDetailPanel";
import { InvestmentFilters } from "@/components/InvestmentFilters";
import { N8nIntegrationButton } from "@/components/N8nIntegrationButton";
import { useCompanySearch } from "@/hooks/useCompanySearch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
  links: {
    news?: string | null;
    linkedin: string;
    website: string;
  };
}

interface ActiveFilters {
  fundingStages: string[];
  fundingRanges: string[];
  sectors: string[];
  locations: string[];
}

const Index = () => {
  const { companies, isLoading, error, search } = useCompanySearch();
  const [showCardMode, setShowCardMode] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    fundingStages: [],
    fundingRanges: [],
    sectors: [],
    locations: []
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    search(query);
  };

  const handleCardClick = (query: string) => {
    setSearchQuery(query);
    search(query);
  };

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company);
  };

  const filteredCompanies = companies; // TODO: Implement actual filtering based on activeFilters

  const getSimilarCompanies = (company: Company) => {
    return companies.filter(c => c.name !== company.name).slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Modern header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 hidden md:flex">
            <div className="flex items-center gap-3">
              <img 
                src="/toolhouse-logo.png" 
                alt="Toolhouse" 
                className="h-8 w-8" 
              />
              <div>
                <h1 className="text-lg font-semibold">Toolhouse.ai</h1>
                <p className="text-xs text-muted-foreground">AI-powered startup intelligence</p>
              </div>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <N8nIntegrationButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container max-w-screen-2xl py-8 lg:py-16">
        <div className="space-y-8 lg:space-y-12">
          {/* Mode toggle */}
          <div className="flex justify-center">
            <div className="inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
              <button
                onClick={() => setShowCardMode(false)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  !showCardMode 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'hover:bg-background/60 hover:text-foreground'
                }`}
              >
                Custom Search
              </button>
              <button
                onClick={() => setShowCardMode(true)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  showCardMode 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'hover:bg-background/60 hover:text-foreground'
                }`}
              >
                Quick Research
              </button>
            </div>
          </div>

          {/* Search interface */}
          {!showCardMode ? (
            <div className="mx-auto max-w-4xl space-y-8">
              <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Discover Startups with AI
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Find companies, analyze funding, and explore markets with intelligent search
                </p>
              </div>
              
              <SearchBar 
                onSearch={handleSearch} 
                isLoading={isLoading}
                showCardMode={false}
                onToggleMode={() => {}}
                heroMode={true}
              />
            </div>
          ) : (
            <div className="mx-auto max-w-6xl space-y-8">
              <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Quick Research
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Start with curated templates for instant insights
                </p>
              </div>
              
              <SearchCards onCardClick={handleCardClick} isLoading={isLoading} />
            </div>
          )}

          {/* Example Queries Section */}
          {!isLoading && filteredCompanies.length === 0 && !error && (
            <ExampleQueries onQuerySelect={handleSearch} />
          )}

          {/* Results section */}
          {isLoading && <LoadingSpinner />}
          
          {error && (
            <div className="mx-auto max-w-md">
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            </div>
          )}
          
          {filteredCompanies.length > 0 && !isLoading && (
            <div className="space-y-8">
              <Card className="p-6">
                <InvestmentSummary companies={filteredCompanies} />
              </Card>
              
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                <div className="order-2 lg:order-1">
                  <Card className="p-6">
                    <InvestmentFilters 
                      activeFilters={activeFilters}
                      onFiltersChange={setActiveFilters}
                    />
                  </Card>
                </div>
                
                <div className="order-1 lg:order-2 lg:col-span-3">
                  <Card className="overflow-hidden">
                    <CompanyTable 
                      companies={filteredCompanies}
                      onCompanyClick={handleCompanyClick}
                    />
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Powered by Toolhouse.ai and Exa.ai
          </p>
        </div>
      </footer>
      
      {/* Company Detail Panel */}
      {selectedCompany && (
        <CompanyDetailPanel
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
          similarCompanies={getSimilarCompanies(selectedCompany)}
        />
      )}
    </div>
  );
};

export default Index;