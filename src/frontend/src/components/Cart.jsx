import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart() {
    const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="cart-overlay" onClick={closeCart}></div>
            <div className="cart-drawer">
                <div className="cart-header">
                    <h3>Giỏ Hàng</h3>
                    <button className="btn-ghost close-btn" onClick={closeCart}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {items.length === 0 ? (
                    <div className="cart-empty">
                        <span className="cart-empty-icon">☕</span>
                        <p>Giỏ hàng trống</p>
                        <button className="btn btn-secondary" onClick={closeCart}>
                            Tiếp tục mua sắm
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {items.map(({ product, quantity }) => (
                                <div key={product.id} className="cart-item">
                                    <img src={product.image_url} alt={product.name} className="cart-item-image" />
                                    <div className="cart-item-info">
                                        <h4>{product.name}</h4>
                                        <span className="cart-item-price">{formatPrice(product.price)}</span>
                                    </div>
                                    <div className="cart-item-actions">
                                        <div className="quantity-controls">
                                            <button onClick={() => updateQuantity(product.id, quantity - 1)}>−</button>
                                            <span>{quantity}</span>
                                            <button onClick={() => updateQuantity(product.id, quantity + 1)}>+</button>
                                        </div>
                                        <button className="remove-btn" onClick={() => removeItem(product.id)}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="3,6 5,6 21,6"></polyline>
                                                <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6M8,6V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-footer">
                            <div className="cart-total">
                                <span>Tổng cộng:</span>
                                <span className="total-price">{formatPrice(totalPrice)}</span>
                            </div>
                            <Link to="/checkout" className="btn btn-primary checkout-btn" onClick={closeCart}>
                                Thanh Toán
                            </Link>
                            <button className="btn btn-ghost clear-btn" onClick={clearCart}>
                                Xóa giỏ hàng
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Cart;
