import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import Spinner from '../components/Spinner';
import AnimatedPage from '../components/AnimatedPage';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import PaymentModal from '../components/PaymentModal'; // Import the modal

const ProductDetail = ({ addToCart }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false); // State for the modal
    const API_BASE_URL = 'http://localhost:9091';

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/art/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Failed to fetch product details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);
    
    const handleAddToCart = () => {
      addToCart({ ...product, quantity });
      toast.success(`${quantity} x ${product.title} added to cart!`);
    }

    const handleBuyNow = () => {
        if (!isAuthenticated) {
            toast.error("Please log in to buy an item.");
            navigate('/login');
            return;
        }
        setPaymentModalOpen(true); // Open the payment modal
    };

    const handlePaymentSuccess = async () => {
        const buyNowRequest = { artItemId: product.id, quantity };
        try {
            await api.post('/orders/buy-now', buyNowRequest);
            toast.success("Order placed successfully!");
            setPaymentModalOpen(false);
            navigate('/profile/orders');
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to place order. Please try again.";
            toast.error(errorMessage);
            console.error("Buy Now failed:", error);
            setPaymentModalOpen(false);
        }
    };

    if (loading) {
        return <Spinner />;
    }

    if (!product) {
        return <div className="text-center text-xl dark:text-white">Product not found.</div>;
    }

    return (
        <>
            <AnimatedPage>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Image Column */}
                        <div>
                            <img
                                src={`${API_BASE_URL}${product.imageUrl}`}
                                alt={product.title}
                                className="w-full h-auto rounded-lg object-cover"
                            />
                        </div>
                        {/* Details Column */}
                        <div>
                            <h1 className="text-4xl font-bold dark:text-white mb-2">{product.title}</h1>
                            <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">By {product.sellerName}</p>
                            <span className="text-sm font-semibold text-indigo-600 bg-indigo-100 dark:bg-gray-700 dark:text-indigo-400 py-1 px-3 rounded-full">{product.category}</span>
                            <p className="text-3xl font-bold text-gray-800 dark:text-white my-6">${(product.price * quantity).toFixed(2)}</p>
                            
                            {/* Quantity Selector */}
                            <div className="flex items-center gap-4 mb-8">
                                <label htmlFor="quantity" className="font-semibold dark:text-gray-200">Quantity:</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                                    className="w-20 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>
                            
                            {/* Action Buttons */}
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <button onClick={handleBuyNow} className="w-full px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Buy Now
                                </button>
                                <button onClick={handleAddToCart} className="w-full px-6 py-3 text-lg font-semibold text-indigo-700 bg-indigo-100 rounded-lg hover:bg-indigo-200 dark:bg-gray-700 dark:text-indigo-400 dark:hover:bg-gray-600">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedPage>
            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setPaymentModalOpen(false)}
                onSuccess={handlePaymentSuccess}
                amount={product.price * quantity}
            />
        </>
    );
};

export default ProductDetail;