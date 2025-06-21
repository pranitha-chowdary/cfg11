import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './buyer.css';

const BuyerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalSpent: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simulate API calls
      const mockProducts = [
        {
          id: 1,
          name: "Handwoven Cotton Fabric",
          price: 850,
          seller: "Lakshmi SHG",
          location: "Andhra Pradesh",
          image: "/api/placeholder/200/200",
          rating: 4.5,
          inStock: true
        },
        {
          id: 2,
          name: "Organic Turmeric Powder",
          price: 320,
          seller: "Sita SHG",
          location: "Tamil Nadu",
          image: "/api/placeholder/200/200",
          rating: 4.8,
          inStock: true
        },
        {
          id: 3,
          name: "Handmade Pottery Set",
          price: 1200,
          seller: "Durga SHG",
          location: "West Bengal",
          image: "/api/placeholder/200/200",
          rating: 4.3,
          inStock: false
        }
      ];

      const mockOrders = [
        {
          id: "ORD001",
          date: "2024-06-15",
          status: "Delivered",
          total: 1700,
          items: 2
        },
        {
          id: "ORD002",
          date: "2024-06-18",
          status: "Shipped",
          total: 320,
          items: 1
        }
      ];

      setProducts(mockProducts);
      setOrders(mockOrders);
      setStats({
        totalOrders: 15,
        pendingOrders: 3,
        completedOrders: 12,
        totalSpent: 18750
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const handleViewProducts = () => {
    navigate('/buyer/products');
  };

  const handleViewOrders = () => {
    navigate('/buyer/orders');
  };

  const handlePlaceOrder = (productId) => {
    navigate(`/buyer/place-order/${productId}`);
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="buyer-dashboard">
      <div className="dashboard-header">
        <h1>Buyer Dashboard</h1>
        <p>Welcome to Taru Foundation E-commerce Platform</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{stats.totalOrders}</h3>
            <p>Total Orders</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{stats.pendingOrders}</h3>
            <p>Pending Orders</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.completedOrders}</h3>
            <p>Completed Orders</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>₹{stats.totalSpent.toLocaleString()}</h3>
            <p>Total Spent</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-btn primary" onClick={handleViewProducts}>
            Browse Products
          </button>
          <button className="action-btn secondary" onClick={handleViewOrders}>
            View My Orders
          </button>
          <button className="action-btn tertiary" onClick={() => navigate('/buyer/cart')}>
            View Cart
          </button>
        </div>
      </div>

      {/* Featured Products */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Featured Products from SHGs</h2>
          <button className="view-all-btn" onClick={handleViewProducts}>
            View All Products
          </button>
        </div>
        <div className="products-grid">
          {products.slice(0, 3).map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                {!product.inStock && <div className="out-of-stock">Out of Stock</div>}
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="seller-info">By {product.seller}</p>
                <p className="location">{product.location}</p>
                <div className="rating">
                  <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
                  <span className="rating-value">({product.rating})</span>
                </div>
                <div className="price">₹{product.price}</div>
                <button 
                  className={`btn ${product.inStock ? 'primary' : 'disabled'}`}
                  onClick={() => product.inStock && handlePlaceOrder(product.id)}
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Orders</h2>
          <button className="view-all-btn" onClick={handleViewOrders}>
            View All Orders
          </button>
        </div>
        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td>{order.items} items</td>
                  <td>₹{order.total}</td>
                  <td>
                    <span className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;