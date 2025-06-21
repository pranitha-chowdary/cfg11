const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);