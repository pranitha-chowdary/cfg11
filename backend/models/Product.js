const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  images: [{ type: String }], // Array of image URLs
  isUnique: { type: Boolean, default: false },
  stock: { type: Number, required: true, min: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);