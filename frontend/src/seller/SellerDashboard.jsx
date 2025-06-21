import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../seller/seller.css';

const SellerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
    lowStockProducts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/seller/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="seller-dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}</h1>
        <p>SHG: {user?.shgName}</p>
      </div>

      {/* Dashboard Stats */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{dashboardData.totalProducts}</h3>
            <p>Total Products</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-info">
            <h3>{dashboardData.totalOrders}</h3>
            <p>Total Orders</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{dashboardData.pendingOrders}</h3>
            <p>Pending Orders</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>₹{dashboardData.totalRevenue?.toLocaleString()}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <a href="/seller/add-product" className="action-btn primary">
            <span className="btn-icon">➕</span>
            Add New Product
          </a>
          <a href="/seller/manage-orders" className="action-btn secondary">
            <span className="btn-icon">📋</span>
            Manage Orders
          </a>
          <a href="/seller/view-products" className="action-btn secondary">
            <span className="btn-icon">👁️</span>
            View Products
          </a>
          <a href="/seller/profile" className="action-btn secondary">
            <span className="btn-icon">👤</span>
            Update Profile
          </a>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Recent Orders */}
        <div className="dashboard-section">
          <h2>Recent Orders</h2>
          {dashboardData.recentOrders.length > 0 ? (
            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentOrders.map(order => (
                    <tr key={order._id}>
                      <td>#{order.orderId}</td>
                      <td>{order.customerName}</td>
                      <td>{order.productName}</td>
                      <td>₹{order.amount}</td>
                      <td>
                        <span className={`status ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-data">
              <p>No recent orders found</p>
            </div>
          )}
        </div>

        {/* Low Stock Alert */}
        <div className="dashboard-section">
          <h2>Low Stock Alert</h2>
          {dashboardData.lowStockProducts.length > 0 ? (
            <div className="low-stock-list">
              {dashboardData.lowStockProducts.map(product => (
                <div key={product._id} className="low-stock-item">
                  <div className="product-info">
                    <img src={product.image} alt={product.name} />
                    <div>
                      <h4>{product.name}</h4>
                      <p>Stock: {product.stock} units</p>
                    </div>
                  </div>
                  <a href={`/seller/edit-product/${product._id}`} className="restock-btn">
                    Update Stock
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-data">
              <p>All products are well stocked</p>
            </div>
          )}
        </div>
      </div>

      {/* Performance Chart */}
      <div className="dashboard-section">
        <h2>Sales Performance</h2>
        <div className="chart-placeholder">
          <p>Sales chart will be displayed here</p>
          <small>Integration with charting library needed</small>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;