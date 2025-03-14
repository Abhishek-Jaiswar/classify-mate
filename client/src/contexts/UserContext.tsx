import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, userService } from '../services/user.service';
import { toast } from 'sonner';

interface UserContextType {
    user: UserProfile | null;
    loading: boolean;
    error: string | null;
    refreshProfile: () => Promise<void>;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching user profile...');
            const profile = await userService.getProfile();
            console.log('Profile fetched successfully:', profile);
            setUser(profile);
        } catch (err: any) {
            console.error('Error fetching profile:', err);
            setError('Failed to fetch user profile');

            // If the error is due to an invalid token, clear it
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                console.log('Unauthorized access, clearing token');
                userService.clearToken();
                setUser(null);
            }
        } finally {
            setLoading(false);
        }
    };

    const refreshProfile = async () => {
        console.log('Refreshing user profile...');
        await fetchProfile();
    };

    const logout = () => {
        console.log('Logging out...');
        userService.clearToken();
        setUser(null);
        toast.success('Logged out successfully');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token in UserContext:', token ? 'exists' : 'not found');
        if (token) {
            fetchProfile();
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, error, refreshProfile, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}; 