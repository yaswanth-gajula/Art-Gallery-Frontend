import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { useWishlist } from '../context/WishlistContext';
import Spinner from '../components/Spinner';
import AnimatedPage from '../components/AnimatedPage';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
    const { wishlistItems } = useWishlist();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            if (wishlistItems.length === 0) {
                setProducts([]);
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                // Fetch all products and then filter, or create a specific wishlist endpoint
                const response = await api.get('/art');
                const wishlistedProducts = response.data.filter(p => wishlistItems.includes(p.id));
                setProducts(wishlistedProducts);
            } catch (error) {
                console.error("Failed to fetch wishlist products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [wishlistItems]);

    if (loading) return <Spinner />;

    return (
        <AnimatedPage>
            <h1 className="text-3xl font-bold mb-6 dark:text-white">My Wishlist</h1>
            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="dark:text-gray-300">Your wishlist is empty.</p>
            )}
        </AnimatedPage>
    );
};

export default Wishlist;