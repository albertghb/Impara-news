import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Clock, 
  Newspaper, User, Info, Shield, ArrowUpRight, MessageSquare, Rss, Bookmark, ExternalLink
} from "lucide-react";
import { Input } from "./ui/input";

// Types
type SocialLink = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  url: string;
  color: string;
};

type QuickLink = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  to: string;
  desc: string;
};

type ContactInfo = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  link: string;
  desc?: string;
};

// Data
const socialLinks: SocialLink[] = [
  { 
    icon: Instagram, 
    label: "Instagram", 
    url: "#",
    color: "#E1306C"
  },
  { 
    icon: Twitter, 
    label: "Twitter", 
    url: "#",
    color: "#1DA1F2"
  },
  { 
    icon: Linkedin, 
    label: "LinkedIn", 
    url: "#",
    color: "#0077B5"
  },
  { 
    icon: MessageSquare, 
    label: "Messenger", 
    url: "#",
    color: "#0084FF"
  },
  { 
    icon: Rss, 
    label: "RSS", 
    url: "#",
    color: "#FFA500"
  },
];

const quickLinks: QuickLink[] = [
  { 
    icon: Newspaper, 
    label: "Latest News", 
    to: "/latest",
    desc: "Stay updated with our latest articles"
  },
  { 
    icon: User, 
    label: "About Us", 
    to: "/about",
    desc: "Learn about our mission and team"
  },
  { 
    icon: Info, 
    label: "Contact", 
    to: "/contact",
    desc: "Get in touch with our team"
  },
  { 
    icon: Bookmark, 
    label: "Bookmarks", 
    to: "/bookmarks",
    desc: "Your saved articles"
  },
];

const contactInfo: ContactInfo[] = [
  { 
    icon: Mail, 
    label: "Email", 
    value: "info@imparanews.com",
    link: "mailto:info@imparanews.com"
  },
  { 
    icon: Phone, 
    label: "Phone", 
    value: "+250 723 333 820",
    link: "tel:+250723333820"
  },
  { 
    icon: MapPin, 
    label: "Address", 
    value: "Kigali, Rwanda",
    link: "https://maps.google.com/?q=Kigali,Rwanda"
  },
  { 
    icon: Clock, 
    label: "Working Hours", 
    value: "Mon-Fri: 9:00 - 18:00",
    desc: "We're available 24/7 for breaking news"
  },
];

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHovered, setIsHovered] = useState<number | null>(null);

  // Show scroll-to-top button when user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Subscribed with:', email);
      setIsSubscribed(true);
      setEmail("");
      
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 border-t border-gray-700 mt-24">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-green-600/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main Footer Content */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Brand & Description */}
          <motion.div 
            className="space-y-6"
          >
            <Link to="/" className="inline-block group">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-green-200/50 transition-all duration-300">
                  <span className="text-green-600 font-bold text-xl">IN</span>
                </div>
                <span className="text-2xl font-bold text-white notranslate">
                  Impara News
                </span>
              </div>
            </Link>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted source for the latest news, breaking stories, and in-depth analysis from around the world.
            </p>
            
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all duration-300 shadow-md hover:shadow-lg"
                  style={{
                    backgroundColor: social.color,
                    boxShadow: `0 4px 14px 0 ${social.color}40`,
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="relative"
          >
            <div className="sticky top-24">
              <h3 className="text-lg font-bold mb-6 pb-2 relative inline-block text-white">
                Quick Links
                <motion.span 
                  className="absolute bottom-0 left-0 w-10 h-1 bg-gradient-to-r from-green-500 to-green-300 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </h3>
              <nav className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                  >
                    <Link 
                      to={link.to}
                      className="group flex items-start p-3 -mx-3 rounded-lg hover:bg-green-900/30 transition-colors duration-300"
                      onMouseEnter={() => setIsHovered(index)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-lg bg-green-900/30 flex items-center justify-center text-green-400 group-hover:bg-green-800/50 transition-colors">
                          <link.icon className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <span className="text-sm font-semibold text-gray-200 group-hover:text-green-400 transition-colors">
                          {link.label}
                        </span>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {link.desc}
                        </p>
                      </div>
                      <ArrowUpRight className="ml-auto w-4 h-4 text-gray-500 group-hover:text-green-400 mt-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="relative"
          >
            <div className="sticky top-24">
              <h3 className="text-lg font-bold mb-6 pb-2 relative inline-block text-white">
                Contact Us
                <motion.span 
                  className="absolute bottom-0 left-0 w-10 h-1 bg-gradient-to-r from-green-500 to-green-300 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group p-3 -mx-3 rounded-lg hover:bg-green-900/30 transition-colors duration-300"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-9 h-9 rounded-lg bg-green-900/30 flex items-center justify-center text-green-400 group-hover:bg-green-800/50 transition-colors">
                          <item.icon className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-semibold text-gray-200 group-hover:text-green-400 transition-colors">
                          {item.label}
                        </p>
                        <p className="text-sm text-gray-300">
                          {item.value}
                        </p>
                        {item.desc && (
                          <p className="text-xs text-gray-400 mt-1">
                            {item.desc}
                          </p>
                        )}
                      </div>
                      <ExternalLink className="ml-auto w-4 h-4 text-gray-500 group-hover:text-green-400 mt-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            className="space-y-6 bg-gray-800/50 p-6 rounded-xl shadow-sm border border-gray-700/50 backdrop-blur-sm"
          >
            <div>
              <h3 className="text-lg font-bold mb-2 text-white">
                Stay Updated
              </h3>
              <p className="text-sm text-gray-300">
                Subscribe to our newsletter for the latest news and updates.
              </p>
            </div>
            
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="w-full pl-4 pr-12 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-700/50 text-white placeholder:text-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-green-500 hover:text-green-400 transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
              
              <AnimatePresence>
                {isSubscribed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 p-2 text-sm text-center text-green-400 bg-green-900/30 rounded-lg"
                  >
                    Thanks for subscribing!
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
            
            <div className="flex items-start text-xs text-gray-400">
              <Shield className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-green-400" />
              <span>We respect your privacy. Unsubscribe at any time.</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright & Bottom Bar */}
        <motion.div 
          className="border-t border-gray-700 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-sm text-gray-400 text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} <span className="notranslate">Impara News</span>. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            <Link 
              to="/privacy" 
              className="text-xs text-gray-400 hover:text-green-400 transition-colors font-medium"
            >
              Privacy Policy
            </Link>
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
            <Link 
              to="/terms" 
              className="text-xs text-gray-400 hover:text-green-400 transition-colors font-medium"
            >
              Terms of Service
            </Link>
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
            <Link 
              to="/cookies" 
              className="text-xs text-gray-400 hover:text-green-400 transition-colors font-medium"
            >
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-green-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 z-40"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ 
              scale: 1.1, 
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.4), 0 10px 10px -5px rgba(34, 197, 94, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
          >
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
            >
              <ArrowUpRight className="w-5 h-5 -rotate-90" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;