
import React from 'react';
import { MOCK_USERS, MOCK_PROVIDERS, MOCK_ORDERS } from '../../data/mockData';
import { UserRole, OrderStatus } from '../../types';

const StatCard: React.FC<{ title: string; value: string | number; description: string }> = ({ title, value, description }) => (
    <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
);

const AdminDashboard: React.FC = () => {
    const totalCustomers = MOCK_USERS.filter(u => u.role === UserRole.CUSTOMER).length;
    const totalProviders = MOCK_PROVIDERS.length;
    const pendingVerifications = MOCK_PROVIDERS.filter(p => !p.isVerified).length;
    const totalRevenue = MOCK_ORDERS.filter(o => o.status !== OrderStatus.CANCELLED).reduce((acc, order) => acc + order.totalAmount, 0);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Customers" value={totalCustomers} description="Number of registered customers." />
                <StatCard title="Total Providers" value={totalProviders} description="Number of registered tiffin providers." />
                <StatCard title="Pending Verifications" value={pendingVerifications} description="Providers awaiting approval." />
                <StatCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} description="Gross revenue from all orders." />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Recent Activity</h2>
                {/* In a real app, this would be a feed of recent events */}
                <ul className="space-y-2 text-gray-600">
                    <li><span className="font-semibold">New Provider:</span> South Spice signed up.</li>
                    <li><span className="font-semibold">New Customer:</span> Priya Patel joined.</li>
                    <li><span className="font-semibold">Order Placed:</span> Anjali Sharma subscribed to Rajesh's Kitchen.</li>
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;
