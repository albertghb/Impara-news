import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthorInfo from "@/components/AuthorInfo";
import TrendingSidebar from "@/components/TrendingSidebar";
import { BusinessAdBanner, BannerAd } from "@/components/AdBanner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Share2 } from "lucide-react";
import { articles, trendingPosts } from "@/data/articles";

const ArticlePage = () => {
  const { id } = useParams();
  const article = articles.find(a => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Top Banner Ad */}
      <div className="container mx-auto px-4 pt-4">
        <BannerAd />
      </div>
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article Content */}
          <article className="flex-1 max-w-4xl">
            {/* Back Button */}
            <div className="mb-6">
              <Link to="/">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Articles
                </Button>
              </Link>
            </div>

            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{article.category}</Badge>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{article.date}</span>
              </div>
              
              <h1 className="headline-xl mb-4">{article.title}</h1>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
                
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </header>

            {/* Featured Image */}
            {article.image && (
              <div className="aspect-video rounded-xl overflow-hidden mb-8">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Content */}
            <div 
              className="prose prose-gray max-w-none prose-headings:font-semibold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-news-accent prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {article.tags && (
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* In-Article Ad */}
            <div className="my-8">
              <BusinessAdBanner />
            </div>

            {/* Author Bio */}
            <div className="mt-12">
              <AuthorInfo
                name={article.author.name}
                bio={article.author.bio}
                avatar={article.author.avatar}
                title={article.author.title}
                socialLinks={article.author.socialLinks}
              />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="w-full lg:w-80">
            {/* Author Info Compact */}
            <div className="mb-6 lg:hidden">
              <AuthorInfo
                name={article.author.name}
                bio={article.author.bio}
                avatar={article.author.avatar}
                title={article.author.title}
                compact={true}
              />
            </div>

            {/* Author Info Full - Desktop */}
            <div className="hidden lg:block mb-6">
              <AuthorInfo
                name={article.author.name}
                bio={article.author.bio}
                avatar={article.author.avatar}
                title={article.author.title}
                socialLinks={article.author.socialLinks}
              />
            </div>

            <TrendingSidebar posts={trendingPosts.filter(p => p.id !== article.id)} />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticlePage;