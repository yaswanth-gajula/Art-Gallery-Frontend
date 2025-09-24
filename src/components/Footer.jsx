import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-auto transition-colors duration-300">
            <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
                <p>&copy; {new Date().getFullYear()} Art Gallery. All Rights Reserved.</p>
                 <p className="text-sm mt-1">Built by CICD-S111</p>
            </div>
        </footer>
    );
};

export default Footer;