import { Card } from "@/components/ui/card";

export function SearchResultsLoading() {
  return (
    <div className="space-y-6">
      {/* Investment Summary Skeleton */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="h-6 bg-muted animate-pulse rounded w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                <div className="h-8 bg-muted animate-pulse rounded" />
                <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Filters Skeleton */}
        <div className="order-2 lg:order-1">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="h-5 bg-muted animate-pulse rounded w-1/2" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-muted animate-pulse rounded w-16" />
                    <div className="h-6 bg-muted animate-pulse rounded w-20" />
                    <div className="h-6 bg-muted animate-pulse rounded w-14" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Table Skeleton */}
        <div className="order-1 lg:order-2 lg:col-span-3">
          <Card className="overflow-hidden">
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-6 bg-muted animate-pulse rounded w-1/4" />
                  <div className="h-8 bg-muted animate-pulse rounded w-32" />
                </div>
                
                {/* Table Header */}
                <div className="grid grid-cols-5 gap-4 pb-3 border-b">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-4 bg-muted animate-pulse rounded w-full" />
                  ))}
                </div>
                
                {/* Table Rows */}
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="grid grid-cols-5 gap-4 py-3 border-b border-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-muted animate-pulse rounded-full" />
                      <div className="space-y-1">
                        <div className="h-4 bg-muted animate-pulse rounded w-24" />
                        <div className="h-3 bg-muted animate-pulse rounded w-16" />
                      </div>
                    </div>
                    <div className="h-4 bg-muted animate-pulse rounded w-20" />
                    <div className="h-4 bg-muted animate-pulse rounded w-16" />
                    <div className="h-4 bg-muted animate-pulse rounded w-24" />
                    <div className="h-4 bg-muted animate-pulse rounded w-12" />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}