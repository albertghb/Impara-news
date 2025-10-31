import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '@/lib/api';
import { Ad } from '@/types/api';
import { Upload, X } from 'lucide-react';

export default function AdForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    link_url: '',
    position: 'homepage_top' as 'homepage_top' | 'sidebar' | 'inline',
    active: true,
  });

  useEffect(() => {
    if (isEdit && id) {
      api.getAd(Number(id)).then((ad: Ad) => {
        const imageUrl = ad.image_url || '';
        setFormData({
          title: ad.title,
          description: ad.description || '',
          image_url: imageUrl,
          link_url: ad.link_url || '',
          position: ad.position,
          active: ad.active === 1,
        });
        if (imageUrl) {
          setImagePreview(`http://localhost:4000${imageUrl}`);
        }
      }).catch(console.error);
    }
  }, [id, isEdit]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData({ ...formData, image_url: '' });
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) return formData.image_url;

    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      const formDataUpload = new FormData();
      formDataUpload.append('image', imageFile);

      const response = await fetch('http://localhost:4000/api/upload/single', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataUpload,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Image upload error:', error);
      throw new Error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Upload image first if there's a new file
      let image_url = formData.image_url;
      if (imageFile) {
        image_url = await uploadImage();
      }

      const payload = { ...formData, image_url };

      if (isEdit && id) {
        await api.updateAd(Number(id), payload);
      } else {
        await api.createAd(payload);
      }
      alert(isEdit ? 'Ad updated successfully!' : 'Ad created successfully!');
      navigate('/admin/ads');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Ad' : 'New Ad'}</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Title *</label>
          <input
            required
            className="w-full border rounded px-3 py-2"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Image</label>
          
          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-3 relative inline-block">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-48 h-32 object-cover rounded border"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* File Upload */}
          <div className="flex gap-3 items-center">
            <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
              <Upload className="w-4 h-4" />
              <span>Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <span className="text-sm text-gray-500">or</span>
            <input
              type="text"
              className="flex-1 border rounded px-3 py-2"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="Enter image URL"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Upload from your computer or paste an image URL</p>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Link URL</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={formData.link_url}
            onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Position</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value as 'homepage_top' | 'sidebar' | 'inline' })}
          >
            <option value="homepage_top">Homepage Top</option>
            <option value="sidebar">Sidebar</option>
            <option value="inline">Inline</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="active"
            checked={formData.active}
            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
          />
          <label htmlFor="active" className="text-sm font-semibold">Active</label>
        </div>
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading || uploading}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-semibold"
          >
            {uploading ? 'Uploading...' : loading ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/ads')}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
