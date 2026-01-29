import React from 'react';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { user } = useAuth();

    return (
        <div className="admin-dashboard container">
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {user?.full_name}!</p>
            <div className="admin-stats">
                <div className="stat-card">
                    <h3>Orders</h3>
                    <p>0</p>
                </div>
                <div className="stat-card">
                    <h3>Users</h3>
                    <p>0</p>
                </div>
                <div className="stat-card">
                    <h3>Revenue</h3>
                    <p>0 ₫</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
