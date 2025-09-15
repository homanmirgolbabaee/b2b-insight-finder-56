import { TrendingUp, DollarSign, Building2, Download, Bookmark, Share2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Company {
  name: string;
  description: string;
  funding_or_launch_news: string;
  funding_amount: string;
  funding_stage: string;
  valuation: string;
  revenue_range: string;
  team_size: number;
  founded: string;
  location: string;
  last_updated: string;
  investors: string[];
  links: {
    news?: string | null;
    linkedin: string;
    website: string;
  };
}

interface InvestmentSummaryProps {
  companies: Company[];
}

export function InvestmentSummary({ companies }: InvestmentSummaryProps) {
  const calculateTotalFunding = () => {
    let total = 0;
    let validCount = 0;

    companies.forEach(company => {
      const amount = company.funding_amount;
      if (amount && amount.trim() !== '') {
        // Extract numbers from funding amount
        const match = amount.match(/\$?([\d.]+)\s*(B|M|K)?/i);
        if (match) {
          const value = parseFloat(match[1]);
          const unit = match[2]?.toUpperCase();
          
          let multiplier = 1;
          if (unit === 'B') multiplier = 1000000000;
          else if (unit === 'M') multiplier = 1000000;
          else if (unit === 'K') multiplier = 1000;
          
          total += value * multiplier;
          validCount++;
        }
      }
    });

    const formatTotal = (value: number) => {
      if (value >= 1000000000) {
        return `$${(value / 1000000000).toFixed(1)}B`;
      } else if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(1)}M`;
      } else if (value >= 1000) {
        return `$${(value / 1000).toFixed(1)}K`;
      }
      return `$${value.toFixed(0)}`;
    };

    const average = validCount > 0 ? total / validCount : 0;

    return {
      total: formatTotal(total),
      average: formatTotal(average),
      validCount
    };
  };

  const { total, average, validCount } = calculateTotalFunding();

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 bg-gradient-to-r from-neutral-50 to-white border border-neutral-100 rounded-xl shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-primary/10 rounded-lg">
            <Building2 className="h-5 w-5 text-brand-primary" />
          </div>
          <div>
            <span className="text-2xl font-bold text-neutral-900">
              {companies.length}
            </span>
            <span className="text-sm text-neutral-600 ml-2">companies</span>
          </div>
        </div>
        
        {validCount > 0 && (
          <>
            <div className="hidden sm:block w-px h-8 bg-neutral-300"></div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-success/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-brand-success" />
              </div>
              <div>
                <span className="text-2xl font-bold text-neutral-900">
                  {total}
                </span>
                <span className="text-sm text-neutral-600 ml-2">total funding</span>
              </div>
            </div>
            
            <div className="hidden sm:block w-px h-8 bg-neutral-300"></div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-accent/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-brand-accent" />
              </div>
              <div>
                <span className="text-lg font-bold text-neutral-900">
                  Avg: {average}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" className="h-9 bg-white border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
        <Button variant="outline" size="sm" className="h-9 bg-white border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400">
          <Bookmark className="h-4 w-4 mr-2" />
          Save Search
        </Button>
        <Button variant="outline" size="sm" className="h-9 bg-white border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400">
          <Share2 className="h-4 w-4 mr-2" />
          Share Results
        </Button>
      </div>
    </div>
  );
}