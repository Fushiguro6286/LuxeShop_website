import { Link } from 'react-router-dom';
import { HiSparkles } from 'react-icons/hi';
import { FiInstagram, FiTwitter, FiGithub } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <HiSparkles />
            <span>Luxe<span className="accent">Shop</span></span>
          </Link>
          <p>Curated products for modern living. Shop with style, shop with confidence.</p>
          <div className="footer-social">
            <a href="#!" aria-label="Instagram"><FiInstagram /></a>
            <a href="#!" aria-label="Twitter"><FiTwitter /></a>
            <a href="#!" aria-label="GitHub"><FiGithub /></a>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Shop</h4>
            <Link to="/products">All Products</Link>
            <Link to="/products?category=electronics">Electronics</Link>
            <Link to="/products?category=jewelery">Jewelry</Link>
            <Link to="/products?category=clothing">Clothing</Link>
          </div>
          <div className="footer-col">
            <h4>Account</h4>
            <Link to="/cart">Cart</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/checkout">Checkout</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>© 2024 LuxeShop. Built with React & Fake Store API.</p>
      </div>
    </footer>
  );
};

export default Footer;
