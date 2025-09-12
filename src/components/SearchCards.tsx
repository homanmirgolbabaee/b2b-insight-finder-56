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
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {searchCards.map((card) => (
          <Card
            key={card.id}
            className={`group relative p-8 cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 border border-neutral-200 bg-white rounded-2xl ${
              isLoading || card.comingSoon ? 'opacity-60 pointer-events-none' : 'hover:border-brand-primary/20'
            }`}
            onClick={() => !isLoading && !card.comingSoon && onCardClick(card.query)}
          >
            <div className="flex flex-col items-start space-y-4">
              <div className="p-3 bg-neutral-50 rounded-xl group-hover:bg-brand-primary/5 transition-colors duration-300">
                {card.icon}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {card.name}
                  </h3>
                  {card.comingSoon && (
                    <span className="text-xs text-neutral-400 bg-neutral-100 px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
            
            {/* Hover indicator */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
          </Card>
        ))}
      </div>
      
      {isLoading && (
        <div className="text-center mt-12">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
            <p className="text-neutral-600 font-medium">Searching...</p>
          </div>
        </div>
      )}
    </div>
  );
}