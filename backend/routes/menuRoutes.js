const express = require('express');
const router = express.Router();
const { 
  getMenu, 
  createMenuItem, 
  updateMenuItem, // Added this
  deleteMenuItem 
} = require('../controllers/menuController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET & POST /api/menu
// GET is public, POST is protected for Admin
router.route('/')
  .get(getMenu)
  .post(protect, createMenuItem);

// @route   PUT & DELETE /api/menu/:id
// Both are protected for Admin only
router.route('/:id')
  .put(protect, updateMenuItem)    // Added for editing items
  .delete(protect, deleteMenuItem);

module.exports = router;