
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_ORDERS, MOCK_PROVIDERS } from '../../data/mockData';
import { OrderStatus } from '../../types';

const StatCard: React.FC<{ title: string; value: string | number; }> = ({ title, value }) => (
    <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
    </div>
);


const ProviderDashboard: React.FC = () => {
    const { user } = useAuth();
    // In a real app, the provider ID would be associated with the user account
    const provider = MOCK_PROVIDERS[0]; // Mocking: assume logged-in provider is the first one
    const providerOrders = MOCK_ORDERS.filter(o => o.providerId === provider.id);

    const totalSubscribers = new Set(providerOrders.map(o => o.userId)).size;
    const monthlyRevenue = providerOrders
        .filter(o => o.status !== OrderStatus.CANCELLED && new Date(o.startDate).getMonth() === new Date().getMonth())
        .reduce((acc, order) => acc + order.totalAmount, 0);
    const activeOrders = providerOrders.filter(o => o.status === OrderStatus.CONFIRMED || o.status === OrderStatus.OUT_FOR_DELIVERY).length;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">{provider.name} - Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Subscribers" value={totalSubscribers} />
                <StatCard title="Active Orders" value={activeOrders} />
                <StatCard title="This Month's Revenue" value={`₹${monthlyRevenue.toLocaleString()}`} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {providerOrders.slice(0, 5).map(order => {
                                const plan = provider.plans.find(p => p.id === order.planId);
                                return (
                                    <tr key={order.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan?.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.status}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{order.totalAmount}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProviderDashboard;
