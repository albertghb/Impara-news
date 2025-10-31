import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ReactNode } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token, user, isAdmin, isLoading } = useAuth();
  
  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" text="Verifying access..." />
      </div>
    );
  }
  
  // Redirect to login if no token
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  
  // Redirect to home if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">You don't have permission to access the admin panel.</p>
          <p className="text-sm text-gray-500">Only administrators can access this area.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
}
