import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Newspaper, Briefcase, Eye, Clock } from "lucide-react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  views: number;
  readTime: string;
}

interface Advertisement {
  id: number;
  title: string;
  company: string;
  imageUrl: string;
  location: string;
  category: string;
}

const NewsSidebar = () => {
  const [latestNews, setLatestNews] = useState<Article[]>([]);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);

  // Fetch latest news from database
  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/articles/latest?limit=5');
        const data = await response.json();
        if (data.success && data.data) {
          setLatestNews(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch latest news:', error);
      }
    };

    fetchLatestNews();
  }, []);

  // Fetch advertisements from database
  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/advertisements?limit=5');
        const data = await response.json();
        if (data.success && data.data) {
          setAdvertisements(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch advertisements:', error);
      }
    };

    fetchAdvertisements();
  }, []);

  // Helper function to get proper image URL
  const getImageUrl = (imageUrl?: string, fallback: string = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200') => {
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

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  return (
    <div className="space-y-6">
      {/* Latest News from Database */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-purple-500 px-4 py-3">
          <h2 className="text-white font-bold text-lg flex items-center gap-2">
            <Newspaper className="w-5 h-5" />
            Latest News
          </h2>
        </div>
        <div className="divide-y divide-gray-100">
          {latestNews.length > 0 ? (
            latestNews.map((article, index) => (
              <Link
                key={article.id}
                to={`/news/${article.id}`}
                className="block p-3 hover:bg-purple-50 transition-colors group"
              >
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex gap-3"
                >
                  <img
                    src={getImageUrl(article.imageUrl)}
                    alt={article.title}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-purple-600 transition-colors mb-1">
                      {article.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {formatViews(article.views)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime || '5 min'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              <Newspaper className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No news available</p>
            </div>
          )}
        </div>
      </div>

      {/* Advertisements from Database */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3">
          <h2 className="text-white font-bold text-lg flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Advertisements
          </h2>
        </div>
        <div className="divide-y divide-gray-100">
          {advertisements.length > 0 ? (
            advertisements.map((ad, index) => (
              <Link
                key={ad.id}
                to={`/advertisement/${ad.id}`}
                className="block p-3 hover:bg-blue-50 transition-colors group"
              >
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex gap-3"
                >
                  <img
                    src={getImageUrl(ad.imageUrl, 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200')}
                    alt={ad.title}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">
                      {ad.title}
                    </h4>
                    <p className="text-xs text-gray-600 truncate">{ad.company}</p>
                    <p className="text-xs text-gray-500">{ad.location}</p>
                  </div>
                </motion.div>
              </Link>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              <Briefcase className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No advertisements available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsSidebar;
