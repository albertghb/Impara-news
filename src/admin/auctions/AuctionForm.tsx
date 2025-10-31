import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AuctionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    fullDescription: '',
    startingBid: '',
    minIncrement: '',
    endTime: '',
    images: '',
    category: 'Electronics',
    condition: 'New',
    location: '',
    shipping: '',
    returns: '',
    isFeatured: false,
  });

  useEffect(() => {
    if (isEdit && id) {
      fetch(`http://localhost:4000/api/auctions/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            const auction = data.data;
            setFormData({
              title: auction.title || '',
              fullDescription: auction.fullDescription || '',
              startingBid: String(auction.startingBid || ''),
              minIncrement: String(auction.minIncrement || ''),
              endTime: auction.endTime ? auction.endTime.split('T')[0] + 'T' + auction.endTime.split('T')[1].substring(0, 5) : '',
              images: auction.images || '',
              category: auction.category || 'Electronics',
              condition: auction.condition || 'New',
              location: auction.location || '',
              shipping: auction.shipping || '',
              returns: auction.returns || '',
              isFeatured: auction.isFeatured || false,
            });
            // Set image previews from existing images
            if (auction.images) {
              const imageUrls = auction.images.split(',').map((url: string) => 
                url.trim().startsWith('/') ? `http://localhost:4000${url.trim()}` : url.trim()
              );
              setImagePreviews(imageUrls);
            }
          }
        })
        .catch(console.error);
    }
  }, [id, isEdit]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImageFiles(prev => [...prev, ...files]);
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (): Promise<string> => {
    if (imageFiles.length === 0) return formData.images;

    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      const formDataUpload = new FormData();
      
      imageFiles.forEach(file => {
        formDataUpload.append('images', file);
      });

      const response = await fetch('http://localhost:4000/api/upload/multiple', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataUpload,
      });

      if (!response.ok) {
        throw new Error('Failed to upload images');
      }

      const data = await response.json();
      const uploadedUrls = data.files.map((f: { url: string }) => f.url).join(', ');
      
      // Combine with existing images if editing
      if (formData.images) {
        return `${formData.images}, ${uploadedUrls}`;
      }
      return uploadedUrls;
    } catch (error) {
      console.error('Image upload error:', error);
      throw new Error('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('You must be logged in to create/edit auctions');
      }

      // Upload images first if there are new files
      let images = formData.images;
      if (imageFiles.length > 0) {
        images = await uploadImages();
      }
      
      const payload = {
        title: formData.title,
        fullDescription: formData.fullDescription,
        startingBid: parseInt(formData.startingBid),
        minIncrement: parseInt(formData.minIncrement),
        endTime: new Date(formData.endTime).toISOString(),
        images,
        category: formData.category,
        condition: formData.condition,
        location: formData.location,
        shipping: formData.shipping,
        returns: formData.returns,
        sellerId: user?.id || 1,
        isFeatured: formData.isFeatured,
      };

      console.log('Submitting auction:', payload);

      const url = isEdit 
        ? `http://localhost:4000/api/auctions/${id}`
        : 'http://localhost:4000/api/auctions';
      
      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Server error response:', error);
        throw new Error(error.message || error.error || 'Failed to save auction');
      }

      alert(isEdit ? 'Auction updated successfully!' : 'Auction created successfully!');
      navigate('/admin/auctions');
    } catch (err: unknown) {
      console.error('Auction save error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to save auction. Please check your connection and try again.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin/auctions')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">
          {isEdit ? 'Edit Auction' : 'New Auction'}
        </h1>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Title *</label>
            <input
              required
              className="w-full border rounded px-3 py-2"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., iPhone 15 Pro Max"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Starting Bid (RWF) *</label>
            <input
              required
              type="number"
              min="0"
              className="w-full border rounded px-3 py-2"
              value={formData.startingBid}
              onChange={(e) => setFormData({ ...formData, startingBid: e.target.value })}
              placeholder="100000"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Min Increment (RWF) *</label>
            <input
              required
              type="number"
              min="0"
              className="w-full border rounded px-3 py-2"
              value={formData.minIncrement}
              onChange={(e) => setFormData({ ...formData, minIncrement: e.target.value })}
              placeholder="5000"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">End Time *</label>
            <input
              required
              type="datetime-local"
              className="w-full border rounded px-3 py-2"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Category *</label>
            <select
              required
              className="w-full border rounded px-3 py-2"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Electronics">Electronics</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Fashion">Fashion</option>
              <option value="Home & Garden">Home & Garden</option>
              <option value="Sports">Sports</option>
              <option value="Art">Art</option>
              <option value="Collectibles">Collectibles</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Condition *</label>
            <select
              required
              className="w-full border rounded px-3 py-2"
              value={formData.condition}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
            >
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Used">Used</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Location *</label>
            <input
              required
              className="w-full border rounded px-3 py-2"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., Kigali, Rwanda"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Images</label>
            
            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative inline-block">
                    <img 
                      src={preview} 
                      alt={`Preview ${index + 1}`} 
                      className="w-32 h-32 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* File Upload */}
            <div className="flex gap-3 items-start flex-col">
              <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
                <Upload className="w-4 h-4" />
                <span>Upload Images</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <div className="w-full">
                <p className="text-sm text-gray-600 mb-1">or enter image URLs (comma-separated):</p>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Upload multiple images from your computer or paste URLs</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Full Description *</label>
            <textarea
              required
              className="w-full border rounded px-3 py-2"
              rows={6}
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              placeholder="Detailed description of the item..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Shipping Information</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows={3}
              value={formData.shipping}
              onChange={(e) => setFormData({ ...formData, shipping: e.target.value })}
              placeholder="Shipping details, costs, delivery time..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Return Policy</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows={3}
              value={formData.returns}
              onChange={(e) => setFormData({ ...formData, returns: e.target.value })}
              placeholder="Return policy details..."
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            />
            <label htmlFor="isFeatured" className="text-sm font-semibold">
              Mark as Featured
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading || uploading}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-semibold"
          >
            {uploading ? 'Uploading...' : loading ? 'Saving...' : 'Save Auction'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/auctions')}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
