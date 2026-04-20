import  { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiMenu, FiX } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';
import useCart from '../../hooks/useCart';
import useWishlist from '../../hooks/useWishlist';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Shop' },
  ];

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <HiSparkles className="logo-icon" />
          <span className="logo-text">Luxe<span>Shop</span></span>
        </Link>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <Link to="/wishlist" className="nav-icon-btn">
            <FiHeart />
            {wishlistCount > 0 && (
              <motion.span className="badge" initial={{ scale: 0 }} animate={{ scale: 1 }} key={wishlistCount}>
                {wishlistCount}
              </motion.span>
            )}
          </Link>
          <Link to="/cart" className="nav-icon-btn">
            <FiShoppingCart />
            {cartCount > 0 && (
              <motion.span className="badge" initial={{ scale: 0 }} animate={{ scale: 1 }} key={cartCount}>
                {cartCount}
              </motion.span>
            )}
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/cart" className="mobile-nav-link">
              Cart {cartCount > 0 && `(${cartCount})`}
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
