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
    icon: <Building2 className="h-6 w-6 text-primary" />,
    query: "use all the tools from mcp servers to reach the goal find the funding details of the recently launched fintech startups 2025 site: https://www.ycombinator.com/launches. list their profile in linkedin or any socials related to them as well use all the tools to reach this goal."
  },
  {
    id: "techcrunch",
    name: "TechCrunch",
    description: "Funding and startup news",
    icon: <TrendingUp className="h-6 w-6 text-muted-foreground" />,
    query: "Find latest TechCrunch funding news",
    comingSoon: true
  },
  {
    id: "crunchbase",
    name: "Crunchbase",
    description: "Funding and company overview",
    icon: <Target className="h-6 w-6 text-muted-foreground" />,
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
    <div className="grid gap-4 md:grid-cols-3">
      {searchCards.map((card) => (
        <Card
          key={card.id}
          className={`group cursor-pointer transition-all hover:shadow-md ${
            isLoading || card.comingSoon ? 'opacity-50 pointer-events-none' : ''
          }`}
          onClick={() => !isLoading && !card.comingSoon && onCardClick(card.query)}
        >
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                {card.icon}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold leading-none tracking-tight">
                    {card.name}
                  </h3>
                  {card.comingSoon && (
                    <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        </Card>
      ))}
      
      {isLoading && (
        <div className="col-span-full flex items-center justify-center py-8">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground" />
            <p className="text-sm text-muted-foreground">Loading sources...</p>
          </div>
        </div>
      )}
    </div>
  );
}