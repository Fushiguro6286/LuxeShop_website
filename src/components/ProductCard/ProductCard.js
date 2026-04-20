import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { HiHeart } from 'react-icons/hi';
import useCart from '../../hooks/useCart';
import useWishlist from '../../hooks/useWishlist';
import { formatPrice, truncateText } from '../../utils/helpers';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <motion.div
      className="product-card"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <Link to={`/products/${product.id}`} className="card-link">

        <div className="card-image-wrap">
          <img
            src={product.image}
            alt={product.title}
            className="card-image"
            loading="lazy"
            onError={(e) => { e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23f0c040" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" font-size="14" fill="%230a0a0f" text-anchor="middle" dy=".3em"%3EProduct%3C/text%3E%3C/svg%3E'; }}
          />
          <div className="card-overlay">
            <span className="card-category">{product.category}</span>
          </div>
          <button
            className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
            onClick={handleWishlist}
            aria-label="Add to wishlist"
          >
            {inWishlist ? <HiHeart /> : <FiHeart />}
          </button>
        </div>

        <div className="card-info">
          <h3 className="card-title">{truncateText(product.title, 55)}</h3>

          <div className="card-meta">
            <div className="card-rating">
              <FiStar className="star-icon" />
              <span>{product.rating?.rate}</span>
              <span className="rating-count">({product.rating?.count})</span>
            </div>
            <span className="card-price">{formatPrice(product.price)}</span>
          </div>

          <button
            className={`add-to-cart-btn ${inCart ? 'in-cart' : ''}`}
            onClick={handleAddToCart}
          >
            <FiShoppingCart />
            {inCart ? 'In Cart' : 'Add to Cart'}
          </button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
