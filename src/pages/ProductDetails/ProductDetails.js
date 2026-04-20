import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiShoppingCart,
  FiHeart,
  FiArrowLeft,
  FiStar,
  FiPackage,
  FiShield,
  FiRefreshCw,
} from 'react-icons/fi';
import { HiHeart } from 'react-icons/hi';
import { productService } from '../../services/api';
import useCart from '../../hooks/useCart';
import useWishlist from '../../hooks/useWishlist';
import { formatPrice, capitalize } from '../../utils/helpers';
import './ProductDetails.css';

const PERKS = [
  { icon: <FiPackage />, label: 'Free shipping over $50' },
  { icon: <FiShield />, label: '2-year warranty included' },
  { icon: <FiRefreshCw />, label: '30-day returns' },
];

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Product not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="details-page container">
        <div className="details-skeleton">
          <div className="skeleton-img" />
          <div className="skeleton-content">
            {[80, 60, 40, 90, 50].map((w, i) => (
              <div key={i} className="skeleton-line" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container details-page">
        <div className="empty-state">
          <p>{error || 'Product not found.'}</p>
          <Link to="/products" className="btn-primary">Back to Products</Link>
        </div>
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);
  const ratePercent = (product.rating?.rate / 5) * 100;
  const fullStars = Math.floor(product.rating?.rate || 0);
  const emptyStars = 5 - fullStars;

  return (
    <motion.div
      className="details-page container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <nav className="breadcrumb">
        <Link to="/products" className="breadcrumb-back">
          <FiArrowLeft /> Back to Products
        </Link>
        <span>/</span>
        <span className="breadcrumb-cat">{capitalize(product.category)}</span>
      </nav>

      <div className="details-layout">

        <motion.div
          className="details-image-wrap"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={product.image} alt={product.title} className="details-image" />
          <div className="details-category-badge">
            {capitalize(product.category)}
          </div>
        </motion.div>

        <motion.div
          className="details-info"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="details-title">{product.title}</h1>

          <div className="details-rating">
            <div className="stars">
              {Array.from({ length: fullStars }).map((_, i) => (
                <FiStar key={`f${i}`} className="star-filled" />
              ))}
              {Array.from({ length: emptyStars }).map((_, i) => (
                <FiStar key={`e${i}`} className="star-empty" />
              ))}
            </div>
            <span className="rating-text">
              {product.rating?.rate} / 5
            </span>
            <span className="rating-count">
              ({product.rating?.count} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="details-price">
            {formatPrice(product.price)}
          </div>

          {/* Description */}
          <p className="details-description">{product.description}</p>

          {/* Perks */}
          <div className="details-perks">
            {PERKS.map((perk, i) => (
              <div key={i} className="perk-item">
                <span className="perk-icon">{perk.icon}</span>
                <span>{perk.label}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="details-actions">
            <button
              className={`btn-add-cart ${inCart ? 'in-cart' : ''}`}
              onClick={() => addToCart(product)}
            >
              <FiShoppingCart />
              {inCart ? 'In Cart — Add More' : 'Add to Cart'}
            </button>

            <button
              className={`btn-wishlist ${inWishlist ? 'active' : ''}`}
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle wishlist"
            >
              {inWishlist ? <HiHeart /> : <FiHeart />}
            </button>
          </div>

          {inCart && (
            <Link to="/cart" className="go-to-cart-link">
              View Cart →
            </Link>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
