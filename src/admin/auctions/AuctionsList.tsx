import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface Auction {
  id: number;
  title: string;
  currentBid: number;
  startingBid: number;
  endTime: string;
  status: string;
  category: string;
  totalBids: number;
  watchers: number;
  isFeatured: boolean;
  createdAt: string;
}

export default function AuctionsList() {
  const navigate = useNavigate();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAuctions = () => {
    setLoading(true);
    fetch('http://localhost:4000/api/auctions?status=active')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setAuctions(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAuctions();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this auction?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/api/auctions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Auction deleted!');
        loadAuctions();
      } else {
        throw new Error('Delete failed');
      }
    } catch (err) {
      alert('Failed to delete auction');
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/api/auctions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        loadAuctions();
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
        <h1 className="text-2xl font-bold flex-1">Auctions</h1>
        <Link
          to="/admin/auctions/new"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
        >
          + New Auction
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Current Bid</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Bids</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">End Time</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {auctions.map((auction) => (
              <tr key={auction.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium">{auction.title}</div>
                  {auction.isFeatured && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm">{auction.category}</td>
                <td className="px-4 py-3 text-sm font-semibold">
                  {formatCurrency(auction.currentBid || auction.startingBid)}
                </td>
                <td className="px-4 py-3 text-sm">{auction.totalBids}</td>
                <td className="px-4 py-3 text-sm">{formatDate(auction.endTime)}</td>
                <td className="px-4 py-3">
                  <select
                    value={auction.status}
                    onChange={(e) => updateStatus(auction.id, e.target.value)}
                    className={`text-xs px-2 py-1 rounded border ${
                      auction.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : auction.status === 'ended'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    <option value="active">Active</option>
                    <option value="ended">Ended</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/auctions/edit/${auction.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(auction.id)}
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

        {auctions.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No auctions yet. Create your first one!
          </div>
        )}
      </div>
    </div>
  );
}
