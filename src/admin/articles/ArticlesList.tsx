import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { Article } from '@/types/api';
import { Pencil, Trash2, Plus, AlertCircle, ArrowLeft } from 'lucide-react';

export default function ArticlesList() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await api.listArticles();
      // Response is always an object with articles array
      if (data && data.articles) {
        setArticles(data.articles);
      } else {
        setArticles([]);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load articles');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this article?')) return;
    try {
      await api.deleteArticle(id);
      setArticles(articles.filter(a => a.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  const handleToggleBreaking = async (id: number, current: 0 | 1 | boolean) => {
    const isCurrentlyBreaking = current === 1 || current === true;
    try {
      await api.toggleBreaking(id, !isCurrentlyBreaking);
      setArticles(articles.map(a => a.id === id ? { ...a, is_breaking: isCurrentlyBreaking ? 0 : 1 } : a));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Toggle failed');
    }
  };

  if (loading) return <div className="p-6">Loading articles...</div>;
  if (error) return <div className="p-6 text-red-600 flex items-center gap-2"><AlertCircle className="w-5 h-5" />{error}</div>;

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold flex-1">Articles</h1>
        <Link to="/admin/articles/new" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Article
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Breaking</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Published</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{article.title}</td>
                <td className="px-4 py-3 text-sm">
                  {typeof article.category === 'object' && article.category 
                    ? (article.category.name || article.category.nameRw) 
                    : (typeof article.category === 'string' ? article.category : '-')}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleToggleBreaking(article.id, article.is_breaking)}
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      article.is_breaking === 1
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {article.is_breaking === 1 ? 'Breaking' : 'Normal'}
                  </button>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {article.published_at ? new Date(article.published_at).toLocaleDateString() : 'Draft'}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/admin/articles/edit/${article.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(article.id)}
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
        {articles.length === 0 && (
          <div className="p-8 text-center text-gray-500">No articles yet. Create one!</div>
        )}
      </div>
    </div>
  );
}
