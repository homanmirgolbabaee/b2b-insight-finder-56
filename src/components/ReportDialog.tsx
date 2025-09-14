import { useState } from "react";
import { FileText, Send, ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyName: string;
}

interface ReportSection {
  title: string;
  content: string;
  expanded: boolean;
}

export function ReportDialog({ open, onOpenChange, companyName }: ReportDialogProps) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<ReportSection[] | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    
    // TODO: Replace with actual API call when endpoint is provided
    // Simulating API call for now
    setTimeout(() => {
      // Mock report data
      const mockReport: ReportSection[] = [
        {
          title: "Executive Summary",
          content: `Analysis of ${companyName} based on your query: "${message}". This company shows strong market positioning with significant growth potential in their sector.`,
          expanded: true
        },
        {
          title: "Financial Analysis",
          content: `The company's financial metrics indicate healthy growth patterns. Recent funding rounds suggest strong investor confidence and adequate runway for expansion plans.`,
          expanded: false
        },
        {
          title: "Market Position",
          content: `${companyName} operates in a competitive but growing market segment. Their unique value proposition provides defensible market positioning.`,
          expanded: false
        },
        {
          title: "Risk Assessment",
          content: `Key risks include market competition, regulatory changes, and scaling challenges. However, the management team's track record suggests strong execution capabilities.`,
          expanded: false
        },
        {
          title: "Investment Recommendation",
          content: `Based on the analysis, this company presents a moderate to high investment opportunity with good potential for returns in the medium to long term.`,
          expanded: false
        }
      ];
      
      setReport(mockReport);
      setExpandedSections(new Set(['Executive Summary']));
      setIsLoading(false);
    }, 2000);
  };

  const toggleSection = (title: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedSections(newExpanded);
  };

  const handleClose = () => {
    setMessage("");
    setReport(null);
    setExpandedSections(new Set());
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Generate Report for {companyName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Input Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-neutral-700">
              What would you like to analyze about this company?
            </label>
            <Textarea
              placeholder="E.g., Analyze their competitive advantages, market positioning, or investment potential..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="resize-none"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!message.trim() || isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Generate Report
                </>
              )}
            </Button>
          </div>

          {/* Report Section */}
          {report && (
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-neutral-900">Analysis Report</h3>
                <Badge variant="secondary" className="text-xs">
                  Generated • {new Date().toLocaleTimeString()}
                </Badge>
              </div>
              
              <div className="space-y-3">
                {report.map((section) => {
                  const isExpanded = expandedSections.has(section.title);
                  return (
                    <div 
                      key={section.title}
                      className="border border-neutral-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleSection(section.title)}
                        className="w-full flex items-center justify-between p-4 bg-neutral-50 hover:bg-neutral-100 transition-colors text-left"
                      >
                        <span className="font-medium text-neutral-900">{section.title}</span>
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-neutral-500" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-neutral-500" />
                        )}
                      </button>
                      {isExpanded && (
                        <div className="p-4 bg-white border-t border-neutral-200">
                          <p className="text-neutral-700 leading-relaxed">{section.content}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}