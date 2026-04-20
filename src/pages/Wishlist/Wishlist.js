import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiArrowRight } from 'react-icons/fi';
import useWishlist from '../../hooks/useWishlist';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlistItems, wishlistCount } = useWishlist();

  return (
    <div className="wishlist-page container">
      <motion.div
        className="wishlist-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="section-title">
          My <span>Wishlist</span>
        </h1>
        <p className="wishlist-subtitle">
          {wishlistCount > 0
            ? `${wishlistCount} saved item${wishlistCount !== 1 ? 's' : ''}`
            : 'No items yet'}
        </p>
      </motion.div>

      {wishlistCount === 0 ? (
        <motion.div
          className="empty-state"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FiHeart />
          <h3>Your wishlist is empty</h3>
          <p>Save products you love and find them here later.</p>
          <Link to="/products" className="btn-primary">
            Explore Products <FiArrowRight />
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <ProductGrid products={wishlistItems} loading={false} />
        </motion.div>
      )}
    </div>
  );
};

export default Wishlist;
