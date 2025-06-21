const jwt = require('jsonwebtoken');

// Middleware to protect routes and attach user info to req
const protect = (req, res, next) => {
  let token;

  // Check for Bearer token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info to request for controller access
      req.user = {
        userId: decoded.userId, // ✅ consistent field for user ID
        role: decoded.role      // ✅ can be 'admin', 'buyer', 'shg_seller'
      };

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized' });
    }
  } else {
    return res.status(401).json({ message: 'No token found' });
  }
};

// Role-based access control
const restrictTo = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

module.exports = { protect, restrictTo };
