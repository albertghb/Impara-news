import { NewsItem } from "@/types/news";
import { NewsCard } from "./NewsCard";

interface NewsListProps {
  news: NewsItem[];
  variant?: 'default' | 'featured' | 'compact';
  loading?: boolean;
  loadingCount?: number;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export function NewsList({ 
  news, 
  variant = 'default',
  loading = false,
  loadingCount = 6,
  onLoadMore,
  hasMore = false
}: NewsListProps) {
  const gridClass = variant === 'compact' 
    ? 'space-y-6'
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';

  if (loading && news.length === 0) {
    return (
      <div className={gridClass}>
        {Array.from({ length: loadingCount }).map((_, i) => (
          <NewsCardSkeleton key={i} variant={variant} />
        ))}
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-muted-foreground">No news found</h3>
        <p className="text-sm text-muted-foreground mt-2">Check back later for updates</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className={gridClass}>
        {news.map((item) => (
          <NewsCard 
            key={item.id} 
            news={item} 
            variant={variant === 'featured' ? 'featured' : 'default'} 
          />
        ))}
      </div>
      
      {loading && (
        <div className="flex justify-center">
          <div className="animate-pulse text-muted-foreground">Loading more news...</div>
        </div>
      )}
      
      {hasMore && !loading && onLoadMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={onLoadMore}
            className="px-6 py-2 border border-border rounded-md text-sm font-medium hover:bg-accent transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

// Skeleton loader for news cards
function NewsCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'featured' | 'compact' }) {
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';
  
  return (
    <div className="rounded-lg border border-border overflow-hidden bg-card">
      <div className="aspect-video bg-muted animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded w-1/3 animate-pulse" />
        <div className="h-5 bg-muted rounded w-full animate-pulse" />
        {!isCompact && (
          <>
            <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
          </>
        )}
        <div className="flex justify-between pt-2">
          <div className="h-3 bg-muted rounded w-1/4 animate-pulse" />
          <div className="h-3 bg-muted rounded w-1/4 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
