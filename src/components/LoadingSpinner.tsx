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
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Simple spinning icon */}
      <div className="mb-6">
        <Loader2 className="h-6 w-6 text-brand-primary animate-spin" />
      </div>
      
      {/* Clean title */}
      <h3 className="text-lg font-medium text-text-primary mb-3">
        using Toolhouse Agent
      </h3>
      
      {/* Animated message */}
      <div className="h-6 flex items-center justify-center">
        <p 
          key={messageIndex}
          className="text-sm text-text-secondary animate-fade-in"
        >
          {messages[messageIndex]}
        </p>
      </div>
    </div>
  );
}