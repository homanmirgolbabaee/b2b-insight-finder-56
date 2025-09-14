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
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [messageIndex, messages.length]);

  return (
    <div className="flex flex-col items-center justify-center py-24 px-4">
      {/* Modern loading container */}
      <div className="flex flex-col items-center space-y-6">
        
        {/* Sophisticated spinner with glow */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-primary/20 blur-md animate-pulse"></div>
          <div className="relative p-3 bg-surface rounded-full border border-neutral-200/50 shadow-sm">
            <Loader2 className="h-5 w-5 text-brand-primary animate-spin" />
          </div>
        </div>
        
        {/* Clean typography hierarchy */}
        <div className="text-center space-y-3 max-w-sm">
          <h3 className="text-base font-semibold text-text-primary tracking-tight">
            using Toolhouse Agent
          </h3>
          
          {/* Animated message with smooth transitions */}
          <div className="relative h-5 flex items-center justify-center overflow-hidden">
            <p 
              key={messageIndex}
              className="absolute inset-0 flex items-center justify-center text-sm text-text-secondary font-medium animate-fade-in transition-all duration-300"
            >
              {messages[messageIndex]}
            </p>
          </div>
          
          {/* Subtle progress dots */}
          <div className="flex items-center justify-center space-x-1 pt-2">
            {messages.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index <= messageIndex 
                    ? 'bg-brand-primary' 
                    : 'bg-neutral-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}