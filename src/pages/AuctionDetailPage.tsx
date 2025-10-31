import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft,
  Gavel,
  Clock,
  TrendingUp,
  Eye,
  MapPin,
  User,
  DollarSign,
  Heart,
  Share2,
  AlertCircle,
  CheckCircle,
  Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AuctionDetailPage = () => {
  const { id } = useParams();
  const [bidAmount, setBidAmount] = useState("");
  const [timeLeft, setTimeLeft] = useState("");

  // Sample auction data
  const auctions: Record<string, any> = {
    "1": {
      id: "1",
      title: "Vintage Camera Collection - Canon AE-1",
      fullDescription: `
        <h2>Ibyerekeye ikintu</h2>
        <p>Kamera ya kera ya Canon AE-1 iri mu miterere myiza cyane. Iyi kamera yakoreshejwe cyane mu myaka ya 1980s kandi ikiri gukora neza.</p>
        
        <h2>Ibirimo</h2>
        <ul>
          <li>Canon AE-1 Camera Body</li>
          <li>Canon FD 50mm f/1.8 Lens</li>
          <li>Original Camera Strap</li>
          <li>Lens Cap</li>
          <li>Original Manual (English)</li>
          <li>Camera Bag</li>
        </ul>
        
        <h2>Imiterere</h2>
        <p>Kamera iri mu miterere myiza cyane (9/10). Nta mbeba ziboneka ku mubiri w'ikamera. Lens ikora neza kandi nta mbeba. Shutter ikora neza kandi nta kibazo.</p>
        
        <h2>Amateka</h2>
        <p>Iyi kamera yaguze mu 1985 kandi yakoreshejwe cyane n'umufotozi w'umwuga. Yakoreshejwe gufata amafoto menshi y'ubuzima bwa buri munsi n'ibirori.</p>
        
        <h2>Impamvu yo kuyigurisha</h2>
        <p>Ndimo guhindukira kuri digital photography, niko mpamvu ngurisha iyi kamera. Nifuza ko izabonera umuntu uzayikunda nk'uko nayikunze.</p>
      `,
      currentBid: 250000,
      startingBid: 150000,
      minIncrement: 10000,
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1606980707986-683d8dc3a0f4?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=500&fit=crop"
      ],
      category: "Electronics",
      seller: "TechCollector",
      sellerRating: 4.8,
      sellerSales: 45,
      totalBids: 15,
      watchers: 42,
      location: "Kigali, Rwanda",
      condition: "Excellent",
      shipping: "Free shipping in Kigali",
      returns: "7 days return policy",
      bidHistory: [
        { bidder: "User***23", amount: 250000, time: "5 min ago" },
        { bidder: "Buyer***45", amount: 240000, time: "15 min ago" },
        { bidder: "Photo***12", amount: 230000, time: "1 hour ago" },
        { bidder: "User***67", amount: 220000, time: "2 hours ago" },
        { bidder: "Cam***89", amount: 210000, time: "3 hours ago" }
      ]
    }
  };

  const auction = auctions[id || "1"] || auctions["1"];

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = auction.endTime.getTime();
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
  }, [auction.endTime]);

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/auctions" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Subira ku masoko</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative h-96 bg-gray-100">
                <img
                  src={auction.images[selectedImage]}
                  alt={auction.title}
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all">
                    <Heart className="w-5 h-5 text-red-500" />
                  </button>
                  <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all">
                    <Share2 className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>
              <div className="p-4 flex gap-2 overflow-x-auto">
                {auction.images.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? "border-green-600" : "border-gray-200"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="badge badge-primary mb-2">{auction.category}</span>
                  <h1 className="text-3xl font-bold text-gray-900">{auction.title}</h1>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6 pb-6 border-b">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-bold text-green-600">{auction.totalBids}</div>
                  <div className="text-xs text-gray-600">Bids</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{auction.watchers}</div>
                  <div className="text-xs text-gray-600">Watching</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-bold text-gray-900">Kigali</div>
                  <div className="text-xs text-gray-600">Location</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                    <Package className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-bold text-gray-900">{auction.condition}</div>
                  <div className="text-xs text-gray-600">Condition</div>
                </div>
              </div>

              {/* Description */}
              <div 
                className="prose prose-lg max-w-none mb-6"
                dangerouslySetInnerHTML={{ __html: auction.fullDescription }}
              />

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Shipping</span>
                  </div>
                  <p className="text-sm text-gray-700">{auction.shipping}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-600 mb-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Returns</span>
                  </div>
                  <p className="text-sm text-gray-700">{auction.returns}</p>
                </div>
              </div>
            </motion.div>

            {/* Bid History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold mb-4">Bid History</h2>
              <div className="space-y-3">
                {auction.bidHistory.map((bid: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{bid.bidder}</div>
                        <div className="text-sm text-gray-600">{bid.time}</div>
                      </div>
                    </div>
                    <div className="text-xl font-bold text-green-600">
                      {bid.amount.toLocaleString()} RWF
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-4"
            >
              {/* Countdown */}
              <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-4">
                <div className="flex items-center gap-2 text-white mb-2">
                  <Clock className="w-5 h-5 animate-pulse" />
                  <span className="font-semibold">Time Remaining</span>
                </div>
                <div className="text-3xl font-bold text-white">{timeLeft}</div>
              </div>

              <div className="p-6 space-y-6">
                {/* Current Bid */}
                <div>
                  <div className="text-sm text-gray-600 mb-2">Current Bid</div>
                  <div className="text-4xl font-bold text-green-600 flex items-center gap-2">
                    <DollarSign className="w-8 h-8" />
                    {auction.currentBid.toLocaleString()}
                    <span className="text-lg text-gray-600">RWF</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Starting bid: {auction.startingBid.toLocaleString()} RWF
                  </div>
                </div>

                {/* Bid Form */}
                <div className="border-t pt-6">
                  <div className="text-sm text-gray-600 mb-3">
                    Minimum bid: {(auction.currentBid + auction.minIncrement).toLocaleString()} RWF
                  </div>
                  <div className="space-y-3">
                    <Input
                      type="number"
                      placeholder="Enter your bid"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="text-lg"
                    />
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6">
                      <Gavel className="w-5 h-5 mr-2" />
                      Place Bid
                    </Button>
                  </div>
                  <div className="mt-3 flex items-start gap-2 text-sm text-gray-600">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>By placing a bid, you agree to the auction terms and conditions.</span>
                  </div>
                </div>

                {/* Seller Info */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Seller Information</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{auction.seller}</div>
                      <div className="flex items-center gap-1 text-sm text-yellow-600">
                        <span>★</span>
                        <span>{auction.sellerRating}</span>
                        <span className="text-gray-600">({auction.sellerSales} sales)</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Contact Seller
                  </Button>
                </div>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetailPage;
