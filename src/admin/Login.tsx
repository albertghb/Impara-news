import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';

export default function AdminLogin() {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      if (isRegister) {
        // Register new admin
        await api.register(email, password);
        setSuccess('Account created! Logging you in...');
        // Auto-login after registration
        setTimeout(async () => {
          await login(email, password);
          window.location.href = '/admin';
        }, 1000);
      } else {
        // Login existing admin
        await login(email, password);
        window.location.href = '/admin';
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : isRegister ? 'Registration failed' : 'Login failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white rounded-lg shadow p-6 space-y-4">
        <h1 className="text-xl font-semibold">{isRegister ? 'Create Admin Account' : 'Admin Login'}</h1>
        
        {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded">{error}</p>}
        {success && <p className="text-sm text-green-600 bg-green-50 p-3 rounded">{success}</p>}
        
        <div className="space-y-1">
          <label className="text-sm font-semibold">Email</label>
          <input 
            type="email"
            required
            className="w-full border rounded px-3 py-2" 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} 
          />
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-semibold">Password</label>
          <input 
            type="password" 
            required
            minLength={6}
            className="w-full border rounded px-3 py-2" 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)} 
          />
          {isRegister && <p className="text-xs text-gray-500">Minimum 6 characters</p>}
        </div>
        
        <button 
          type="submit"
          disabled={loading} 
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded py-2 font-semibold transition-colors"
        >
          {loading ? (isRegister ? 'Creating Account...' : 'Signing in...') : (isRegister ? 'Create Account' : 'Sign In')}
        </button>
        
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError(null);
              setSuccess(null);
            }}
            className="text-sm text-blue-600 hover:text-blue-700 underline"
          >
            {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
          </button>
        </div>
      </form>
    </div>
  );
}
