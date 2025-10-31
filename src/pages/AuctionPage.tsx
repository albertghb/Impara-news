import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Gavel, 
  Clock, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Heart,
  Eye,
  Filter,
  Search,
  ChevronDown,
  Calendar,
  MapPin,
  Award,
  Zap,
  Newspaper
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AuctionItem {
  id: string;
  title: string;
  description: string;
  currentBid: number;
  startingBid: number;
  minIncrement: number;
  endTime: Date;
  image: string;
  category: string;
  seller: string;
  totalBids: number;
  watchers: number;
  location: string;
  condition: string;
  featured?: boolean;
}

interface Article {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: { name: string; nameRw: string };
  publishedAt: string;
  views: number;
  readTime: string;
}

const AuctionPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("ending-soon");
  const [showFilters, setShowFilters] = useState(false);
  const [auctionItems, setAuctionItems] = useState<AuctionItem[]>([]);
  const [newsArticles, setNewsArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch auctions from database
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:4000/api/auctions?status=active&limit=50');
        const data = await response.json();
        
        if (data.success && data.data) {
          // Transform database format to component format
          const transformedAuctions = data.data.map((auction: {
            id: number;
            title: string;
            fullDescription?: string;
            currentBid?: number;
            startingBid: number;
            minIncrement: number;
            endTime: string;
            images?: string;
            category: string;
            seller?: { name: string };
            totalBids?: number;
            watchers?: number;
            location: string;
            condition: string;
            isFeatured?: boolean;
          }) => ({
            id: auction.id.toString(),
            title: auction.title,
            description: auction.fullDescription || '',
            currentBid: auction.currentBid || auction.startingBid,
            startingBid: auction.startingBid,
            minIncrement: auction.minIncrement,
            endTime: new Date(auction.endTime),
            image: auction.images ? 
              (auction.images.startsWith('/uploads/') ? 
                `http://localhost:4000${auction.images.split(',')[0].trim()}` : 
                auction.images.split(',')[0].trim()) : 
              'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
            category: auction.category,
            seller: auction.seller?.name || 'Unknown',
            totalBids: auction.totalBids || 0,
            watchers: auction.watchers || 0,
            location: auction.location,
            condition: auction.condition,
            featured: auction.isFeatured || false
          }));
          setAuctionItems(transformedAuctions);
        }
      } catch (error) {
        console.error('Failed to fetch auctions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  // Fetch news articles from database
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/articles/latest?limit=10');
        const data = await response.json();
        
        if (data.success && data.data) {
          setNewsArticles(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch news articles:', error);
      }
    };

    fetchNews();
  }, []);

  // Helper function to get proper image URL
  const getImageUrl = (imageUrl?: string, fallback: string = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop') => {
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

  const categories = [
    { id: "all", name: "All Categories", icon: <Gavel className="w-4 h-4" /> },
    { id: "electronics", name: "Electronics", icon: <Zap className="w-4 h-4" /> },
    { id: "art", name: "Art & Crafts", icon: <Award className="w-4 h-4" /> },
    { id: "furniture", name: "Furniture", icon: <MapPin className="w-4 h-4" /> },
  ];

  // Countdown timer component
  const CountdownTimer = ({ endTime }: { endTime: Date }) => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const end = endTime.getTime();
        const distance = end - now;

        if (distance < 0) {
          setTimeLeft("Ended");
          clearInterval(timer);
        } else {
          const hours = Math.floor(distance / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(timer);
    }, [endTime]);

    return (
      <div className="flex items-center gap-2 text-red-600 font-semibold">
        <Clock className="w-4 h-4 animate-pulse" />
        <span>{timeLeft}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">Loading Auctions...</div>
          <div className="text-gray-600">Please wait while we fetch the latest auctions</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-primary text-white py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Gavel className="w-12 h-12" />
              <h1 className="text-5xl font-bold">Impara Auctions</h1>
            </div>
            <p className="text-xl text-white/90 mb-8">
              Bid on amazing items from verified sellers across Rwanda
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search auctions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-white/20 bg-white/10 text-white placeholder:text-white/60 focus:bg-white focus:text-gray-900 transition-all"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="glass p-6 rounded-xl"
              >
                <Gavel className="w-8 h-8 mx-auto mb-2" />
                <div className="text-3xl font-bold">156</div>
                <div className="text-sm text-white/80">Active Auctions</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="glass p-6 rounded-xl"
              >
                <Users className="w-8 h-8 mx-auto mb-2" />
                <div className="text-3xl font-bold">2.4K</div>
                <div className="text-sm text-white/80">Active Bidders</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="glass p-6 rounded-xl"
              >
                <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm text-white/80">Success Rate</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="glass p-6 rounded-xl"
              >
                <Award className="w-8 h-8 mx-auto mb-2" />
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-white/80">Items Sold</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Auction Content */}
          <div className="lg:col-span-3">
            {/* Categories & Filters */}
            <div className="mb-8">
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === category.id
                    ? "bg-gradient-primary text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>

          {/* Sort & Filter */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-green-500 outline-none"
              >
                <option value="ending-soon">Ending Soon</option>
                <option value="newly-listed">Newly Listed</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="most-bids">Most Bids</option>
              </select>
            </div>
            <div className="text-gray-600">
              Showing <span className="font-semibold">{auctionItems.length}</span> auctions
            </div>
            </div>
            </div>

            {/* Featured Auctions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Zap className="w-8 h-8 text-yellow-500" />
            Featured Auctions
          </h2>
          {auctionItems.filter((item) => item.featured).length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow">
              <p className="text-gray-500">No featured auctions available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctionItems
                .filter((item) => item.featured)
                .map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="modern-card card-hover relative overflow-hidden"
                >
                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="badge badge-glow flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Featured
                    </span>
                  </div>

                  {/* Image */}
                  <div className="image-zoom relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all">
                        <Heart className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="badge badge-primary">{item.category}</span>
                      <CountdownTimer endTime={item.endTime} />
                    </div>

                    <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-green-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Current Bid */}
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg mb-4">
                      <div className="text-sm text-gray-600 mb-1">Current Bid</div>
                      <div className="text-3xl font-bold text-green-600 flex items-center gap-2">
                        <DollarSign className="w-6 h-6" />
                        {item.currentBid.toLocaleString()} RWF
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {item.totalBids} bids
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {item.watchers} watching
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button className="w-full btn-modern btn-primary button-ripple">
                      <Gavel className="w-4 h-4 mr-2" />
                      Place Bid
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

            {/* All Auctions */}
            <div>
          <h2 className="text-3xl font-bold mb-6">All Auctions</h2>
          {auctionItems.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow">
              <p className="text-gray-500 text-lg mb-2">No auctions available</p>
              <p className="text-gray-400 text-sm">Check back later for new auctions from the database</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctionItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="modern-card card-hover"
              >
                {/* Image */}
                <div className="image-zoom relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all hover-scale">
                      <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="badge badge-outline text-xs">{item.category}</span>
                    <CountdownTimer endTime={item.endTime} />
                  </div>

                  <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-green-600 transition-colors cursor-pointer">
                    {item.title}
                  </h3>

                  {/* Current Bid */}
                  <div className="bg-gray-50 p-3 rounded-lg mb-3">
                    <div className="text-xs text-gray-600 mb-1">Current Bid</div>
                    <div className="text-2xl font-bold text-green-600">
                      {item.currentBid.toLocaleString()} RWF
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {item.totalBids} bids
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Place Bid
                  </Button>
                </div>
              </motion.div>
            ))}
              </div>
            )}
            </div>
          </div>

          {/* News Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-3">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <Newspaper className="w-5 h-5" />
                    Latest News
                  </h2>
                </div>
                <div className="p-4 space-y-4 max-h-[800px] overflow-y-auto">
                  {newsArticles.length > 0 ? (
                    newsArticles.map((article) => (
                      <Link
                        key={article.id}
                        to={`/news/${article.id}`}
                        className="block group hover:bg-gray-50 p-3 rounded-lg transition-colors"
                      >
                        <div className="flex gap-3">
                          <img
                            src={getImageUrl(article.imageUrl)}
                            alt={article.title}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-sm line-clamp-2 group-hover:text-purple-600 transition-colors mb-1">
                              {article.title}
                            </h3>
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
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Newspaper className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No news articles available</p>
                    </div>
                  )}
                </div>
                <div className="border-t p-4">
                  <Link
                    to="/all-news"
                    className="block text-center text-purple-600 hover:text-purple-700 font-semibold text-sm"
                  >
                    View All News →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionPage;
