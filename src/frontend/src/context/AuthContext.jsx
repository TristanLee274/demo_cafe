import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // We assume api.getCurrentUser() is implemented
                    const userData = await api.getCurrentUser();
                    setUser(userData);
                } catch (error) {
                    console.error("Auth check failed:", error);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        const response = await api.login({ email, password });
        if (response.access_token) {
            localStorage.setItem('token', response.access_token);
            // Verify if login returns user object or we need to fetch it
            if (response.user) {
                setUser(response.user);
            } else {
                const userData = await api.getCurrentUser();
                setUser(userData);
            }
        }
        return response;
    };

    const register = async (userData) => {
        return await api.register(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
