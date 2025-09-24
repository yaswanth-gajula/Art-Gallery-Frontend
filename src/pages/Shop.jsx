import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import AnimatedPage from '../components/AnimatedPage';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await api.get('/art');
                setProducts(response.data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <AnimatedPage>
            <h1 className="text-3xl font-bold mb-6">Explore Our Collection</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </AnimatedPage>
    );
};

export default Shop;