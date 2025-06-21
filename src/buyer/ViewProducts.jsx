import React, { useState, useEffect } from 'react';
import { Search, Star, ShoppingCart, Heart, MapPin, Users } from 'lucide-react';
import './ViewProducts.css';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('name');
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const sampleProducts = [
      {
        id: 1,
        name: 'Handwoven Cotton Saree',
        description: 'Beautiful traditional cotton saree handwoven by rural artisans',
        price: 2500,
        originalPrice: 3000,
        category: 'Textiles',
        image: 'https://www.memeraki.com/cdn/shop/products/climate-white-with-colourful-pallu-handwoven-cotton-saree-memerakicom-413010_800x.jpg?v=1661326748',
        seller: 'Lakshmi SHG',
        location: 'Andhra Pradesh',
        rating: 4.8,
        reviews: 24,
        inStock: true,
        shgMembers: 12,
        tags: ['handwoven', 'cotton', 'traditional']
      },
      {
        id: 2,
        name: 'Organic Turmeric Powder',
        description: 'Pure organic turmeric powder grown and processed by local farmers',
        price: 150,
        originalPrice: 180,
        category: 'Food & Spices',
        image: 'https://www.greendna.in/cdn/shop/files/turmeric-1-1030x687.jpg?v=1714732257',
        seller: 'Annapurna SHG',
        location: 'Karnataka',
        rating: 4.9,
        reviews: 45,
        inStock: true,
        shgMembers: 8,
        tags: ['organic', 'turmeric', 'spices']
      },
      {
        id: 3,
        name: 'Bamboo Handicraft Set',
        description: 'Eco-friendly bamboo handicrafts perfect for home decoration',
        price: 800,
        originalPrice: 950,
        category: 'Handicrafts',
        image: 'https://theheritageartifacts.com/cdn/shop/collections/cd12ad6924cd75b38c747fcb8950c757.jpg?v=1678684828',
        seller: 'Green Earth SHG',
        location: 'Assam',
        rating: 4.6,
        reviews: 18,
        inStock: true,
        shgMembers: 15,
        tags: ['bamboo', 'eco-friendly', 'handicraft']
      },
      {
        id: 4,
        name: 'Natural Honey',
        description: 'Pure forest honey collected by tribal communities',
        price: 350,
        originalPrice: 400,
        category: 'Food & Spices',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkm2rXsM6rR8eYQjxFcCSW_eGQxMxCsa3USA&s',
        seller: 'Forest Bee SHG',
        location: 'Odisha',
        rating: 4.7,
        reviews: 32,
        inStock: false,
        shgMembers: 6,
        tags: ['honey', 'natural', 'forest']
      },
      {
        id: 5,
        name: 'Embroidered Cushion Covers',
        description: 'Hand-embroidered cushion covers with traditional motifs',
        price: 600,
        originalPrice: 750,
        category: 'Home Decor',
        image: 'https://kainaatdesign.com/cdn/shop/files/R_2872401_1080x.jpg?v=1688125094',
        seller: 'Kala Kendra SHG',
        location: 'Rajasthan',
        rating: 4.5,
        reviews: 21,
        inStock: true,
        shgMembers: 10,
        tags: ['embroidered', 'cushion', 'traditional']
      },
      {
        id: 6,
        name: 'Handmade Soap Set',
        description: 'Natural handmade soaps with herbal ingredients',
        price: 200,
        originalPrice: 250,
        category: 'Beauty & Personal Care',
        image: 'https://ancientliving.in/cdn/shop/files/dbn_679x679.jpg?v=1740044933',
        seller: 'Herbal Care SHG',
        location: 'Kerala',
        rating: 4.4,
        reviews: 28,
        inStock: true,
        shgMembers: 7,
        tags: ['handmade', 'soap', 'herbal']
      }
    ];
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };
  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  const categories = ['all', 'Textiles', 'Food & Spices', 'Handicrafts', 'Home Decor', 'Beauty & Personal Care'];

  return (
    <div className="view-products">
      <div className="products-header">
        <div className="header-container">
          <h1 className="header-title">Rural Products Marketplace</h1>
          <div className="filters-container">
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search products, sellers, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <div className="price-range-container">
              <label className="price-range-label">
                Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
              </label>
              <div className="price-range-inputs">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="price-range-slider"
                />
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="price-range-slider"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="results-container">
        <p className="results-count">
          Showing {filteredProducts.length} of {products.length} products
          {searchTerm && ` for "${searchTerm}"`}
        </p>
      </div>

      <div className="products-container">
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <div className="no-products-icon">🔍</div>
            <h3 className="no-products-title">No products found</h3>
            <p className="no-products-description">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} className="product-image" />
                  {!product.inStock && (
                    <div className="out-of-stock-overlay">
                      <span className="out-of-stock-text">Out of Stock</span>
                    </div>
                  )}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="favorite-button"
                  >
                    <Heart className={`favorite-icon ${favorites.has(product.id) ? 'active' : ''}`} />
                  </button>
                  {product.originalPrice > product.price && (
                    <div className="discount-badge">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>

                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="price-container">
                    <span className="current-price">₹{product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="original-price">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <div className="rating-container">
                    <Star className="star-icon" />
                    <span className="rating-text">{product.rating}</span>
                    <span className="reviews-text">({product.reviews} reviews)</span>
                  </div>
                  <div className="seller-container">
                    <Users className="seller-icon" />
                    <span className="seller-name">{product.seller}</span>
                  </div>
                  <div className="location-container">
                    <MapPin className="location-icon" />
                    <span className="location-text">{product.location}</span>
                    <span className="members-text">({product.shgMembers} members)</span>
                  </div>
                  <div className="tags-container">
                    {product.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className={`add-to-cart-button ${product.inStock ? 'available' : 'unavailable'}`}
                  >
                    <ShoppingCart className="cart-icon" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-summary">
          <div className="cart-summary-header">
            <ShoppingCart className="cart-summary-icon" />
            <span className="cart-summary-text">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items in cart
            </span>
          </div>
          <div className="cart-summary-total">
            Total: ₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
