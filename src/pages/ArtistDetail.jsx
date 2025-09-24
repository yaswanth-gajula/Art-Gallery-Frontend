import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosConfig';
import Spinner from '../components/Spinner';
import AnimatedPage from '../components/AnimatedPage';
import ProductCard from '../components/ProductCard';

const ArtistDetail = () => {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/artists/${id}`);
                setArtist(response.data);
            } catch (error) {
                console.error("Failed to fetch artist details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchArtist();
    }, [id]);

    if (loading) {
        return <Spinner />;
    }

    if (!artist) {
        return <div className="text-center text-xl dark:text-white">Artist not found.</div>;
    }

    return (
        <AnimatedPage>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{artist.name}</h1>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{artist.bio || "No biography provided."}</p>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-t dark:border-gray-700 pt-6 mt-8">Works by this Artist</h2>
                 <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {artist.artItems && artist.artItems.map(item => (
                        <ProductCard key={item.id} product={item} />
                    ))}
                </div>
            </div>
        </AnimatedPage>
    );
};

export default ArtistDetail;