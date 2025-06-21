import React, { useState } from 'react';
import './admin.css';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: null,
    sellerName: '',
    sellerContact: '',
    location: '',
    shgGroup: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    'Handicrafts',
    'Textiles',
    'Food Products',
    'Organic Produce',
    'Home Decor',
    'Jewelry',
    'Pottery',
    'Traditional Crafts',
    'Agricultural Products',
    'Processed Foods'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct(prev => ({
        ...prev,
        image: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      Object.keys(product).forEach(key => {
        formData.append(key, product[key]);
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Product added successfully!');
      
      // Reset form
      setProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: null,
        sellerName: '',
        sellerContact: '',
        location: '',
        shgGroup: ''
      });
      setImagePreview(null);
      
    } catch (error) {
      alert('Error adding product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product">
      <div className="page-header">
        <h2>Add New Product</h2>
        <p>Add products from SHG members to the marketplace</p>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          {/* Product Information */}
          <div className="form-section">
            <h3>Product Information</h3>
            
            <div className="form-group">
              <label htmlFor="name">Product Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                required
                placeholder="Enter product name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleInputChange}
                required
                rows="4"
                placeholder="Describe the product..."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price (₹) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={product.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>

              <div className="form-group">
                <label htmlFor="stock">Stock Quantity *</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={product.stock}
                  onChange={handleInputChange}
                  required
                  min="0"
                  placeholder="Available quantity"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={product.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Seller Information */}
          <div className="form-section">
            <h3>Seller Information</h3>
            
            <div className="form-group">
              <label htmlFor="sellerName">Seller Name *</label>
              <input
                type="text"
                id="sellerName"
                name="sellerName"
                value={product.sellerName}
                onChange={handleInputChange}
                required
                placeholder="SHG member name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="sellerContact">Contact Number *</label>
              <input
                type="tel"
                id="sellerContact"
                name="sellerContact"
                value={product.sellerContact}
                onChange={handleInputChange}
                required
                placeholder="Phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={product.location}
                onChange={handleInputChange}
                required
                placeholder="Village, District"
              />
            </div>

            <div className="form-group">
              <label htmlFor="shgGroup">SHG Group Name *</label>
              <input
                type="text"
                id="shgGroup"
                name="shgGroup"
                value={product.shgGroup}
                onChange={handleInputChange}
                required
                placeholder="Self Help Group name"
              />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="form-section">
          <h3>Product Image</h3>
          <div className="image-upload">
            <div className="upload-area">
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                className="file-input"
              />
              <label htmlFor="image" className="upload-label">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                ) : (
                  <div className="upload-placeholder">
                    <span className="upload-icon">📷</span>
                    <span>Click to upload image</span>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;