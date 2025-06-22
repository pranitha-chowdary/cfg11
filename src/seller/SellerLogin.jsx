import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './seller.css';
import { useNavigate } from 'react-router-dom';

const SellerLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Dummy credentials
    const dummyEmail = 'seller@gmail.com';
    const dummyPassword = '123456';

    if (formData.email === dummyEmail && formData.password === dummyPassword) {
      login({ email: formData.email }, 'dummy_token', 'seller');
      navigate('/seller/dashboard');
    } else {
      setError('Invalid email or password');
    }

    setLoading(false);
  };

  return (
    <div className="seller-login-container">
      <div className="seller-login-card">
        <div className="seller-login-header">
          <h2>Seller Login</h2>
          <p>Welcome back to Taru Foundation Marketplace</p>
        </div>

        <form onSubmit={handleSubmit} className="seller-login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="seller-login-btn"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="seller-login-footer">
          <p>
            Don't have an account?{' '}
            <a href="/seller/register">Register as Seller</a>
          </p>
          <a href="/forgot-password">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;