import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { toast } from 'sonner';

interface PrivateRouteProps {
    children: React.ReactNode;
    requiredRole?: 'admin' | 'teacher' | 'student';
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
    const { user, loading, error, refreshProfile } = useUser();
    const location = useLocation();

    useEffect(() => {
        // If there's an error and we're not loading, try to refresh the profile
        if (error && !loading) {
            console.log('Error in PrivateRoute, attempting to refresh profile');
            refreshProfile();
        }
    }, [error, loading, refreshProfile]);

    // Show loading state if user data is still being fetched
    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
                    <p>Loading user data...</p>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!user) {
        console.log('No user found in PrivateRoute, redirecting to login');
        // Show a toast message
        toast.error('Please log in to access this page');
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    // If a specific role is required, check if the user has that role
    if (requiredRole && user.role !== requiredRole) {
        console.log(`Role mismatch: Required ${requiredRole}, user has ${user.role}`);
        // Show a toast message
        toast.error(`You don't have permission to access this page. Redirecting to your dashboard.`);

        // Redirect to the appropriate dashboard based on user's role
        switch (user.role) {
            case 'admin':
                return <Navigate to="/admin/dashboard" replace />;
            case 'teacher':
                return <Navigate to="/teacher/dashboard" replace />;
            case 'student':
                return <Navigate to="/dashboard" replace />;
            default:
                return <Navigate to="/dashboard" replace />;
        }
    }

    return <>{children}</>;
};

export default PrivateRoute; 