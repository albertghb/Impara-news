import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, X } from 'lucide-react';

export default function AdvertisementForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    fullDescription: '',
    company: '',
    category: 'Job',
    imageUrl: '',
    location: '',
    deadline: '',
    contactPhone: '',
    contactEmail: '',
    contactWebsite: '',
    contactAddress: '',
    requirements: '',
    benefits: '',
    isFeatured: false,
  });

  useEffect(() => {
    if (isEdit && id) {
      fetch(`http://localhost:4000/api/advertisements/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            const ad = data.data;
            const imageUrl = ad.imageUrl || '';
            setFormData({
              title: ad.title || '',
              fullDescription: ad.fullDescription || '',
              company: ad.company || '',
              category: ad.category || 'Job',
              imageUrl,
              location: ad.location || '',
              deadline: ad.deadline ? ad.deadline.split('T')[0] : '',
              contactPhone: ad.contactPhone || '',
              contactEmail: ad.contactEmail || '',
              contactWebsite: ad.contactWebsite || '',
              contactAddress: ad.contactAddress || '',
              requirements: ad.requirements || '',
              benefits: ad.benefits || '',
              isFeatured: ad.isFeatured || false,
            });
            if (imageUrl) {
              setImagePreview(`http://localhost:4000${imageUrl}`);
            }
          }
        })
        .catch(console.error);
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
    setFormData({ ...formData, imageUrl: '' });
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) return formData.imageUrl;

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
      const token = localStorage.getItem('token');
      
      // Upload image first if there's a new file
      let imageUrl = formData.imageUrl;
      if (imageFile) {
        imageUrl = await uploadImage();
      }
      
      const payload = {
        ...formData,
        imageUrl,
        deadline: formData.deadline ? new Date(formData.deadline).toISOString() : null,
      };

      const url = isEdit 
        ? `http://localhost:4000/api/advertisements/${id}`
        : 'http://localhost:4000/api/advertisements';
      
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
        throw new Error(error.error || 'Failed to save advertisement');
      }

      alert(isEdit ? 'Advertisement updated!' : 'Advertisement created!');
      navigate('/admin/advertisements');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? 'Edit Advertisement' : 'New Advertisement'}
      </h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Title *</label>
            <input
              required
              className="w-full border rounded px-3 py-2"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Software Developer Position"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Company *</label>
            <input
              required
              className="w-full border rounded px-3 py-2"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Company name"
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
              <option value="Job">Job</option>
              <option value="Internship">Internship</option>
              <option value="Tender">Tender</option>
              <option value="Training">Training</option>
              <option value="Scholarship">Scholarship</option>
              <option value="Opportunity">Opportunity</option>
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

          <div>
            <label className="block text-sm font-semibold mb-1">Deadline</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            />
          </div>

          <div className="md:col-span-2">
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
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="Enter image URL"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Upload from your computer or paste an image URL</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Full Description *</label>
            <textarea
              required
              className="w-full border rounded px-3 py-2"
              rows={6}
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              placeholder="Detailed description of the opportunity..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Requirements</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows={4}
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="List requirements (one per line)"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Benefits</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows={4}
              value={formData.benefits}
              onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
              placeholder="List benefits (one per line)"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Contact Phone</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={formData.contactPhone}
              onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              placeholder="+250 XXX XXX XXX"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Contact Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              placeholder="contact@company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Website</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={formData.contactWebsite}
              onChange={(e) => setFormData({ ...formData, contactWebsite: e.target.value })}
              placeholder="https://company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Address</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={formData.contactAddress}
              onChange={(e) => setFormData({ ...formData, contactAddress: e.target.value })}
              placeholder="Physical address"
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
            {uploading ? 'Uploading...' : loading ? 'Saving...' : 'Save Advertisement'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/advertisements')}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
