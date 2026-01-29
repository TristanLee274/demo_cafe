import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Double check auth, although Route should protect it.
        if (!user) {
            // navigate('/login'); // Handled by Protected Route typically, or do here.
            return;
        }

        const fetchOrders = async () => {
            try {
                const data = await api.getMyOrders();
                setOrders(data);
            } catch (err) {
                console.error("Failed to fetch orders", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) return null;

    return (
        <div className="section">
            <div className="container">
                <div className="grid grid-2 animate-fade-in-up">

                    {/* User Info Card */}
                    <div className="card" style={{ padding: '2rem', height: 'fit-content' }}>
                        <h2 style={{
                            marginBottom: '1.5rem',
                            background: 'var(--gradient-primary)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontSize: '2rem'
                        }}>My Profile</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Full Name</label>
                                <div style={{ fontSize: '1.2rem', fontWeight: '500' }}>{user.full_name || 'N/A'}</div>
                            </div>
                            <div>
                                <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email</label>
                                <div style={{ fontSize: '1.1rem' }}>{user.email}</div>
                            </div>
                            <div>
                                <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Phone</label>
                                <div style={{ fontSize: '1.1rem' }}>{user.phone || 'N/A'}</div>
                            </div>
                            <div>
                                <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Role</label>
                                <div className="badge" style={{ marginTop: '0.5rem' }}>{user.role}</div>
                            </div>

                            <button onClick={handleLogout} className="btn btn-secondary" style={{ marginTop: '2rem' }}>
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Order History */}
                    <div>
                        <h2 style={{
                            marginBottom: '1.5rem',
                            fontSize: '2rem',
                            color: 'var(--text-primary)'
                        }}>Order History</h2>

                        {loading ? (
                            <div className="skeleton" style={{ height: '200px', width: '100%' }}></div>
                        ) : orders.length === 0 ? (
                            <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                <p>You haven't placed any orders yet.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {orders.map(order => (
                                    <div key={order.id} className="card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ marginBottom: '0.5rem' }}>
                                                <span style={{ color: 'var(--text-secondary)' }}>Order #</span>
                                                <span style={{ fontWeight: 'bold' }}>{order.id}</span>
                                            </div>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </div>
                                        </div>

                                        <div style={{ textAlign: 'right' }}>
                                            <div className="price" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                                                ${order.total.toFixed(2)}
                                            </div>
                                            <span className="badge" style={{
                                                background: order.status === 'pending' ? 'var(--color-accent)' :
                                                    order.status === 'completed' ? 'green' : 'gray',
                                                color: 'var(--bg-dark)'
                                            }}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
