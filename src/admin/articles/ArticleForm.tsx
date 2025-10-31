import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '@/lib/api';
import { Article } from '@/types/api';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Upload, X } from 'lucide-react';

export default function ArticleForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<Array<{ id: number; name: string; nameRw: string }>>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    categoryId: '',
    isBreaking: false,
    status: 'published',
  });

  useEffect(() => {
    // Load categories
    fetch('http://localhost:4000/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data.categories || []))
      .catch(console.error);

    if (isEdit && id) {
      api.getArticle(Number(id)).then((article: Article) => {
        const imageUrl = article.imageUrl || article.image_url || '';
        setFormData({
          title: article.title,
          excerpt: article.excerpt || '',
          content: article.content || '',
          imageUrl,
          categoryId: String(article.category) || '',
          isBreaking: article.isBreaking || article.is_breaking === 1,
          status: 'published',
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
    
    // Validate required fields
    if (!formData.title || !formData.content || !formData.categoryId) {
      alert('Please fill in all required fields: Title, Content, and Category');
      return;
    }
    
    setLoading(true);
    try {
      console.log('Starting article submission...');
      
      // Upload image first if there's a new file
      let imageUrl = formData.imageUrl;
      if (imageFile) {
        console.log('Uploading image...');
        imageUrl = await uploadImage();
        console.log('Image uploaded:', imageUrl);
      }

      const payload = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        imageUrl,
        categoryId: parseInt(formData.categoryId),
        authorId: user?.id || 1,
        isBreaking: formData.isBreaking,
        isFeatured: false,
        status: formData.status,
      };
      
      console.log('Submitting article payload:', payload);
      
      if (isEdit && id) {
        console.log('Updating article...');
        await api.updateArticle(Number(id), payload);
        alert('Article updated successfully!');
      } else {
        console.log('Creating new article...');
        const result = await api.createArticle(payload);
        console.log('Article created:', result);
        alert('Article created successfully!');
      }
      navigate('/admin/articles');
    } catch (err: unknown) {
      console.error('Save error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to save article. Please check your connection and try again.';
      alert('Error: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin/articles')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          type="button"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{isEdit ? 'Edit Article' : 'New Article'}</h1>
      </div>
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
          <label className="block text-sm font-semibold mb-1">Excerpt</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows={2}
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Content</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows={8}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="Enter image URL"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Upload from your computer or paste an image URL</p>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Category *</label>
          <select
            required
            className="w-full border rounded px-3 py-2"
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name} ({cat.nameRw})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Status</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isBreaking"
            checked={formData.isBreaking}
            onChange={(e) => setFormData({ ...formData, isBreaking: e.target.checked })}
          />
          <label htmlFor="isBreaking" className="text-sm font-semibold">Mark as Breaking News</label>
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
            onClick={() => navigate('/admin/articles')}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
