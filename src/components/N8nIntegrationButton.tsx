import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const N8nIntegrationButton = () => {
  const handleDownload = () => {
    // Create download link for the n8n workflow file
    const link = document.createElement('a');
    link.href = '/toolhouse-n8n-workflow.json';
    link.download = 'toolhouse-n8n-workflow.json';
    link.click();
    
    toast.success("n8n workflow downloaded! Import it into your n8n instance.");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      className="bg-surface hover:bg-neutral-50 border-neutral-200 shadow-card hover:shadow-card-hover transition-all duration-200 gap-2"
    >
      <img 
        src="/n8n-logo.png" 
        alt="n8n" 
        className="w-4 h-4"
      />
      <span className="font-medium text-text-primary">Use Toolhouse Agent in n8n</span>
      <Download className="w-3 h-3 text-text-secondary" />
    </Button>
  );
};