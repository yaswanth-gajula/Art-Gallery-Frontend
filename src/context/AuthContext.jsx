import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            const decodedToken = jwtDecode(parsedUser.token);
            if (decodedToken.exp * 1000 > Date.now()) {
                setUser(parsedUser);
            } else {
                // Token expired
                localStorage.removeItem('user');
            }
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const isAuthenticated = !!user;
    const isBuyer = user?.role === 'ROLE_BUYER';
    const isSeller = user?.role === 'ROLE_SELLER';

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isBuyer, isSeller }}>
            {children}
        </AuthContext.Provider>
    );
};