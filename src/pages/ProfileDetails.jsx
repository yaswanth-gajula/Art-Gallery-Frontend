import React, { useState } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { useAuth } from '../hooks/useAuth';
import api from '../api/axiosConfig';
import toast from 'react-hot-toast';

const ProfileDetails = () => {
    const { user } = useAuth();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword.length < 6) {
            toast.error("New password must be at least 6 characters long.");
            return;
        }
        setLoading(true);
        try {
            const response = await api.post('/user/change-password', { currentPassword, newPassword });
            toast.success(response.data.message);
            setCurrentPassword('');
            setNewPassword('');
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <AnimatedPage>
            <h1 className="text-3xl font-bold mb-6 dark:text-white">My Details</h1>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                        <p className="text-lg dark:text-white">{user.name}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                        <p className="text-lg dark:text-white">{user.email}</p>
                    </div>
                     <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</label>
                        <p className="text-lg dark:text-white">{user.role === 'ROLE_SELLER' ? 'Seller' : 'Buyer'}</p>
                    </div>
                    <div className="pt-4 border-t dark:border-gray-700">
                        <h2 className="text-xl font-semibold mb-2 dark:text-white">Change Password</h2>
                        <form onSubmit={handleSubmit} className="space-y-3">
                             <div>
                                <label className="block text-sm font-medium dark:text-gray-300">Current Password</label>
                                <input 
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                    required
                                />
                            </div>
                             <div>
                                <label className="block text-sm font-medium dark:text-gray-300">New Password</label>
                                <input 
                                    type="password" 
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                    required
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Updating...' : 'Update Password'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default ProfileDetails;