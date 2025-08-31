
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { HomeIcon, LoginIcon, LogoutIcon } from '../icons/Icon';

const Header: React.FC = () => {
    const { user, logout } = useAuth();

    const getDashboardLink = () => {
        if (!user) return "/";
        switch (user.role) {
            case UserRole.CUSTOMER:
                return "/customer/dashboard";
            case UserRole.PROVIDER:
                return "/provider/dashboard";
            case UserRole.ADMIN:
                return "/admin/dashboard";
            default:
                return "/";
        }
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <NavLink to="/" className="text-2xl font-bold text-primary">
                           TiffinBuddy
                        </NavLink>
                    </div>
                    <div className="flex items-center">
                        <nav className="hidden md:flex items-center space-x-4">
                           <NavLink to="/" className={({isActive}) => `text-gray-500 hover:text-primary transition ${isActive ? 'text-primary font-semibold' : ''}`}>
                                Home
                           </NavLink>
                           <NavLink to="/browse" className={({isActive}) => `text-gray-500 hover:text-primary transition ${isActive ? 'text-primary font-semibold' : ''}`}>
                                Find Tiffins
                           </NavLink>
                        </nav>
                        <div className="ml-4 flex items-center">
                            {user ? (
                                <>
                                    <NavLink to={getDashboardLink()} className="flex items-center text-gray-700 hover:text-primary transition mr-4">
                                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full mr-2" />
                                        <span>{user.name}</span>
                                    </NavLink>
                                    <button onClick={logout} className="p-2 rounded-full text-gray-500 hover:bg-red-100 hover:text-red-600 transition">
                                        <LogoutIcon />
                                    </button>
                                </>
                            ) : (
                                <NavLink to="/auth" className="flex items-center text-gray-500 hover:text-primary transition">
                                    <LoginIcon className="mr-2" />
                                    Login
                                </NavLink>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
