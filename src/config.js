const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  APP_NAME: 'Taru Foundation',
  APP_DESCRIPTION: 'Empowering Rural Communities Through E-commerce',
  CONTACT_EMAIL: 'contact@tarufoundation.com',
  CONTACT_PHONE: '+91-xxx-xxx-xxxx',
  PAYMENT_GATEWAY: {
    RAZORPAY_KEY: import.meta.env.VITE_RAZORPAY_KEY || '',
    STRIPE_KEY: import.meta.env.VITE_STRIPE_KEY || ''
  },
  PAGINATION: {
    PRODUCTS_PER_PAGE: 12,
    ORDERS_PER_PAGE: 10
  },
  IMAGE_UPLOAD: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp']
  }
};

export default config;