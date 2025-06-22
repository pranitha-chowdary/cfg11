import axios from 'axios'
import config from '../config'

// Create axios instance
export const api = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const authAPI = {
  login: (userType, credentials) => api.post(`/auth/login/${userType}`, credentials),
  register: (userType, userData) => api.post(`/auth/register/${userType}`, userData),
  verify: () => api.get('/auth/verify'),
  logout: () => api.post('/auth/logout'),
}

export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (productData) => api.post('/products', productData),
  update: (id, productData) => api.put(`/products/${id}`, productData),
  delete: (id) => api.delete(`/products/${id}`),
  getSellerProducts: () => api.get('/products/seller'),
}

export const orderAPI = {
  create: (orderData) => api.post('/orders', orderData),
  getAll: (params) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
  getBuyerOrders: () => api.get('/orders/buyer'),
  getSellerOrders: () => api.get('/orders/seller'),
}

export const cartAPI = {
  get: () => api.get('/cart'),
  add: (productId, quantity) => api.post('/cart', { productId, quantity }),
  update: (productId, quantity) => api.put('/cart', { productId, quantity }),
  remove: (productId) => api.delete(`/cart/${productId}`),
  clear: () => api.delete('/cart'),
}

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  getAllSellers: () => api.get('/users/sellers'),
  getAllBuyers: () => api.get('/users/buyers'),
  updateStatus: (userId, status) => api.put(`/users/${userId}/status`, { status }),
}

export const uploadAPI = {
  uploadImage: (file) => {
    const formData = new FormData()
    formData.append('image', file)
    return api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}