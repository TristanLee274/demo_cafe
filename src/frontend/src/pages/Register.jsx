import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // Reuse login styles

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        confirm_password: '',
        phone: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirm_password) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);

        try {
            await register({
                email: formData.email,
                password: formData.password,
                full_name: formData.full_name,
                phone: formData.phone
            });
            navigate('/login');
        } catch (err) {
            setError(err.message || 'Registration failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page section">
            <div className="container">
                <div className="login-card card animate-fade-in-up">
                    <div className="section-header">
                        <h2>Create Account</h2>
                        <p>Join us for the best coffee experience</p>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="full_name">Full Name</label>
                            <input
                                type="text"
                                id="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="confirm_password">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary full-width" disabled={isLoading}>
                            {isLoading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>Already have an account? <Link to="/login">Sign In</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
