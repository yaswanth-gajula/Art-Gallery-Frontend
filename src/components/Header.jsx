import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { useWishlist } from '../context/WishlistContext'; // New import
import { FaShoppingCart, FaUserCircle, FaMoon, FaSun, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ cartCount, clearCart }) => { // 1. Get clearCart from props
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { clearWishlist } = useWishlist(); // 2. Get clearWishlist from context
    const navigate = useNavigate();
    const [isProfileOpen, setProfileOpen] = useState(false);

    // 3. Update the handleLogout function
    const handleLogout = () => {
        setProfileOpen(false);
        logout();          // Clears auth state
        clearWishlist();   // Clears wishlist state
        clearCart();       // Clears cart state
        navigate('/');
    };

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center text-2xl font-bold text-gray-800 dark:text-white">
                    <img src="/logo.svg" alt="Logo" className="w-8 h-8 mr-2" />
                    Art Gallery
                </Link>
                <nav className="hidden md:flex items-center space-x-6">
                    <NavLink to="/" className={({ isActive }) => isActive ? "text-indigo-600 font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"}>Home</NavLink>
                    <NavLink to="/shop" className={({ isActive }) => isActive ? "text-indigo-600 font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"}>Shop</NavLink>
                    <NavLink to="/artists" className={({ isActive }) => isActive ? "text-indigo-600 font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"}>Artists</NavLink>
                </nav>
                <div className="flex items-center space-x-4">
                    <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                        {theme === 'light' ? <FaMoon size={22} /> : <FaSun size={22} />}
                    </button>
                    <Link to="/cart" className="relative text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                        <FaShoppingCart size={24} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>
                        )}
                    </Link>
                    {user ? (
                        <div className="relative">
                            <button onClick={() => setProfileOpen(!isProfileOpen)} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                                <FaUserCircle size={24} />
                                <span className='hidden sm:inline'>{user.name}</span>
                                <FaChevronDown size={12} className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-20"
                                    >
                                        <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                                            <p className="font-semibold">My Profile</p>
                                            <div className="pl-2 mt-1 border-l-2 dark:border-gray-500">
                                                <Link to="/wishlist" onClick={() => setProfileOpen(false)} className="block px-2 py-1 text-sm rounded hover:bg-indigo-50 dark:hover:bg-gray-600">Wishlist</Link>
                                                <Link to="/profile/orders" onClick={() => setProfileOpen(false)} className="block px-2 py-1 text-sm rounded hover:bg-indigo-50 dark:hover:bg-gray-600">Bought Items</Link>
                                                <Link to="/profile/details" onClick={() => setProfileOpen(false)} className="block px-2 py-1 text-sm rounded hover:bg-indigo-50 dark:hover:bg-gray-600">Details</Link>
                                                {user.role === 'ROLE_SELLER' && (
                                                    <Link to="/seller-dashboard" onClick={() => setProfileOpen(false)} className="block px-2 py-1 text-sm rounded hover:bg-indigo-50 dark:hover:bg-gray-600 font-semibold text-indigo-600 dark:text-indigo-400">Seller Dashboard</Link>
                                                )}
                                            </div>
                                        </div>
                                        <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-600 border-t dark:border-gray-600">Logout</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link to="/login" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;