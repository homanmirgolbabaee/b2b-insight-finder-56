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
      <header className="border-b border-neutral-300/40 bg-surface/98 backdrop-blur-md sticky top-0 z-50">
        <div className="container-max section-padding py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-text-primary tracking-tight">Investment Research Platform</h1>
                <p className="text-sm text-text-secondary font-medium">Professional startup intelligence</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDashboard(true)}
                className="text-text-secondary hover:text-text-primary hover:bg-neutral-100/80 font-medium"
              >
                <User className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-text-secondary hover:text-text-primary hover:bg-neutral-100/80 font-medium"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main search interface */}
      <div className="container-max section-padding py-16">
        <div className="space-y-10">
          {/* Professional search modes */}
          <div className="flex justify-center fade-in">
            <div className="bg-surface/90 backdrop-blur-sm rounded-xl p-1.5 shadow-premium border border-neutral-300/50">
              <div className="flex gap-1">
                <button
                  onClick={() => setShowCardMode(false)}
                  className={`px-8 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${
                    !showCardMode 
                      ? 'bg-gradient-primary text-white shadow-glow' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-neutral-100/60'
                  }`}
                >
                  Custom Search
                </button>
                <button
                  onClick={() => setShowCardMode(true)}
                  className={`px-8 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${
                    showCardMode 
                      ? 'bg-gradient-primary text-white shadow-glow' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-neutral-100/60'
                  }`}
                >
                  Quick Research
                </button>
              </div>
            </div>
          </div>

          {/* Professional search interface */}
          {!showCardMode ? (
            <Card className="max-w-4xl mx-auto p-10 bg-gradient-card shadow-premium hover-lift border-0">
              <div className="space-y-8">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold text-text-primary tracking-tight">
                    Advanced Investment Research
                  </h2>
                  <p className="text-lg text-text-secondary font-medium max-w-2xl mx-auto">
                    Search for companies, funding rounds, or explore specific market segments with AI-powered insights
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
            <Card className="max-w-6xl mx-auto p-10 bg-gradient-card shadow-premium hover-lift border-0">
              <div className="space-y-8">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold text-text-primary tracking-tight">
                    Quick Research Templates
                  </h2>
                  <p className="text-lg text-text-secondary font-medium max-w-2xl mx-auto">
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
            <div className="space-y-8 fade-in">
              <Card className="p-8 bg-gradient-card shadow-premium hover-lift border-0">
                <InvestmentSummary companies={filteredCompanies} />
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                  <Card className="p-7 bg-gradient-card shadow-card hover-lift border-0">
                    <InvestmentFilters 
                      activeFilters={activeFilters}
                      onFiltersChange={setActiveFilters}
                    />
                  </Card>
                </div>
                
                <div className="lg:col-span-3">
                  <Card className="bg-gradient-card shadow-premium hover-lift border-0">
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
