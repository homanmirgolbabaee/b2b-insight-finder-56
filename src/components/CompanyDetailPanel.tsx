import { X, ExternalLink, Linkedin, Globe, Newspaper, Building2, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

interface CompanyDetailPanelProps {
  company: Company;
  onClose: () => void;
  similarCompanies?: Company[];
}

export function CompanyDetailPanel({ company, onClose, similarCompanies = [] }: CompanyDetailPanelProps) {
  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden bg-surface">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4 border-b border-gray-200">
          <div className="flex-1">
            <CardTitle className="text-2xl font-bold text-text-primary mb-2">
              {company.name}
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                <span>{company.funding_stage || "Company"}</span>
              </div>
              {company.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{company.location}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Founded {company.founded || "Not available publicly"}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="overflow-y-auto max-h-[calc(90vh-140px)] p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-3">About</h3>
            <p className="text-text-secondary leading-relaxed">
              {company.description}
            </p>
          </div>

          {/* Company Metrics */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-3">Company Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-text-secondary">Funding Amount</div>
                <div className="font-medium text-text-primary">
                  {company.funding_amount || "Not available publicly"}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-text-secondary">Funding Stage</div>
                <div className="font-medium text-text-primary">
                  {company.funding_stage || "Not available publicly"}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-text-secondary">Team Size</div>
                <div className="font-medium text-text-primary">
                  {company.team_size > 0 ? `${company.team_size} employees` : "Not available publicly"}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-text-secondary">Revenue Range</div>
                <div className="font-medium text-text-primary">
                  {company.revenue_range || "Not available publicly"}
                </div>
              </div>
            </div>
          </div>

          {/* Funding/Launch News */}
          {company.funding_or_launch_news && (
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">Latest News</h3>
              <div className="bg-gradient-to-r from-brand-blue-light/20 to-accent-green-light/20 rounded-lg p-4 border-l-4 border-brand-blue">
                <p className="text-text-primary font-medium text-sm">
                  {company.funding_or_launch_news}
                </p>
              </div>
            </div>
          )}

          <Separator />

          {/* Actions */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-3">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                variant="outline"
                onClick={() => openLink(company.links.website)}
                className="flex items-center gap-2 h-12 bg-surface border-gray-200 text-text-secondary hover:text-brand-blue hover:border-brand-blue hover:bg-brand-blue-light/10"
              >
                <Globe className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Website</div>
                  <div className="text-xs text-text-tertiary">Visit company site</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => openLink(company.links.linkedin)}
                className="flex items-center gap-2 h-12 bg-surface border-gray-200 text-text-secondary hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50"
              >
                <Linkedin className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">LinkedIn</div>
                  <div className="text-xs text-text-tertiary">Company profile</div>
                </div>
              </Button>
              
              {company.links.news && (
                <Button
                  variant="outline"
                  onClick={() => openLink(company.links.news!)}
                  className="flex items-center gap-2 h-12 bg-surface border-gray-200 text-text-secondary hover:text-accent-green hover:border-accent-green hover:bg-accent-green-light/10"
                >
                  <Newspaper className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">News</div>
                    <div className="text-xs text-text-tertiary">Latest articles</div>
                  </div>
                </Button>
              )}
            </div>
          </div>

          {/* Similar Companies */}
          {similarCompanies.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">Similar Companies</h3>
                <div className="space-y-3">
                  {similarCompanies.slice(0, 3).map((similar, index) => (
                    <div
                      key={`${similar.name}-${index}`}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-text-primary">{similar.name}</h4>
                        <p className="text-sm text-text-secondary line-clamp-1">
                          {similar.description}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-text-secondary hover:text-brand-blue"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Tags/Categories */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-brand-blue-light text-brand-blue">
                Technology
              </Badge>
              <Badge variant="secondary" className="bg-accent-green-light text-accent-green">
                Growth Stage
              </Badge>
              <Badge variant="secondary" className="bg-gray-100 text-gray-500">
                B2B
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}