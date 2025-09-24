import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import AnimatedPage from '../components/AnimatedPage';
import toast from 'react-hot-toast';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('BUYER');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/auth/register', { name, email, password, roles: [role] });
            toast.success('Registration successful! Please log in.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
            toast.error(err.response?.data?.message || 'Registration failed.');
        }
    };

    return (
        <AnimatedPage>
            <div className="flex justify-center">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-center">Register</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium">Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 mt-1 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 mt-1 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 mt-1 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">I am a...</label>
                            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2 mt-1 border rounded-md">
                                <option value="BUYER">Buyer</option>
                                <option value="SELLER">Seller</option>
                            </select>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button type="submit" className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                            Register
                        </button>
                    </form>
                     <p className="text-sm text-center">
                        Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login here</Link>
                    </p>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default Register;