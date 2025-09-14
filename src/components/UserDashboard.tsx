import { useState, useEffect } from "react";
import { dashboardStore } from "@/stores/dashboardStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ToolhouseBranding } from "@/components/ToolhouseBranding";
import { 
  User, 
  Settings, 
  CreditCard, 
  BarChart3, 
  Star, 
  Download,
  Clock,
  TrendingUp,
  Building2
} from "lucide-react";

interface UserDashboardProps {
  onClose: () => void;
}

export const UserDashboard = ({ onClose }: UserDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState(dashboardStore.getStats());
  const [searchHistory, setSearchHistory] = useState(dashboardStore.getSearchHistory());
  const [savedCompanies, setSavedCompanies] = useState(dashboardStore.getSavedCompanies());

  useEffect(() => {
    const unsubscribe = dashboardStore.subscribe(() => {
      setStats(dashboardStore.getStats());
      setSearchHistory(dashboardStore.getSearchHistory());
      setSavedCompanies(dashboardStore.getSavedCompanies());
    });

    return unsubscribe;
  }, []);

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="container mx-auto h-full p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">Dashboard</h1>
          <Button variant="ghost" onClick={onClose} className="text-text-secondary">
            Close
          </Button>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 h-[calc(100vh-120px)]">
          {/* Mobile/Tablet Navigation */}
          <div className="lg:hidden">
            <Card className="p-4 bg-gradient-card shadow-card">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={activeTab === "overview" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("overview")}
                  className="text-xs sm:text-sm"
                >
                  <BarChart3 className="mr-1 h-4 w-4" />
                  Overview
                </Button>
                <Button
                  variant={activeTab === "searches" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("searches")}
                  className="text-xs sm:text-sm"
                >
                  <Clock className="mr-1 h-4 w-4" />
                  History
                </Button>
                <Button
                  variant={activeTab === "saved" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("saved")}
                  className="text-xs sm:text-sm"
                >
                  <Star className="mr-1 h-4 w-4" />
                  Saved
                </Button>
                <Button
                  variant={activeTab === "subscription" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("subscription")}
                  className="text-xs sm:text-sm"
                >
                  <CreditCard className="mr-1 h-4 w-4" />
                  Plan
                </Button>
                <Button
                  variant={activeTab === "settings" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("settings")}
                  className="text-xs sm:text-sm"
                >
                  <Settings className="mr-1 h-4 w-4" />
                  Settings
                </Button>
              </div>
            </Card>
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
          <div className="flex-1 lg:col-span-9 overflow-y-auto">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                  <Card className="p-3 lg:p-4 bg-gradient-card shadow-card">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 lg:p-2 bg-brand-primary/10 rounded-md">
                        <BarChart3 className="h-3 w-3 lg:h-4 lg:w-4 text-brand-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs lg:text-sm text-text-secondary truncate">Total Searches</p>
                        <p className="text-lg lg:text-xl font-semibold text-text-primary">{stats.totalSearches}</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-3 lg:p-4 bg-gradient-card shadow-card">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 lg:p-2 bg-brand-success/10 rounded-md">
                        <Building2 className="h-3 w-3 lg:h-4 lg:w-4 text-brand-success" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs lg:text-sm text-text-secondary truncate">Companies</p>
                        <p className="text-lg lg:text-xl font-semibold text-text-primary">{stats.companiesFound.toLocaleString()}</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-3 lg:p-4 bg-gradient-card shadow-card">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 lg:p-2 bg-brand-accent/10 rounded-md">
                        <Star className="h-3 w-3 lg:h-4 lg:w-4 text-brand-accent" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs lg:text-sm text-text-secondary truncate">Saved</p>
                        <p className="text-lg lg:text-xl font-semibold text-text-primary">{stats.savedCompanies}</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-3 lg:p-4 bg-gradient-card shadow-card">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 lg:p-2 bg-brand-secondary/10 rounded-md">
                        <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 text-brand-secondary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs lg:text-sm text-text-secondary truncate">This Month</p>
                        <p className="text-lg lg:text-xl font-semibold text-text-primary">{stats.monthlyGrowth}</p>
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
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-surface rounded-md border gap-2">
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-text-primary text-sm lg:text-base truncate">{search.query}</p>
                            <p className="text-xs lg:text-sm text-text-secondary">Found {search.results} companies</p>
                          </div>
                          <Badge variant="secondary" className="text-xs self-start sm:self-center">
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
              <div className="space-y-6">
                <Card className="p-4 lg:p-6 bg-gradient-card shadow-card">
                  <h3 className="text-base lg:text-lg font-semibold text-text-primary mb-4">Settings</h3>
                  <p className="text-text-secondary">Settings panel coming soon...</p>
                </Card>
                
                <Card className="p-4 lg:p-6 bg-gradient-card shadow-card">
                  <h3 className="text-base lg:text-lg font-semibold text-text-primary mb-4">AI Backend</h3>
                  <ToolhouseBranding variant="inline" />
                  <p className="text-xs text-text-tertiary mt-3 leading-relaxed">
                    This platform is powered by Toolhouse AI's advanced agent infrastructure, 
                    providing enterprise-grade startup intelligence and market research capabilities.
                  </p>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};