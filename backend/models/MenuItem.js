const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }, // Store as number for logic
  category: { 
    type: String, 
    required: true,
    enum: ['Starters', 'Meat Mains', 'Vegetarian & Vegan', 'Signature Combos', 'Red Wines', 'White Wines', 'Spirits & Beers', 'Beers', 'Soft Drinks', 'Hot Drinks', 'Desserts']
  },
  image: { type: String },
  isAvailable: { type: Boolean, default: true },
  chefTip: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);