import { TrendingUp, DollarSign, Building2 } from "lucide-react";

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
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-brand-primary" />
          <span className="text-lg font-semibold text-neutral-900">
            {companies.length} companies
          </span>
        </div>
        
        {validCount > 0 && (
          <>
            <div className="hidden sm:block w-px h-6 bg-neutral-300"></div>
            
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-brand-success" />
              <span className="text-lg font-bold text-neutral-900">
                {total} total funding
              </span>
            </div>
            
            <div className="hidden sm:block w-px h-6 bg-neutral-300"></div>
            
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-brand-accent" />
              <span className="text-lg font-semibold text-neutral-700">
                Avg: {average}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}