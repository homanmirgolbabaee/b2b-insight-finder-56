export interface FilterBubble {
  id: string;
  label: string;
  category: string;
  searchTerm: string;
}

// Shared filter bubble data
export const allFilterBubbles: FilterBubble[] = [
  // Industries
  { id: "ai", label: "AI", category: "industry", searchTerm: "AI companies" },
  { id: "fintech", label: "Fintech", category: "industry", searchTerm: "fintech startups" },
  { id: "healthcare", label: "Healthcare", category: "industry", searchTerm: "healthcare companies" },
  { id: "saas", label: "SaaS", category: "industry", searchTerm: "SaaS companies" },
  { id: "enterprise", label: "Enterprise", category: "industry", searchTerm: "enterprise software" },
  { id: "consumer", label: "Consumer", category: "industry", searchTerm: "consumer companies" },
  { id: "climate", label: "Climate", category: "industry", searchTerm: "climate tech companies" },
  { id: "biotech", label: "Biotech", category: "industry", searchTerm: "biotech companies" },
  
  // Funding Stages
  { id: "seed", label: "Seed", category: "funding", searchTerm: "seed stage companies" },
  { id: "series-a", label: "Series A", category: "funding", searchTerm: "Series A companies" },
  { id: "series-b", label: "Series B", category: "funding", searchTerm: "Series B companies" },
  { id: "growth", label: "Growth", category: "funding", searchTerm: "growth stage companies" },
  
  // Size
  { id: "unicorn", label: "Unicorn", category: "size", searchTerm: "unicorn companies" },
  { id: "profitable", label: "Profitable", category: "size", searchTerm: "profitable companies" },
  
  // Location
  { id: "usa", label: "USA", category: "location", searchTerm: "US companies" },
  { id: "europe", label: "Europe", category: "location", searchTerm: "European companies" },
  
  // Timeline
  { id: "recent", label: "Recent", category: "timeline", searchTerm: "recently funded" },
  { id: "ipo", label: "IPO Ready", category: "timeline", searchTerm: "IPO ready companies" },
];

// Organized sets for the filter bubbles display
export const filterBubbleSets: FilterBubble[][] = [
  [
    // Set 1: Investment Focus
    allFilterBubbles.find(f => f.id === "ai")!,
    allFilterBubbles.find(f => f.id === "fintech")!,
    allFilterBubbles.find(f => f.id === "saas")!,
    allFilterBubbles.find(f => f.id === "seed")!,
    allFilterBubbles.find(f => f.id === "series-a")!,
    allFilterBubbles.find(f => f.id === "growth")!,
  ],
  [
    // Set 2: Market Segments
    allFilterBubbles.find(f => f.id === "healthcare")!,
    allFilterBubbles.find(f => f.id === "enterprise")!,
    allFilterBubbles.find(f => f.id === "consumer")!,
    allFilterBubbles.find(f => f.id === "series-b")!,
    allFilterBubbles.find(f => f.id === "unicorn")!,
    allFilterBubbles.find(f => f.id === "profitable")!,
  ],
  [
    // Set 3: Geography & Timing
    allFilterBubbles.find(f => f.id === "usa")!,
    allFilterBubbles.find(f => f.id === "europe")!,
    allFilterBubbles.find(f => f.id === "climate")!,
    allFilterBubbles.find(f => f.id === "biotech")!,
    allFilterBubbles.find(f => f.id === "recent")!,
    allFilterBubbles.find(f => f.id === "ipo")!,
  ]
];