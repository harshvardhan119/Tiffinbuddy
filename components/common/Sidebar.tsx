import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavItem {
    path: string;
    label: string;
    icon: React.ReactElement;
}

interface SidebarProps {
    navItems: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ navItems }) => {
    return (
        <aside className="w-64 bg-white shadow-lg rounded-lg p-4">
            <nav className="space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                                isActive
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`
                        }
                    >
                        {/* FIX: Replaced React.cloneElement with React.createElement to fix a TypeScript error regarding props type inference. */}
                        {React.createElement(item.icon.type, { ...item.icon.props, className: 'w-5 h-5 mr-3' })}
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;