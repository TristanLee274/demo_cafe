import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import './Products.css';

function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const activeCategory = searchParams.get('category');

    useEffect(() => {
        async function fetchCategories() {
            try {
                const cats = await api.getCategories();
                setCategories(cats);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        fetchCategories();
    }, []);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                const data = await api.getProducts(activeCategory, searchTerm || null);
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [activeCategory, searchTerm]);

    const handleCategoryChange = (categoryId) => {
        if (categoryId) {
            setSearchParams({ category: categoryId });
        } else {
            setSearchParams({});
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="products-page">
            <div className="products-hero">
                <div className="container">
                    <h1>Menu</h1>
                    <p>Khám phá các loại cà phê và đồ uống tuyệt vời của chúng tôi</p>
                </div>
            </div>

            <div className="container products-container">
                <aside className="products-sidebar">
                    <div className="search-box">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>

                    <div className="filter-section">
                        <h3>Danh Mục</h3>
                        <ul className="category-list">
                            <li>
                                <button
                                    className={`category-btn ${!activeCategory ? 'active' : ''}`}
                                    onClick={() => handleCategoryChange(null)}
                                >
                                    Tất Cả
                                </button>
                            </li>
                            {categories.map(cat => (
                                <li key={cat.id}>
                                    <button
                                        className={`category-btn ${activeCategory === String(cat.id) ? 'active' : ''}`}
                                        onClick={() => handleCategoryChange(cat.id)}
                                    >
                                        {cat.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <main className="products-main">
                    <div className="products-header">
                        <p className="products-count">
                            {loading ? 'Đang tải...' : `${products.length} sản phẩm`}
                        </p>
                    </div>

                    {loading ? (
                        <div className="grid grid-3">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="skeleton product-skeleton"></div>
                            ))}
                        </div>
                    ) : products.length === 0 ? (
                        <div className="no-products">
                            <span className="no-products-icon">☕</span>
                            <p>Không tìm thấy sản phẩm</p>
                        </div>
                    ) : (
                        <div className="grid grid-3">
                            {products.map((product, index) => (
                                <div
                                    key={product.id}
                                    className="animate-fade-in-up"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Products;
