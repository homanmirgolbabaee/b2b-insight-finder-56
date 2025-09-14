import { Building, Zap } from "lucide-react";

interface ToolhouseBrandingProps {
  variant?: "header" | "footer" | "inline";
  size?: "sm" | "md" | "lg";
}

export const ToolhouseBranding = ({ variant = "footer", size = "md" }: ToolhouseBrandingProps) => {
  const openToolhouse = () => {
    window.open("https://toolhouse.ai", "_blank", "noopener,noreferrer");
  };

  if (variant === "header") {
    return (
      <div className="flex items-center gap-2 text-xs text-text-secondary">
        <span className="hidden sm:inline">Powered by</span>
        <button
          onClick={openToolhouse}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-neutral-100/80 transition-colors group"
        >
          <div className="relative">
            <Building className="h-3 w-3 text-neutral-600 group-hover:text-brand-primary transition-colors" />
            <Zap className="h-2 w-2 text-brand-primary absolute -top-0.5 -right-0.5" />
          </div>
          <span className="font-medium text-neutral-700 group-hover:text-brand-primary transition-colors">
            Toolhouse
          </span>
        </button>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <button
        onClick={openToolhouse}
        className="inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-md hover:bg-neutral-100/50 transition-colors group"
      >
        <div className="relative">
          <Building className="h-3 w-3 text-neutral-500 group-hover:text-brand-primary transition-colors" />
          <Zap className="h-1.5 w-1.5 text-brand-primary absolute -top-0.5 -right-0.5" />
        </div>
        <span className="text-neutral-600 group-hover:text-brand-primary transition-colors font-medium">
          Toolhouse AI
        </span>
      </button>
    );
  }

  // Footer variant
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm", 
    lg: "text-base"
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  const zapSizes = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-2.5 w-2.5"
  };

  return (
    <div className="flex flex-col items-center gap-3 p-6 bg-gradient-subtle rounded-lg border border-neutral-200/60">
      <div className="text-center space-y-2">
        <p className={`${sizeClasses[size]} text-text-secondary font-medium`}>
          Powered by advanced AI intelligence
        </p>
        <button
          onClick={openToolhouse}
          className="group flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-neutral-200 shadow-sm hover:shadow-md hover:border-brand-primary/30 transition-all duration-200"
        >
          <div className="relative">
            <Building className={`${iconSizes[size]} text-neutral-600 group-hover:text-brand-primary transition-colors`} />
            <Zap className={`${zapSizes[size]} text-brand-primary absolute -top-0.5 -right-0.5`} />
          </div>
          <span className={`${sizeClasses[size]} font-semibold text-neutral-800 group-hover:text-brand-primary transition-colors`}>
            Toolhouse AI
          </span>
        </button>
        <p className="text-xs text-text-tertiary max-w-sm mx-auto leading-relaxed">
          Enterprise-grade AI agents for startup intelligence and market research
        </p>
      </div>
    </div>
  );
};