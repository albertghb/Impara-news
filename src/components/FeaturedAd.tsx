import { motion } from "framer-motion";

interface AdItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  bgColor?: string;
}

const FeaturedAd = () => {
  const ad: AdItem = {
    id: "featured-1",
    title: "Rwanda's Premier Business Conference 2025",
    description: "Join industry leaders, entrepreneurs, and innovators at the biggest business event of the year. Network, learn, and grow your business. Early bird tickets available now!",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
    bgColor: "from-blue-600 to-blue-500",
    link: "#"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer h-full"
    >
      <a
        href={ad.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {/* Image with Overlay Content */}
        <div className="relative h-full min-h-[400px] overflow-hidden">
          <img
            src={ad.image}
            alt={ad.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Dark Overlay with Opacity */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
          
          {/* Advertisement Badge */}
          <div className="absolute top-4 right-4 z-10">
            <span className={`px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full text-xs font-bold shadow-lg`}>
              ADVERTISEMENT
            </span>
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg"
            >
              {ad.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/90 text-lg mb-6 leading-relaxed drop-shadow-md"
            >
              {ad.description}
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`w-full md:w-auto px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2`}
            >
              Learn More
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default FeaturedAd;
