import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Eye, User, Clock, TrendingUp, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  date: string;
  views: string;
  readTime: string;
}

const AllNewsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample news articles
  const allNews: NewsArticle[] = [
    {
      id: "1",
      title: "Akarere ka Bugesera habereye inama mpuzamahanga y'iha kumashyamba",
      excerpt: "Akarere ka Bugesera kazakira inama mpuzamahanga y'iha kumashyamba mu mezi atatu aza. Iyi nama izahuriza abahanga benshi bo mu Rwanda n'isi yose.",
      category: "Imibereho",
      image: "/src/assets/bugesera.jpg",
      author: "Iashize Imena",
      date: "Ukwakira 24, 2025",
      views: "2.3k",
      readTime: "5 min"
    },
    {
      id: "2",
      title: "Rayon Sports yatsitse Amagaju FC ikomeza ku rufonde rwa Shampiyona",
      excerpt: "Rayon Sports yakomeje urugendo rwayo rwo kwegera igikombe cy'umwaka wa 2025 nyuma yo gutsinda Amagaju FC 2-0 ku kibuga cya Kigali.",
      category: "Siporo",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=400&fit=crop",
      author: "Jean Bosco",
      date: "Ukwakira 24, 2025",
      views: "1.8k",
      readTime: "4 min"
    },
    {
      id: "3",
      title: "Musanze: Abofisiye 75 basoje amasomo yo kuyobora abandi",
      excerpt: "Abakozi 75 bo mu rwego rw'abofisiye basoje amahugurwa y'ubuyobozi mu Karere ka Musanze. Aya masomo yateguwe n'ikigo cy'ubuyobozi bwa Leta.",
      category: "Uburezi",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
      author: "Marie Claire",
      date: "Ukwakira 24, 2025",
      views: "1.5k",
      readTime: "3 min"
    },
    {
      id: "4",
      title: "Perezida Kagame yavuze ku iterambere ry'u Rwanda",
      excerpt: "Perezida wa Repubulika y'u Rwanda Paul Kagame yavuze ko u Rwanda rugiye gukomeza iterambere mu myaka iri imbere.",
      category: "Politiki",
      image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&h=400&fit=crop",
      author: "Patrick Nkusi",
      date: "Ukwakira 24, 2025",
      views: "3.2k",
      readTime: "6 min"
    },
    {
      id: "5",
      title: "Ubukungu bw'u Rwanda bwiyongereye 8.2% mu gihembwe cya mbere",
      excerpt: "Ikigo cy'Ibarurishamibare cy'u Rwanda cyatangaje ko ubukungu bwiyongereye 8.2% mu gihembwe cya mbere cy'umwaka wa 2025.",
      category: "Ubukungu",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      author: "Emmanuel Uwase",
      date: "Ukwakira 23, 2025",
      views: "2.7k",
      readTime: "5 min"
    },
    {
      id: "6",
      title: "Ikoranabuhanga: Rwanda yashyize ahagaragara satellite nshya",
      excerpt: "U Rwanda rwashyize ahagaragara satellite nshya izafasha mu itumanaho n'ikoranabuhanga mu gihugu.",
      category: "Ikoranabuhanga",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
      author: "David Mugisha",
      date: "Ukwakira 23, 2025",
      views: "3.5k",
      readTime: "6 min"
    },
    {
      id: "7",
      title: "Ubuzima: Minisitiri yashimiye abanyarwanda ku mirire myiza",
      excerpt: "Minisitiri w'ubuzima Dr Sabin Nsanzimana yashimiye abanyarwanda ku buryo bafata neza imirire yabo.",
      category: "Ubuzima",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
      author: "Alice Mukamana",
      date: "Ukwakira 22, 2025",
      views: "2.1k",
      readTime: "4 min"
    },
    {
      id: "8",
      title: "Uburezi: Abanyeshuri 500 bazahabwa buruse za Leta",
      excerpt: "Minisiteri y'uburezi yatangaje ko abanyeshuri 500 bazahabwa buruse za Leta kugira ngo bakomeze amashuri yabo.",
      category: "Uburezi",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop",
      author: "Eric Nshimiyimana",
      date: "Ukwakira 22, 2025",
      views: "1.9k",
      readTime: "3 min"
    },
    {
      id: "9",
      title: "Imyidagaduro: Umuhanzi Bruce Melodie azasohora alubumu nshya",
      excerpt: "Umuhanzi Bruce Melodie yatangaje ko azasohora alubumu nshya mu kwezi gutaha.",
      category: "Imyidagaduro",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
      author: "Grace Uwera",
      date: "Ukwakira 21, 2025",
      views: "4.2k",
      readTime: "3 min"
    },
    {
      id: "10",
      title: "Ikirere: Imvura nyinshi ziteganywa muri iki cyumweru",
      excerpt: "Ikigo cy'ikirere cy'u Rwanda gitangaje ko imvura nyinshi ziteganywa mu ntara zinyuranye muri iki cyumweru.",
      category: "Ikirere",
      image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=600&h=400&fit=crop",
      author: "Joseph Habimana",
      date: "Ukwakira 21, 2025",
      views: "1.6k",
      readTime: "2 min"
    },
    {
      id: "11",
      title: "Ubucuruzi: Amasoko mashya azafungurika mu mujyi wa Kigali",
      excerpt: "Umujyi wa Kigali uteganya gufungura amasoko mashya kugira ngo yongere uburyo bwo gucuruza.",
      category: "Ubucuruzi",
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=600&h=400&fit=crop",
      author: "Christine Uwase",
      date: "Ukwakira 20, 2025",
      views: "2.4k",
      readTime: "4 min"
    },
    {
      id: "12",
      title: "Ubutabera: Urukiko rukomeye rwemeje igihano cy'imyaka 15",
      excerpt: "Urukiko rukomeye rwemeje igihano cy'imyaka 15 ku muregwa wo gukora ibyaha by'uburiganya.",
      category: "Ubutabera",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop",
      author: "Robert Mugabo",
      date: "Ukwakira 20, 2025",
      views: "1.7k",
      readTime: "5 min"
    }
  ];

  const categories = [
    "all",
    "Politiki",
    "Ubukungu",
    "Siporo",
    "Ubuzima",
    "Uburezi",
    "Imyidagaduro",
    "Ikoranabuhanga"
  ];

  const filteredNews = allNews.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-primary text-white py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-4">Inkuru Zose</h1>
            <p className="text-xl text-white/90 mb-8">
              Soma amakuru yose yo mu Rwanda n'isi yose
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Shakisha inkuru..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-white/20 bg-white/10 text-white placeholder:text-white/60 focus:bg-white focus:text-gray-900 transition-all"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Categories Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-bold">Hitamo Icyiciro</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-primary text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category === "all" ? "Byose" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-gray-600">
          Byose hamwe: <span className="font-semibold text-green-600">{filteredNews.length}</span> inkuru
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="modern-card card-hover cursor-pointer"
            >
              <Link to={`/news/${article.id}`}>
                <div className="image-zoom relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="badge badge-primary">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-green-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

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
              </Link>
            </motion.article>
          ))}
        </div>

        {/* No Results */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nta makuru yabonetse</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllNewsPage;
