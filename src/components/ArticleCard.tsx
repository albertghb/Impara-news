import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Clock } from "lucide-react";

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
  readTime: string;
  image?: string;
  category?: string;
  featured?: boolean;
}

const ArticleCard = ({ 
  id, 
  title, 
  excerpt, 
  author, 
  date, 
  readTime, 
  image, 
  category,
  featured = false 
}: ArticleCardProps) => {
  if (featured) {
    return (
      <div className="relative bg-gradient-to-r from-primary to-primary/80 rounded-xl overflow-hidden text-primary-foreground">
        {image && (
          <div className="absolute inset-0">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover opacity-20"
            />
          </div>
        )}
        <div className="relative p-8 md:p-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary-foreground/20 rounded-full text-sm font-medium">
              {date}
            </span>
            {category && (
              <span className="px-3 py-1 bg-primary-foreground/10 rounded-full text-sm">
                {category}
              </span>
            )}
          </div>
          <h2 className="headline-lg mb-4 max-w-3xl">{title}</h2>
          <p className="body-text opacity-90 mb-6 max-w-2xl">{excerpt}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={author.avatar} />
                <AvatarFallback className="bg-primary-foreground text-primary">
                  {author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{author.name}</p>
                <div className="flex items-center gap-2 text-sm opacity-80">
                  <Clock className="w-4 h-4" />
                  <span>{readTime}</span>
                </div>
              </div>
            </div>
            
            <Link to={`/article/${id}`}>
              <Button variant="secondary" className="gap-2">
                Read More
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="article-card group">
      {image && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={author.avatar} />
            <AvatarFallback className="text-xs">
              {author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{author.name}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
        </div>

        <h3 className="headline-md mb-3 group-hover:text-news-accent transition-colors">
          <Link to={`/article/${id}`}>{title}</Link>
        </h3>
        
        <p className="body-text text-muted-foreground mb-4 line-clamp-3">{excerpt}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{readTime}</span>
          </div>
          
          <Link to={`/article/${id}`}>
            <Button variant="ghost" size="sm" className="gap-2 group/btn">
              Read More
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;