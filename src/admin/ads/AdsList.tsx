import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { Ad } from '@/types/api';
import { Pencil, Trash2, Plus, AlertCircle } from 'lucide-react';

export default function AdsList() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAds = async () => {
    try {
      setLoading(true);
      const data = await api.listAds();
      setAds(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load ads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAds();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this ad?')) return;
    try {
      await api.deleteAd(id);
      setAds(ads.filter(a => a.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  if (loading) return <div className="p-6">Loading ads...</div>;
  if (error) return <div className="p-6 text-red-600 flex items-center gap-2"><AlertCircle className="w-5 h-5" />{error}</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Advertisements</h1>
        <Link to="/admin/ads/new" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Ad
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Position</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Active</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {ads.map((ad) => (
              <tr key={ad.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{ad.title}</td>
                <td className="px-4 py-3 text-sm">{ad.position}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    ad.active === 1 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {ad.active === 1 ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/admin/ads/edit/${ad.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(ad.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {ads.length === 0 && (
          <div className="p-8 text-center text-gray-500">No ads yet. Create one!</div>
        )}
      </div>
    </div>
  );
}
