import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

function ProductCard({ product }) {
    const { addItem } = useCart();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
    };

    return (
        <Link to={`/products/${product.id}`} className="product-card card">
            <div className="product-image-wrapper">
                <img
                    src={product.image_url}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                />
                <div className="product-overlay">
                    <button className="btn btn-primary add-to-cart-btn" onClick={handleAddToCart}>
                        Thêm vào giỏ
                    </button>
                </div>
            </div>
            <div className="product-info">
                {product.category && (
                    <span className="product-category">{product.category.name}</span>
                )}
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                    <span className="price">{formatPrice(product.price)}</span>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
