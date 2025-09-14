import { useState } from "react";
import { ChevronDown, ChevronRight, ExternalLink, Linkedin, Globe, Newspaper, ArrowUpDown, ChevronUp, Star, Target, TrendingUp, Heart, FileText } from "lucide-react";
import { dashboardStore } from "@/stores/dashboardStore";
import { ReportDialog } from "@/components/ReportDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

interface CompanyTableProps {
  companies: Company[];
  onCompanyClick?: (company: Company) => void;
}

export function CompanyTable({ companies, onCompanyClick }: CompanyTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Company;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [selectedCompanyForReport, setSelectedCompanyForReport] = useState<string>("");

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const toggleRowExpansion = (companyName: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(companyName)) {
      newExpanded.delete(companyName);
    } else {
      newExpanded.add(companyName);
    }
    setExpandedRows(newExpanded);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not available publicly";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const formatFundingAmount = (amount: string) => {
    if (!amount || amount.trim() === '') return "Not disclosed";
    return amount;
  };

  const extractCityFromLocation = (location: string) => {
    if (!location || location.trim() === '') return "Not disclosed";
    // Extract just the city part (before comma if present)
    return location.split(',')[0].trim();
  };

  const formatStage = (stage: string) => {
    if (!stage || stage.trim() === '') return null;
    
    // Extract just the stage part (Series A, Series B, etc.)
    const stageMatch = stage.match(/(Pre-seed|Seed|Series [A-Z]|Series [A-Z]\d*)/i);
    return stageMatch ? stageMatch[1] : stage;
  };

  const getStageVariant = (stage: string) => {
    const lowerStage = stage.toLowerCase();
    if (lowerStage.includes('pre-seed')) return 'outline';
    if (lowerStage.includes('seed')) return 'secondary';
    if (lowerStage.includes('series a')) return 'default';
    if (lowerStage.includes('series b')) return 'default';
    if (lowerStage.includes('series c')) return 'default';
    return 'outline';
  };

  const getFundingIndicator = (amount: string) => {
    if (!amount || amount.trim() === '') return null;
    const match = amount.match(/\$?([\d.]+)\s*(B|M|K)?/i);
    if (!match) return null;
    
    const value = parseFloat(match[1]);
    const unit = match[2]?.toUpperCase();
    
    if (unit === 'B' || (unit === 'M' && value >= 500)) {
      return { color: 'text-green-600', size: 'large' };
    } else if (unit === 'M' && value >= 100) {
      return { color: 'text-blue-600', size: 'medium' };
    } else if (unit === 'M' && value >= 10) {
      return { color: 'text-purple-600', size: 'small' };
    }
    return { color: 'text-neutral-500', size: 'small' };
  };


  const handleSort = (key: keyof Company) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCompanies = [...companies].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const { key, direction } = sortConfig;
    let aVal = a[key];
    let bVal = b[key];
    
    // Handle special cases
    if (key === 'funding_amount' || key === 'valuation') {
      // Extract numbers for comparison
      const aNum = parseFloat(String(aVal).replace(/[^0-9.]/g, '')) || 0;
      const bNum = parseFloat(String(bVal).replace(/[^0-9.]/g, '')) || 0;
      aVal = aNum;
      bVal = bNum;
    }
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="w-full">
      {/* Mobile view */}
      <div className="md:hidden space-y-4">
        {sortedCompanies.map((company, index) => {
          const isExpanded = expandedRows.has(company.name);
          const stage = formatStage(company.funding_stage);
          const fundingIndicator = getFundingIndicator(company.funding_amount);
          
          return (
            <div 
              key={company.name} 
              className="bg-white rounded-lg border border-neutral-200 shadow-card p-4 space-y-4"
            >
              {/* Company header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-lg border border-neutral-200 flex items-center justify-center bg-white overflow-hidden flex-shrink-0">
                    {company.logo ? (
                      <img 
                        src={company.logo} 
                        alt={`${company.name} logo`}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) {
                            fallback.style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    <div 
                      className={`w-8 h-8 rounded bg-brand-primary/10 flex items-center justify-center ${company.logo ? 'hidden' : 'flex'}`}
                    >
                      <span className="text-xs font-bold text-brand-primary">
                        {company.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-neutral-900 hover:text-brand-primary transition-colors text-sm sm:text-base truncate">
                      {company.name}
                    </div>
                    <div className="text-xs sm:text-sm text-neutral-500 mt-0.5 font-medium">
                      {extractCityFromLocation(company.location)}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleRowExpansion(company.name);
                  }}
                  className="h-8 w-8 p-0 hover:bg-neutral-200/50 flex-shrink-0"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-neutral-600" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-neutral-600" />
                  )}
                </Button>
              </div>

              {/* Funding info */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {fundingIndicator && (
                      <div className={`w-2 h-2 rounded-full ${
                        fundingIndicator.color === 'text-green-600' ? 'bg-green-500' :
                        fundingIndicator.color === 'text-blue-600' ? 'bg-blue-500' :
                        fundingIndicator.color === 'text-purple-600' ? 'bg-purple-500' : 'bg-neutral-400'
                      }`} />
                    )}
                    <div className={`font-bold tracking-tight ${
                      fundingIndicator?.size === 'large' ? 'text-lg text-green-700' :
                      fundingIndicator?.size === 'medium' ? 'text-base text-blue-700' :
                      'text-sm text-neutral-900'
                    }`}>
                      {formatFundingAmount(company.funding_amount)}
                    </div>
                  </div>
                  {stage ? (
                    <Badge 
                      variant={getStageVariant(stage)} 
                      className="font-medium text-xs px-2 py-0.5"
                    >
                      {stage}
                    </Badge>
                  ) : (
                    <span className="text-neutral-400 text-xs font-medium">Not disclosed</span>
                  )}
                </div>
                <div className="text-xs text-neutral-600 font-medium text-right">
                  {formatDate(company.last_updated)}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Button
                  variant={dashboardStore.isCompanySaved(company.name) ? "default" : "outline"}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (dashboardStore.isCompanySaved(company.name)) {
                      dashboardStore.unsaveCompany(company.name);
                    } else {
                      dashboardStore.saveCompany(
                        company.name, 
                        company.funding_stage || "Not disclosed", 
                        company.funding_amount || "Not disclosed"
                      );
                    }
                  }}
                  className={`h-8 px-3 text-xs font-medium transition-all ${
                    dashboardStore.isCompanySaved(company.name)
                      ? "bg-brand-primary text-white border-brand-primary hover:bg-brand-primary/90"
                      : "bg-white border-neutral-300 hover:bg-brand-primary hover:text-white hover:border-brand-primary"
                  }`}
                >
                  <Heart className={`h-3 w-3 mr-1 ${dashboardStore.isCompanySaved(company.name) ? "fill-current" : ""}`} />
                  {dashboardStore.isCompanySaved(company.name) ? "Saved" : "Save"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCompanyForReport(company.name);
                    setReportDialogOpen(true);
                  }}
                  className="h-8 w-8 p-0 hover:bg-neutral-200/50 transition-colors"
                  title="Generate Report"
                >
                  <FileText className="h-3 w-3 text-neutral-500 hover:text-purple-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLink(company.links.website);
                  }}
                  className="h-8 w-8 p-0 hover:bg-neutral-200/50 transition-colors"
                  title="Website"
                >
                  <Globe className="h-3 w-3 text-neutral-500 hover:text-neutral-700" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLink(company.links.linkedin);
                  }}
                  className="h-8 w-8 p-0 hover:bg-neutral-200/50 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="h-3 w-3 text-neutral-500 hover:text-blue-600" />
                </Button>
                {company.links.news && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openLink(company.links.news!);
                    }}
                    className="h-8 w-8 p-0 hover:bg-neutral-200/50 transition-colors"
                    title="News"
                  >
                    <Newspaper className="h-3 w-3 text-neutral-500 hover:text-green-600" />
                  </Button>
                )}
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div className="pt-4 border-t border-neutral-100">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-neutral-900 text-sm mb-2">Company Description</h4>
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        {company.description}
                      </p>
                    </div>
                    
                    {company.funding_or_launch_news && (
                      <div>
                        <h4 className="font-semibold text-neutral-900 text-sm mb-2">Recent News</h4>
                        <p className="text-sm text-neutral-700 leading-relaxed">
                          {company.funding_or_launch_news}
                        </p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <span className="font-medium text-neutral-800 text-xs">Valuation</span>
                        <p className="text-sm text-neutral-600 mt-1">
                          {company.valuation || "Not disclosed"}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-neutral-800 text-xs">Revenue</span>
                        <p className="text-sm text-neutral-600 mt-1">
                          {company.revenue_range || "Not disclosed"}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-neutral-800 text-xs">Team Size</span>
                        <p className="text-sm text-neutral-600 mt-1">
                          {company.team_size ? `${company.team_size} employees` : "Not disclosed"}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-neutral-800 text-xs">Founded</span>
                        <p className="text-sm text-neutral-600 mt-1">
                          {company.founded || "Not disclosed"}
                        </p>
                      </div>
                    </div>
                    
                    {company.investors && company.investors.length > 0 && (
                      <div>
                        <span className="font-medium text-neutral-800 text-xs">Investors</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {company.investors.slice(0, 3).map((investor, i) => (
                            <Badge key={i} variant="outline" className="text-xs px-2 py-0.5">
                              {investor}
                            </Badge>
                          ))}
                          {company.investors.length > 3 && (
                            <Badge variant="outline" className="text-xs px-2 py-0.5">
                              +{company.investors.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block rounded-lg border border-neutral-200 bg-white shadow-card">
        <Table>
          <TableHeader className="sticky top-0 bg-neutral-50/80 backdrop-blur-sm z-10 border-b border-neutral-200">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12 py-4"></TableHead>
              <TableHead 
                className="font-semibold text-neutral-800 cursor-pointer hover:bg-neutral-100/50 transition-colors py-4"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-2">
                  Company
                  {sortConfig?.key === 'name' ? (
                    sortConfig.direction === 'asc' ? (
                      <ChevronUp className="h-4 w-4 text-brand-primary" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-brand-primary" />
                    )
                  ) : (
                    <ArrowUpDown className="h-4 w-4 text-neutral-400" />
                  )}
                </div>
              </TableHead>
              <TableHead 
                className="font-semibold text-neutral-800 text-right cursor-pointer hover:bg-neutral-100/50 transition-colors py-4"
                onClick={() => handleSort('funding_amount')}
              >
                <div className="flex items-center justify-end gap-2">
                  Funding & Stage
                  {sortConfig?.key === 'funding_amount' ? (
                    sortConfig.direction === 'asc' ? (
                      <ChevronUp className="h-4 w-4 text-brand-primary" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-brand-primary" />
                    )
                  ) : (
                    <ArrowUpDown className="h-4 w-4 text-neutral-400" />
                  )}
                </div>
              </TableHead>
              
              <TableHead
                className="font-semibold text-neutral-800 cursor-pointer hover:bg-neutral-100/50 transition-colors py-4"
                onClick={() => handleSort('last_updated')}
              >
                <div className="flex items-center gap-2">
                  Date
                  {sortConfig?.key === 'last_updated' ? (
                    sortConfig.direction === 'asc' ? (
                      <ChevronUp className="h-4 w-4 text-brand-primary" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-brand-primary" />
                    )
                  ) : (
                    <ArrowUpDown className="h-4 w-4 text-neutral-400" />
                  )}
                </div>
              </TableHead>
              <TableHead className="font-semibold text-neutral-800 py-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCompanies.map((company, index) => {
              const isExpanded = expandedRows.has(company.name);
              const isEven = index % 2 === 0;
              const stage = formatStage(company.funding_stage);
              const fundingIndicator = getFundingIndicator(company.funding_amount);
              
              
              return (
                <>
                  <TableRow 
                    key={company.name}
                    className={`${
                      isEven ? 'bg-white' : 'bg-[#fafbfc]'
                    } hover:bg-neutral-100/70 transition-all duration-200 cursor-pointer border-b border-neutral-100/50`}
                    onClick={() => onCompanyClick?.(company)}
                  >
                    <TableCell className="py-5">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRowExpansion(company.name);
                        }}
                        className="h-6 w-6 p-0 hover:bg-neutral-200/50"
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-neutral-600" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-neutral-600" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg border border-neutral-200 flex items-center justify-center bg-white overflow-hidden">
                          {company.logo ? (
                            <img 
                              src={company.logo} 
                              alt={`${company.name} logo`}
                              className="w-8 h-8 object-contain"
                              onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement;
                                target.style.display = 'none';
                                const fallback = target.nextElementSibling as HTMLElement;
                                if (fallback) {
                                  fallback.style.display = 'flex';
                                }
                              }}
                            />
                          ) : null}
                          <div 
                            className={`w-8 h-8 rounded bg-brand-primary/10 flex items-center justify-center ${company.logo ? 'hidden' : 'flex'}`}
                          >
                            <span className="text-xs font-bold text-brand-primary">
                              {company.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-neutral-900 hover:text-brand-primary transition-colors text-[15px]">
                            {company.name}
                          </div>
                          <div className="text-sm text-neutral-500 mt-0.5 font-medium">
                            {extractCityFromLocation(company.location)}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right py-5">
                      <div className="space-y-2">
                        <div className="flex items-center justify-end gap-2">
                          {fundingIndicator && (
                            <div className={`w-2 h-2 rounded-full ${
                              fundingIndicator.color === 'text-green-600' ? 'bg-green-500' :
                              fundingIndicator.color === 'text-blue-600' ? 'bg-blue-500' :
                              fundingIndicator.color === 'text-purple-600' ? 'bg-purple-500' : 'bg-neutral-400'
                            }`} />
                          )}
                          <div className={`font-bold tracking-tight ${
                            fundingIndicator?.size === 'large' ? 'text-2xl text-green-700' :
                            fundingIndicator?.size === 'medium' ? 'text-xl text-blue-700' :
                            'text-lg text-neutral-900'
                          }`}>
                            {formatFundingAmount(company.funding_amount)}
                          </div>
                        </div>
                        <div className="flex justify-end">
                          {stage ? (
                            <Badge 
                              variant={getStageVariant(stage)} 
                              className="font-medium text-xs px-2.5 py-1"
                            >
                              {stage}
                            </Badge>
                          ) : (
                            <span className="text-neutral-400 text-sm font-medium">Not disclosed</span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-5">
                      <div className="text-sm text-neutral-600 font-medium">
                        {formatDate(company.last_updated)}
                      </div>
                    </TableCell>
                    <TableCell className="py-5">
                      <div className="flex items-center gap-1">
                        <Button
                          variant={dashboardStore.isCompanySaved(company.name) ? "default" : "outline"}
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (dashboardStore.isCompanySaved(company.name)) {
                              dashboardStore.unsaveCompany(company.name);
                            } else {
                              dashboardStore.saveCompany(
                                company.name, 
                                company.funding_stage || "Not disclosed", 
                                company.funding_amount || "Not disclosed"
                              );
                            }
                          }}
                          className={`h-7 px-2 text-xs font-medium transition-all ${
                            dashboardStore.isCompanySaved(company.name)
                              ? "bg-brand-primary text-white border-brand-primary hover:bg-brand-primary/90"
                              : "bg-white border-neutral-300 hover:bg-brand-primary hover:text-white hover:border-brand-primary"
                          }`}
                        >
                          <Heart className={`h-3 w-3 mr-1 ${dashboardStore.isCompanySaved(company.name) ? "fill-current" : ""}`} />
                          {dashboardStore.isCompanySaved(company.name) ? "Saved" : "Save"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCompanyForReport(company.name);
                            setReportDialogOpen(true);
                          }}
                          className="h-7 w-7 p-0 hover:bg-neutral-200/50 transition-colors"
                          title="Generate Report"
                        >
                          <FileText className="h-3 w-3 text-neutral-500 hover:text-purple-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            openLink(company.links.website);
                          }}
                          className="h-7 w-7 p-0 hover:bg-neutral-200/50 transition-colors"
                          title="Website"
                        >
                          <Globe className="h-3 w-3 text-neutral-500 hover:text-neutral-700" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            openLink(company.links.linkedin);
                          }}
                          className="h-7 w-7 p-0 hover:bg-neutral-200/50 transition-colors"
                          title="LinkedIn"
                        >
                          <Linkedin className="h-3 w-3 text-neutral-500 hover:text-blue-600" />
                        </Button>
                        {company.links.news && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              openLink(company.links.news!);
                            }}
                            className="h-7 w-7 p-0 hover:bg-neutral-200/50 transition-colors"
                            title="News"
                          >
                            <Newspaper className="h-3 w-3 text-neutral-500 hover:text-green-600" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                  
                  {/* Expanded row content */}
                  {isExpanded && (
                    <TableRow className={`${isEven ? 'bg-white' : 'bg-[#fafbfc]'} border-b border-neutral-100/50`}>
                      <TableCell colSpan={6} className="p-6 pt-0">
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold text-neutral-900 mb-2">Company Overview</h4>
                            <p className="text-neutral-700 leading-relaxed">
                              {company.description}
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-200">
                              <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Valuation</span>
                              <p className="text-lg font-bold text-brand-success mt-1">
                                {company.valuation ? `$${(parseFloat(company.valuation.replace(/[^0-9.]/g, '')) / 1e9).toFixed(1)}B` : 'Private'}
                              </p>
                            </div>
                            <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-200">
                              <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Team Size</span>
                              <p className="text-lg font-bold text-neutral-900 mt-1">
                                {company.team_size > 0 ? `${company.team_size}+` : "Private"}
                              </p>
                            </div>
                            <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-200">
                              <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Founded</span>
                              <p className="text-lg font-bold text-neutral-900 mt-1">
                                {company.founded || "Private"}
                              </p>
                            </div>
                            <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-200">
                              <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Revenue Range</span>
                              <p className="text-lg font-bold text-neutral-900 mt-1">
                                {company.revenue_range || "Private"}
                              </p>
                            </div>
                            <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-200">
                              <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Last Updated</span>
                              <p className="text-lg font-bold text-neutral-900 mt-1">
                                {formatDate(company.last_updated)}
                              </p>
                            </div>
                          </div>

                          {/* Investors Section */}
                          {company.investors && company.investors.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-neutral-900 mb-3">Key Investors ({company.investors.length})</h4>
                              <div className="flex flex-wrap gap-2">
                                {company.investors.map((investor, index) => (
                                  <Badge 
                                    key={index} 
                                    variant="outline" 
                                    className="bg-brand-primary/5 border-brand-primary/20 text-brand-primary hover:bg-brand-primary/10 px-3 py-1.5 font-medium"
                                  >
                                    {investor}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {company.funding_or_launch_news && (
                            <div className="bg-gradient-to-r from-brand-primary/10 via-brand-secondary/10 to-brand-accent/10 rounded-lg p-4 border-l-4 border-brand-primary">
                              <h5 className="text-xs text-brand-primary font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                                <TrendingUp className="h-3 w-3" />
                                Latest Funding News
                              </h5>
                              <p className="text-sm text-neutral-800 leading-relaxed font-medium">
                                {company.funding_or_launch_news}
                              </p>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}
          </TableBody>
        </Table>
      </div>
      
      <ReportDialog
        open={reportDialogOpen}
        onOpenChange={setReportDialogOpen}
        companyName={selectedCompanyForReport}
      />
    </div>
  );
}