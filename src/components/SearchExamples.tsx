import { Search, Sparkles, TrendingUp, Building2, Globe, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SearchExample {
  id: string;
  title: string;
  description: string;
  query: string;
  icon: React.ReactNode;
  category: string;
}

const searchExamples: SearchExample[] = [
  {
    id: "ai-2025",
    title: "Successful AI Companies (2025)",
    description: "Search for successful AI companies in recent months in 2025, from May 2025 onwards",
    query: "search for successful ai companies in recent months in 2025. from may 2025 onwards",
    icon: <Sparkles className="h-5 w-5 text-brand-primary" />,
    category: "Trending"
  },
  {
    id: "fintech-funding",
    title: "Fintech Funding Rounds",
    description: "Recent Series A & B fintech startups with funding details",
    query: "find fintech startups that raised Series A or Series B funding in the last 6 months",
    icon: <TrendingUp className="h-5 w-5 text-brand-success" />,
    category: "Funding"
  },
  {
    id: "saas-competitors",
    title: "SaaS Competitors Analysis",
    description: "B2B SaaS companies in project management space",
    query: "analyze B2B SaaS companies competing in project management and productivity tools",
    icon: <Building2 className="h-5 w-5 text-brand-accent" />,
    category: "Analysis"
  },
  {
    id: "european-unicorns",
    title: "European Unicorns",
    description: "Billion-dollar startups founded in Europe",
    query: "find European unicorn startups valued over $1 billion founded in the last 3 years",
    icon: <Globe className="h-5 w-5 text-brand-secondary" />,
    category: "Regional"
  },
  {
    id: "climate-tech",
    title: "Climate Tech Startups",
    description: "Clean energy and sustainability focused companies",
    query: "discover climate tech and clean energy startups with recent funding announcements",
    icon: <Target className="h-5 w-5 text-brand-success" />,
    category: "Sector"
  }
];

interface SearchExamplesProps {
  onExampleClick: (query: string) => void;
  isLoading: boolean;
}

export function SearchExamples({ onExampleClick, isLoading }: SearchExamplesProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Search className="h-5 w-5 text-brand-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Popular Searches</h3>
        </div>
        <p className="text-text-secondary">
          Click any example below to get started, or create your own custom search
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchExamples.map((example) => (
          <Card
            key={example.id}
            className={`group relative p-4 cursor-pointer transition-premium hover:shadow-card-hover border border-neutral-200 bg-gradient-card rounded-lg ${
              isLoading ? 'opacity-50 pointer-events-none' : 'hover:border-brand-primary/20'
            }`}
            onClick={() => !isLoading && onExampleClick(example.query)}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-shrink-0 p-2 bg-neutral-100 rounded-lg group-hover:bg-brand-primary/10 transition-premium">
                  {example.icon}
                </div>
                <span className="text-xs text-text-tertiary bg-neutral-100 px-2 py-1 rounded-md">
                  {example.category}
                </span>
              </div>
              
              <div>
                <h4 className="font-medium text-text-primary mb-1 group-hover:text-brand-primary transition-premium">
                  {example.title}
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {example.description}
                </p>
              </div>
              
              <div className="flex items-center text-xs text-brand-primary opacity-0 group-hover:opacity-100 transition-premium">
                <Search className="h-3 w-3 mr-1" />
                Try this search
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}