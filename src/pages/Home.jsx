
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';


const featuredArt = {
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80',
    title: 'Dreamscape',
    artist: 'Unsplash Artist',
};

const artPieces = [
    { image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', title: 'Golden Fields', artist: 'Unsplash Artist' },
    { image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80', title: 'Urban Canvas', artist: 'Unsplash Artist' },
    { image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', title: 'Serenity', artist: 'Unsplash Artist' },
    { image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80', title: 'Abstract Flow', artist: 'Unsplash Artist' },
        { image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80', title: 'Color Burst', artist: 'Unsplash Artist' },
    { image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', title: 'Tranquility', artist: 'Unsplash Artist' },
];

const Home = () => {
        return (
            <AnimatedPage>

            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center min-h-[60vh] mb-12">
                <img src={featuredArt.image} alt={featuredArt.title} className="w-full max-h-[400px] object-cover rounded-xl shadow-lg" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 px-8 py-6 rounded-xl shadow-xl text-center">
                    <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Inter, serif' }}>{featuredArt.title}</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">by {featuredArt.artist}</p>
                    <Link to="/shop" className="mt-4 inline-block px-8 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105">View Gallery</Link>
                </div>
            </section>

            {/* Art Grid */}
            <section className="max-w-6xl mx-auto px-4 pb-16">
                <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8 text-center" style={{ fontFamily: 'Inter, serif' }}>Featured Artworks</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {artPieces.map((piece, idx) => (
                        <div key={idx} className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                            <img src={piece.image} alt={piece.title} className="w-full h-64 object-cover" />
                            <div className="p-4 flex flex-col items-center">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 text-center" style={{ fontFamily: 'Inter, serif' }}>{piece.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm text-center">{piece.artist}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* About Section */}
            <section className="max-w-4xl mx-auto px-4 py-12 mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center" style={{ fontFamily: 'Inter, serif' }}>About Art Gallery</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                    Art Gallery is a curated online destination for discovering and celebrating exceptional artwork from around the world. Our platform connects art lovers, collectors, and creators, offering a sophisticated experience to explore, appreciate, and acquire unique pieces. We believe in the power of art to inspire, elevate spaces, and foster meaningful connections. Whether you are seeking a masterpiece for your collection or simply wish to immerse yourself in creativity, Art Gallery is your gateway to the world of fine art.
                </p>
            </section>

            {/* Contact Section */}
            <section className="max-w-4xl mx-auto px-4 py-12 mb-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center" style={{ fontFamily: 'Inter, serif' }}>Contact Us</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 text-center leading-relaxed mb-6">
                    Have questions, feedback, or want to collaborate? Reach out to our team and we'll be happy to assist you.
                </p>
                <div className="flex flex-col items-center space-y-2">
                    <span className="text-gray-700 dark:text-gray-200 text-base"><strong>Email:</strong> <a href="mailto:info@artgallery.com" className="text-indigo-600 hover:underline">info@artgallery.com</a></span>
                    <span className="text-gray-700 dark:text-gray-200 text-base"><strong>Phone:</strong> <a href="tel:+1234567890" className="text-indigo-600 hover:underline">+1 (234) 567-890</a></span>
                    <span className="text-gray-700 dark:text-gray-200 text-base"><strong>Address:</strong> KL University, Vijayawada.</span>
                </div>
            </section>
        </AnimatedPage>
    );
};

export default Home;