import mongoose from 'mongoose';

const buyerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    match: /^[6-9]\d{9}$/
  },
  password: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true,
    match: /^\d{6}$/
  },
  agreeToTerms: {
    type: Boolean,
    required: true
  },
  newsletter: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: 'buyer'
  },
  registeredAt: {
    type: Date,
    default: Date.now
  }
});

const Buyer = mongoose.model('Buyer', buyerSchema);

export default Buyer;
