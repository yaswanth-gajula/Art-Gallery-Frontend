import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';

const ProductCard = ({ product }) => {
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const { isAuthenticated } = useAuth();
    const isWishlisted = isInWishlist(product.id);
    const API_BASE_URL = 'http://localhost:9091';

    const handleWishlistToggle = (e) => {
        e.preventDefault(); // Prevent navigating when clicking the heart
        e.stopPropagation();
        if (isWishlisted) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product.id);
        }
    };

    return (
        <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group"
            whileHover={{ y: -5, boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -2px rgba(0,0,0,0.05)" }}
            transition={{ duration: 0.2 }}
        >
            <div className="relative">
                <Link to={`/product/${product.id}`} className="block">
                    <div className="w-full h-48 overflow-hidden">
                        <img
                            src={`${API_BASE_URL}${product.imageUrl}`}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                        />
                    </div>
                </Link>
                {isAuthenticated && (
                    <button
                        onClick={handleWishlistToggle}
                        className="absolute top-2 right-2 p-2 bg-white/70 dark:bg-gray-800/70 rounded-full text-red-500 hover:scale-110 transition-transform"
                        aria-label="Toggle Wishlist"
                    >
                        {isWishlisted ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                    </button>
                )}
            </div>
            <Link to={`/product/${product.id}`} className="block">
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">{product.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{product.category}</p>
                    <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mt-2">${product.price.toFixed(2)}</p>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;