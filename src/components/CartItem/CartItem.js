import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import useCart from '../../hooks/useCart';
import { formatPrice, truncateText } from '../../utils/helpers';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const handleDecrease = () => {
    if (item.quantity === 1) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <motion.div
      className="cart-item"
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/products/${item.id}`} className="cart-item-image-wrap">
        <img src={item.image} alt={item.title} className="cart-item-image" />
      </Link>

      <div className="cart-item-info">
        <Link to={`/products/${item.id}`} className="cart-item-title">
          {truncateText(item.title, 60)}
        </Link>
        <span className="cart-item-category">{item.category}</span>
        <span className="cart-item-price">{formatPrice(item.price)}</span>
      </div>

      <div className="cart-item-controls">
        <div className="quantity-control">
          <button className="qty-btn" onClick={handleDecrease} aria-label="Decrease">
            <FiMinus />
          </button>
          <span className="qty-value">{item.quantity}</span>
          <button className="qty-btn" onClick={handleIncrease} aria-label="Increase">
            <FiPlus />
          </button>
        </div>

        <span className="cart-item-total">
          {formatPrice(item.price * item.quantity)}
        </span>

        <button
          className="remove-btn"
          onClick={() => removeFromCart(item.id)}
          aria-label="Remove item"
        >
          <FiTrash2 />
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;
