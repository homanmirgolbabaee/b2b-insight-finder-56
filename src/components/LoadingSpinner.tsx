import { TrendingUp, DollarSign, Target } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="relative">
        {/* Professional animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 via-brand-secondary/5 to-brand-accent/5 rounded-2xl blur-xl animate-pulse"></div>
        
        {/* Main container */}
        <div className="relative bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-2xl p-8 shadow-premium">
          {/* Animated icons */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-brand-primary/10 rounded-xl animate-bounce" style={{ animationDelay: '0ms' }}>
                <Target className="h-6 w-6 text-brand-primary" />
              </div>
              <div className="p-3 bg-brand-success/10 rounded-xl animate-bounce" style={{ animationDelay: '200ms' }}>
                <TrendingUp className="h-6 w-6 text-brand-success" />
              </div>
              <div className="p-3 bg-brand-accent/10 rounded-xl animate-bounce" style={{ animationDelay: '400ms' }}>
                <DollarSign className="h-6 w-6 text-brand-accent" />
              </div>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="w-48 mx-auto mb-4">
            <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent rounded-full animate-pulse transform translate-x-0 animate-[pulse_2s_ease-in-out_infinite]"></div>
            </div>
          </div>
          
          {/* Professional loading text */}
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-neutral-900">
              Analyzing Investment Opportunities
            </h3>
            <p className="text-sm text-neutral-600">
              Scanning market data and funding insights...
            </p>
            
            {/* Animated dots */}
            <div className="flex justify-center items-center gap-1 mt-3">
              <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}