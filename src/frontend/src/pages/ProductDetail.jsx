import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../services/api';
import './ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const { addItem } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const data = await api.getProduct(id);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const handleAddToCart = () => {
        addItem(product, quantity);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    if (loading) {
        return (
            <div className="product-detail-page">
                <div className="container">
                    <div className="product-detail-skeleton">
                        <div className="skeleton image-skeleton"></div>
                        <div className="info-skeleton">
                            <div className="skeleton title-skeleton"></div>
                            <div className="skeleton price-skeleton"></div>
                            <div className="skeleton desc-skeleton"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-detail-page">
                <div className="container">
                    <div className="not-found">
                        <h2>Không tìm thấy sản phẩm</h2>
                        <Link to="/products" className="btn btn-primary">Quay lại Menu</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="product-detail-page">
            <div className="container">
                <nav className="breadcrumb">
                    <Link to="/">Trang Chủ</Link>
                    <span>/</span>
                    <Link to="/products">Menu</Link>
                    <span>/</span>
                    <span>{product.name}</span>
                </nav>

                <div className="product-detail">
                    <div className="product-gallery">
                        <div className="main-image">
                            <img src={product.image_url} alt={product.name} />
                        </div>
                    </div>

                    <div className="product-info">
                        {product.category && (
                            <Link to={`/products?category=${product.category.id}`} className="product-category-link">
                                {product.category.name}
                            </Link>
                        )}
                        <h1>{product.name}</h1>
                        <p className="product-description">{product.description}</p>

                        <div className="product-price">
                            <span className="price">{formatPrice(product.price)}</span>
                        </div>

                        <div className="product-actions">
                            <div className="quantity-selector">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    disabled={quantity <= 1}
                                >
                                    −
                                </button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)}>+</button>
                            </div>

                            <button
                                className={`btn btn-primary add-btn ${addedToCart ? 'added' : ''}`}
                                onClick={handleAddToCart}
                            >
                                {addedToCart ? (
                                    <>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        Đã Thêm
                                    </>
                                ) : (
                                    <>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="9" cy="21" r="1"></circle>
                                            <circle cx="20" cy="21" r="1"></circle>
                                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                        </svg>
                                        Thêm Vào Giỏ
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="product-features">
                            <div className="feature">
                                <span className="feature-icon">🌱</span>
                                <div>
                                    <strong>100% Tự Nhiên</strong>
                                    <p>Không chất bảo quản</p>
                                </div>
                            </div>
                            <div className="feature">
                                <span className="feature-icon">🔥</span>
                                <div>
                                    <strong>Rang Tươi</strong>
                                    <p>Rang xay mỗi ngày</p>
                                </div>
                            </div>
                            <div className="feature">
                                <span className="feature-icon">🚀</span>
                                <div>
                                    <strong>Giao Nhanh</strong>
                                    <p>30 phút nội thành</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
