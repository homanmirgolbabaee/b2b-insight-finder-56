import { useState, useEffect } from "react";
import { Search, Database, Globe, Sparkles, CheckCircle, Brain } from "lucide-react";
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
    id: "initialize",
    label: "Initializing search",
    description: "Connecting to Toolhouse AI agents",
    icon: <Brain className="h-5 w-5" />,
    duration: 1500
  },
  {
    id: "sources",
    label: "Scanning data sources",
    description: "Accessing startup databases and funding records",
    icon: <Database className="h-5 w-5" />,
    duration: 2000
  },
  {
    id: "web",
    label: "Searching the web",
    description: "Finding latest news and updates",
    icon: <Globe className="h-5 w-5" />,
    duration: 2500
  },
  {
    id: "analyze",
    label: "Analyzing results",
    description: "Processing and ranking companies",
    icon: <Sparkles className="h-5 w-5" />,
    duration: 1500
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
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Search Query Display */}
      {searchQuery && (
        <Card className="p-6 border-l-4 border-l-primary">
          <div className="flex items-center gap-3">
            <Search className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Searching for</p>
              <p className="font-medium text-foreground">{searchQuery}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Progress Overview */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Finding startups...</h3>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          
          <Progress value={progress} className="h-2" />
          
          {/* Current Stage */}
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              {currentStage.icon}
            </div>
            <div className="flex-1">
              <p className="font-medium">{currentStage.label}</p>
              <p className="text-sm text-muted-foreground">{currentStage.description}</p>
            </div>
            <div className="flex h-6 w-6 items-center justify-center">
              <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </Card>

      {/* Stage Progress */}
      <Card className="p-6">
        <h4 className="font-medium mb-4">Search Progress</h4>
        <div className="space-y-3">
          {searchStages.map((stage, index) => {
            const isCompleted = completedStages.has(stage.id);
            const isCurrent = index === currentStageIndex;
            const isPending = index > currentStageIndex;

            return (
              <div
                key={stage.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                  isCurrent 
                    ? 'bg-primary/10 border border-primary/20' 
                    : isCompleted 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-muted/30'
                }`}
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-green-500 text-white' 
                    : isCurrent 
                    ? 'bg-primary text-primary-foreground animate-pulse' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {isCompleted ? <CheckCircle className="h-4 w-4" /> : stage.icon}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    isCompleted ? 'text-green-700' : isCurrent ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {stage.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{stage.description}</p>
                </div>
                {isCurrent && (
                  <div className="flex space-x-1">
                    <div className="h-1 w-1 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                    <div className="h-1 w-1 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                    <div className="h-1 w-1 animate-bounce rounded-full bg-primary" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Results Preview Skeleton */}
      <Card className="p-6">
        <h4 className="font-medium mb-4">Preparing Results</h4>
        <div className="space-y-4">
          {/* Summary skeleton */}
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-muted animate-pulse rounded" />
                <div className="h-8 bg-muted animate-pulse rounded" />
              </div>
            ))}
          </div>
          
          {/* Table skeleton */}
          <div className="space-y-3 mt-6">
            <div className="h-4 bg-muted animate-pulse rounded w-1/4" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="h-10 w-10 bg-muted animate-pulse rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                  <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
                </div>
                <div className="h-6 w-16 bg-muted animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Helpful Tips */}
      <Card className="p-6 border-l-4 border-l-blue-500">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <p className="font-medium text-blue-900">Pro Tip</p>
            <p className="text-sm text-blue-700">
              While we search, try refining your query with specific criteria like funding stage, location, or industry to get more targeted results.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}