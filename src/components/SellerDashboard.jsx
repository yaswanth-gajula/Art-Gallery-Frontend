import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import Spinner from './Spinner';
import AnimatedPage from './AnimatedPage';
import { FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const SellerDashboard = () => {
    const [artItems, setArtItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('products'); // 'products' or 'orders'
    
    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    
    const API_BASE_URL = 'http://localhost:9091';

    const fetchArtItems = async () => {
        try {
            const response = await api.get('/seller/art');
            setArtItems(response.data);
        } catch (error) {
            console.error("Failed to fetch art items:", error);
        }
    };
    
    const fetchOrders = async () => {
        try {
            const response = await api.get('/seller/orders');
            setOrders(response.data);
        } catch (error) {
            console.error("Failed to fetch seller orders:", error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchArtItems(), fetchOrders()]);
            setLoading(false);
        };
        loadData();
    }, []);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('image', image);

        try {
            await api.post('/seller/art', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success("Art item added successfully!");
            // Reset form and refetch items
            setTitle(''); setDescription(''); setPrice(''); setCategory(''); setImage(null);
            e.target.reset();
            fetchArtItems();
        } catch (error) {
            toast.error("Failed to add art item.");
            console.error("Failed to add art item:", error);
        }
    };
    
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                await api.delete(`/seller/art/${id}`);
                toast.success("Item deleted successfully.");
                fetchArtItems();
            } catch (error) {
                toast.error("Failed to delete item.");
                console.error("Delete failed:", error);
            }
        }
    };

    if (loading) return <Spinner />;

    return (
        <AnimatedPage>
            <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
             <div className="mb-6 border-b">
                <nav className="flex space-x-4">
                    <button onClick={() => setView('products')} className={`py-2 px-4 font-medium ${view === 'products' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'}`}>My Products</button>
                    <button onClick={() => setView('orders')} className={`py-2 px-4 font-medium ${view === 'orders' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'}`}>My Sales</button>
                </nav>
            </div>

            {view === 'products' ? (
                 <div>
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Add New Art</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
                            <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded" required />
                            <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 border rounded" required />
                            <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 border rounded" required />
                            <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" required />
                            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Add Item</button>
                        </form>
                    </div>

                    <h2 className="text-2xl font-semibold mb-4">My Listings</h2>
                     <div className="space-y-4">
                        {artItems.map(item => (
                            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                     <img src={`${API_BASE_URL}${item.imageUrl}`} alt={item.title} className="w-16 h-16 object-cover rounded" />
                                    <div>
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>
                 </div>
            ) : (
                <div>
                     <h2 className="text-2xl font-semibold mb-4">Orders for My Art</h2>
                      <div className="space-y-6">
                        {orders.length === 0 ? (
                            <p>You have no sales yet.</p>
                        ) : (
                            orders.map(order => (
                                <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="border-b pb-2 mb-4">
                                        <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                                        <p className="text-sm text-gray-500">Buyer: {order.buyerName} | Date: {new Date(order.orderDate).toLocaleDateString()}</p>
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
                </div>
            )}
        </AnimatedPage>
    );
};

export default SellerDashboard;