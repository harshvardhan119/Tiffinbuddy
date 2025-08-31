
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { MOCK_USERS } from '../data/mockData';

interface AuthContextType {
    user: User | null;
    login: (email: string, role: UserRole) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (email: string, role: UserRole) => {
        // This is a mock login. In a real app, you'd call an API.
        const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === role);
        if (foundUser) {
            setUser(foundUser);
        } else {
            // Create a mock user if not found for demonstration
            const newUser: User = {
                id: `u${Date.now()}`,
                name: email.split('@')[0],
                email: email,
                role: role,
                avatar: `https://picsum.photos/seed/${Date.now()}/100/100`,
            };
            MOCK_USERS.push(newUser);
            setUser(newUser);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
