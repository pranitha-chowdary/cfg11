import React, { useState, useEffect } from 'react';
import './ViewCart.css';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';

const ViewCart = () => {
  const [user, setUser] = useState({ 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com' 
  });
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockCartItems = [
          {
            id: 1,
            productId: 101,
            name: "Organic Rice",
            price: 45.0,
            quantity: 2,
            image: "https://svastyaorganicfarms.com/cdn/shop/files/organic-thooyamalli-rice-single-polish-692073.jpg?v=1720965602",
            seller: "Ravi Kumar",
            sellerLocation: "Guntur, AP",
            stock: 50,
            unit: "kg"
          },
          {
            id: 2,
            productId: 102,
            name: "Fresh Turmeric",
            price: 120.0,
            quantity: 1,
            image: "https://freshindiaorganics.com/cdn/shop/products/WhatsAppImage2023-02-25at4.54.46PM_1.jpg?v=1677487596",
            seller: "Lakshmi Devi",
            sellerLocation: "Vijayawada, AP",
            stock: 25,
            unit: "kg"
          },
          {
            id: 3,
            productId: 103,
            name: "Handwoven Cotton Saree",
            price: 2500.0,
            quantity: 1,
            image: "https://www.loomfolks.com/wp-content/uploads/2024/05/Calming-Cream-Intricately-Handwoven-Pure-Cotton-Saree.jpg",
            seller: "Suresh Textiles",
            sellerLocation: "Machilipatnam, AP",
            stock: 5,
            unit: "piece"
          }
        ];
        setCartItems(mockCartItems);
        setLoading(false);
      } catch {
        setError('Failed to load cart items');
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.min(newQuantity, item.stock) }
          : item
      )
    );
  };
  const removeItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };
  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    if (subtotal >= 1000) return 0;
    const uniqueSellers = new Set(cartItems.map(item => item.seller));
    return uniqueSellers.size * 50;
  };
  const calculateTotal = () => calculateSubtotal() + calculateShipping();
  const handleCheckout = () => {
    console.log('Proceeding to checkout with items:', cartItems);
  };
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading your cart...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <p className="error-message">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <ShoppingBag className="empty-cart-icon" />
        <h2 className="empty-cart-title">Your cart is empty</h2>
        <p className="empty-cart-description">
          Discover amazing products from rural artisans and farmers
        </p>
        <button
          onClick={() => window.history.back()}
          className="continue-shopping-button"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="view-cart">
      <div className="cart-container">
        <div className="cart-header">
          <div className="header-left">
            <button
              onClick={() => window.history.back()}
              className="back-button"
            >
              <ArrowLeft />
            </button>
            <h1 className="cart-title">Shopping Cart</h1>
          </div>
          <div className="item-count">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </div>
        </div>

        <div className="cart-grid">
          <div className="cart-items-section">
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className={`cart-item ${index < cartItems.length - 1 ? 'border-bottom' : ''}`}
              >
                <div className="item-content">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="product-image"
                  />
                  <div className="product-details">
                    <h3 className="product-name">{item.name}</h3>
                    <p className="seller-info">
                      by {item.seller} • {item.sellerLocation}
                    </p>
                    <p className="product-price">
                      ₹{item.price.toFixed(2)} per {item.unit}
                    </p>
                    <p className="stock-info">{item.stock} {item.unit}s available</p>
                  </div>
                  <div className="quantity-controls">
                    <div className="quantity-selector">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="quantity-button"
                        disabled={item.quantity <= 1}
                      >
                        <Minus />
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="quantity-button"
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="remove-button"
                      title="Remove item"
                    >
                      <Trash2 />
                    </button>
                  </div>
                  <div className="item-total">
                    <span className="item-total-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="order-summary">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-details">
              <div className="summary-row">
                <span className="summary-label">Subtotal</span>
                <span className="summary-value">₹{calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Shipping</span>
                <span className="summary-value">
                  {calculateShipping() === 0 ? 'Free' : `₹${calculateShipping().toFixed(2)}`}
                </span>
              </div>
              {calculateShipping() === 0 && (
                <p className="free-shipping-note">🎉 Free shipping on orders over ₹1000!</p>
              )}
              <div className="summary-total">
                <div className="total-row">
                  <span>Total</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="checkout-button"
            >
              <CreditCard /> Proceed to Checkout
            </button>
            <div className="secure-note">
              <p className="secure-text">Secure checkout • Supporting rural communities</p>
            </div>
            <div className="trust-section">
              <h3 className="trust-title">Why shop with us?</h3>
              <ul className="trust-list">
                <li className="trust-item">✓ Direct from rural artisans & farmers</li>
                <li className="trust-item">✓ Quality guaranteed products</li>
                <li className="trust-item">✓ Supporting rural livelihoods</li>
                <li className="trust-item">✓ Secure payment options</li>
              </ul>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default ViewCart;
