import React, { useState } from 'react';
import './admin.css';

const ManageSellers = () => {
  const [sellers, setSellers] = useState([
    {
      id: 1,
      name: 'Lakshmi SHG',
      location: 'Guntur',
      category: 'Handwoven Textiles',
      image: 'https://media.istockphoto.com/id/907753228/photo/indian-farmer-women-on-farm-field-with-happy-face.jpg?s=612x612&w=0&k=20&c=Hz8fwmpGs4iMWu9vtYVUnPfCD61srJhN8Tl3kW33JyM=',
      status: 'pending'
    },
    {
      id: 2,
      name: 'Swayam SHG',
      location: 'Vizag',
      category: 'Organic Products',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4K5ThumBzzSf04rNAeMAetpp1I73FtWqmcK7BBS00Z3kqUcZbF9uvg2aRW7SBbgGGDrA&usqp=CAU',
      status: 'approved'
    },
    {
      id: 3,
      name: 'Navjeevan SHG',
      location: 'Warangal',
      category: 'Pottery',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZZt9H9UJYf9yDuvVFb8lXr7Zyce2PMKsPaA&s',
      status: 'pending'
    }
  ]);

  const toggleApproval = (id) => {
    const updated = sellers.map(seller =>
      seller.id === id
        ? { ...seller, status: seller.status === 'approved' ? 'pending' : 'approved' }
        : seller
    );
    setSellers(updated);
  };

  return (
    <div className="admin-dashboard">
      <div className="page-header">
        <h2>Manage SHG Sellers</h2>
        <p>Approve or disapprove seller access to marketplace</p>
      </div>

      <div className="sellers-list">
        {sellers.map(seller => (
          <div key={seller.id} className="seller-card card">
            <img src={seller.image} alt={seller.name} className="seller-image" />
            <div className="seller-info">
              <h4>{seller.name}</h4>
              <p>{seller.location}</p>
              <p><strong>Category:</strong> {seller.category}</p>
              <p><strong>Status:</strong> <span className={`status-badge ${seller.status === 'approved' ? 'status-active' : 'status-inactive'}`}>{seller.status}</span></p>
              <button className="btn btn-primary" onClick={() => toggleApproval(seller.id)}>
                {seller.status === 'approved' ? 'Disapprove' : 'Approve'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSellers;
