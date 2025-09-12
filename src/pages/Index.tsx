import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { SearchCards } from "@/components/SearchCards";
import { CompanyCard } from "@/components/CompanyCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CompanyFilters } from "@/components/CompanyFilters";
import { CompanyDetailPanel } from "@/components/CompanyDetailPanel";
import { ExportTools } from "@/components/ExportTools";
import { useCompanySearch } from "@/hooks/useCompanySearch";

interface Company {
  name: string;
  description: string;
  funding_or_launch_news: string;
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
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_hsl(230_100%_63%_/_0.05),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_hsl(260_100%_70%_/_0.05),_transparent_70%)]" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              {/* Toolhouse Agent Badge */}
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg border border-neutral-200 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-neutral-600" />
                  <span className="text-sm font-medium text-neutral-700">
                    Powered by Toolhouse Agent
                  </span>
                </div>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 tracking-tight leading-none">
                Business Intelligence &{" "}
                <span className="text-neutral-700">
                  Research Platform
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed font-light">
                Comprehensive business intelligence platform — crawl sources, analyze profiles, 
                track sentiments, and deliver automated insights.
              </p>
              
              {/* Capabilities */}
              <div className="flex flex-wrap justify-center items-center gap-8 pt-8">
                <div className="flex items-center gap-6 text-sm font-medium text-neutral-600">
                  <div className="px-3 py-1 bg-neutral-100 rounded-md">Crawl Sources</div>
                  <div className="px-3 py-1 bg-neutral-100 rounded-md">Search LinkedIn Profiles</div>
                  <div className="px-3 py-1 bg-neutral-100 rounded-md">Search X Sentiments</div>
                  <div className="px-3 py-1 bg-neutral-100 rounded-md">Look up Websites</div>
                  <div className="px-3 py-1 bg-neutral-100 rounded-md">Email Reports</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="relative bg-gradient-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <SearchBar 
            onSearch={handleSearch} 
            isLoading={isLoading}
            showCardMode={showCardMode}
            onToggleMode={setShowCardMode}
          />
          
          {showCardMode && (
            <div className="mt-12">
              <SearchCards onCardClick={handleCardClick} isLoading={isLoading} />
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        {(companies.length > 0 || searchQuery) && !showCardMode && (
          <div className="mb-8">
            <CompanyFilters 
              activeFilters={activeFilters}
              onFiltersChange={setActiveFilters}
            />
          </div>
        )}
        
        {error && (
          <div className="mb-8 p-6 bg-gradient-to-r from-brand-error/10 to-brand-error/5 border border-brand-error/20 rounded-2xl text-center shadow-premium">
            <div className="flex items-center justify-center w-16 h-16 bg-brand-error/10 rounded-full mx-auto mb-4">
              <svg className="w-8 h-8 text-brand-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5C2.962 18.333 3.924 20 5.464 20z" />
              </svg>
            </div>
            <p className="text-brand-error font-semibold">{error}</p>
          </div>
        )}
        
        {isLoading && <LoadingSpinner />}
        
        {/* Results Section */}
        {filteredCompanies.length > 0 && !isLoading && (
          <div className="space-y-8">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-neutral-900">
                  Search Results
                </h2>
                <p className="text-neutral-600 font-medium">
                  Found {filteredCompanies.length} companies matching your criteria
                </p>
              </div>
              <ExportTools companies={filteredCompanies} searchQuery={searchQuery} />
            </div>
            
            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCompanies.map((company, index) => (
                <CompanyCard 
                  key={`${company.name}-${index}`} 
                  company={company}
                  onClick={() => handleCompanyClick(company)}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Professional Empty State */}
        {companies.length === 0 && !isLoading && !error && (
          <div className="text-center py-24">
            <div className="max-w-lg mx-auto space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-neutral-900">
                  Ready to Research
                </h3>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  Search for companies, analyze competitors, or explore any industry to get 
                  comprehensive business intelligence and market insights.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 max-w-md mx-auto">
                <div className="p-4 bg-white rounded-lg border border-neutral-200 shadow-sm">
                  <div className="text-sm font-medium text-neutral-700">10,000+ Companies</div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-neutral-200 shadow-sm">
                  <div className="text-sm font-medium text-neutral-700">Real-time Data</div>
                </div>
              </div>
            </div>
          </div>
        )}
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
