import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import { FaTrash } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import api from '../api/axiosConfig';
import PaymentModal from '../components/PaymentModal';

const Cart = ({ cart, removeFromCart, updateQuantity, clearCart }) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    const API_BASE_URL = 'http://localhost:9091';

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        if (!isAuthenticated) {
            toast.error("Please log in to place an order.");
            navigate('/login');
            return;
        }
        setPaymentModalOpen(true); // Open payment modal
    };

    const handlePaymentSuccess = async () => {
        const orderItems = cart.map(item => ({ artItemId: item.id, quantity: item.quantity }));
        
        try {
            await api.post('/orders', orderItems);
            toast.success("Order placed successfully!");
            clearCart();
            setPaymentModalOpen(false);
            navigate('/profile/orders');
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to place order. Please try again.";
            toast.error(errorMessage);
            console.error("Order placement failed:", error);
        }
    };

    if (cart.length === 0) {
        return (
            <AnimatedPage>
                <div className="text-center py-10">
                    <h1 className="text-3xl font-bold mb-4 dark:text-white">Your Cart is Empty</h1>
                    <Link to="/shop" className="text-indigo-600 dark:text-indigo-400 hover:underline">Continue Shopping</Link>
                </div>
            </AnimatedPage>
        );
    }

    return (
        <>
            <AnimatedPage>
                <h1 className="text-3xl font-bold mb-6 dark:text-white">Your Cart</h1>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="space-y-4">
                        {cart.map(item => (
                            <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b dark:border-gray-700 pb-4">
                                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                    <img src={`${API_BASE_URL}${item.imageUrl}`} alt={item.title} className="w-20 h-20 object-cover rounded" />
                                    <div>
                                        <h2 className="font-semibold dark:text-white">{item.title}</h2>
                                        <p className="text-gray-600 dark:text-gray-400">${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                        className="w-16 p-1 border dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
                                    />
                                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-right">
                        <h2 className="text-2xl font-bold dark:text-white">Total: ${total.toFixed(2)}</h2>
                        <button onClick={handleCheckout} className="mt-4 px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </AnimatedPage>
            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setPaymentModalOpen(false)}
                onSuccess={handlePaymentSuccess}
                amount={total}
            />
        </>
    );
};

export default Cart;