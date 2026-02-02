const MenuItem = require('../models/MenuItem');
const cloudinary = require('../config/cloudinary'); // Using the helper file we created

// @desc    Get all items
// @route   GET /api/menu
// @access  Public
exports.getMenu = async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ category: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server Error: Could not fetch menu." });
  }
};

// @desc    Create item
// @route   POST /api/menu
// @access  Private/Admin
exports.createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, chefTip, image } = req.body;
    
    let imageUrl = '';
    if (image) {
      // image is usually sent as a base64 string from the frontend
      const uploadRes = await cloudinary.uploader.upload(image, {
        folder: 'lalibela_menu',
        resource_type: 'auto'
      });
      imageUrl = uploadRes.secure_url;
    }

    const item = await MenuItem.create({
      name, 
      description, 
      price: Number(price), // Ensure price is a number
      category, 
      chefTip, 
      image: imageUrl,
      isAvailable: true
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update item
// @route   PUT /api/menu/:id
// @access  Private/Admin
exports.updateMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, chefTip, image, isAvailable } = req.body;
    const item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // If a new image is provided, upload it to Cloudinary
    let imageUrl = item.image;
    if (image && !image.startsWith('http')) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        folder: 'lalibela_menu',
      });
      imageUrl = uploadRes.secure_url;
    }

    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, chefTip, image: imageUrl, isAvailable },
      { new: true } // Returns the updated document
    );

    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
exports.deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Note: In a production app, you might also want to 
    // delete the image from Cloudinary here using item.image public_id

    await item.deleteOne();
    res.json({ message: 'Item removed successfully from the menu' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};