import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun, User, Home, TrendingUp, Heart, Activity, Search, Bell, Globe2, Gavel } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import GoogleTranslate from "./GoogleTranslate";

// Custom hook for hover animation
const useHoverAnimation = () => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (isHovered) {
      controls.start({
        scale: 1.05,
        transition: { duration: 0.2 }
      });
    } else {
      controls.start({
        scale: 1,
        transition: { duration: 0.2 }
      });
    }
  }, [isHovered, controls]);

  return {
    hoverProps: {
      onHoverStart: () => setIsHovered(true),
      onHoverEnd: () => setIsHovered(false)
    },
    controls
  };
};

const navItems = [
  { 
    to: "/", 
    label: "Home",
    labelRw: "Ahabanza",
    icon: <Home className="w-4 h-4 mr-2" />
  },
  { 
    to: "/politics", 
    label: "Politics",
    labelRw: "Politiki",
    icon: <Activity className="w-4 h-4 mr-2 text-blue-500" />
  },
  { 
    to: "/economics", 
    label: "Economics",
    labelRw: "Ubukungu",
    icon: <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
  },
  { 
    to: "/sports", 
    label: "Sports",
    labelRw: "Imikino",
    icon: <Activity className="w-4 h-4 mr-2 text-orange-500" />
  },
  { 
    to: "/health", 
    label: "Health",
    labelRw: "Ubuzima",
    icon: <Heart className="w-4 h-4 mr-2 text-red-500" />
  },
  { 
    to: "/entertainment", 
    label: "Entertainment",
    labelRw: "Imyidagaduro",
    icon: <Activity className="w-4 h-4 mr-2 text-purple-500" />
  },
  { 
    to: "/auctions", 
    label: "Auctions",
    labelRw: "Amasoko",
    icon: <Gavel className="w-4 h-4 mr-2 text-yellow-500" />
  },
];

const categories = [
  { to: "/category/technology", label: "Technology" },
  { to: "/category/business", label: "Business" },
  { to: "/category/lifestyle", label: "Lifestyle" },
  { to: "/category/science", label: "Science" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Enhanced scroll handling with Framer Motion
  const { scrollY } = useScroll();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  // Toggle search bar
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  // Check if current page is admin page
  const isAdminPage = location.pathname.startsWith('/admin');

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "relative px-4 py-3 text-sm font-semibold transition-all duration-300 group flex items-center rounded-lg",
      isActive 
        ? "bg-green-700 text-white" 
        : "text-white hover:bg-green-700/50"
    );

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      ref={headerRef}
      className={cn(
        "fixed w-full z-50 transition-all duration-300 bg-gradient-to-r from-green-600 to-green-500 shadow-lg",
        isScrolled 
          ? "shadow-xl" 
          : ""
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Link to="/" className="flex items-center space-x-3 group">
              {/* Logo Icon - Newspaper */}
              <motion.div 
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <svg 
                  className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" 
                  />
                </svg>
              </motion.div>

              {/* Logo Text */}
              <motion.span 
                className="text-xl sm:text-2xl font-bold text-white notranslate"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Impara News
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden lg:flex items-center space-x-1"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {navItems.map((item, index) => (
              <motion.div key={item.to} variants={item}>
                <NavLink to={item.to} className={navLinkClass}>
                  {item.icon}
                  <span className="relative z-10">{item.label}</span>
                </NavLink>
              </motion.div>
            ))}
          </motion.nav>

          {/* Right Side Actions */}
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Search Bar (Desktop) */}
            <AnimatePresence>
              {showSearch && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '240px', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="hidden md:block overflow-hidden"
                >
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search news..."
                      className="w-full pl-10 pr-4 py-2 bg-white rounded-full border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400/30 focus:border-green-400 transition-all duration-300"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
              className="text-white hover:bg-green-700/50"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Google Translate */}
            <div className="hidden md:flex items-center">
              <GoogleTranslate />
            </div>
            
            {/* Hide Sign In button on admin pages */}
            {!isAdminPage && (
              <Link to="/admin/login">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <Button 
                    className="relative w-10 h-10 p-0 rounded-full bg-white text-green-600 border-2 border-white hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
                    size="icon"
                  >
                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    />
                    
                    {/* User icon with animation */}
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <User className="h-5 w-5 relative z-10" />
                    </motion.div>
                    
                    {/* Pulse ring effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-green-400"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </Button>
                  
                  {/* Tooltip on hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    whileHover={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50"
                  >
                    Sign In
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                  </motion.div>
                </motion.div>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <motion.div 
              className="lg:hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "transition-colors duration-300",
                  isMenuOpen 
                    ? "text-white bg-green-700" 
                    : "text-white hover:bg-green-700/50"
                )}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              height: 'auto',
              y: 0,
              transition: { 
                type: "spring",
                damping: 25,
                stiffness: 300
              }
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              y: -20,
              transition: { 
                duration: 0.2,
                ease: "easeInOut"
              }
            }}
            className="lg:hidden overflow-hidden bg-white shadow-lg rounded-b-2xl mx-2"
          >
            <div className="px-5 py-4">
              {/* Search Bar */}
              <motion.div 
                className="relative mb-5"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search news..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white rounded-full border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400/30 focus:border-green-400 transition-all duration-300"
                  />
                </div>
              </motion.div>
              
              {/* Navigation Links */}
              <motion.nav 
                className="space-y-2 mb-5"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.2
                    }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                {navItems.map((item) => (
                  <motion.div
                    key={item.to}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      show: { 
                        opacity: 1, 
                        x: 0,
                        transition: { type: "spring", stiffness: 300, damping: 20 }
                      }
                    }}
                  >
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300",
                          isActive 
                            ? "bg-green-50 text-green-600" 
                            : "text-gray-600 hover:bg-green-50/50 hover:text-green-600"
                        )
                      }
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </motion.nav>
              
              {/* Categories Section */}
              <motion.div 
                className="pt-4 border-t border-gray-100 dark:border-gray-800"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="px-2 text-xs font-semibold text-green-600 uppercase tracking-wider mb-3">
                  Browse Categories
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <motion.div
                      key={category.to}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="overflow-hidden"
                    >
                      <Link
                        to={category.to}
                        className="block text-sm px-4 py-2.5 rounded-lg bg-gray-50 hover:bg-green-50 text-gray-700 hover:text-green-600 transition-all duration-300 flex items-center font-medium"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-3"></div>
                        {category.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Language Selector */}
              <motion.div 
                className="mt-6 px-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <p className="px-2 text-xs font-semibold text-green-600 uppercase tracking-wider mb-3">
                  Language / Ururimi
                </p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <GoogleTranslate />
                </div>
              </motion.div>

              {/* Auth Buttons - Hide on admin pages */}
              {!isAdminPage && (
                <motion.div 
                  className="mt-6 space-y-3 px-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link to="/admin/login" className="w-full block">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white border-0 shadow-md hover:shadow-lg font-semibold transition-all duration-300 relative overflow-hidden group"
                        size="sm"
                      >
                        {/* Animated shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                        <User className="h-4 w-4 mr-2 relative z-10" />
                        <span className="relative z-10">Sign In</span>
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              )}
              
              {/* Social Links */}
              <motion.div 
                className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-center space-x-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {[
                  { icon: <Search className="h-5 w-5" />, color: "#1DA1F2" },
                  { icon: <Bell className="h-5 w-5" />, color: "#E1306C" },
                  { icon: <User className="h-5 w-5" />, color: "#0077B5" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    style={{ backgroundColor: social.color }}
                    whileHover={{ scale: 1.1, boxShadow: `0 5px 15px ${social.color}40` }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Social link ${index + 1}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Header;