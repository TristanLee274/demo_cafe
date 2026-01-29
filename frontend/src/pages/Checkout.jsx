import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './Checkout.css';

function Checkout() {
    const navigate = useNavigate();
    const { items, totalPrice, clearCart } = useCart();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [formData, setFormData] = useState({
        customer_name: '',
        email: '',
        phone: '',
        address: '',
        notes: ''
    });
    const [errors, setErrors] = useState({});

    // Pre-fill form if user is logged in
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                customer_name: user.full_name || '',
                email: user.email || '',
                phone: user.phone || ''
            }));
        }
    }, [user]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.customer_name.trim()) newErrors.customer_name = 'Vui lòng nhập họ tên';
        if (!formData.email.trim()) newErrors.email = 'Vui lòng nhập email';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email không hợp lệ';
        if (!formData.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
        if (!formData.address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const orderData = {
                ...formData,
                items: items.map(item => ({
                    product_id: item.product.id,
                    quantity: item.quantity
                }))
            };

            const response = await api.createOrder(orderData);
            setOrderId(response.id);
            setOrderComplete(true);
            clearCart();
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    if (orderComplete) {
        return (
            <div className="checkout-page">
                <div className="container">
                    <div className="order-success">
                        <div className="success-icon">✓</div>
                        <h1>Đặt Hàng Thành Công!</h1>
                        <p>Cảm ơn bạn đã đặt hàng. Mã đơn hàng của bạn là:</p>
                        <span className="order-id">#{orderId}</span>
                        <p>Chúng tôi sẽ liên hệ với bạn sớm nhất!</p>
                        <div className="success-actions">
                            <Link to="/" className="btn btn-primary">Về Trang Chủ</Link>
                            <Link to="/products" className="btn btn-secondary">Tiếp Tục Mua Sắm</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="checkout-page">
                <div className="container">
                    <div className="empty-cart">
                        <span className="empty-icon">🛒</span>
                        <h2>Giỏ hàng trống</h2>
                        <p>Hãy thêm sản phẩm vào giỏ hàng trước khi thanh toán</p>
                        <Link to="/products" className="btn btn-primary">Khám Phá Menu</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="container">
                <h1>Thanh Toán</h1>

                <div className="checkout-grid">
                    <form className="checkout-form" onSubmit={handleSubmit}>
                        <h2>Thông Tin Giao Hàng</h2>

                        <div className="input-group">
                            <label htmlFor="customer_name">Họ và Tên *</label>
                            <input
                                type="text"
                                id="customer_name"
                                name="customer_name"
                                value={formData.customer_name}
                                onChange={handleChange}
                                placeholder="Nguyễn Văn A"
                                className={errors.customer_name ? 'error' : ''}
                            />
                            {errors.customer_name && <span className="error-text">{errors.customer_name}</span>}
                        </div>

                        <div className="input-row">
                            <div className="input-group">
                                <label htmlFor="email">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="email@example.com"
                                    className={errors.email ? 'error' : ''}
                                />
                                {errors.email && <span className="error-text">{errors.email}</span>}
                            </div>
                            <div className="input-group">
                                <label htmlFor="phone">Số Điện Thoại *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="0901234567"
                                    className={errors.phone ? 'error' : ''}
                                />
                                {errors.phone && <span className="error-text">{errors.phone}</span>}
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="address">Địa Chỉ Giao Hàng *</label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Số nhà, đường, phường/xã, quận/huyện, thành phố"
                                rows="3"
                                className={errors.address ? 'error' : ''}
                            />
                            {errors.address && <span className="error-text">{errors.address}</span>}
                        </div>

                        <div className="input-group">
                            <label htmlFor="notes">Ghi Chú (Tùy chọn)</label>
                            <textarea
                                id="notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="Ví dụ: Giao hàng giờ hành chính, ít đường..."
                                rows="2"
                            />
                        </div>
                    </form>

                    <div className="order-summary">
                        <h2>Đơn Hàng</h2>

                        <div className="order-items">
                            {items.map(({ product, quantity }) => (
                                <div key={product.id} className="order-item">
                                    <img src={product.image_url} alt={product.name} />
                                    <div className="order-item-info">
                                        <h4>{product.name}</h4>
                                        <span className="order-item-qty">x{quantity}</span>
                                    </div>
                                    <span className="order-item-price">{formatPrice(product.price * quantity)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="order-totals">
                            <div className="order-row">
                                <span>Tạm tính</span>
                                <span>{formatPrice(totalPrice)}</span>
                            </div>
                            <div className="order-row">
                                <span>Phí giao hàng</span>
                                <span className="free">Miễn phí</span>
                            </div>
                            <div className="order-row total">
                                <span>Tổng cộng</span>
                                <span className="total-price">{formatPrice(totalPrice)}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary submit-order-btn"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Đang xử lý...
                                </>
                            ) : (
                                `Đặt Hàng - ${formatPrice(totalPrice)}`
                            )}
                        </button>

                        <p className="order-note">
                            Bằng việc đặt hàng, bạn đồng ý với Điều khoản sử dụng của chúng tôi.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
