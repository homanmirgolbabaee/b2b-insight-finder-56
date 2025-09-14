import { useState } from "react";
import { Search, User, LogOut, Building2, TrendingUp, Target } from "lucide-react";
import { InvestmentSummary } from "@/components/InvestmentSummary";
import { SearchBar } from "@/components/SearchBar";
import { SearchCards } from "@/components/SearchCards";
import { CompanyTable } from "@/components/CompanyTable";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CompanyDetailPanel } from "@/components/CompanyDetailPanel";
import { InvestmentFilters } from "@/components/InvestmentFilters";
import { UserDashboard } from "@/components/UserDashboard";
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
  const [showDashboard, setShowDashboard] = useState(false);

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

  // Get similar companies for detail panel (simple implementation)
  const getSimilarCompanies = (company: Company) => {
    return companies.filter(c => c.name !== company.name).slice(0, 3);
  };

  if (showDashboard) {
    return <UserDashboard onClose={() => setShowDashboard(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Professional header with user navigation */}
      <header className="border-b border-neutral-300 bg-surface/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-card">
                <Building2 className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-text-primary">Investment Research Platform</h1>
                <p className="text-xs text-text-secondary">Professional startup intelligence</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDashboard(true)}
                className="text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
              >
                <User className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main search interface */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Professional search modes */}
          <div className="flex justify-center">
            <div className="bg-surface rounded-lg p-1 shadow-card border border-neutral-300">
              <div className="flex gap-1">
                <button
                  onClick={() => setShowCardMode(false)}
                  className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    !showCardMode 
                      ? 'bg-brand-primary text-white shadow-sm' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                  }`}
                >
                  Custom Search
                </button>
                <button
                  onClick={() => setShowCardMode(true)}
                  className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    showCardMode 
                      ? 'bg-brand-primary text-white shadow-sm' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                  }`}
                >
                  Quick Research
                </button>
              </div>
            </div>
          </div>

          {/* Professional search interface */}
          {!showCardMode ? (
            <Card className="max-w-4xl mx-auto p-8 bg-gradient-card shadow-premium">
              <div className="space-y-6">
                <div className="text-center space-y-3">
                  <h2 className="text-2xl font-semibold text-text-primary">
                    Advanced Investment Research
                  </h2>
                  <p className="text-text-secondary">
                    Search for companies, funding rounds, or explore specific market segments
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
            <Card className="max-w-6xl mx-auto p-8 bg-gradient-card shadow-premium">
              <div className="space-y-6">
                <div className="text-center space-y-3">
                  <h2 className="text-2xl font-semibold text-text-primary">
                    Quick Research Templates
                  </h2>
                  <p className="text-text-secondary">
                    Select from curated research templates for instant market intelligence
                  </p>
                </div>
                
                <SearchCards onCardClick={handleCardClick} isLoading={isLoading} />
              </div>
            </Card>
          )}

          {/* Professional results section */}
          {isLoading && <LoadingSpinner />}
          
          {error && (
            <Card className="max-w-md mx-auto p-6 bg-gradient-card shadow-card border border-brand-error/20">
              <div className="text-center">
                <p className="text-brand-error font-medium">{error}</p>
              </div>
            </Card>
          )}
          
          {filteredCompanies.length > 0 && !isLoading && (
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-card shadow-premium">
                <InvestmentSummary companies={filteredCompanies} />
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                  <Card className="p-6 bg-gradient-card shadow-card">
                    <InvestmentFilters 
                      activeFilters={activeFilters}
                      onFiltersChange={setActiveFilters}
                    />
                  </Card>
                </div>
                
                <div className="lg:col-span-3">
                  <Card className="bg-gradient-card shadow-premium">
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
