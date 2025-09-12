import { useState } from "react";
import { ChevronDown, ChevronRight, ExternalLink, Linkedin, Globe, Newspaper, ArrowUpDown } from "lucide-react";
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
    if (!amount || amount.trim() === '') return "Not available publicly";
    return amount;
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
    if (key === 'funding_amount') {
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
      <div className="rounded-lg border border-neutral-200 bg-white shadow-sm">
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow className="border-b border-neutral-200">
              <TableHead className="w-12"></TableHead>
              <TableHead 
                className="font-semibold text-neutral-900 cursor-pointer hover:bg-neutral-50"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-2">
                  Company Name
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead 
                className="font-semibold text-neutral-900 text-right cursor-pointer hover:bg-neutral-50"
                onClick={() => handleSort('funding_amount')}
              >
                <div className="flex items-center justify-end gap-2">
                  Funding Amount
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="font-semibold text-neutral-900">Stage</TableHead>
              <TableHead
                className="font-semibold text-neutral-900 cursor-pointer hover:bg-neutral-50"
                onClick={() => handleSort('last_updated')}
              >
                <div className="flex items-center gap-2">
                  Date
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="font-semibold text-neutral-900">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCompanies.map((company, index) => {
              const isExpanded = expandedRows.has(company.name);
              const isEven = index % 2 === 0;
              const stage = formatStage(company.funding_stage);
              
              return (
                <>
                  <TableRow 
                    key={company.name}
                    className={`${
                      isEven ? 'bg-white' : 'bg-neutral-50/50'
                    } hover:bg-neutral-100/50 transition-colors cursor-pointer`}
                    onClick={() => onCompanyClick?.(company)}
                  >
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRowExpansion(company.name);
                        }}
                        className="h-6 w-6 p-0"
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="font-bold text-neutral-900 hover:text-brand-primary transition-colors">
                        {company.name}
                      </div>
                      <div className="text-sm text-neutral-600 mt-1">
                        {company.location || "Not available publicly"}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="text-lg font-semibold text-neutral-900">
                        {formatFundingAmount(company.funding_amount)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {stage ? (
                        <Badge variant={getStageVariant(stage)} className="font-medium">
                          {stage}
                        </Badge>
                      ) : (
                        <span className="text-neutral-500 text-sm">Not available publicly</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-neutral-600">
                        {formatDate(company.last_updated)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            openLink(company.links.website);
                          }}
                          className="h-8 w-8 p-0"
                          title="Website"
                        >
                          <Globe className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            openLink(company.links.linkedin);
                          }}
                          className="h-8 w-8 p-0"
                          title="LinkedIn"
                        >
                          <Linkedin className="h-4 w-4" />
                        </Button>
                        {company.links.news && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              openLink(company.links.news!);
                            }}
                            className="h-8 w-8 p-0"
                            title="News"
                          >
                            <Newspaper className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                  
                  {/* Expanded row content */}
                  {isExpanded && (
                    <TableRow className={isEven ? 'bg-white' : 'bg-neutral-50/50'}>
                      <TableCell colSpan={6} className="p-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-neutral-900 mb-2">Description</h4>
                            <p className="text-neutral-700 leading-relaxed">
                              {company.description}
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <span className="text-sm font-medium text-neutral-500">Team Size</span>
                              <p className="text-neutral-900 font-semibold">
                                {company.team_size > 0 ? company.team_size : "Not available publicly"}
                              </p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-neutral-500">Founded</span>
                              <p className="text-neutral-900 font-semibold">
                                {company.founded || "Not available publicly"}
                              </p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-neutral-500">Revenue Range</span>
                              <p className="text-neutral-900 font-semibold">
                                {company.revenue_range || "Not available publicly"}
                              </p>
                            </div>
                          </div>
                          
                          {company.funding_or_launch_news && (
                            <div className="bg-gradient-to-r from-brand-primary/10 via-brand-secondary/10 to-brand-accent/10 rounded-lg p-4 border-l-4 border-brand-primary">
                              <h5 className="text-xs text-brand-primary font-bold uppercase tracking-wider mb-2">
                                Latest Funding News
                              </h5>
                              <p className="text-sm text-neutral-800 leading-relaxed">
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
    </div>
  );
}