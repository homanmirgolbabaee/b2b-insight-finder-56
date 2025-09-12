import { ExternalLink, Linkedin, Globe, Newspaper, DollarSign, Users, MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface CompanyCardProps {
  company: Company;
  onClick?: (company: Company) => void;
}

export function CompanyCard({ company, onClick }: CompanyCardProps) {
  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger card click if clicking on action buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    if (onClick) {
      onClick(company);
    }
  };

  const hasFunding = company.funding_amount && company.funding_amount.trim() !== "";
  const hasStage = company.funding_stage && company.funding_stage.trim() !== "";

  return (
    <Card 
      className="h-full bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-primary/40 cursor-pointer group"
      onClick={handleCardClick}
    >      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-semibold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {company.name}
          </CardTitle>
          {(hasFunding || hasStage) && (
            <div className="flex flex-col gap-1 items-end flex-shrink-0">
              {hasFunding && (
                <Badge variant="secondary" className="text-xs font-medium bg-green-100 text-green-800 border-green-200">
                  <DollarSign className="w-3 h-3 mr-1" />
                  {company.funding_amount}
                </Badge>
              )}
              {hasStage && (
                <Badge variant="outline" className="text-xs">
                  {company.funding_stage}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {company.description}
        </p>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Team:</span>
            <span className="font-medium text-foreground">
              {company.team_size > 0 ? company.team_size : "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Founded:</span>
            <span className="font-medium text-foreground">
              {company.founded || "N/A"}
            </span>
          </div>
        </div>

        {company.location && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Location:</span>
            <span className="font-medium text-foreground">{company.location}</span>
          </div>
        )}
        
        {/* Funding News - Only show if it exists */}
        {company.funding_or_launch_news && (
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-primary uppercase tracking-wide">
                Latest Update
              </span>
            </div>
            <p className="text-sm text-foreground line-clamp-2 leading-relaxed">
              {company.funding_or_launch_news}
            </p>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              openLink(company.links.website);
            }}
            className="flex items-center gap-2 flex-1 text-xs"
          >
            <Globe className="h-3 w-3" />
            Website
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              openLink(company.links.linkedin);
            }}
            className="flex items-center gap-2 flex-1 text-xs"
          >
            <Linkedin className="h-3 w-3" />
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
              className="flex items-center gap-2 flex-1 text-xs"
            >
              <Newspaper className="h-3 w-3" />
              News
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}