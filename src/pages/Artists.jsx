import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import Spinner from '../components/Spinner';
import AnimatedPage from '../components/AnimatedPage';

const Artists = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                setLoading(true);
                const response = await api.get('/artists');
                setArtists(response.data);
            } catch (error) {
                console.error("Failed to fetch artists:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchArtists();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <AnimatedPage>
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Artists</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {artists.map(artist => (
                    <Link to={`/artist/${artist.id}`} key={artist.id} className="block bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                        {/* Placeholder for artist image */}
                        <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-indigo-100 dark:bg-gray-700 flex items-center justify-center">
                           <span className="text-3xl text-indigo-500 dark:text-indigo-400">{artist.name.charAt(0)}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{artist.name}</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 truncate">{artist.bio || "An artist of unique vision."}</p>
                    </Link>
                ))}
            </div>
        </AnimatedPage>
    );
};

export default Artists;