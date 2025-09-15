import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lightbulb, ArrowRight, Sparkles } from "lucide-react";

interface ExampleQueriesProps {
  onQuerySelect: (query: string) => void;
}

const exampleQueries = [
  {
    title: "AI Companies 2025",
    query: "Search for successful AI companies in recent months in 2025. From May 2025 onwards",
    category: "AI & Tech",
    highlight: "recent months"
  },
  {
    title: "Fintech Series A",
    query: "Find fintech startups that raised Series A in 2024",
    category: "Fintech",
    highlight: "Series A"
  },
  {
    title: "Healthcare AI Funding",
    query: "Companies in healthcare AI with $10M+ funding",
    category: "Healthcare",
    highlight: "$10M+ funding"
  },
  {
    title: "European SaaS",
    query: "European SaaS companies founded after 2020",
    category: "SaaS",
    highlight: "European"
  },
  {
    title: "B2B California",
    query: "B2B startups in California with 50+ employees",
    category: "B2B",
    highlight: "50+ employees"
  },
  {
    title: "Climate Tech",
    query: "Climate tech companies with recent partnerships",
    category: "Climate",
    highlight: "partnerships"
  }
];

export function ExampleQueries({ onQuerySelect }: ExampleQueriesProps) {
  const [hoveredExample, setHoveredExample] = useState<number | null>(null);

  return (
    <Card className="p-6 sm:p-8 bg-gradient-card shadow-premium border-0 max-w-5xl mx-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-text-primary">Query Examples</h3>
          </div>
          <p className="text-text-secondary font-medium">
            Click any example to start your search, or use the filter bubbles to build your own query
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {exampleQueries.map((example, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredExample(index)}
              onMouseLeave={() => setHoveredExample(null)}
            >
              <Card className="h-full p-4 bg-white/80 hover:bg-white border border-neutral-200/60 hover:border-primary/30 hover:shadow-card transition-all duration-300 cursor-pointer group-hover:scale-[1.02]">
                <div className="space-y-3">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2 py-1 bg-gradient-primary/10 text-primary rounded-full">
                      {example.category}
                    </span>
                    {hoveredExample === index && (
                      <div className="flex items-center gap-1 text-primary animate-fade-in">
                        <span className="text-xs font-medium">Try it</span>
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h4 className="font-bold text-text-primary text-sm leading-tight">
                    {example.title}
                  </h4>

                  {/* Query Preview */}
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                    {example.query}
                  </p>

                  {/* Highlight */}
                  <div className="flex items-center gap-1 pt-2 border-t border-neutral-100">
                    <Sparkles className="h-3 w-3 text-amber-500" />
                    <span className="text-xs font-medium text-amber-600">
                      {example.highlight}
                    </span>
                  </div>
                </div>

                {/* Click Handler */}
                <button
                  onClick={() => onQuerySelect(example.query)}
                  className="absolute inset-0 w-full h-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  aria-label={`Search: ${example.title}`}
                />
              </Card>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center pt-4 border-t border-neutral-200/60">
          <p className="text-sm text-text-secondary font-medium">
            Or build your own query using the filter bubbles above
          </p>
        </div>
      </div>
    </Card>
  );
}