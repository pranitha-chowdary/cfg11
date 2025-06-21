const express = require('express');
const Razorpay = require('razorpay');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Notification = require('../models/Notification');
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/checkout', async (req, res) => {
  const { cartId, deliveryAddress } = req.body;
  try {
    const cart = await Cart.findById(cartId).populate('items.productId');
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    const totalAmount = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
    const order = new Order({
      buyerId: cart.buyerId,
      sellerId: cart.items[0].productId.sellerId,
      products: cart.items.map(item => ({ productId: item.productId._id, quantity: item.quantity })),
      totalAmount,
      deliveryAddress,
    });
    await order.save();

    const rzpOrder = await razorpay.orders.create({
      amount: totalAmount * 100, // In paise
      currency: 'INR',
      receipt: order._id.toString(),
    });

    // Create notification for seller
    const notification = new Notification({
      sellerId: order.sellerId,
      orderId: order._id,
      message: `New order received: ${order._id}`,
    });
    await notification.save();

    res.json({ orderId: order._id, razorpayOrderId: rzpOrder.id, amount: totalAmount });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;