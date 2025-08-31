
import React from 'react';
import { MOCK_ORDERS } from '../../data/mockData';
import { MOCK_PROVIDERS } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Order, OrderStatus } from '../../types';

const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.DELIVERED:
            return 'bg-green-100 text-green-800';
        case OrderStatus.OUT_FOR_DELIVERY:
            return 'bg-blue-100 text-blue-800';
        case OrderStatus.PENDING:
            return 'bg-yellow-100 text-yellow-800';
        case OrderStatus.CONFIRMED:
            return 'bg-indigo-100 text-indigo-800';
        case OrderStatus.CANCELLED:
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
    const provider = MOCK_PROVIDERS.find(p => p.id === order.providerId);
    const plan = provider?.plans.find(p => p.id === order.planId);

    if (!provider || !plan) return null;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">{provider.name}</h3>
                        <p className="text-sm text-gray-600">{plan.name}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                    </span>
                </div>
                <div className="mt-4 border-t pt-4">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Subscription Period:</span>
                        <span>{new Date(order.startDate).toLocaleDateString()} - {new Date(order.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-gray-800 mt-2">
                        <span>Total Amount:</span>
                        <span>₹{order.totalAmount.toLocaleString()}</span>
                    </div>
                </div>
            </div>
             <div className="bg-gray-50 px-5 py-3">
                 <button className="text-sm font-medium text-primary hover:text-amber-600">View Details</button>
             </div>
        </div>
    )
}

const CustomerDashboard: React.FC = () => {
    const { user } = useAuth();
    const userOrders = MOCK_ORDERS.filter(o => o.userId === user?.id);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
            
            <div className="bg-white p-6 rounded-lg shadow">
                 <h2 className="text-xl font-bold text-gray-700 mb-4">My Orders</h2>
                 {userOrders.length > 0 ? (
                    <div className="space-y-4">
                       {userOrders.map(order => <OrderCard key={order.id} order={order} />)}
                    </div>
                 ) : (
                    <p className="text-gray-500">You haven't placed any orders yet.</p>
                 )}
            </div>
        </div>
    );
};

export default CustomerDashboard;
