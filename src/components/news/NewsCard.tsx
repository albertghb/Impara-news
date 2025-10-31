import { Link } from "react-router-dom";
import { NewsItem } from "@/types/news";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, MessageCircle, Share2, Heart } from "lucide-react";

interface NewsCardProps {
  news: NewsItem;
  variant?: "default" | "featured" | "compact";
}

export function NewsCard({ news, variant = "default" }: NewsCardProps) {
  return (
    <article className="group overflow-hidden rounded-lg border border-border bg-card hover:shadow-md transition-shadow duration-200">
      <Link to={`/article/${news.id}`} className="block h-full">
        <div className="relative aspect-video overflow-hidden">
          {news.isBreaking && (
            <Badge 
              variant="default" 
              className="absolute top-2 left-2 z-10 animate-pulse bg-gradient-to-r from-green-600 to-green-500 text-white border-0"
            >
              BREAKING NEWS
            </Badge>
          )}
          {news.imageUrl ? (
            <img
              src={news.imageUrl}
              alt={news.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No Image</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">{news.category}</Badge>
            <span className="text-xs text-muted-foreground">
              {formatDate(news.publishedAt)}
            </span>
          </div>
          
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {news.title}
          </h3>
          
          {variant !== "compact" && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {news.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {news.views.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3" />
                {news.comments}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {news.likes}
              </span>
            </div>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {news.readTime}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
