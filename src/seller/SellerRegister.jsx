import React, { useState } from 'react';
import '../seller/seller.css';

const SellerRegister = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
    shgName: '', village: '', district: '', state: '', pincode: '',
    bankAccount: '', ifscCode: '', panNumber: '', aadharNumber: '',
    businessType: '', productsOffered: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simple Validations
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    // 👇 Simulated Registration Process
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({
        name: '', email: '', phone: '', password: '', confirmPassword: '',
        shgName: '', village: '', district: '', state: '', pincode: '',
        bankAccount: '', ifscCode: '', panNumber: '', aadharNumber: '',
        businessType: '', productsOffered: ''
      });
    }, 1000);
  };
  
  if (success) {
    return (
      <div className="seller-register-container">
        <div className="success-message">
          <h2>Registration Successful!</h2>
          <p>Your seller account has been created successfully. Please wait for admin approval.</p>
          <a href="/seller/login" className="login-link">Go to Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="seller-register-container">
      <div className="seller-register-card">
        <div className="seller-register-header">
          <h2>Seller Registration</h2>
          <p>Join Taru Foundation Marketplace</p>
        </div>

        <form onSubmit={handleSubmit} className="seller-register-form">
          
          {error && <div className="error-message">{error}</div>}

          {/* Personal Information */}
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
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
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="businessType">Business Type *</label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Business Type</option>
                  <option value="handicrafts">Handicrafts</option>
                  <option value="textiles">Textiles</option>
                  <option value="food_products">Food Products</option>
                  <option value="agriculture">Agriculture Products</option>
                  <option value="pottery">Pottery</option>
                  <option value="jewelry">Jewelry</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password *</label>
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
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                />
              </div>
            </div>
          </div>

          {/* SHG & Location Information */}
          <div className="form-section">
            <h3>SHG & Location Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="shgName">Self Help Group Name *</label>
                <input
                  type="text"
                  id="shgName"
                  name="shgName"
                  value={formData.shgName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your SHG name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="village">Village *</label>
                <input
                  type="text"
                  id="village"
                  name="village"
                  value={formData.village}
                  onChange={handleChange}
                  required
                  placeholder="Enter your village"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="district">District *</label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  placeholder="Enter your district"
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State *</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  placeholder="Enter your state"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="pincode">Pincode *</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                placeholder="Enter your pincode"
              />
            </div>
          </div>

          {/* Banking Information */}
          <div className="form-section">
            <h3>Banking Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bankAccount">Bank Account Number *</label>
                <input
                  type="text"
                  id="bankAccount"
                  name="bankAccount"
                  value={formData.bankAccount}
                  onChange={handleChange}
                  required
                  placeholder="Enter your bank account number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="ifscCode">IFSC Code *</label>
                <input
                  type="text"
                  id="ifscCode"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  required
                  placeholder="Enter IFSC code"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="panNumber">PAN Number</label>
                <input
                  type="text"
                  id="panNumber"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                  placeholder="Enter PAN number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="aadharNumber">Aadhar Number</label>
                <input
                  type="text"
                  id="aadharNumber"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                  placeholder="Enter Aadhar number"
                />
              </div>
            </div>
          </div>

          {/* Products Information */}
          <div className="form-section">
            <h3>Products Information</h3>
            
            <div className="form-group">
              <label htmlFor="productsOffered">Products You Offer *</label>
              <textarea
                id="productsOffered"
                name="productsOffered"
                value={formData.productsOffered}
                onChange={handleChange}
                required
                placeholder="Describe the products you want to sell"
                rows="4"
              />
            </div>
          </div>

          <button
            type="submit"
            className="seller-register-btn"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register as Seller'}
          </button>
        </form>

        <div className="seller-register-footer">
          <p>
            Already have an account? 
            <a href="/seller/login"> Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerRegister;

