import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './buyer.css';

const BuyerNavBar = () => {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // ✅ Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('buyerUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Close login dropdown when user logs in
  useEffect(() => {
    if (user) {
      setIsProfileOpen(false);
    }
  }, [user]);

  // ✅ Load cart count from localStorage on mount
  useEffect(() => {
    const cart = localStorage.getItem('buyerCart');
    if (cart) {
      const cartItems = JSON.parse(cart);
      setCartCount(cartItems.length);
    }
  }, []);

  // ✅ Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('buyerToken');
    localStorage.removeItem('buyerUser');
    localStorage.removeItem('buyerCart');
    setUser(null);
    navigate('/buyer/login');
  };

  const isActiveLink = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="buyer-navbar">
      <div className="navbar-container">
        {/* Brand */}
        <div className="navbar-brand">
          <Link to="/buyer/dashboard" className="brand-link">
            <img src="/api/placeholder/40/40" alt="Taru Foundation" className="brand-logo" />
            <span className="brand-text">Taru Marketplace</span>
          </Link>
        </div>

        {/* Search */}
        <div className="navbar-search">
          <div className="search-container">
            <input type="text" placeholder="Search products from SHGs..." className="search-input" />
            <button className="search-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Links */}
        <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="nav-links">
            <Link to="/buyer/dashboard" className={`nav-link ${isActiveLink('/buyer/dashboard')}`}>Dashboard</Link>
            <Link to="/buyer/products" className={`nav-link ${isActiveLink('/buyer/products')}`}>Products</Link>
            <Link to="/buyer/orders" className={`nav-link ${isActiveLink('/buyer/orders')}`}>My Orders</Link>
            <Link to="/buyer/cart" className={`nav-link cart-link ${isActiveLink('/buyer/cart')}`}>
              Cart
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>
        </div>

        {/* User/Profile/Login */}
        <div className="navbar-user">
          {user ? (
            <div className="user-menu">
              <span className="user-name">{user.name}</span>
              <button onClick={handleLogout} className="auth-btn logout">Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <div className="role-login-dropdown" ref={dropdownRef}>
                <button className="auth-btn login" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                  Login As
                  <svg
                    className={`dropdown-arrow ${isProfileOpen ? 'open' : ''}`}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </button>

                {isProfileOpen && (
                  <div className="role-dropdown">
                    <button onClick={() => { setIsProfileOpen(false); navigate('/buyer/login'); }} className="dropdown-item">Buyer</button>
                    <button onClick={() => { setIsProfileOpen(false); navigate('/seller/login'); }} className="dropdown-item">Seller</button>
                    <button onClick={() => { setIsProfileOpen(false); navigate('/admin/login'); }} className="dropdown-item">Admin</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="mobile-search">
        <div className="search-container">
          <input type="text" placeholder="Search products from SHGs..." className="search-input" />
          <button className="search-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default BuyerNavBar;
