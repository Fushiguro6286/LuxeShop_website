import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

const ProductGrid = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="product-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-image" />
            <div className="skeleton-body">
              <div className="skeleton-line long" />
              <div className="skeleton-line medium" />
              <div className="skeleton-line short" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="grid-empty">
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="product-grid"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;
