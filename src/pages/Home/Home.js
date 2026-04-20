import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiShoppingBag, FiStar, FiTruck, FiShield, FiCreditCard } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { productService } from '../../services/api';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import './Home.css';

const BENTOS = [
  { icon: <FiShoppingBag />, title: 'Curated Selection', desc: 'Handpicked products across every category', size: 'large' },
  { icon: <FiTruck />, title: 'Global Fast Shipping', desc: 'Free shipping on orders over $150', size: 'tall' },
  { icon: <FiShield />, title: 'Secure Checkout', desc: 'Bank-level encrypted transactions', size: 'small' },
  { icon: <FiCreditCard />, title: 'Flexible Payments', desc: 'Pay instantly or over time', size: 'small' },
  { icon: <FiStar />, title: 'Top Rated Quality', desc: 'Only the highest rated items make the cut', size: 'wide' },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  const heroProducts = useMemo(() => {
    if (!featured.length) {
      return [
        { id: 1, image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg', title: 'Product 1' },
        { id: 2, image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg', title: 'Product 2' },
        { id: 3, image: 'https://fakestoreapi.com/img/71li-ujtlHZ._AC_UX679_.jpg', title: 'Product 3' },
      ];
    }
    const shuffled = [...featured].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }, [featured]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await productService.getAllProducts(8);
        setFeatured(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content container">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="hero-badge">
              <HiSparkles />
              <span>New arrivals every week</span>
            </div>
            <h1 className="hero-title">
              Discover <span>Premium</span><br />
              Products You'll Love
            </h1>
            <p className="hero-subtitle">
              Explore thousands of curated products across electronics, fashion,
              jewelry and more — all in one place.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn-primary">
                Shop Now <FiArrowRight />
              </Link>
              <Link to="/wishlist" className="btn-secondary">
                My Wishlist
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="hero-slider-wrapper">
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation={true}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                loop={true}
                className="hero-swiper"
              >
                {heroProducts.map((p, i) => (
                  <SwiperSlide key={p.id || i}>
                    <Link to={`/products/${p.id}`} className="hero-slide-link">
                      <img src={p.image} alt={p.title || 'Product'} />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        </div>

        {/* Decorative */}
        <div className="hero-glow" />
      </section>

      {/* Bento Grid Features */}
      <section className="features-section container">
        <div className="bento-grid">
          {BENTOS.map((b, i) => (
            <motion.div
              key={i}
              className={`bento-card bento-${b.size}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="bento-icon">{b.icon}</div>
              <div className="bento-content">
                <h4>{b.title}</h4>
                <p>{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Infinite Marquee */}
      <section className="marquee-section">
        <div className="marquee-container">
          <div className="marquee-track">
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="marquee-content">
                <Link to="/products?category=electronics" className="marquee-link">Electronics</Link> <HiSparkles className="mx-icon" />
                <Link to="/products?category=men's clothing" className="marquee-link">Men's Fashion</Link> <HiSparkles className="mx-icon" />
                <Link to="/products?category=jewelery" className="marquee-link">Jewelry</Link> <HiSparkles className="mx-icon" />
                <Link to="/products?category=women's clothing" className="marquee-link">Women's Fashion</Link> <HiSparkles className="mx-icon" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="featured-section container">
        <div className="section-header">
          <h2 className="section-title">
            Featured <span>Products</span>
          </h2>
          <Link to="/products" className="btn-secondary">
            View All <FiArrowRight />
          </Link>
        </div>

        <ProductGrid products={featured} loading={loading} />
      </section>

      {/* CTA Banner */}
      <section className="cta-banner container">
        <motion.div
          className="cta-inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>Ready to find your next favourite thing?</h2>
          <p>Browse thousands of products with unbeatable prices.</p>
          <Link to="/products" className="btn-primary">
            Explore the Store <FiArrowRight />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
