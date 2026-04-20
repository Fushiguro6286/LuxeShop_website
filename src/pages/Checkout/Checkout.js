import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiCheck, FiLock } from 'react-icons/fi';
import useCart from '../../hooks/useCart';
import { formatPrice, calculateCartTotals, truncateText } from '../../utils/helpers';
import './Checkout.css';

// Validation schema
const schema = yup.object({
  firstName: yup.string().min(2).required('First name is required'),
  lastName: yup.string().min(2).required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().min(10, 'Min 10 digits').required('Phone is required'),
  address: yup.string().min(5).required('Address is required'),
  city: yup.string().min(2).required('City is required'),
  state: yup.string().min(2).required('State is required'),
  zipCode: yup.string().min(4).required('ZIP code is required'),
  cardNumber: yup
    .string()
    .matches(/^\d{16}$/, 'Must be 16 digits')
    .required('Card number is required'),
  expiry: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format MM/YY')
    .required('Expiry is required'),
  cvv: yup
    .string()
    .matches(/^\d{3,4}$/, '3 or 4 digits')
    .required('CVV is required'),
});

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const totals = calculateCartTotals(cartItems);
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async () => {
    setLoading(true);
    // Simulate order processing
    await new Promise((res) => setTimeout(res, 1800));
    setLoading(false);
    setOrderPlaced(true);
    clearCart();
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="checkout-page container">
        <div className="empty-state">
          <h3>Your cart is empty</h3>
          <p>Add items before checking out.</p>
          <Link to="/products" className="btn-primary">Shop Now</Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="checkout-page container">
        <motion.div
          className="order-success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="success-icon">
            <FiCheck />
          </div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your order. You'll receive a confirmation email shortly.</p>
          <div className="success-actions">
            <Link to="/products" className="btn-primary">Continue Shopping</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="checkout-header"
      >
        <Link to="/cart" className="back-link">
          <FiArrowLeft /> Back to Cart
        </Link>
        <h1 className="section-title">Checkout</h1>
      </motion.div>

      <div className="checkout-layout">
        {/* Form */}
        <motion.form
          className="checkout-form"
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Shipping */}
          <div className="form-section">
            <h3 className="form-section-title">Shipping Information</h3>
            <div className="form-row two-col">
              <div className="form-field">
                <label>First Name</label>
                <input
                  {...register('firstName')}
                  placeholder="John"
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="field-error">{errors.firstName.message}</span>}
              </div>
              <div className="form-field">
                <label>Last Name</label>
                <input
                  {...register('lastName')}
                  placeholder="Doe"
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="field-error">{errors.lastName.message}</span>}
              </div>
            </div>
            <div className="form-row two-col">
              <div className="form-field">
                <label>Email</label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="john@example.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="field-error">{errors.email.message}</span>}
              </div>
              <div className="form-field">
                <label>Phone</label>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="1234567890"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="field-error">{errors.phone.message}</span>}
              </div>
            </div>
            <div className="form-field">
              <label>Address</label>
              <input
                {...register('address')}
                placeholder="123 Main Street"
                className={errors.address ? 'error' : ''}
              />
              {errors.address && <span className="field-error">{errors.address.message}</span>}
            </div>
            <div className="form-row three-col">
              <div className="form-field">
                <label>City</label>
                <input
                  {...register('city')}
                  placeholder="New York"
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <span className="field-error">{errors.city.message}</span>}
              </div>
              <div className="form-field">
                <label>State</label>
                <input
                  {...register('state')}
                  placeholder="NY"
                  className={errors.state ? 'error' : ''}
                />
                {errors.state && <span className="field-error">{errors.state.message}</span>}
              </div>
              <div className="form-field">
                <label>ZIP Code</label>
                <input
                  {...register('zipCode')}
                  placeholder="10001"
                  className={errors.zipCode ? 'error' : ''}
                />
                {errors.zipCode && <span className="field-error">{errors.zipCode.message}</span>}
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="form-section">
            <h3 className="form-section-title">
              <FiLock /> Payment Details
            </h3>
            <div className="form-field">
              <label>Card Number</label>
              <input
                {...register('cardNumber')}
                placeholder="1234567890123456"
                maxLength={16}
                className={errors.cardNumber ? 'error' : ''}
              />
              {errors.cardNumber && <span className="field-error">{errors.cardNumber.message}</span>}
            </div>
            <div className="form-row two-col">
              <div className="form-field">
                <label>Expiry Date</label>
                <input
                  {...register('expiry')}
                  placeholder="MM/YY"
                  maxLength={5}
                  className={errors.expiry ? 'error' : ''}
                />
                {errors.expiry && <span className="field-error">{errors.expiry.message}</span>}
              </div>
              <div className="form-field">
                <label>CVV</label>
                <input
                  {...register('cvv')}
                  placeholder="123"
                  maxLength={4}
                  type="password"
                  className={errors.cvv ? 'error' : ''}
                />
                {errors.cvv && <span className="field-error">{errors.cvv.message}</span>}
              </div>
            </div>
          </div>

          <button type="submit" className="btn-place-order" disabled={loading}>
            {loading ? (
              <span className="btn-loading">
                <span className="spinner-sm" /> Processing...
              </span>
            ) : (
              <>Place Order — {formatPrice(totals.total)}</>
            )}
          </button>
        </motion.form>

        {/* Order Summary */}
        <motion.div
          className="order-summary"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h3 className="summary-title">Order Summary</h3>

          <div className="order-items">
            {cartItems.map((item) => (
              <div key={item.id} className="order-item">
                <div className="order-item-img-wrap">
                  <img src={item.image} alt={item.title} />
                  <span className="order-item-qty">{item.quantity}</span>
                </div>
                <div className="order-item-info">
                  <p>{truncateText(item.title, 45)}</p>
                  <span>{formatPrice(item.price)}</span>
                </div>
                <span className="order-item-total">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="summary-divider" />

          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>{formatPrice(totals.subtotal)}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span className={totals.shipping === 0 ? 'free-shipping' : ''}>
                {totals.shipping === 0 ? 'FREE' : formatPrice(totals.shipping)}
              </span>
            </div>
            <div className="total-row">
              <span>Tax (8%)</span>
              <span>{formatPrice(totals.tax)}</span>
            </div>
          </div>

          <div className="summary-divider" />

          <div className="order-grand-total">
            <span>Total</span>
            <span>{formatPrice(totals.total)}</span>
          </div>

          <div className="secure-badge">
            <FiLock /> SSL Encrypted & Secure
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
