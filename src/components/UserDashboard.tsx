import { useState, useEffect } from "react";
import { dashboardStore } from "@/stores/dashboardStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  User, 
  Settings, 
  CreditCard, 
  BarChart3, 
  Star, 
  Download,
  Clock,
  TrendingUp,
  Building2,
  Menu,
  X
} from "lucide-react";

interface UserDashboardProps {
  onClose: () => void;
}

export const UserDashboard = ({ onClose }: UserDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState(dashboardStore.getStats());
  const [searchHistory, setSearchHistory] = useState(dashboardStore.getSearchHistory());
  const [savedCompanies, setSavedCompanies] = useState(dashboardStore.getSavedCompanies());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = dashboardStore.subscribe(() => {
      setStats(dashboardStore.getStats());
      setSearchHistory(dashboardStore.getSearchHistory());
      setSavedCompanies(dashboardStore.getSavedCompanies());
    });

    return unsubscribe;
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="container mx-auto h-full p-4 sm:p-6">
        {/* Mobile Header with Menu */}
        <div className="flex justify-between items-center mb-4 lg:mb-6">
          <div className="flex items-center gap-3">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden p-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <SheetHeader className="p-6 pb-4">
                  <SheetTitle className="text-left text-text-primary">Navigation</SheetTitle>
                </SheetHeader>
                <div className="px-6 pb-6">
                  <div className="space-y-2">
                    <Button
                      variant={activeTab === "overview" ? "secondary" : "ghost"}
                      className="w-full justify-start h-12 text-base"
                      onClick={() => handleTabChange("overview")}
                    >
                      <BarChart3 className="mr-3 h-5 w-5" />
                      Overview
                    </Button>
                    <Button
                      variant={activeTab === "searches" ? "secondary" : "ghost"}
                      className="w-full justify-start h-12 text-base"
                      onClick={() => handleTabChange("searches")}
                    >
                      <Clock className="mr-3 h-5 w-5" />
                      Search History
                    </Button>
                    <Button
                      variant={activeTab === "saved" ? "secondary" : "ghost"}
                      className="w-full justify-start h-12 text-base"
                      onClick={() => handleTabChange("saved")}
                    >
                      <Star className="mr-3 h-5 w-5" />
                      Saved Companies
                    </Button>
                    <Button
                      variant={activeTab === "subscription" ? "secondary" : "ghost"}
                      className="w-full justify-start h-12 text-base"
                      onClick={() => handleTabChange("subscription")}
                    >
                      <CreditCard className="mr-3 h-5 w-5" />
                      Subscription
                    </Button>
                    <Button
                      variant={activeTab === "settings" ? "secondary" : "ghost"}
                      className="w-full justify-start h-12 text-base"
                      onClick={() => handleTabChange("settings")}
                    >
                      <Settings className="mr-3 h-5 w-5" />
                      Settings
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">Dashboard</h1>
          </div>
          <Button variant="ghost" onClick={onClose} className="text-text-secondary p-2">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-6 h-[calc(100vh-140px)] lg:h-[calc(100vh-120px)]">
          {/* Mobile Tab Indicator */}
          <div className="lg:hidden">
            <div className="flex items-center justify-center py-3 px-4 bg-gradient-card rounded-lg shadow-card border">
              <div className="flex items-center gap-2">
                {activeTab === "overview" && <BarChart3 className="h-4 w-4 text-brand-primary" />}
                {activeTab === "searches" && <Clock className="h-4 w-4 text-brand-primary" />}
                {activeTab === "saved" && <Star className="h-4 w-4 text-brand-primary" />}
                {activeTab === "subscription" && <CreditCard className="h-4 w-4 text-brand-primary" />}
                {activeTab === "settings" && <Settings className="h-4 w-4 text-brand-primary" />}
                <span className="font-medium text-text-primary capitalize">
                  {activeTab === "searches" ? "Search History" : 
                   activeTab === "saved" ? "Saved Companies" : activeTab}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Sidebar Navigation */}
          <div className="hidden lg:block lg:col-span-3">
            <Card className="p-4 bg-gradient-card shadow-card">
              <div className="space-y-1">
                <Button
                  variant={activeTab === "overview" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("overview")}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Overview
                </Button>
                <Button
                  variant={activeTab === "searches" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("searches")}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Search History
                </Button>
                <Button
                  variant={activeTab === "saved" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("saved")}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Saved Companies
                </Button>
                <Button
                  variant={activeTab === "subscription" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("subscription")}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Subscription
                </Button>
                <Button
                  variant={activeTab === "settings" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:col-span-9 overflow-y-auto touch-pan-y">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                  <Card className="p-4 lg:p-4 bg-gradient-card shadow-card hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 lg:p-2 bg-brand-primary/10 rounded-lg">
                        <BarChart3 className="h-5 w-5 lg:h-4 lg:w-4 text-brand-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm lg:text-sm text-text-secondary">Total Searches</p>
                        <p className="text-2xl lg:text-xl font-semibold text-text-primary">{stats.totalSearches}</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 lg:p-4 bg-gradient-card shadow-card hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 lg:p-2 bg-brand-success/10 rounded-lg">
                        <Building2 className="h-5 w-5 lg:h-4 lg:w-4 text-brand-success" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm lg:text-sm text-text-secondary">Companies</p>
                        <p className="text-2xl lg:text-xl font-semibold text-text-primary">{stats.companiesFound.toLocaleString()}</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 lg:p-4 bg-gradient-card shadow-card hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 lg:p-2 bg-brand-accent/10 rounded-lg">
                        <Star className="h-5 w-5 lg:h-4 lg:w-4 text-brand-accent" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm lg:text-sm text-text-secondary">Saved</p>
                        <p className="text-2xl lg:text-xl font-semibold text-text-primary">{stats.savedCompanies}</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 lg:p-4 bg-gradient-card shadow-card hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 lg:p-2 bg-brand-secondary/10 rounded-lg">
                        <TrendingUp className="h-5 w-5 lg:h-4 lg:w-4 text-brand-secondary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm lg:text-sm text-text-secondary">This Month</p>
                        <p className="text-2xl lg:text-xl font-semibold text-text-primary">{stats.monthlyGrowth}</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card className="p-4 lg:p-6 bg-gradient-card shadow-card">
                  <h3 className="text-base lg:text-lg font-semibold text-text-primary mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {searchHistory.length === 0 ? (
                      <p className="text-text-secondary text-center py-4">No searches yet. Start by searching for companies!</p>
                    ) : (
                      searchHistory.slice(0, 5).map((search, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-surface rounded-lg border gap-3 hover:shadow-md transition-shadow duration-200">
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-text-primary text-base lg:text-base">{search.query}</p>
                            <p className="text-sm lg:text-sm text-text-secondary mt-1">Found {search.results} companies</p>
                          </div>
                          <Badge variant="secondary" className="text-sm self-start sm:self-center px-3 py-1">
                            {new Date(search.timestamp).toLocaleDateString()}
                          </Badge>
                        </div>
                      ))
                    )}
                  </div>
                </Card>
              </div>
            )}

            {activeTab === "subscription" && (
              <Card className="p-4 lg:p-6 bg-gradient-card shadow-card">
                <h3 className="text-base lg:text-lg font-semibold text-text-primary mb-4">Subscription Plan</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-text-primary">Professional Plan</p>
                      <p className="text-sm text-text-secondary">Unlimited searches and exports</p>
                    </div>
                    <Badge className="bg-brand-success text-white">Active</Badge>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-text-secondary">Next billing date</p>
                      <p className="font-medium text-text-primary">Oct 15, 2025</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Amount</p>
                      <p className="font-medium text-text-primary">$199/month</p>
                    </div>
                  </div>
                  <div className="pt-4 flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" className="text-sm">
                      Manage Billing
                    </Button>
                    <Button variant="outline" className="text-sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download Invoice
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === "searches" && (
              <Card className="p-4 lg:p-6 bg-gradient-card shadow-card">
                <h3 className="text-base lg:text-lg font-semibold text-text-primary mb-4">Search History</h3>
                <div className="space-y-3">
                  {searchHistory.length === 0 ? (
                    <p className="text-text-secondary text-center py-8">No searches yet. Start exploring!</p>
                  ) : (
                    searchHistory.map((search, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-surface rounded-md border gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-text-primary text-sm lg:text-base truncate">{search.query}</p>
                          <p className="text-xs lg:text-sm text-text-secondary">Found {search.results} companies</p>
                        </div>
                        <div className="text-left sm:text-right flex-shrink-0">
                          <p className="text-xs lg:text-sm text-text-secondary">
                            {search.timestamp.toLocaleDateString()}
                          </p>
                          <p className="text-xs text-text-secondary">
                            {search.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            )}

            {activeTab === "saved" && (
              <Card className="p-4 lg:p-6 bg-gradient-card shadow-card">
                <h3 className="text-base lg:text-lg font-semibold text-text-primary mb-4">Saved Companies</h3>
                <div className="space-y-3">
                  {savedCompanies.length === 0 ? (
                    <p className="text-text-secondary text-center py-8">No saved companies yet. Save companies from search results!</p>
                  ) : (
                    savedCompanies.map((company, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-surface rounded-md border gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-text-primary text-sm lg:text-base truncate">{company.name}</p>
                          <p className="text-xs lg:text-sm text-text-secondary">{company.stage} • {company.amount}</p>
                        </div>
                        <div className="text-left sm:text-right flex-shrink-0">
                          <p className="text-xs lg:text-sm text-text-secondary">
                            Saved {company.savedAt.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            )}

            {/* Placeholder for settings tab */}
            {activeTab === "settings" && (
              <Card className="p-4 lg:p-6 bg-gradient-card shadow-card">
                <h3 className="text-base lg:text-lg font-semibold text-text-primary mb-4">Settings</h3>
                <p className="text-text-secondary">Settings panel coming soon...</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};