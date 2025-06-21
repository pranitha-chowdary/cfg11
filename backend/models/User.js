const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store hashed passwords
  role: { type: String, enum: ['admin', 'shg_seller', 'buyer'], required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);