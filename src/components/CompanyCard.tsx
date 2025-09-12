import { ExternalLink, Linkedin, Globe, Newspaper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

  return (
    <Card 
      className="h-full bg-gradient-card backdrop-blur-premium border border-neutral-200/60 shadow-premium hover:shadow-premium-hover transition-premium hover:border-brand-primary/40 hover:-translate-y-2 cursor-pointer group overflow-hidden"
      onClick={handleCardClick}
    >
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-premium" />
      
      <CardHeader className="pb-4 relative z-10">
        <CardTitle className="text-xl font-bold text-neutral-900 leading-tight group-hover:text-brand-primary transition-premium">
          {company.name}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-5 relative z-10">
        <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3 font-medium">
          {company.description}
        </p>
        
        {/* Company Details */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-neutral-500 font-medium">Funding:</span>
            <p className="text-neutral-800 font-semibold">
              {company.funding_amount || "Not available publicly"}
            </p>
          </div>
          <div>
            <span className="text-neutral-500 font-medium">Stage:</span>
            <p className="text-neutral-800 font-semibold">
              {company.funding_stage || "Not available publicly"}
            </p>
          </div>
          <div>
            <span className="text-neutral-500 font-medium">Team Size:</span>
            <p className="text-neutral-800 font-semibold">
              {company.team_size > 0 ? company.team_size : "Not available publicly"}
            </p>
          </div>
          <div>
            <span className="text-neutral-500 font-medium">Founded:</span>
            <p className="text-neutral-800 font-semibold">
              {company.founded || "Not available publicly"}
            </p>
          </div>
        </div>
        
        {company.location && (
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <span className="font-medium">Location:</span>
            <span>{company.location}</span>
          </div>
        )}
        
        {company.funding_or_launch_news && (
          <div className="bg-gradient-to-r from-brand-primary/10 via-brand-secondary/10 to-brand-accent/10 rounded-xl p-4 border-l-4 border-brand-primary shadow-inner">
            <p className="text-xs text-brand-primary font-bold uppercase tracking-wider mb-2">
              Latest Funding News
            </p>
            <p className="text-sm text-neutral-800 font-semibold line-clamp-2 leading-relaxed">
              {company.funding_or_launch_news}
            </p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-3 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              openLink(company.links.website);
            }}
            className="flex items-center gap-2 text-neutral-600 hover:text-brand-primary hover:border-brand-primary hover:bg-brand-primary/5 transition-premium font-medium"
          >
            <Globe className="h-4 w-4" />
            Website
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              openLink(company.links.linkedin);
            }}
            className="flex items-center gap-2 text-neutral-600 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-premium font-medium"
          >
            <Linkedin className="h-4 w-4" />
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
              className="flex items-center gap-2 text-neutral-600 hover:text-brand-success hover:border-brand-success hover:bg-brand-success/5 transition-premium font-medium"
            >
              <Newspaper className="h-4 w-4" />
              News
            </Button>
          )}
        </div>
        
        {/* Premium Click Hint */}
        <div className="text-xs text-neutral-500 opacity-0 group-hover:opacity-100 transition-premium pt-3 border-t border-neutral-200/60 flex items-center justify-center gap-2 font-medium">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
          Click for detailed insights
        </div>
      </CardContent>
    </Card>
  );
}