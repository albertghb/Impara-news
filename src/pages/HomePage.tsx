import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, User, Eye, TrendingUp, Calendar } from "lucide-react";
import RotatingAuctionBox from "@/components/RotatingAuctionBox";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: { name: string; nameRw: string };
  author: { name: string };
  publishedAt: string;
  views: number;
  readTime: string;
}

interface Advertisement {
  id: number;
  title: string;
  imageUrl: string;
  company: string;
  category: string;
  location?: string;
  fullDescription?: string;
  views?: number;
  deadline?: string;
}

interface Auction {
  id: number;
  title: string;
  fullDescription?: string;
  location: string;
  current_bid?: number;
  starting_bid: number;
  status: string;
  images?: string;
  endTime: string;
  category: string;
}

const HomePage = () => {
  const [featuredNews, setFeaturedNews] = useState<Article[]>([]);
  const [breakingNews, setBreakingNews] = useState<Article[]>([]);
  const [latestNews, setLatestNews] = useState<Article[]>([]);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [currentBreakingIndex, setCurrentBreakingIndex] = useState(0);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch featured articles
    fetch('http://localhost:4000/api/articles/featured?limit=6')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setFeaturedNews(data.data);
        }
      })
      .catch(err => console.error('Failed to load featured news:', err));

    // Fetch breaking news
    fetch('http://localhost:4000/api/articles/breaking/all')
      .then(res => res.json())
      .then(data => {
        if (data.articles) {
          setBreakingNews(data.articles);
        }
      })
      .catch(err => console.error('Failed to load breaking news:', err));

    // Fetch latest news
    fetch('http://localhost:4000/api/articles/latest?limit=50')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setLatestNews(data.data);
        }
      })
      .catch(err => console.error('Failed to load latest news:', err));

    // Fetch advertisements
    fetch('http://localhost:4000/api/advertisements?limit=10')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setAdvertisements(data.data);
        }
      })
      .catch(err => console.error('Failed to load advertisements:', err));

    // Fetch auctions
    fetch('http://localhost:4000/api/auctions?status=active&limit=10')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setAuctions(data.data);
        }
      })
      .catch(err => console.error('Failed to load auctions:', err))
      .finally(() => setLoading(false));
  }, []);

  // Auto-rotate breaking news every 4 seconds
  useEffect(() => {
    if (breakingNews.length > 0) {
      const interval = setInterval(() => {
        setCurrentBreakingIndex((prev) => (prev + 1) % breakingNews.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [breakingNews]);

  // Auto-rotate advertisements every 5 seconds
  useEffect(() => {
    if (advertisements.length > 0) {
      // Reset index if it's out of bounds
      if (currentAdIndex >= advertisements.length) {
        setCurrentAdIndex(0);
      }
      
      const interval = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % advertisements.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [advertisements, currentAdIndex]);

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

  // Helper function to get proper image URL
  const getImageUrl = (imageUrl?: string, fallback: string = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop') => {
    if (!imageUrl || imageUrl.trim() === '') {
      return fallback;
    }
    // If it's a relative path, prepend the API URL
    if (imageUrl.startsWith('/uploads/')) {
      return `http://localhost:4000${imageUrl}`;
    }
    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    // If it's some other relative path, prepend the API URL
    return `http://localhost:4000${imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Breaking News & Advertisements Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Breaking News - Auto-rotating every 4 seconds */}
          {breakingNews.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-t-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 animate-pulse" />
                  <h2 className="text-sm sm:text-base md:text-xl font-bold">AMAKURU YIHUTIRWA / BREAKING NEWS</h2>
                </div>
                <div className="flex items-center gap-2">
                  {breakingNews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentBreakingIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentBreakingIndex ? 'bg-white w-6' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-b-xl shadow-lg overflow-hidden">
                <Link to={`/news/${breakingNews[currentBreakingIndex].id}`} className="block group">
                  <motion.div
                    key={currentBreakingIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative overflow-hidden h-64 sm:h-80 md:h-96">
                      <img
                        src={getImageUrl(breakingNews[currentBreakingIndex].imageUrl)}
                        alt={breakingNews[currentBreakingIndex].title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop';
                        }}
                      />
                      {/* Dark overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                      
                      {/* Breaking badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                          🔥 BREAKING NEWS
                        </span>
                      </div>
                      
                      {/* Content overlay on image */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 line-clamp-2 drop-shadow-lg">
                          {breakingNews[currentBreakingIndex].title}
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-4 line-clamp-2 text-gray-200 drop-shadow-md">
                          {breakingNews[currentBreakingIndex].excerpt || 'Click to read more...'}
                        </p>
                        <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-300">
                          <span className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {breakingNews[currentBreakingIndex].author?.name || 'Admin'}
                          </span>
                          <span className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            {formatViews(breakingNews[currentBreakingIndex].views)}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {breakingNews[currentBreakingIndex].readTime || '5 min'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Advertisements Sidebar - Auto-rotating every 5 seconds */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-t-xl flex items-center justify-between">
              <h2 className="text-sm sm:text-base md:text-xl font-bold">AMATANGAZO</h2>
              {advertisements.length > 0 && (
                <div className="flex items-center gap-2">
                  {advertisements.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentAdIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentAdIndex ? 'bg-white w-6' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="bg-white rounded-b-xl shadow-lg overflow-hidden">
              {advertisements.length > 0 && advertisements[currentAdIndex] ? (
                <Link
                  to={`/advertisement/${advertisements[currentAdIndex].id}`}
                  className="block group"
                >
                  <motion.div
                    key={currentAdIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative overflow-hidden h-64">
                      <img
                        src={getImageUrl(advertisements[currentAdIndex].imageUrl, 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop')}
                        alt={advertisements[currentAdIndex].title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop';
                        }}
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-blue-600 px-2 py-1 rounded">
                            {advertisements[currentAdIndex].category}
                          </span>
                          <span className="text-xs text-gray-300">
                            {advertisements[currentAdIndex].location}
                          </span>
                        </div>
                        <h4 className="font-bold text-lg line-clamp-2 mb-2 drop-shadow-lg">
                          {advertisements[currentAdIndex].title}
                        </h4>
                        <p className="text-sm text-gray-300 mb-2">
                          {advertisements[currentAdIndex].company}
                        </p>
                        {advertisements[currentAdIndex].fullDescription && (
                          <p className="text-xs text-gray-400 line-clamp-2">
                            {advertisements[currentAdIndex].fullDescription}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50">
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>👁️ {advertisements[currentAdIndex].views || 0} views</span>
                        {advertisements[currentAdIndex].deadline && (
                          <span>⏰ Deadline: {new Date(advertisements[currentAdIndex].deadline).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-sm">No advertisements yet</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Latest News & Auctions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Latest News List */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg">
            <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-t-xl">
              <h2 className="text-sm sm:text-base md:text-xl font-bold">AMAKURU MASHYA / LATEST NEWS</h2>
            </div>
            <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
              {latestNews.map((article) => (
                <Link key={article.id} to={`/news/${article.id}`} className="flex gap-3 sm:gap-4 p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                  <img 
                    src={getImageUrl(article.imageUrl, 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200')} 
                    alt={article.title} 
                    className="w-24 h-20 sm:w-32 sm:h-24 object-cover rounded-lg flex-shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm sm:text-base line-clamp-2 group-hover:text-purple-600 transition-colors mb-1">{article.title}</h3>
                    {article.excerpt && (
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">{article.excerpt}</p>
                    )}
                    <div className="flex gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(article.publishedAt).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{formatViews(article.views)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Auctions List - Rotating Single Box */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-t-xl">
              <h2 className="text-sm sm:text-base md:text-xl font-bold">AMASOKO</h2>
            </div>
            {auctions.length > 0 ? (
              <RotatingAuctionBox auctions={auctions.slice(0, 10)} />
            ) : (
              <div className="bg-white rounded-b-xl shadow-lg p-8 text-center">
                <p className="text-gray-500">No auctions available</p>
              </div>
            )}
          </div>
        </div>

        {/* Featured News Grid - Only show if there are featured articles */}
        {featuredNews.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                Amakuru Akomeye / Featured News
              </h2>
              <Link
                to="/all-news"
                className="text-sm sm:text-base text-green-600 hover:text-green-700 font-semibold flex items-center gap-2"
              >
                Reba Byose
                <TrendingUp className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {featuredNews.map((article, index) => (
                <Link key={article.id} to={`/news/${article.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="modern-card card-hover group"
                  >
                    <div className="image-zoom relative overflow-hidden rounded-t-xl">
                      <img
                        src={getImageUrl(article.imageUrl, 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop')}
                        alt={article.title}
                        className="w-full h-48 sm:h-56 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop';
                        }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          {article.category?.nameRw || article.category?.name || 'News'}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5">
                      <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {article.excerpt || 'Read more...'}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{article.author?.name || 'Admin'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(article.publishedAt)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {formatViews(article.views)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime || '5 min'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
