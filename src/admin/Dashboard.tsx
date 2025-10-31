import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { Article, Ad } from '@/types/api';
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    api.listArticles()
      .then(response => {
        // Response is always an object with articles array
        if (response && response.articles) {
          setArticles(response.articles);
        } else {
          setArticles([]);
        }
      })
      .catch(err => {
        console.error('Failed to load articles:', err);
        setArticles([]);
      });
    
    api.listAds()
      .then(response => {
        // Handle both array and object responses
        if (Array.isArray(response)) {
          setAds(response);
        } else if (response && response.ads) {
          setAds(response.ads);
        } else {
          setAds([]);
        }
      })
      .catch(err => {
        console.error('Failed to load ads:', err);
        setAds([]);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="text-sm text-gray-600 flex items-center gap-3">
          <span>{user?.email}</span>
          <button onClick={logout} className="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200">Logout</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/admin/articles" className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="text-sm text-gray-500">Articles</div>
          <div className="text-4xl font-bold text-green-600">{articles.length}</div>
          <div className="text-xs text-gray-400 mt-1">Click to manage</div>
        </Link>
        <Link to="/admin/advertisements" className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="text-sm text-gray-500">Job Ads</div>
          <div className="text-4xl font-bold text-purple-600">0</div>
          <div className="text-xs text-gray-400 mt-1">Click to manage</div>
        </Link>
        <Link to="/admin/auctions" className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="text-sm text-gray-500">Auctions</div>
          <div className="text-4xl font-bold text-orange-600">0</div>
          <div className="text-xs text-gray-400 mt-1">Click to manage</div>
        </Link>
        <div className="p-6 bg-white rounded-xl shadow-md">
          <div className="text-sm text-gray-500">Breaking News</div>
          <div className="text-4xl font-bold text-red-600">{articles.filter(a=>a.isBreaking || a.is_breaking).length}</div>
          <div className="text-xs text-gray-400 mt-1">Currently active</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link to="/admin/articles/new" className="block px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-center font-semibold">
              + New Article
            </Link>
            <Link to="/admin/ads/new" className="block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center font-semibold">
              + New Advertisement
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Total articles: {articles.length}</p>
            <p>Active ads: {ads.filter(a => a.isActive || a.active).length}</p>
            <p>Breaking news: {articles.filter(a=>a.isBreaking || a.is_breaking).length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
