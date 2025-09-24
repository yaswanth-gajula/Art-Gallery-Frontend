import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Context
import { WishlistProvider } from './context/WishlistContext';

// Components and Pages
import Header from './components/Header';
import Footer from './components/Footer';
import GuardedRoute from './components/GuardedRoute';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import BuyerDashboard from './components/BuyerDashboard';
import SellerDashboard from './components/SellerDashboard';
import Cart from './pages/Cart';
import Artists from './pages/Artists';
import ArtistDetail from './pages/ArtistDetail';
import Wishlist from './pages/Wishlist';
import ProfileDetails from './pages/ProfileDetails';

function App() {
    const location = useLocation();
    const [cart, setCart] = useState([]);

    // Load cart from localStorage on initial render
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                 // If quantity is passed, add it. Otherwise, increment by 1.
                const quantityToAdd = product.quantity || 1;
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantityToAdd } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: product.quantity || 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };
    
    const clearCart = () => {
      setCart([]);
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <WishlistProvider>
                <Header cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} clearCart={clearCart} />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<Home />} />
                            <Route path="/shop" element={<Shop />} />
                            <Route path="/artists" element={<Artists />} />
                            <Route path="/artist/:id" element={<ArtistDetail />} />
                            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
                            <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} clearCart={clearCart} />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            
                            {/* Guarded Routes */}
                            <Route path="/wishlist" element={<GuardedRoute><Wishlist /></GuardedRoute>} />
                            <Route path="/profile/details" element={<GuardedRoute><ProfileDetails /></GuardedRoute>} />
                            
                            <Route path="/profile/orders" element={
                                <GuardedRoute>
                                    <BuyerDashboard />
                                </GuardedRoute>
                            } />
                            
                            <Route path="/seller-dashboard" element={
                                <GuardedRoute requiredRole="ROLE_SELLER">
                                    <SellerDashboard />
                                </GuardedRoute>
                            } />
                        </Routes>
                    </AnimatePresence>
                </main>
                <Footer />
            </WishlistProvider>
        </div>
    );
}

export default App;