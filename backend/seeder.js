const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const MenuItem = require('./models/MenuItem');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const seedData = async () => {
  try {
    // 1. Clear existing data (Be careful with this in production!)
    await Admin.deleteMany();
    // await MenuItem.deleteMany(); // Uncomment if you want to reset the menu too

    // 2. Create the Master Admin
    const admin = await Admin.create({
      username: 'admin@lalibela.com',
      password: 'LalibelaPassword2026' // This will be hashed automatically by your Admin model
    });

    // 3. Optional: Create a Sample Menu Item to test the connection
    await MenuItem.create({
      name: 'Special Kitfo',
      description: 'Finely chopped prime beef seasoned with mitmita and niter kibbeh.',
      price: 18.50,
      category: 'Meat Mains',
      isAvailable: true,
      chefTip: 'Best served medium-rare with homemade Ayibe.'
    });

    console.log('--- SEEDING COMPLETE ---');
    console.log(`Admin User: ${admin.username}`);
    process.exit();
  } catch (error) {
    console.error(`Error with seeding: ${error.message}`);
    process.exit(1);
  }
};

seedData();