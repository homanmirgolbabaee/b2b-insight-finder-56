import { useState, useRef, useCallback } from "react";


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
  const [searchDuration, setSearchDuration] = useState(0);
  const runIdRef = useRef<string | null>(null);
  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(null);
  const searchStartTimeRef = useRef<number>(0);

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
      const duration = Date.now() - searchStartTimeRef.current;
      if (duration > 300000) { // More than 5 minutes
        setError('Search is taking longer than expected. This happens with complex queries. Please try a more specific search or try again later.');
      } else if (err instanceof Error && err.name === 'AbortError') {
        setError('Search was cancelled. Please try again.');
      } else {
        setError('Error processing search results. Please try again with a different query.');
      }
    } finally {
      setIsLoading(false);
      setSearchDuration(Date.now() - searchStartTimeRef.current);
    }
  }, []);

  const search = useCallback(async (query: string) => {
    searchStartTimeRef.current = Date.now();
    setSearchDuration(0);
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
      
      // Create an AbortController with a very long timeout for complex searches
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 600000); // 10 minutes timeout
      
      if (runIdRef.current) {
        // Subsequent search - use PUT with runId
        response = await fetch(`https://agents.toolhouse.ai/bf988a4a-2555-4acd-81d2-3649925e08aa/${runIdRef.current}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: query }),
          signal: controller.signal,
        });
      } else {
        // First search - use POST
        response = await fetch('https://agents.toolhouse.ai/bf988a4a-2555-4acd-81d2-3649925e08aa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: query }),
          signal: controller.signal,
        });
        
        // Save the run ID from the response header
        const runId = response.headers.get('X-Toolhouse-Run-ID');
        if (runId) {
          runIdRef.current = runId;
        }
      }

      // Clear the timeout since we got a response
      clearTimeout(timeoutId);

      // Clear the timeout since we got a response
      clearTimeout(timeoutId);

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
      const duration = Date.now() - searchStartTimeRef.current;
      
      if (err instanceof Error) {
        if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
          setError('Network connection issue. Please check your internet connection and try again.');
        } else if (err.message.includes('timeout')) {
          setError('Search timed out. Please try a more specific query or try again later.');
        } else if (duration > 300000) { // More than 5 minutes
          setError('Search is taking longer than expected. Complex queries may take a few minutes to complete.');
        } else {
          setError(`Search failed: ${err.message}`);
        }
      } else {
        setError('An unexpected error occurred during search. Please try again.');
      }
      setIsLoading(false);
      setSearchDuration(duration);
    }
  }, [processStream]);

  return {
    companies,
    isLoading,
    error,
    searchDuration,
    search,
  };
}