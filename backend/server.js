require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cloudinary = require('cloudinary').v2;
const marketingRoutes = require('./routes/marketingRoutes');

const app = express();

// Config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

connectDB();

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for image uploads

// Routes
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));
app.use('/api/marketing', marketingRoutes);
app.use('/api/auth', require('./routes/authRoutes'));

const reservationRoutes = require('./routes/reservationRoutes');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));