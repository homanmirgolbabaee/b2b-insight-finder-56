import { Building2, TrendingUp, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SearchCard {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  query: string;
  comingSoon?: boolean;
}

const searchCards: SearchCard[] = [
  {
    id: "yc-fintech",
    name: "Y Combinator",
    description: "Latest YC launches and batch highlights",
    icon: <Building2 className="h-6 w-6 text-brand-primary" />,
    query: "use all the tools from mcp servers to reach the goal find the funding details of the recently launched fintech startups 2025 site: https://www.ycombinator.com/launches. list their profile in linkedin or any socials related to them as well use all the tools to reach this goal."
  },
  {
    id: "techcrunch",
    name: "TechCrunch",
    description: "Funding and startup news",
    icon: <TrendingUp className="h-6 w-6 text-neutral-400" />,
    query: "Find latest TechCrunch funding news",
    comingSoon: true
  },
  {
    id: "crunchbase",
    name: "Crunchbase",
    description: "Funding and company overview",
    icon: <Target className="h-6 w-6 text-neutral-400" />,
    query: "Search Crunchbase for startup insights",
    comingSoon: true
  }
];

interface SearchCardsProps {
  onCardClick: (query: string) => void;
  isLoading: boolean;
}

export function SearchCards({ onCardClick, isLoading }: SearchCardsProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-1 gap-3">
        {searchCards.map((card) => (
          <Card
            key={card.id}
            className={`group relative p-6 cursor-pointer transition-all duration-200 hover:shadow-card-hover hover:bg-accent border rounded-xl ${
              isLoading || card.comingSoon ? 'opacity-50 pointer-events-none' : 'hover:border-primary/20'
            }`}
            onClick={() => !isLoading && !card.comingSoon && onCardClick(card.query)}
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 p-3 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors duration-200">
                {card.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-foreground truncate">
                    {card.name}
                  </h3>
                  {card.comingSoon && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md whitespace-nowrap">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {card.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {isLoading && (
        <div className="text-center mt-6">
          <div className="flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-pulse" />
            <p className="text-sm text-neutral-600">Loading sources...</p>
          </div>
        </div>
      )}
    </div>
  );
}