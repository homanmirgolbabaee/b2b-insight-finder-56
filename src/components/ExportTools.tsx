import { useState } from "react";
import { Download, BookmarkPlus, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface Company {
  name: string;
  description: string;
  funding_or_launch_news: string;
  links: {
    news?: string | null;
    linkedin: string;
    website: string;
  };
}

interface ExportToolsProps {
  companies: Company[];
  searchQuery?: string;
}

export function ExportTools({ companies, searchQuery }: ExportToolsProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const exportToCSV = () => {
    if (companies.length === 0) {
      toast({
        title: "No data to export",
        description: "Please search for companies first.",
        variant: "destructive"
      });
      return;
    }

    const headers = ["Company Name", "Description", "Latest News", "Website", "LinkedIn", "News Link"];
    const csvContent = [
      headers.join(","),
      ...companies.map(company => [
        `\"${company.name.replace(/\"/g, '\"\"')}\"`,
        `\"${company.description.replace(/\"/g, '\"\"')}\"`,
        `\"${company.funding_or_launch_news.replace(/\"/g, '\"\"')}\"`,
        `\"${company.links.website}\"`,
        `\"${company.links.linkedin}\"`,
        `\"${company.links.news || ''}\"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `companies-${searchQuery || 'search'}-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    toast({
      title: "Export successful",
      description: `${companies.length} companies exported to CSV.`,
    });
  };

  const exportToJSON = () => {
    if (companies.length === 0) {
      toast({
        title: "No data to export",
        description: "Please search for companies first.",
        variant: "destructive"
      });
      return;
    }

    const exportData = {
      searchQuery: searchQuery || '',
      exportDate: new Date().toISOString(),
      totalCompanies: companies.length,
      companies: companies
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: "application/json;charset=utf-8;" 
    });
    const link = document.createElement("a");
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `companies-${searchQuery || 'search'}-${new Date().toISOString().split('T')[0]}.json`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    toast({
      title: "Export successful",
      description: `${companies.length} companies exported to JSON.`,
    });
  };

  const saveSearch = async () => {
    setIsSaving(true);
    
    // Simulate saving to local storage for now
    try {
      const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
      const newSearch = {
        id: Date.now().toString(),
        query: searchQuery || '',
        companies: companies,
        savedAt: new Date().toISOString(),
        totalCompanies: companies.length
      };
      
      savedSearches.unshift(newSearch);
      
      // Keep only last 10 searches
      if (savedSearches.length > 10) {
        savedSearches.splice(10);
      }
      
      localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
      
      toast({
        title: "Search saved",
        description: "Your search has been saved locally.",
      });
    } catch (error) {
      toast({
        title: "Save failed",
        description: "Could not save search. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const shareResults = async () => {
    if (navigator.share && companies.length > 0) {
      try {
        await navigator.share({
          title: `Company Search Results: ${searchQuery || 'Search'}`,
          text: `Found ${companies.length} companies matching your search criteria.`,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to copying URL
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: "Link copied",
        description: "Search results link copied to clipboard.",
      });
    });
  };

  return (
    <div className="flex items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="glass"
            size="sm"
            disabled={companies.length === 0}
            className="font-semibold"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52 bg-gradient-glass backdrop-blur-premium border border-neutral-200/60 shadow-premium">
          <DropdownMenuItem onClick={exportToCSV} className="text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50/80 font-medium">
            <Download className="h-4 w-4 mr-2" />
            Export as CSV
          </DropdownMenuItem>
          <DropdownMenuItem onClick={exportToJSON} className="text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50/80 font-medium">
            <Download className="h-4 w-4 mr-2" />
            Export as JSON
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="glass"
        size="sm"
        onClick={saveSearch}
        disabled={companies.length === 0 || isSaving}
        className="font-semibold"
      >
        <BookmarkPlus className="h-4 w-4 mr-2" />
        {isSaving ? "Saving..." : "Save Search"}
      </Button>

      <Button
        variant="glass"
        size="sm"
        onClick={shareResults}
        disabled={companies.length === 0}
        className="font-semibold"
      >
        <Share2 className="h-4 w-4 mr-2" />
        Share Results
      </Button>
    </div>
  );
}
