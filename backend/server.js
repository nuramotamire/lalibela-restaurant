require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // Added for serving the build
const connectDB = require('./config/db');
const cloudinary = require('cloudinary').v2;
const marketingRoutes = require('./routes/marketingRoutes');

const app = express();

// 1. Config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Database Connection
connectDB();

// 3. Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// 4. API Routes
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));
app.use('/api/marketing', marketingRoutes);
app.use('/api/auth', require('./routes/authRoutes'));

// 5. Serve Static Assets (Frontend)
// We assume your React 'dist' folder is in a sibling directory called 'client'
const buildPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(buildPath));

// 6. The "Catch-all" Route
// This MUST be the last route. It sends index.html for any request that isn't an API call.
// Express 5 requires a name for the wildcard
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// 7. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✨ Server running on port ${PORT}`);
  console.log(`📁 Serving frontend from: ${buildPath}`);
});