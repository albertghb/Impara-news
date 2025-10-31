import { motion } from "framer-motion";
import { Trophy, Calendar, Eye, Clock, TrendingUp } from "lucide-react";
import { BannerAd } from "@/components/AdBanner";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  views: string;
  readTime: string;
}

const Sports = () => {
  const sportsNews: NewsArticle[] = [
    {
      id: "1",
      title: "Rayon Sports yatsitze Amagaju FC ikomeza ku rufonde rwa Shampiyona",
      excerpt: "Rayon Sports yakomeje urugendo rwo kwegera igikombe, itsinda mu mukino w'ishiraniro...",
      image: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=800&h=500&fit=crop",
      author: "Jean Bosco",
      date: "Ukwakira 24, 2025",
      views: "2.5k",
      readTime: "4 min"
    },
    {
      id: "2",
      title: "APR FC yatsinze AS Kigali mu mukino ukomeye",
      excerpt: "APR FC yatsinze AS Kigali 2-1 mu mukino wagaragayemo uburyo bwinshi bwo gutsinda...",
      image: "https://images.unsplash.com/photo-1603808033192-0604c29f3d4a?w=800&h=500&fit=crop",
      author: "Marie Claire",
      date: "Ukwakira 23, 2025",
      views: "1.8k",
      readTime: "3 min"
    },
    {
      id: "3",
      title: "Amavubi yateguye imyitozo y'umukino wa CAF",
      excerpt: "Amavubi yatangiye imyitozo yo kwitegura umukino ukomeye wa CAF...",
      image: "https://images.unsplash.com/photo-1517927033932-6d2a4d1145f3?w=800&h=500&fit=crop",
      author: "Patrick Uwase",
      date: "Ukwakira 22, 2025",
      views: "3.2k",
      readTime: "5 min"
    },
    {
      id: "4",
      title: "Basketball: REG yaronse igikombe cya BAL",
      excerpt: "REG Basketball Club yegukanye igikombe cya Basketball Africa League mu buryo budasanzwe...",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=500&fit=crop",
      author: "Eric Nshimiyimana",
      date: "Ukwakira 21, 2025",
      views: "2.1k",
      readTime: "4 min"
    },
    {
      id: "5",
      title: "Volleyball: Rwanda yatsindiye Kenya mu mukino wa CAVB",
      excerpt: "Ikipe y'igihugu mu Volleyball yatsindiye Kenya mu mukino wa CAVB, igaragaza urwego rwo hejuru...",
      image: "https://images.unsplash.com/photo-1517959105821-eaf2591984b2?w=800&h=500&fit=crop",
      author: "Alice Mukamana",
      date: "Ukwakira 20, 2025",
      views: "1.5k",
      readTime: "3 min"
    },
    {
      id: "6",
      title: "Tour du Rwanda: Abakinnyi 150 bazitabira",
      excerpt: "Tour du Rwanda izakurura abakinnyi bagera ku 150 baturutse hirya no hino ku isi...",
      image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&h=500&fit=crop",
      author: "David Mugisha",
      date: "Ukwakira 19, 2025",
      views: "2.8k",
      readTime: "6 min"
    },
  ];

  const trendingNews = [
    {
      id: "t1",
      title: "Monya bamwe mu begukanye Shampiyona y'isi y'Amagare inshuro nyinshi",
      views: "5.2k"
    },
    {
      id: "t2",
      title: "Arsenal yatsindiye Manchester United 3-1",
      views: "4.8k"
    },
    {
      id: "t3",
      title: "Real Madrid yegukanye UEFA Champions League",
      views: "6.1k"
    },
    {
      id: "t4",
      title: "Cristiano Ronaldo yashyize ibitsindo 900",
      views: "7.5k"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-10 h-10" />
              <h1 className="text-4xl md:text-5xl font-bold">Sports</h1>
            </div>
            <p className="text-lg text-white/90 max-w-2xl">
              Stay updated with the latest sports news, scores, and highlights from around the world.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Top Banner Ad */}
      <div className="container mx-auto px-4 py-4">
        <BannerAd />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Featured Article */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={sportsNews[0].image}
                  alt={sportsNews[0].title}
                  className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                  {sportsNews[0].title}
                </h2>
                <p className="text-gray-600 mb-4">{sportsNews[0].excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{sportsNews[0].date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{sportsNews[0].readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{sportsNews[0].views}</span>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sportsNews.slice(1).map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{article.views}</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Trending Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-3">
                <h2 className="text-white font-bold text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Trending Sports
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {trendingNews.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 hover:bg-green-50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-green-600 transition-colors mb-1">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Eye className="w-3 h-3" />
                          <span>{item.views} views</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Ad Space */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <BannerAd />
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-3">
                <h2 className="text-white font-bold text-lg">Sports Categories</h2>
              </div>
              <div className="p-4 space-y-2">
                {[
                  "Football",
                  "Basketball",
                  "Volleyball",
                  "Athletics",
                  "Cycling",
                  "Tennis",
                ].map((category, index) => (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-green-50 text-gray-700 hover:text-green-600 transition-colors font-medium flex items-center justify-between group"
                  >
                    <span>{category}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Sports;
