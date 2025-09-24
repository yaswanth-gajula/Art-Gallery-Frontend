import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axiosConfig';
import { useAuth } from '../hooks/useAuth';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(new Set());
    const { isAuthenticated } = useAuth();

    const clearWishlist = () => {
        setWishlist(new Set());
    };

    const fetchWishlist = async () => {
        if (!isAuthenticated) {
            clearWishlist(); // Use the new clear function
            return;
        }
        try {
            const response = await api.get('/wishlist');
            setWishlist(new Set(response.data));
        } catch (error) {
            console.error('Failed to fetch wishlist:', error);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, [isAuthenticated]);

    const addToWishlist = async (artItemId) => {
        try {
            await api.post(`/wishlist/${artItemId}`);
            setWishlist(prev => new Set([...prev, artItemId]));
        } catch (error) {
            console.error('Failed to add to wishlist:', error);
        }
    };

    const removeFromWishlist = async (artItemId) => {
        try {
            await api.delete(`/wishlist/${artItemId}`);
            setWishlist(prev => {
                const newWishlist = new Set(prev);
                newWishlist.delete(artItemId);
                return newWishlist;
            });
        } catch (error) {
            console.error('Failed to remove from wishlist:', error);
        }
    };

    const isInWishlist = (artItemId) => {
        return wishlist.has(artItemId);
    };

    return (
        <WishlistContext.Provider value={{ isInWishlist, addToWishlist, removeFromWishlist, wishlistItems: Array.from(wishlist), clearWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};