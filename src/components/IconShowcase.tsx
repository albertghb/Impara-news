// Icon Showcase - All Available Icons for Impara News
import { 
  // Navigation & UI
  Home, Menu, X, Search, Bell, User, Settings, LogOut, ChevronRight, ChevronLeft,
  ChevronDown, ChevronUp, ArrowLeft, ArrowRight, ArrowUp, ArrowDown,
  
  // News & Content
  Newspaper, FileText, BookOpen, Bookmark, BookmarkPlus, Share2, MessageCircle,
  ThumbsUp, ThumbsDown, Eye, EyeOff, Clock, Calendar, Tag, Hash,
  
  // Categories
  Briefcase, TrendingUp, TrendingDown, Activity, Heart, Smile, Film, Music,
  Tv, Radio, Mic, Video, Camera, Image, Globe2, MapPin,
  
  // Social Media
  Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, Send,
  
  // Actions
  Edit, Trash2, Save, Download, Upload, Plus, Minus, Check, AlertCircle,
  AlertTriangle, Info, HelpCircle, Star, Award, Trophy, Target,
  
  // Business & Finance
  DollarSign, CreditCard, ShoppingCart, ShoppingBag, Wallet, PieChart,
  BarChart, LineChart, TrendingUp as Finance, Gavel, Scale,
  
  // Weather & Nature
  Sun, Moon, Cloud, CloudRain, Zap, Wind, Droplets, Flame, Leaf, TreePine,
  
  // Technology
  Smartphone, Tablet, Monitor, Laptop, Wifi, Battery, Bluetooth, Cpu,
  HardDrive, Server, Database, Code, Terminal, Zap as Tech,
  
  // Health & Medical
  Heart as Health, Activity as Medical, Pill, Stethoscope, Syringe, Thermometer,
  
  // Sports & Entertainment
  Trophy as Sports, Award as Medal, Target as Goal, Dumbbell, Bike,
  
  // Time & Date
  Clock as Time, Calendar as Date, Timer, Hourglass, Watch, Sunrise, Sunset,
  
  // Communication
  MessageSquare, MessageCircle as Chat, Mail as Email, Phone as Call, Video as VideoCall,
  Mic as Microphone, Volume2, VolumeX, Headphones,
  
  // Files & Folders
  File, FileText as Document, Folder, FolderOpen, Archive, Paperclip, Link,
  
  // Status & Indicators
  CheckCircle, XCircle, AlertCircle as Warning, Info as Information, Loader,
  RefreshCw, RotateCw, Repeat, Shuffle, Play, Pause, StopCircle,
  
  // User & Profile
  User as Profile, Users, UserPlus, UserMinus, UserCheck, UserX,
  
  // Security
  Lock, Unlock, Key, Shield, ShieldCheck, ShieldAlert, Eye as View,
  
  // Layout & Design
  Layout, Grid, List, Columns, Sidebar, Maximize, Minimize, ZoomIn, ZoomOut,
  
  // Special
  Sparkles, Zap as Lightning, Flame as Fire, Star as Favorite, Gift, Crown,
  Rocket, Flag, Pin, Paperclip as Attach
} from "lucide-react";

export const iconCategories = {
  navigation: {
    title: "Navigation & UI",
    icons: [
      { name: "Home", icon: Home },
      { name: "Menu", icon: Menu },
      { name: "X", icon: X },
      { name: "Search", icon: Search },
      { name: "Bell", icon: Bell },
      { name: "User", icon: User },
      { name: "Settings", icon: Settings },
      { name: "LogOut", icon: LogOut },
      { name: "ChevronRight", icon: ChevronRight },
      { name: "ChevronLeft", icon: ChevronLeft },
      { name: "ArrowLeft", icon: ArrowLeft },
      { name: "ArrowRight", icon: ArrowRight }
    ]
  },
  news: {
    title: "News & Content",
    icons: [
      { name: "Newspaper", icon: Newspaper },
      { name: "FileText", icon: FileText },
      { name: "BookOpen", icon: BookOpen },
      { name: "Bookmark", icon: Bookmark },
      { name: "Share2", icon: Share2 },
      { name: "MessageCircle", icon: MessageCircle },
      { name: "ThumbsUp", icon: ThumbsUp },
      { name: "Eye", icon: Eye },
      { name: "Clock", icon: Clock },
      { name: "Calendar", icon: Calendar },
      { name: "Tag", icon: Tag },
      { name: "Hash", icon: Hash }
    ]
  },
  categories: {
    title: "Categories",
    icons: [
      { name: "Briefcase (Business)", icon: Briefcase },
      { name: "TrendingUp (Economics)", icon: TrendingUp },
      { name: "Activity (Politics)", icon: Activity },
      { name: "Heart (Health)", icon: Heart },
      { name: "Smile (Entertainment)", icon: Smile },
      { name: "Trophy (Sports)", icon: Trophy },
      { name: "Globe2 (World)", icon: Globe2 },
      { name: "Gavel (Auctions)", icon: Gavel }
    ]
  },
  social: {
    title: "Social Media",
    icons: [
      { name: "Facebook", icon: Facebook },
      { name: "Twitter", icon: Twitter },
      { name: "Instagram", icon: Instagram },
      { name: "Linkedin", icon: Linkedin },
      { name: "Youtube", icon: Youtube },
      { name: "Mail", icon: Mail },
      { name: "Phone", icon: Phone },
      { name: "Send", icon: Send }
    ]
  },
  actions: {
    title: "Actions",
    icons: [
      { name: "Edit", icon: Edit },
      { name: "Trash2", icon: Trash2 },
      { name: "Save", icon: Save },
      { name: "Download", icon: Download },
      { name: "Upload", icon: Upload },
      { name: "Plus", icon: Plus },
      { name: "Check", icon: Check },
      { name: "Star", icon: Star }
    ]
  },
  status: {
    title: "Status & Indicators",
    icons: [
      { name: "CheckCircle", icon: CheckCircle },
      { name: "XCircle", icon: XCircle },
      { name: "AlertCircle", icon: AlertCircle },
      { name: "Info", icon: Info },
      { name: "Loader", icon: Loader },
      { name: "RefreshCw", icon: RefreshCw }
    ]
  }
};

export default iconCategories;
