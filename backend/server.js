const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const buyerRoutes = require('./routes/buyerRoutes'); // ✅ Import using require
const notificationsRoutes = require('./routes/notificationsRoutes');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/buyer', buyerRoutes);
app.use('/api/seller', notificationsRoutes);
app.use('/api/seller', notificationsRoutes);

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
