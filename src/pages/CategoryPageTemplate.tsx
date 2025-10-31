import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Eye, Clock, LucideIcon } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  author: { name: string };
  publishedAt: string;
  views: number;
  readTime: string;
}

interface CategoryPageTemplateProps {
  categorySlug: string;
  categoryName: string;
  categoryNameRw: string;
  description: string;
  icon: LucideIcon;
  color: string;
  fallbackImage: string;
}

const CategoryPageTemplate = ({
  categorySlug,
  categoryName,
  categoryNameRw,
  description,
  icon: Icon,
  color,
  fallbackImage
}: CategoryPageTemplateProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/articles?category=${categorySlug}`);
      const data = await response.json();
      if (data.articles) {
        setArticles(data.articles);
      }
    } catch (error) {
      console.error(`Error fetching ${categoryName} articles:`, error);
    } finally {
      setLoading(false);
    }
  }, [categorySlug, categoryName]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const getImageUrl = (imageUrl?: string) => {
    if (!imageUrl) return fallbackImage;
    if (imageUrl.startsWith('http')) return imageUrl;
    return `http://localhost:4000${imageUrl}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
    return views.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text={`Loading ${categoryName} News...`} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r from-${color}-600 to-${color}-500 text-white py-12`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Icon className="w-10 h-10" />
              <h1 className="text-4xl md:text-5xl font-bold">{categoryName}</h1>
            </div>
            <p className="text-lg text-white/90 max-w-2xl">{description}</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {articles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <Icon className={`w-16 h-16 text-${color}-600 mx-auto mb-4`} />
            <p className="text-gray-500 text-lg mb-2">No {categoryName.toLowerCase()} articles found yet.</p>
            <p className="text-gray-400">Add some articles in the admin panel!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <Link key={article.id} to={`/news/${article.id}`}>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={getImageUrl(article.imageUrl)}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = fallbackImage;
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`bg-${color}-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1`}>
                        <Icon className="w-3 h-3" />
                        {categoryNameRw}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className={`text-xl font-bold mb-2 line-clamp-2 group-hover:text-${color}-600 transition-colors`}>
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {article.excerpt || 'Read more...'}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span>{formatViews(article.views)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime || '5 min'} read</span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPageTemplate;
