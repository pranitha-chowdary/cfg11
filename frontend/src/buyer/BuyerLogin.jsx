import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './buyer.css';
import { useAuth } from '../context/AuthContext';

const BuyerLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const user = {
        id: 1,
        email: formData.email,
        name: 'John Doe',
        role: 'buyer'
      };
      const token = 'buyer-token-123';

      // Save login in context and localStorage
      login(user, token);

      navigate('/buyer/dashboard');
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Buyer Login</h1>
          <p>Access Taru Foundation E-commerce Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="Enter your password"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {errors.submit && <div className="error-message">{errors.submit}</div>}

          <button 
            type="submit" 
            className="auth-button primary"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-links">
          <p>Don't have an account? <Link to="/buyer/register">Sign up here</Link></p>
          <p><Link to="/buyer/forgot-password">Forgot your password?</Link></p>
        </div>

        <div className="auth-footer">
          <p>Support rural communities by buying from Self Help Groups</p>
          <div className="platform-info">
            <h4>Why shop with us?</h4>
            <ul>
              <li>✓ Support rural women entrepreneurs</li>
              <li>✓ Authentic handmade products</li>
              <li>✓ Direct from Self Help Groups</li>
              <li>✓ Fair trade practices</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerLogin;
