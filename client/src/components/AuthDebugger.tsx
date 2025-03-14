import React from 'react';
import { useUser } from '../contexts/UserContext';

const AuthDebugger: React.FC = () => {
    const { user, loading, error } = useUser();
    const token = localStorage.getItem('token');

    if (process.env.NODE_ENV !== 'development') {
        return null;
    }

    return (
        <div className="fixed bottom-0 right-0 m-4 p-4 bg-black/80 text-white rounded-lg text-xs max-w-xs z-50 overflow-auto max-h-60">
            <h3 className="font-bold mb-2">Auth Debug Info</h3>
            <div className="space-y-1">
                <p>Token: {token ? '✅ Present' : '❌ Missing'}</p>
                <p>Loading: {loading ? '⏳ Yes' : '✅ No'}</p>
                <p>Error: {error ? `❌ ${error}` : '✅ None'}</p>
                <p>User: {user ? '✅ Logged in' : '❌ Not logged in'}</p>
                {user && (
                    <>
                        <p>Name: {user.name}</p>
                        <p>Role: {user.role}</p>
                        <p>Email: {user.email}</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthDebugger; 