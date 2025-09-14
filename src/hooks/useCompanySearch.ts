import { useState, useRef, useCallback } from "react";
import { dashboardStore } from "@/stores/dashboardStore";

interface Company {
  name: string;
  description: string;
  funding_or_launch_news: string;
  funding_amount: string;
  funding_stage: string;
  valuation: string;
  revenue_range: string;
  team_size: number;
  founded: string;
  location: string;
  last_updated: string;
  investors: string[];
  logo: string;
  links: {
    news?: string | null;
    linkedin: string;
    website: string;
  };
}

interface SearchResponse {
  companies: Company[];
}

export function useCompanySearch() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const runIdRef = useRef<string | null>(null);
  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(null);

  const processStream = useCallback(async (reader: ReadableStreamDefaultReader<Uint8Array>) => {
    const decoder = new TextDecoder();
    let buffer = '';
    
    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          // Process any remaining data in buffer when stream ends
          if (buffer.trim()) {
            try {
              const data: SearchResponse = JSON.parse(buffer.trim());
              if (data.companies && Array.isArray(data.companies)) {
                    setCompanies(prevCompanies => {
                      // Avoid duplicates by filtering out companies with the same name
                      const existingNames = new Set(prevCompanies.map(c => c.name));
                      const newCompanies = data.companies.filter(c => !existingNames.has(c.name));
                      const updatedCompanies = [...prevCompanies, ...newCompanies];
                      
                      // Track in dashboard if this is the final result
                      if (newCompanies.length > 0) {
                        setTimeout(() => {
                          const currentQuery = (document.querySelector('input[placeholder*="AI startups"]') as HTMLInputElement)?.value || 'Search';
                          dashboardStore.addSearch(currentQuery, updatedCompanies.length);
                        }, 100);
                      }
                      
                      return updatedCompanies;
                    });
              }
            } catch (e) {
              console.warn('Failed to parse final JSON:', buffer, e);
            }
          }
          break;
        }
        
        buffer += decoder.decode(value, { stream: true });
        
        // Try to parse complete JSON objects from the buffer
        // Look for complete JSON objects (starting with { and ending with })
        let braceCount = 0;
        let startIndex = -1;
        let inString = false;
        let escaped = false;
        
        for (let i = 0; i < buffer.length; i++) {
          const char = buffer[i];
          
          if (escaped) {
            escaped = false;
            continue;
          }
          
          if (char === '\\' && inString) {
            escaped = true;
            continue;
          }
          
          if (char === '"') {
            inString = !inString;
            continue;
          }
          
          if (!inString) {
            if (char === '{') {
              if (braceCount === 0) {
                startIndex = i;
              }
              braceCount++;
            } else if (char === '}') {
              braceCount--;
              if (braceCount === 0 && startIndex !== -1) {
                // Found a complete JSON object
                const jsonStr = buffer.slice(startIndex, i + 1);
                try {
                  const data: SearchResponse = JSON.parse(jsonStr);
                  if (data.companies && Array.isArray(data.companies)) {
                    setCompanies(prevCompanies => {
                      // Avoid duplicates by filtering out companies with the same name
                      const existingNames = new Set(prevCompanies.map(c => c.name));
                      const newCompanies = data.companies.filter(c => !existingNames.has(c.name));
                      return [...prevCompanies, ...newCompanies];
                    });
                  }
                  // Remove processed JSON from buffer
                  buffer = buffer.slice(i + 1);
                  i = -1; // Reset loop
                  startIndex = -1;
                } catch (e) {
                  console.warn('Failed to parse JSON object:', jsonStr, e);
                  // Move past this character and continue
                  startIndex = -1;
                  braceCount = 0;
                }
              }
            }
          }
        }
      }
    } catch (err) {
      console.error('Stream processing error:', err);
      setError('Error processing search results');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const search = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    
    // Cancel any existing stream
    if (readerRef.current) {
      try {
        await readerRef.current.cancel();
      } catch (e) {
        console.warn('Error canceling previous stream:', e);
      }
      readerRef.current = null;
    }

    try {
      let response: Response;
      
      if (runIdRef.current) {
        // Subsequent search - use PUT with runId
        response = await fetch(`https://agents.toolhouse.ai/bf988a4a-2555-4acd-81d2-3649925e08aa/${runIdRef.current}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: query }),
        });
      } else {
        // First search - use POST
        response = await fetch('https://agents.toolhouse.ai/bf988a4a-2555-4acd-81d2-3649925e08aa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: query }),
        });
        
        // Save the run ID from the response header
        const runId = response.headers.get('X-Toolhouse-Run-ID');
        if (runId) {
          runIdRef.current = runId;
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      // Clear previous results for new searches
      setCompanies([]);

      const reader = response.body.getReader();
      readerRef.current = reader;
      
      await processStream(reader);
      
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during search');
      setIsLoading(false);
    }
  }, [processStream]);

  return {
    companies,
    isLoading,
    error,
    search,
  };
}