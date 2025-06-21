import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './buyer.css';

const BuyerNavBar = () => {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('buyerUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Get cart count from localStorage
    const cart = localStorage.getItem('buyerCart');
    if (cart) {
      const cartItems = JSON.parse(cart);
      setCartCount(cartItems.length);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('buyerToken');
    localStorage.removeItem('buyerUser');
    localStorage.removeItem('buyerCart');
    navigate('/buyer/login');
  };

  const isActiveLink = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="buyer-navbar">
      <div className="navbar-container">
        {/* Logo and Brand */}
        <div className="navbar-brand">
          <Link to="/buyer/dashboard" className="brand-link">
            <img src="/api/placeholder/40/40" alt="Taru Foundation" className="brand-logo" />
            <span className="brand-text">Taru Marketplace</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="navbar-search">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products from SHGs..."
              className="search-input"
            />
            <button className="search-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="nav-links">
            <Link 
              to="/buyer/dashboard" 
              className={`nav-link ${isActiveLink('/buyer/dashboard')}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/buyer/products" 
              className={`nav-link ${isActiveLink('/buyer/products')}`}
            >
              Products
            </Link>
            <Link 
              to="/buyer/orders" 
              className={`nav-link ${isActiveLink('/buyer/orders')}`}
            >
              My Orders
            </Link>
            <Link 
              to="/buyer/cart" 
              className={`nav-link cart-link ${isActiveLink('/buyer/cart')}`}
            >
              Cart
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>

          {/* User Profile */}
          <div className="navbar-user">
            {user ? (
              <div className="user-menu">
                <button className="user-button" onClick={toggleProfile}>
                  <div className="user-avatar">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="user-name">{user.name || 'User'}</span>
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
                  <div className="user-dropdown">
                    <Link to="/buyer/profile" className="dropdown-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      My Profile
                    </Link>
                    <Link to="/buyer/orders" className="dropdown-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                      </svg>
                      My Orders
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button onClick={handleLogout} className="dropdown-item logout">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16,17 21,12 16,7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/buyer/login" className="auth-btn login">Login</Link>
                <Link to="/buyer/register" className="auth-btn register">Register</Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Search */}
      <div className="mobile-search">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products from SHGs..."
            className="search-input"
          />
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