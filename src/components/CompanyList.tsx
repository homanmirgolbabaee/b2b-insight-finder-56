import { useState } from "react";
import { ChevronRight, ExternalLink, Linkedin, Globe, Newspaper, Star, Building2, MapPin, Calendar, Users, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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

interface CompanyListProps {
  companies: Company[];
  onCompanyClick?: (company: Company) => void;
}

export function CompanyList({ companies, onCompanyClick }: CompanyListProps) {
  const [savedCompanies, setSavedCompanies] = useState<Set<string>>(new Set());

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const toggleSave = (companyName: string) => {
    setSavedCompanies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(companyName)) {
        newSet.delete(companyName);
      } else {
        newSet.add(companyName);
      }
      return newSet;
    });
  };

  const formatFundingAmount = (amount: string) => {
    if (!amount || amount.trim() === '') return "Undisclosed";
    return amount;
  };

  const formatStage = (stage: string) => {
    if (!stage || stage.trim() === '') return null;
    const stageMatch = stage.match(/(Pre-seed|Seed|Series [A-Z]|Series [A-Z]\d*)/i);
    return stageMatch ? stageMatch[1] : stage;
  };

  const getStageColor = (stage: string) => {
    const lowerStage = stage.toLowerCase();
    if (lowerStage.includes('pre-seed')) return 'bg-slate-100 text-slate-700 border-slate-200';
    if (lowerStage.includes('seed')) return 'bg-green-100 text-green-700 border-green-200';
    if (lowerStage.includes('series a')) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (lowerStage.includes('series b')) return 'bg-purple-100 text-purple-700 border-purple-200';
    if (lowerStage.includes('series c')) return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const extractCityFromLocation = (location: string) => {
    if (!location || location.trim() === '') return "Not disclosed";
    return location.split(',')[0].trim();
  };

  return (
    <div className="space-y-4">
      {companies.map((company, index) => {
        const stage = formatStage(company.funding_stage);
        const isSaved = savedCompanies.has(company.name);
        
        return (
          <Card 
            key={`${company.name}-${index}`} 
            className="group hover:shadow-lg transition-all duration-200 border-border/50 hover:border-border cursor-pointer"
            onClick={() => onCompanyClick?.(company)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  {/* Company Logo */}
                  <div className="w-12 h-12 rounded-lg border border-border bg-card flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {company.logo ? (
                      <img 
                        src={company.logo} 
                        alt={`${company.name} logo`}
                        className="w-10 h-10 object-contain"
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
                      className={`w-10 h-10 rounded bg-primary/10 flex items-center justify-center ${company.logo ? 'hidden' : 'flex'}`}
                    >
                      <span className="text-sm font-semibold text-primary">
                        {company.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {company.name}
                      </h3>
                      {stage && (
                        <Badge variant="secondary" className={`${getStageColor(stage)} text-xs font-medium`}>
                          {stage}
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                      {company.description}
                    </p>

                    {/* Metrics Row */}
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-medium">{formatFundingAmount(company.funding_amount)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{extractCityFromLocation(company.location)}</span>
                      </div>
                      {company.team_size > 0 && (
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{company.team_size}+ employees</span>
                        </div>
                      )}
                      {company.founded && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Founded {company.founded}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(company.name);
                    }}
                    className={`h-8 w-8 p-0 transition-colors ${
                      isSaved 
                        ? 'text-primary hover:text-primary/80' 
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                    title={isSaved ? "Remove from saved" : "Save company"}
                  >
                    <Star className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Recent News */}
              {company.funding_or_launch_news && (
                <div className="mb-4 p-3 bg-muted/30 rounded-md border border-border/50">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-foreground font-medium leading-relaxed">
                      {company.funding_or_launch_news}
                    </p>
                  </div>
                </div>
              )}

              {/* Investors */}
              {company.investors && company.investors.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Key Investors</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {company.investors.slice(0, 4).map((investor, i) => (
                      <Badge key={i} variant="outline" className="text-xs bg-background">
                        {investor}
                      </Badge>
                    ))}
                    {company.investors.length > 4 && (
                      <Badge variant="outline" className="text-xs bg-background">
                        +{company.investors.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <Separator className="mb-4" />

              {/* Action Links */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openLink(company.links.website);
                    }}
                    className="h-8 px-3 text-xs"
                  >
                    <Globe className="h-3 w-3 mr-1" />
                    Website
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openLink(company.links.linkedin);
                    }}
                    className="h-8 px-3 text-xs"
                  >
                    <Linkedin className="h-3 w-3 mr-1" />
                    LinkedIn
                  </Button>
                  {company.links.news && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLink(company.links.news!);
                      }}
                      className="h-8 px-3 text-xs"
                    >
                      <Newspaper className="h-3 w-3 mr-1" />
                      News
                    </Button>
                  )}
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Updated {new Date(company.last_updated).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}