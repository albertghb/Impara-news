import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, TrendingUp } from 'lucide-react';

interface Auction {
  id: number;
  title: string;
  fullDescription?: string;
  location?: string;
  current_bid?: number;
  starting_bid?: number;
  status?: string;
  images?: string;
  endTime?: string;
  category?: string;
}

interface RotatingAuctionBoxProps {
  auctions: Auction[];
}

export default function RotatingAuctionBox({ auctions }: RotatingAuctionBoxProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (auctions.length === 0) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % auctions.length);
        setIsTransitioning(false);
      }, 300);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [auctions.length]);

  if (auctions.length === 0) return null;

  const currentAuction = auctions[currentIndex];
  
  // Get the first image URL
  const getImageUrl = (images?: string) => {
    if (!images || images.trim() === '') {
      // Return a proper fallback image from Unsplash
      return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop';
    }
    const imageList = images.split(',').map(img => img.trim());
    const firstImage = imageList[0];
    
    // If it's a relative path, prepend the API URL
    if (firstImage.startsWith('/uploads/')) {
      return `http://localhost:4000${firstImage}`;
    }
    // If it's already a full URL, return as is
    if (firstImage.startsWith('http://') || firstImage.startsWith('https://')) {
      return firstImage;
    }
    // If it's some other relative path, prepend the API URL
    return `http://localhost:4000${firstImage.startsWith('/') ? firstImage : '/' + firstImage}`;
  };

  const imageUrl = getImageUrl(currentAuction.images);

  return (
    <Link to={`/auction/${currentAuction.id}`}>
      <div 
        className={`relative h-96 rounded-b-xl shadow-lg overflow-hidden group transition-opacity duration-300 ${
          isTransitioning ? 'opacity-70' : 'opacity-100'
        }`}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={imageUrl}
            alt={currentAuction.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop';
            }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-6 text-white">
          {/* Category Badge */}
          {currentAuction.category && (
            <div className="absolute top-4 right-4">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                {currentAuction.category}
              </span>
            </div>
          )}

          {/* Auction Details */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold line-clamp-2 group-hover:text-yellow-400 transition-colors">
              {currentAuction.title || 'Untitled Auction'}
            </h3>

            {currentAuction.fullDescription && (
              <p className="text-sm text-gray-200 line-clamp-2">
                {currentAuction.fullDescription}
              </p>
            )}

            {currentAuction.location && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{currentAuction.location}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-white/20">
              <div>
                <p className="text-xs text-gray-300">Current Bid</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {currentAuction.current_bid 
                    ? `${Number(currentAuction.current_bid).toLocaleString()} RWF` 
                    : currentAuction.starting_bid 
                      ? `${Number(currentAuction.starting_bid).toLocaleString()} RWF`
                      : 'N/A'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-300">Status</p>
                <p className="text-sm font-semibold capitalize">{currentAuction.status || 'Active'}</p>
              </div>
            </div>

            {/* Time Remaining */}
            {currentAuction.endTime && (
              <div className="flex items-center gap-2 text-sm bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span>Ends: {new Date(currentAuction.endTime).toLocaleDateString()}</span>
              </div>
            )}

            {/* View Details Button */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm font-semibold text-yellow-400 group-hover:text-yellow-300 flex items-center gap-2">
                View Details
                <TrendingUp className="w-4 h-4" />
              </span>
              
              {/* Pagination Dots */}
              <div className="flex gap-1">
                {auctions.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'w-6 bg-yellow-400' 
                        : 'w-1.5 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 border-4 border-transparent group-hover:border-yellow-400 transition-colors duration-300 rounded-b-xl pointer-events-none"></div>
      </div>
    </Link>
  );
}
