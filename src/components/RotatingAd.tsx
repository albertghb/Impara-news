import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";


interface AdItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  bgColor?: string;
}

const RotatingAd = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const ads: AdItem[] = [
    {
      id: "1",
      title: "MTN RWANDA",
      description: "Fresh, organic cassava flour perfect for your family meals. High quality and affordable!",
      image: "/src/assets/mtn.jpg",
      bgColor: "from-orange-500 to-orange-600",
      link: "#"
    },
    {
      id: "2",
      title: "Airtel Rwanda",
      description: "Airtel yahaye abakiriya bayo promosiyo kuri pake zabo!",
      image: "/src/assets/rwair.jpg",
      bgColor: "from-amber-600 to-amber-700",
      link: "#"
    },
    {
      id: "3",
      title: "FORTEBET - Win Big Today!",
      description: "Join thousands of winners across Rwanda. Sign up now and receive a welcome bonus. Bet responsibly!",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=400&fit=crop",
      bgColor: "from-red-600 to-red-700",
      link: "#"
    },
  ];

  // Auto-rotate every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [ads.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + ads.length) % ads.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-full min-h-[320px] overflow-hidden rounded-lg shadow-lg bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="h-full"
        >
          <a
            href={ads[currentIndex].link}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full group"
          >
            <div className="relative h-full min-h-[400px]">
              {/* Background Image */}
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                src={ads[currentIndex].image}
                alt={ads[currentIndex].title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Dark Overlay with Opacity */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/40"></div>
              
              {/* Advertisement Badge */}
              <div className="absolute top-3 right-3 z-10">
                <span className={`px-3 py-1 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full text-xs font-bold shadow-lg`}>
                  ADVERTISEMENT
                </span>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-bold text-white mb-3 line-clamp-2 drop-shadow-lg"
                >
                  {ads[currentIndex].title}
                </motion.h2>
                {/* Marquee description with opacity */}
                <div className="relative mb-4 overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none bg-black/0"></div>
                  <motion.div
                    initial={{ x: '100%', opacity: 0.9 }}
                    animate={{ x: '-100%', opacity: 0.9 }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                    className="inline-block whitespace-nowrap text-sm text-white/90 drop-shadow-md"
                  >
                    {ads[currentIndex].description}
                  </motion.div>
                </div>
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`w-full py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300`}
                >
                See  More →
                </motion.button>
              </div>
            </div>
          </a>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-20"
        aria-label="Previous ad"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-20"
        aria-label="Next ad"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to ad ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RotatingAd;
