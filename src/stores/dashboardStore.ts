interface DashboardStats {
  totalSearches: number;
  companiesFound: number;
  savedCompanies: number;
  monthlyGrowth: string;
}

interface SearchHistory {
  query: string;
  results: number;
  timestamp: Date;
}

interface SavedCompany {
  name: string;
  stage: string;
  amount: string;
  savedAt: Date;
}

class DashboardStore {
  private stats: DashboardStats = {
    totalSearches: 0,
    companiesFound: 0,
    savedCompanies: 0,
    monthlyGrowth: "0%"
  };

  private searchHistory: SearchHistory[] = [];
  private savedCompanies: SavedCompany[] = [];
  private listeners: (() => void)[] = [];

  getStats(): DashboardStats {
    return { ...this.stats };
  }

  getSearchHistory(): SearchHistory[] {
    return [...this.searchHistory].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  getSavedCompanies(): SavedCompany[] {
    return [...this.savedCompanies].sort((a, b) => b.savedAt.getTime() - a.savedAt.getTime());
  }

  addSearch(query: string, resultsCount: number) {
    this.searchHistory.push({
      query,
      results: resultsCount,
      timestamp: new Date()
    });
    
    this.stats.totalSearches++;
    this.stats.companiesFound += resultsCount;
    this.updateMonthlyGrowth();
    this.notifyListeners();
  }

  saveCompany(name: string, stage: string, amount: string) {
    const existing = this.savedCompanies.find(c => c.name === name);
    if (!existing) {
      this.savedCompanies.push({
        name,
        stage,
        amount,
        savedAt: new Date()
      });
      this.stats.savedCompanies++;
      this.notifyListeners();
    }
  }

  unsaveCompany(name: string) {
    const index = this.savedCompanies.findIndex(c => c.name === name);
    if (index !== -1) {
      this.savedCompanies.splice(index, 1);
      this.stats.savedCompanies--;
      this.notifyListeners();
    }
  }

  isCompanySaved(name: string): boolean {
    return this.savedCompanies.some(c => c.name === name);
  }

  private updateMonthlyGrowth() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const thisMonthSearches = this.searchHistory.filter(search => {
      const searchDate = search.timestamp;
      return searchDate.getMonth() === currentMonth && searchDate.getFullYear() === currentYear;
    }).length;

    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
    const lastMonthSearches = this.searchHistory.filter(search => {
      const searchDate = search.timestamp;
      return searchDate.getMonth() === lastMonth && searchDate.getFullYear() === lastMonthYear;
    }).length;

    if (lastMonthSearches === 0) {
      this.stats.monthlyGrowth = thisMonthSearches > 0 ? "100%" : "0%";
    } else {
      const growth = ((thisMonthSearches - lastMonthSearches) / lastMonthSearches) * 100;
      this.stats.monthlyGrowth = `${growth > 0 ? '+' : ''}${Math.round(growth)}%`;
    }
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index !== -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}

export const dashboardStore = new DashboardStore();