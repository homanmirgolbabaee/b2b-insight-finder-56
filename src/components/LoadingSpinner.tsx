import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  const [messageIndex, setMessageIndex] = useState(0);
  
  const messages = [
    "using toolhouse backend ...",
    "fetching companies ...",
    "fetching funding data ...",
    "reaching out to multiple sources...",
    "hang on ..."
  ];

  useEffect(() => {
    if (messageIndex < messages.length - 1) {
      const timer = setTimeout(() => {
        setMessageIndex(prev => prev + 1);
      }, 2000); // Change message every 2 seconds

      return () => clearTimeout(timer);
    }
  }, [messageIndex, messages.length]);

  return (
    <div className="flex justify-center items-center py-20">
      <div className="relative">
        {/* Sophisticated minimal background */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/3 to-brand-secondary/3 rounded-xl blur-md"></div>
        
        {/* Main container */}
        <div className="relative bg-white/90 backdrop-blur-sm border border-neutral-200/50 rounded-xl p-8 shadow-premium">
          {/* Single sophisticated icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-brand-primary/5 rounded-full">
              <Loader2 className="h-8 w-8 text-brand-primary animate-spin" />
            </div>
          </div>
          
          {/* Minimal progress indicator */}
          <div className="w-40 mx-auto mb-4">
            <div className="h-1 bg-neutral-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Professional loading text */}
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-neutral-900">
              using Toolhouse Agent
            </h3>
            <p className="text-sm text-neutral-600 transition-all duration-500 ease-in-out">
              {messages[messageIndex]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}