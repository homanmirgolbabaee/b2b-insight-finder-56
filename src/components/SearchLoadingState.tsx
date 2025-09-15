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
    duration: 2000
  },
  {
    id: "exa",
    label: "Using Exa MCP Servers",
    description: "Accessing specialized data sources and APIs",
    icon: <Activity className="h-4 w-4" />,
    duration: 3000
  },
  {
    id: "web",
    label: "Searching the Web",
    description: "Crawling latest startup data and funding news",
    icon: <Globe className="h-4 w-4" />,
    duration: 4000
  },
  {
    id: "crawling",
    label: "Crawling Sources",
    description: "Processing structured and unstructured data",
    icon: <SearchIcon className="h-4 w-4" />,
    duration: 8000
  },
  {
    id: "drafting",
    label: "Drafting Response",
    description: "Analyzing and formatting results",
    icon: <CheckCircle className="h-4 w-4" />,
    duration: 2000
  }
];

interface SearchLoadingStateProps {
  searchQuery?: string;
  isLoading: boolean;
}

export function SearchLoadingState({ searchQuery, isLoading }: SearchLoadingStateProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedStages, setCompletedStages] = useState<Set<string>>(new Set());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    if (!isLoading && !isFinishing) {
      setCurrentStageIndex(0);
      setProgress(0);
      setCompletedStages(new Set());
      setElapsedTime(0);
      return;
    }

    // If isLoading becomes false but we're not at the end, start finishing sequence
    if (!isLoading && currentStageIndex < searchStages.length - 1 && !isFinishing) {
      setIsFinishing(true);
      
      // Quickly finish the remaining stages
      const finishStages = () => {
        let remaining = searchStages.length - 1 - currentStageIndex;
        let delay = 0;
        
        for (let i = currentStageIndex; i < searchStages.length - 1; i++) {
          setTimeout(() => {
            setCompletedStages(prev => new Set([...prev, searchStages[i].id]));
            setCurrentStageIndex(i + 1);
            setProgress(((i + 1) / searchStages.length) * 100);
          }, delay);
          delay += 300; // Quick 300ms intervals for smooth finish
        }
        
        // Complete the final stage
        setTimeout(() => {
          setCompletedStages(prev => new Set([...prev, searchStages[searchStages.length - 1].id]));
          setProgress(100);
        }, delay);
      };
      
      finishStages();
      return;
    }

    if (!isLoading && !isFinishing) return;

    let startTime = Date.now();
    let stageIndex = 0;
    let stageStartTime = startTime;
    
    const updateProgress = () => {
      if (!isLoading && !isFinishing) return;
      
      const now = Date.now();
      const totalElapsed = (now - startTime) / 1000; // Convert to seconds
      setElapsedTime(totalElapsed);
      
      const currentStage = searchStages[stageIndex];
      if (!currentStage) return;
      
      const stageElapsed = now - stageStartTime;
      
      // Calculate progress through current stage
      const totalDuration = searchStages.reduce((sum, stage) => sum + stage.duration, 0);
      const completedDuration = searchStages.slice(0, stageIndex).reduce((sum, stage) => sum + stage.duration, 0);
      const overallProgress = Math.min(((completedDuration + stageElapsed) / totalDuration) * 100, 100);
      
      setProgress(overallProgress);
      setCurrentStageIndex(stageIndex);
      
      // Move to next stage when current stage duration is complete
      if (stageElapsed >= currentStage.duration && stageIndex < searchStages.length - 1) {
        setCompletedStages(prev => new Set([...prev, currentStage.id]));
        stageIndex++;
        stageStartTime = now;
      } else if (stageIndex === searchStages.length - 1 && stageElapsed >= currentStage.duration) {
        setCompletedStages(prev => new Set([...prev, currentStage.id]));
        setProgress(100);
      }
    };

    const interval = setInterval(updateProgress, 50); // More frequent updates for smoother time display
    
    return () => clearInterval(interval);
  }, [isLoading, isFinishing, currentStageIndex]);

  const currentStage = searchStages[currentStageIndex];

  const formatElapsedTime = (seconds: number) => {
    if (seconds < 1) {
      return `${Math.round(seconds * 1000)}ms`;
    } else if (seconds < 60) {
      return `${seconds.toFixed(1)}s`;
    } else {
      const mins = Math.floor(seconds / 60);
      const secs = Math.round(seconds % 60);
      return `${mins}m ${secs}s`;
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Search Query Display */}
      {searchQuery && (
        <Card className="p-4 mb-6 border border-border/50">
          <div className="flex items-center gap-3">
            <SearchIcon className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Search Query</p>
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
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground font-mono">
                {formatElapsedTime(elapsedTime)}
              </span>
            </div>
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