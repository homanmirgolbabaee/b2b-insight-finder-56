import { useState, useEffect } from "react";
import { Cpu, Search as SearchIcon, Globe, CheckCircle, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SearchStage {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  duration: number;
}

const searchStages: SearchStage[] = [
  {
    id: "agent",
    label: "Calling Toolhouse Agent",
    description: "Initializing AI-powered search infrastructure",
    icon: <Cpu className="h-4 w-4" />,
    duration: 1200
  },
  {
    id: "exa",
    label: "Using Exa MCP Servers",
    description: "Accessing specialized data sources and APIs",
    icon: <Activity className="h-4 w-4" />,
    duration: 1800
  },
  {
    id: "web",
    label: "Searching the Web",
    description: "Crawling latest startup data and funding news",
    icon: <Globe className="h-4 w-4" />,
    duration: 2200
  },
  {
    id: "crawling",
    label: "Crawling Sources",
    description: "Processing structured and unstructured data",
    icon: <SearchIcon className="h-4 w-4" />,
    duration: 1600
  },
  {
    id: "drafting",
    label: "Drafting Response",
    description: "Analyzing and formatting results",
    icon: <CheckCircle className="h-4 w-4" />,
    duration: 1400
  }
];

interface SearchLoadingStateProps {
  searchQuery?: string;
}

export function SearchLoadingState({ searchQuery }: SearchLoadingStateProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedStages, setCompletedStages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const totalDuration = searchStages.reduce((sum, stage) => sum + stage.duration, 0);
    let elapsed = 0;
    
    const progressTimer = setInterval(() => {
      elapsed += 100;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);
    }, 100);

    const stageTimer = setInterval(() => {
      if (currentStageIndex < searchStages.length - 1) {
        setCompletedStages(prev => new Set([...prev, searchStages[currentStageIndex].id]));
        setCurrentStageIndex(prev => prev + 1);
      }
    }, searchStages[currentStageIndex]?.duration || 2000);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stageTimer);
    };
  }, [currentStageIndex]);

  const currentStage = searchStages[currentStageIndex];

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Search Query Display */}
      {searchQuery && (
        <Card className="p-4 mb-6 border border-border/50">
          <div className="flex items-center gap-3">
            <SearchIcon className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Query</p>
              <p className="text-sm font-medium text-foreground">{searchQuery}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Search Progress */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Processing</h3>
            <span className="text-xs text-muted-foreground font-mono">
              {Math.round(progress)}%
            </span>
          </div>
          
          <Progress value={progress} className="h-1" />
        </div>

        <div className="space-y-2 mt-6">
          {searchStages.map((stage, index) => {
            const isCompleted = completedStages.has(stage.id);
            const isCurrent = index === currentStageIndex;

            return (
              <div
                key={stage.id}
                className={`flex items-center gap-3 p-2 rounded-md transition-all duration-200 ${
                  isCurrent 
                    ? 'bg-muted/50' 
                    : isCompleted 
                    ? 'opacity-60' 
                    : 'opacity-30'
                }`}
              >
                <div className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${
                  isCompleted 
                    ? 'bg-green-100 text-green-600' 
                    : isCurrent 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {isCompleted ? <CheckCircle className="h-3 w-3" /> : stage.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium ${
                    isCompleted ? 'text-green-700' : isCurrent ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {stage.label}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{stage.description}</p>
                </div>
                {isCurrent && (
                  <div className="flex space-x-0.5">
                    <div className="h-1 w-1 animate-pulse rounded-full bg-primary" />
                    <div className="h-1 w-1 animate-pulse rounded-full bg-primary [animation-delay:0.2s]" />
                    <div className="h-1 w-1 animate-pulse rounded-full bg-primary [animation-delay:0.4s]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}