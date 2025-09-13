import { useState } from "react";
import { Search, ExternalLink, TrendingUp, Building2, Users, Target } from "lucide-react";
import { InvestmentSummary } from "@/components/InvestmentSummary";
import { SearchBar } from "@/components/SearchBar";
import { SearchCards } from "@/components/SearchCards";
import { CompanyTable } from "@/components/CompanyTable";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CompanyFilters } from "@/components/CompanyFilters";
import { CompanyDetailPanel } from "@/components/CompanyDetailPanel";
import { ExportTools } from "@/components/ExportTools";
import { useCompanySearch } from "@/hooks/useCompanySearch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Company {
  name: string;
  description: string;
  funding_or_launch_news: string;
  funding_amount: string;
  funding_stage: string;
  revenue_range: string;
  team_size: number;
  founded: string;
  location: string;
  last_updated: string;
  links: {
    news?: string | null;
    linkedin: string;
    website: string;
  };
}

interface ActiveFilters {
  industries: string[];
  stages: string[];
  geographies: string[];
}

const Index = () => {
  const { companies, isLoading, error, search } = useCompanySearch();
  const [showCardMode, setShowCardMode] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    industries: [],
    stages: [],
    geographies: []
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

  // Get similar companies for detail panel (simple implementation)
  const getSimilarCompanies = (company: Company) => {
    return companies.filter(c => c.name !== company.name).slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Clean header */}
      <header className="border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Search className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-neutral-900">Research Platform</h1>
            </div>
            <div className="text-sm text-neutral-500">
              Powered by Toolhouse
            </div>
          </div>
        </div>
      </header>

      {/* Main search interface */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Search modes */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setShowCardMode(false)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                !showCardMode 
                  ? 'bg-neutral-900 text-white shadow-sm' 
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Custom Search
            </button>
            <button
              onClick={() => setShowCardMode(true)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                showCardMode 
                  ? 'bg-neutral-900 text-white shadow-sm' 
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Quick Research
            </button>
          </div>

          {/* Search interface */}
          {!showCardMode ? (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-neutral-900">
                  What would you like to research?
                </h2>
                <p className="text-neutral-600">
                  Search for companies, founders, or explore specific industries
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
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-neutral-900">
                  Choose a research source
                </h2>
                <p className="text-neutral-600">
                  Select from curated data sources for instant insights
                </p>
              </div>
              
              <SearchCards onCardClick={handleCardClick} isLoading={isLoading} />
            </div>
          )}

          {/* Results */}
          {isLoading && <LoadingSpinner />}
          
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          
          {filteredCompanies.length > 0 && !isLoading && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <InvestmentSummary companies={filteredCompanies} />
                <ExportTools companies={filteredCompanies} searchQuery={searchQuery} />
              </div>
              
              <CompanyTable 
                companies={filteredCompanies}
                onCompanyClick={handleCompanyClick}
              />
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
