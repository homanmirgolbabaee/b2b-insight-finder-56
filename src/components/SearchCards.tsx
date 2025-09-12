import { Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SearchCard {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  query: string;
}

const searchCards: SearchCard[] = [
  {
    id: "yc-fintech",
    name: "Y Combinator",
    description: "Recent fintech startups from YC 2025",
    icon: <Building2 className="h-8 w-8 text-orange-500" />,
    query: "use all the tools from mcp servers to reach the goal find the funding details of the recently launched fintech startups 2025 site: https://www.ycombinator.com/launches. list their profile in linkedin or any socials related to them as well use all the tools to reach this goal."
  },
  // Placeholder cards for future expansion
  {
    id: "techcrunch",
    name: "TechCrunch",
    description: "Latest startup funding news",
    icon: <Building2 className="h-8 w-8 text-green-500" />,
    query: "Find latest TechCrunch funding news"
  },
  {
    id: "crunchbase",
    name: "Crunchbase",
    description: "Startup database insights",
    icon: <Building2 className="h-8 w-8 text-blue-500" />,
    query: "Search Crunchbase for startup insights"
  }
];

interface SearchCardsProps {
  onCardClick: (query: string) => void;
  isLoading: boolean;
}

export function SearchCards({ onCardClick, isLoading }: SearchCardsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchCards.map((card) => (
          <Card
            key={card.id}
            className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-gray-200 bg-surface ${
              isLoading ? 'opacity-50 pointer-events-none' : ''
            }`}
            onClick={() => !isLoading && onCardClick(card.query)}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-gray-50 rounded-full">
                {card.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {card.name}
                </h3>
                <p className="text-text-secondary text-sm">
                  {card.description}
                </p>
              </div>
              {card.id !== 'yc-fintech' && (
                <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                  Coming Soon
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
      
      {isLoading && (
        <div className="text-center mt-8">
          <p className="text-text-secondary">Searching...</p>
        </div>
      )}
    </div>
  );
}