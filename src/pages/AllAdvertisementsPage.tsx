import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Megaphone, 
  Search, 
  Filter, 
  MapPin, 
  Calendar,
  Eye,
  Phone,
  Mail,
  ExternalLink,
  TrendingUp
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Advertisement {
  id: string;
  title: string;
  description: string;
  company: string;
  category: string;
  image: string;
  location: string;
  date: string;
  views: string;
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  featured?: boolean;
}

const AllAdvertisementsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const advertisements: Advertisement[] = [
    {
      id: "1",
      title: "MINISANTE: Itangazo ryo gusaba abakozi mu by'ubuzima",
      description: "Minisiteri y'ubuzima irasaba abakozi b'ubuzima bafite ubushobozi bwo gukora mu bitaro by'ibanze. Amashyirahamwe yemewe n'ikigo cy'ubuzima azabona amahirwe yo gukora.",
      company: "Minisiteri y'Ubuzima",
      category: "Akazi",
      image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&h=400&fit=crop",
      location: "Kigali, Rwanda",
      date: "Ukwakira 23, 2025",
      views: "5.2k",
      contact: {
        phone: "+250 788 123 456",
        email: "info@moh.gov.rw",
        website: "www.moh.gov.rw"
      },
      featured: true
    },
    {
      id: "2",
      title: "MINEDUC: Amatora y'abarimu bazajya mu mahanga",
      description: "Minisiteri y'uburezi itangaje amatora y'abarimu bazajya kwiga mu mahanga. Abarimu bose bafite impamyabumenyi z'icyiciro cya kabiri bashobora kwiyandikisha.",
      company: "Minisiteri y'Uburezi",
      category: "Uburezi",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
      location: "Kigali, Rwanda",
      date: "Ukwakira 22, 2025",
      views: "4.8k",
      contact: {
        phone: "+250 788 234 567",
        email: "info@mineduc.gov.rw",
        website: "www.mineduc.gov.rw"
      },
      featured: true
    },
    {
      id: "3",
      title: "RDB: Gahunda yo gufasha abacuruzi bato",
      description: "Rwanda Development Board itangaje gahunda nshya yo gufasha abacuruzi bato n'abacuruzi bagezweho. Gahunda izatanga inguzanyo n'amahugurwa.",
      company: "Rwanda Development Board",
      category: "Ubucuruzi",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
      location: "Kigali, Rwanda",
      date: "Ukwakira 21, 2025",
      views: "6.1k",
      contact: {
        phone: "+250 788 345 678",
        email: "info@rdb.rw",
        website: "www.rdb.rw"
      },
      featured: true
    },
    {
      id: "4",
      title: "RSSB: Itangazo ku bafite ubwishingizi bw'ubuzima",
      description: "Rwanda Social Security Board iramenyesha abafite ubwishingizi bw'ubuzima ko hari serivisi nshya zashyizwe mu bikorwa.",
      company: "RSSB",
      category: "Ubwishingizi",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
      location: "Kigali, Rwanda",
      date: "Ukwakira 20, 2025",
      views: "3.9k",
      contact: {
        phone: "+250 788 456 789",
        email: "info@rssb.rw",
        website: "www.rssb.rw"
      }
    },
    {
      id: "5",
      title: "MINIJUST: Serivisi nshya zo mu cyicaro cy'igihugu",
      description: "Minisiteri y'ubutabera itangaje serivisi nshya zo mu cyicaro cy'igihugu. Abaturage bazashobora kubona serivisi zinyuranye mu buryo bworoshye.",
      company: "Minisiteri y'Ubutabera",
      category: "Serivisi",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop",
      location: "Kigali, Rwanda",
      date: "Ukwakira 19, 2025",
      views: "4.3k",
      contact: {
        phone: "+250 788 567 890",
        email: "info@minijust.gov.rw",
        website: "www.minijust.gov.rw"
      }
    },
    {
      id: "6",
      title: "BNR: Amasoko y'imari azafungurwa ku munsi mukuru",
      description: "Banki Nkuru y'u Rwanda itangaje ko amasoko y'imari azafungurwa ku munsi mukuru kugira ngo abantu bashobore gucuruza.",
      company: "Banki Nkuru y'u Rwanda",
      category: "Imari",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
      location: "Kigali, Rwanda",
      date: "Ukwakira 18, 2025",
      views: "5.7k",
      contact: {
        phone: "+250 788 678 901",
        email: "info@bnr.rw",
        website: "www.bnr.rw"
      }
    },
    {
      id: "7",
      title: "MINICOM: Ibiganiro ku bucuruzi n'ubukungu",
      description: "Minisiteri y'ubucuruzi n'inganda itangaje ibiganiro ku bucuruzi n'ubukungu bizakorwa mu ntara zinyuranye.",
      company: "MINICOM",
      category: "Ubucuruzi",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
      location: "Kigali, Rwanda",
      date: "Ukwakira 17, 2025",
      views: "3.2k",
      contact: {
        phone: "+250 788 789 012",
        email: "info@minicom.gov.rw",
        website: "www.minicom.gov.rw"
      }
    },
    {
      id: "8",
      title: "WASAC: Amazi mashya azatangwa mu turere",
      description: "WASAC itangaje ko amazi mashya azatangwa mu turere twinshi. Iyi gahunda igamije guteza imbere uburyo bwo kubona amazi meza.",
      company: "WASAC",
      category: "Serivisi",
      image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&h=400&fit=crop",
      location: "Byumba, Rwanda",
      date: "Ukwakira 16, 2025",
      views: "2.8k",
      contact: {
        phone: "+250 788 890 123",
        email: "info@wasac.rw",
        website: "www.wasac.rw"
      }
    }
  ];

  const categories = [
    "all",
    "Akazi",
    "Uburezi",
    "Ubucuruzi",
    "Ubwishingizi",
    "Serivisi",
    "Imari"
  ];

  const filteredAds = advertisements.filter((ad) => {
    const matchesSearch = ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ad.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || ad.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Megaphone className="w-12 h-12" />
              <h1 className="text-5xl font-bold">Amatangazo Yose</h1>
            </div>
            <p className="text-xl text-white/90 mb-8">
              Reba amatangazo yose y'akazi, uburezi, ubucuruzi n'ayandi
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Shakisha amatangazo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-white/20 bg-white/10 text-white placeholder:text-white/60 focus:bg-white focus:text-gray-900 transition-all"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
              <div className="glass p-6 rounded-xl">
                <Megaphone className="w-8 h-8 mx-auto mb-2" />
                <div className="text-3xl font-bold">{advertisements.length}</div>
                <div className="text-sm text-white/80">Amatangazo</div>
              </div>
              <div className="glass p-6 rounded-xl">
                <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm text-white/80">Yemewe</div>
              </div>
              <div className="glass p-6 rounded-xl">
                <Eye className="w-8 h-8 mx-auto mb-2" />
                <div className="text-3xl font-bold">45K</div>
                <div className="text-sm text-white/80">Abantu Barabye</div>
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
                    ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg scale-105"
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
          Byose hamwe: <span className="font-semibold text-orange-600">{filteredAds.length}</span> amatangazo
        </div>

        {/* Featured Ads */}
        {filteredAds.some(ad => ad.featured) && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-orange-500" />
              Amatangazo Akomeye
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAds
                .filter(ad => ad.featured)
                .map((ad, index) => (
                  <Link to={`/advertisement/${ad.id}`} key={ad.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="modern-card card-hover"
                    >
                      <div className="image-zoom relative">
                        <img
                          src={ad.image}
                          alt={ad.title}
                          className="w-full h-56 object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="badge badge-glow">
                            {ad.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-orange-600 transition-colors">
                          {ad.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">{ad.company}</p>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {ad.description}
                        </p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            {ad.location}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {ad.date}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Eye className="w-4 h-4" />
                            {ad.views} abantu barabye
                          </div>
                        </div>

                        <div className="border-t pt-4 space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-orange-600" />
                            <a href={`tel:${ad.contact.phone}`} className="hover:text-orange-600">
                              {ad.contact.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4 text-orange-600" />
                            <a href={`mailto:${ad.contact.email}`} className="hover:text-orange-600">
                              {ad.contact.email}
                            </a>
                          </div>
                          {ad.contact.website && (
                            <div className="flex items-center gap-2 text-sm">
                              <ExternalLink className="w-4 h-4 text-orange-600" />
                              <a href={`https://${ad.contact.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-orange-600">
                                {ad.contact.website}
                              </a>
                            </div>
                          )}
                        </div>

                        <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white">
                          Menya Byinshi
                        </Button>
                      </div>
                    </motion.div>
                  </Link>
                ))}
            </div>
          </div>
        )}

        {/* All Ads */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Amatangazo Yose</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAds.map((ad, index) => (
              <Link to={`/advertisement/${ad.id}`} key={ad.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="modern-card card-hover"
                >
                <div className="image-zoom relative">
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="badge badge-outline bg-white text-orange-600">
                      {ad.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-orange-600 transition-colors cursor-pointer">
                    {ad.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">{ad.company}</p>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {ad.description}
                  </p>

                  <div className="space-y-1 mb-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {ad.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {ad.date}
                    </div>
                  </div>

                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm">
                    Menya Byinshi
                  </Button>
                </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* No Results */}
        {filteredAds.length === 0 && (
          <div className="text-center py-12">
            <Megaphone className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">Nta matangazo yabonetse</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAdvertisementsPage;
