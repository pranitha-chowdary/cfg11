// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Phone validation (Indian format)
export const isValidPhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/
  return phoneRegex.test(phone)
}

// Password validation
export const isValidPassword = (password) => {
  return password.length >= 6
}

// Name validation
export const isValidName = (name) => {
  return name.trim().length >= 2
}

// Price validation
export const isValidPrice = (price) => {
  return !isNaN(price) && parseFloat(price) > 0
}

// Quantity validation
export const isValidQuantity = (quantity) => {
  return !isNaN(quantity) && parseInt(quantity) > 0
}

// Form validation helpers
export const validateLoginForm = (email, password) => {
  const errors = {}
  
  if (!email) {
    errors.email = 'Email is required'
  } else if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid email'
  }
  
  if (!password) {
    errors.password = 'Password is required'
  } else if (!isValidPassword(password)) {
    errors.password = 'Password must be at least 6 characters long'
  }
  
  return errors
}

export const validateRegisterForm = (formData) => {
  const errors = {}
  
  if (!formData.name) {
    errors.name = 'Name is required'
  } else if (!isValidName(formData.name)) {
    errors.name = 'Name must be at least 2 characters long'
  }
  
  if (!formData.email) {
    errors.email = 'Email is required'
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email'
  }
  
  if (!formData.password) {
    errors.password = 'Password is required'
  } else if (!isValidPassword(formData.password)) {
    errors.password = 'Password must be at least 6 characters long'
  }
  
  if (!formData.phone) {
    errors.phone = 'Phone number is required'
  } else if (!isValidPhone(formData.phone)) {
    errors.phone = 'Please enter a valid 10-digit phone number'
  }
  
  if (!formData.address) {
    errors.address = 'Address is required'
  }
  
  return errors
}

export const validateProductForm = (formData) => {
  const errors = {}
  
  if (!formData.name) {
    errors.name = 'Product name is required'
  }
  
  if (!formData.description) {
    errors.description = 'Product description is required'
  }
  
  if (!formData.price) {
    errors.price = 'Price is required'
  } else if (!isValidPrice(formData.price)) {
    errors.price = 'Please enter a valid price'
  }
  
  if (!formData.quantity) {
    errors.quantity = 'Quantity is required'
  } else if (!isValidQuantity(formData.quantity)) {
    errors.quantity = 'Please enter a valid quantity'
  }
  
  if (!formData.category) {
    errors.category = 'Category is required'
  }
  
  return errors
}

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format date
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}