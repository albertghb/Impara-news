import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Calendar, 
  User, 
  Eye, 
  Clock, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin,
  ArrowLeft,
  Tag,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsSidebar from "@/components/NewsSidebar";

interface Article {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  category: {
    id: number;
    name: string;
    nameRw: string;
    slug: string;
  };
  author: {
    id: number;
    name: string;
    email: string;
  };
  publishedAt: string;
  views: number;
  readTime: string;
  tags: string;
  comments: any[];
}

const NewsDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:4000/api/articles/${id}`);
        const data = await response.json();
        
        if (data.article) {
          setArticle(data.article);
          
          // Fetch related articles from same category
          if (data.article.category) {
            const relatedResponse = await fetch(
              `http://localhost:4000/api/articles?category=${data.article.category.slug}&limit=3`
            );
            const relatedData = await relatedResponse.json();
            if (relatedData.articles) {
              // Filter out current article
              const filtered = relatedData.articles.filter((a: Article) => a.id !== data.article.id);
              setRelatedArticles(filtered.slice(0, 3));
            }
          }
        } else {
          setError('Article not found');
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  // Helper function to get proper image URL
  const getImageUrl = (imageUrl?: string, fallback: string = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop') => {
    if (!imageUrl || imageUrl.trim() === '') {
      return fallback;
    }
    if (imageUrl.startsWith('/uploads/')) {
      return `http://localhost:4000${imageUrl}`;
    }
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    return `http://localhost:4000${imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('rw-RW', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading article...</div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The article you are looking for does not exist.'}</p>
          <Link to="/">
            <Button className="bg-green-600 hover:bg-green-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Parse tags from string to array
  const tags = article.tags ? article.tags.split(',').map(t => t.trim()).filter(t => t) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Subira Ahabanza</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Featured Image */}
              <div className="relative h-96 overflow-hidden">
                <img
                  src={getImageUrl(article.imageUrl)}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop';
                  }}
                />
                {article.category && (
                  <div className="absolute top-6 left-6">
                    <Link to={`/${article.category.slug}`}>
                      <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                        {article.category.nameRw || article.category.name}
                      </span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Article Header */}
              <div className="p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {article.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 mb-6 pb-6 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-lg">
                      {(article.author?.name && article.author.name.length > 0) ? article.author.name.charAt(0).toUpperCase() : 'A'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span className="font-semibold text-gray-900">{article.author?.name || 'Admin'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>{formatViews(article.views)} abantu barabye</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime || '5 min'} yo gusoma</span>
                    </div>
                  </div>
                </div>

                {/* Article Content */}
                <div 
                  className="prose prose-lg max-w-none mb-8"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="w-5 h-5 text-gray-600" />
                      <span className="font-semibold text-gray-700">Amagambo y'ibanze:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share Buttons */}
                <div className="border-t pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Share2 className="w-5 h-5 text-gray-600" />
                    <span className="font-semibold text-gray-700">Sangiza:</span>
                  </div>
                  <div className="flex gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Facebook className="w-4 h-4 mr-2" />
                      Facebook
                    </Button>
                    <Button className="bg-sky-500 hover:bg-sky-600 text-white">
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </Button>
                    <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Comments Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8 mt-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold">Ibitekerezo ({article.comments?.length || 0})</h2>
              </div>
              {article.comments && article.comments.length > 0 ? (
                <div className="space-y-4">
                  {article.comments.map((comment: any) => (
                    <div key={comment.id} className="border-b pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{comment.authorName}</span>
                        <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">
                  Nta bitekerezo. Ushaka gutanga igitekerezo? Injira cyangwa iyandikishe.
                </p>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            {/* Related Articles */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-4"
            >
              <div className="bg-gradient-primary px-6 py-4">
                <h2 className="text-white font-bold text-xl">Inkuru Zijyanye</h2>
              </div>
              <div className="divide-y">
                {relatedArticles.length > 0 ? (
                  relatedArticles.map((related) => (
                    <Link
                      key={related.id}
                      to={`/news/${related.id}`}
                      className="block p-4 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex gap-4">
                        <img
                          src={getImageUrl(related.imageUrl)}
                          alt={related.title}
                          className="w-24 h-20 object-cover rounded-lg flex-shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200';
                          }}
                        />
                        <div className="flex-1">
                          <span className="text-xs text-green-600 font-semibold">
                            {related.category.nameRw || related.category.name}
                          </span>
                          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-green-600 transition-colors mt-1">
                            {related.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    <p>Nta nkuru zijyanye</p>
                  </div>
                )}
              </div>
              <div className="p-4 border-t">
                <Link to="/all-news">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Reba Inkuru Zose
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Latest News & Ads Sidebar */}
            <div className="mt-6">
              <NewsSidebar />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
