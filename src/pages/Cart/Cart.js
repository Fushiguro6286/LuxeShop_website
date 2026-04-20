import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiArrowRight, FiTrash2 } from 'react-icons/fi';
import useCart from '../../hooks/useCart';
import CartItem from '../../components/CartItem/CartItem';
import { formatPrice, calculateCartTotals } from '../../utils/helpers';
import './Cart.css';

const Cart = () => {
  const { cartItems, clearCart } = useCart();
  const totals = calculateCartTotals(cartItems);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page container">
        <motion.div
          className="empty-state"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FiShoppingCart />
          <h3>Your cart is empty</h3>
          <p>Add some products and they'll appear here.</p>
          <Link to="/products" className="btn-primary">
            Start Shopping <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      {/* Header */}
      <motion.div
        className="cart-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h1 className="section-title">
            Shopping <span>Cart</span>
          </h1>
          <p className="cart-subtitle">{totals.itemCount} item{totals.itemCount !== 1 ? 's' : ''} in cart</p>
        </div>
        <button className="clear-cart-btn" onClick={clearCart}>
          <FiTrash2 /> Clear Cart
        </button>
      </motion.div>

      {/* Layout */}
      <div className="cart-layout">
        {/* Items */}
        <div className="cart-items-list">
          <AnimatePresence>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <motion.div
          className="cart-summary"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <h3 className="summary-title">Order Summary</h3>

          <div className="summary-rows">
            <div className="summary-row">
              <span>Subtotal ({totals.itemCount} items)</span>
              <span>{formatPrice(totals.subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className={totals.shipping === 0 ? 'free-shipping' : ''}>
                {totals.shipping === 0 ? 'FREE' : formatPrice(totals.shipping)}
              </span>
            </div>
            <div className="summary-row">
              <span>Tax (8%)</span>
              <span>{formatPrice(totals.tax)}</span>
            </div>
          </div>

          <div className="summary-divider" />

          <div className="summary-total">
            <span>Total</span>
            <span>{formatPrice(totals.total)}</span>
          </div>

          {totals.shipping === 0 && (
            <div className="free-shipping-notice">
              🎉 You qualify for free shipping!
            </div>
          )}

          <Link to="/checkout" className="btn-primary checkout-btn">
            Proceed to Checkout <FiArrowRight />
          </Link>

          <Link to="/products" className="continue-shopping">
            ← Continue Shopping
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;
