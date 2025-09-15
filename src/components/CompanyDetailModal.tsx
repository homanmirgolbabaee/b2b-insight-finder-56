import { X, ExternalLink, Linkedin, Globe, Newspaper, Building2, Calendar, MapPin, Users, TrendingUp, DollarSign, Target, Briefcase, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

interface CompanyDetailModalProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
  similarCompanies?: Company[];
}

export function CompanyDetailModal({ company, isOpen, onClose, similarCompanies = [] }: CompanyDetailModalProps) {
  if (!company) return null;

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
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

  const stage = formatStage(company.funding_stage);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="p-6 pb-4 border-b border-border">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-xl border border-border bg-card flex items-center justify-center overflow-hidden">
                  {company.logo ? (
                    <img 
                      src={company.logo} 
                      alt={`${company.name} logo`}
                      className="w-14 h-14 object-contain"
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
                    className={`w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center ${company.logo ? 'hidden' : 'flex'}`}
                  >
                    <span className="text-xl font-bold text-primary">
                      {company.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div>
                  <DialogTitle className="text-2xl font-bold text-foreground mb-2">
                    {company.name}
                  </DialogTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {stage && (
                      <Badge variant="secondary" className={`${getStageColor(stage)} text-xs font-medium`}>
                        {stage}
                      </Badge>
                    )}
                    {company.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{company.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Founded {company.founded || "Not disclosed"}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Description */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    About
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {company.description}
                  </p>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Key Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                        <DollarSign className="h-4 w-4" />
                        Total Funding
                      </div>
                      <div className="text-xl font-bold text-foreground">
                        {formatFundingAmount(company.funding_amount)}
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                        <Target className="h-4 w-4" />
                        Valuation
                      </div>
                      <div className="text-xl font-bold text-foreground">
                        {company.valuation || "Private"}
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                        <Users className="h-4 w-4" />
                        Team Size
                      </div>
                      <div className="text-xl font-bold text-foreground">
                        {company.team_size > 0 ? `${company.team_size}+` : "Private"}
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                        <TrendingUp className="h-4 w-4" />
                        Revenue
                      </div>
                      <div className="text-xl font-bold text-foreground">
                        {company.revenue_range || "Private"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent News */}
              {company.funding_or_launch_news && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Newspaper className="h-5 w-5 text-primary" />
                      Latest News
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <p className="text-foreground leading-relaxed">
                        {company.funding_or_launch_news}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Investors */}
              {company.investors && company.investors.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      Investors ({company.investors.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {company.investors.map((investor, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="bg-background hover:bg-muted/50 transition-colors"
                        >
                          {investor}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Similar Companies */}
              {similarCompanies.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Star className="h-5 w-5 text-primary" />
                      Similar Companies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {similarCompanies.slice(0, 3).map((similar, index) => (
                        <div
                          key={`${similar.name}-${index}`}
                          className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{similar.name}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {similar.description}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-primary"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-border p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => openLink(company.links.website)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Visit Website
                </Button>
                <Button
                  variant="outline"
                  onClick={() => openLink(company.links.linkedin)}
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
                {company.links.news && (
                  <Button
                    variant="outline"
                    onClick={() => openLink(company.links.news!)}
                  >
                    <Newspaper className="h-4 w-4 mr-2" />
                    News
                  </Button>
                )}
              </div>
              
              <div className="text-sm text-muted-foreground">
                Last updated: {new Date(company.last_updated).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}