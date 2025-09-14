import { useState, useEffect } from "react";
import { dashboardStore } from "@/stores/dashboardStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
      <div className="container mx-auto h-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-text-primary">Dashboard</h1>
          <Button variant="ghost" onClick={onClose} className="text-text-secondary">
            Close
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-120px)]">
          {/* Sidebar Navigation */}
          <div className="col-span-3">
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
          <div className="col-span-9">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-4">
                  <Card className="p-4 bg-gradient-card shadow-card">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-brand-primary/10 rounded-md">
                        <BarChart3 className="h-4 w-4 text-brand-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Total Searches</p>
                        <p className="text-xl font-semibold text-text-primary">{stats.totalSearches}</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-gradient-card shadow-card">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-brand-success/10 rounded-md">
                        <Building2 className="h-4 w-4 text-brand-success" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Companies Found</p>
                        <p className="text-xl font-semibold text-text-primary">{stats.companiesFound.toLocaleString()}</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-gradient-card shadow-card">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-brand-accent/10 rounded-md">
                        <Star className="h-4 w-4 text-brand-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Saved</p>
                        <p className="text-xl font-semibold text-text-primary">{stats.savedCompanies}</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-gradient-card shadow-card">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-brand-secondary/10 rounded-md">
                        <TrendingUp className="h-4 w-4 text-brand-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">This Month</p>
                        <p className="text-xl font-semibold text-text-primary">{stats.monthlyGrowth}</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card className="p-6 bg-gradient-card shadow-card">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {searchHistory.length === 0 ? (
                      <p className="text-text-secondary text-center py-4">No searches yet. Start by searching for companies!</p>
                    ) : (
                      searchHistory.slice(0, 5).map((search, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-md border">
                          <div>
                            <p className="font-medium text-text-primary">{search.query}</p>
                            <p className="text-sm text-text-secondary">Found {search.results} companies</p>
                          </div>
                          <Badge variant="secondary">
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
              <Card className="p-6 bg-gradient-card shadow-card">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Subscription Plan</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-text-primary">Professional Plan</p>
                      <p className="text-sm text-text-secondary">Unlimited searches and exports</p>
                    </div>
                    <Badge className="bg-brand-success text-white">Active</Badge>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-text-secondary">Next billing date</p>
                      <p className="font-medium text-text-primary">Oct 15, 2025</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Amount</p>
                      <p className="font-medium text-text-primary">$199/month</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button variant="outline" className="mr-2">
                      Manage Billing
                    </Button>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Invoice
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === "searches" && (
              <Card className="p-6 bg-gradient-card shadow-card">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Search History</h3>
                <div className="space-y-3">
                  {searchHistory.length === 0 ? (
                    <p className="text-text-secondary text-center py-8">No searches yet. Start exploring!</p>
                  ) : (
                    searchHistory.map((search, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-md border">
                        <div>
                          <p className="font-medium text-text-primary">{search.query}</p>
                          <p className="text-sm text-text-secondary">Found {search.results} companies</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-text-secondary">
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
              <Card className="p-6 bg-gradient-card shadow-card">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Saved Companies</h3>
                <div className="space-y-3">
                  {savedCompanies.length === 0 ? (
                    <p className="text-text-secondary text-center py-8">No saved companies yet. Save companies from search results!</p>
                  ) : (
                    savedCompanies.map((company, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-md border">
                        <div>
                          <p className="font-medium text-text-primary">{company.name}</p>
                          <p className="text-sm text-text-secondary">{company.stage} • {company.amount}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-text-secondary">
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
              <Card className="p-6 bg-gradient-card shadow-card">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Settings</h3>
                <p className="text-text-secondary">Settings panel coming soon...</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};