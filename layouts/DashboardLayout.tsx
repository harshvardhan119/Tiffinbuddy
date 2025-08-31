
import React, { ReactNode } from 'react';
import Sidebar from '../components/common/Sidebar';
import { HomeIcon, UsersIcon, ClipboardListIcon, MenuIcon } from '../components/icons/Icon';
import { UserRole } from '../types';
import { useAuth } from '../context/AuthContext';

interface DashboardLayoutProps {
    children: ReactNode;
}

const getNavItems = (role: UserRole) => {
    switch (role) {
        case UserRole.CUSTOMER:
            return [
                { path: '/customer/dashboard', label: 'Dashboard', icon: <HomeIcon /> },
                { path: '/customer/orders', label: 'My Orders', icon: <ClipboardListIcon /> },
            ];
        case UserRole.PROVIDER:
            return [
                { path: '/provider/dashboard', label: 'Dashboard', icon: <HomeIcon /> },
                { path: '/provider/orders', label: 'Manage Orders', icon: <ClipboardListIcon /> },
                { path: '/provider/menu', label: 'Manage Menu', icon: <MenuIcon /> },
                { path: '/provider/subscribers', label: 'Subscribers', icon: <UsersIcon /> },
            ];
        case UserRole.ADMIN:
            return [
                { path: '/admin/dashboard', label: 'Dashboard', icon: <HomeIcon /> },
                { path: '/admin/users', label: 'Manage Users', icon: <UsersIcon /> },
                { path: '/admin/vendors', label: 'Manage Vendors', icon: <MenuIcon /> },
                { path: '/admin/orders', label: 'All Orders', icon: <ClipboardListIcon /> },
            ];
        default:
            return [];
    }
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const { user } = useAuth();
    
    if (!user) {
        return <div>Loading user...</div>
    }

    const navItems = getNavItems(user.role);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <Sidebar navItems={navItems} />
                    <main className="flex-1">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
