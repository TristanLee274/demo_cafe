import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import './Home.css';

function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [products, cats] = await Promise.all([
                    api.getFeaturedProducts(6),
                    api.getCategories()
                ]);
                setFeaturedProducts(products);
                setCategories(cats);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg"></div>
                <div className="container hero-content">
                    <div className="hero-text animate-fade-in-up">
                        <span className="hero-tagline">☕ Premium Coffee Experience</span>
                        <h1>Thưởng Thức<br /><span className="highlight">Cà Phê Đậm Đà</span></h1>
                        <p>Khám phá hương vị cà phê tuyệt hảo từ những hạt cà phê được tuyển chọn kỹ lưỡng, rang xay thủ công theo phương pháp truyền thống.</p>
                        <div className="hero-actions">
                            <Link to="/products" className="btn btn-primary">
                                Khám Phá Menu
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </Link>
                            <Link to="/about" className="btn btn-secondary">Về Chúng Tôi</Link>
                        </div>
                    </div>
                    <div className="hero-image animate-float">
                        <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600" alt="Coffee" />
                        <div className="hero-badge">
                            <span className="badge-number">100%</span>
                            <span className="badge-text">Arabica</span>
                        </div>
                    </div>
                </div>
                <div className="hero-scroll">
                    <span>Cuộn xuống</span>
                    <div className="scroll-indicator"></div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features section">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-card glass">
                            <div className="feature-icon">🌱</div>
                            <h3>Organic</h3>
                            <p>Hạt cà phê hữu cơ, không thuốc trừ sâu, an toàn cho sức khỏe</p>
                        </div>
                        <div className="feature-card glass">
                            <div className="feature-icon">🔥</div>
                            <h3>Fresh Roasted</h3>
                            <p>Rang xay mỗi ngày, đảm bảo hương vị tươi mới nhất</p>
                        </div>
                        <div className="feature-card glass">
                            <div className="feature-icon">🚀</div>
                            <h3>Fast Delivery</h3>
                            <p>Giao hàng nhanh trong 30 phút nội thành</p>
                        </div>
                        <div className="feature-card glass">
                            <div className="feature-icon">💝</div>
                            <h3>Made with Love</h3>
                            <p>Pha chế tận tâm bởi đội ngũ barista chuyên nghiệp</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories section">
                <div className="container">
                    <div className="section-header">
                        <h2>Danh Mục</h2>
                        <p>Khám phá các loại đồ uống đa dạng của chúng tôi</p>
                    </div>
                    <div className="categories-grid">
                        {categories.map((cat, index) => (
                            <Link
                                to={`/products?category=${cat.id}`}
                                key={cat.id}
                                className="category-card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <img src={cat.image_url} alt={cat.name} />
                                <div className="category-overlay">
                                    <h3>{cat.name}</h3>
                                    <p>{cat.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured section">
                <div className="container">
                    <div className="section-header">
                        <h2>Sản Phẩm Nổi Bật</h2>
                        <p>Những ly cà phê được yêu thích nhất</p>
                    </div>
                    {loading ? (
                        <div className="loading-grid grid grid-3">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="skeleton product-skeleton"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-3">
                            {featuredProducts.map((product, index) => (
                                <div key={product.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate-fade-in-up">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="section-footer">
                        <Link to="/products" className="btn btn-secondary">
                            Xem Tất Cả Sản Phẩm
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about-preview section">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-images">
                            <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400" alt="Coffee beans" className="about-img-1" />
                            <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400" alt="Barista" className="about-img-2" />
                        </div>
                        <div className="about-content">
                            <span className="about-tagline">Câu Chuyện Của Chúng Tôi</span>
                            <h2>Từ Hạt Cà Phê<br />Đến Tách Cà Phê Hoàn Hảo</h2>
                            <p>Chúng tôi tin rằng mỗi tách cà phê là một tác phẩm nghệ thuật. Từ việc tuyển chọn những hạt cà phê tốt nhất từ Đà Lạt, rang xay thủ công theo công thức riêng, đến việc pha chế bởi những barista giàu kinh nghiệm.</p>
                            <div className="about-stats">
                                <div className="stat">
                                    <span className="stat-number">10+</span>
                                    <span className="stat-label">Năm Kinh Nghiệm</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">50K+</span>
                                    <span className="stat-label">Khách Hàng</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">20+</span>
                                    <span className="stat-label">Loại Cà Phê</span>
                                </div>
                            </div>
                            <Link to="/about" className="btn btn-primary">Tìm Hiểu Thêm</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta section">
                <div className="container">
                    <div className="cta-card glass">
                        <div className="cta-content">
                            <h2>Đăng Ký Nhận Ưu Đãi</h2>
                            <p>Nhận ngay voucher giảm 20% cho đơn hàng đầu tiên!</p>
                        </div>
                        <form className="cta-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Email của bạn" />
                            <button type="submit" className="btn btn-primary">Đăng Ký</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
