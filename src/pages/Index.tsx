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
    <div className="min-h-screen bg-gradient-hero">
      {/* Modern header with enhanced styling */}
      <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50 shadow-card">
        <div className="container-max section-padding py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <img 
                src="/toolhouse-logo.png" 
                alt="Toolhouse" 
                className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" 
              />
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground tracking-tight truncate">Toolhouse.ai</h1>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium hidden sm:block">AI-powered startup intelligence</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              <N8nIntegrationButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main search interface */}
      <div className="container-max section-padding py-8 sm:py-12 lg:py-16">
        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          {/* Modern search mode selector */}
          <div className="flex justify-center fade-in">
            <div className="bg-card/90 backdrop-blur-sm rounded-xl p-1 sm:p-1.5 shadow-premium border">
              <div className="flex gap-1">
                <button
                  onClick={() => setShowCardMode(false)}
                  className={`px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 ${
                    !showCardMode 
                      ? 'bg-primary text-primary-foreground shadow-card' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  Custom Search
                </button>
                <button
                  onClick={() => setShowCardMode(true)}
                  className={`px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 ${
                    showCardMode 
                      ? 'bg-primary text-primary-foreground shadow-card' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  Quick Research
                </button>
              </div>
            </div>
          </div>

          {/* Modern search interface */}
          {!showCardMode ? (
            <Card className="max-w-4xl mx-auto p-8 sm:p-10 lg:p-12 shadow-premium hover-lift">
              <div className="space-y-8 sm:space-y-10">
                <div className="text-center space-y-4 sm:space-y-6">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                    Discover Startups with AI
                  </h2>
                  <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
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
            </Card>
          ) : (
            <Card className="max-w-6xl mx-auto p-8 sm:p-10 lg:p-12 shadow-premium hover-lift">
              <div className="space-y-8 sm:space-y-10">
                <div className="text-center space-y-4 sm:space-y-6">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                    Quick Research
                  </h2>
                  <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
                    Start with curated templates for instant insights
                  </p>
                </div>
                
                <SearchCards onCardClick={handleCardClick} isLoading={isLoading} />
              </div>
            </Card>
          )}

          {/* Example Queries Section */}
          {!isLoading && filteredCompanies.length === 0 && !error && (
            <ExampleQueries onQuerySelect={handleSearch} />
          )}

          {/* Professional results section */}
          {isLoading && <LoadingSpinner />}
          
          {error && (
            <Card className="max-w-md mx-auto p-6 shadow-card border border-destructive/20">
              <div className="text-center">
                <p className="text-destructive font-medium">{error}</p>
              </div>
            </Card>
          )}
          
          {filteredCompanies.length > 0 && !isLoading && (
            <div className="space-y-6 sm:space-y-8 fade-in">
              <Card className="p-6 sm:p-8 lg:p-10 shadow-premium hover-lift">
                <InvestmentSummary companies={filteredCompanies} />
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
                <div className="lg:col-span-1 order-2 lg:order-1">
                  <Card className="p-6 sm:p-8 shadow-card hover-lift">
                    <InvestmentFilters 
                      activeFilters={activeFilters}
                      onFiltersChange={setActiveFilters}
                    />
                  </Card>
                </div>
                
                <div className="lg:col-span-3 order-1 lg:order-2">
                  <Card className="shadow-premium hover-lift overflow-hidden">
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

      {/* Modern footer */}
      <footer className="border-t bg-background/95 backdrop-blur-sm mt-16">
        <div className="container-max section-padding py-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground font-medium">
              Powered by Toolhouse.ai and Exa.ai
            </p>
          </div>
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
