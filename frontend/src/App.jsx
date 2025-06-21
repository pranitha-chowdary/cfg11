import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './shared/ProtectedRoute';

// Main Pages
import Home from './main/Home';
import About from './main/About';
import Contact from './main/Contact';
import NotFound from './main/NotFound';
import MainNavBar from './main/MainNavBar';

// Buyer Pages
import BuyerLogin from './buyer/BuyerLogin';
import BuyerRegister from './buyer/BuyerRegister';
import BuyerDashboard from './buyer/BuyerDashboard';
import ViewProducts from './buyer/ViewProducts';
import ViewCart from './buyer/ViewCart';
import PlaceOrder from './buyer/PlaceOrder';
import BuyerProfile from './buyer/BuyerProfile';

// Seller Pages
import SellerLogin from './seller/SellerLogin';
import SellerRegister from './seller/SellerRegister';
import SellerDashboard from './seller/SellerDashboard';
import AddProduct from './seller/AddProduct';
import ManageOrders from './seller/ManageOrders';
import SellerProfile from './seller/SellerProfile';

// Admin Pages
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AddAdminProduct from './admin/AddProduct';
import ViewBuyers from './admin/ViewBuyers';
import ViewSellers from './admin/ViewSellers';

import './App.css';

function App() {
  return (
    <>
      <MainNavBar />
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Buyer Routes */}
        <Route path="/buyer/login" element={<BuyerLogin />} />
        <Route path="/buyer/register" element={<BuyerRegister />} />
        <Route
          path="/buyer/dashboard"
          element={
            <ProtectedRoute role="buyer">
              <BuyerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buyer/products"
          element={
            <ProtectedRoute role="buyer">
              <ViewProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buyer/cart"
          element={
            <ProtectedRoute role="buyer">
              <ViewCart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buyer/place-order/:productId"
          element={
            <ProtectedRoute role="buyer">
              <PlaceOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buyer/profile"
          element={
            <ProtectedRoute role="buyer">
              <BuyerProfile />
            </ProtectedRoute>
          }
        />

        {/* Seller Routes */}
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/seller/register" element={<SellerRegister />} />
        <Route
          path="/seller/dashboard"
          element={
            <ProtectedRoute role="seller">
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/add-product"
          element={
            <ProtectedRoute role="seller">
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/manage-orders"
          element={
            <ProtectedRoute role="seller">
              <ManageOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/profile"
          element={
            <ProtectedRoute role="seller">
              <SellerProfile />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-product"
          element={
            <ProtectedRoute role="admin">
              <AddAdminProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/view-buyers"
          element={
            <ProtectedRoute role="admin">
              <ViewBuyers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/view-sellers"
          element={
            <ProtectedRoute role="admin">
              <ViewSellers />
            </ProtectedRoute>
          }
        />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
