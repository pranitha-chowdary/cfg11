import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSellers: 0,
    totalBuyers: 0,
    totalOrders: 0,
    revenue: 0,
    pendingOrders: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      setStats({
        totalProducts: 156,
        totalSellers: 89,
        totalBuyers: 234,
        totalOrders: 78,
        revenue: 125000,
        pendingOrders: 12
      });

      setRecentOrders([
        { id: '#ORD001', customer: 'Priya Sharma', product: 'Handwoven Silk Saree', amount: 2500, status: 'pending', date: '2024-01-15' },
        { id: '#ORD002', customer: 'Rajesh Kumar', product: 'Organic Turmeric Powder', amount: 150, status: 'completed', date: '2024-01-14' },
        { id: '#ORD003', customer: 'Meera Patel', product: 'Bamboo Handicrafts', amount: 800, status: 'processing', date: '2024-01-14' },
        { id: '#ORD004', customer: 'Arun Singh', product: 'Clay Pottery Set', amount: 1200, status: 'completed', date: '2024-01-13' }
      ]);

      setTopProducts([
        { name: 'Handwoven Textiles', sales: 45, revenue: 67500 },
        { name: 'Organic Food Products', sales: 38, revenue: 15200 },
        { name: 'Traditional Jewelry', sales: 32, revenue: 48000 },
        { name: 'Handicrafts', sales: 28, revenue: 22400 }
      ]);

      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'status-active';
      case 'pending':
      case 'processing':
        return 'status-badge';
      default:
        return 'status-inactive';
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Welcome to Taru Foundation SHG Marketplace Admin Panel</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><div className="stat-number">{stats.totalProducts}</div><div className="stat-label">Total Products</div></div>
        <div className="stat-card"><div className="stat-number">{stats.totalSellers}</div><div className="stat-label">SHG Sellers</div></div>
        <div className="stat-card"><div className="stat-number">{stats.totalBuyers}</div><div className="stat-label">Active Buyers</div></div>
        <div className="stat-card"><div className="stat-number">{stats.totalOrders}</div><div className="stat-label">Total Orders</div></div>
        <div className="stat-card"><div className="stat-number">₹{stats.revenue.toLocaleString()}</div><div className="stat-label">Total Revenue</div></div>
        <div className="stat-card"><div className="stat-number">{stats.pendingOrders}</div><div className="stat-label">Pending Orders</div></div>
      </div>

      <div className="dashboard-grid">
        <div className="recent-orders card">
          <h3>Recent Orders</h3>
          <div className="table-container">
            <table className="table">
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
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td><strong>{order.id}</strong></td>
                    <td>{order.customer}</td>
                    <td>{order.product}</td>
                    <td>₹{order.amount}</td>
                    <td><span className={`status-badge ${getStatusColor(order.status)}`}>{order.status}</span></td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="quick-stats card">
          <h3>Top Selling Categories</h3>
          <div className="top-products">
            {topProducts.map((product, index) => (
              <div key={index} className="product-stat">
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p>{product.sales} sales</p>
                </div>
                <div className="product-revenue"><strong>₹{product.revenue.toLocaleString()}</strong></div>
              </div>
            ))}
          </div>

          <div className="quick-actions" style={{ marginTop: '2rem' }}>
            <h4>Quick Actions</h4>
            <div className="action-buttons">
              <button className="btn btn-secondary" onClick={() => navigate('/manage-sellers')}>Manage Sellers</button>
              <button className="btn btn-primary">Add New Product</button>
              <button className="btn btn-secondary">View All Orders</button>
              <button className="btn btn-secondary">Generate Report</button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Recent Activity</h3>
        <div className="activity-feed">
          <div className="activity-item"><div className="activity-time">2 hours ago</div><div className="activity-content"><strong>New seller registered:</strong> Lakshmi SHG from Guntur district</div></div>
          <div className="activity-item"><div className="activity-time">4 hours ago</div><div className="activity-content"><strong>Product added:</strong> Organic Honey by Swayam SHG</div></div>
          <div className="activity-item"><div className="activity-time">6 hours ago</div><div className="activity-content"><strong>Order completed:</strong> #ORD002 - Turmeric Powder delivery confirmed</div></div>
          <div className="activity-item"><div className="activity-time">1 day ago</div><div className="activity-content"><strong>New buyer registered:</strong> Corporate buyer from Hyderabad</div></div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
