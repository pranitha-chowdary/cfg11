import React, { useState, useEffect } from 'react';
import './buyer.css';

const BuyerProfile = () => {
  const [profileData, setProfileData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: ''
    },
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    preferences: {
      categories: [],
      newsletter: false,
      smsNotifications: false,
      emailNotifications: true
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const categories = [
    'Textiles & Handicrafts',
    'Organic Food Products',
    'Traditional Pottery',
    'Herbal Products',
    'Bamboo Products',
    'Jewelry & Accessories'
  ];

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      // Simulate API call - in real app, fetch from backend
      const mockData = {
        personalInfo: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@email.com',
          phone: '+91 9876543210',
          dateOfBirth: '1990-05-15'
        },
        address: {
          street: '123 Main Street, Sector 12',
          city: 'Hyderabad',
          state: 'Telangana',
          pincode: '500032',
          country: 'India'
        },
        preferences: {
          categories: ['Textiles & Handicrafts', 'Organic Food Products'],
          newsletter: true,
          smsNotifications: false,
          emailNotifications: true
        }
      };
      setProfileData(mockData);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleInputChange = (section, field, value) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleCategoryChange = (category) => {
    const currentCategories = profileData.preferences.categories;
    const updatedCategories = currentCategories.includes(category)
      ? currentCategories.filter(cat => cat !== category)
      : [...currentCategories, category];
    
    handleInputChange('preferences', 'categories', updatedCategories);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update localStorage
      localStorage.setItem('buyerProfile', JSON.stringify(profileData));
      
      setIsEditing(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchProfileData(); // Reset to original data
  };

  return (
    <div className="buyer-profile">
      <div className="profile-header">
        <h1>My Profile</h1>
        <div className="profile-actions">
          {!isEditing ? (
            <button className="btn primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button 
                className="btn secondary" 
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                className="btn primary" 
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </div>

      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="profile-content">
        {/* Personal Information */}
        <div className="profile-section">
          <h2>Personal Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>First Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.personalInfo.firstName}
                  onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                />
              ) : (
                <p>{profileData.personalInfo.firstName}</p>
              )}
            </div>
            <div className="form-group">
              <label>Last Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.personalInfo.lastName}
                  onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                />
              ) : (
                <p>{profileData.personalInfo.lastName}</p>
              )}
            </div>
            <div className="form-group">
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                />
              ) : (
                <p>{profileData.personalInfo.email}</p>
              )}
            </div>
            <div className="form-group">
              <label>Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                />
              ) : (
                <p>{profileData.personalInfo.phone}</p>
              )}
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  value={profileData.personalInfo.dateOfBirth}
                  onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                />
              ) : (
                <p>{new Date(profileData.personalInfo.dateOfBirth).toLocaleDateString()}</p>
              )}
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="profile-section">
          <h2>Address Information</h2>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Street Address</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.address.street}
                  onChange={(e) => handleInputChange('address', 'street', e.target.value)}
                />
              ) : (
                <p>{profileData.address.street}</p>
              )}
            </div>
            <div className="form-group">
              <label>City</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.address.city}
                  onChange={(e) => handleInputChange('address', 'city', e.target.value)}
                />
              ) : (
                <p>{profileData.address.city}</p>
              )}
            </div>
            <div className="form-group">
              <label>State</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.address.state}
                  onChange={(e) => handleInputChange('address', 'state', e.target.value)}
                />
              ) : (
                <p>{profileData.address.state}</p>
              )}
            </div>
            <div className="form-group">
              <label>PIN Code</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.address.pincode}
                  onChange={(e) => handleInputChange('address', 'pincode', e.target.value)}
                />
              ) : (
                <p>{profileData.address.pincode}</p>
              )}
            </div>
            <div className="form-group">
              <label>Country</label>
              {isEditing ? (
                <select
                  value={profileData.address.country}
                  onChange={(e) => handleInputChange('address', 'country', e.target.value)}
                >
                  <option value="India">India</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p>{profileData.address.country}</p>
              )}
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="profile-section">
          <h2>Preferences</h2>
          
          <div className="form-group">
            <label>Interested Categories</label>
            {isEditing ? (
              <div className="categories-grid">
                {categories.map(category => (
                  <label key={category} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={profileData.preferences.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span className="checkmark"></span>
                    {category}
                  </label>
                ))}
              </div>
            ) : (
              <div className="selected-categories">
                {profileData.preferences.categories.length > 0 ? (
                  profileData.preferences.categories.map(category => (
                    <span key={category} className="category-tag">{category}</span>
                  ))
                ) : (
                  <p>No categories selected</p>
                )}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Notification Preferences</label>
            <div className="notification-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={profileData.preferences.emailNotifications}
                  onChange={(e) => handleInputChange('preferences', 'emailNotifications', e.target.checked)}
                  disabled={!isEditing}
                />
                <span className="checkmark"></span>
                Email Notifications
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={profileData.preferences.smsNotifications}
                  onChange={(e) => handleInputChange('preferences', 'smsNotifications', e.target.checked)}
                  disabled={!isEditing}
                />
                <span className="checkmark"></span>
                SMS Notifications
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={profileData.preferences.newsletter}
                  onChange={(e) => handleInputChange('preferences', 'newsletter', e.target.checked)}
                  disabled={!isEditing}
                />
                <span className="checkmark"></span>
                Newsletter Subscription
              </label>
            </div>
          </div>
        </div>

        {/* Account Statistics */}
        <div className="profile-section">
          <h2>Account Statistics</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">📦</div>
              <div className="stat-content">
                <h3>15</h3>
                <p>Total Orders</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <h3>₹18,750</h3>
                <p>Total Spent</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🏪</div>
              <div className="stat-content">
                <h3>8</h3>
                <p>SHGs Supported</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📅</div>
              <div className="stat-content">
                <h3>2 years</h3>
                <p>Member Since</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;