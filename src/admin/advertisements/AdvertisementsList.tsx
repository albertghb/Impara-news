import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface Advertisement {
  id: number;
  title: string;
  company: string;
  category: string;
  location: string;
  deadline?: string;
  views: number;
  applicants: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export default function AdvertisementsList() {
  const navigate = useNavigate();
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAdvertisements = () => {
    setLoading(true);
    fetch('http://localhost:4000/api/advertisements')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setAdvertisements(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAdvertisements();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this advertisement?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/api/advertisements/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Advertisement deleted!');
        loadAdvertisements();
      } else {
        throw new Error('Delete failed');
      }
    } catch (err) {
      alert('Failed to delete advertisement');
    }
  };

  const toggleActive = async (id: number, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/api/advertisements/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        loadAdvertisements();
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold flex-1">Advertisements</h1>
        <Link
          to="/admin/advertisements/new"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
        >
          + New Advertisement
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Company</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Location</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Views</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {advertisements.map((ad) => (
              <tr key={ad.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium">{ad.title}</div>
                  {ad.isFeatured && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm">{ad.company}</td>
                <td className="px-4 py-3 text-sm">{ad.category}</td>
                <td className="px-4 py-3 text-sm">{ad.location}</td>
                <td className="px-4 py-3 text-sm">{ad.views}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleActive(ad.id, ad.isActive)}
                    className={`text-xs px-2 py-1 rounded ${
                      ad.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {ad.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/advertisements/edit/${ad.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(ad.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {advertisements.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No advertisements yet. Create your first one!
          </div>
        )}
      </div>
    </div>
  );
}
