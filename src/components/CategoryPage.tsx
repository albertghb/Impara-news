import { motion } from "framer-motion";
import { Calendar, Eye, Clock, TrendingUp, LucideIcon } from "lucide-react";
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

interface TrendingItem {
  id: string;
  title: string;
  views: string;
}

interface CategoryPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
  news: NewsArticle[];
  trending: TrendingItem[];
  categories: string[];
  accentColor?: string;
}

const CategoryPage = ({
  title,
  description,
  icon: Icon,
  news,
  trending,
  categories,
  accentColor = "green"
}: CategoryPageProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r from-${accentColor}-600 to-${accentColor}-500 text-white py-12`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Icon className="w-10 h-10" />
              <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
            </div>
            <p className="text-lg text-white/90 max-w-2xl">{description}</p>
          </motion.div>
        </div>
      </div>

      {/* Top Banner Ad */}
      <div className="container mx-auto px-4 py-4">
        <BannerAd />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Featured Article */}
            {news.length > 0 && (
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -2 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={news[0].image}
                    alt={news[0].title}
                    className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`bg-${accentColor}-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2`}>
                      <Icon className="w-4 h-4" />
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className={`text-2xl font-bold text-gray-800 mb-3 group-hover:text-${accentColor}-600 transition-colors`}>
                    {news[0].title}
                  </h2>
                  <p className="text-gray-600 mb-4">{news[0].excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{news[0].date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{news[0].readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{news[0].views}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            )}

            {/* News Grid */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08 }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {news.slice(1).map((article, index) => (
                <motion.article
                  key={article.id}
                  variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className={`font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-${accentColor}-600 transition-colors`}>
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
            </motion.div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Trending Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className={`bg-gradient-to-r from-${accentColor}-600 to-${accentColor}-500 px-4 py-3`}>
                <h2 className="text-white font-bold text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Trending {title}
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {trending.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`p-4 hover:bg-${accentColor}-50 transition-colors cursor-pointer group`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-8 h-8 bg-${accentColor}-100 rounded-full flex items-center justify-center text-${accentColor}-600 font-bold text-sm`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-${accentColor}-600 transition-colors mb-1`}>
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
            <div className="bg-white rounded-xl shadow-md p-4">
              <BannerAd />
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className={`bg-gradient-to-r from-${accentColor}-600 to-${accentColor}-500 px-4 py-3`}>
                <h2 className="text-white font-bold text-lg">{title} Categories</h2>
              </div>
              <div className="p-4 space-y-2">
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    whileHover={{ x: 2 }}
                    className={`w-full text-left px-4 py-2 rounded-lg hover:bg-${accentColor}-50 text-gray-700 hover:text-${accentColor}-600 transition-colors font-medium flex items-center justify-between group`}
                  >
                    <span>{category}</span>
                    <div className={`w-1.5 h-1.5 rounded-full bg-${accentColor}-500 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
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

export default CategoryPage;
