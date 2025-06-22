import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Menu,
  X,
  User,
  ShoppingCart,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import './style.css';

const MainNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img
            src="https://tarufoundation.com/wp-content/uploads/2023/09/cropped-Taru_New_Logo-Transparent.png"
            alt="Taru Foundation"
          />
          <span>Taru Foundation</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="nav-links desktop-nav">
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/buyer/viewproducts"
              className={isActive('/buyer/viewproducts') ? 'active' : ''}
            >
              Products
            </Link>
          </li>
          <li>
            <Link to="/about" className={isActive('/about') ? 'active' : ''}>
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={isActive('/contact') ? 'active' : ''}
            >
              Contact
            </Link>
          </li>

          {!user ? (
            <li
              className="login-dropdown"
              onMouseLeave={() => setIsLoginDropdownOpen(false)}
            >
              <button
                className="btn btn-outline login-dropdown-btn"
                onMouseEnter={() => setIsLoginDropdownOpen(true)}
              >
                <User size={16} />
                Login <ChevronDown size={16} />
              </button>
              {isLoginDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/admin/login" className="dropdown-item">
                    Login as Admin
                  </Link>
                  <Link to="/seller/login" className="dropdown-item">
                    Login as Seller
                  </Link>
                  <Link to="/buyer/login" className="dropdown-item">
                    Login as Buyer
                  </Link>
                </div>
              )}
            </li>
          ) : (
            <>
              {user.role === 'buyer' && (
                <li>
                  <Link to="/buyer/cart" className="nav-cart">
                    <ShoppingCart size={20} />
                  </Link>
                </li>
              )}
              <li className="user-dropdown">
                <button className="user-menu-btn">
                  <User size={16} /> {user.name}
                </button>
                <div className="dropdown-menu">
                  <Link
                    to={`/${user.role}/dashboard`}
                    className="dropdown-item"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to={`/${user.role}/profile`}
                    className="dropdown-item"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item logout-btn"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-nav">
          <div className="mobile-nav-content">
            <Link
              to="/"
              className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/buyer/viewproducts"
              className={`mobile-nav-link ${isActive('/buyer/viewproducts') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/about"
              className={`mobile-nav-link ${isActive('/about') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`mobile-nav-link ${isActive('/contact') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {!user ? (
              <div className="mobile-auth-links">
                <Link
                  to="/admin/login"
                  className="btn btn-outline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login as Admin
                </Link>
                <Link
                  to="/seller/login"
                  className="btn btn-outline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login as Seller
                </Link>
                <Link
                  to="/buyer/login"
                  className="btn btn-outline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login as Buyer
                </Link>
              </div>
            ) : (
              <div className="mobile-user-menu">
                <div className="mobile-user-info">
                  <User size={20} />
                  <span>{user.name}</span>
                </div>
                <Link
                  to={`/${user.role}/dashboard`}
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {user.role === 'buyer' && (
                  <Link
                    to="/buyer/cart"
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cart
                  </Link>
                )}
                <Link
                  to={`/${user.role}/profile`}
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="mobile-nav-link logout-btn"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default MainNavBar;