import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../api/axiosConfig';
import AnimatedPage from '../components/AnimatedPage';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('/auth/login', { email, password });
            login(response.data);
            toast.success('Logged in successfully!');
            if (response.data.role === 'ROLE_SELLER') {
                navigate('/seller-dashboard');
                    window.location.reload();
            } else {
                navigate('/buyer-dashboard');
                    window.location.reload();
            }
        } catch (err) {
            setError('Invalid email or password.');
            toast.error('Invalid email or password.');
            console.error(err);
        }
    };

    return (
        <AnimatedPage>
            <div className="flex justify-center">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-center">Login</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 mt-1 border rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 mt-1 border rounded-md"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button type="submit" className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                            Login
                        </button>
                    </form>
                    <p className="text-sm text-center">
                        Don't have an account? <Link to="/register" className="text-indigo-600 hover:underline">Register here</Link>
                    </p>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default Login;