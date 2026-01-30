import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';

function Header() {
    const location = useLocation();
    const { totalItems, toggleCart } = useCart();
    const { user, logout } = useAuth();

    const navLinks = [
        { path: '/', label: 'Trang Chủ' },
        { path: '/products', label: 'Menu' },
        { path: '/about', label: 'Về Chúng Tôi' },
        { path: '/contact', label: 'Liên Hệ' },
    ];

    return (
        <header className="header">
            <div className="container header-container">
                <Link to="/" className="logo">
                    <span className="logo-icon">☕</span>
                    <span className="logo-text">Coffee House</span>
                </Link>

                <nav className="nav">
                    {navLinks.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="header-actions">
                    {user ? (
                        <div className="user-info">
                            {user.role === 'admin' && (
                                <Link to="/admin" className="admin-link">Admin</Link>
                            )}
                            <Link to="/profile" className="profile-link">{user.full_name}</Link>
                            <button onClick={logout} className="btn-ghost logout-btn">Logout</button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary sign-in-btn">
                            Sign In
                        </Link>
                    )}

                    <button className="btn-icon cart-btn" onClick={toggleCart}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        {totalItems > 0 && <span className="badge cart-badge">{totalItems}</span>}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
