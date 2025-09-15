export interface FilterBubble {
  id: string;
  label: string;
  searchTerm: string;
  category: 'industry' | 'funding' | 'stage' | 'location' | 'size' | 'time';
}

// Updated filter bubbles that align with example queries
export const filterBubbleSets: FilterBubble[][] = [
  // Set 1: Industry & Tech Focus
  [
    { id: "ai-1", label: "AI", searchTerm: "AI companies", category: "industry" },
    { id: "fintech-1", label: "Fintech", searchTerm: "fintech startups", category: "industry" },
    { id: "healthcare-1", label: "Healthcare", searchTerm: "healthcare", category: "industry" },
    { id: "saas-1", label: "SaaS", searchTerm: "SaaS companies", category: "industry" },
    { id: "climate-1", label: "Climate Tech", searchTerm: "climate tech", category: "industry" },
    { id: "b2b-1", label: "B2B", searchTerm: "B2B startups", category: "industry" }
  ],
  // Set 2: Funding & Growth
  [
    { id: "series-a-2", label: "Series A", searchTerm: "raised Series A", category: "funding" },
    { id: "10m-plus-2", label: "$10M+", searchTerm: "with $10M+ funding", category: "funding" },
    { id: "recent-2", label: "Recent Funding", searchTerm: "recent funding", category: "funding" },
    { id: "partnerships-2", label: "Partnerships", searchTerm: "recent partnerships", category: "funding" },
    { id: "successful-2", label: "Successful", searchTerm: "successful", category: "stage" },
    { id: "growing-2", label: "Growing", searchTerm: "growing companies", category: "stage" }
  ],
  // Set 3: Location & Size
  [
    { id: "california-3", label: "California", searchTerm: "in California", category: "location" },
    { id: "european-3", label: "European", searchTerm: "European", category: "location" },
    { id: "usa-3", label: "USA", searchTerm: "in USA", category: "location" },
    { id: "50-plus-3", label: "50+ Employees", searchTerm: "with 50+ employees", category: "size" },
    { id: "founded-2020-3", label: "Founded 2020+", searchTerm: "founded after 2020", category: "time" },
    { id: "recent-months-3", label: "Recent Months", searchTerm: "in recent months", category: "time" }
  ],
  // Set 4: Specialized Filters
  [
    { id: "2025-4", label: "2025", searchTerm: "in 2025", category: "time" },
    { id: "2024-4", label: "2024", searchTerm: "in 2024", category: "time" },
    { id: "may-2025-4", label: "May 2025+", searchTerm: "From May 2025 onwards", category: "time" },
    { id: "startups-4", label: "Startups", searchTerm: "startups", category: "stage" },
    { id: "companies-4", label: "Companies", searchTerm: "companies", category: "stage" },
    { id: "unicorns-4", label: "Unicorns", searchTerm: "unicorn companies", category: "stage" }
  ]
];

// All filter bubbles for search functionality
export const allFilterBubbles: FilterBubble[] = filterBubbleSets.flat();