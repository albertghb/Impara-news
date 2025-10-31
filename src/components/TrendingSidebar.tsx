import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TechAdBanner } from "@/components/AdBanner";
import { TrendingUp, Clock } from "lucide-react";

interface TrendingPost {
  id: string;
  title: string;
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
  readTime: string;
  image?: string;
}

interface TrendingSidebarProps {
  posts: TrendingPost[];
}

const TrendingSidebar = ({ posts }: TrendingSidebarProps) => {
  return (
    <aside className="w-full lg:w-80 space-y-6">
      {/* Trending Posts Section */}
      <div className="trending-bg rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-news-accent" />
          <h2 className="headline-md">Trending Posts</h2>
        </div>
        
        <div className="space-y-4">
          {posts.map((post, index) => (
            <article key={post.id} className="trending-item">
              <div className="flex gap-4">
                {post.image && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  
                  <h3 className="font-medium text-sm leading-snug mb-2 line-clamp-2">
                    <Link 
                      to={`/article/${post.id}`}
                      className="hover:text-news-accent transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback className="text-xs">
                        {post.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{post.author.name}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Ad Banner */}
      <TechAdBanner />

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-news-accent to-news-accent/80 rounded-xl p-6 text-news-accent-foreground">
        <h3 className="headline-md mb-3">Stay Updated</h3>
        <p className="text-sm opacity-90 mb-4">
          Get the latest news and insights delivered directly to your inbox.
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder:text-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <button className="w-full bg-white text-news-accent py-2 rounded-lg font-medium hover:bg-white/90 transition-colors">
            Subscribe
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="trending-bg rounded-xl p-6">
        <h3 className="headline-md mb-4">Categories</h3>
        <div className="space-y-2">
          {[
            { name: 'Technology', count: 12 },
            { name: 'Business', count: 8 },
            { name: 'Lifestyle', count: 15 },
            { name: 'Science', count: 6 },
            { name: 'Health', count: 9 }
          ].map((category) => (
            <Link
              key={category.name}
              to={`/category/${category.name.toLowerCase()}`}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors group"
            >
              <span className="font-medium group-hover:text-news-accent transition-colors">
                {category.name}
              </span>
              <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {category.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default TrendingSidebar;