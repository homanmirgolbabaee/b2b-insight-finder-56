export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-0 animate-spin">
          <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-brand-primary/30 border-r-brand-secondary/20"></div>
        </div>
        
        {/* Main spinner */}
        <div className="relative w-16 h-16 animate-spin">
          <div className="absolute inset-0 rounded-full border-4 border-neutral-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-primary"></div>
        </div>
        
        {/* Center pulse */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 bg-gradient-primary rounded-full animate-pulse shadow-glow"></div>
        </div>
        
        {/* Loading text */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="text-neutral-600 font-medium animate-pulse">
            Discovering opportunities...
          </div>
        </div>
      </div>
    </div>
  );
}