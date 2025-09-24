import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import Spinner from './Spinner';
import AnimatedPage from './AnimatedPage';

const BuyerDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_BASE_URL = 'http://localhost:9091';

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await api.get('/orders/my-history');
                setOrders(response.data);
            } catch (error) {
                console.error("Failed to fetch order history:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <Spinner />;

    return (
        <AnimatedPage>
            <h1 className="text-3xl font-bold mb-6">My Order History</h1>
            <div className="space-y-6">
                {orders.length === 0 ? (
                    <p>You have not placed any orders yet.</p>
                ) : (
                    orders.map(order => (
                        <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex justify-between items-center border-b pb-2 mb-4">
                                <div>
                                    <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                                    <p className="text-sm text-gray-500">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                                </div>
                                <p className="text-lg font-bold">Total: ${order.totalAmount.toFixed(2)}</p>
                            </div>
                            <div className="space-y-3">
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <img src={`${API_BASE_URL}${item.imageUrl}`} alt={item.title} className="w-16 h-16 object-cover rounded" />
                                        <div>
                                            <p className="font-semibold">{item.title}</p>
                                            <p className="text-sm text-gray-600">Quantity: {item.quantity} | Price: ${item.priceAtPurchase.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </AnimatedPage>
    );
};

export default BuyerDashboard;